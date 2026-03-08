import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Link } from 'react-router-dom';
import { FileText, RefreshCw, Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface Article {
  id: number;
  title: string;
  type: string;
  status: 'черновик' | 'на проверке' | 'опубликовано' | 'отклонено';
  seoTitle: string;
  date: string;
  words: number;
}

const initialArticles: Article[] = [
  { id: 1, title: '10 лучших кафе Тюмени с летней верандой', type: 'Подборка', status: 'черновик', seoTitle: 'Лучшие кафе Тюмени 2025 — ТОП-10 с верандой', date: '2025-06-10', words: 1200 },
  { id: 2, title: 'ТОП районов Тюмени для жизни с семьёй', type: 'SEO-статья', status: 'на проверке', seoTitle: 'Лучшие районы Тюмени для семей — рейтинг 2025', date: '2025-06-09', words: 1800 },
  { id: 3, title: 'Лучшие автосервисы Тюмени — честный рейтинг', type: 'Подборка', status: 'опубликовано', seoTitle: 'Автосервисы Тюмени — ТОП лучших 2025', date: '2025-06-08', words: 950 },
  { id: 4, title: 'Куда сходить в Тюмени летом 2025', type: 'Гайд', status: 'черновик', seoTitle: 'Куда сходить в Тюмени летом — гайд 2025', date: '2025-06-10', words: 2100 },
  { id: 5, title: 'Лучшие стоматологии Тюмени', type: 'Подборка', status: 'черновик', seoTitle: 'ТОП стоматологий Тюмени 2025', date: '2025-06-10', words: 800 },
];

const statusColor: Record<string, string> = {
  'черновик': 'bg-muted text-muted-foreground',
  'на проверке': 'bg-yellow-100 text-yellow-700',
  'опубликовано': 'bg-green-100 text-green-700',
  'отклонено': 'bg-destructive/10 text-destructive',
};

const GrowthArticlesPage = () => {
  const { createTask } = useAI();
  const [articles, setArticles] = useState(initialArticles);

  const handlePublish = (id: number) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'опубликовано' as const } : a));
  };

  const handleReject = (id: number) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'отклонено' as const } : a));
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" /> AI Article Generator
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Генерация и управление статьями для роста портала</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => createTask({ moduleId: 'content', type: 'generate', description: 'Генерация 5 статей для Growth Engine', status: 'new', priority: 'high', needsApproval: true })}>Сгенерировать 5 статей</Button>
            <Link to="/admin/control/growth"><Button variant="outline" size="sm">← Growth Engine</Button></Link>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Статьи ({articles.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">Заголовок</th>
                    <th className="pb-2 font-medium">Тип</th>
                    <th className="pb-2 font-medium">Слов</th>
                    <th className="pb-2 font-medium">SEO Title</th>
                    <th className="pb-2 font-medium">Статус</th>
                    <th className="pb-2 font-medium">Дата</th>
                    <th className="pb-2 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(a => (
                    <tr key={a.id} className="border-b last:border-0">
                      <td className="py-2 text-muted-foreground">{a.id}</td>
                      <td className="py-2 font-medium max-w-[200px] truncate">{a.title}</td>
                      <td className="py-2"><Badge variant="outline">{a.type}</Badge></td>
                      <td className="py-2 text-muted-foreground">{a.words}</td>
                      <td className="py-2 text-xs text-muted-foreground max-w-[180px] truncate">{a.seoTitle}</td>
                      <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[a.status]}`}>{a.status}</span></td>
                      <td className="py-2 text-muted-foreground">{a.date}</td>
                      <td className="py-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2"><Eye className="w-3 h-3" /></Button>
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2"><RefreshCw className="w-3 h-3" /></Button>
                          {a.status !== 'опубликовано' && (
                            <>
                              <Button size="sm" variant="outline" className="text-xs h-6 px-2 text-green-600" onClick={() => handlePublish(a.id)}><Check className="w-3 h-3" /></Button>
                              <Button size="sm" variant="outline" className="text-xs h-6 px-2 text-destructive" onClick={() => handleReject(a.id)}><X className="w-3 h-3" /></Button>
                            </>
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

export default GrowthArticlesPage;
