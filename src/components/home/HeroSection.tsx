import { Link } from 'react-router-dom';
import { articles, coverImages, getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import { Eye, MessageSquare } from 'lucide-react';

const HeroSection = () => {
  const topArticles = articles.filter(a => a.isTop);
  const main = topArticles[0];
  const secondary = topArticles.slice(1, 5);

  if (!main) return null;
  const mainCat = getCategoryById(main.categoryId);

  return (
    <div className="mb-5">
      {/* Main card */}
      <Link to={`/article/${main.slug}`} className="news-card block bg-card rounded-lg overflow-hidden mb-3">
        <div className="relative">
          <img
            src={coverImages[main.coverIndex]}
            alt={main.title}
            className="w-full h-52 sm:h-64 object-cover"
            loading="lazy"
          />
          {main.isBreaking && (
            <span className="badge-breaking absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              Срочно
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ backgroundColor: categoryColors[main.categoryId] + '18', color: categoryColors[main.categoryId] }}
            >
              {mainCat?.name}
            </span>
            <span className="text-xs text-muted-foreground">{formatTime(main.publishedAt)}</span>
          </div>
          <h2 className="font-bold text-lg leading-snug mb-2">{main.title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">{main.excerpt}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{main.views}</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{main.commentsCount}</span>
          </div>
        </div>
      </Link>

      {/* Secondary cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {secondary.map(article => {
          const cat = getCategoryById(article.categoryId);
          return (
            <Link key={article.id} to={`/article/${article.slug}`} className="news-card bg-card rounded-lg overflow-hidden">
              <img
                src={coverImages[article.coverIndex]}
                alt={article.title}
                className="w-full h-28 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: categoryColors[article.categoryId] + '18', color: categoryColors[article.categoryId] }}
                  >
                    {cat?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{formatTime(article.publishedAt)}</span>
                </div>
                <h3 className="font-semibold text-sm leading-tight line-clamp-2">{article.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
