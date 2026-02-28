import { coverImages } from '@/data/mockData';

const socialItems = [
  { img: coverImages[0], text: 'Невероятный закат над Тюменью вчера вечером 🌅', tag: null },
  { img: coverImages[5], text: 'Зимняя сказка в центре города ❄️', tag: null },
  { img: coverImages[2], text: 'Болели за наших на домашнем матче! 🏒', tag: null },
  { img: coverImages[4], text: 'Премьера сезона в театре драмы — must see! 🎭', tag: null },
  { img: coverImages[1], text: 'Утренние пробки — бич Тюмени 🚗', tag: null },
  { img: coverImages[3], text: 'Новый коворкинг — стильное пространство 💻', tag: 'партнёр' },
  { img: coverImages[0], text: 'Набережная готовится к реконструкции 🏗️', tag: null },
  { img: coverImages[5], text: 'Фотопрогулка по заснеженным улочкам 📸', tag: null },
];

const SocialFeed = () => {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-base">Соцсети</h2>
        <button className="text-xs text-primary font-medium hover:underline">Все истории →</button>
      </div>
      <div className="masonry-grid">
        {socialItems.map((item, i) => (
          <div key={i} className="masonry-item news-card bg-card rounded-lg overflow-hidden cursor-pointer">
            <img
              src={item.img}
              alt=""
              className="w-full object-cover"
              style={{ height: `${140 + (i % 3) * 40}px` }}
              loading="lazy"
            />
            <div className="p-3">
              {item.tag && (
                <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded mb-1.5 inline-block">
                  {item.tag}
                </span>
              )}
              <p className="text-xs leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
