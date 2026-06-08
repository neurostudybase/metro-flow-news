import { ReactNode, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Building2, Globe, Newspaper, Bot, Shield, Calendar, BarChart3, LogOut,
  TrendingUp, Rocket, KeyRound, Workflow, LayoutGrid, Radio, ImageIcon,
  Search, Activity, Clock, Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuGroups: { title: string; items: { label: string; to: string; icon: any; end?: boolean }[] }[] = [
  {
    title: 'Центр управления',
    items: [
      { label: 'Дашборд', to: '/admin/holding', icon: Building2, end: true },
      { label: 'Города', to: '/admin/holding/cities', icon: Globe },
      { label: 'Доступы и роли', to: '/admin/holding/permissions', icon: Users },
    ],
  },
  {
    title: 'AI',
    items: [
      { label: 'AI Агенты', to: '/admin/holding/agents', icon: Bot },
      { label: 'AI API ключи', to: '/admin/holding/api-keys', icon: KeyRound },
      { label: 'AI производительность', to: '/admin/holding/ai-performance', icon: Activity },
      { label: 'AI Новости', to: '/admin/holding/ai-news', icon: Bot },
    ],
  },
  {
    title: 'Newsroom',
    items: [
      { label: 'Newsroom Kanban', to: '/admin/holding/newsroom', icon: LayoutGrid },
      { label: 'Pipeline', to: '/admin/holding/pipeline', icon: Workflow },
      { label: 'Источники', to: '/admin/holding/sources', icon: Radio },
      { label: 'Лента новостей', to: '/admin/holding/news', icon: Newspaper },
      { label: 'Медиатека', to: '/admin/holding/media', icon: ImageIcon },
    ],
  },
  {
    title: 'Операции',
    items: [
      { label: 'Модерация', to: '/admin/holding/moderation', icon: Shield },
      { label: 'Планировщик', to: '/admin/holding/scheduler', icon: Clock },
      { label: 'Календарь', to: '/admin/holding/calendar', icon: Calendar },
      { label: 'SEO центр', to: '/admin/holding/seo', icon: Search },
      { label: 'Аналитика', to: '/admin/holding/analytics', icon: BarChart3 },
      { label: 'Рост сети', to: '/admin/holding/growth', icon: TrendingUp },
      { label: 'AI Запуск городов', to: '/admin/holding/launcher', icon: Rocket },
    ],
  },
];

const HoldingLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    else if (!isAdmin) navigate('/cabinet');
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <nav className="bg-card rounded-lg border border-border p-3 h-fit sticky top-4">
            <div className="flex items-center gap-2 mb-3 px-2">
              <Building2 className="w-4 h-4 text-primary" />
              <h2 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Media OS</h2>
            </div>
            <div className="space-y-3">
              {menuGroups.map(group => (
                <div key={group.title}>
                  <div className="px-2 mb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{group.title}</div>
                  <ul className="space-y-0.5">
                    {group.items.map(item => {
                      const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
                      return (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            className={cn(
                              'flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors',
                              isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                            )}
                          >
                            <item.icon className="w-3.5 h-3.5" />
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-3 pt-3">
              <Link to="/admin" className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-secondary transition-colors w-full text-muted-foreground">
                ← Админ-панель
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-destructive hover:bg-secondary transition-colors w-full"
              >
                <LogOut className="w-3.5 h-3.5" /> Выйти
              </button>
            </div>
          </nav>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default HoldingLayout;
