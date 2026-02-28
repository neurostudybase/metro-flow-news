import { promos } from '@/data/mockData';
import { Tag } from 'lucide-react';

const PromoSection = () => {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-base">Промокоды</h2>
        <button className="text-xs text-primary font-medium hover:underline">Все промокоды →</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {promos.map(promo => (
          <div key={promo.id} className="news-card bg-card rounded-lg p-4 flex items-start gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold leading-tight">{promo.title}</h3>
                <span className="text-[10px] font-bold bg-accent/10 text-accent px-1.5 py-0.5 rounded flex-shrink-0">
                  {promo.badge}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{promo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSection;
