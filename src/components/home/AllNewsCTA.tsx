import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';

const AllNewsCTA = () => {
  return (
    <Link
      to="/category/news"
      className="all-news-cta block rounded-md p-5 md:p-6 hover:opacity-95 transition-opacity"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-white/15 flex items-center justify-center flex-shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Лента 24/7</div>
            <div className="text-xl md:text-2xl font-bold leading-tight">Все новости Тюмени и области</div>
            <div className="text-xs opacity-80 mt-0.5">Обновляется каждые несколько минут — не пропустите главное</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
          Открыть <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default AllNewsCTA;
