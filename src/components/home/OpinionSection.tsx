import { Link } from 'react-router-dom';
import { articles, getAuthorById, coverImages, getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import { Quote, BookOpen, MapPin } from 'lucide-react';
import PortalCard from './PortalCard';

const OpinionSection = () => {
  const opinions = articles.filter(a => a.isOpinion).slice(0, 4);
  const recommended = articles.filter(a => a.isRecommended).slice(0, 4);
  const reportages = articles.filter(a => a.isReportage).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Мнения — широкая редакционная полоса */}
      <div>
        <div className="flex items-end justify-between mb-3 border-b-2 border-foreground pb-1">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-accent" />
            <h2 className="font-bold text-lg">Мнения</h2>
          </div>
          <button className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">все колонки →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {opinions.map(article => {
            const author = getAuthorById(article.authorId);
            return (
              <Link key={article.id} to={`/article/${article.slug}`} className="news-card bg-card rounded-md p-4 border border-border/60 border-l-4 border-l-accent">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-sm flex-shrink-0">
                    {author?.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold leading-tight">{author?.name}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{author?.bio}</div>
                  </div>
                </div>
                <h3 className="text-[14px] font-bold leading-snug line-clamp-4">{article.title}</h3>
                <div className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">Колонка</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Репортажи — крупные визуальные */}
      <div>
        <div className="flex items-end justify-between mb-3 border-b-2 border-foreground pb-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Репортажи</h2>
          </div>
          <button className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">все →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reportages.map(r => (
            <Link key={r.id} to={`/article/${r.slug}`} className="news-card relative block rounded-md overflow-hidden group">
              <img src={coverImages[r.coverIndex]} alt={r.title} className="w-full h-56 object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] bg-accent text-accent-foreground px-2 py-1 rounded-sm">
                  Репортаж
                </span>
                <h3 className="text-lg md:text-xl font-bold leading-snug mt-2 line-clamp-3">{r.title}</h3>
                <div className="text-[11px] text-white/80 mt-2">{formatTime(r.publishedAt)} · {getCategoryById(r.categoryId)?.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Рекомендуем редакции */}
      <div>
        <div className="flex items-end justify-between mb-3 border-b-2 border-foreground pb-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Рекомендуем редакции</h2>
          </div>
          <button className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">все подборки →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {recommended.map(article => (
            <PortalCard key={article.id} article={article} imageHeight={170} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpinionSection;
