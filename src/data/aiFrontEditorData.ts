export type FrontEditorMode = 'suggestions_only' | 'editor_approval' | 'auto_update';

export interface FrontEditorSettings {
  enabled: boolean;
  mode: FrontEditorMode;
  topStoriesCount: number;
  minScore: number;
  updateIntervalMinutes: number;
  currentCityId: string;
}

export interface FrontPageSuggestion {
  id: string;
  newsId: string;
  title: string;
  category: string;
  cityId: string;
  cityName: string;
  score: number;
  isBreaking: boolean;
  pinned: boolean;
  position: number;
  section: 'top' | 'city' | 'incidents' | 'business' | 'sports' | 'culture' | 'society';
  status: 'suggested' | 'accepted' | 'rejected' | 'published';
  suggestedAt: string;
  decidedAt?: string;
  decidedBy?: string;
  excerpt: string;
  imageUrl?: string;
}

export interface FrontEditorLogEntry {
  id: string;
  timestamp: string;
  action: string;
  newsTitle: string;
  details: string;
  result: 'success' | 'rejected' | 'info';
}

export const defaultFrontEditorSettings: FrontEditorSettings = {
  enabled: true,
  mode: 'editor_approval',
  topStoriesCount: 5,
  minScore: 50,
  updateIntervalMinutes: 30,
  currentCityId: 'tyumen',
};

const sections: FrontPageSuggestion['section'][] = ['top', 'city', 'incidents', 'business', 'sports', 'culture', 'society'];
const sectionLabels: Record<FrontPageSuggestion['section'], string> = {
  top: 'Главные новости',
  city: 'Город',
  incidents: 'Происшествия',
  business: 'Бизнес',
  sports: 'Спорт',
  culture: 'Культура',
  society: 'Общество',
};

export const getSectionLabel = (section: FrontPageSuggestion['section']): string => sectionLabels[section];
export const allSections = sections;

const cities = [
  { id: 'tyumen', name: 'Тюмень' },
  { id: 'kurgan', name: 'Курган' },
  { id: 'bryansk', name: 'Брянск' },
  { id: 'nefteyugansk', name: 'Нефтеюганск' },
];

export const availableCities = cities;

export const mockSuggestions: FrontPageSuggestion[] = [
  {
    id: 'fs-1', newsId: 'n-101', title: 'В центре Тюмени откроется новый парк на набережной', category: 'Город', cityId: 'tyumen', cityName: 'Тюмень',
    score: 92, isBreaking: false, pinned: true, position: 1, section: 'top', status: 'accepted', suggestedAt: '2025-01-15T08:00:00Z',
    decidedAt: '2025-01-15T08:30:00Z', decidedBy: 'Редактор', excerpt: 'Мэрия утвердила проект нового парка площадью 5 гектаров...', imageUrl: '/placeholder.svg',
  },
  {
    id: 'fs-2', newsId: 'n-102', title: 'Крупное ДТП на объездной: перекрыто движение', category: 'Происшествия', cityId: 'tyumen', cityName: 'Тюмень',
    score: 88, isBreaking: true, pinned: false, position: 2, section: 'top', status: 'suggested', suggestedAt: '2025-01-15T09:15:00Z',
    excerpt: 'На объездной дороге произошло столкновение трёх автомобилей...', imageUrl: '/placeholder.svg',
  },
  {
    id: 'fs-3', newsId: 'n-103', title: 'Тюменские предприниматели получат новые льготы', category: 'Бизнес', cityId: 'tyumen', cityName: 'Тюмень',
    score: 75, isBreaking: false, pinned: false, position: 1, section: 'business', status: 'suggested', suggestedAt: '2025-01-15T10:00:00Z',
    excerpt: 'Губернатор подписал указ о поддержке малого бизнеса...',
  },
  {
    id: 'fs-4', newsId: 'n-104', title: '«Рубин» одержал победу в домашнем матче', category: 'Спорт', cityId: 'tyumen', cityName: 'Тюмень',
    score: 70, isBreaking: false, pinned: false, position: 1, section: 'sports', status: 'suggested', suggestedAt: '2025-01-15T11:30:00Z',
    excerpt: 'Домашняя команда выиграла со счётом 3:1...',
  },
  {
    id: 'fs-5', newsId: 'n-105', title: 'Фестиваль уличного искусства пройдёт в выходные', category: 'Культура', cityId: 'tyumen', cityName: 'Тюмень',
    score: 65, isBreaking: false, pinned: false, position: 1, section: 'culture', status: 'accepted', suggestedAt: '2025-01-15T07:00:00Z',
    decidedAt: '2025-01-15T07:45:00Z', decidedBy: 'Редактор', excerpt: 'Более 50 художников представят свои работы на улицах города...',
  },
  {
    id: 'fs-6', newsId: 'n-106', title: 'В Кургане затопило несколько улиц после ливня', category: 'Происшествия', cityId: 'kurgan', cityName: 'Курган',
    score: 82, isBreaking: true, pinned: false, position: 1, section: 'incidents', status: 'suggested', suggestedAt: '2025-01-15T12:00:00Z',
    excerpt: 'Ливневая канализация не справилась с потоком воды...',
  },
  {
    id: 'fs-7', newsId: 'n-107', title: 'Новый жилой комплекс сдан раньше срока', category: 'Город', cityId: 'tyumen', cityName: 'Тюмень',
    score: 60, isBreaking: false, pinned: false, position: 2, section: 'city', status: 'rejected', suggestedAt: '2025-01-15T06:00:00Z',
    decidedAt: '2025-01-15T06:30:00Z', decidedBy: 'Редактор', excerpt: 'ЖК «Новый горизонт» принял первых жильцов...',
  },
  {
    id: 'fs-8', newsId: 'n-108', title: 'Волонтёры убрали берег реки Туры', category: 'Общество', cityId: 'tyumen', cityName: 'Тюмень',
    score: 55, isBreaking: false, pinned: false, position: 1, section: 'society', status: 'suggested', suggestedAt: '2025-01-15T13:00:00Z',
    excerpt: 'Более 200 волонтёров приняли участие в акции...',
  },
];

export const mockFrontEditorLog: FrontEditorLogEntry[] = [
  { id: 'fl-1', timestamp: '2025-01-15T13:00:00Z', action: 'Анализ новостей', newsTitle: '—', details: 'Проанализировано 45 новостей, отобрано 8 предложений', result: 'success' },
  { id: 'fl-2', timestamp: '2025-01-15T12:30:00Z', action: 'Предложение принято', newsTitle: 'В центре Тюмени откроется новый парк', details: 'Раздел: Главные новости, позиция 1', result: 'success' },
  { id: 'fl-3', timestamp: '2025-01-15T12:00:00Z', action: 'Предложение отклонено', newsTitle: 'Новый жилой комплекс сдан раньше срока', details: 'Причина: низкий score (60)', result: 'rejected' },
  { id: 'fl-4', timestamp: '2025-01-15T11:30:00Z', action: 'Breaking News обнаружена', newsTitle: 'Крупное ДТП на объездной', details: 'Автоматически повышен приоритет', result: 'info' },
  { id: 'fl-5', timestamp: '2025-01-15T11:00:00Z', action: 'Обновление главной', newsTitle: '—', details: 'Обновлены разделы: Культура, Спорт', result: 'success' },
];

// AI scoring logic
export function calculateNewsScore(news: { publishedAt: string; viewCount?: number; category: string; hasImage: boolean; contentLength: number }): number {
  let score = 0;
  // Freshness (max 30)
  const hoursAgo = (Date.now() - new Date(news.publishedAt).getTime()) / 3600000;
  if (hoursAgo < 1) score += 30;
  else if (hoursAgo < 3) score += 25;
  else if (hoursAgo < 6) score += 20;
  else if (hoursAgo < 12) score += 15;
  else if (hoursAgo < 24) score += 10;
  else score += 5;

  // Popularity (max 25)
  const views = news.viewCount || 0;
  if (views > 1000) score += 25;
  else if (views > 500) score += 20;
  else if (views > 100) score += 15;
  else score += 5;

  // Has image (max 10)
  if (news.hasImage) score += 10;

  // Content length (max 15)
  if (news.contentLength > 2000) score += 15;
  else if (news.contentLength > 1000) score += 10;
  else score += 5;

  // Category weight (max 20)
  const categoryWeights: Record<string, number> = { 'Происшествия': 20, 'Город': 18, 'Бизнес': 15, 'Спорт': 12, 'Культура': 10, 'Общество': 10 };
  score += categoryWeights[news.category] || 10;

  return Math.min(100, score);
}

export function detectBreakingNews(title: string, content: string): boolean {
  const keywords = ['срочно', 'breaking', 'экстренно', 'чп', 'взрыв', 'пожар', 'эвакуация', 'крупное дтп', 'наводнение', 'обрушение'];
  const text = (title + ' ' + content).toLowerCase();
  return keywords.some(kw => text.includes(kw));
}

export function assignSection(category: string): FrontPageSuggestion['section'] {
  const map: Record<string, FrontPageSuggestion['section']> = {
    'Город': 'city', 'Происшествия': 'incidents', 'Бизнес': 'business',
    'Спорт': 'sports', 'Культура': 'culture', 'Общество': 'society',
  };
  return map[category] || 'city';
}
