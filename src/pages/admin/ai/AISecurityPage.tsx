import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/button';
import { ShieldAlert, UserX, Bot, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockThreats = [
  { type: 'Подозрительный аккаунт', desc: 'user_387 — 50 объявлений за 1 час', risk: 'Высокий' },
  { type: 'Спам-активность', desc: 'IP 192.168.1.x — массовая регистрация', risk: 'Критический' },
  { type: 'Бот-активность', desc: 'Автоматические запросы к API', risk: 'Средний' },
];

const AISecurityPage = () => {
  const { tasks, createTask, modules } = useAI();
  const { toast } = useToast();
  const mod = modules.find(m => m.id === 'security')!;
  const modTasks = tasks.filter(t => t.moduleId === 'security').slice(0, 10);

  const handleAction = (type: string, desc: string) => {
    if (!mod.enabled) { toast({ title: 'Модуль отключён', variant: 'destructive' }); return; }
    createTask({ moduleId: 'security', type, description: desc, status: 'new', priority: 'critical', needsApproval: true });
    toast({ title: 'Задача создана', description: desc });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-primary" /> AI Security</h1>
        <p className="text-muted-foreground mb-4">Антиспам, антибот, мониторинг подозрительной активности.</p>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 ${mod.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
          {mod.enabled ? '● Активен' : '○ Отключён'}
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-3">Угрозы (демо)</h2>
          <div className="space-y-2">
            {mockThreats.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-xs border-b border-border pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-3 h-3 ${t.risk === 'Критический' ? 'text-red-600' : t.risk === 'Высокий' ? 'text-orange-600' : 'text-yellow-600'}`} />
                  <span className="font-medium">{t.type}</span> — {t.desc}
                </div>
                <span className={`px-2 py-0.5 rounded-full ${t.risk === 'Критический' ? 'bg-red-100 text-red-700' : t.risk === 'Высокий' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-3">Быстрые действия</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => handleAction('Проверка аккаунтов', 'Проверить подозрительные аккаунты за 24 часа')}><UserX className="w-4 h-4 mr-1" /> Проверить аккаунты</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Антибот', 'Сканировать бот-активность')}><Bot className="w-4 h-4 mr-1" /> Антибот-сканирование</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Аудит безопасности', 'Полный аудит безопасности портала')}><ShieldAlert className="w-4 h-4 mr-1" /> Аудит безопасности</Button>
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

export default AISecurityPage;
