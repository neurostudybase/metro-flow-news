
-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('super_admin','city_editor','journalist','moderator','ad_manager','seo_manager');
CREATE TYPE public.article_status AS ENUM ('draft','review','scheduled','published','archived','rejected');
CREATE TYPE public.layout_status AS ENUM ('draft','published','archived');
CREATE TYPE public.city_status AS ENUM ('active','inactive','preparing');
CREATE TYPE public.campaign_status AS ENUM ('draft','active','paused','finished');
CREATE TYPE public.ai_run_status AS ENUM ('pending','success','error');

-- ============ HELPERS ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ CITIES ============
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  domain TEXT UNIQUE,
  region TEXT,
  logo_url TEXT,
  status public.city_status NOT NULL DEFAULT 'preparing',
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cities TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cities TO authenticated;
GRANT ALL ON public.cities TO service_role;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_cities_updated BEFORE UPDATE ON public.cities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ USER_ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role, city_id)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security definer (no recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.has_any_admin_role(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id)
$$;

-- Auto-create profile + assign super_admin to first user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE first_user BOOLEAN;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));

  SELECT NOT EXISTS (SELECT 1 FROM public.user_roles) INTO first_user;
  IF first_user THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'super_admin');
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Cities policies
CREATE POLICY "cities_public_read" ON public.cities FOR SELECT USING (status = 'active' OR public.has_any_admin_role(auth.uid()));
CREATE POLICY "cities_admin_write" ON public.cities FOR ALL USING (public.has_role(auth.uid(),'super_admin')) WITH CHECK (public.has_role(auth.uid(),'super_admin'));

-- Profiles policies
CREATE POLICY "profiles_self_read" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.has_role(auth.uid(),'super_admin'));
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- User_roles policies
CREATE POLICY "roles_self_read" ON public.user_roles FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(),'super_admin'));

-- ============ CATEGORIES ============
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'news',
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (city_id, slug)
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_public_read" ON public.categories FOR SELECT USING (status = 'active' OR public.has_any_admin_role(auth.uid()));
CREATE POLICY "categories_admin_write" ON public.categories FOR ALL USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'city_editor')) WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'city_editor'));

-- ============ ARTICLES ============
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE RESTRICT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  lead TEXT,
  content TEXT,
  cover_image_url TEXT,
  cover_alt TEXT,
  author_name TEXT,
  source_name TEXT,
  source_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  status public.article_status NOT NULL DEFAULT 'draft',
  publish_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  views_count INTEGER NOT NULL DEFAULT 0,
  likes_count INTEGER NOT NULL DEFAULT 0,
  shares_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_breaking BOOLEAN NOT NULL DEFAULT false,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (city_id, slug)
);
CREATE INDEX articles_status_idx ON public.articles(status, published_at DESC);
CREATE INDEX articles_city_idx ON public.articles(city_id, status);
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_articles_updated BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "articles_public_read_published" ON public.articles FOR SELECT
  USING (status = 'published' OR public.has_any_admin_role(auth.uid()) OR auth.uid() = created_by);
CREATE POLICY "articles_authenticated_insert" ON public.articles FOR INSERT TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(),'super_admin') OR
    public.has_role(auth.uid(),'city_editor') OR
    public.has_role(auth.uid(),'journalist')
  );
CREATE POLICY "articles_update" ON public.articles FOR UPDATE TO authenticated
  USING (
    public.has_role(auth.uid(),'super_admin') OR
    public.has_role(auth.uid(),'city_editor') OR
    (public.has_role(auth.uid(),'journalist') AND auth.uid() = created_by AND status IN ('draft','review','rejected'))
  );
CREATE POLICY "articles_delete_admin" ON public.articles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'city_editor'));

-- ============ MEDIA ============
CREATE TABLE public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  alt TEXT,
  credit TEXT,
  source TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT SELECT ON public.media_items TO anon;
GRANT ALL ON public.media_items TO service_role;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_public_read" ON public.media_items FOR SELECT USING (true);
CREATE POLICY "media_auth_insert" ON public.media_items FOR INSERT TO authenticated WITH CHECK (public.has_any_admin_role(auth.uid()));
CREATE POLICY "media_admin_modify" ON public.media_items FOR UPDATE TO authenticated USING (public.has_any_admin_role(auth.uid()));
CREATE POLICY "media_admin_delete" ON public.media_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'city_editor'));

-- ============ HOMEPAGE LAYOUTS ============
CREATE TABLE public.homepage_layouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
  version_name TEXT NOT NULL,
  status public.layout_status NOT NULL DEFAULT 'draft',
  layout_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage_layouts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.homepage_layouts TO authenticated;
GRANT ALL ON public.homepage_layouts TO service_role;
ALTER TABLE public.homepage_layouts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_layouts_updated BEFORE UPDATE ON public.homepage_layouts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "layouts_public_read_published" ON public.homepage_layouts FOR SELECT USING (status = 'published' OR public.has_any_admin_role(auth.uid()));
CREATE POLICY "layouts_admin_write" ON public.homepage_layouts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'city_editor'))
  WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'city_editor'));

-- ============ AD SLOTS / CAMPAIGNS ============
CREATE TABLE public.ad_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
  placement_key TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (city_id, placement_key)
);
GRANT SELECT ON public.ad_slots TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.ad_slots TO authenticated;
GRANT ALL ON public.ad_slots TO service_role;
ALTER TABLE public.ad_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "slots_public_read" ON public.ad_slots FOR SELECT USING (true);
CREATE POLICY "slots_admin_write" ON public.ad_slots FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'ad_manager'))
  WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'ad_manager'));

CREATE TABLE public.ad_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
  slot_id UUID REFERENCES public.ad_slots(id) ON DELETE SET NULL,
  advertiser_name TEXT NOT NULL,
  image_url TEXT,
  link_url TEXT,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  status public.campaign_status NOT NULL DEFAULT 'draft',
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.ad_campaigns TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.ad_campaigns TO authenticated;
GRANT ALL ON public.ad_campaigns TO service_role;
ALTER TABLE public.ad_campaigns ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON public.ad_campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "campaigns_public_read_active" ON public.ad_campaigns FOR SELECT USING (status = 'active' OR public.has_any_admin_role(auth.uid()));
CREATE POLICY "campaigns_admin_write" ON public.ad_campaigns FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'ad_manager'))
  WITH CHECK (public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'ad_manager'));

-- ============ AI RUNS ============
CREATE TABLE public.ai_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  prompt TEXT,
  result TEXT,
  status public.ai_run_status NOT NULL DEFAULT 'pending',
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ai_runs TO authenticated;
GRANT ALL ON public.ai_runs TO service_role;
ALTER TABLE public.ai_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_runs_admin_read" ON public.ai_runs FOR SELECT USING (public.has_any_admin_role(auth.uid()));
CREATE POLICY "ai_runs_admin_insert" ON public.ai_runs FOR INSERT TO authenticated WITH CHECK (public.has_any_admin_role(auth.uid()));

-- ============ EDITORIAL LOG ============
CREATE TABLE public.editorial_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  action TEXT NOT NULL,
  meta_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.editorial_log TO authenticated;
GRANT ALL ON public.editorial_log TO service_role;
ALTER TABLE public.editorial_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "log_admin_read" ON public.editorial_log FOR SELECT USING (public.has_any_admin_role(auth.uid()));
CREATE POLICY "log_auth_insert" ON public.editorial_log FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ============ SEED DATA ============
INSERT INTO public.cities (name, slug, domain, region, status, is_default) VALUES
  ('Тюмень','tyumen','tyumen.info','Тюменская область','active', true),
  ('Курган','kurgan','kurgan.info','Курганская область','preparing', false),
  ('Брянск','bryansk','bryansk.online','Брянская область','preparing', false),
  ('Нефтеюганск','nefteyugansk','nefteyugansk.info','ХМАО','preparing', false),
  ('Пыть-Ях','pyt-yah','pyt-yah.info','ХМАО','preparing', false);

INSERT INTO public.categories (city_id, name, slug, type, sort_order) 
SELECT id, c.name, c.slug, 'news', c.ord FROM public.cities, (VALUES
  ('Новости','novosti',1),
  ('Город','gorod',2),
  ('Происшествия','proisshestviya',3),
  ('Бизнес','biznes',4),
  ('Спорт','sport',5),
  ('Культура','kultura',6),
  ('Политика','politika',7),
  ('Общество','obshchestvo',8),
  ('Объявления','obyavleniya',9),
  ('Недвижимость','nedvizhimost',10),
  ('Авто','avto',11)
) AS c(name, slug, ord)
WHERE public.cities.slug = 'tyumen';

INSERT INTO public.ad_slots (city_id, placement_key, name)
SELECT id, k.key, k.name FROM public.cities, (VALUES
  ('right_column_top','Правая колонка — верх'),
  ('right_column_middle','Правая колонка — середина'),
  ('in_feed','В ленте'),
  ('article_sidebar','Сайдбар статьи'),
  ('footer','Футер')
) AS k(key, name)
WHERE public.cities.slug = 'tyumen';
