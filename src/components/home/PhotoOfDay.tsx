import { useState } from 'react';
import { coverImages } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { img: coverImages[0], caption: 'Панорама зимней Тюмени на закате. Фото: Елена Новикова' },
  { img: coverImages[5], caption: 'Снежная аллея в центре города. Фото: Иван Морозов' },
  { img: coverImages[4], caption: 'Концерт в Тюменской филармонии. Фото: Мария Сидорова' },
];

const PhotoOfDay = () => {
  const [idx, setIdx] = useState(0);

  return (
    <div className="mb-5">
      <h2 className="font-bold text-base mb-3">Фото дня</h2>
      <div className="relative news-card bg-card rounded-lg overflow-hidden">
        <img src={photos[idx].img} alt={photos[idx].caption} className="w-full h-56 sm:h-72 object-cover" />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
          <p className="text-primary-foreground text-sm">{photos[idx].caption}</p>
        </div>
        <button
          onClick={() => setIdx(i => (i - 1 + photos.length) % photos.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground/40 hover:bg-foreground/60 text-primary-foreground p-1.5 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIdx(i => (i + 1) % photos.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground/40 hover:bg-foreground/60 text-primary-foreground p-1.5 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="absolute top-3 right-3 bg-foreground/50 text-primary-foreground text-xs px-2 py-0.5 rounded">
          {idx + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
};

export default PhotoOfDay;
