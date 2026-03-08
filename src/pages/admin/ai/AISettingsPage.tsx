import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { AI_MODULE_LABELS } from '@/types/ai';
import { Settings, Save, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const AISettingsPage = () => {
  const { modules, settings, updateModule, updateSettings } = useAI();
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    claude: '',
    perplexity: '',
  });

  const handleSave = () => {
    toast({ title: 'Настройки сохранены', description: 'Изменения применены ко всем AI-модулям' });
  };

  const handleApiKeySave = () => {
    toast({ title: 'API-ключи сохранены', description: 'Ключи нейросетей обновлены' });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Settings className="w-6 h-6 text-primary" /> Настройки AI</h1>
        <p className="text-muted-foreground mb-6">Управление параметрами AI-модулей, API-ключи и глобальные настройки</p>

        {/* API Keys */}
        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-4 flex items-center gap-2"><Key className="w-4 h-4 text-primary" /> API-ключи нейросетей</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">OpenAI API Key</Label>
              <p className="text-xs text-muted-foreground mb-1">Используется для: генерация новостей, редактирование текста, SEO</p>
              <Input
                type="password"
                value={apiKeys.openai}
                onChange={e => setApiKeys(p => ({ ...p, openai: e.target.value }))}
                placeholder="sk-..."
                className="max-w-md"
              />
            </div>
            <div>
              <Label className="text-sm">Claude API Key</Label>
              <p className="text-xs text-muted-foreground mb-1">Используется для: аналитика, редактура, длинные тексты</p>
              <Input
                type="password"
                value={apiKeys.claude}
                onChange={e => setApiKeys(p => ({ ...p, claude: e.target.value }))}
                placeholder="sk-ant-..."
                className="max-w-md"
              />
            </div>
            <div>
              <Label className="text-sm">Perplexity API Key</Label>
              <p className="text-xs text-muted-foreground mb-1">Используется для: поиск новостей, анализ источников</p>
              <Input
                type="password"
                value={apiKeys.perplexity}
                onChange={e => setApiKeys(p => ({ ...p, perplexity: e.target.value }))}
                placeholder="pplx-..."
                className="max-w-md"
              />
            </div>
            <Button size="sm" onClick={handleApiKeySave}><Save className="w-4 h-4 mr-2" /> Сохранить ключи</Button>
          </div>
        </div>

        {/* Global */}
        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-4">Глобальные настройки</h2>
          <div className="space-y-4">
            {[
              { key: 'globalAutoPublishDisabled' as const, label: 'Запрет автопубликации', desc: 'Все AI-действия требуют ручного подтверждения перед публикацией' },
              { key: 'globalApprovalRequired' as const, label: 'Обязательное подтверждение', desc: 'Все действия AI проходят через approval администратора' },
              { key: 'loggingEnabled' as const, label: 'Журналирование', desc: 'Записывать все действия AI в журнал' },
              { key: 'notificationsEnabled' as const, label: 'Уведомления', desc: 'Отправлять администратору уведомления о действиях AI' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">{item.label}</Label>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch checked={settings[item.key]} onCheckedChange={(v) => updateSettings({ [item.key]: v })} />
              </div>
            ))}
          </div>
        </div>

        {/* AI Roles Table */}
        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-4">Распределение нейросетей по задачам</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">Нейросеть</th>
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">Задачи</th>
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">API-ключ</th>
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-sm">OpenAI</td>
                  <td className="py-2 text-xs text-muted-foreground">Генерация новостей, заголовки, анонсы, SEO-блоки, переписывание коротких текстов</td>
                  <td className="py-2 text-xs">{apiKeys.openai ? <span className="text-green-600">Введён</span> : <span className="text-muted-foreground">Не введён</span>}</td>
                  <td className="py-2 text-xs">{apiKeys.openai ? <span className="text-green-600">● Активен</span> : <span className="text-muted-foreground">○ Неактивен</span>}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-sm">Claude</td>
                  <td className="py-2 text-xs text-muted-foreground">Длинные новости, редактура, аналитические материалы, проверка логики, сложные задачи</td>
                  <td className="py-2 text-xs">{apiKeys.claude ? <span className="text-green-600">Введён</span> : <span className="text-muted-foreground">Не введён</span>}</td>
                  <td className="py-2 text-xs">{apiKeys.claude ? <span className="text-green-600">● Активен</span> : <span className="text-muted-foreground">○ Неактивен</span>}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-sm">Perplexity</td>
                  <td className="py-2 text-xs text-muted-foreground">Поиск информации, анализ источников, проверка новостной повестки, поиск инфоповодов</td>
                  <td className="py-2 text-xs">{apiKeys.perplexity ? <span className="text-green-600">Введён</span> : <span className="text-muted-foreground">Не введён</span>}</td>
                  <td className="py-2 text-xs">{apiKeys.perplexity ? <span className="text-green-600">● Активен</span> : <span className="text-muted-foreground">○ Неактивен</span>}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Per module */}
        <h2 className="font-semibold text-sm mb-3">Настройки модулей</h2>
        <div className="space-y-4">
          {modules.map(mod => (
            <div key={mod.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{mod.name}</h3>
                <Switch checked={mod.enabled} onCheckedChange={() => updateModule(mod.id, { enabled: !mod.enabled })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs">Уровень автономности</Label>
                  <Select value={mod.autonomyLevel} onValueChange={(v) => updateModule(mod.id, { autonomyLevel: v as any })}>
                    <SelectTrigger className="mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Ручной</SelectItem>
                      <SelectItem value="semi">Полуавтоматический</SelectItem>
                      <SelectItem value="auto">Автоматический</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Лимит задач в день</Label>
                  <input type="number" value={mod.dailyTaskLimit} onChange={e => updateModule(mod.id, { dailyTaskLimit: Number(e.target.value) })} className="mt-1 h-8 w-full rounded-md border border-input bg-background px-3 text-xs" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch checked={mod.requireApproval} onCheckedChange={(v) => updateModule(mod.id, { requireApproval: v })} />
                    <Label className="text-xs">Требовать подтверждение</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={mod.logging} onCheckedChange={(v) => updateModule(mod.id, { logging: v })} />
                    <Label className="text-xs">Логирование</Label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Сохранить настройки</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AISettingsPage;
