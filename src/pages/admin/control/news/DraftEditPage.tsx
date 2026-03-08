import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Send, XCircle, Trash2, Image, RefreshCw, Tag, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNews } from '@/contexts/NewsContext';
import { MOCK_QUEUE, NEWS_CATEGORIES } from '@/data/newsPipelineData';

const STATUS_LABELS: Record<string, string> = {
  draft: 'Черновик',
  pending_review: 'На проверке',
  published: 'Опубликовано',
  rejected: 'Отклонено',
};

const DraftEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { publishNews } = useNews();

  // Find from mock data
  const mockItem = MOCK_QUEUE.find(n => n.id === id);

  const [form, setForm] = useState({
    title: mockItem?.title || mockItem?.originalTitle || '',
    description: mockItem?.summary || mockItem?.subtitle || '',
    content: mockItem?.content || mockItem?.originalText || '',
    image: mockItem?.imageUrl || '',
    category: mockItem?.category || 'Новости',
    tags: mockItem?.tags?.join(', ') || '',
    source: mockItem?.sourceName || '',
    sourceUrl: mockItem?.sourceUrl || '',
    seoTitle: mockItem?.seoTitle || '',
    seoDescription: mockItem?.seoDescription || '',
    status: 'draft' as string,
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    toast({ title: '✅ Черновик сохранён' });
  };

  const handlePublish = () => {
    publishNews({
      title: form.title,
      description: form.description,
      content: form.content,
      image: form.image,
      category: form.category,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      source: form.source,
      sourceUrl: form.sourceUrl,
      seoTitle: form.seoTitle,
      seoDescription: form.seoDescription,
    });
    toast({ title: '✅ Опубликовано', description: 'Новость сохранена со статусом "Опубликовано"' });
    navigate('/admin/control/news/published');
  };

  const handleReject = () => {
    setForm(prev => ({ ...prev, status: 'rejected' }));
    toast({ title: '❌ Отклонено' });
    navigate('/admin/control/news/drafts');
  };

  const handleDelete = () => {
    toast({ title: '🗑 Удалено' });
    navigate('/admin/control/news/drafts');
  };

  const handleAiRewrite = () => {
    toast({ title: '✍ AI переписывает текст...' });
    setTimeout(() => {
      update('content', form.content + '\n\n[AI переписал текст — уникальная версия]');
      toast({ title: '✅ Текст переписан AI' });
    }, 1000);
  };

  const handleAiSeo = () => {
    update('seoTitle', form.title.slice(0, 60));
    update('seoDescription', form.content.slice(0, 160));
    toast({ title: '✅ SEO сгенерировано AI' });
  };

  const handleAiCategory = () => {
    const cats = NEWS_CATEGORIES;
    update('category', cats[Math.floor(Math.random() * cats.length)]);
    toast({ title: '✅ Категория определена AI' });
  };

  const handleAiImage = () => {
    update('image', '/placeholder.svg');
    toast({ title: '✅ AI подобрал изображение' });
  };

  const handleAiTags = () => {
    const autoTags = [form.category.toLowerCase(), 'тюмень', form.source.toLowerCase().replace(/\s/g, '')].join(', ');
    update('tags', autoTags);
    toast({ title: '✅ Теги сгенерированы AI' });
  };

  if (!mockItem) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Черновик не найден</p>
          <Link to="/admin/control/news/drafts"><Button variant="outline" className="mt-4">← К черновикам</Button></Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/control/news/drafts"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Черновики</Button></Link>
            <div>
              <h1 className="text-xl font-bold">Редактирование черновика</h1>
              <p className="text-muted-foreground text-sm">ID: {id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Сохранить</Button>
            <Button size="sm" onClick={handlePublish}><Send className="w-4 h-4 mr-1" /> Опубликовать</Button>
            <Button variant="outline" size="sm" onClick={handleReject}><XCircle className="w-4 h-4 mr-1" /> Отклонить</Button>
            <Button variant="ghost" size="sm" className="text-destructive" onClick={handleDelete}><Trash2 className="w-4 h-4 mr-1" /> Удалить</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Заголовок</label>
              <Input value={form.title} onChange={e => update('title', e.target.value)} className="mt-1" />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Краткое описание</label>
              <Textarea value={form.description} onChange={e => update('description', e.target.value)} className="mt-1 min-h-[80px]" />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-muted-foreground">Текст новости</label>
                <Button variant="outline" size="sm" onClick={handleAiRewrite}><RefreshCw className="w-3 h-3 mr-1" /> AI переписать</Button>
              </div>
              <Textarea value={form.content} onChange={e => update('content', e.target.value)} className="mt-1 min-h-[250px]" />
            </div>

            {/* SEO */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">SEO</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleAiSeo}><Tag className="w-3 h-3 mr-1" /> AI SEO</Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">SEO Title</label>
                  <Input value={form.seoTitle} onChange={e => update('seoTitle', e.target.value)} className="mt-1 h-8 text-sm" placeholder="До 60 символов" />
                  <span className="text-[10px] text-muted-foreground">{form.seoTitle.length}/60</span>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">SEO Description</label>
                  <Textarea value={form.seoDescription} onChange={e => update('seoDescription', e.target.value)} className="mt-1 min-h-[60px] text-sm" placeholder="До 160 символов" />
                  <span className="text-[10px] text-muted-foreground">{form.seoDescription.length}/160</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1 col */}
          <div className="space-y-4">
            {/* Status */}
            <Card>
              <CardContent className="p-4">
                <label className="text-sm font-medium text-muted-foreground">Статус</label>
                <div className="mt-2">
                  <Badge variant="secondary">{STATUS_LABELS[form.status] || form.status}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Категория</label>
                  <Button variant="ghost" size="sm" onClick={handleAiCategory} className="h-6 text-xs">AI</Button>
                </div>
                <Select value={form.category} onValueChange={v => update('category', v)}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {NEWS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Теги</label>
                  <Button variant="ghost" size="sm" onClick={handleAiTags} className="h-6 text-xs">AI теги</Button>
                </div>
                <Input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="через запятую" className="h-8 text-sm" />
                <div className="flex flex-wrap gap-1">
                  {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                    <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Изображение</label>
                  <Button variant="ghost" size="sm" onClick={handleAiImage} className="h-6 text-xs"><Search className="w-3 h-3 mr-1" /> AI</Button>
                </div>
                {form.image ? (
                  <div className="relative">
                    <img src={form.image} alt="" className="w-full h-32 rounded object-cover" />
                    <button onClick={() => update('image', '')} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-32 rounded bg-muted flex items-center justify-center">
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <Input value={form.image} onChange={e => update('image', e.target.value)} placeholder="URL изображения" className="h-8 text-sm" />
              </CardContent>
            </Card>

            {/* Source */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Источник</label>
                <Input value={form.source} readOnly className="h-8 text-sm bg-muted" />
                {form.sourceUrl && (
                  <a href={form.sourceUrl} target="_blank" rel="noopener" className="text-xs text-primary hover:underline block truncate">{form.sourceUrl}</a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DraftEditPage;
