import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/button';
import { Search, Globe, FileText, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AISEOPage = () => {
  const { tasks, createTask, modules } = useAI();
  const { toast } = useToast();
  const mod = modules.find(m => m.id === 'seo')!;
  const modTasks = tasks.filter(t => t.moduleId === 'seo').slice(0, 10);

  const handleAction = (type: string, desc: string) => {
    if (!mod.enabled) { toast({ title: 'Модуль отключён', variant: 'destructive' }); return; }
    createTask({ moduleId: 'seo', type, description: desc, status: 'new', priority: 'medium', needsApproval: true });
    toast({ title: 'Задача создана', description: desc });
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Search className="w-6 h-6 text-primary" /> AI SEO Engine</h1>
        <p className="text-muted-foreground mb-4">SEO-рекомендации, мета-теги, перелинковка. Изменения только через подтверждение.</p>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 ${mod.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
          {mod.enabled ? '● Активен' : '○ Отключён'}
        </div>

        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm mb-3">Быстрые действия</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => handleAction('SEO-аудит', 'Собрать SEO-рекомендации для всех разделов')}><Globe className="w-4 h-4 mr-1" /> SEO-аудит сайта</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Мета-теги', 'Сгенерировать мета-заголовки и описания')}><FileText className="w-4 h-4 mr-1" /> Генерация мета-тегов</Button>
            <Button size="sm" variant="outline" onClick={() => handleAction('Перелинковка', 'Предложить схему внутренней перелинковки')}><Link2 className="w-4 h-4 mr-1" /> Перелинковка</Button>
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

export default AISEOPage;
