import Layout from '@/components/layout/Layout';
import AllNewsList from '@/components/home/AllNewsList';
import HeroSection from '@/components/home/HeroSection';
import RightPanel from '@/components/home/RightPanel';
import CardGrid from '@/components/home/CardGrid';
import VideoSection from '@/components/home/VideoSection';
import PhotoOfDay from '@/components/home/PhotoOfDay';
import Top5Section from '@/components/home/Top5Section';
import OpinionSection from '@/components/home/OpinionSection';
import PromoSection from '@/components/home/PromoSection';
import SocialFeed from '@/components/home/SocialFeed';
import ReportNewsWidget from '@/components/home/ReportNewsWidget';
import AllNewsCTA from '@/components/home/AllNewsCTA';
import LongPromoFeed from '@/components/home/LongPromoFeed';
import AdSlot from '@/components/home/AdSlot';

const Index = () => {
  return (
    <Layout>
      {/* ЭТАЖ 1 — главный командный экран */}
      <div className="portal-grid">
        <aside className="left-rail">
          <AllNewsList />
        </aside>

        <div className="space-y-5">
          <HeroSection />
          <CardGrid />
        </div>

        <aside className="right-rail">
          <RightPanel />
        </aside>
      </div>

      {/* ЭТАЖ 2 — большой переходный CTA */}
      <div className="floor my-6">
        <AllNewsCTA />
      </div>

      {/* ЭТАЖ 3 — видеостудия (тёмный) */}
      <div className="floor mb-6">
        <VideoSection />
      </div>

      {/* ЭТАЖ 4 — двухколоночный: фото дня + сообщить новость */}
      <div className="floor mb-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <PhotoOfDay />
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3 border-b-2 border-foreground pb-1">Сообщить новость</h2>
          <ReportNewsWidget />
        </div>
      </div>

      {/* ЭТАЖ 5 — мнения, репортажи, рекомендуем */}
      <div className="floor mb-6">
        <OpinionSection />
      </div>

      {/* Горизонтальный рекламный пояс между этажами */}
      <div className="floor mb-6">
        <AdSlot format="horizontal" label="Реклама · 1240×110" />
      </div>

      {/* ЭТАЖ 6 — ТОП-7 + Промокоды (две колонки) */}
      <div className="floor mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Top5Section />
        <PromoSection />
      </div>

      {/* ЭТАЖ 7 — длинный нативный/промо masonry */}
      <div className="floor mb-6">
        <LongPromoFeed />
      </div>

      {/* ЭТАЖ 8 — соцсети masonry */}
      <div className="floor mb-8">
        <SocialFeed />
      </div>
    </Layout>
  );
};

export default Index;
