import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Bell, Menu, UserCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/mockData';

const MainHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="bg-header text-header-foreground sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl tracking-tight whitespace-nowrap">
            Тюмень<span className="text-primary">.инфо</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={cat.slug === 'obyavleniya' ? '/obyavleniya' : `/category/${cat.slug}`}
                className="px-2.5 py-1.5 text-sm rounded-md hover:bg-header-foreground/10 transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Поиск..."
                className="bg-header-foreground/10 text-header-foreground placeholder:text-header-foreground/50 rounded-md px-3 py-1.5 text-sm w-48 outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-header-foreground/10 rounded-md transition-colors">
              <Search className="w-5 h-5" />
            </button>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className="p-2 hover:bg-header-foreground/10 rounded-md transition-colors"
              title="Админ-панель"
            >
              <Shield className="w-5 h-5" />
            </Link>
          )}
          <Link
            to={isAuthenticated ? '/cabinet' : '/login'}
            className="p-2 hover:bg-header-foreground/10 rounded-md transition-colors"
            title={isAuthenticated ? 'Личный кабинет' : 'Войти'}
          >
            <UserCircle className="w-5 h-5" />
          </Link>
          <button className="p-2 hover:bg-header-foreground/10 rounded-md transition-colors hidden sm:block">
            <Bell className="w-5 h-5" />
          </button>
          <button
            className="p-2 hover:bg-header-foreground/10 rounded-md transition-colors lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="lg:hidden bg-header border-t border-header-foreground/10 px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={cat.slug === 'obyavleniya' ? '/obyavleniya' : `/category/${cat.slug}`}
                className="px-3 py-1.5 text-sm rounded-md bg-header-foreground/10 hover:bg-header-foreground/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default MainHeader;
