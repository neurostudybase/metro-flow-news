import { Link } from 'react-router-dom';
import { articles, getCategoryById, categoryColors, formatTime } from '@/data/mockData';
import AdSlot from './AdSlot';

const AllNewsList = () => {
  // Длинная плотная телетайп-лента, с двумя встроенными рекламными вставками
  const sorted = articles;
  const part1 = sorted.slice(0, 18);
  const part2 = sorted.slice(18, 36);
  const part3 = sorted.slice(36, 60);

  const renderItem = (article: typeof articles[number]) => {
    const cat = getCategoryById(article.categoryId);
    return (
      <Link
        key={article.id}
        to={`/article/${article.slug}`}
        className="news-item flex items-start gap-2 py-1.5 px-1 border-b border-border/50 last:border-0"
      >
        <span className="text-[11px] text-muted-foreground font-mono font-medium whitespace-nowrap mt-0.5 tabular-nums">
          {formatTime(article.publishedAt)}
        </span>
        <span
          className="cat-dot mt-1.5"
          style={{ backgroundColor: categoryColors[article.categoryId] || 'hsl(var(--muted-foreground))' }}
        />
        <span className="text-[13px] leading-snug">
          {article.isBreaking && (
            <span className="badge-breaking inline-block bg-accent text-accent-foreground text-[9px] font-bold px-1.5 py-0.5 rounded mr-1 uppercase align-middle">
              Молния
            </span>
          )}
          {article.title}
        </span>
      </Link>
    );
  };

  return (
    <div className="space-y-3">
      <div className="bg-card rounded-md p-2.5 border border-border/60">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b-2 border-primary">
          <h2 className="font-bold text-[13px] uppercase tracking-wider">Все новости</h2>
          <span className="text-[10px] text-muted-foreground font-mono">LIVE</span>
        </div>
        <div className="flex flex-col">{part1.map(renderItem)}</div>
      </div>

      <AdSlot format="vertical" label="Реклама · 240×400" />

      <div className="bg-card rounded-md p-2.5 border border-border/60">
        <div className="flex flex-col">{part2.map(renderItem)}</div>
      </div>

      <AdSlot format="square" label="Реклама" />

      <div className="bg-card rounded-md p-2.5 border border-border/60">
        <div className="flex flex-col">{part3.map(renderItem)}</div>
      </div>

      <Link
        to="/category/news"
        className="block text-center text-[12px] font-semibold text-primary py-2.5 border border-primary/30 rounded-md hover:bg-primary/5 transition-colors"
      >
        Открыть всю ленту →
      </Link>
    </div>
  );
};

export default AllNewsList;
