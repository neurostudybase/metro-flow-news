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

const Index = () => {
  return (
    <Layout>
      <div className="portal-grid">
        {/* Left rail */}
        <aside className="left-rail">
          <AllNewsList />
        </aside>

        {/* Center content */}
        <div>
          <HeroSection />
          <CardGrid />
          <VideoSection />
          <PhotoOfDay />
          <OpinionSection />
          <Top5Section />
          <PromoSection />
          <SocialFeed />
        </div>

        {/* Right rail */}
        <aside className="right-rail">
          <RightPanel />
        </aside>
      </div>

      {/* Mobile-only report widget */}
      <div className="lg:hidden max-w-[1280px] mx-auto px-4 mb-6">
        <ReportNewsWidget />
      </div>
    </Layout>
  );
};

export default Index;
