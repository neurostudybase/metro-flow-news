import { Link } from 'react-router-dom';
import { articles, getAuthorById, coverImages, getCategoryById, categoryColors, formatTime } from '@/data/mockData';

const OpinionSection = () => {
  const opinions = articles.filter(a => a.isOpinion).slice(0, 3);
  const recommended = articles.filter(a => a.isRecommended).slice(0, 3);
  const reportage = articles.find(a => a.isReportage);

  return (
    <div className="mb-5 space-y-5">
      {/* Opinions */}
      <div>
        <h2 className="font-bold text-base mb-3">Мнения</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {opinions.map(article => {
            const author = getAuthorById(article.authorId);
            return (
              <Link key={article.id} to={`/article/${article.slug}`} className="news-card bg-card rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-3">
                  {author?.name.charAt(0)}
                </div>
                <h3 className="text-sm font-semibold leading-tight line-clamp-3 mb-2">{article.title}</h3>
                <span className="text-xs text-muted-foreground">{author?.name}, {author?.bio}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recommended + Reportage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <h3 className="font-bold text-sm mb-2">Рекомендуем</h3>
          <div className="bg-card rounded-lg overflow-hidden">
            {recommended.length > 0 && (
              <Link to={`/article/${recommended[0].slug}`} className="news-card block">
                <img src={coverImages[recommended[0].coverIndex]} alt="" className="w-full h-36 object-cover" loading="lazy" />
                <div className="p-3">
                  <h4 className="text-sm font-semibold leading-tight line-clamp-2">{recommended[0].title}</h4>
                </div>
              </Link>
            )}
            <div className="px-3 pb-3">
              {recommended.slice(1).map(a => (
                <Link key={a.id} to={`/article/${a.slug}`} className="news-item block py-1.5 text-sm leading-tight line-clamp-1 border-t border-border/50">
                  {a.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {reportage && (
          <div>
            <h3 className="font-bold text-sm mb-2">Репортаж</h3>
            <Link to={`/article/${reportage.slug}`} className="news-card block bg-card rounded-lg overflow-hidden">
              <img src={coverImages[reportage.coverIndex]} alt="" className="w-full h-36 object-cover" loading="lazy" />
              <div className="p-3">
                <span className="text-[10px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded mb-1.5 inline-block">Репортаж</span>
                <h4 className="text-sm font-semibold leading-tight line-clamp-2">{reportage.title}</h4>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpinionSection;
