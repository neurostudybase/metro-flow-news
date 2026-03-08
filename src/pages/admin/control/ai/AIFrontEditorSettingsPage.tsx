import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { defaultFrontEditorSettings, availableCities, type FrontEditorSettings } from '@/data/aiFrontEditorData';
import { useToast } from '@/hooks/use-toast';

const AIFrontEditorSettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<FrontEditorSettings>(defaultFrontEditorSettings);
  const [disabledCities, setDisabledCities] = useState<string[]>([]);

  const handleSave = () => {
    toast({ title: 'Настройки сохранены', description: 'Параметры AI редактора главной обновлены' });
  };

  const toggleCityDisabled = (cityId: string) => {
    setDisabledCities(prev => prev.includes(cityId) ? prev.filter(c => c !== cityId) : [...prev, cityId]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/control/ai/front-editor')}>
            <ArrowLeft className="h-4 w-4 mr-2" />Назад
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Настройки AI редактора главной</h1>
            <p className="text-muted-foreground">Параметры анализа и формирования главной страницы</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Основные настройки</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>AI Редактор включён</Label>
                <Switch checked={settings.enabled} onCheckedChange={v => setSettings(p => ({ ...p, enabled: v }))} />
              </div>
              <div className="space-y-2">
                <Label>Режим работы</Label>
                <Select value={settings.mode} onValueChange={v => setSettings(p => ({ ...p, mode: v as any }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestions_only">Только предложения</SelectItem>
                    <SelectItem value="editor_approval">Подтверждение редактора</SelectItem>
                    <SelectItem value="auto_update">Автообновление</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Количество главных новостей</Label>
                <Input type="number" value={settings.topStoriesCount} onChange={e => setSettings(p => ({ ...p, topStoriesCount: parseInt(e.target.value) || 5 }))} />
              </div>
              <div className="space-y-2">
                <Label>Минимальный score</Label>
                <Input type="number" value={settings.minScore} onChange={e => setSettings(p => ({ ...p, minScore: parseInt(e.target.value) || 50 }))} />
              </div>
              <div className="space-y-2">
                <Label>Интервал обновления (минуты)</Label>
                <Input type="number" value={settings.updateIntervalMinutes} onChange={e => setSettings(p => ({ ...p, updateIntervalMinutes: parseInt(e.target.value) || 30 }))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Города</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Отключите AI для конкретных городов</p>
              {availableCities.map(city => (
                <div key={city.id} className="flex items-center justify-between">
                  <Label>{city.name}</Label>
                  <Switch checked={!disabledCities.includes(city.id)} onCheckedChange={() => toggleCityDisabled(city.id)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Сохранить настройки</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AIFrontEditorSettingsPage;
