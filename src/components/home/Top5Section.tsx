import { Link } from 'react-router-dom';
import { articles, formatTime } from '@/data/mockData';
import { Eye } from 'lucide-react';

const Top5Section = () => {
  const top5 = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div className="mb-5">
      <h2 className="font-bold text-base mb-3">ТОП-5 дня</h2>
      <div className="bg-card rounded-lg divide-y divide-border">
        {top5.map((article, i) => (
          <Link
            key={article.id}
            to={`/article/${article.slug}`}
            className="news-item flex items-start gap-3 p-3 rounded-sm"
          >
            <span className="text-2xl font-bold text-primary/30 leading-none mt-0.5 w-8 text-center flex-shrink-0">
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-tight line-clamp-2">{article.title}</h3>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                <span>{formatTime(article.publishedAt)}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Top5Section;
