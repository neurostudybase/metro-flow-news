import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { BarChart3, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockMetrics = [
  { label: 'Просмотры за день', value: '12 540', change: '+8%', up: true },
  { label: 'Просмотры за неделю', value: '87 230', change: '+12%', up: true },
  { label: 'Новых пользователей', value: '340', change: '+5%', up: true },
  { label: 'Объявлений за день', value: '45', change: '-3%', up: false },
];

const topNews = [
  { title: 'В Тюмени открылся новый ледовый дворец', views: 4520 },
  { title: 'ДТП на объездной дороге', views: 3210 },
  { title: 'Новые тарифы ЖКХ', views: 2870 },
  { title: 'Бизнес-форум Тюмень 2026', views: 2140 },
  { title: 'Рубин выиграл кубок области', views: 1890 },
];

const topCategories = [
  { name: 'Происшествия', share: '28%' },
  { name: 'Город', share: '22%' },
  { name: 'Бизнес', share: '18%' },
  { name: 'Спорт', share: '15%' },
  { name: 'Общество', share: '10%' },
];

const recommendations = [
  '📈 Рубрика «Происшествия» набирает трафик — увеличить частоту публикаций',
  '📉 Рубрика «Культура» теряет просмотры — обновить контент',
  '💡 Объявления в категории «Недвижимость» растут — выделить на главной',
  '🔥 Тренд: интерес к спортивным событиям увеличился на 40%',
];

const ControlAnalyticsPage = () => {
  const { createTask } = useAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6 text-primary" /> AI Analytics</h1>
            <p className="text-muted-foreground text-sm">Аналитика, отчёты, рекомендации</p>
          </div>
          <Button size="sm" onClick={() => createTask({ moduleId: 'analytics', type: 'report', description: 'Генерация еженедельного отчёта', status: 'new', priority: 'low', needsApproval: false })}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Собрать отчёт
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {mockMetrics.map(m => (
            <Card key={m.label}><CardContent className="p-4">
              <div className="text-lg font-bold">{m.value}</div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className={`text-xs mt-1 flex items-center gap-1 ${m.up ? 'text-green-600' : 'text-red-600'}`}>
                {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {m.change}
              </div>
            </CardContent></Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">ТОП новостей</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topNews.map((n, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="truncate mr-2">{i + 1}. {n.title}</span>
                    <span className="text-muted-foreground whitespace-nowrap">{n.views.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">ТОП категорий</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topCategories.map((c, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span>{c.name}</span>
                    <span className="text-muted-foreground font-medium">{c.share}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">AI-рекомендации</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((r, i) => <li key={i} className="text-sm">{r}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ControlAnalyticsPage;
