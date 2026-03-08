import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { DEFAULT_AI_EDITOR_SETTINGS, AIEditorSettings } from '@/data/aiEditorData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AIEditorSettingsPage = () => {
  const [settings, setSettings] = useState<AIEditorSettings>(DEFAULT_AI_EDITOR_SETTINGS);
  const { toast } = useToast();

  const update = <K extends keyof AIEditorSettings>(key: K, val: AIEditorSettings[K]) =>
    setSettings(prev => ({ ...prev, [key]: val }));

  const save = () => {
    toast({ title: 'Настройки сохранены', description: 'Параметры AI Редактора обновлены' });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-primary" /> Настройки AI Редактора</h1>
            <p className="text-muted-foreground">Параметры автоматической обработки новостей</p>
          </div>
          <Link to="/admin/control/ai/editor"><Button variant="outline" size="sm">← Очередь</Button></Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6 max-w-xl">
          <div>
            <Label>Минимальный Score для автоматического черновика</Label>
            <Input type="number" value={settings.minScore} onChange={e => update('minScore', Number(e.target.value))} className="mt-1 w-32" />
            <p className="text-xs text-muted-foreground mt-1">Новости ниже этого значения отправляются на ручную проверку</p>
          </div>

          <div>
            <Label>Максимум новостей в день</Label>
            <Input type="number" value={settings.maxNewsPerDay} onChange={e => update('maxNewsPerDay', Number(e.target.value))} className="mt-1 w-32" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Автопубликация</Label>
              <p className="text-xs text-muted-foreground">Публиковать одобренные новости автоматически</p>
            </div>
            <Switch checked={settings.autoPublishEnabled} onCheckedChange={v => update('autoPublishEnabled', v)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Автокатегоризация</Label>
              <p className="text-xs text-muted-foreground">AI определяет категорию новости</p>
            </div>
            <Switch checked={settings.autoCategorizationEnabled} onCheckedChange={v => update('autoCategorizationEnabled', v)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Определение города</Label>
              <p className="text-xs text-muted-foreground">AI определяет город по тексту</p>
            </div>
            <Switch checked={settings.autoCityDetection} onCheckedChange={v => update('autoCityDetection', v)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Генерация тегов</Label>
              <p className="text-xs text-muted-foreground">AI автоматически генерирует теги</p>
            </div>
            <Switch checked={settings.autoTagGeneration} onCheckedChange={v => update('autoTagGeneration', v)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Генерация заголовков</Label>
              <p className="text-xs text-muted-foreground">AI генерирует уникальный заголовок</p>
            </div>
            <Switch checked={settings.autoHeadlineGeneration} onCheckedChange={v => update('autoHeadlineGeneration', v)} />
          </div>

          <Button onClick={save}>Сохранить настройки</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AIEditorSettingsPage;
