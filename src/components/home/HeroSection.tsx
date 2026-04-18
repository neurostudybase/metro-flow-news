import { Link } from 'react-router-dom';
import { articles, coverImages, getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import { Eye, MessageSquare, Clock } from 'lucide-react';

const HeroSection = () => {
  const topArticles = articles.filter(a => a.isTop);
  const main = topArticles[0];
  const secondary = topArticles.slice(1, 5);
  const tertiary = articles.filter(a => !a.isTop).slice(0, 3);

  if (!main) return null;
  const mainCat = getCategoryById(main.categoryId);

  return (
    <div className="space-y-3">
      {/* Доминирующий главный материал */}
      <Link to={`/article/${main.slug}`} className="news-card relative block rounded-md overflow-hidden group">
        <div className="relative aspect-[16/9]">
          <img
            src={coverImages[main.coverIndex]}
            alt={main.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm"
                style={{ backgroundColor: categoryColors[main.categoryId], color: '#fff' }}
              >
                {mainCat?.name}
              </span>
              {main.isBreaking && (
                <span className="badge-breaking text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm bg-accent text-accent-foreground">
                  Срочно
                </span>
              )}
              <span className="text-[11px] text-white/80 flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3" />
                {formatTime(main.publishedAt)}
              </span>
            </div>
            <h1 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-2 drop-shadow-md">
              {main.title}
            </h1>
            <p className="text-white/85 text-sm line-clamp-2 max-w-2xl mb-2">{main.excerpt}</p>
            <div className="flex items-center gap-3 text-[11px] text-white/70">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{main.views.toLocaleString('ru-RU')}</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{main.commentsCount}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Вторичные карточки — 2 крупные горизонтальные */}
      <div className="grid grid-cols-2 gap-3">
        {secondary.slice(0, 2).map(article => {
          const cat = getCategoryById(article.categoryId);
          return (
            <Link key={article.id} to={`/article/${article.slug}`} className="news-card bg-card rounded-md overflow-hidden border border-border/60">
              <img
                src={coverImages[article.coverIndex]}
                alt={article.title}
                className="w-full h-32 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: categoryColors[article.categoryId] }}
                >
                  {cat?.name}
                </span>
                <h3 className="font-bold text-[15px] leading-snug line-clamp-2 mt-1">{article.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
                  <span>{formatTime(article.publishedAt)}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Третий ряд — 2 компактные + 1 тёмная акцентная */}
      <div className="grid grid-cols-3 gap-3">
        {secondary.slice(2, 4).map(article => {
          const cat = getCategoryById(article.categoryId);
          return (
            <Link key={article.id} to={`/article/${article.slug}`} className="news-card bg-card rounded-md overflow-hidden border border-border/60">
              <img src={coverImages[article.coverIndex]} alt={article.title} className="w-full h-24 object-cover" loading="lazy" />
              <div className="p-2.5">
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: categoryColors[article.categoryId] }}>
                  {cat?.name}
                </span>
                <h3 className="font-semibold text-[13px] leading-tight line-clamp-3 mt-0.5">{article.title}</h3>
              </div>
            </Link>
          );
        })}
        {tertiary[0] && (
          <Link to={`/article/${tertiary[0].slug}`} className="news-card bg-header text-header-foreground rounded-md overflow-hidden border border-header/40 p-3 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Эксклюзив</span>
              <h3 className="font-bold text-[14px] leading-snug line-clamp-4 mt-1.5">{tertiary[0].title}</h3>
            </div>
            <div className="text-[11px] text-header-foreground/60 mt-2">
              {formatTime(tertiary[0].publishedAt)} · {tertiary[0].views} просмотров
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
