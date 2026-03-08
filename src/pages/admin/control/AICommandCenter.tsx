import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Link } from 'react-router-dom';
import {
  Newspaper, Shield, Search, BarChart3, FileText, Brain, MapPin,
  TrendingUp, Settings, Eye, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const agents = [
  { id: 'news' as const, label: 'AI News System', icon: Newspaper, to: '/admin/control/news', desc: 'Сбор, генерация и публикация новостей' },
  { id: 'moderation' as const, label: 'AI Ads Moderation', icon: FileText, to: '/admin/control/ads', desc: 'Модерация объявлений и контента' },
  { id: 'seo' as const, label: 'AI SEO Engine', icon: Search, to: '/admin/control/seo', desc: 'SEO-структура и мета-данные' },
  { id: 'content' as const, label: 'AI Content Studio', icon: Brain, to: '/admin/control/content', desc: 'Городские подборки и статьи' },
  { id: 'analytics' as const, label: 'AI Analytics', icon: BarChart3, to: '/admin/control/analytics', desc: 'Аналитика и отчёты' },
  { id: 'security' as const, label: 'AI Security', icon: Shield, to: '/admin/control/security', desc: 'Безопасность и антиспам' },
];

const specialAgents = [
  { label: 'AI City Intelligence', icon: MapPin, to: '/admin/control/city', desc: 'Городская аналитика и тренды', status: 'Активен' },
  { label: 'AI Growth Engine', icon: TrendingUp, to: '/admin/control/growth', desc: 'Рост портала, SEO-страницы, подборки', status: 'Активен' },
];

const AICommandCenter = () => {
  const { modules, tasks } = useAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" /> AI Command Center
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Управление всеми AI-агентами портала</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/control"><Button variant="outline" size="sm">← Центр управления</Button></Link>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{modules.filter(m => m.enabled).length + 2}</div>
            <div className="text-xs text-muted-foreground">Активных агентов</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'in_progress').length}</div>
            <div className="text-xs text-muted-foreground">В работе</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'needs_approval').length}</div>
            <div className="text-xs text-muted-foreground">На подтверждении</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'completed').length}</div>
            <div className="text-xs text-muted-foreground">Завершено</div>
          </CardContent></Card>
        </div>

        {/* Core AI Agents */}
        <h2 className="text-lg font-semibold mb-3">Основные AI-агенты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {agents.map(agent => {
            const mod = modules.find(m => m.id === agent.id);
            const modTasks = tasks.filter(t => t.moduleId === agent.id);
            const pending = modTasks.filter(t => t.status === 'needs_approval').length;
            const lastAction = modTasks.length > 0 ? modTasks[modTasks.length - 1].description : 'Нет действий';
            return (
              <Card key={agent.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-md p-2"><agent.icon className="w-5 h-5 text-primary" /></div>
                      <div>
                        <h3 className="font-semibold text-sm">{agent.label}</h3>
                        <p className="text-xs text-muted-foreground">{agent.desc}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${mod?.enabled ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                      {mod?.enabled ? 'Активен' : 'Выключен'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">Задач: {modTasks.length} {pending > 0 && <span className="text-yellow-600 ml-2">На подтверждении: {pending}</span>}</div>
                  <div className="text-xs text-muted-foreground mb-3 truncate">Последнее: {lastAction}</div>
                  <div className="flex gap-2">
                    <Link to={agent.to}><Button size="sm" variant="default" className="text-xs h-7">Открыть</Button></Link>
                    <Button size="sm" variant="outline" className="text-xs h-7"><Eye className="w-3 h-3 mr-1" /> Задачи</Button>
                    <Button size="sm" variant="outline" className="text-xs h-7"><Settings className="w-3 h-3" /></Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Special Agents */}
        <h2 className="text-lg font-semibold mb-3">Специализированные агенты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {specialAgents.map(agent => (
            <Card key={agent.label}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-md p-2"><agent.icon className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-sm">{agent.label}</h3>
                      <p className="text-xs text-muted-foreground">{agent.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{agent.status}</span>
                </div>
                <Link to={agent.to}><Button size="sm" variant="default" className="text-xs h-7">Открыть</Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/control/ai-networks"><Button variant="outline" size="sm">Нейросети</Button></Link>
          <Link to="/admin/control/api"><Button variant="outline" size="sm">API ключи</Button></Link>
          <Link to="/admin/control/tasks"><Button variant="outline" size="sm">Все задачи</Button></Link>
          <Link to="/admin/control/log"><Button variant="outline" size="sm">Журнал</Button></Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AICommandCenter;
