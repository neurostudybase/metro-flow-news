import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Link } from 'react-router-dom';
import { Globe, Plus, RefreshCw, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface SEOPage {
  id: number;
  title: string;
  slug: string;
  status: 'черновик' | 'на проверке' | 'опубликовано';
  seoTitle: string;
  companies: number;
  date: string;
}

const initialPages: SEOPage[] = [
  { id: 1, title: 'Рестораны Тюмени', slug: '/tyumen/restorany', status: 'опубликовано', seoTitle: 'Лучшие рестораны Тюмени — рейтинг 2025', companies: 45, date: '2025-06-05' },
  { id: 2, title: 'Автосервисы Тюмени', slug: '/tyumen/avtoservisy', status: 'опубликовано', seoTitle: 'Автосервисы Тюмени — ТОП сервисов 2025', companies: 38, date: '2025-06-06' },
  { id: 3, title: 'Стоматологии Тюмени', slug: '/tyumen/stomatologii', status: 'на проверке', seoTitle: 'Стоматологии Тюмени — рейтинг клиник', companies: 22, date: '2025-06-09' },
  { id: 4, title: 'Новостройки Тюмени', slug: '/tyumen/novostroyki', status: 'черновик', seoTitle: 'Новостройки Тюмени 2025 — обзор ЖК', companies: 15, date: '2025-06-10' },
  { id: 5, title: 'Фитнес-клубы Тюмени', slug: '/tyumen/fitness', status: 'черновик', seoTitle: 'Фитнес-клубы Тюмени — ТОП залов', companies: 19, date: '2025-06-10' },
  { id: 6, title: 'Школы Тюмени', slug: '/tyumen/shkoly', status: 'черновик', seoTitle: 'Лучшие школы Тюмени — рейтинг 2025', companies: 31, date: '2025-06-10' },
];

const statusColor: Record<string, string> = {
  'черновик': 'bg-muted text-muted-foreground',
  'на проверке': 'bg-yellow-100 text-yellow-700',
  'опубликовано': 'bg-green-100 text-green-700',
};

const GrowthSEOPagesPage = () => {
  const { createTask } = useAI();
  const [pages, setPages] = useState(initialPages);

  const handlePublish = (id: number) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, status: 'опубликовано' as const } : p));
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" /> AI SEO Page Factory
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Генерация и управление SEO-страницами Тюмени</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => createTask({ moduleId: 'seo', type: 'generate', description: 'Генерация SEO-страниц', status: 'new', priority: 'high', needsApproval: true })}>
              <Plus className="w-3.5 h-3.5 mr-1" /> Генерировать страницу
            </Button>
            <Link to="/admin/control/growth"><Button variant="outline" size="sm">← Growth Engine</Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{pages.length}</div>
            <div className="text-xs text-muted-foreground">SEO-страниц</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{pages.filter(p => p.status === 'опубликовано').length}</div>
            <div className="text-xs text-muted-foreground">Опубликовано</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{pages.reduce((s, p) => s + p.companies, 0)}</div>
            <div className="text-xs text-muted-foreground">Компаний</div>
          </CardContent></Card>
        </div>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">SEO-страницы</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Страница</th>
                    <th className="pb-2 font-medium">URL</th>
                    <th className="pb-2 font-medium">SEO Title</th>
                    <th className="pb-2 font-medium">Компаний</th>
                    <th className="pb-2 font-medium">Статус</th>
                    <th className="pb-2 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map(p => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{p.title}</td>
                      <td className="py-2 text-xs text-muted-foreground font-mono">{p.slug}</td>
                      <td className="py-2 text-xs text-muted-foreground max-w-[180px] truncate">{p.seoTitle}</td>
                      <td className="py-2 text-muted-foreground">{p.companies}</td>
                      <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[p.status]}`}>{p.status}</span></td>
                      <td className="py-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2"><Eye className="w-3 h-3" /></Button>
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2"><RefreshCw className="w-3 h-3" /></Button>
                          {p.status !== 'опубликовано' && (
                            <Button size="sm" variant="outline" className="text-xs h-6 px-2 text-green-600" onClick={() => handlePublish(p.id)}><Check className="w-3 h-3" /></Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GrowthSEOPagesPage;
