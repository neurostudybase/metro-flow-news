import { Link } from 'react-router-dom';
import { categories, cityList } from '@/data/mockData';
import { Phone, Mail, MapPin, Send, Smartphone, Apple, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-header text-header-foreground mt-10">
      {/* Верхний CTA-уровень */}
      <div className="border-b border-header-foreground/10">
        <div className="floor py-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.18em] text-primary font-bold mb-1">подпишитесь</div>
            <div className="font-bold text-xl">Утренняя рассылка Тюмень.инфо — главное за 5 минут</div>
            <div className="text-sm text-header-foreground/60 mt-1">Каждое утро в 8:00. Бесплатно. Без спама.</div>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Ваш e-mail"
              className="flex-1 bg-header-foreground/10 placeholder:text-header-foreground/40 text-sm px-3 py-2.5 rounded outline-none focus:ring-1 focus:ring-primary"
            />
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2.5 rounded text-sm font-semibold flex items-center gap-1.5 hover:opacity-90">
              <Send className="w-4 h-4" />
              Подписаться
            </button>
          </form>
        </div>
      </div>

      {/* Основной 4-колоночный уровень */}
      <div className="floor py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Бренд + контакты */}
        <div className="lg:col-span-2">
          <div className="font-bold text-2xl mb-3">
            Тюмень<span className="text-primary">.инфо</span>
          </div>
          <p className="text-sm text-header-foreground/60 leading-relaxed mb-4 max-w-md">
            Городской информационный портал. Актуальные новости Тюмени и Тюменской области с 2008 года.
            Часть медиахолдинга «Сибирь.инфо».
          </p>
          <div className="space-y-1.5 text-sm text-header-foreground/60 mb-4">
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> +7 (3452) 00-00-00</div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> info@tyumen.info</div>
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" /> г. Тюмень, ул. Республики, 1</div>
          </div>
          {/* Соцсети */}
          <div className="flex items-center gap-2">
            {[Facebook, Instagram, Youtube, MessageCircle, Send].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-md bg-header-foreground/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Рубрики */}
        <div>
          <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] mb-3 text-header-foreground/80">Рубрики</h4>
          <div className="flex flex-col gap-1.5">
            {categories.slice(0, 5).map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="text-sm text-header-foreground/60 hover:text-primary transition-colors">
                {cat.name}
              </Link>
            ))}
          </div>
          <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] mb-3 mt-5 text-header-foreground/80">Ещё</h4>
          <div className="flex flex-col gap-1.5">
            {categories.slice(5).map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="text-sm text-header-foreground/60 hover:text-primary transition-colors">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Сервисы */}
        <div>
          <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] mb-3 text-header-foreground/80">Сервисы</h4>
          <div className="flex flex-col gap-1.5">
            {[
              ['Объявления', '/obyavleniya'],
              ['Каталог компаний', '/'],
              ['Афиша', '/'],
              ['Промокоды', '/'],
              ['Карта города', '/'],
              ['Видео', '/'],
              ['Фоторепортажи', '/'],
              ['Спецпроекты', '/'],
            ].map(([label, to]) => (
              <Link key={label} to={to} className="text-sm text-header-foreground/60 hover:text-primary transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        {/* Редакция + приложения */}
        <div>
          <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] mb-3 text-header-foreground/80">Редакция</h4>
          <div className="flex flex-col gap-1.5">
            {['О проекте', 'Команда', 'Реклама', 'Сообщить новость', 'Вакансии', 'Контакты'].map(label => (
              <a key={label} href="#" className="text-sm text-header-foreground/60 hover:text-primary transition-colors">{label}</a>
            ))}
          </div>
          <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] mb-3 mt-5 text-header-foreground/80">Приложения</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md bg-header-foreground/10 hover:bg-header-foreground/15 transition-colors">
              <Apple className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[9px] text-header-foreground/60 leading-none">Загрузите в</div>
                <div className="text-xs font-semibold leading-tight">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-md bg-header-foreground/10 hover:bg-header-foreground/15 transition-colors">
              <Smartphone className="w-5 h-5" />
              <div className="text-left">
                <div className="text-[9px] text-header-foreground/60 leading-none">Доступно в</div>
                <div className="text-xs font-semibold leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Города медиахолдинга */}
      <div className="border-t border-header-foreground/10">
        <div className="floor py-6">
          <h4 className="font-bold text-[11px] uppercase tracking-[0.18em] mb-3 text-header-foreground/80">Сеть медиахолдинга «Сибирь.инфо»</h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {cityList.map(city => (
              <a key={city} href="#" className="text-sm text-header-foreground/55 hover:text-primary transition-colors">
                {city}.инфо
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Юридический низ */}
      <div className="border-t border-header-foreground/10 bg-foreground/30">
        <div className="floor py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px] text-header-foreground/45">
          <div>
            © {new Date().getFullYear()} Тюмень.инфо. Все права защищены. Сетевое издание зарегистрировано
            Роскомнадзором, свидетельство ЭЛ № ФС 77-00000.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="#" className="hover:text-primary">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary">Пользовательское соглашение</a>
            <a href="#" className="hover:text-primary">Карта сайта</a>
            <a href="#" className="hover:text-primary">RSS</a>
            <span>16+</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
