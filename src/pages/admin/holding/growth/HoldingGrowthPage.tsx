import HoldingLayout from '@/components/holding/HoldingLayout';
import { Link } from 'react-router-dom';
import { TrendingUp, MapPin, Lightbulb, BarChart3, Rocket } from 'lucide-react';
import { CITY_CANDIDATES, GROWTH_SUGGESTIONS, NETWORK_STATS } from '@/data/growthCitiesData';

const cards = [
  { label: 'AI City Discovery', icon: MapPin, to: '/admin/holding/growth/cities', desc: 'Поиск новых городов', color: 'text-blue-600' },
  { label: 'AI Предложения', icon: Lightbulb, to: '/admin/holding/growth/suggestions', desc: 'Рекомендации по росту', color: 'text-amber-600' },
  { label: 'Аналитика сети', icon: BarChart3, to: '/admin/holding/growth/analytics', desc: 'Статистика порталов', color: 'text-emerald-600' },
];

const HoldingGrowthPage = () => {
  const highPotential = CITY_CANDIDATES.filter(c => c.potential === 'high').length;
  const pendingSuggestions = GROWTH_SUGGESTIONS.filter(s => s.status === 'pending').length;
  const totalTraffic = NETWORK_STATS.reduce((s, n) => s + n.traffic, 0);

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" /> Рост медиахолдинга
        </h1>
        <p className="text-muted-foreground mb-6">AI-система поиска и оценки новых городов для расширения сети</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold">{highPotential}</div>
            <div className="text-sm text-muted-foreground">Высокий потенциал</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold">{CITY_CANDIDATES.length}</div>
            <div className="text-sm text-muted-foreground">Городов найдено</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold">{pendingSuggestions}</div>
            <div className="text-sm text-muted-foreground">Предложений AI</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold">{totalTraffic.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Трафик сети/мес</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {cards.map(c => (
            <Link key={c.to} to={c.to} className="bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors">
              <c.icon className={`w-6 h-6 ${c.color} mb-2`} />
              <div className="font-semibold">{c.label}</div>
              <div className="text-sm text-muted-foreground">{c.desc}</div>
            </Link>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2"><Rocket className="w-4 h-4" /> AI Приоритеты запуска</h2>
          <ol className="space-y-2">
            {CITY_CANDIDATES.filter(c => c.potential === 'high').slice(0, 5).map((c, i) => (
              <li key={c.id} className="flex items-center justify-between bg-secondary/50 rounded-md px-3 py-2">
                <span className="flex items-center gap-2">
                  <span className="font-bold text-primary">{i + 1}.</span>
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-muted-foreground">{c.suggestedDomain}</span>
                </span>
                <span className="text-sm">Score: <span className="font-bold text-primary">{c.growthScore}</span></span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingGrowthPage;
