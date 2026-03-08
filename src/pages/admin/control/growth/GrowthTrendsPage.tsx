import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const trends = [
  { topic: 'Недвижимость Тюмени', growth: '+42%', direction: 'up', category: 'Недвижимость', queries: 12400 },
  { topic: 'Работа в Тюмени', growth: '+28%', direction: 'up', category: 'Работа', queries: 8900 },
  { topic: 'Рестораны Тюмени', growth: '+15%', direction: 'up', category: 'Еда', queries: 6200 },
  { topic: 'Автосервисы Тюмени', growth: '+8%', direction: 'up', category: 'Авто', queries: 4100 },
  { topic: 'Аренда квартир Тюмени', growth: '+35%', direction: 'up', category: 'Недвижимость', queries: 9800 },
  { topic: 'Детские сады Тюмени', growth: '-3%', direction: 'down', category: 'Образование', queries: 2100 },
  { topic: 'Фитнес Тюмень', growth: '0%', direction: 'stable', category: 'Спорт', queries: 3400 },
  { topic: 'Доставка еды Тюмень', growth: '+22%', direction: 'up', category: 'Еда', queries: 7600 },
];

const topCategories = [
  { name: 'Недвижимость', count: 342, growth: '+18%' },
  { name: 'Работа', count: 289, growth: '+12%' },
  { name: 'Авто', count: 256, growth: '+5%' },
  { name: 'Еда', count: 198, growth: '+22%' },
  { name: 'Услуги', count: 176, growth: '+9%' },
];

const GrowthTrendsPage = () => {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" /> AI Trend Analyzer
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Анализ трендов и популярных тем Тюмени</p>
          </div>
          <Link to="/admin/control/growth"><Button variant="outline" size="sm">← Growth Engine</Button></Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{trends.length}</div>
            <div className="text-xs text-muted-foreground">Отслеживаемых тем</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{trends.filter(t => t.direction === 'up').length}</div>
            <div className="text-xs text-muted-foreground">Растущих</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{trends.filter(t => t.direction === 'down').length}</div>
            <div className="text-xs text-muted-foreground">Падающих</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{topCategories.length}</div>
            <div className="text-xs text-muted-foreground">Категорий</div>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trends table */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3"><CardTitle className="text-base">Тренды поисковых запросов</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Тема</th>
                    <th className="pb-2 font-medium">Категория</th>
                    <th className="pb-2 font-medium">Запросов</th>
                    <th className="pb-2 font-medium">Рост</th>
                  </tr>
                </thead>
                <tbody>
                  {trends.map(t => (
                    <tr key={t.topic} className="border-b last:border-0">
                      <td className="py-2 font-medium">{t.topic}</td>
                      <td className="py-2 text-muted-foreground">{t.category}</td>
                      <td className="py-2 text-muted-foreground">{t.queries.toLocaleString()}</td>
                      <td className="py-2">
                        <span className={`flex items-center gap-1 ${t.direction === 'up' ? 'text-green-600' : t.direction === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {t.direction === 'up' ? <ArrowUp className="w-3 h-3" /> : t.direction === 'down' ? <ArrowDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {t.growth}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Top categories */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Популярные категории</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCategories.map((c, i) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{c.count} объявлений</span>
                      <span className="text-xs text-green-600">{c.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GrowthTrendsPage;
