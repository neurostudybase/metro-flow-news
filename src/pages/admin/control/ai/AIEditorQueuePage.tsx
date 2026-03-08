import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { MOCK_AI_EDITOR_ITEMS, AIEditorItem, EDITOR_STATUS_LABELS, NEWS_TYPE_LABELS } from '@/data/aiEditorData';
import { NEWS_CATEGORIES } from '@/data/newsPipelineData';
import { CITIES } from '@/data/citiesData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Brain, Search, Edit, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  processing: 'bg-blue-100 text-blue-700',
  draft: 'bg-yellow-100 text-yellow-700',
  review_required: 'bg-orange-100 text-orange-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const scoreColor = (s: number) => s >= 70 ? 'text-green-600' : s >= 40 ? 'text-yellow-600' : 'text-red-600';

const AIEditorQueuePage = () => {
  const [items, setItems] = useState<AIEditorItem[]>(MOCK_AI_EDITOR_ITEMS);
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editItem, setEditItem] = useState<AIEditorItem | null>(null);
  const [editCity, setEditCity] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editTags, setEditTags] = useState('');

  const filtered = items.filter(i => {
    if (search && !i.title.toLowerCase().includes(search.toLowerCase()) && !i.originalTitle.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCity !== 'all' && i.cityId !== filterCity) return false;
    if (filterCategory !== 'all' && i.categoryAuto !== filterCategory) return false;
    if (filterStatus !== 'all' && i.status !== filterStatus) return false;
    return true;
  });

  const openEdit = (item: AIEditorItem) => {
    setEditItem(item);
    setEditCity(item.cityId || '');
    setEditCategory(item.categoryManual || item.categoryAuto);
    setEditTitle(item.titleManual || item.title);
    setEditTags((item.tagsManual || item.tagsAuto).join(', '));
  };

  const saveEdit = () => {
    if (!editItem) return;
    setItems(prev => prev.map(i => i.id === editItem.id ? {
      ...i,
      cityManual: editCity || undefined,
      categoryManual: editCategory,
      titleManual: editTitle,
      tagsManual: editTags.split(',').map(t => t.trim()).filter(Boolean),
    } : i));
    setEditItem(null);
  };

  const setStatus = (id: string, status: AIEditorItem['status']) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Brain className="w-6 h-6 text-primary" /> AI Редактор — Очередь</h1>
            <p className="text-muted-foreground">Автоматически обработанные новости AI-редактором</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/control/ai/editor-log"><Button variant="outline" size="sm">Журнал</Button></Link>
            <Link to="/admin/control/ai/editor-settings"><Button variant="outline" size="sm">Настройки</Button></Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {(['draft', 'review_required', 'approved', 'rejected', 'processing'] as const).map(s => (
            <div key={s} className="bg-card border border-border rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{items.filter(i => i.status === s).length}</div>
              <div className="text-xs text-muted-foreground">{EDITOR_STATUS_LABELS[s]}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск по заголовку..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8" />
          </div>
          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Город" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {CITIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Категория" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Статус" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              {Object.entries(EDITOR_STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Нет данных</TableCell></TableRow>
              )}
              {filtered.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-[250px]">
                    <div className="font-medium text-sm truncate">{item.titleManual || item.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.sourceName}</div>
                  </TableCell>
                  <TableCell className="text-sm">{item.cityManual || item.cityName || <span className="text-orange-500">Не определён</span>}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{item.categoryManual || item.categoryAuto}</Badge></TableCell>
                  <TableCell className="text-xs">{NEWS_TYPE_LABELS[item.newsType]}</TableCell>
                  <TableCell className={`text-center font-bold ${scoreColor(item.contentScore)}`}>{item.contentScore}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>{EDITOR_STATUS_LABELS[item.status]}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(item)} title="Редактировать"><Edit className="w-3.5 h-3.5" /></Button>
                      {item.status !== 'approved' && <Button variant="ghost" size="icon" className="h-7 w-7 text-green-600" onClick={() => setStatus(item.id, 'approved')} title="Одобрить"><CheckCircle className="w-3.5 h-3.5" /></Button>}
                      {item.status !== 'rejected' && <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600" onClick={() => setStatus(item.id, 'rejected')} title="Отклонить"><XCircle className="w-3.5 h-3.5" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Редактировать новость</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Заголовок</Label>
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
              </div>
              <div>
                <Label>Город</Label>
                <Select value={editCity} onValueChange={setEditCity}>
                  <SelectTrigger><SelectValue placeholder="Выберите город" /></SelectTrigger>
                  <SelectContent>
                    {CITIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Категория</Label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Теги (через запятую)</Label>
                <Input value={editTags} onChange={e => setEditTags(e.target.value)} />
              </div>
              {editItem?.reviewNote && (
                <div className="bg-orange-50 border border-orange-200 rounded p-2 text-sm text-orange-700">{editItem.reviewNote}</div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditItem(null)}>Отмена</Button>
              <Button onClick={saveEdit}>Сохранить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AIEditorQueuePage;
