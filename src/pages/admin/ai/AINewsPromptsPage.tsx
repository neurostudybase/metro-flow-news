import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import { ArrowLeft, ScrollText, RotateCcw, Save } from 'lucide-react';
import { useState } from 'react';
import { MOCK_PROMPTS, type NewsPrompt } from '@/data/newsPipelineData';
import { useToast } from '@/hooks/use-toast';

const TYPE_LABELS: Record<NewsPrompt['type'], string> = {
  generation: 'Генерация', headline: 'Заголовки', seo: 'SEO', classification: 'Классификация', quality: 'Проверка качества',
};

const AINewsPromptsPage = () => {
  const [prompts, setPrompts] = useState<NewsPrompt[]>(MOCK_PROMPTS);
  const { toast } = useToast();

  const handleUpdate = (id: string, content: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, content, isDefault: false, updatedAt: new Date().toISOString() } : p));
  };

  const handleToggle = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const handleReset = (id: string) => {
    const original = MOCK_PROMPTS.find(p => p.id === id);
    if (original) {
      setPrompts(prev => prev.map(p => p.id === id ? { ...original } : p));
      toast({ title: 'Промпт сброшен к версии по умолчанию' });
    }
  };

  const handleSave = () => {
    toast({ title: 'Промпты сохранены' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/ai/news-pipeline"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Pipeline</Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2"><ScrollText className="w-6 h-6 text-primary" /> AI-промпты</h1>
            <p className="text-muted-foreground text-sm">Шаблоны промптов для генерации, классификации и проверки</p>
          </div>
          <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-1" /> Сохранить все</Button>
        </div>

        <div className="space-y-4">
          {prompts.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{p.name}</h3>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">{TYPE_LABELS[p.type]}</span>
                  {!p.isDefault && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Изменён</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => handleReset(p.id)}><RotateCcw className="w-3 h-3 mr-1" /> Сбросить</Button>
                  <Switch checked={p.enabled} onCheckedChange={() => handleToggle(p.id)} />
                </div>
              </div>
              <Textarea
                value={p.content}
                onChange={e => handleUpdate(p.id, e.target.value)}
                className="text-sm min-h-[80px]"
                disabled={!p.enabled}
              />
              <p className="text-[10px] text-muted-foreground mt-1">Обновлено: {new Date(p.updatedAt).toLocaleString('ru')}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsPromptsPage;
