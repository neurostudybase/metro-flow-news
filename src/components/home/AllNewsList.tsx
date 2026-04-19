import { Link } from 'react-router-dom';
import { articles, categoryColors, formatTime } from '@/data/mockData';
import AdSlot from './AdSlot';

const AllNewsList = () => {
  // Очень плотная телетайп-лента: 60 новостей в 4 группах
  const sorted = articles;
  const part1 = sorted.slice(0, 22);
  const part2 = sorted.slice(22, 40);
  const part3 = sorted.slice(40, 58);
  const part4 = sorted.slice(58, 80);

  const renderItem = (article: typeof articles[number]) => (
    <Link
      key={article.id}
      to={`/article/${article.slug}`}
      className="news-item flex items-start gap-1.5 py-[3px] px-1 border-b border-border/40 last:border-0 leading-tight"
    >
      <span className="text-[10px] text-muted-foreground font-mono font-medium whitespace-nowrap mt-[2px] tabular-nums">
        {formatTime(article.publishedAt)}
      </span>
      <span
        className="cat-dot mt-[6px]"
        style={{ width: 6, height: 6, backgroundColor: categoryColors[article.categoryId] || 'hsl(var(--muted-foreground))' }}
      />
      <span className="text-[12px] leading-[1.25]">
        {article.isBreaking && (
          <span className="badge-breaking inline-block bg-accent text-accent-foreground text-[8px] font-bold px-1 py-[1px] rounded mr-1 uppercase align-middle">
            Молния
          </span>
        )}
        {article.title}
      </span>
    </Link>
  );

  return (
    <div className="space-y-2">
      <div className="bg-card rounded-md p-2 border border-border/60">
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b-2 border-primary">
          <h2 className="font-bold text-[12px] uppercase tracking-wider">Все новости</h2>
          <span className="text-[9px] text-accent font-mono font-bold animate-pulse">● LIVE</span>
        </div>
        <div className="flex flex-col">{part1.map(renderItem)}</div>
      </div>

      <AdSlot format="vertical" label="Реклама · 230×400" />

      <div className="bg-card rounded-md p-2 border border-border/60">
        <div className="flex flex-col">{part2.map(renderItem)}</div>
      </div>

      <AdSlot format="square" label="Реклама" />

      <div className="bg-card rounded-md p-2 border border-border/60">
        <div className="flex flex-col">{part3.map(renderItem)}</div>
      </div>

      <AdSlot format="square" label="Партнёр" />

      <div className="bg-card rounded-md p-2 border border-border/60">
        <div className="flex flex-col">{part4.map(renderItem)}</div>
      </div>

      <Link
        to="/category/news"
        className="block text-center text-[11px] font-bold uppercase tracking-wider text-primary-foreground bg-primary py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        Открыть всю ленту →
      </Link>
    </div>
  );
};

export default AllNewsList;
