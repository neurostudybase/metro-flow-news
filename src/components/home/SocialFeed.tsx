import { coverImages } from '@/data/mockData';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const socialItems = [
  { img: coverImages[0], text: 'Невероятный закат над Тюменью вчера вечером 🌅', tag: null, likes: 312, comments: 28 },
  { img: coverImages[5], text: 'Зимняя сказка в центре города ❄️', tag: null, likes: 481, comments: 52 },
  { img: coverImages[2], text: 'Болели за наших на домашнем матче! 🏒', tag: null, likes: 156, comments: 14 },
  { img: coverImages[4], text: 'Премьера сезона в театре драмы — must see! 🎭', tag: null, likes: 89, comments: 7 },
  { img: coverImages[1], text: 'Утренние пробки — бич Тюмени 🚗', tag: null, likes: 203, comments: 67 },
  { img: coverImages[3], text: 'Новый коворкинг — стильное пространство 💻', tag: 'Партнёр', likes: 64, comments: 5 },
  { img: coverImages[0], text: 'Набережная готовится к реконструкции 🏗️', tag: null, likes: 175, comments: 22 },
  { img: coverImages[5], text: 'Фотопрогулка по заснеженным улочкам 📸', tag: null, likes: 298, comments: 31 },
  { img: coverImages[2], text: 'На лыжне в Заводоуковске — открытие сезона ⛷️', tag: null, likes: 142, comments: 9 },
  { img: coverImages[4], text: 'Вкусный завтрак в новом кафе на Республики', tag: null, likes: 87, comments: 6 },
  { img: coverImages[1], text: 'Ремонт развязки на Профсоюзной — мнение водителей', tag: null, likes: 213, comments: 78 },
  { img: coverImages[3], text: 'Делимся вакансиями этой недели 💼', tag: 'Партнёр', likes: 45, comments: 3 },
];

const SocialFeed = () => {
  return (
    <div>
      <div className="flex items-end justify-between mb-3 border-b-2 border-foreground pb-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Тюмень.инфо · соцсети</div>
          <h2 className="font-bold text-lg">Город в кадре</h2>
        </div>
        <button className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">все истории →</button>
      </div>
      <div className="masonry-grid">
        {socialItems.map((item, i) => (
          <div key={i} className="masonry-item news-card bg-card rounded-md overflow-hidden border border-border/60 cursor-pointer">
            <img
              src={item.img}
              alt=""
              className="w-full object-cover"
              style={{ height: `${150 + (i % 4) * 35}px` }}
              loading="lazy"
            />
            <div className="p-2.5">
              {item.tag && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-1.5 py-0.5 rounded mb-1 inline-block">
                  {item.tag}
                </span>
              )}
              <p className="text-[12px] leading-snug">{item.text}</p>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{item.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{item.comments}</span>
                <span className="flex items-center gap-1 ml-auto"><Share2 className="w-3 h-3" /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
