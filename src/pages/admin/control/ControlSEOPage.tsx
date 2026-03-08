import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Search, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockPages = [
  { url: '/', title: 'Главная', seoTitle: 'Тюмень.Инфо — городской портал', seoDesc: 'Новости Тюмени, объявления, афиша', score: 85, issues: 1 },
  { url: '/obyavleniya', title: 'Объявления', seoTitle: 'Объявления Тюмени — доска объявлений', seoDesc: 'Бесплатные объявления в Тюмени', score: 72, issues: 3 },
  { url: '/category/city', title: 'Город', seoTitle: 'Новости города Тюмени', seoDesc: 'Городские новости Тюмени', score: 90, issues: 0 },
  { url: '/category/business', title: 'Бизнес', seoTitle: '', seoDesc: '', score: 30, issues: 5 },
  { url: '/category/sport', title: 'Спорт', seoTitle: 'Спорт в Тюмени', seoDesc: '', score: 55, issues: 2 },
];

const ControlSEOPage = () => {
  const { createTask } = useAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Search className="w-6 h-6 text-primary" /> AI SEO Engine</h1>
            <p className="text-muted-foreground text-sm">SEO-структура, мета-данные, рекомендации</p>
          </div>
          <Button size="sm" onClick={() => createTask({ moduleId: 'seo', type: 'audit', description: 'Полный SEO-аудит портала', status: 'new', priority: 'medium', needsApproval: false })}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Запустить аудит
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold">{mockPages.length}</div><div className="text-xs text-muted-foreground">Страниц</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-green-600">{mockPages.filter(p => p.score >= 70).length}</div><div className="text-xs text-muted-foreground">Хороший SEO</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-red-600">{mockPages.reduce((a, p) => a + p.issues, 0)}</div><div className="text-xs text-muted-foreground">Проблем</div></CardContent></Card>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Страница</TableHead>
                <TableHead>SEO Title</TableHead>
                <TableHead>Оценка</TableHead>
                <TableHead>Проблемы</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPages.map(p => (
                <TableRow key={p.url}>
                  <TableCell><div className="text-sm font-medium">{p.title}</div><div className="text-xs text-muted-foreground">{p.url}</div></TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate">{p.seoTitle || <span className="text-red-500">Не задан</span>}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-bold ${p.score >= 70 ? 'text-green-600' : p.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{p.score}/100</span>
                  </TableCell>
                  <TableCell>{p.issues > 0 ? <span className="text-xs text-red-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{p.issues}</span> : <CheckCircle className="w-3.5 h-3.5 text-green-600" />}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => createTask({ moduleId: 'seo', type: 'generate', description: `Сгенерировать SEO для ${p.url}`, status: 'new', priority: 'medium', needsApproval: true })}>
                      Сгенерировать SEO
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ControlSEOPage;
