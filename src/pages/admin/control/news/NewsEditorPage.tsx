import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft, Save, Send, XCircle, Eye, RefreshCw, Tag, Calendar, CheckCircle,
  AlertTriangle, Image, Upload, Plus, Trash2, History, StickyNote, Star, Zap, AlertCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  EDITORIAL_ARTICLES, AUTHORS, EDITORIAL_STATUS_LABELS, EDITORIAL_STATUS_COLORS,
  EditorialStatus, REJECT_REASONS, validateArticleForPublish, checkAIQuality,
  EditorialArticle, NewsVersion,
} from '@/data/editorialData';
import { NEWS_CATEGORIES } from '@/data/newsPipelineData';
import { CITIES } from '@/data/citiesData';

const makeSlug = (title: string) =>
  title.toLowerCase().replace(/[^а-яa-z0-9\s]/gi, '').replace(/\s+/g, '-').slice(0, 80);

const NewsEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id || id === 'new';
  const article = isNew ? null : EDITORIAL_ARTICLES.find(a => a.id === id);

  const blankArticle: EditorialArticle = {
    id: `ea-new-${Date.now()}`, title: '', slug: '', description: '', content: '',
    subtitles: [], quote: '', image: '', imageCredit: '', imageSource: '', gallery: [],
    source: '', sourceUrl: '', category: 'Новости', tags: [], cityId: 'tyumen',
    status: 'draft', authorId: 'au-6', createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), seoTitle: '', seoDescription: '',
    editorNotes: '', isFeatured: false, isTop: false, isUrgent: false, versions: [],
  };

  const [form, setForm] = useState<EditorialArticle>(article || blankArticle);
  const [showPreview, setShowPreview] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showVersions, setShowVersions] = useState(false);

  const update = <K extends keyof EditorialArticle>(key: K, value: EditorialArticle[K]) =>
    setForm(prev => ({ ...prev, [key]: value, updatedAt: new Date().toISOString() }));

  const validation = useMemo(() => validateArticleForPublish(form), [form]);
  const quality = useMemo(() => checkAIQuality(form), [form]);
  const author = AUTHORS.find(a => a.id === form.authorId);

  if (!isNew && !article) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Материал не найден</p>
          <Link to="/admin/control/news"><Button variant="outline" className="mt-4">← Назад</Button></Link>
        </div>
      </AdminLayout>
    );
  }

  const handleStatusChange = (status: EditorialStatus) => {
    if (status === 'published' && !validation.valid) {
      toast({ title: '❌ Ошибка валидации', description: validation.errors.filter(e => !e.includes('рекомендуется')).join(', '), variant: 'destructive' });
      return;
    }
    if (status === 'rejected') { setShowReject(true); return; }
    update('status', status);
    if (status === 'published') update('publishedAt', new Date().toISOString());
    toast({ title: `Статус: ${EDITORIAL_STATUS_LABELS[status]}` });
  };

  const handleReject = () => {
    update('status', 'rejected');
    update('rejectReason', rejectReason);
    setShowReject(false);
    toast({ title: 'Материал отклонён', description: rejectReason });
  };

  const handleSave = () => {
    // Auto-slug
    if (!form.slug && form.title) update('slug', makeSlug(form.title));
    // Auto-schedule
    if (form.publishAt && new Date(form.publishAt) > new Date() && form.status === 'ready') {
      update('status', 'scheduled');
    }
    // Save version
    const version: NewsVersion = {
      id: `v-${Date.now()}`, articleId: form.id, title: form.title,
      content: form.content, changedBy: 'Редактор', changedAt: new Date().toISOString(),
    };
    update('versions', [...form.versions, version]);
    toast({ title: '✅ Сохранено' });
  };

  const handleGenerateSeo = () => {
    update('seoTitle', form.title.slice(0, 60));
    update('seoDescription', (form.description || form.content).slice(0, 160));
    toast({ title: 'SEO сгенерировано AI' });
  };

  const handleAIRewrite = () => toast({ title: '✍ AI переписывает текст...' });
  const handleAIImage = () => { update('image', '/placeholder.svg'); toast({ title: 'AI подобрал изображение' }); };
  const handleUploadImage = () => { update('image', '/placeholder.svg'); toast({ title: 'Изображение загружено' }); };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Link to="/admin/control/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
            <div>
              <h1 className="text-xl font-bold">{isNew ? 'Новый материал' : 'Редактор материала'}</h1>
              <p className="text-muted-foreground text-xs">
                {!isNew && <>ID: {id} • </>}
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${EDITORIAL_STATUS_COLORS[form.status]}`}>{EDITORIAL_STATUS_LABELS[form.status]}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => setShowVersions(true)}><History className="w-4 h-4 mr-1" /> Версии ({form.versions.length})</Button>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}><Eye className="w-4 h-4 mr-1" /> Предпросмотр</Button>
            <Button variant="outline" size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Сохранить</Button>
            {form.status !== 'published' && (
              <>
                <Button variant="outline" size="sm" onClick={() => handleStatusChange('review')}><CheckCircle className="w-4 h-4 mr-1" /> На проверку</Button>
                <Button size="sm" onClick={() => handleStatusChange('published')}><Send className="w-4 h-4 mr-1" /> Опубликовать</Button>
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleStatusChange('rejected')}><XCircle className="w-4 h-4 mr-1" /> Отклонить</Button>
              </>
            )}
            {form.status === 'published' && (
              <Button variant="outline" size="sm" onClick={() => handleStatusChange('archived')}>В архив</Button>
            )}
          </div>
        </div>

        {/* Validation warnings */}
        {validation.errors.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-amber-700 text-sm font-medium mb-1"><AlertCircle className="w-4 h-4" /> Проверка перед публикацией</div>
            <ul className="text-xs text-amber-600 space-y-0.5">
              {validation.errors.map((e, i) => <li key={i}>• {e}</li>)}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Заголовок *</label>
              <Input value={form.title} onChange={e => { update('title', e.target.value); if (!form.slug) update('slug', makeSlug(e.target.value)); }} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Slug</label>
              <Input value={form.slug} onChange={e => update('slug', e.target.value)} className="mt-1 text-sm" placeholder="auto-slug" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Лид (краткое вступление)</label>
              <Textarea value={form.description} onChange={e => update('description', e.target.value)} className="mt-1 min-h-[60px]" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-muted-foreground">Основной текст *</label>
                <Button variant="outline" size="sm" onClick={handleAIRewrite}><RefreshCw className="w-3 h-3 mr-1" /> AI переписать</Button>
              </div>
              <Textarea value={form.content} onChange={e => update('content', e.target.value)} className="mt-1 min-h-[220px]" />
              <span className="text-[10px] text-muted-foreground">{form.content.length} символов</span>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Подзаголовки</label>
              {form.subtitles.map((s, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <Input value={s} onChange={e => { const n = [...form.subtitles]; n[i] = e.target.value; update('subtitles', n); }} className="h-8 text-sm" />
                  <Button variant="ghost" size="sm" onClick={() => update('subtitles', form.subtitles.filter((_, j) => j !== i))}><Trash2 className="w-3 h-3" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-1" onClick={() => update('subtitles', [...form.subtitles, ''])}><Plus className="w-3 h-3 mr-1" /> Подзаголовок</Button>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Цитата</label>
              <Textarea value={form.quote} onChange={e => update('quote', e.target.value)} className="mt-1 min-h-[60px] italic" placeholder="Цитата для выделения в тексте" />
            </div>

            {/* SEO */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">SEO</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleGenerateSeo}><Tag className="w-3 h-3 mr-1" /> AI SEO</Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">SEO Title</label>
                  <Input value={form.seoTitle} onChange={e => update('seoTitle', e.target.value)} className="mt-1 h-8 text-sm" />
                  <span className="text-[10px] text-muted-foreground">{form.seoTitle.length}/60</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">SEO Description</label>
                  <Textarea value={form.seoDescription} onChange={e => update('seoDescription', e.target.value)} className="mt-1 min-h-[60px] text-sm" />
                  <span className="text-[10px] text-muted-foreground">{form.seoDescription.length}/160</span>
                </div>
              </CardContent>
            </Card>

            {/* Quality */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> AI Контроль качества</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium">Оценка:</span>
                  <span className={`text-lg font-bold ${quality.score >= 80 ? 'text-green-600' : quality.score >= 50 ? 'text-amber-600' : 'text-destructive'}`}>{quality.score}%</span>
                </div>
                <div className="space-y-1">
                  {quality.notes.map((note, i) => <div key={i} className="text-xs text-muted-foreground">{note}</div>)}
                </div>
              </CardContent>
            </Card>

            {/* Editor notes */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><StickyNote className="w-4 h-4" /> Заметки редакции</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Textarea value={form.editorNotes} onChange={e => update('editorNotes', e.target.value)} className="min-h-[80px] text-sm" placeholder="Внутренние заметки (видны только в админке)" />
              </CardContent>
            </Card>

            {form.rejectReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="text-sm font-medium text-red-700">Причина отклонения: {form.rejectReason}</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Status & Author */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Автор</label>
                  <Select value={form.authorId} onValueChange={v => update('authorId', v)}>
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {AUTHORS.map(a => <SelectItem key={a.id} value={a.id}>{a.name} {a.isAI && '(AI)'}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Город</label>
                  <Select value={form.cityId} onValueChange={v => update('cityId', v)}>
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CITIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Категория *</label>
                  <Select value={form.category} onValueChange={v => update('category', v)}>
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Теги</label>
                <Input
                  value={form.tags.join(', ')}
                  onChange={e => update('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                  className="h-8 text-sm" placeholder="через запятую"
                />
                <div className="flex flex-wrap gap-1">
                  {form.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                </div>
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Обложка</label>
                {form.image ? (
                  <div className="relative">
                    <img src={form.image} alt="" className="w-full h-32 rounded object-cover" />
                    <button onClick={() => update('image', '')} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <div className="w-full h-32 rounded bg-muted flex items-center justify-center"><Image className="w-8 h-8 text-muted-foreground" /></div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={handleUploadImage}><Upload className="w-3 h-3 mr-1" /> Загрузить</Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={handleAIImage}><Zap className="w-3 h-3 mr-1" /> AI</Button>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Автор фото</label>
                  <Input value={form.imageCredit} onChange={e => update('imageCredit', e.target.value)} className="h-7 text-xs" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Источник фото</label>
                  <Input value={form.imageSource} onChange={e => update('imageSource', e.target.value)} className="h-7 text-xs" />
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Галерея</label>
                <div className="flex flex-wrap gap-2">
                  {form.gallery.map((img, i) => (
                    <div key={i} className="relative w-16 h-16">
                      <img src={img} alt="" className="w-full h-full rounded object-cover" />
                      <button onClick={() => update('gallery', form.gallery.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"><Trash2 className="w-2.5 h-2.5" /></button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => { update('gallery', [...form.gallery, '/placeholder.svg']); toast({ title: 'Изображение добавлено в галерею' }); }}>
                  <Plus className="w-3 h-3 mr-1" /> Добавить
                </Button>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Запланировать</label>
                <Input type="datetime-local" value={form.publishAt || ''} onChange={e => update('publishAt', e.target.value)} className="h-8 text-sm" />
              </CardContent>
            </Card>

            {/* Flags */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Закрепление</label>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Главный материал</span>
                  <Switch checked={form.isFeatured} onCheckedChange={v => update('isFeatured', v)} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">В топ</span>
                  <Switch checked={form.isTop} onCheckedChange={v => update('isTop', v)} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Срочная</span>
                  <Switch checked={form.isUrgent} onCheckedChange={v => update('isUrgent', v)} />
                </div>
              </CardContent>
            </Card>

            {/* Source */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Источник</label>
                <Input value={form.source} onChange={e => update('source', e.target.value)} className="h-8 text-sm" />
                <Input value={form.sourceUrl} onChange={e => update('sourceUrl', e.target.value)} className="h-8 text-sm" placeholder="URL источника" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Предпросмотр</DialogTitle></DialogHeader>
          <article className="prose prose-sm max-w-none">
            {form.image && <img src={form.image} alt="" className="w-full h-48 rounded-lg object-cover mb-4" />}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{form.category}</Badge>
              {CITIES.find(c => c.id === form.cityId)?.name && <Badge variant="secondary">{CITIES.find(c => c.id === form.cityId)?.name}</Badge>}
              {form.isUrgent && <Badge variant="destructive">Срочно</Badge>}
            </div>
            <h1 className="text-2xl font-bold mb-2">{form.title || 'Без заголовка'}</h1>
            {form.description && <p className="text-muted-foreground font-medium text-base mb-4">{form.description}</p>}
            <div className="text-xs text-muted-foreground mb-4">{author?.name} • {new Date().toLocaleDateString('ru')}</div>
            {form.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            {form.quote && <blockquote className="border-l-4 border-primary pl-4 italic my-4">{form.quote}</blockquote>}
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-4">
                {form.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
              </div>
            )}
            {form.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {form.gallery.map((img, i) => <img key={i} src={img} alt="" className="w-full h-20 rounded object-cover" />)}
              </div>
            )}
          </article>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showReject} onOpenChange={setShowReject}>
        <DialogContent>
          <DialogHeader><DialogTitle>Причина отклонения</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {REJECT_REASONS.map(r => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={rejectReason === r} onCheckedChange={() => setRejectReason(r)} />
                <span className="text-sm">{r}</span>
              </label>
            ))}
            {rejectReason === 'Другое' && (
              <Input placeholder="Укажите причину" value="" onChange={e => setRejectReason(e.target.value)} />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReject(false)}>Отмена</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason}>Отклонить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Versions Dialog */}
      <Dialog open={showVersions} onOpenChange={setShowVersions}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>История версий</DialogTitle></DialogHeader>
          {form.versions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет сохранённых версий</p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {form.versions.slice().reverse().map(v => (
                <Card key={v.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{v.changedBy}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(v.changedAt).toLocaleString('ru')}</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{v.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default NewsEditorPage;
