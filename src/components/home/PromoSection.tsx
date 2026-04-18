import { promos } from '@/data/mockData';
import { Tag, ArrowRight } from 'lucide-react';

const PromoSection = () => {
  return (
    <div>
      <div className="flex items-end justify-between mb-3 border-b-2 border-foreground pb-1">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">Промокоды и скидки</h2>
        </div>
        <button className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">все промокоды →</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {promos.map(promo => (
          <div key={promo.id} className="news-card bg-card rounded-md p-3 border border-border/60 cursor-pointer flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center">
                <Tag className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[11px] font-extrabold bg-accent text-accent-foreground px-2 py-0.5 rounded uppercase">
                {promo.badge}
              </span>
            </div>
            <h3 className="text-[14px] font-bold leading-snug mb-1">{promo.title}</h3>
            <p className="text-[11px] text-muted-foreground line-clamp-2 flex-1">{promo.description}</p>
            <button className="text-[11px] text-primary font-semibold mt-2 flex items-center gap-1 hover:gap-1.5 transition-all">
              Получить <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSection;
