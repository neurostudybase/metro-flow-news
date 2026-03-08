// AI Journalist — генерация уникальных городских статей

import { CITIES } from './citiesData';

export type ArticleType = 'city_guide' | 'compilation' | 'short_news' | 'district_review' | 'useful_article';
export type PublicationMode = 'draft_only' | 'review_required' | 'auto_publish';
export type JournalistArticleStatus = 'draft' | 'review' | 'published' | 'rejected';

export interface JournalistTopic {
  id: string;
  title: string;
  description: string;
  articleType: ArticleType;
  cityId?: string;
  enabled: boolean;
  createdAt: string;
}

export interface JournalistArticle {
  id: string;
  topicId: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  slug: string;
  seoTitle: string;
  seoDescription: string;
  cityId: string;
  cityName: string;
  articleType: ArticleType;
  status: JournalistArticleStatus;
  contentScore: number;
  createdAt: string;
  publishedAt?: string;
}

export interface JournalistLogEntry {
  id: string;
  articleId: string;
  articleTitle: string;
  cityName: string;
  action: string;
  timestamp: string;
  status: JournalistArticleStatus | 'generated' | 'regenerated';
}

export interface JournalistSettings {
  enabled: boolean; // AI_JOURNALIST_ENABLED
  maxArticlesPerDay: number;
  publicationMode: PublicationMode;
  disabledCities: string[]; // AI_DISABLED_CITIES
}

export const ARTICLE_TYPE_LABELS: Record<ArticleType, string> = {
  city_guide: 'Городской гид',
  compilation: 'Подборка',
  short_news: 'Короткая новость',
  district_review: 'Обзор района',
  useful_article: 'Полезная статья',
};

export const PUBLICATION_MODE_LABELS: Record<PublicationMode, string> = {
  draft_only: 'Только черновики',
  review_required: 'Требуется подтверждение',
  auto_publish: 'Автопубликация',
};

export const JOURNALIST_STATUS_LABELS: Record<JournalistArticleStatus, string> = {
  draft: 'Черновик',
  review: 'На проверке',
  published: 'Опубликовано',
  rejected: 'Отклонено',
};

// Mock topics
export const MOCK_TOPICS: JournalistTopic[] = [
  { id: 'topic-1', title: 'Лучшие рестораны города', description: 'Подборка топовых ресторанов с описанием меню и атмосферы', articleType: 'compilation', enabled: true, createdAt: '2026-03-01T10:00:00' },
  { id: 'topic-2', title: 'Новые кафе', description: 'Обзор недавно открывшихся кафе и кофеен', articleType: 'city_guide', enabled: true, createdAt: '2026-03-02T10:00:00' },
  { id: 'topic-3', title: 'Где гулять', description: 'Лучшие парки, набережные и маршруты для прогулок', articleType: 'city_guide', enabled: true, createdAt: '2026-03-03T10:00:00' },
  { id: 'topic-4', title: 'Новые жилые комплексы', description: 'Обзор строящихся и сданных ЖК', articleType: 'district_review', enabled: true, createdAt: '2026-03-04T10:00:00' },
  { id: 'topic-5', title: 'Городские события', description: 'Ближайшие мероприятия и фестивали', articleType: 'short_news', enabled: true, createdAt: '2026-03-05T10:00:00' },
  { id: 'topic-6', title: 'Полезные советы для горожан', description: 'Практические статьи о жизни в городе', articleType: 'useful_article', enabled: false, createdAt: '2026-03-06T10:00:00' },
];

// Mock articles
export const MOCK_JOURNALIST_ARTICLES: JournalistArticle[] = [
  {
    id: 'ja-1', topicId: 'topic-1', title: 'Топ-10 ресторанов Тюмени в 2026 году', excerpt: 'Мы собрали лучшие рестораны Тюмени — от высокой кухни до уютных семейных заведений.',
    content: 'Тюмень — город, где гастрономическая культура развивается стремительно. В 2026 году здесь открылось несколько заведений мирового уровня...',
    category: 'Город', tags: ['рестораны', 'еда', 'гид', 'тюмень'], slug: 'top-10-restoranov-tyumeni-2026',
    seoTitle: 'Топ-10 ресторанов Тюмени 2026 — лучшие заведения', seoDescription: 'Подборка лучших ресторанов Тюмени в 2026 году: адреса, меню, цены и отзывы.',
    cityId: 'tyumen', cityName: 'Тюмень', articleType: 'compilation', status: 'published', contentScore: 88, createdAt: '2026-03-07T12:00:00', publishedAt: '2026-03-07T14:00:00',
  },
  {
    id: 'ja-2', topicId: 'topic-3', title: 'Лучшие парки Кургана для прогулок', excerpt: 'Парки и скверы Кургана, где приятно провести выходные.',
    content: 'Курган предлагает горожанам несколько отличных парков для прогулок и отдыха на свежем воздухе...',
    category: 'Город', tags: ['парки', 'прогулки', 'курган', 'отдых'], slug: 'luchshie-parki-kurgana',
    seoTitle: 'Лучшие парки Кургана — где погулять', seoDescription: 'Обзор лучших парков и скверов Кургана для прогулок и отдыха.',
    cityId: 'kurgan', cityName: 'Курган', articleType: 'city_guide', status: 'review', contentScore: 75, createdAt: '2026-03-08T08:00:00',
  },
  {
    id: 'ja-3', topicId: 'topic-4', title: 'Новые ЖК Брянска: обзор 2026', excerpt: 'Какие жилые комплексы строятся в Брянске — цены, сроки, локации.',
    content: 'В 2026 году в Брянске активно ведётся жилищное строительство. Рассмотрим самые интересные проекты...',
    category: 'Бизнес', tags: ['жк', 'строительство', 'брянск', 'недвижимость'], slug: 'novye-zhk-bryanska-2026',
    seoTitle: 'Новые ЖК Брянска 2026 — обзор застройщиков', seoDescription: 'Обзор новых жилых комплексов Брянска в 2026 году.',
    cityId: 'bryansk', cityName: 'Брянск', articleType: 'district_review', status: 'draft', contentScore: 62, createdAt: '2026-03-08T09:00:00',
  },
  {
    id: 'ja-4', topicId: 'topic-5', title: 'Фестиваль уличной еды в Тюмени', excerpt: 'В эти выходные в Тюмени пройдёт фестиваль уличной еды.',
    content: 'Городской фестиваль уличной еды соберёт лучших поваров региона на набережной Тюмени...',
    category: 'Культура', tags: ['фестиваль', 'еда', 'тюмень', 'событие'], slug: 'festival-ulichnoy-edy-tyumen',
    seoTitle: 'Фестиваль уличной еды в Тюмени 2026', seoDescription: 'Когда и где пройдёт фестиваль уличной еды в Тюмени.',
    cityId: 'tyumen', cityName: 'Тюмень', articleType: 'short_news', status: 'draft', contentScore: 55, createdAt: '2026-03-08T10:00:00',
  },
];

// Mock log
export const MOCK_JOURNALIST_LOG: JournalistLogEntry[] = [
  { id: 'jl-1', articleId: 'ja-1', articleTitle: 'Топ-10 ресторанов Тюмени', cityName: 'Тюмень', action: 'Статья сгенерирована', timestamp: '2026-03-07T12:00:00', status: 'generated' },
  { id: 'jl-2', articleId: 'ja-1', articleTitle: 'Топ-10 ресторанов Тюмени', cityName: 'Тюмень', action: 'Опубликовано', timestamp: '2026-03-07T14:00:00', status: 'published' },
  { id: 'jl-3', articleId: 'ja-2', articleTitle: 'Лучшие парки Кургана', cityName: 'Курган', action: 'Статья сгенерирована', timestamp: '2026-03-08T08:00:00', status: 'generated' },
  { id: 'jl-4', articleId: 'ja-2', articleTitle: 'Лучшие парки Кургана', cityName: 'Курган', action: 'Отправлено на проверку', timestamp: '2026-03-08T08:01:00', status: 'review' },
  { id: 'jl-5', articleId: 'ja-3', articleTitle: 'Новые ЖК Брянска', cityName: 'Брянск', action: 'Статья сгенерирована', timestamp: '2026-03-08T09:00:00', status: 'generated' },
  { id: 'jl-6', articleId: 'ja-4', articleTitle: 'Фестиваль уличной еды в Тюмени', cityName: 'Тюмень', action: 'Статья сгенерирована', timestamp: '2026-03-08T10:00:00', status: 'generated' },
];

export const DEFAULT_JOURNALIST_SETTINGS: JournalistSettings = {
  enabled: true,
  maxArticlesPerDay: 10,
  publicationMode: 'review_required',
  disabledCities: ['bryansk'],
};
