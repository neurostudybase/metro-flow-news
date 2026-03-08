import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { ArrowLeft, Workflow, Eye } from 'lucide-react';
import { useState } from 'react';
import { MOCK_QUEUE, NEWS_CATEGORIES, type NewsPipelineStatus } from '@/data/newsPipelineData';

const STATUS_LABELS: Record<NewsPipelineStatus, string> = {
  found: 'Найдено', processing: 'Обработка', draft: 'Черновик', needs_approval: 'Требует подтверждения', published: 'Опубликовано', rejected: 'Отклонено',
};
const STATUS_COLORS: Record<NewsPipelineStatus, string> = {
  found: 'bg-blue-100 text-blue-700', processing: 'bg-amber-100 text-amber-700', draft: 'bg-muted text-muted-foreground', needs_approval: 'bg-orange-100 text-orange-700', published: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700',
};

const AINewsQueuePage = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const cities = [...new Set(MOCK_QUEUE.map(n => n.city))];
  const sources = [...new Set(MOCK_QUEUE.map(n => n.sourceName))];

  const filtered = MOCK_QUEUE.filter(n => {
    if (statusFilter !== 'all' && n.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && n.category !== categoryFilter) return false;
    if (cityFilter !== 'all' && n.city !== cityFilter) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/ai/news-pipeline"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Pipeline</Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2"><Workflow className="w-6 h-6 text-primary" /> Очередь новостей</h1>
            <p className="text-muted-foreground text-sm">Все материалы в pipeline</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] h-8 text-xs"><SelectValue placeholder="Статус" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px] h-8 text-xs"><SelectValue placeholder="Рубрика" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все рубрики</SelectItem>
              {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[150px] h-8 text-xs"><SelectValue placeholder="Город" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">ID</TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>AI-модуль</TableHead>
                <TableHead>Рубрика</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(n => (
                <TableRow key={n.id}>
                  <TableCell className="text-xs text-muted-foreground">{n.id}</TableCell>
                  <TableCell className="font-medium text-sm max-w-[250px] truncate">{n.title || n.originalTitle}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{n.sourceName}</TableCell>
                  <TableCell className="text-xs">{n.aiModule}</TableCell>
                  <TableCell className="text-xs">{n.category}</TableCell>
                  <TableCell className="text-xs">{n.city}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleDateString('ru')}</TableCell>
                  <TableCell><span className={`text-xs px-1.5 py-0.5 rounded ${n.priority === 'high' ? 'bg-red-100 text-red-700' : n.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'}`}>{n.priority === 'high' ? 'Высокий' : n.priority === 'medium' ? 'Средний' : 'Низкий'}</span></TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[n.status]}`}>{STATUS_LABELS[n.status]}</span></TableCell>
                  <TableCell className="text-right">
                    <Link to={`/admin/ai/news-review/${n.id}`}><Button size="sm" variant="outline" className="text-xs h-7"><Eye className="w-3 h-3 mr-1" /> Открыть</Button></Link>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={10} className="text-center text-muted-foreground text-sm py-8">Нет материалов</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsQueuePage;
