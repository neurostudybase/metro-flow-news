import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, TrendingDown, Minus, Globe, Newspaper, Bot, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockAnalyticsItems, mockCategoryStats, mockCityStats, mockTrendingTopics, mockViewsChartData } from '@/data/contentAnalyticsData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const summaryStats = [
  { label: 'Материалов всего', value: mockAnalyticsItems.length, icon: Newspaper },
  { label: 'Просмотров за неделю', value: '87 230', icon: BarChart3 },
  { label: 'Городов', value: mockCityStats.length, icon: Globe },
  { label: 'Трендов растут', value: mockTrendingTopics.filter(t => t.direction === 'up').length, icon: TrendingUp },
];

const subPages = [
  { label: 'ТОП новостей', to: '/admin/control/analytics/top-news', icon: TrendingUp, desc: 'Самые популярные материалы' },
  { label: 'По категориям', to: '/admin/control/analytics/categories', icon: BarChart3, desc: 'Статистика по рубрикам' },
  { label: 'По городам', to: '/admin/control/analytics/cities', icon: Globe, desc: 'Активность городов' },
  { label: 'Рекомендации', to: '/admin/control/analytics/recommendations', icon: Lightbulb, desc: 'AI-советы для редакции' },
  { label: 'AI контент', to: '/admin/control/analytics/ai-content', icon: Bot, desc: 'Сравнение AI и редакторских статей' },
];

const ContentAnalyticsDashboard = () => {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" /> Аналитика контента
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Статистика материалов, тренды и рекомендации</p>
          </div>
          <Link to="/admin/control"><Button variant="outline" size="sm">← Панель управления</Button></Link>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {summaryStats.map(s => (
            <Card key={s.label}><CardContent className="p-4 flex items-center gap-3">
              <s.icon className="w-5 h-5 text-primary" />
              <div>
                <div className="text-lg font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent></Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Рост просмотров</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockViewsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Популярные категории</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mockCategoryStats.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="totalViews" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trending Topics */}
        <Card className="mb-6">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Trending Topics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {mockTrendingTopics.map(t => (
                <div key={t.topic} className="border border-border rounded-lg p-3">
                  <p className="text-sm font-medium">{t.topic}</p>
                  <p className="text-xs text-muted-foreground">{t.category}</p>
                  <p className={`text-xs flex items-center gap-1 mt-1 ${t.direction === 'up' ? 'text-green-600' : t.direction === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {t.direction === 'up' ? <TrendingUp className="w-3 h-3" /> : t.direction === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {t.growthPercent > 0 ? '+' : ''}{t.growthPercent}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sub-pages navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {subPages.map(p => (
            <Link key={p.to} to={p.to}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <p.icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentAnalyticsDashboard;
