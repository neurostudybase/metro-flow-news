import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { User, FileText, PlusCircle, Bell, Bookmark, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const menuItems = [
  { label: 'Главная', to: '/cabinet', icon: User, end: true },
  { label: 'Профиль', to: '/cabinet/profile', icon: User },
  { label: 'Мои объявления', to: '/cabinet/ads', icon: FileText },
  { label: 'Разместить', to: '/cabinet/new-listing', icon: PlusCircle },
];

const CabinetLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar menu */}
          <nav className="bg-card rounded-lg border border-border p-4 h-fit">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Личный кабинет</h2>
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
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
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

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default CabinetLayout;
