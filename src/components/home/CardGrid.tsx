import { Link } from 'react-router-dom';
import { coverImages, getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import { useNews } from '@/contexts/NewsContext';
import { Eye, MessageSquare } from 'lucide-react';

const CardGrid = () => {
  const { allArticles } = useNews();
  const gridArticles = allArticles.filter(a => !a.isTop && !a.isBreaking).slice(0, 8);

  return (
    <div className="mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {gridArticles.map(article => {
          const cat = getCategoryById(article.categoryId);
          const isOpinion = article.isOpinion;
          return (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className={`news-card rounded-lg overflow-hidden ${isOpinion ? 'bg-header text-header-foreground' : 'bg-card'}`}
            >
              <img
                src={coverImages[article.coverIndex]}
                alt={article.title}
                className="w-full h-32 object-cover"
                loading="lazy"
              />
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: isOpinion ? 'rgba(255,255,255,0.15)' : categoryColors[article.categoryId] + '18',
                      color: isOpinion ? 'rgba(255,255,255,0.8)' : categoryColors[article.categoryId],
                    }}
                  >
                    {cat?.name}
                  </span>
                  <span className={`text-[10px] ${isOpinion ? 'text-header-foreground/50' : 'text-muted-foreground'}`}>
                    {formatTime(article.publishedAt)}
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2">{article.title}</h3>
                <div className={`flex items-center gap-3 text-[10px] ${isOpinion ? 'text-header-foreground/40' : 'text-muted-foreground'}`}>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{article.commentsCount}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CardGrid;
