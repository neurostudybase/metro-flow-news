import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Pencil, Trash2, RefreshCw, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AI_STATUS_LABELS } from '@/types/ai';
import { useState } from 'react';

interface Draft {
  id: string;
  title: string;
  source: string;
  category: string;
  createdAt: string;
  status: 'draft' | 'rewriting' | 'ready' | 'published';
  content: string;
}

const MOCK_DRAFTS: Draft[] = [
  { id: 'd-1', title: 'В Тюмени открылся новый ледовый дворец', source: 'AI генерация', category: 'Город', createdAt: '2026-03-08T10:00:00', status: 'ready', content: 'Текст новости о ледовом дворце...' },
  { id: 'd-2', title: 'Бизнес-форум «Тюмень 2026» пройдёт в апреле', source: 'RSS: ТюменьПро', category: 'Бизнес', createdAt: '2026-03-08T09:30:00', status: 'draft', content: 'Текст новости о форуме...' },
  { id: 'd-3', title: 'ДТП на объездной: столкнулись 3 машины', source: 'AI сбор', category: 'Происшествия', createdAt: '2026-03-08T09:00:00', status: 'rewriting', content: 'Текст новости о ДТП...' },
  { id: 'd-4', title: 'Тюменский «Рубин» выиграл кубок области', source: 'AI генерация', category: 'Спорт', createdAt: '2026-03-07T18:00:00', status: 'ready', content: 'Текст новости о спорте...' },
  { id: 'd-5', title: 'Выставка современного искусства открылась в музее', source: 'RSS: Культура72', category: 'Культура', createdAt: '2026-03-07T15:00:00', status: 'draft', content: 'Текст новости о выставке...' },
  { id: 'd-6', title: 'Новые тарифы на ЖКХ с 1 апреля', source: 'AI сбор', category: 'Общество', createdAt: '2026-03-07T12:00:00', status: 'ready', content: 'Текст новости о тарифах...' },
];

const STATUS_LABELS: Record<Draft['status'], string> = {
  draft: 'Черновик',
  rewriting: 'Переписывается',
  ready: 'Готов к публикации',
  published: 'Опубликован',
};

const STATUS_COLORS: Record<Draft['status'], string> = {
  draft: 'bg-muted text-muted-foreground',
  rewriting: 'bg-amber-100 text-amber-700',
  ready: 'bg-green-100 text-green-700',
  published: 'bg-primary/10 text-primary',
};

const AINewsDraftsPage = () => {
  const [drafts, setDrafts] = useState<Draft[]>(MOCK_DRAFTS);
  const { toast } = useToast();
  const { createTask, addLog } = useAI();

  const handlePublish = (draft: Draft) => {
    setDrafts(prev => prev.map(d => d.id === draft.id ? { ...d, status: 'published' as const } : d));
    addLog({ moduleId: 'news', action: 'Публикация новости', details: `Опубликована: "${draft.title}"`, result: 'success' });
    toast({ title: 'Опубликовано', description: draft.title });
  };

  const handleRewrite = (draft: Draft) => {
    setDrafts(prev => prev.map(d => d.id === draft.id ? { ...d, status: 'rewriting' as const } : d));
    createTask({ moduleId: 'news', type: 'Переписывание', description: `Переписать: "${draft.title}"`, status: 'in_progress', priority: 'medium', needsApproval: true });
    toast({ title: 'Отправлено на переписывание' });
  };

  const handleDelete = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
    toast({ title: 'Черновик удалён' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/ai/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><FileText className="w-6 h-6 text-primary" /> Черновики новостей</h1>
            <p className="text-muted-foreground text-sm">Новости, подготовленные AI, ожидающие проверки и публикации</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">ID</TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drafts.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="text-xs text-muted-foreground">{d.id}</TableCell>
                  <TableCell className="font-medium text-sm max-w-[300px] truncate">{d.title}</TableCell>
                  <TableCell className="text-xs">{d.category}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{d.source}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(d.createdAt).toLocaleDateString('ru')}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[d.status]}`}>{STATUS_LABELS[d.status]}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      {d.status !== 'published' && (
                        <>
                          <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleRewrite(d)}><RefreshCw className="w-3 h-3 mr-1" /> Переписать</Button>
                          <Button size="sm" variant="default" className="text-xs h-7" onClick={() => handlePublish(d)}><Send className="w-3 h-3 mr-1" /> Опубликовать</Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive" onClick={() => handleDelete(d.id)}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {drafts.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground text-sm py-8">Нет черновиков</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsDraftsPage;
