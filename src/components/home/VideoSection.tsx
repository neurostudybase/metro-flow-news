import { videos, coverImages } from '@/data/mockData';
import { Play, Eye } from 'lucide-react';

const VideoSection = () => {
  const main = videos[0];
  const rest = videos.slice(1, 9);

  return (
    <section className="rounded-md overflow-hidden bg-[hsl(218_35%_8%)] text-header-foreground p-4">
      <div className="flex items-end justify-between mb-3 border-b border-header-foreground/15 pb-2">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary font-bold">Tyumen.инфо · video</div>
          <h2 className="font-bold text-xl mt-0.5">Видеостудия редакции</h2>
        </div>
        <button className="text-[11px] uppercase tracking-wider font-semibold text-header-foreground/70 hover:text-header-foreground">
          Все видео →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Главное видео — больше */}
        <div className="md:col-span-8 group cursor-pointer">
          <div className="relative rounded-md overflow-hidden">
            <img src={coverImages[main.coverIndex]} alt={main.title} className="w-full aspect-video object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/25 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Play className="w-9 h-9 text-primary-foreground ml-1 fill-current" />
              </div>
            </div>
            <span className="absolute bottom-3 right-3 bg-foreground/85 text-white text-xs px-2 py-1 rounded font-mono">
              {main.duration}
            </span>
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
              Главное видео
            </span>
          </div>
          <h3 className="font-bold text-xl leading-snug mt-3">{main.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-header-foreground/60">
            <Eye className="w-3.5 h-3.5" />
            {main.views.toLocaleString('ru-RU')} просмотров
          </div>
        </div>

        {/* Список — плотнее */}
        <div className="md:col-span-4 flex flex-col gap-1.5">
          {rest.map(video => (
            <div key={video.id} className="flex gap-2 group cursor-pointer border-b border-header-foreground/10 last:border-0 pb-1.5">
              <div className="relative flex-shrink-0 w-28">
                <img src={coverImages[video.coverIndex]} alt={video.title} className="w-28 h-16 object-cover rounded" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/25 group-hover:bg-foreground/10 transition-colors flex items-center justify-center rounded">
                  <Play className="w-4 h-4 text-white fill-current opacity-90" />
                </div>
                <span className={`absolute bottom-0.5 right-0.5 text-white text-[9px] px-1 py-0.5 rounded font-mono ${
                  video.duration === 'LIVE' ? 'bg-accent' : 'bg-foreground/85'
                }`}>
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-col justify-between min-w-0">
                <h4 className="text-[12px] font-semibold leading-tight line-clamp-3">{video.title}</h4>
                <span className="text-[10px] text-header-foreground/50 flex items-center gap-1">
                  <Eye className="w-3 h-3" />{video.views.toLocaleString('ru-RU')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
