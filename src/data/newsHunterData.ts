export type HunterStatus = 'found' | 'analyzing' | 'ready' | 'rejected' | 'rewriting' | 'draft_created';

export interface HunterNewsItem {
  id: string;
  title: string;
  sourceUrl: string;
  sourceName: string;
  foundAt: string;
  status: HunterStatus;
  category?: string;
  isTyumen: boolean;
  isNews: boolean;
  isAd: boolean;
  imageUrl?: string;
  extractedText?: string;
  rewrittenTitle?: string;
  rewrittenText?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  query?: string;
}

export interface HunterLogEntry {
  id: string;
  action: string;
  query?: string;
  result: string;
  count: number;
  timestamp: string;
  details?: string;
}

export interface HunterSettings {
  keywords: string[];
  frequency: number; // minutes
  maxPerDay: number;
  prioritySources: string[];
  autoRewrite: boolean;
  autoCategory: boolean;
}

export const HUNTER_STATUS_LABELS: Record<HunterStatus, string> = {
  found: 'Найдена',
  analyzing: 'Анализируется',
  ready: 'Готова к переписыванию',
  rejected: 'Отклонена',
  rewriting: 'Переписывается',
  draft_created: 'Черновик создан',
};

export const HUNTER_STATUS_COLORS: Record<HunterStatus, string> = {
  found: 'bg-blue-500/10 text-blue-700',
  analyzing: 'bg-yellow-500/10 text-yellow-700',
  ready: 'bg-green-500/10 text-green-700',
  rejected: 'bg-destructive/10 text-destructive',
  rewriting: 'bg-orange-500/10 text-orange-700',
  draft_created: 'bg-primary/10 text-primary',
};

export const DEFAULT_SETTINGS: HunterSettings = {
  keywords: [
    'Тюмень новости', 'происшествия Тюмень', 'Тюмень сегодня', 'что произошло в Тюмени',
    'авария Тюмень', 'пожар Тюмень', 'бизнес Тюмень', 'спорт Тюмень',
    'культура Тюмень', 'строительство Тюмень', 'транспорт Тюмень',
  ],
  frequency: 30,
  maxPerDay: 50,
  prioritySources: ['72.ru', 'vsluh.ru', 'nashgorod.ru', 'tumix.ru', 'tyumen.kp.ru'],
  autoRewrite: true,
  autoCategory: true,
};

export const MOCK_HUNTER_QUEUE: HunterNewsItem[] = [
  {
    id: 'h1', title: 'В Тюмени открыли новый мост через Туру', sourceUrl: 'https://72.ru/text/transport/2024/01/15/123456.html',
    sourceName: '72.ru', foundAt: '2025-03-08T09:15:00Z', status: 'found', category: 'Город', isTyumen: true, isNews: true, isAd: false,
    imageUrl: '/placeholder.svg', extractedText: 'Новый пешеходный мост через реку Тура был открыт в центре Тюмени...', query: 'Тюмень новости',
  },
  {
    id: 'h2', title: 'Крупное ДТП на объездной дороге Тюмени', sourceUrl: 'https://vsluh.ru/news/incident/2024/01/15/654321.html',
    sourceName: 'vsluh.ru', foundAt: '2025-03-08T08:45:00Z', status: 'analyzing', category: 'Происшествия', isTyumen: true, isNews: true, isAd: false,
    imageUrl: '/placeholder.svg', extractedText: 'На объездной дороге в районе Велижанского тракта произошло столкновение...', query: 'авария Тюмень',
  },
  {
    id: 'h3', title: 'Тюменский ФК вышел в полуфинал кубка', sourceUrl: 'https://nashgorod.ru/sport/2024/01/15/789.html',
    sourceName: 'nashgorod.ru', foundAt: '2025-03-08T08:30:00Z', status: 'ready', category: 'Спорт', isTyumen: true, isNews: true, isAd: false,
    imageUrl: '/placeholder.svg', extractedText: 'Футбольный клуб «Тюмень» одержал победу...', query: 'спорт Тюмень',
  },
  {
    id: 'h4', title: 'Купить квартиру в Тюмени со скидкой 20%', sourceUrl: 'https://example.com/ad/apartment',
    sourceName: 'example.com', foundAt: '2025-03-08T08:00:00Z', status: 'rejected', isTyumen: true, isNews: false, isAd: true, query: 'Тюмень сегодня',
  },
  {
    id: 'h5', title: 'Новый ресторан итальянской кухни в центре Тюмени', sourceUrl: 'https://tumix.ru/news/2024/01/15/restaurant.html',
    sourceName: 'tumix.ru', foundAt: '2025-03-08T07:30:00Z', status: 'rewriting', category: 'Бизнес', isTyumen: true, isNews: true, isAd: false,
    imageUrl: '/placeholder.svg', extractedText: 'В историческом центре города открылся ресторан...', query: 'бизнес Тюмень',
    rewrittenTitle: 'В центре Тюмени открылся новый итальянский ресторан',
    rewrittenText: 'Новое заведение итальянской кухни распахнуло двери в историческом центре Тюмени...',
  },
  {
    id: 'h6', title: 'Театральный фестиваль стартует в Тюмени', sourceUrl: 'https://tyumen.kp.ru/culture/festival.html',
    sourceName: 'tyumen.kp.ru', foundAt: '2025-03-08T07:00:00Z', status: 'draft_created', category: 'Культура', isTyumen: true, isNews: true, isAd: false,
    imageUrl: '/placeholder.svg', extractedText: 'Международный театральный фестиваль пройдёт в Тюмени...',
    rewrittenTitle: 'Международный театральный фестиваль стартует в Тюмени на следующей неделе',
    rewrittenText: 'На следующей неделе в Тюмени откроется масштабный международный театральный фестиваль...',
    seoTitle: 'Театральный фестиваль в Тюмени 2025 — программа и даты',
    seoDescription: 'Международный театральный фестиваль в Тюмени: даты, программа, участники. Все подробности о главном культурном событии города.',
    tags: ['культура', 'фестиваль', 'театр', 'Тюмень'],
  },
  {
    id: 'h7', title: 'Температура в Тюмени упала до -35°C', sourceUrl: 'https://72.ru/text/weather/2024/01/15/cold.html',
    sourceName: '72.ru', foundAt: '2025-03-08T06:30:00Z', status: 'ready', category: 'Город', isTyumen: true, isNews: true, isAd: false,
    extractedText: 'Синоптики зафиксировали аномальное похолодание в Тюменской области...', query: 'Тюмень сегодня',
  },
  {
    id: 'h8', title: 'Строительство нового ЖК на набережной Тюмени', sourceUrl: 'https://nashgorod.ru/build/2024/zhk.html',
    sourceName: 'nashgorod.ru', foundAt: '2025-03-08T06:00:00Z', status: 'found', category: 'Город', isTyumen: true, isNews: true, isAd: false,
    extractedText: 'На набережной реки Туры стартовало строительство нового жилого комплекса...', query: 'строительство Тюмень',
  },
];

export const MOCK_HUNTER_LOG: HunterLogEntry[] = [
  { id: 'l1', action: 'Поиск новостей', query: 'Тюмень новости', result: 'Найдено 12 статей', count: 12, timestamp: '2025-03-08T09:15:00Z', details: '8 подходящих, 4 отклонены (реклама)' },
  { id: 'l2', action: 'Поиск новостей', query: 'авария Тюмень', result: 'Найдено 3 статьи', count: 3, timestamp: '2025-03-08T08:45:00Z', details: '2 подходящие, 1 дубликат' },
  { id: 'l3', action: 'Анализ статьи', query: undefined, result: 'Статья подтверждена как новость', count: 1, timestamp: '2025-03-08T08:40:00Z', details: 'Источник: 72.ru, категория: Происшествия' },
  { id: 'l4', action: 'Переписывание', query: undefined, result: 'Текст переписан', count: 1, timestamp: '2025-03-08T08:35:00Z', details: 'Уникальность: 94%, SEO создан' },
  { id: 'l5', action: 'Отклонение', query: undefined, result: 'Реклама отклонена', count: 1, timestamp: '2025-03-08T08:00:00Z', details: 'example.com — рекламный контент' },
  { id: 'l6', action: 'Черновик создан', query: undefined, result: 'Новость отправлена в черновики', count: 1, timestamp: '2025-03-08T07:00:00Z', details: 'Театральный фестиваль — готова к публикации' },
  { id: 'l7', action: 'Поиск новостей', query: 'спорт Тюмень', result: 'Найдено 5 статей', count: 5, timestamp: '2025-03-08T06:45:00Z' },
  { id: 'l8', action: 'Извлечение изображений', query: undefined, result: 'Загружено 4 изображения', count: 4, timestamp: '2025-03-08T06:30:00Z' },
];
