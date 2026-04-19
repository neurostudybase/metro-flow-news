import { coverImages } from '@/data/mockData';
import { Heart, MessageCircle, Share2, Quote } from 'lucide-react';

interface SocialItem {
  type: 'photo' | 'text' | 'tall' | 'wide' | 'quote' | 'partner';
  img?: string;
  text: string;
  author?: string;
  tag?: string | null;
  likes: number;
  comments: number;
  height?: number;
}

const socialItems: SocialItem[] = [
  { type: 'photo', img: coverImages[0], text: 'Невероятный закат над Тюменью вчера вечером 🌅 Наш читатель Игорь поделился снимком с набережной — спасибо!', likes: 312, comments: 28, height: 220 },
  { type: 'text', text: '«Тюмень снова в топе по качеству жизни — третий год подряд. И это не случайность» — мнение редакции', likes: 89, comments: 31 },
  { type: 'tall', img: coverImages[5], text: 'Зимняя сказка в центре города ❄️ Утренняя прогулка по набережной превратилась в фотосессию.', likes: 481, comments: 52, height: 320 },
  { type: 'photo', img: coverImages[2], text: 'Болели за наших на домашнем матче! 🏒', likes: 156, comments: 14, height: 180 },
  { type: 'quote', text: '«Город меняется быстрее, чем мы успеваем рассказывать»', author: 'Алексей Петров, шеф-редактор', likes: 67, comments: 8 },
  { type: 'photo', img: coverImages[4], text: 'Премьера сезона в театре драмы — must see! 🎭', likes: 89, comments: 7, height: 200 },
  { type: 'partner', img: coverImages[3], text: 'Новый коворкинг открылся на Республики — стильное пространство для удалёнки 💻', tag: 'Партнёр', likes: 64, comments: 5, height: 240 },
  { type: 'text', text: 'Утренние пробки — бич Тюмени 🚗 Делитесь альтернативными маршрутами в комментариях', likes: 203, comments: 67 },
  { type: 'tall', img: coverImages[1], text: 'Развязка на Профсоюзной получит второй уровень — проект уже в работе', likes: 175, comments: 22, height: 280 },
  { type: 'photo', img: coverImages[0], text: 'Набережная готовится к реконструкции 🏗️', likes: 175, comments: 22, height: 190 },
  { type: 'quote', text: '«Тюмень — это не нефть. Это люди, которые её добывают»', author: 'Из колонки Дмитрия Козлова', likes: 142, comments: 19 },
  { type: 'photo', img: coverImages[5], text: 'Фотопрогулка по заснеженным улочкам 📸 Атмосферно!', likes: 298, comments: 31, height: 210 },
  { type: 'text', text: 'Подборка лучших мест для зимних выходных в Тюменской области — лонгрид уже на сайте 👇', likes: 124, comments: 9 },
  { type: 'tall', img: coverImages[2], text: 'На лыжне в Заводоуковске — открытие сезона ⛷️ Семейный формат, всё для детей.', likes: 142, comments: 9, height: 300 },
  { type: 'photo', img: coverImages[4], text: 'Вкусный завтрак в новом кафе на Республики', likes: 87, comments: 6, height: 170 },
  { type: 'partner', img: coverImages[3], text: 'Делимся вакансиями этой недели 💼 IT, продажи, логистика', tag: 'Партнёр', likes: 45, comments: 3, height: 200 },
  { type: 'text', text: 'Внимание! Завтра ограничения движения по ул. Мельникайте с 9:00 до 14:00 в связи с ремонтом теплосети', likes: 312, comments: 88 },
  { type: 'photo', img: coverImages[1], text: 'Горожане выбирают площадки для нового сквера — голосование открыто', likes: 213, comments: 78, height: 200 },
  { type: 'quote', text: '«Реконструкция набережной — это инвестиция в следующие 30 лет»', author: 'Мэр Тюмени', likes: 89, comments: 42 },
  { type: 'tall', img: coverImages[0], text: 'Большой репортаж о новых жилых комплексах Тюмени — что строят, кто покупает, по каким ценам', likes: 198, comments: 33, height: 290 },
  { type: 'photo', img: coverImages[2], text: 'Юные хоккеисты Тюмени — медаль чемпионата УрФО', likes: 167, comments: 12, height: 180 },
  { type: 'text', text: 'Внутренний рейтинг редакции: 5 материалов недели, которые вы не должны пропустить', likes: 76, comments: 4 },
  { type: 'photo', img: coverImages[5], text: 'Ёлка на Цветном бульваре уже зажглась ✨', likes: 422, comments: 51, height: 220 },
  { type: 'partner', img: coverImages[4], text: 'Скидки до 40% в новой коллекции Tyumen Style — только до конца недели', tag: 'Реклама', likes: 38, comments: 2, height: 190 },
];

const SocialFeed = () => {
  return (
    <div>
      <div className="flex items-end justify-between mb-2 border-b-2 border-foreground pb-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Тюмень.инфо · соцсети</div>
          <h2 className="font-bold text-lg">Город в кадре</h2>
        </div>
        <button className="text-[11px] text-primary font-semibold uppercase tracking-wider hover:underline">все истории →</button>
      </div>
      <div className="masonry-grid">
        {socialItems.map((item, i) => {
          // Текстовые карточки без фото
          if (item.type === 'text') {
            return (
              <div key={i} className="masonry-item news-card bg-secondary/40 rounded-md p-2.5 border border-border/60 cursor-pointer">
                <p className="text-[12px] leading-snug font-medium">{item.text}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{item.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{item.comments}</span>
                </div>
              </div>
            );
          }
          // Цитата — тёмная акцентная
          if (item.type === 'quote') {
            return (
              <div key={i} className="masonry-item news-card bg-header text-header-foreground rounded-md p-3 cursor-pointer">
                <Quote className="w-4 h-4 text-primary mb-1.5" />
                <p className="text-[13px] leading-snug font-semibold italic">{item.text}</p>
                {item.author && <div className="text-[10px] text-header-foreground/60 mt-2">— {item.author}</div>}
                <div className="flex items-center gap-3 mt-2 text-[10px] text-header-foreground/50">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{item.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{item.comments}</span>
                </div>
              </div>
            );
          }
          // Карточки с фото (разной высоты)
          return (
            <div key={i} className="masonry-item news-card bg-card rounded-md overflow-hidden border border-border/60 cursor-pointer">
              {item.img && (
                <img
                  src={item.img}
                  alt=""
                  className="w-full object-cover"
                  style={{ height: `${item.height ?? 180}px` }}
                  loading="lazy"
                />
              )}
              <div className="p-2">
                {item.tag && (
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mb-1 inline-block ${
                    item.tag === 'Реклама' ? 'bg-accent/15 text-accent' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {item.tag}
                  </span>
                )}
                <p className="text-[12px] leading-snug">{item.text}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{item.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{item.comments}</span>
                  <span className="flex items-center gap-1 ml-auto"><Share2 className="w-3 h-3" /></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialFeed;
