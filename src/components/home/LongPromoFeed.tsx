import { Link } from 'react-router-dom';
import { longPromoFeed, coverImages } from '@/data/mockData';

const LongPromoFeed = () => {
  return (
    <div>
      <div className="flex items-end justify-between mb-3 border-b-2 border-foreground pb-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Тюмень.инфо · подборки</div>
          <h2 className="font-bold text-lg">Спецпроекты, гиды и партнёрский контент</h2>
        </div>
        <button className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">показать ещё →</button>
      </div>

      <div className="long-promo-grid">
        {longPromoFeed.map((card, i) => {
          const heightClass = card.height === 'lg' ? 'h-56' : card.height === 'md' ? 'h-44' : 'h-32';
          return (
            <Link
              key={card.id}
              to="/"
              className="long-promo-item news-card block bg-card rounded-md overflow-hidden border border-border/60"
            >
              <img
                src={coverImages[card.coverIndex]}
                alt={card.title}
                className={`w-full ${heightClass} object-cover`}
                loading="lazy"
              />
              <div className="p-2.5">
                {card.tag && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-1.5 py-0.5 rounded mr-1 inline-block mb-1">
                    {card.tag}
                  </span>
                )}
                <h3 className="text-[13px] font-bold leading-snug line-clamp-2">{card.title}</h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-snug">{card.text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LongPromoFeed;
