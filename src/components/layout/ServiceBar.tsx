import { Cloud, TrendingUp, Car, User } from 'lucide-react';

const ServiceBar = () => {
  return (
    <div className="bg-service-bar text-service-bar-foreground text-xs">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-8">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Cloud className="w-3.5 h-3.5" />
            <span>−12°C</span>
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>$ 87.30 &nbsp; € 95.12</span>
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Car className="w-3.5 h-3.5" />
            <span>Пробки: 4 балла</span>
          </span>
          <span className="hidden lg:inline">Афиша</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">
            {new Date().toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' })}
          </span>
          <button className="flex items-center gap-1 hover:text-primary-foreground transition-colors">
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Войти</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceBar;
