import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { BarChart3, TrendingUp } from 'lucide-react';
import { MOCK_HOLDING_NEWS } from '@/data/holdingData';

const HoldingAnalyticsPage = () => {
  const { cities } = useCity();

  // Stats per city
  const cityStats = cities.map(city => {
    const news = MOCK_HOLDING_NEWS.filter(n => n.cityIds.includes(city.id));
    const published = news.filter(n => n.status === 'published').length;
    return { city, total: news.length, published };
  });

  // Category stats
  const catMap: Record<string, number> = {};
  MOCK_HOLDING_NEWS.forEach(n => { catMap[n.category] = (catMap[n.category] || 0) + 1; });
  const catStats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Аналитика холдинга
        </h1>
        <p className="text-muted-foreground mb-6">Статистика по городам и темам</p>

        <h2 className="text-sm font-semibold mb-3">По городам</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {cityStats.map(s => (
            <div key={s.city.id} className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm font-medium">{s.city.name}</p>
              <p className="text-xs text-muted-foreground">{s.city.domain}</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <p className="text-lg font-bold">{s.total}</p>
                  <p className="text-[10px] text-muted-foreground">всего</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">{s.published}</p>
                  <p className="text-[10px] text-muted-foreground">опубл.</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-sm font-semibold mb-3">Популярные темы</h2>
        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          {catStats.map(([cat, count]) => (
            <div key={cat} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-primary" /> {cat}</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingAnalyticsPage;
