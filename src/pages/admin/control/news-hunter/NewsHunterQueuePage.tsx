import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, ExternalLink, Eye, PenTool, XCircle, CheckCircle, Image, Tag, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MOCK_HUNTER_QUEUE, HUNTER_STATUS_LABELS, HUNTER_STATUS_COLORS, HunterNewsItem } from '@/data/newsHunterData';

const categories = ['Все', 'Новости', 'Город', 'Происшествия', 'Бизнес', 'Спорт', 'Культура', 'Общество'];
const statuses = ['Все', 'found', 'analyzing', 'ready', 'rejected', 'rewriting', 'draft_created'];

const NewsHunterQueuePage = () => {
  const { toast } = useToast();
  const [items, setItems] = useState(MOCK_HUNTER_QUEUE);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Все');
  const [filterCat, setFilterCat] = useState('Все');
  const [selected, setSelected] = useState<HunterNewsItem | null>(null);

  const filtered = items.filter(n => {
    if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.sourceName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== 'Все' && n.status !== filterStatus) return false;
    if (filterCat !== 'Все' && n.category !== filterCat) return false;
    return true;
  });

  const handleRewrite = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, status: 'rewriting' as const } : n));
    toast({ title: '✍ AI Rewriter запущен', description: 'Новость отправлена на переписывание...' });
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, status: 'rejected' as const } : n));
    toast({ title: '❌ Отклонено', description: 'Новость отклонена' });
  };

  const handleCreateDraft = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, status: 'draft_created' as const } : n));
    toast({ title: '📝 Черновик создан', description: 'Новость отправлена в черновики AI Редакции' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Очередь AI News Hunter</h1>
            <p className="text-muted-foreground">Найденные и анализируемые новости</p>
          </div>
          <Link to="/admin/control/news-hunter"><Button variant="outline" size="sm">← News Hunter</Button></Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск по заголовку или источнику..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-1 flex-wrap">
            {statuses.map(s => (
              <Button key={s} variant={filterStatus === s ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus(s)}>
                {s === 'Все' ? 'Все статусы' : HUNTER_STATUS_LABELS[s as keyof typeof HUNTER_STATUS_LABELS]}
              </Button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {categories.map(c => (
              <Button key={c} variant={filterCat === c ? 'default' : 'outline'} size="sm" onClick={() => setFilterCat(c)}>{c}</Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Источник</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Запрос</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium text-sm max-w-[300px] truncate">{item.title}</div>
                      <div className="text-[10px] text-muted-foreground">{new Date(item.foundAt).toLocaleString('ru')}</div>
                    </TableCell>
                    <TableCell>
                      <a href={item.sourceUrl} target="_blank" rel="noopener" className="text-sm text-primary hover:underline flex items-center gap-1">
                        {item.sourceName} <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell>{item.category ? <Badge variant="secondary">{item.category}</Badge> : '—'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{item.query || '—'}</TableCell>
                    <TableCell>
                      <Badge className={HUNTER_STATUS_COLORS[item.status]}>{HUNTER_STATUS_LABELS[item.status]}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setSelected(item)} title="Просмотр"><Eye className="h-4 w-4" /></Button>
                        {(item.status === 'found' || item.status === 'ready') && (
                          <Button variant="ghost" size="icon" onClick={() => handleRewrite(item.id)} title="Переписать"><PenTool className="h-4 w-4 text-orange-500" /></Button>
                        )}
                        {item.status === 'rewriting' && (
                          <Button variant="ghost" size="icon" onClick={() => handleCreateDraft(item.id)} title="Создать черновик"><CheckCircle className="h-4 w-4 text-green-500" /></Button>
                        )}
                        {item.status !== 'rejected' && item.status !== 'draft_created' && (
                          <Button variant="ghost" size="icon" onClick={() => handleReject(item.id)} title="Отклонить"><XCircle className="h-4 w-4 text-destructive" /></Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Нет результатов</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail dialog */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selected && (
              <>
                <DialogHeader>
                  <DialogTitle>{selected.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={HUNTER_STATUS_COLORS[selected.status]}>{HUNTER_STATUS_LABELS[selected.status]}</Badge>
                    {selected.category && <Badge variant="secondary">{selected.category}</Badge>}
                    {selected.isTyumen && <Badge variant="outline" className="text-green-600">✓ Тюмень</Badge>}
                    {selected.isAd && <Badge variant="destructive">Реклама</Badge>}
                    {!selected.isNews && <Badge variant="destructive">Не новость</Badge>}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Источник:</span> <a href={selected.sourceUrl} target="_blank" rel="noopener" className="text-primary hover:underline">{selected.sourceName}</a></div>
                    <div><span className="text-muted-foreground">Найдено:</span> {new Date(selected.foundAt).toLocaleString('ru')}</div>
                    {selected.query && <div><span className="text-muted-foreground">Запрос:</span> {selected.query}</div>}
                  </div>

                  {selected.imageUrl && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center gap-1"><Image className="h-4 w-4" /> Изображение</h4>
                      <img src={selected.imageUrl} alt="" className="rounded-lg max-h-48 object-cover w-full" />
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-semibold mb-1">Оригинальный текст</h4>
                    <div className="bg-muted p-3 rounded text-sm">{selected.extractedText || 'Текст не извлечён'}</div>
                  </div>

                  {selected.rewrittenTitle && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center gap-1"><PenTool className="h-4 w-4 text-orange-500" /> Переписанный заголовок</h4>
                      <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded text-sm font-medium">{selected.rewrittenTitle}</div>
                    </div>
                  )}

                  {selected.rewrittenText && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Переписанный текст</h4>
                      <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded text-sm">{selected.rewrittenText}</div>
                    </div>
                  )}

                  {selected.seoTitle && (
                    <div>
                      <h4 className="text-sm font-semibold mb-1 flex items-center gap-1"><Tag className="h-4 w-4 text-primary" /> SEO</h4>
                      <div className="text-sm"><strong>Title:</strong> {selected.seoTitle}</div>
                      <div className="text-sm"><strong>Description:</strong> {selected.seoDescription}</div>
                      {selected.tags && <div className="flex gap-1 mt-1">{selected.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}</div>}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {(selected.status === 'found' || selected.status === 'ready') && (
                      <Button onClick={() => { handleRewrite(selected.id); setSelected(null); }} className="gap-1"><PenTool className="h-4 w-4" /> Переписать</Button>
                    )}
                    {selected.status === 'rewriting' && (
                      <Button onClick={() => { handleCreateDraft(selected.id); setSelected(null); }} className="gap-1"><CheckCircle className="h-4 w-4" /> Создать черновик</Button>
                    )}
                    {selected.status !== 'rejected' && selected.status !== 'draft_created' && (
                      <Button variant="destructive" onClick={() => { handleReject(selected.id); setSelected(null); }}>Отклонить</Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default NewsHunterQueuePage;
