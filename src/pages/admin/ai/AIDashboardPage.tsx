import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { AI_MODULE_LABELS, AI_STATUS_LABELS, AIModuleId } from '@/types/ai';
import { Link } from 'react-router-dom';
import { Bot, Newspaper, Shield, Search, PenTool, BarChart3, ShieldAlert, Settings, ListTodo, Power, PowerOff, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MODULE_ICONS: Record<AIModuleId, typeof Bot> = {
  news: Newspaper,
  moderation: Shield,
  seo: Search,
  content: PenTool,
  analytics: BarChart3,
  security: ShieldAlert,
};

const MODULE_ROUTES: Record<AIModuleId, string> = {
  news: '/admin/ai/news',
  moderation: '/admin/ai/moderation',
  seo: '/admin/ai/seo',
  content: '/admin/ai/content',
  analytics: '/admin/ai/analytics',
  security: '/admin/ai/security',
};

const AIDashboardPage = () => {
  const { modules, tasks, toggleModule } = useAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Bot className="w-6 h-6 text-primary" /> AI Управление</h1>
            <p className="text-muted-foreground">Центральная панель управления AI-модулями портала</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/ai/tasks"><Button variant="outline" size="sm"><ListTodo className="w-4 h-4 mr-1" /> Задачи</Button></Link>
            <Link to="/admin/ai/settings"><Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-1" /> Настройки</Button></Link>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Активных модулей', value: modules.filter(m => m.enabled).length, total: modules.length },
            { label: 'Всего задач', value: tasks.length },
            { label: 'На подтверждении', value: tasks.filter(t => t.status === 'needs_approval').length },
            { label: 'В работе', value: tasks.filter(t => t.status === 'in_progress').length },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}{s.total !== undefined ? <span className="text-sm text-muted-foreground font-normal">/{s.total}</span> : null}</p>
            </div>
          ))}
        </div>

        {/* AI Coordinator */}
        <div className="bg-card border border-border rounded-lg p-5 mb-6">
          <h2 className="font-semibold text-sm flex items-center gap-2 mb-2"><Bot className="w-4 h-4 text-primary" /> AI Coordinator</h2>
          <p className="text-xs text-muted-foreground mb-3">Центральный модуль: приём задач, распределение по AI-модулям, отслеживание статусов, отправка на подтверждение администратору.</p>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/ai/tasks"><Button size="sm" variant="outline">Открыть задачи</Button></Link>
            <Link to="/admin/ai/settings"><Button size="sm" variant="outline">Настройки</Button></Link>
          </div>
        </div>

        {/* Modules Grid */}
        <h2 className="font-semibold mb-3">AI-модули</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(mod => {
            const Icon = MODULE_ICONS[mod.id];
            const modTasks = tasks.filter(t => t.moduleId === mod.id);
            const needsApproval = modTasks.filter(t => t.status === 'needs_approval').length;
            return (
              <div key={mod.id} className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-md p-2 ${mod.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Icon className={`w-4 h-4 ${mod.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{mod.name}</h3>
                      <span className={`text-xs ${mod.enabled ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {mod.enabled ? '● Активен' : '○ Отключён'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{mod.description}</p>
                <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><ListTodo className="w-3 h-3" /> {modTasks.length} задач</span>
                  {needsApproval > 0 && <span className="flex items-center gap-1 text-amber-600"><Clock className="w-3 h-3" /> {needsApproval} на подтв.</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant={mod.enabled ? 'destructive' : 'default'} onClick={() => toggleModule(mod.id)} className="text-xs">
                    {mod.enabled ? <><PowerOff className="w-3 h-3 mr-1" /> Отключить</> : <><Power className="w-3 h-3 mr-1" /> Включить</>}
                  </Button>
                  <Link to={MODULE_ROUTES[mod.id]}><Button size="sm" variant="outline" className="text-xs"><Eye className="w-3 h-3 mr-1" /> Открыть</Button></Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AIDashboardPage;
