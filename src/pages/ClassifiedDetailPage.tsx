import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { classifieds } from '@/data/classifiedsData';
import { MapPin, Calendar, Eye, Phone, MessageCircle, User, ChevronLeft, Tag, ArrowRight } from 'lucide-react';

/* Category-specific specs (demo) */
const specsByCategory: Record<string, { label: string; value: string }[]> = {
  'Недвижимость': [
    { label: 'Тип', value: 'Квартира' },
    { label: 'Площадь', value: '56 м²' },
    { label: 'Этаж', value: '5/9' },
    { label: 'Ремонт', value: 'Косметический' },
    { label: 'Санузел', value: 'Раздельный' },
  ],
  'Авто': [
    { label: 'Марка', value: 'Toyota' },
    { label: 'Год выпуска', value: '2021' },
    { label: 'Пробег', value: '45 000 км' },
    { label: 'Двигатель', value: '2.5 л, бензин' },
    { label: 'КПП', value: 'Автомат' },
  ],
  'Электроника': [
    { label: 'Бренд', value: 'Apple' },
    { label: 'Модель', value: 'iPhone 14 Pro Max' },
    { label: 'Память', value: '256 ГБ' },
    { label: 'Гарантия', value: 'Нет' },
  ],
  'Дом и дача': [
    { label: 'Тип', value: 'Мебель' },
    { label: 'Материал', value: 'Дерево' },
    { label: 'Габариты', value: '200×90×75 см' },
  ],
  'Услуги': [
    { label: 'Опыт', value: 'Более 5 лет' },
    { label: 'Выезд', value: 'По городу' },
    { label: 'Гарантия', value: 'Да' },
  ],
  'Работа': [
    { label: 'График', value: '5/2' },
    { label: 'Опыт', value: 'От 1 года' },
    { label: 'Занятость', value: 'Полная' },
  ],
};

const ClassifiedDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const item = classifieds.find((c) => c.id === Number(id));
  const [showPhone, setShowPhone] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!item) {
    return (
      <Layout>
        <div className="max-w-[1280px] mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Объявление не найдено</h1>
          <Link to="/obyavleniya" className="text-primary hover:underline">← Вернуться к объявлениям</Link>
        </div>
      </Layout>
    );
  }

  /* Build a small gallery from the same category images */
  const categoryItems = classifieds.filter((c) => c.category === item.category && c.id !== item.id);
  const galleryImages = [item.image, ...categoryItems.slice(0, 3).map((c) => c.image)];

  const similar = categoryItems.slice(0, 4);
  const specs = specsByCategory[item.category] ?? [];
  const demoViews = 120 + item.id * 37;

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/obyavleniya" className="hover:text-primary transition-colors flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Объявления
          </Link>
          <span>/</span>
          <span>{item.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main content */}
          <div className="space-y-6">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-secondary">
                <img
                  src={galleryImages[activeImg]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {galleryImages.length > 1 && (
                <div className="flex gap-2">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-14 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0 ${
                        i === activeImg ? 'border-primary' : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title + badges + price */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {item.urgent && (
                  <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-0.5 rounded">
                    Срочно
                  </span>
                )}
                {item.top && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded">
                    Топ
                  </span>
                )}
                <span className="bg-secondary text-secondary-foreground text-xs px-2.5 py-0.5 rounded">
                  {item.condition === 'new' ? 'Новое' : 'Б/у'}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground leading-tight mb-2">{item.title}</h1>
              <p className="text-3xl font-bold text-primary">{item.price}</p>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{item.district}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{item.date}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{demoViews} просмотров</span>
              <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />{item.category}</span>
            </div>

            {/* Description */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h2 className="font-bold text-foreground mb-3">Описание</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Продаётся {item.title.toLowerCase()}. Состояние — {item.condition === 'new' ? 'новое, в упаковке' : 'хорошее, без дефектов'}.
                Находится в районе «{item.district}», г. Тюмень.
                Возможен торг при быстрой сделке. Доставка по договорённости.
                Звоните, пишите — отвечу быстро!
              </p>
            </div>

            {/* Specs */}
            {specs.length > 0 && (
              <div className="bg-card rounded-lg border border-border p-5">
                <h2 className="font-bold text-foreground mb-3">Характеристики</h2>
                <dl className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                  {specs.map((s) => (
                    <div key={s.label} className="flex justify-between border-b border-border pb-1.5">
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="text-foreground font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4">
            {/* Contact */}
            <div className="bg-card rounded-lg border border-border p-5 space-y-3 lg:sticky lg:top-24">
              <button
                onClick={() => setShowPhone(true)}
                className="w-full bg-primary text-primary-foreground font-semibold rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Phone className="w-5 h-5" />
                {showPhone ? '+7 (345) 212-34-56' : 'Показать телефон'}
              </button>
              <button className="w-full bg-secondary text-secondary-foreground font-semibold rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
                <MessageCircle className="w-5 h-5" />
                Написать
              </button>
            </div>

            {/* Seller info */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold text-sm text-foreground mb-3">Продавец</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.sellerType === 'company' ? 'ООО «ТюменьТорг»' : 'Пользователь'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.sellerType === 'company' ? 'Компания' : 'Частное лицо'} · на сайте 2 года
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">12 активных объявлений</p>
            </div>

            {/* Other by seller */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold text-sm text-foreground mb-3">Другие объявления автора</h3>
              <ul className="space-y-2.5">
                {categoryItems.slice(0, 3).map((ci) => (
                  <li key={ci.id}>
                    <Link to={`/obyavleniya/${ci.id}`} className="flex gap-2.5 group">
                      <img src={ci.image} alt="" className="w-14 h-10 rounded object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">{ci.title}</p>
                        <p className="text-xs font-bold text-primary">{ci.price}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Похожие объявления</h2>
              <Link to="/obyavleniya" className="text-primary text-sm hover:underline flex items-center gap-1">
                Все объявления <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similar.map((s) => (
                <Link to={`/obyavleniya/${s.id}`} key={s.id} className="bg-card rounded-lg border border-border overflow-hidden news-card block">
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="font-bold text-foreground text-xs leading-snug line-clamp-2">{s.title}</h3>
                    <p className="text-primary font-bold text-sm">{s.price}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {s.district}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ClassifiedDetailPage;

