import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';

const Footer = () => {
  return (
    <footer className="bg-header text-header-foreground mt-8">
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-xl mb-3">
              Тюмень<span className="text-primary">.инфо</span>
            </div>
            <p className="text-sm text-header-foreground/60 leading-relaxed">
              Городской информационный портал. Актуальные новости Тюмени и Тюменской области.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-header-foreground/70">Рубрики</h4>
            <div className="flex flex-col gap-1.5">
              {categories.slice(0, 4).map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} className="text-sm text-header-foreground/60 hover:text-header-foreground transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-header-foreground/70">Ещё</h4>
            <div className="flex flex-col gap-1.5">
              {categories.slice(4).map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} className="text-sm text-header-foreground/60 hover:text-header-foreground transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-header-foreground/70">Контакты</h4>
            <div className="flex flex-col gap-1.5 text-sm text-header-foreground/60">
              <span>Редакция: +7 (3452) 00-00-00</span>
              <span>info@tyumen.info</span>
              <span>г. Тюмень, ул. Республики, 1</span>
            </div>
          </div>
        </div>
        <div className="border-t border-header-foreground/10 mt-8 pt-6 text-center text-xs text-header-foreground/40">
          © {new Date().getFullYear()} Тюмень.инфо. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
