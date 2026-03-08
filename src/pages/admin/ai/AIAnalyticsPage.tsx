import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockStats = [
  { label: 'Просмотры за неделю', value: '12 450', trend: '+12%', up: true },
  { label: 'Популярная категория', value: 'Недвижимость', trend: '+8%', up: true },
  { label: 'Новые объявления', value: '156', trend: '+5%', up: true },
  { label: 'Проседающий раздел', value: 'Работа', trend: '-15%', up: false },
];

const AIAnalyticsPage = () => {
  const { tasks, createTask, modules } = useAI();
  const { toast } = useToast();
  const mod = modules.find(m => m.id === 'analytics')!;
  const modTasks = tasks.filter(t => t.moduleId === 'analytics').slice(0, 10);

  const handleAction = (type: string, desc: string) => {
    if (!mod.enabled) { toast({ title: 'Модуль отключён', variant: 'destructive' }); return; }
    createTask({ moduleId: 'analytics', type, description: desc, status: 'new', priority: 'medium', needsApproval: false });
    toast({ title: 'Задача создана', description: desc });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-primary" /> AI Analytics</h1>
        <p className="text-muted-foreground mb-4">Анализ просмотров, популярных разделов, рекомендации по развитию.</p>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 ${mod.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
          {mod.enabled ? '● Активен' : '○ Отключён'}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {mockStats.map(s => (
            <div key={s.label} className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold mt-1">{s.value}</p>
              <p className={`text-xs flex items-center gap-1 mt-1 ${s.up ? 'text-green-600' : 'text-red-600'}`}>
                {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {s.trend}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-3">Быстрые действия</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => handleAction('Недельный отчёт', 'Сформировать недельный отчёт по аналитике')}><BarChart3 className="w-4 h-4 mr-1" /> Недельный отчёт</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Анализ трендов', 'Проанализировать тренды за месяц')}><TrendingUp className="w-4 h-4 mr-1" /> Анализ трендов</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Рекомендации', 'Дать рекомендации по развитию портала')}><Eye className="w-4 h-4 mr-1" /> Рекомендации</Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold text-sm mb-3">Последние задачи</h2>
          {modTasks.length === 0 ? <p className="text-xs text-muted-foreground">Нет задач</p> : (
            <div className="space-y-2">
              {modTasks.map(t => (
                <div key={t.id} className="flex items-center justify-between text-xs border-b border-border pb-2">
                  <div><span className="font-medium">{t.type}</span> — {t.description}</div>
                  <span className="text-muted-foreground whitespace-nowrap ml-2">{t.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AIAnalyticsPage;
