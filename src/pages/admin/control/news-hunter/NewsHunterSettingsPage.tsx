import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_SETTINGS, HunterSettings } from '@/data/newsHunterData';

const NewsHunterSettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<HunterSettings>({ ...DEFAULT_SETTINGS });
  const [newKeyword, setNewKeyword] = useState('');
  const [newSource, setNewSource] = useState('');

  const addKeyword = () => {
    if (newKeyword.trim() && !settings.keywords.includes(newKeyword.trim())) {
      setSettings(prev => ({ ...prev, keywords: [...prev.keywords, newKeyword.trim()] }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (kw: string) => {
    setSettings(prev => ({ ...prev, keywords: prev.keywords.filter(k => k !== kw) }));
  };

  const addSource = () => {
    if (newSource.trim() && !settings.prioritySources.includes(newSource.trim())) {
      setSettings(prev => ({ ...prev, prioritySources: [...prev.prioritySources, newSource.trim()] }));
      setNewSource('');
    }
  };

  const removeSource = (s: string) => {
    setSettings(prev => ({ ...prev, prioritySources: prev.prioritySources.filter(ps => ps !== s) }));
  };

  const handleSave = () => {
    toast({ title: '✅ Настройки сохранены', description: 'Параметры AI News Hunter обновлены' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Настройки AI News Hunter</h1>
            <p className="text-muted-foreground">Ключевые слова, частота, источники</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/control/news-hunter"><Button variant="outline" size="sm">← News Hunter</Button></Link>
            <Button onClick={handleSave} className="gap-1"><Save className="h-4 w-4" /> Сохранить</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Keywords */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Ключевые слова для поиска</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {settings.keywords.map(kw => (
                  <Badge key={kw} variant="secondary" className="gap-1 pr-1">
                    {kw}
                    <button onClick={() => removeKeyword(kw)} className="ml-1 hover:text-destructive"><X className="h-3 w-3" /></button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newKeyword} onChange={e => setNewKeyword(e.target.value)} placeholder="Добавить ключевое слово..." onKeyDown={e => e.key === 'Enter' && addKeyword()} />
                <Button variant="outline" size="icon" onClick={addKeyword}><Plus className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* Priority Sources */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Приоритетные источники</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {settings.prioritySources.map(s => (
                  <Badge key={s} variant="outline" className="gap-1 pr-1">
                    {s}
                    <button onClick={() => removeSource(s)} className="ml-1 hover:text-destructive"><X className="h-3 w-3" /></button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={newSource} onChange={e => setNewSource(e.target.value)} placeholder="Добавить источник (домен)..." onKeyDown={e => e.key === 'Enter' && addSource()} />
                <Button variant="outline" size="icon" onClick={addSource}><Plus className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* Frequency */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Параметры поиска</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Частота поиска (минуты)</Label>
                <Input type="number" value={settings.frequency} onChange={e => setSettings(prev => ({ ...prev, frequency: +e.target.value }))} min={5} max={1440} />
              </div>
              <div>
                <Label>Максимум новостей в день</Label>
                <Input type="number" value={settings.maxPerDay} onChange={e => setSettings(prev => ({ ...prev, maxPerDay: +e.target.value }))} min={1} max={200} />
              </div>
            </CardContent>
          </Card>

          {/* Automation */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Автоматизация</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Автоматическое переписывание</Label>
                  <p className="text-xs text-muted-foreground">AI переписывает текст без ручного запуска</p>
                </div>
                <Switch checked={settings.autoRewrite} onCheckedChange={v => setSettings(prev => ({ ...prev, autoRewrite: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Автоматическая категоризация</Label>
                  <p className="text-xs text-muted-foreground">AI определяет категорию новости</p>
                </div>
                <Switch checked={settings.autoCategory} onCheckedChange={v => setSettings(prev => ({ ...prev, autoCategory: v }))} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsHunterSettingsPage;
