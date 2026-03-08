import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { MessageSquare, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Prompt {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  text: string;
  defaultText: string;
}

const initialPrompts: Prompt[] = [
  { id: 'news-gen', name: 'Генерация новостей', category: 'Новости', enabled: true,
    text: 'Ты — редактор городского портала Тюмени. Напиши новость на основе предоставленных данных. Используй информативный стиль, факты и цифры.',
    defaultText: 'Ты — редактор городского портала Тюмени. Напиши новость на основе предоставленных данных. Используй информативный стиль, факты и цифры.' },
  { id: 'article-gen', name: 'Генерация статей', category: 'Контент', enabled: true,
    text: 'Создай подробную статью-подборку для жителей Тюмени. Включи полезную информацию, адреса, рекомендации.',
    defaultText: 'Создай подробную статью-подборку для жителей Тюмени. Включи полезную информацию, адреса, рекомендации.' },
  { id: 'seo-gen', name: 'SEO тексты', category: 'SEO', enabled: true,
    text: 'Сгенерируй SEO-оптимизированный текст для страницы. Включи ключевые слова, мета-описание и H1-H3 заголовки.',
    defaultText: 'Сгенерируй SEO-оптимизированный текст для страницы. Включи ключевые слова, мета-описание и H1-H3 заголовки.' },
  { id: 'topic-search', name: 'Поиск тем', category: 'Growth', enabled: true,
    text: 'Найди актуальные темы для городского портала Тюмени. Анализируй тренды, запросы и новости.',
    defaultText: 'Найди актуальные темы для городского портала Тюмени. Анализируй тренды, запросы и новости.' },
  { id: 'rewrite', name: 'Переписывание текста', category: 'Контент', enabled: false,
    text: 'Перепиши текст, сохранив смысл. Сделай его уникальным, читабельным и информативным.',
    defaultText: 'Перепиши текст, сохранив смысл. Сделай его уникальным, читабельным и информативным.' },
];

const ControlPromptsPage = () => {
  const [prompts, setPrompts] = useState(initialPrompts);
  const { toast } = useToast();

  const handleToggle = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const handleTextChange = (id: string, text: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, text } : p));
  };

  const handleReset = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, text: p.defaultText } : p));
    toast({ title: 'Промпт сброшен к значению по умолчанию' });
  };

  const handleSave = () => {
    toast({ title: 'Промпты сохранены' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" /> AI Prompts Engine
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Управление промптами для всех AI-модулей</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>Сохранить все</Button>
            <Link to="/admin/control"><Button variant="outline" size="sm">← Центр управления</Button></Link>
          </div>
        </div>

        <div className="space-y-4">
          {prompts.map(prompt => (
            <Card key={prompt.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">{prompt.name}</CardTitle>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{prompt.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={() => handleReset(prompt.id)} className="text-xs gap-1">
                      <RotateCcw className="w-3 h-3" /> Сброс
                    </Button>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`toggle-${prompt.id}`} className="text-xs">{prompt.enabled ? 'Вкл' : 'Выкл'}</Label>
                      <Switch id={`toggle-${prompt.id}`} checked={prompt.enabled} onCheckedChange={() => handleToggle(prompt.id)} />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={prompt.text}
                  onChange={e => handleTextChange(prompt.id, e.target.value)}
                  rows={3}
                  className="text-sm"
                  disabled={!prompt.enabled}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ControlPromptsPage;
