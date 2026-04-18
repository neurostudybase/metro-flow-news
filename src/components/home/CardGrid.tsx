import { Link } from 'react-router-dom';
import { articles, coverImages, getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import { Eye, MessageSquare } from 'lucide-react';
import AdSlot from './AdSlot';

const CardGrid = () => {
  // Берём 14 материалов (исключаем те, что уже на герое)
  const grid = articles.filter(a => !a.isTop).slice(0, 14);

  // span'ы для редакционной "неровности"
  const spans = [
    'col-span-3 row-span-2',  // 0 крупная
    'col-span-3',             // 1
    'col-span-2',             // 2
    'col-span-2 dark',        // 3 тёмная акцентная
    'col-span-2',             // 4
    'col-span-3',             // 5
    'col-span-3',             // 6
    'col-span-2',             // 7
    'col-span-2 dark',        // 8 тёмная
    'col-span-2',             // 9
    'col-span-3',             // 10
    'col-span-3',             // 11
    'col-span-2',             // 12
    'col-span-2',             // 13
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between border-b-2 border-foreground pb-1">
        <h2 className="font-bold text-lg">Лента редакции</h2>
        <Link to="/category/news" className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">
          все материалы →
        </Link>
      </div>

      <div className="editorial-dense">
        {grid.flatMap((article, i) => {
          const cat = getCategoryById(article.categoryId);
          const span = spans[i] || 'col-span-2';
          const isDark = span.includes('dark');
          const isHero = span.includes('row-span-2');
          const adAfter = i === 3 || i === 8;

          const card = (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className={`news-card rounded-md overflow-hidden border ${
                isDark ? 'bg-header text-header-foreground border-header/40' : 'bg-card border-border/60'
              } ${span.replace(' dark', '')} flex flex-col`}
            >
              <div className="relative">
                <img
                  src={coverImages[article.coverIndex]}
                  alt={article.title}
                  className={`w-full object-cover ${isHero ? 'h-56' : 'h-28'}`}
                  loading="lazy"
                />
                {article.isBreaking && (
                  <span className="badge-breaking absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-accent text-accent-foreground">
                    Срочно
                  </span>
                )}
              </div>
              <div className={`p-3 flex-1 flex flex-col ${isHero ? 'gap-2' : 'gap-1'}`}>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider"
                    style={{ color: categoryColors[article.categoryId] }}
                  >
                    {cat?.name}
                  </span>
                  <span className={`text-[10px] ${isDark ? 'text-header-foreground/50' : 'text-muted-foreground'}`}>
                    · {formatTime(article.publishedAt)}
                  </span>
                </div>
                <h3 className={`font-bold leading-snug line-clamp-3 ${isHero ? 'text-xl' : 'text-[14px]'}`}>
                  {article.title}
                </h3>
                {isHero && (
                  <p className={`text-xs line-clamp-2 mt-1 ${isDark ? 'text-header-foreground/70' : 'text-muted-foreground'}`}>
                    {article.excerpt}
                  </p>
                )}
                <div className={`flex items-center gap-2.5 mt-auto pt-1 text-[10px] ${
                  isDark ? 'text-header-foreground/50' : 'text-muted-foreground'
                }`}>
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{article.views}</span>
                  <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" />{article.commentsCount}</span>
                </div>
              </div>
            </Link>
          );

          if (adAfter) {
            return [
              card,
              <div key={`ad-${i}`} className="col-span-2 row-span-1">
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
