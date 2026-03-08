import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Send, XCircle, Trash2, Image, RefreshCw, Tag, Search, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EDITORIAL_ARTICLES, EDITORIAL_TEAM, EDITORIAL_STATUS_LABELS, EDITORIAL_STATUS_COLORS, EditorialStatus } from '@/data/editorialData';
import { NEWS_CATEGORIES } from '@/data/newsPipelineData';

const EditorialArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const article = EDITORIAL_ARTICLES.find(a => a.id === id);

  const [form, setForm] = useState({
    title: article?.title || '',
    description: article?.description || '',
    content: article?.content || '',
    image: article?.image || '',
    category: article?.category || 'Новости',
    tags: article?.tags?.join(', ') || '',
    source: article?.source || '',
    sourceUrl: article?.sourceUrl || '',
    seoTitle: article?.seoTitle || '',
    seoDescription: article?.seoDescription || '',
    publishAt: article?.publishAt || '',
    status: (article?.status || 'draft') as EditorialStatus,
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));
  const author = EDITORIAL_TEAM.find(m => m.id === article?.authorId);
  const editor = article?.editorId ? EDITORIAL_TEAM.find(m => m.id === article.editorId) : null;

  if (!article) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Материал не найден</p>
          <Link to="/admin/control/editorial/queue"><Button variant="outline" className="mt-4">← К очереди</Button></Link>
        </div>
      </AdminLayout>
    );
  }

  const handleStatusChange = (status: EditorialStatus) => {
    setForm(prev => ({ ...prev, status }));
    toast({ title: `Статус: ${EDITORIAL_STATUS_LABELS[status]}` });
    if (status === 'published' || status === 'rejected') {
      setTimeout(() => navigate('/admin/control/editorial/queue'), 500);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/control/editorial/queue"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Очередь</Button></Link>
            <div>
              <h1 className="text-xl font-bold">Карточка материала</h1>
              <p className="text-muted-foreground text-sm">ID: {id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast({ title: '✅ Сохранено' })}><Save className="w-4 h-4 mr-1" /> Сохранить</Button>
            {form.status !== 'published' && (
              <>
                <Button variant="outline" size="sm" onClick={() => handleStatusChange('review')}><CheckCircle className="w-4 h-4 mr-1" /> На проверку</Button>
                <Button size="sm" onClick={() => handleStatusChange('published')}><Send className="w-4 h-4 mr-1" /> Опубликовать</Button>
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleStatusChange('rejected')}><XCircle className="w-4 h-4 mr-1" /> Отклонить</Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Заголовок</label>
              <Input value={form.title} onChange={e => update('title', e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Описание</label>
              <Textarea value={form.description} onChange={e => update('description', e.target.value)} className="mt-1 min-h-[80px]" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-muted-foreground">Текст</label>
                <Button variant="outline" size="sm" onClick={() => toast({ title: '✍ AI переписывает...' })}><RefreshCw className="w-3 h-3 mr-1" /> AI переписать</Button>
              </div>
              <Textarea value={form.content} onChange={e => update('content', e.target.value)} className="mt-1 min-h-[250px]" />
            </div>

            {/* SEO */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">SEO</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => { update('seoTitle', form.title.slice(0, 60)); update('seoDescription', form.content.slice(0, 160)); toast({ title: 'SEO сгенерировано' }); }}><Tag className="w-3 h-3 mr-1" /> AI SEO</Button>
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
            {article.qualityScore !== undefined && (
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Контроль качества AI</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium">Оценка:</span>
                    <span className={`text-lg font-bold ${article.qualityScore >= 80 ? 'text-green-600' : article.qualityScore >= 50 ? 'text-amber-600' : 'text-destructive'}`}>{article.qualityScore}%</span>
                  </div>
                  {article.qualityNotes && (
                    <div className="space-y-1">
                      {article.qualityNotes.map((note, i) => (
                        <div key={i} className="text-xs text-muted-foreground">{note}</div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Статус</label>
                  <div className="mt-1"><span className={`text-xs px-2 py-0.5 rounded-full ${EDITORIAL_STATUS_COLORS[form.status]}`}>{EDITORIAL_STATUS_LABELS[form.status]}</span></div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Автор</label>
                  <div className="text-sm mt-1">{author?.name || '—'} {author?.isAI && <Badge variant="secondary" className="text-[10px] ml-1">AI</Badge>}</div>
                </div>
                {editor && (
                  <div>
                    <label className="text-xs text-muted-foreground">Редактор</label>
                    <div className="text-sm mt-1">{editor.name}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Категория</label>
                <Select value={form.category} onValueChange={v => update('category', v)}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Теги</label>
                <Input value={form.tags} onChange={e => update('tags', e.target.value)} className="h-8 text-sm" placeholder="через запятую" />
                <div className="flex flex-wrap gap-1">
                  {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Изображение</label>
                  <Button variant="ghost" size="sm" onClick={() => { update('image', '/placeholder.svg'); toast({ title: 'AI подобрал изображение' }); }} className="h-6 text-xs"><Search className="w-3 h-3 mr-1" /> AI</Button>
                </div>
                {form.image ? (
                  <img src={form.image} alt="" className="w-full h-32 rounded object-cover" />
                ) : (
                  <div className="w-full h-32 rounded bg-muted flex items-center justify-center"><Image className="w-8 h-8 text-muted-foreground" /></div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Запланировать публикацию</label>
                <Input type="datetime-local" value={form.publishAt} onChange={e => update('publishAt', e.target.value)} className="h-8 text-sm" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Источник</label>
                <div className="text-sm">{form.source || '—'}</div>
                {form.sourceUrl && <a href={form.sourceUrl} target="_blank" rel="noopener" className="text-xs text-primary hover:underline block truncate">{form.sourceUrl}</a>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorialArticlePage;
