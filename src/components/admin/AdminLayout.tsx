import { ReactNode, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useCity } from '@/contexts/CityContext';
import { LayoutDashboard, Users, FileText, Newspaper, Shield, LogOut, Bot, Command, Globe, MapPin, Building2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Панель', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Пользователи', to: '/admin/users', icon: Users },
  { label: 'Объявления', to: '/admin/ads', icon: FileText },
  { label: 'Контент', to: '/admin/content', icon: Newspaper },
  { label: 'AI Управление', to: '/admin/ai', icon: Bot },
  { label: 'Центр управления', to: '/admin/control', icon: Command },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cities, activeCity, setActiveCity } = useCity();
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
              <Shield className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Админ-панель</h2>
            </div>

            {/* City Selector */}
            <div className="mb-4 p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase">Город</span>
              </div>
              <Select value={activeCity.id} onValueChange={setActiveCity}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city.id} value={city.id}>
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${city.status === 'active' ? 'bg-green-500' : city.status === 'setup' ? 'bg-amber-500' : 'bg-muted-foreground'}`} />
                        {city.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-[10px] text-muted-foreground mt-1">{activeCity.domain}</div>
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

export default AdminLayout;
