import { Link } from 'react-router-dom';
import { articles } from '@/data/mockData';
import AdSlot from './AdSlot';
import PortalCard from './PortalCard';

const CardGrid = () => {
  // Берём 14 материалов (исключаем те, что уже на герое)
  const grid = articles.filter(a => !a.isTop).slice(0, 14);

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between border-b-2 border-foreground pb-1">
        <h2 className="font-bold text-lg">Лента редакции</h2>
        <Link to="/category/news" className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">
          все материалы →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {grid.flatMap((article, i) => {
          const isHero = i === 0;
          const adAfter = i === 3 || i === 8;

          const card = (
            <div key={article.id} className={isHero ? 'col-span-2 row-span-2' : ''}>
              <PortalCard article={article} imageHeight={isHero ? 320 : 200} />
            </div>
          );

          if (adAfter) {
            return [
              card,
              <div key={`ad-${i}`}>
                <AdSlot format="inline-card" label="Партнёр" className="h-full" />
              </div>,
            ];
          }
          return [card];
        })}
      </div>

      {/* Горизонтальный рекламный пояс */}
      <AdSlot format="horizontal" label="Реклама · 1240×110" />
    </div>
  );
};

export default CardGrid;
