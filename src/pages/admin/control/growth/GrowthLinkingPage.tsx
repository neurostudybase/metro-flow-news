import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Link } from 'react-router-dom';
import { Link2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const linkingRules = [
  { from: 'Статьи → Новости', count: 45, status: 'активно' },
  { from: 'Новости → SEO-страницы', count: 32, status: 'активно' },
  { from: 'SEO-страницы → Объявления', count: 28, status: 'активно' },
  { from: 'Статьи → SEO-страницы', count: 19, status: 'активно' },
  { from: 'Объявления → Статьи', count: 15, status: 'требует обновления' },
  { from: 'Новости → Объявления', count: 8, status: 'требует обновления' },
];

const recentLinks = [
  { source: 'Лучшие кафе Тюмени', target: '/tyumen/restorany', type: 'статья → SEO', date: '2025-06-10' },
  { source: 'Открытие нового парка', target: 'Куда сходить в Тюмени', type: 'новость → статья', date: '2025-06-10' },
  { source: 'Автосервисы Тюмени', target: 'Объявления: авто', type: 'SEO → объявления', date: '2025-06-09' },
  { source: 'Развитие транспорта', target: '/tyumen/novostroyki', type: 'новость → SEO', date: '2025-06-09' },
];

const GrowthLinkingPage = () => {
  const { createTask } = useAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Link2 className="w-6 h-6 text-primary" /> AI Linking Engine
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Автоматическая перелинковка контента для SEO</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => createTask({ moduleId: 'seo', type: 'linking', description: 'Обновление перелинковки контента', status: 'new', priority: 'medium', needsApproval: false })}>
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Обновить перелинковку
            </Button>
            <Link to="/admin/control/growth"><Button variant="outline" size="sm">← Growth Engine</Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{linkingRules.reduce((s, r) => s + r.count, 0)}</div>
            <div className="text-xs text-muted-foreground">Всего ссылок</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{linkingRules.filter(r => r.status === 'активно').length}</div>
            <div className="text-xs text-muted-foreground">Активных правил</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{linkingRules.filter(r => r.status === 'требует обновления').length}</div>
            <div className="text-xs text-muted-foreground">Требует обновления</div>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Правила перелинковки</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {linkingRules.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-md border">
                    <div>
                      <div className="text-sm font-medium">{r.from}</div>
                      <div className="text-xs text-muted-foreground">{r.count} ссылок</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'активно' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Последние связи</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLinks.map((l, i) => (
                  <div key={i} className="p-2 rounded-md border">
                    <div className="text-sm font-medium">{l.source}</div>
                    <div className="text-xs text-muted-foreground">→ {l.target}</div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-primary">{l.type}</span>
                      <span className="text-xs text-muted-foreground">{l.date}</span>
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

export default GrowthLinkingPage;
