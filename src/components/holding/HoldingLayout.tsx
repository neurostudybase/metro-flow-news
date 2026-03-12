import { ReactNode, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Globe, Newspaper, Bot, Shield, Calendar, BarChart3, LogOut, TrendingUp, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Дашборд', to: '/admin/holding', icon: Building2, end: true },
  { label: 'Города', to: '/admin/holding/cities', icon: Globe },
  { label: 'Лента новостей', to: '/admin/holding/news', icon: Newspaper },
  { label: 'AI Новости', to: '/admin/holding/ai-news', icon: Bot },
  { label: 'Модерация', to: '/admin/holding/moderation', icon: Shield },
  { label: 'Календарь', to: '/admin/holding/calendar', icon: Calendar },
  { label: 'Аналитика', to: '/admin/holding/analytics', icon: BarChart3 },
  { label: 'Рост сети', to: '/admin/holding/growth', icon: TrendingUp },
  { label: 'AI Запуск городов', to: '/admin/holding/launcher', icon: Rocket },
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
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <nav className="bg-card rounded-lg border border-border p-4 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Медиахолдинг</h2>
            </div>
            <ul className="space-y-1">
              {menuItems.map(item => {
                const isActive = item.end
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border mt-4 pt-4">
              <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors w-full text-muted-foreground">
                ← Админ-панель
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-destructive hover:bg-secondary transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default HoldingLayout;
