import { Link } from 'react-router-dom';
import { articles, formatTime, getCategoryById, categoryColors } from '@/data/mockData';
import { Eye, MessageSquare, Flame } from 'lucide-react';

const Top5Section = () => {
  const top5 = [...articles].sort((a, b) => b.views - a.views).slice(0, 7);

  return (
    <div>
      <div className="flex items-end justify-between mb-2 border-b-2 border-foreground pb-1">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-accent" />
          <h2 className="font-bold text-base">ТОП-7 дня</h2>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">по просмотрам · 24 часа</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 bg-card rounded-md border border-border/60">
        {top5.map((article, i) => {
          const cat = getCategoryById(article.categoryId);
          return (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="news-item flex items-start gap-2.5 px-2.5 py-2 border-b border-border/50 last:border-0 md:[&:nth-last-child(2)]:border-0"
            >
              <span
                className="text-2xl font-extrabold leading-none w-6 flex-shrink-0 mt-0.5 tabular-nums"
                style={{ color: i < 3 ? 'hsl(var(--accent))' : 'hsl(var(--primary) / 0.35)' }}
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: categoryColors[article.categoryId] }}>
                    {cat?.name}
                  </span>
                </div>
                <h3 className="text-[13px] font-semibold leading-snug line-clamp-2">{article.title}</h3>
                <div className="flex items-center gap-2.5 mt-1 text-[10px] text-muted-foreground">
                  <span>{formatTime(article.publishedAt)}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views.toLocaleString('ru-RU')}</span>
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

export default Top5Section;
