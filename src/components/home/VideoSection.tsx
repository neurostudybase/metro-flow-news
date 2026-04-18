import { videos, coverImages } from '@/data/mockData';
import { Play, Eye } from 'lucide-react';

const VideoSection = () => {
  const main = videos[0];
  const rest = videos.slice(1, 7);

  return (
    <section className="rounded-md overflow-hidden bg-header text-header-foreground p-5">
      <div className="flex items-end justify-between mb-4 border-b border-header-foreground/15 pb-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-primary font-bold">Tyumen.инфо · video</div>
          <h2 className="font-bold text-xl mt-0.5">Видеостудия редакции</h2>
        </div>
        <button className="text-[11px] uppercase tracking-wider font-semibold text-header-foreground/70 hover:text-header-foreground">
          Все видео →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* Главное видео */}
        <div className="md:col-span-3 group cursor-pointer">
          <div className="relative rounded-md overflow-hidden">
            <img src={coverImages[main.coverIndex]} alt={main.title} className="w-full aspect-video object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <Play className="w-7 h-7 text-primary-foreground ml-0.5 fill-current" />
              </div>
            </div>
            <span className="absolute bottom-3 right-3 bg-foreground/80 text-white text-xs px-2 py-1 rounded font-mono">
              {main.duration}
            </span>
          </div>
          <h3 className="font-bold text-lg leading-snug mt-3">{main.title}</h3>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-header-foreground/60">
            <Eye className="w-3.5 h-3.5" />
            {main.views.toLocaleString('ru-RU')} просмотров
          </div>
        </div>

        {/* Список */}
        <div className="md:col-span-2 flex flex-col gap-2">
          {rest.map(video => (
            <div key={video.id} className="flex gap-2.5 group cursor-pointer">
              <div className="relative flex-shrink-0 w-32">
                <img src={coverImages[video.coverIndex]} alt={video.title} className="w-32 h-20 object-cover rounded" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors flex items-center justify-center rounded">
                  <Play className="w-5 h-5 text-white fill-current opacity-90" />
                </div>
                <span className={`absolute bottom-1 right-1 text-white text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  video.duration === 'LIVE' ? 'bg-accent' : 'bg-foreground/80'
                }`}>
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-col justify-between min-w-0 py-0.5">
                <h4 className="text-[13px] font-semibold leading-tight line-clamp-3">{video.title}</h4>
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
