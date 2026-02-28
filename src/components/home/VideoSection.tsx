import { videos, coverImages } from '@/data/mockData';
import { Play, Eye } from 'lucide-react';

const VideoSection = () => {
  const main = videos[0];
  const rest = videos.slice(1, 5);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-base">Видео</h2>
        <button className="text-xs text-primary font-medium hover:underline">Все видео →</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {/* Main video */}
        <div className="sm:col-span-3 news-card bg-card rounded-lg overflow-hidden cursor-pointer">
          <div className="relative">
            <img src={coverImages[main.coverIndex]} alt={main.title} className="w-full h-48 object-cover" loading="lazy" />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
              <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              </div>
            </div>
            <span className="absolute bottom-2 right-2 bg-foreground/70 text-primary-foreground text-xs px-1.5 py-0.5 rounded">
              {main.duration}
            </span>
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-sm leading-tight">{main.title}</h3>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />{main.views}
            </div>
          </div>
        </div>

        {/* Video list */}
        <div className="sm:col-span-2 flex flex-col gap-2">
          {rest.map(video => (
            <div key={video.id} className="news-card bg-card rounded-lg overflow-hidden cursor-pointer flex gap-2 p-2">
              <div className="relative flex-shrink-0 w-24">
                <img src={coverImages[video.coverIndex]} alt={video.title} className="w-24 h-16 object-cover rounded" loading="lazy" />
                <span className="absolute bottom-1 right-1 bg-foreground/70 text-primary-foreground text-[10px] px-1 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="text-xs font-medium leading-tight line-clamp-2">{video.title}</h4>
                <span className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Eye className="w-3 h-3" />{video.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
