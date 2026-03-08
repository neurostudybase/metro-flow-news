import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { useNews } from '@/contexts/NewsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { FileText, Pencil, Trash2, RefreshCw, Send, ArrowLeft, Image, Tag, Search as SearchIcon, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const NEWS_CATEGORIES = ['Новости', 'Город', 'Происшествия', 'Бизнес', 'Спорт', 'Культура', 'Общество'];

interface Draft {
  id: string;
  title: string;
  source: string;
  category: string;
  createdAt: string;
  status: 'draft' | 'rewriting' | 'ready' | 'published';
  content: string;
  imageUrl: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

const MOCK_DRAFTS: Draft[] = [
  { id: 'd-1', title: 'В Тюмени открылся новый ледовый дворец', source: 'AI генерация', category: 'Город', createdAt: '2026-03-08T10:00:00', status: 'ready', content: 'В Тюмени состоялось торжественное открытие нового ледового дворца вместимостью 5000 зрителей. Объект стал крупнейшим спортивным сооружением в регионе. Строительство велось два года и обошлось в 3,5 миллиарда рублей.', imageUrl: '/placeholder.svg', seoTitle: 'Новый ледовый дворец в Тюмени — открытие 2026', seoDescription: 'В Тюмени открылся новый ледовый дворец на 5000 мест.', tags: ['спорт', 'тюмень', 'ледовый дворец'] },
  { id: 'd-2', title: 'Бизнес-форум «Тюмень 2026» пройдёт в апреле', source: 'RSS: ТюменьПро', category: 'Бизнес', createdAt: '2026-03-08T09:30:00', status: 'draft', content: 'В апреле в Тюмени пройдёт крупный бизнес-форум с участием более 2000 предпринимателей из 40 регионов России.', imageUrl: '', seoTitle: 'Бизнес-форум Тюмень 2026', seoDescription: 'Бизнес-форум Тюмень 2026 пройдёт в апреле.', tags: ['бизнес', 'форум'] },
  { id: 'd-3', title: 'ДТП на объездной: столкнулись 3 машины', source: 'AI сбор', category: 'Происшествия', createdAt: '2026-03-08T09:00:00', status: 'rewriting', content: 'На объездной дороге Тюмени произошло столкновение трёх автомобилей. По предварительным данным, пострадавших нет.', imageUrl: '/placeholder.svg', seoTitle: 'ДТП на объездной Тюмени', seoDescription: 'На объездной дороге Тюмени столкнулись 3 машины.', tags: ['дтп', 'происшествия'] },
  { id: 'd-4', title: 'Тюменский «Рубин» выиграл кубок области', source: 'AI генерация', category: 'Спорт', createdAt: '2026-03-07T18:00:00', status: 'ready', content: 'Тюменский хоккейный клуб «Рубин» одержал победу в финале кубка Тюменской области по хоккею.', imageUrl: '/placeholder.svg', seoTitle: 'Рубин — чемпион Тюменской области', seoDescription: 'Тюменский «Рубин» выиграл кубок области по хоккею.', tags: ['спорт', 'хоккей', 'рубин'] },
  { id: 'd-5', title: 'Выставка современного искусства открылась в музее', source: 'RSS: Культура72', category: 'Культура', createdAt: '2026-03-07T15:00:00', status: 'draft', content: 'В Тюменском краеведческом музее открылась выставка современного искусства.', imageUrl: '', seoTitle: '', seoDescription: '', tags: ['культура', 'выставка'] },
  { id: 'd-6', title: 'Новые тарифы на ЖКХ с 1 апреля', source: 'AI сбор', category: 'Общество', createdAt: '2026-03-07T12:00:00', status: 'ready', content: 'С 1 апреля в Тюменской области изменятся тарифы на жилищно-коммунальные услуги. Рост составит от 4% до 9%.', imageUrl: '/placeholder.svg', seoTitle: 'Новые тарифы ЖКХ в Тюмени с апреля 2026', seoDescription: 'Тарифы ЖКХ изменятся с 1 апреля. Рост 4-9%.', tags: ['жкх', 'тарифы'] },
];

const STATUS_LABELS: Record<Draft['status'], string> = {
  draft: 'Черновик', rewriting: 'Переписывается', ready: 'Готов к публикации', published: 'Опубликован',
};
const STATUS_COLORS: Record<Draft['status'], string> = {
  draft: 'bg-muted text-muted-foreground', rewriting: 'bg-amber-100 text-amber-700', ready: 'bg-green-100 text-green-700', published: 'bg-primary/10 text-primary',
};

const AINewsDraftsPage = () => {
  const [drafts, setDrafts] = useState<Draft[]>(MOCK_DRAFTS);
  const [editDraft, setEditDraft] = useState<Draft | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const { toast } = useToast();
  const { addLog } = useAI();
  const { publishNews } = useNews();

  const filtered = drafts.filter(d => {
    if (filterStatus !== 'all' && d.status !== filterStatus) return false;
    if (filterCategory !== 'all' && d.category !== filterCategory) return false;
    if (search && !d.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handlePublish = (draft: Draft) => {
    setDrafts(prev => prev.map(d => d.id === draft.id ? { ...d, status: 'published' as const } : d));
    addLog({ moduleId: 'news', action: 'Публикация новости', details: `"${draft.title}"`, result: 'success' });
    toast({ title: 'Опубликовано', description: draft.title });
  };

  const handleRewrite = (draft: Draft) => {
    setDrafts(prev => prev.map(d => d.id === draft.id ? { ...d, status: 'rewriting' as const } : d));
    toast({ title: 'Отправлено на переписывание AI' });
  };

  const handleDelete = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
    toast({ title: 'Черновик удалён' });
  };

  const handleSaveEdit = () => {
    if (!editDraft) return;
    setDrafts(prev => prev.map(d => d.id === editDraft.id ? editDraft : d));
    setEditDraft(null);
    toast({ title: 'Черновик обновлён' });
  };

  const handleGenerateSeo = () => {
    if (!editDraft) return;
    setEditDraft({
      ...editDraft,
      seoTitle: editDraft.title.slice(0, 60),
      seoDescription: editDraft.content.slice(0, 160),
    });
    toast({ title: 'SEO сгенерировано AI' });
  };

  const handleAutoClassify = () => {
    if (!editDraft) return;
    const cats = NEWS_CATEGORIES;
    const random = cats[Math.floor(Math.random() * cats.length)];
    setEditDraft({ ...editDraft, category: random });
    toast({ title: `AI классифицировал: ${random}` });
  };

  const handleFindImage = () => {
    if (!editDraft) return;
    setEditDraft({ ...editDraft, imageUrl: '/placeholder.svg' });
    toast({ title: 'AI подобрал изображение' });
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Link to="/admin/control/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2"><FileText className="w-6 h-6 text-primary" /> Черновики новостей</h1>
            <p className="text-muted-foreground text-sm">AI-подготовленные материалы для проверки и публикации</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск по заголовку..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Статус" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="draft">Черновик</SelectItem>
              <SelectItem value="rewriting">Переписывается</SelectItem>
              <SelectItem value="ready">Готов</SelectItem>
              <SelectItem value="published">Опубликован</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Категория" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>SEO</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(d => (
                <TableRow key={d.id}>
                  <TableCell>
                    {d.imageUrl ? (
                      <img src={d.imageUrl} alt="" className="w-8 h-8 rounded object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <Image className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-sm max-w-[260px] truncate">{d.title}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{d.category}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{d.source}</TableCell>
                  <TableCell>
                    {d.seoTitle ? (
                      <span className="text-xs text-green-600">✓ SEO</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(d.createdAt).toLocaleDateString('ru')}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[d.status]}`}>{STATUS_LABELS[d.status]}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => setEditDraft(d)}><Pencil className="w-3 h-3 mr-1" /> Открыть</Button>
                      {d.status !== 'published' && (
                        <>
                          <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleRewrite(d)}><RefreshCw className="w-3 h-3" /></Button>
                          <Button size="sm" variant="default" className="text-xs h-7" onClick={() => handlePublish(d)}><Send className="w-3 h-3" /></Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive" onClick={() => handleDelete(d.id)}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground text-sm py-8">Нет черновиков</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit Modal */}
        <Dialog open={!!editDraft} onOpenChange={() => setEditDraft(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {editDraft && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Pencil className="w-4 h-4" /> Редактирование черновика</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Заголовок</label>
                    <Input value={editDraft.title} onChange={e => setEditDraft({ ...editDraft, title: e.target.value })} className="mt-1" />
                  </div>

                  {/* Category + Source */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Категория</label>
                      <div className="flex gap-2 mt-1">
                        <Select value={editDraft.category} onValueChange={v => setEditDraft({ ...editDraft, category: v })}>
                          <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline" onClick={handleAutoClassify}><Tag className="w-3 h-3 mr-1" /> AI</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Источник</label>
                      <Input value={editDraft.source} readOnly className="mt-1 h-9 bg-muted" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Текст новости</label>
                    <Textarea value={editDraft.content} onChange={e => setEditDraft({ ...editDraft, content: e.target.value })} className="mt-1 min-h-[150px]" />
                  </div>

                  {/* Image */}
                  <Card>
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-xs flex items-center gap-1"><Image className="w-3.5 h-3.5" /> Изображение</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-center gap-3">
                        {editDraft.imageUrl ? (
                          <div className="relative">
                            <img src={editDraft.imageUrl} alt="" className="w-20 h-14 rounded object-cover" />
                            <button onClick={() => setEditDraft({ ...editDraft, imageUrl: '' })} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-20 h-14 rounded bg-muted flex items-center justify-center">
                            <Image className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="space-y-1">
                          <Button size="sm" variant="outline" className="text-xs h-7" onClick={handleFindImage}>
                            <SearchIcon className="w-3 h-3 mr-1" /> AI подобрать изображение
                          </Button>
                          <p className="text-[10px] text-muted-foreground">AI найдёт подходящее изображение из источника или stock</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* SEO Block */}
                  <Card>
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-xs flex items-center justify-between">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> SEO блок</span>
                        <Button size="sm" variant="outline" className="text-xs h-6" onClick={handleGenerateSeo}>AI генерировать SEO</Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 space-y-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground">SEO Title (до 60 символов)</label>
                        <Input value={editDraft.seoTitle} onChange={e => setEditDraft({ ...editDraft, seoTitle: e.target.value })} className="h-8 text-xs mt-0.5" />
                        <span className="text-[10px] text-muted-foreground">{editDraft.seoTitle.length}/60</span>
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground">SEO Description (до 160 символов)</label>
                        <Textarea value={editDraft.seoDescription} onChange={e => setEditDraft({ ...editDraft, seoDescription: e.target.value })} className="text-xs min-h-[60px] mt-0.5" />
                        <span className="text-[10px] text-muted-foreground">{editDraft.seoDescription.length}/160</span>
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground">Теги</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {editDraft.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                              <button onClick={() => setEditDraft({ ...editDraft, tags: editDraft.tags.filter((_, j) => j !== i) })} className="ml-1">
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </Badge>
                          ))}
                          <Button size="sm" variant="ghost" className="text-xs h-6" onClick={() => {
                            const tag = prompt('Новый тег:');
                            if (tag) setEditDraft({ ...editDraft, tags: [...editDraft.tags, tag] });
                          }}>+ тег</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => handleRewrite(editDraft)}><RefreshCw className="w-4 h-4 mr-1" /> Переписать AI</Button>
                  <Button variant="outline" onClick={() => setEditDraft(null)}>Отмена</Button>
                  <Button onClick={handleSaveEdit}>Сохранить</Button>
                  {editDraft.status !== 'published' && (
                    <Button onClick={() => { handlePublish(editDraft); setEditDraft(null); }} className="bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4 mr-1" /> Опубликовать
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AINewsDraftsPage;
