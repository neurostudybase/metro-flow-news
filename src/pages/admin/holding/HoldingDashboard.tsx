import HoldingLayout from '@/components/holding/HoldingLayout';
import { Building2, Globe, Newspaper, Bot, Shield, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCity } from '@/contexts/CityContext';
import { MOCK_HOLDING_NEWS, MOCK_MODERATION } from '@/data/holdingData';

const cards = [
  { label: 'Города', icon: Globe, to: '/admin/holding/cities', color: 'text-blue-600' },
  { label: 'Лента новостей', icon: Newspaper, to: '/admin/holding/news', color: 'text-emerald-600' },
  { label: 'AI Новости', icon: Bot, to: '/admin/holding/ai-news', color: 'text-purple-600' },
  { label: 'Модерация', icon: Shield, to: '/admin/holding/moderation', color: 'text-amber-600' },
  { label: 'Календарь', icon: Calendar, to: '/admin/holding/calendar', color: 'text-pink-600' },
  { label: 'Аналитика', icon: BarChart3, to: '/admin/holding/analytics', color: 'text-cyan-600' },
  { label: 'Рост сети', icon: TrendingUp, to: '/admin/holding/growth', color: 'text-rose-600' },
];

const HoldingDashboard = () => {
  const { cities } = useCity();
  const activeCities = cities.filter(c => c.status === 'active').length;
  const pendingMod = MOCK_MODERATION.filter(m => m.status === 'pending').length;
  const publishedNews = MOCK_HOLDING_NEWS.filter(n => n.status === 'published').length;
  const reviewNews = MOCK_HOLDING_NEWS.filter(n => n.status === 'review').length;

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-primary" /> Медиахолдинг
        </h1>
        <p className="text-muted-foreground mb-6">Центральная панель управления всеми городскими порталами</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Городов</p>
            <p className="text-2xl font-bold">{cities.length}</p>
            <p className="text-xs text-green-600">{activeCities} активных</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Опубликовано</p>
            <p className="text-2xl font-bold">{publishedNews}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">На проверке</p>
            <p className="text-2xl font-bold">{reviewNews}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Модерация</p>
            <p className="text-2xl font-bold text-amber-600">{pendingMod}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {cards.map(c => (
            <Link key={c.to} to={c.to} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col items-center gap-2">
              <c.icon className={`w-8 h-8 ${c.color}`} />
              <span className="text-sm font-medium">{c.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingDashboard;
