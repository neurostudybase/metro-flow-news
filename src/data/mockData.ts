import citySkyline from '@/assets/city-skyline.jpg';
import urbanRoad from '@/assets/urban-road.jpg';
import sportsEvent from '@/assets/sports-event.jpg';
import businessDistrict from '@/assets/business-district.jpg';
import culturalEvent from '@/assets/cultural-event.jpg';
import winterCity from '@/assets/winter-city.jpg';

export const coverImages = [citySkyline, urbanRoad, sportsEvent, businessDistrict, culturalEvent, winterCity];

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string;
  authorId: string;
  publishedAt: string;
  views: number;
  commentsCount: number;
  coverIndex: number;
  isBreaking: boolean;
  isTop: boolean;
  isRecommended: boolean;
  isOpinion: boolean;
  isReportage: boolean;
}

export interface Video {
  id: string;
  title: string;
  coverIndex: number;
  duration: string;
  publishedAt: string;
  views: number;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export const categories: Category[] = [
  { id: 'news', name: 'Новости', slug: 'news', order: 0 },
  { id: 'city', name: 'Город', slug: 'city', order: 1 },
  { id: 'incidents', name: 'Происшествия', slug: 'incidents', order: 2 },
  { id: 'business', name: 'Бизнес', slug: 'business', order: 3 },
  { id: 'sports', name: 'Спорт', slug: 'sports', order: 4 },
  { id: 'culture', name: 'Культура', slug: 'culture', order: 5 },
  { id: 'politics', name: 'Политика', slug: 'politics', order: 6 },
  { id: 'society', name: 'Общество', slug: 'society', order: 7 },
  { id: 'obyavleniya', name: 'Объявления', slug: 'obyavleniya', order: 8 },
];

export const categoryColors: Record<string, string> = {
  news: '#2d6bc4',
  city: '#2d8f5e',
  incidents: '#d42a2a',
  business: '#c47e1f',
  sports: '#1a8f6e',
  culture: '#7c3aed',
  politics: '#3f51b5',
  society: '#0d9488',
};

export const authors: Author[] = [
  { id: 'a1', name: 'Алексей Петров', bio: 'Шеф-редактор' },
  { id: 'a2', name: 'Мария Сидорова', bio: 'Корреспондент' },
  { id: 'a3', name: 'Дмитрий Козлов', bio: 'Обозреватель' },
  { id: 'a4', name: 'Елена Новикова', bio: 'Фоторепортёр' },
  { id: 'a5', name: 'Иван Морозов', bio: 'Спецкор' },
];

const headlines: string[] = [
  'Мэр Тюмени анонсировал масштабную реконструкцию набережной',
  'Новый транспортный маршрут свяжет центр города с аэропортом Рощино',
  'В Тюмени зафиксирован рекордный рост цен на вторичное жильё',
  'Тюменский хоккейный клуб одержал победу в домашнем матче',
  'Строительство нового моста через Туру завершат в следующем году',
  'На улице Республики произошло ДТП с участием трёх автомобилей',
  'Тюменские учёные разработали новый метод очистки воды',
  'В областной думе обсудили бюджет на 2026 год',
  'Фестиваль «Тюменская осень» собрал более 50 тысяч гостей',
  'Тюменская область вошла в топ-10 регионов по качеству жизни',
  'В городе открылся первый коворкинг для IT-специалистов',
  'Пожар в жилом доме на улице Мельникайте: пострадавших нет',
  'Тюменский бизнесмен инвестировал в агропромышленный комплекс',
  'В школах Тюмени введут дополнительные уроки робототехники',
  'Обильный снегопад парализовал движение на трассе',
  'Городские власти утвердили план благоустройства парков',
  'Тюменский театр драмы представил премьеру сезона',
  'Стоимость проезда в общественном транспорте повысят с марта',
  'В Тюмени открылась выставка современного искусства',
  'Молодёжный чемпионат по хоккею стартует на этой неделе',
  'Глава региона встретился с представителями малого бизнеса',
  'Тюменские волонтёры провели акцию по уборке берега Туры',
  'На выезде из города образовалась многокилометровая пробка',
  'Новый торговый центр откроется в районе «Тюменский»',
  'Тюменские медики провели уникальную операцию на сердце',
  'Областной суд вынес приговор по делу о мошенничестве',
  'В Тюмени проведут масштабный ремонт дорог весной 2026',
  'Стартовал набор в новую спортивную школу олимпийского резерва',
  'Тюменский завод увеличил объёмы производства на 30%',
  'В Тюмени заработала новая станция метробуса',
  'Синоптики предупреждают о похолодании до −35°C',
  'Фонд капитального ремонта отчитался о работе за год',
  'Тюменская сборная по биатлону завоевала три медали',
  'В центре города откроют пешеходную зону по выходным',
  'Репортаж: как живёт тюменская деревня в XXI веке',
  'Эксперты оценили экологическую обстановку в области',
  'Тюменские программисты создали приложение для горожан',
  'На рынке труда растёт спрос на инженеров',
  'Власти выделили средства на строительство нового детского сада',
  'В Тюмени прошёл ежегодный марафон «Беги за мечтой»',
  'Филармония открыла сезон концертом мировой музыки',
  'Полиция задержала подозреваемого в серии краж',
  'В областном музее открылась экспозиция о нефтяниках Сибири',
  'Тюменские предприниматели получат льготные кредиты',
  'Городской каток на Цветном бульваре откроется 1 декабря',
  'Тюменские студенты победили на всероссийской олимпиаде',
  'В Тюмени обновят систему видеонаблюдения на дорогах',
  'Депутаты предложили программу поддержки молодых семей',
  'Тюменский аэропорт увеличил пассажиропоток на 15%',
  'Мнение: почему Тюмень становится привлекательной для бизнеса',
  'Мнение: городской транспорт нуждается в модернизации',
  'Мнение: как решить проблему парковок в центре Тюмени',
  'Мнение: будущее образования — за цифровыми технологиями',
  'Мнение: экология должна стать приоритетом городской политики',
  'В Тюмени запустили новый маршрут электробуса',
  'Тюменские фермеры собрали рекордный урожай зерновых',
  'В городе пройдёт фестиваль уличной еды',
  'Область получила федеральный грант на развитие туризма',
  'В Тюмени начали строить новый спортивный комплекс',
  'Тюменские хоккеисты вышли в полуфинал чемпионата',
  'Городские библиотеки переходят на цифровой формат',
  'В Тюмени пройдёт конференция по искусственному интеллекту',
  'Тюменские дороги: итоги зимнего сезона',
  'Открытие нового корпуса государственного университета',
  'В Тюмени появится первый парк развлечений на набережной',
];

const catAssign = [
  'city','city','business','sports','city',
  'incidents','society','politics','culture','society',
  'business','incidents','business','society','incidents',
  'city','culture','city','culture','sports',
  'politics','society','incidents','business','society',
  'politics','city','sports','business','city',
  'news','city','sports','city','society',
  'society','business','business','city','sports',
  'culture','incidents','culture','business','city',
  'society','city','politics','city','news',
  'news','city','news','society','city',
  'society','culture','society','sports','sports',
  'society','business','city','society','city',
];

function generateTime(index: number): string {
  const now = new Date();
  const offset = index * 22;
  return new Date(now.getTime() - offset * 60000).toISOString();
}

export const articles: Article[] = headlines.map((title, i) => ({
  id: `article-${i + 1}`,
  title,
  slug: `article-${i + 1}`,
  excerpt: `${title}. Подробности и комментарии экспертов — в материале Тюмень.инфо.`,
  categoryId: catAssign[i] || 'news',
  authorId: authors[i % authors.length].id,
  publishedAt: generateTime(i),
  views: Math.floor(Math.random() * 15000) + 200,
  commentsCount: Math.floor(Math.random() * 45),
  coverIndex: i % 6,
  isBreaking: i === 0 || i === 6,
  isTop: i < 5,
  isRecommended: i >= 10 && i < 15,
  isOpinion: i >= 49 && i < 54,
  isReportage: i === 34,
}));

export const videos: Video[] = [
  { id: 'v1', title: 'Как изменится набережная Туры: 3D-визуализация проекта', coverIndex: 0, duration: '4:32', publishedAt: generateTime(0), views: 8420 },
  { id: 'v2', title: 'Репортаж с матча тюменского хоккейного клуба', coverIndex: 2, duration: '6:15', publishedAt: generateTime(3), views: 5310 },
  { id: 'v3', title: 'Зимняя Тюмень с высоты птичьего полёта', coverIndex: 5, duration: '3:48', publishedAt: generateTime(5), views: 12040 },
  { id: 'v4', title: 'Интервью с мэром о планах на 2026 год', coverIndex: 3, duration: '12:05', publishedAt: generateTime(8), views: 9870 },
  { id: 'v5', title: 'Открытие нового IT-коворкинга в центре города', coverIndex: 1, duration: '5:22', publishedAt: generateTime(10), views: 3150 },
  { id: 'v6', title: 'Фестиваль уличной еды: лучшие моменты', coverIndex: 4, duration: '7:40', publishedAt: generateTime(12), views: 6780 },
];

export const promos: Promo[] = [
  { id: 'p1', title: 'Скидка 20% на фитнес-абонемент', description: 'Сеть фитнес-клубов «Энергия» — до конца февраля', badge: '−20%' },
  { id: 'p2', title: 'Бесплатная доставка из ресторанов', description: 'Сервис доставки еды — промокод TYUMEN', badge: 'Бесплатно' },
  { id: 'p3', title: 'Выгодная ипотека от 4.5%', description: 'Специальные условия для жителей региона', badge: '4.5%' },
  { id: 'p4', title: 'Скидка на автомойку', description: 'Сеть автомоек — скидка по промокоду INFO', badge: '−30%' },
];

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find(a => a.id === id);
}

export function getArticleContent(article: Article): string {
  return `<p>${article.excerpt}</p>
<p>По данным редакции Тюмень.инфо, ситуация развивается динамично. Представители городской администрации подтвердили информацию и дали развёрнутый комментарий нашему изданию.</p>
<h2>Подробности</h2>
<p>Как сообщают источники, близкие к ситуации, решение было принято после длительных консультаций с экспертами и общественными организациями. Жители города активно обсуждают новость в социальных сетях.</p>
<blockquote>«Мы стремимся сделать Тюмень комфортным и современным городом для всех жителей», — заявил представитель администрации.</blockquote>
<p>Эксперты отмечают, что подобные инициативы положительно влияют на развитие региона и повышают качество жизни горожан. В ближайшее время ожидается дополнительная информация.</p>
<h2>Мнения экспертов</h2>
<p>Аналитики полагают, что данное событие может иметь долгосрочные последствия для развития Тюменской области. Особое внимание уделяется вопросам устойчивого развития и социальной ответственности.</p>
<p>Редакция Тюмень.инфо продолжает следить за развитием событий и будет информировать читателей о всех значимых изменениях.</p>`;
}
