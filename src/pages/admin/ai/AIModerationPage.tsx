import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/button';
import { Shield, Search, MessageSquare, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIModerationPage = () => {
  const { tasks, createTask, modules } = useAI();
  const { toast } = useToast();
  const mod = modules.find(m => m.id === 'moderation')!;
  const modTasks = tasks.filter(t => t.moduleId === 'moderation').slice(0, 10);

  const handleAction = (type: string, desc: string) => {
    if (!mod.enabled) { toast({ title: 'Модуль отключён', variant: 'destructive' }); return; }
    createTask({ moduleId: 'moderation', type, description: desc, status: 'new', priority: 'high', needsApproval: true });
    toast({ title: 'Задача создана', description: desc });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> AI Moderation</h1>
        <p className="text-muted-foreground mb-4">Проверка объявлений, комментариев, выявление спама. Финальное решение — за администратором.</p>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 ${mod.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
          {mod.enabled ? '● Активен' : '○ Отключён'}
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-3">Быстрые действия</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => handleAction('Проверка объявлений', 'Проверить новые объявления на спам и нарушения')}><Search className="w-4 h-4 mr-1" /> Проверить новые объявления</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Проверка комментариев', 'Проанализировать новые комментарии')}><MessageSquare className="w-4 h-4 mr-1" /> Проверить комментарии</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Анализ рисков', 'Выявить подозрительный контент')}><AlertTriangle className="w-4 h-4 mr-1" /> Анализ рисков</Button>
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

export default AIModerationPage;
