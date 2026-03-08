import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Link } from 'react-router-dom';
import { 
  Newspaper, Shield, Search, BarChart3, FileText, Brain, MapPin, 
  Zap, RefreshCw, Eye, AlertTriangle, Settings, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const agents = [
  { id: 'news' as const, label: 'AI News System', icon: Newspaper, to: '/admin/control/news', desc: 'Сбор, генерация и публикация новостей' },
  { id: 'moderation' as const, label: 'AI Ads Moderation', icon: FileText, to: '/admin/control/ads', desc: 'Модерация объявлений и контента' },
  { id: 'seo' as const, label: 'AI SEO Engine', icon: Search, to: '/admin/control/seo', desc: 'SEO-структура и мета-данные' },
  { id: 'content' as const, label: 'AI Content Studio', icon: Brain, to: '/admin/control/content', desc: 'Городские подборки и статьи' },
  { id: 'analytics' as const, label: 'AI Analytics', icon: BarChart3, to: '/admin/control/analytics', desc: 'Аналитика и отчёты' },
  { id: 'security' as const, label: 'AI Security', icon: Shield, to: '/admin/control/security', desc: 'Безопасность и антиспам' },
];

const ControlDashboard = () => {
  const { modules, tasks, createTask, addLog } = useAI();

  const quickActions = [
    { label: 'Найти новые новости', icon: RefreshCw, action: () => { createTask({ moduleId: 'news', type: 'scan', description: 'Поиск новых новостей из источников', status: 'new', priority: 'high', needsApproval: false }); addLog({ moduleId: 'news', action: 'Поиск новостей', details: 'Запущен сканер источников', result: 'success' }); } },
    { label: 'Сгенерировать 10 новостей', icon: Zap, action: () => { createTask({ moduleId: 'news', type: 'generate', description: 'Генерация 10 новостей из очереди', status: 'new', priority: 'high', needsApproval: true }); } },
    { label: 'Проверить объявления', icon: Eye, action: () => { createTask({ moduleId: 'moderation', type: 'check', description: 'Проверка новых объявлений', status: 'new', priority: 'medium', needsApproval: false }); } },
    { label: 'Проверить SEO', icon: Search, action: () => { createTask({ moduleId: 'seo', type: 'audit', description: 'SEO-аудит страниц портала', status: 'new', priority: 'medium', needsApproval: false }); } },
    { label: 'Собрать отчёт', icon: BarChart3, action: () => { createTask({ moduleId: 'analytics', type: 'report', description: 'Сбор аналитического отчёта за неделю', status: 'new', priority: 'low', needsApproval: false }); } },
    { label: 'Проверить безопасность', icon: AlertTriangle, action: () => { createTask({ moduleId: 'security', type: 'scan', description: 'Сканирование подозрительной активности', status: 'new', priority: 'high', needsApproval: false }); } },
  ];

  const pendingApproval = tasks.filter(t => t.status === 'needs_approval').length;
  const activeTasks = tasks.filter(t => t.status === 'in_progress').length;

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> Центр управления порталом
            </h1>
            <p className="text-muted-foreground text-sm mt-1">AI-штаб: управление всеми модулями портала</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/control/tasks">
              <Button variant="outline" size="sm">Задачи ({tasks.length})</Button>
            </Link>
            <Link to="/admin/control/log">
              <Button variant="outline" size="sm">Журнал</Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{modules.filter(m => m.enabled).length}</div>
            <div className="text-xs text-muted-foreground">Активных модулей</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{activeTasks}</div>
            <div className="text-xs text-muted-foreground">В работе</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingApproval}</div>
            <div className="text-xs text-muted-foreground">На подтверждении</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
            <div className="text-xs text-muted-foreground">Завершено</div>
          </CardContent></Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quickActions.map(qa => (
                <Button key={qa.label} variant="outline" size="sm" onClick={qa.action} className="gap-1.5">
                  <qa.icon className="w-3.5 h-3.5" /> {qa.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Agents */}
        <h2 className="text-lg font-semibold mb-3">AI-агенты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {agents.map(agent => {
            const mod = modules.find(m => m.id === agent.id);
            const modTasks = tasks.filter(t => t.moduleId === agent.id);
            const pending = modTasks.filter(t => t.status === 'needs_approval').length;
            return (
              <Card key={agent.id} className="relative">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-md p-2">
                        <agent.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{agent.label}</h3>
                        <p className="text-xs text-muted-foreground">{agent.desc}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${mod?.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                      {mod?.enabled ? 'Активен' : 'Выключен'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>Задач: {modTasks.length}</span>
                    {pending > 0 && <span className="text-yellow-600 font-medium">На подтверждении: {pending}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Link to={agent.to}><Button size="sm" variant="default" className="text-xs h-7">Открыть</Button></Link>
                    <Button size="sm" variant="outline" className="text-xs h-7"><Settings className="w-3 h-3" /></Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* City Intelligence - special agent */}
          <Card className="relative">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-md p-2">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI City Intelligence</h3>
                    <p className="text-xs text-muted-foreground">Городская аналитика и тренды</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Активен</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span>Трендов: 5</span>
              </div>
              <div className="flex gap-2">
                <Link to="/admin/control/city"><Button size="sm" variant="default" className="text-xs h-7">Открыть</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom links */}
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/control/ai-networks"><Button variant="outline" size="sm">Распределение нейросетей</Button></Link>
          <Link to="/admin/control/api"><Button variant="outline" size="sm">API ключи</Button></Link>
          <Link to="/admin/control/tasks"><Button variant="outline" size="sm">Все задачи</Button></Link>
          <Link to="/admin/control/log"><Button variant="outline" size="sm">Журнал AI</Button></Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ControlDashboard;
