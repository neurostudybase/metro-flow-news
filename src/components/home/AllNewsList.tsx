import { Link } from 'react-router-dom';
import { articles, getCategoryById, categoryColors, formatTime } from '@/data/mockData';

const AllNewsList = () => {
  const sorted = articles;

  return (
    <div>
      <h2 className="font-bold text-base mb-3 pb-2 border-b border-border">Все новости</h2>
      <div className="flex flex-col">
        {sorted.map(article => {
          const cat = getCategoryById(article.categoryId);
          return (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="news-item flex items-start gap-2 py-2 px-1 rounded-sm border-b border-border/50 last:border-0"
            >
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap mt-0.5">
                {formatTime(article.publishedAt)}
              </span>
              <span
                className="cat-dot mt-1.5"
                style={{ backgroundColor: categoryColors[article.categoryId] || '#999' }}
              />
              <span className="text-sm leading-tight">
                {article.isBreaking && (
                  <span className="badge-breaking inline-block bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded mr-1.5 uppercase">
                    Молния
                  </span>
                )}
                {article.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllNewsList;
