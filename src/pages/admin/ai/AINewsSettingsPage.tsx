import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Save } from 'lucide-react';
import { useState } from 'react';
import { NEWS_PIPELINE_SETTINGS_DEFAULT } from '@/data/newsPipelineData';
import { useToast } from '@/hooks/use-toast';

const AINewsSettingsPage = () => {
  const [s, setS] = useState(NEWS_PIPELINE_SETTINGS_DEFAULT);
  const { toast } = useToast();

  const update = (key: string, val: any) => setS(prev => ({ ...prev, [key]: val }));

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/control/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-primary" /> Настройки AI-новостей</h1>
          </div>
        </div>

        {/* General */}
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <h2 className="font-semibold text-sm mb-4">Общие</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">AI News Pipeline</Label><p className="text-xs text-muted-foreground">Включить автоматический поток новостей</p></div>
              <Switch checked={s.pipelineEnabled} onCheckedChange={v => update('pipelineEnabled', v)} />
            </div>
            <div>
              <Label className="text-sm">Частота поиска (минуты)</Label>
              <Input type="number" value={s.searchFrequency} onChange={e => update('searchFrequency', Number(e.target.value))} className="max-w-[120px] h-8 text-sm mt-1" />
            </div>
            <div>
              <Label className="text-sm">Макс. новостей в день</Label>
              <Input type="number" value={s.maxNewsPerDay} onChange={e => update('maxNewsPerDay', Number(e.target.value))} className="max-w-[120px] h-8 text-sm mt-1" />
            </div>
            <div>
              <Label className="text-sm">География</Label>
              <Select value={s.geoFilter} onValueChange={v => update('geoFilter', v)}>
                <SelectTrigger className="max-w-[250px] h-8 text-xs mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tyumen_only">Только Тюмень</SelectItem>
                  <SelectItem value="tyumen_and_region">Тюмень + область</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">Всегда отправлять в черновики</Label><p className="text-xs text-muted-foreground">Новости сначала попадают в черновики</p></div>
              <Switch checked={s.alwaysSendToDrafts} onCheckedChange={v => update('alwaysSendToDrafts', v)} />
            </div>
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">Всегда требовать подтверждение</Label><p className="text-xs text-muted-foreground">Ни одна новость не публикуется без ручного одобрения</p></div>
              <Switch checked={s.alwaysRequireApproval} onCheckedChange={v => update('alwaysRequireApproval', v)} />
            </div>
          </div>
        </div>

        {/* Generation */}
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <h2 className="font-semibold text-sm mb-4">Генерация</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Длина новости</Label>
              <Select value={s.articleLength} onValueChange={v => update('articleLength', v)}>
                <SelectTrigger className="max-w-[200px] h-8 text-xs mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Короткая (до 300 слов)</SelectItem>
                  <SelectItem value="medium">Средняя (300–600 слов)</SelectItem>
                  <SelectItem value="long">Длинная (600+ слов)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Стиль заголовков</Label>
              <Select value={s.headlineStyle} onValueChange={v => update('headlineStyle', v)}>
                <SelectTrigger className="max-w-[200px] h-8 text-xs mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="informative">Информативный</SelectItem>
                  <SelectItem value="engaging">Привлекающий</SelectItem>
                  <SelectItem value="neutral">Нейтральный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Кол-во вариантов заголовков</Label>
              <Input type="number" value={s.headlineVariants} onChange={e => update('headlineVariants', Number(e.target.value))} className="max-w-[100px] h-8 text-sm mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Генерировать SEO автоматически</Label>
              <Switch checked={s.autoGenerateSeo} onCheckedChange={v => update('autoGenerateSeo', v)} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Генерировать теги автоматически</Label>
              <Switch checked={s.autoGenerateTags} onCheckedChange={v => update('autoGenerateTags', v)} />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <h2 className="font-semibold text-sm mb-4">Изображения</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">Использовать изображение из источника</Label><p className="text-xs text-muted-foreground">Извлекать основное изображение из оригинальной статьи</p></div>
              <Switch checked={s.useSourceImage} onCheckedChange={v => update('useSourceImage', v)} />
            </div>
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">Stock image как fallback</Label><p className="text-xs text-muted-foreground">Если изображение не найдено — подобрать stock</p></div>
              <Switch checked={s.useStockImageFallback} onCheckedChange={v => update('useStockImageFallback', v)} />
            </div>
          </div>
        </div>

        {/* Control */}
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <h2 className="font-semibold text-sm mb-4">Контроль</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">Запрет автопубликации</Label></div>
              <Switch checked={s.noAutoPublish} onCheckedChange={v => update('noAutoPublish', v)} />
            </div>
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">Уведомлять о новых черновиках</Label></div>
              <Switch checked={s.notifyOnDraft} onCheckedChange={v => update('notifyOnDraft', v)} />
            </div>
            <div className="flex items-center justify-between">
              <div><Label className="text-sm">Логировать все действия</Label></div>
              <Switch checked={s.logAllActions} onCheckedChange={v => update('logAllActions', v)} />
            </div>
          </div>
        </div>

        <Button onClick={() => toast({ title: 'Настройки сохранены' })}><Save className="w-4 h-4 mr-1" /> Сохранить настройки</Button>
      </div>
    </AdminLayout>
  );
};

export default AINewsSettingsPage;
