import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { MapPin, Camera, User, Star, PlusCircle, Megaphone, Search, ChevronDown } from 'lucide-react';
import { classifieds } from '@/data/classifiedsData';

const filterSections = [
  { title: 'Локация', icon: MapPin, options: ['Центр', 'Восточный', 'Калининский', 'Ленинский', 'Тюменская область'] },
  { title: 'Категория', icon: null, options: ['Недвижимость', 'Авто', 'Услуги', 'Работа', 'Электроника', 'Дом и дача'] },
  { title: 'Цена', icon: null, options: ['До 1 000 ₽', '1 000 – 10 000 ₽', '10 000 – 100 000 ₽', 'Более 100 000 ₽'] },
  { title: 'Только с фото', icon: Camera, options: [] },
  { title: 'Тип продавца', icon: User, options: ['Частное лицо', 'Компания'] },
  { title: 'Состояние', icon: null, options: ['Новое', 'Б/у'] },
  { title: 'Дата публикации', icon: null, options: ['Сегодня', '3 дня', '7 дней', '30 дней'] },
];


const sortOptions = ['Сначала новые', 'Дешевле', 'Дороже', 'Популярные'];

const ObyavleniyaPage = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState(sortOptions[0]);

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-5">

          {/* Left column — Filters */}
          <aside className="hidden lg:block space-y-4">
            <h2 className="font-bold text-lg text-foreground">Фильтры</h2>
            {filterSections.map((section) => (
              <div key={section.title} className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold text-sm text-foreground mb-2">{section.title}</h3>
                {section.options.length > 0 ? (
                  <ul className="space-y-1.5">
                    {section.options.map((opt) => (
                      <li key={opt} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-4 h-4 rounded border border-border flex-shrink-0" />
                        {opt}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-4 h-4 rounded border border-border flex-shrink-0" />
                    Да
                  </div>
                )}
              </div>
            ))}
          </aside>

          {/* Center — Listings */}
          <section>
            <h1 className="text-2xl font-bold text-foreground mb-1">Объявления Тюмени</h1>
            <p className="text-sm text-muted-foreground mb-4">Найдено {classifieds.length} объявлений</p>

            {/* Search + Sort bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по объявлениям"
                  className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors whitespace-nowrap"
                >
                  {sortValue}
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg w-44 py-1">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortValue(opt); setSortOpen(false); }}
                        className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-secondary transition-colors ${opt === sortValue ? 'text-primary font-medium' : 'text-foreground'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {classifieds.map((card) => (
                <Link to={`/obyavleniya/${card.id}`} key={card.id} className="bg-card rounded-lg border border-border overflow-hidden news-card cursor-pointer relative block">
                  {card.urgent && (
                    <span className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-[11px] font-bold px-2 py-0.5 rounded">
                      Срочно
                    </span>
                  )}
                  {card.top && (
                    <span className={`absolute top-2 ${card.urgent ? 'left-[70px]' : 'left-2'} z-10 bg-primary text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded`}>
                      Топ
                    </span>
                  )}
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2">{card.title}</h3>
                    <p className="text-primary font-bold text-lg">{card.price}</p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {card.district}
                      </span>
                      <span>{card.date}</span>
                    </div>
                  </div>
                </Link>

              ))}
            </div>
          </section>

          {/* Right column */}
          <aside className="hidden lg:block space-y-4">
            <button className="w-full bg-primary text-primary-foreground font-semibold rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <PlusCircle className="w-5 h-5" />
              Разместить объявление
            </button>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Продвинуть объявление</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Поднимите своё объявление в топ, чтобы его увидело больше людей.
              </p>
            </div>

            <div className="bg-secondary rounded-lg border border-border p-4 flex flex-col items-center justify-center min-h-[200px]">
              <Megaphone className="w-8 h-8 text-muted-foreground/40 mb-2" />
              <span className="text-xs text-muted-foreground">Рекламный блок</span>
            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
};

export default ObyavleniyaPage;
