import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Eye, Send, XCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EDITORIAL_ARTICLES, EDITORIAL_TEAM, EDITORIAL_STATUS_LABELS, EDITORIAL_STATUS_COLORS, EditorialStatus } from '@/data/editorialData';

const EditorialQueuePage = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState(EDITORIAL_ARTICLES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [...new Set(articles.map(a => a.category))];
  const getAuthor = (id: string) => EDITORIAL_TEAM.find(m => m.id === id);

  const filtered = articles.filter(a => {
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
    return true;
  });

  const updateStatus = (id: string, status: EditorialStatus) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a));
    toast({ title: `Статус: ${EDITORIAL_STATUS_LABELS[status]}` });
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/control/editorial"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Редакция</Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Редакционная очередь</h1>
            <p className="text-muted-foreground text-sm">Все материалы на рассмотрении</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[170px] h-9"><SelectValue placeholder="Статус" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              {Object.entries(EDITORIAL_STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Категория" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Качество</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(a => {
                const author = getAuthor(a.authorId);
                return (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium text-sm max-w-[280px] truncate">{a.title}</TableCell>
                    <TableCell className="text-xs">
                      <span className={author?.isAI ? 'text-purple-600' : ''}>{author?.name || '—'}</span>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{a.category}</Badge></TableCell>
                    <TableCell>
                      {a.qualityScore !== undefined ? (
                        <span className={`text-xs font-medium ${a.qualityScore >= 80 ? 'text-green-600' : a.qualityScore >= 50 ? 'text-amber-600' : 'text-destructive'}`}>
                          {a.qualityScore}%
                        </span>
                      ) : '—'}
                    </TableCell>
                    <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${EDITORIAL_STATUS_COLORS[a.status]}`}>{EDITORIAL_STATUS_LABELS[a.status]}</span></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(a.updatedAt).toLocaleDateString('ru')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Link to={`/admin/control/editorial/article/${a.id}`}><Button size="sm" variant="outline" className="text-xs h-7"><Eye className="w-3 h-3 mr-1" /> Открыть</Button></Link>
                        {a.status === 'editor_review' && <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => updateStatus(a.id, 'ready_to_publish')}><CheckCircle className="w-3 h-3" /></Button>}
                        {a.status === 'ready_to_publish' && <Button size="sm" className="text-xs h-7" onClick={() => updateStatus(a.id, 'published')}><Send className="w-3 h-3" /></Button>}
                        {!['published', 'rejected'].includes(a.status) && <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive" onClick={() => updateStatus(a.id, 'rejected')}><XCircle className="w-3 h-3" /></Button>}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Нет материалов</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorialQueuePage;
