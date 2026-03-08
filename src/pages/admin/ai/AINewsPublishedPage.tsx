import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Newspaper, Pencil, EyeOff, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface PublishedNews {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  views: number;
  status: 'active' | 'unpublished';
}

const MOCK_PUBLISHED: PublishedNews[] = [
  { id: 'p-1', title: 'Тюмень вошла в ТОП-10 городов для жизни', category: 'Город', publishedAt: '2026-03-07T10:00:00', views: 1240, status: 'active' },
  { id: 'p-2', title: 'Новый мост через Туру откроют летом', category: 'Город', publishedAt: '2026-03-06T15:00:00', views: 890, status: 'active' },
  { id: 'p-3', title: 'Фестиваль уличной еды пройдёт в выходные', category: 'Культура', publishedAt: '2026-03-05T12:00:00', views: 650, status: 'active' },
  { id: 'p-4', title: 'Рост цен на жильё замедлился в марте', category: 'Бизнес', publishedAt: '2026-03-04T09:00:00', views: 2100, status: 'active' },
  { id: 'p-5', title: 'ФК «Тюмень» провёл первый матч сезона', category: 'Спорт', publishedAt: '2026-03-03T18:00:00', views: 430, status: 'unpublished' },
];

const AINewsPublishedPage = () => {
  const [news, setNews] = useState<PublishedNews[]>(MOCK_PUBLISHED);
  const { toast } = useToast();

  const handleUnpublish = (id: string) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, status: 'unpublished' as const } : n));
    toast({ title: 'Снято с публикации' });
  };

  const handleRepublish = (id: string) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, status: 'active' as const } : n));
    toast({ title: 'Опубликовано повторно' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/control/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Newspaper className="w-6 h-6 text-primary" /> Опубликованные новости</h1>
            <p className="text-muted-foreground text-sm">Управление опубликованными AI-новостями</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">ID</TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Дата публикации</TableHead>
                <TableHead>Просмотры</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map(n => (
                <TableRow key={n.id}>
                  <TableCell className="text-xs text-muted-foreground">{n.id}</TableCell>
                  <TableCell className="font-medium text-sm max-w-[300px] truncate">{n.title}</TableCell>
                  <TableCell className="text-xs">{n.category}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(n.publishedAt).toLocaleDateString('ru')}</TableCell>
                  <TableCell className="text-xs">{n.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${n.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                      {n.status === 'active' ? 'Активна' : 'Снята'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      {n.status === 'active' ? (
                        <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleUnpublish(n.id)}><EyeOff className="w-3 h-3 mr-1" /> Снять</Button>
                      ) : (
                        <Button size="sm" variant="default" className="text-xs h-7" onClick={() => handleRepublish(n.id)}><RefreshCw className="w-3 h-3 mr-1" /> Опубликовать</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsPublishedPage;
