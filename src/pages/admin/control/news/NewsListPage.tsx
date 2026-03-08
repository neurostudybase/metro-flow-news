import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, Search, Send, XCircle, Archive, Trash2, FileText, Star, Zap, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  EDITORIAL_ARTICLES, AUTHORS, EDITORIAL_STATUS_LABELS, EDITORIAL_STATUS_COLORS,
  EditorialStatus, EditorialArticle,
} from '@/data/editorialData';
import { NEWS_CATEGORIES } from '@/data/newsPipelineData';
import { CITIES } from '@/data/citiesData';

type FilterMode = 'drafts' | 'published' | 'all';

const NewsListPage = ({ mode = 'all' }: { mode?: FilterMode }) => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [filterAuthor, setFilterAuthor] = useState<string>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allStatuses: EditorialStatus[] = ['draft', 'review', 'ready', 'scheduled', 'published', 'rejected', 'archived'];

  const articles = useMemo(() => {
    let list = [...EDITORIAL_ARTICLES];
    if (mode === 'drafts') list = list.filter(a => ['draft', 'review', 'ready', 'scheduled'].includes(a.status));
    if (mode === 'published') list = list.filter(a => a.status === 'published');
    if (filterStatus !== 'all') list = list.filter(a => a.status === filterStatus);
    if (filterCategory !== 'all') list = list.filter(a => a.category === filterCategory);
    if (filterCity !== 'all') list = list.filter(a => a.cityId === filterCity);
    if (filterAuthor !== 'all') list = list.filter(a => a.authorId === filterAuthor);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [mode, filterStatus, filterCategory, filterCity, filterAuthor, search]);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selected.size === articles.length) setSelected(new Set());
    else setSelected(new Set(articles.map(a => a.id)));
  };

  const bulkAction = (action: string) => {
    toast({ title: `${action}: ${selected.size} материалов` });
    setSelected(new Set());
  };

  const modeLabels: Record<FilterMode, string> = { drafts: 'Черновики', published: 'Опубликованные', all: 'Все материалы' };
  const modeIcons: Record<FilterMode, typeof FileText> = { drafts: FileText, published: Send, all: FileText };
  const Icon = modeIcons[mode];

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Link to="/admin/control/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><Icon className="w-6 h-6 text-primary" /> {modeLabels[mode]}</h1>
              <p className="text-muted-foreground text-sm">{articles.length} материалов</p>
            </div>
          </div>
          <Link to="/admin/control/news/editor/new">
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Создать новость</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск по заголовку, slug, источнику, тегам..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Статус" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              {allStatuses.map(s => <SelectItem key={s} value={s}>{EDITORIAL_STATUS_LABELS[s]}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Категория" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Город" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {CITIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterAuthor} onValueChange={setFilterAuthor}>
            <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Автор" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все авторы</SelectItem>
              {AUTHORS.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
            <span className="text-sm font-medium">Выбрано: {selected.size}</span>
            <Button variant="outline" size="sm" onClick={() => bulkAction('Опубликовано')}><Send className="w-3 h-3 mr-1" /> Опубликовать</Button>
            <Button variant="outline" size="sm" onClick={() => bulkAction('Отклонено')}><XCircle className="w-3 h-3 mr-1" /> Отклонить</Button>
            <Button variant="outline" size="sm" onClick={() => bulkAction('В архив')}><Archive className="w-3 h-3 mr-1" /> В архив</Button>
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => bulkAction('Удалено')}><Trash2 className="w-3 h-3 mr-1" /> Удалить</Button>
          </div>
        )}

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={selected.size === articles.length && articles.length > 0} onCheckedChange={toggleAll} /></TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Автор</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map(a => {
                const city = CITIES.find(c => c.id === a.cityId);
                const author = AUTHORS.find(au => au.id === a.authorId);
                return (
                  <TableRow key={a.id}>
                    <TableCell><Checkbox checked={selected.has(a.id)} onCheckedChange={() => toggleSelect(a.id)} /></TableCell>
                    <TableCell>
                      <Link to={`/admin/control/news/editor/${a.id}`} className="hover:underline">
                        <div className="font-medium text-sm max-w-[280px] truncate flex items-center gap-1">
                          {a.isUrgent && <AlertCircle className="w-3 h-3 text-destructive shrink-0" />}
                          {a.isFeatured && <Star className="w-3 h-3 text-amber-500 shrink-0" />}
                          {a.title}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs">{city?.name || '—'}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{a.category}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{author?.name} {author?.isAI && <Badge variant="secondary" className="text-[10px] ml-1">AI</Badge>}</TableCell>
                    <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${EDITORIAL_STATUS_COLORS[a.status]}`}>{EDITORIAL_STATUS_LABELS[a.status]}</span></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(a.updatedAt).toLocaleDateString('ru')}</TableCell>
                    <TableCell>
                      <Link to={`/admin/control/news/editor/${a.id}`}>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Открыть</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {articles.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">Нет материалов</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsListPage;
