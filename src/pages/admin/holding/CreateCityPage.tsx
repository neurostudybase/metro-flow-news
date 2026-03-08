import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Globe, Newspaper, Building2, FileText, Search, Bot, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { City } from '@/data/citiesData';

const DEFAULT_CATEGORIES = ['Новости', 'Город', 'Происшествия', 'Бизнес', 'Спорт', 'Культура', 'Общество', 'Объявления', 'Каталог компаний'];
const DEFAULT_SEO_PAGES = ['/restorany', '/avtoservisy', '/stomatologii', '/nedvizhimost', '/rabota'];

interface SetupStep {
  id: string;
  label: string;
  icon: React.ElementType;
  status: 'pending' | 'running' | 'done';
}

const CreateCityPage = () => {
  const { addCity } = useCity();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    slug: '',
    domain: '',
    region: '',
    country: 'Россия',
    timezone: 'Europe/Moscow',
    status: 'setup' as City['status'],
  });

  const [isCreating, setIsCreating] = useState(false);
  const [steps, setSteps] = useState<SetupStep[]>([]);

  const handleSlugFromName = (name: string) => {
    const translitMap: Record<string, string> = {
      'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y',
      'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
      'х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
      ' ':'-',
    };
    const slug = name.toLowerCase().split('').map(c => translitMap[c] ?? c).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
    return slug;
  };

  const updateField = (key: string, value: string) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'name') {
        next.slug = handleSlugFromName(value);
        next.domain = next.slug + '.info';
      }
      return next;
    });
  };

  const runSetup = async () => {
    const setupSteps: SetupStep[] = [
      { id: 'city', label: 'Создание записи города', icon: Globe, status: 'pending' },
      { id: 'sections', label: 'Создание базовых разделов', icon: Newspaper, status: 'pending' },
      { id: 'seo', label: 'Генерация SEO-страниц', icon: FileText, status: 'pending' },
      { id: 'news', label: 'Подключение AI News Hunter', icon: Search, status: 'pending' },
      { id: 'content', label: 'Запуск AI Content Engine', icon: Bot, status: 'pending' },
      { id: 'ads', label: 'Активация доски объявлений', icon: Building2, status: 'pending' },
      { id: 'catalog', label: 'Активация каталога компаний', icon: Building2, status: 'pending' },
    ];
    setSteps(setupSteps);
    setIsCreating(true);

    for (let i = 0; i < setupSteps.length; i++) {
      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

      if (i === 0) {
        addCity({
          name: form.name,
          slug: form.slug,
          domain: form.domain,
          region: form.region,
          country: form.country,
          status: form.status,
          timezone: form.timezone,
          searchKeywords: [
            `${form.name} новости`,
            `происшествия ${form.name}`,
            `${form.name} сегодня`,
          ],
        });
      }

      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'done' } : s));
    }

    setIsCreating(false);
    toast.success(`Портал ${form.name} создан и настроен!`);
  };

  const canCreate = form.name && form.slug && form.domain && form.region;

  return (
    <HoldingLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Plus className="w-6 h-6 text-primary" /> Создать городской портал
        </h1>
        <p className="text-muted-foreground mb-6">Новый город будет автоматически настроен со всеми разделами</p>

        {/* Form */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Название города *</Label>
              <Input placeholder="Томск" value={form.name} onChange={e => updateField('name', e.target.value)} disabled={isCreating} />
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input placeholder="tomsk" value={form.slug} onChange={e => updateField('slug', e.target.value)} disabled={isCreating} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Домен *</Label>
              <Input placeholder="tomsk.info" value={form.domain} onChange={e => setForm(p => ({ ...p, domain: e.target.value }))} disabled={isCreating} />
            </div>
            <div className="space-y-2">
              <Label>Регион *</Label>
              <Input placeholder="Томская область" value={form.region} onChange={e => setForm(p => ({ ...p, region: e.target.value }))} disabled={isCreating} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Страна</Label>
              <Input value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))} disabled={isCreating} />
            </div>
            <div className="space-y-2">
              <Label>Часовой пояс</Label>
              <Select value={form.timezone} onValueChange={v => setForm(p => ({ ...p, timezone: v }))} disabled={isCreating}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                  <SelectItem value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</SelectItem>
                  <SelectItem value="Asia/Omsk">Омск (UTC+6)</SelectItem>
                  <SelectItem value="Asia/Krasnoyarsk">Красноярск (UTC+7)</SelectItem>
                  <SelectItem value="Asia/Novosibirsk">Новосибирск (UTC+7)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Статус</Label>
              <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as City['status'] }))} disabled={isCreating}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="setup">Настройка</SelectItem>
                  <SelectItem value="active">Активен</SelectItem>
                  <SelectItem value="disabled">Отключён</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Preview */}
        {form.name && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3">Что будет создано автоматически</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Разделы:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {DEFAULT_CATEGORIES.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">SEO-страницы:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {DEFAULT_SEO_PAGES.map(p => <Badge key={p} variant="outline">{form.domain}{p}</Badge>)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">AI News Hunter — ключевые слова:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {[`${form.name} новости`, `происшествия ${form.name}`, `бизнес ${form.name}`, `спорт ${form.name}`].map(k => (
                    <Badge key={k} variant="outline">{k}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">AI задачи при запуске:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="secondary">Найти новости {form.name}</Badge>
                  <Badge variant="secondary">Сгенерировать 5 статей</Badge>
                  <Badge variant="secondary">Создать SEO-страницы</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup progress */}
        {steps.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3">Настройка портала</h3>
            <div className="space-y-2">
              {steps.map(step => (
                <div key={step.id} className="flex items-center gap-3 text-sm">
                  {step.status === 'done' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {step.status === 'running' && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                  {step.status === 'pending' && <div className="w-4 h-4 rounded-full border border-muted-foreground" />}
                  <step.icon className="w-4 h-4 text-muted-foreground" />
                  <span className={step.status === 'done' ? 'text-foreground' : 'text-muted-foreground'}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {!isCreating && steps.every(s => s.status !== 'done') && (
            <Button onClick={runSetup} disabled={!canCreate || isCreating} size="lg">
              <Plus className="w-4 h-4 mr-2" /> Создать портал
            </Button>
          )}
          {steps.length > 0 && steps.every(s => s.status === 'done') && (
            <Button onClick={() => navigate('/admin/holding/cities')} size="lg">
              Перейти к списку городов
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate('/admin/holding/cities')} disabled={isCreating}>
            Отмена
          </Button>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default CreateCityPage;
