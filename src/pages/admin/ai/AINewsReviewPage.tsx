import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, FileText, RefreshCw, XCircle, Pencil, AlertTriangle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { MOCK_QUEUE } from '@/data/newsPipelineData';
import { useAI } from '@/contexts/AIContext';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const AINewsReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addLog, createTask } = useAI();
  const item = MOCK_QUEUE.find(n => n.id === id);

  const [title, setTitle] = useState(item?.title || '');
  const [subtitle, setSubtitle] = useState(item?.subtitle || '');
  const [summary, setSummary] = useState(item?.summary || '');
  const [content, setContent] = useState(item?.content || '');
  const [seoTitle, setSeoTitle] = useState(item?.seoTitle || '');
  const [seoDesc, setSeoDesc] = useState(item?.seoDescription || '');
  const [tags, setTags] = useState(item?.tags?.join(', ') || '');

  if (!item) {
    return <AdminLayout><div className="text-center py-12 text-muted-foreground">Материал не найден</div></AdminLayout>;
  }

  const handlePublish = () => {
    addLog({ moduleId: 'news', action: 'Публикация', details: `Опубликовано: "${title}"`, result: 'success' });
    toast({ title: 'Опубликовано', description: title });
    navigate('/admin/ai/news-queue');
  };

  const handleRegenerate = () => {
    createTask({ moduleId: 'news', type: 'Перегенерация', description: `Перегенерировать: "${item.originalTitle}"`, status: 'new', priority: 'medium', needsApproval: true });
    toast({ title: 'Отправлено на перегенерацию' });
  };

  const handleReject = () => {
    addLog({ moduleId: 'news', action: 'Отклонение', details: `Отклонено: "${title || item.originalTitle}"`, result: 'success' });
    toast({ title: 'Отклонено' });
    navigate('/admin/ai/news-queue');
  };

  const handleSaveDraft = () => {
    toast({ title: 'Сохранено как черновик' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/ai/news-queue"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Очередь</Button></Link>
          <h1 className="text-xl font-bold">Просмотр материала</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Original data */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="font-semibold text-sm mb-3 flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Исходные данные</h2>
            <div className="space-y-3 text-sm">
              <div><span className="text-xs text-muted-foreground">Источник:</span><p className="font-medium">{item.sourceName}</p></div>
              <div><span className="text-xs text-muted-foreground">URL:</span><p className="text-xs text-primary break-all">{item.sourceUrl}</p></div>
              <div><span className="text-xs text-muted-foreground">Оригинальный заголовок:</span><p className="font-medium">{item.originalTitle}</p></div>
              <div><span className="text-xs text-muted-foreground">Оригинальный текст:</span><p className="text-muted-foreground text-xs">{item.originalText}</p></div>
              <div><span className="text-xs text-muted-foreground">Дата:</span><p className="text-xs">{new Date(item.createdAt).toLocaleString('ru')}</p></div>
              <div><span className="text-xs text-muted-foreground">Категория:</span><p className="text-xs">{item.category} · {item.city}</p></div>
              <div><span className="text-xs text-muted-foreground">AI-модуль:</span><p className="text-xs">{item.aiModule}</p></div>
            </div>
            {item.factCheckNotes && (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-2">
                <div className="text-xs font-semibold text-amber-700 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Fact Check</div>
                <p className="text-xs text-amber-600 mt-1">{item.factCheckNotes}</p>
              </div>
            )}
          </div>

          {/* AI version (editable) */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="font-semibold text-sm mb-3 flex items-center gap-2"><Pencil className="w-4 h-4" /> AI-версия (редактируемая)</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Заголовок</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} className="h-8 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Подзаголовок</label>
                <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="h-8 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Анонс</label>
                <Textarea value={summary} onChange={e => setSummary(e.target.value)} className="text-sm min-h-[60px]" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Полный текст</label>
                <Textarea value={content} onChange={e => setContent(e.target.value)} className="text-sm min-h-[120px]" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">SEO Title</label>
                <Input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="h-8 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">SEO Description</label>
                <Input value={seoDesc} onChange={e => setSeoDesc(e.target.value)} className="h-8 text-sm mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Теги (через запятую)</label>
                <Input value={tags} onChange={e => setTags(e.target.value)} className="h-8 text-sm mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4 bg-card border border-border rounded-lg p-4">
          <Button size="sm" onClick={handlePublish}><Send className="w-4 h-4 mr-1" /> Опубликовать</Button>
          <Button size="sm" variant="outline" onClick={handleSaveDraft}><FileText className="w-4 h-4 mr-1" /> Сохранить как черновик</Button>
          <Button size="sm" variant="outline" onClick={handleRegenerate}><RefreshCw className="w-4 h-4 mr-1" /> Перегенерировать</Button>
          <Button size="sm" variant="outline" onClick={() => toast({ title: 'Отправлено в ручную редактуру' })}><Pencil className="w-4 h-4 mr-1" /> В ручную редактуру</Button>
          <Button size="sm" variant="destructive" onClick={handleReject}><XCircle className="w-4 h-4 mr-1" /> Отклонить</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsReviewPage;
