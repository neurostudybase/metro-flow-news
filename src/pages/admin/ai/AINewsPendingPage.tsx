import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckSquare, Eye, Send, XCircle } from 'lucide-react';
import { useState } from 'react';
import { MOCK_QUEUE } from '@/data/newsPipelineData';
import { useToast } from '@/hooks/use-toast';
import { useAI } from '@/contexts/AIContext';

const AINewsPendingPage = () => {
  const [items, setItems] = useState(MOCK_QUEUE.filter(n => n.status === 'needs_approval'));
  const { toast } = useToast();
  const { addLog } = useAI();

  const handlePublish = (id: string, title: string) => {
    setItems(prev => prev.filter(n => n.id !== id));
    addLog({ moduleId: 'news', action: 'Публикация', details: `Опубликовано: "${title}"`, result: 'success' });
    toast({ title: 'Опубликовано', description: title });
  };

  const handleReject = (id: string, title: string) => {
    setItems(prev => prev.filter(n => n.id !== id));
    addLog({ moduleId: 'news', action: 'Отклонение', details: `Отклонено: "${title}"`, result: 'success' });
    toast({ title: 'Отклонено' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/ai/news-pipeline"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Pipeline</Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><CheckSquare className="w-6 h-6 text-primary" /> На подтверждении</h1>
            <p className="text-muted-foreground text-sm">Материалы, ожидающие решения администратора</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Рубрика</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(n => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium text-sm max-w-[300px] truncate">{n.title || n.originalTitle}</TableCell>
                  <TableCell className="text-xs">{n.category}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{n.sourceName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleDateString('ru')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Link to={`/admin/ai/news-review/${n.id}`}><Button size="sm" variant="outline" className="text-xs h-7"><Eye className="w-3 h-3 mr-1" /> Открыть</Button></Link>
                      <Button size="sm" className="text-xs h-7" onClick={() => handlePublish(n.id, n.title)}><Send className="w-3 h-3 mr-1" /> Опубликовать</Button>
                      <Button size="sm" variant="destructive" className="text-xs h-7" onClick={() => handleReject(n.id, n.title)}><XCircle className="w-3 h-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground text-sm py-8">Нет материалов на подтверждении</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsPendingPage;
