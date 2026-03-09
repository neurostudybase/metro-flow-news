export interface AnalyticsItem {
  id: string;
  title: string;
  city: string;
  cityId: string;
  category: string;
  publishedAt: string;
  views: number;
  uniqueViews: number;
  avgTimeOnPage: number; // seconds
  engagementScore: number; // 0-100
  contentScore: number;
  source: 'editorial' | 'ai';
}

export interface CategoryStats {
  category: string;
  newsCount: number;
  totalViews: number;
  avgEngagement: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface CityStats {
  city: string;
  cityId: string;
  newsCount: number;
  totalViews: number;
  avgEngagement: number;
}

export interface TrendingTopic {
  topic: string;
  category: string;
  direction: 'up' | 'down' | 'stable';
  growthPercent: number;
  mentionCount: number;
  period: string;
}

export interface AIRecommendation {
  id: string;
  type: 'write_more' | 'boost_category' | 'create_collection' | 'reduce';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  relatedTopic: string;
  createdAt: string;
}

// --- Score calculation ---
export function calculateContentScore(item: Pick<AnalyticsItem, 'views' | 'avgTimeOnPage' | 'uniqueViews'>): number {
  const viewScore = Math.min(item.views / 100, 40);
  const timeScore = Math.min(item.avgTimeOnPage / 10, 30);
  const uniqueRatio = item.views > 0 ? (item.uniqueViews / item.views) * 30 : 0;
  return Math.round(viewScore + timeScore + uniqueRatio);
}

// --- Mock data ---
export const mockAnalyticsItems: AnalyticsItem[] = [
  { id: '1', title: 'В Тюмени открылся новый ледовый дворец', city: 'Тюмень', cityId: 'tyumen', category: 'Город', publishedAt: '2026-03-09', views: 4520, uniqueViews: 3800, avgTimeOnPage: 125, engagementScore: 82, contentScore: 88, source: 'editorial' },
  { id: '2', title: 'ДТП на объездной дороге: 3 пострадавших', city: 'Тюмень', cityId: 'tyumen', category: 'Происшествия', publishedAt: '2026-03-09', views: 3210, uniqueViews: 2900, avgTimeOnPage: 90, engagementScore: 75, contentScore: 72, source: 'editorial' },
  { id: '3', title: 'Новые тарифы ЖКХ с апреля 2026', city: 'Тюмень', cityId: 'tyumen', category: 'Общество', publishedAt: '2026-03-08', views: 2870, uniqueViews: 2500, avgTimeOnPage: 180, engagementScore: 78, contentScore: 80, source: 'editorial' },
  { id: '4', title: 'Бизнес-форум «Тюмень 2026»', city: 'Тюмень', cityId: 'tyumen', category: 'Бизнес', publishedAt: '2026-03-07', views: 2140, uniqueViews: 1800, avgTimeOnPage: 95, engagementScore: 65, contentScore: 62, source: 'ai' },
  { id: '5', title: '«Рубин» выиграл кубок области', city: 'Тюмень', cityId: 'tyumen', category: 'Спорт', publishedAt: '2026-03-08', views: 1890, uniqueViews: 1600, avgTimeOnPage: 70, engagementScore: 60, contentScore: 58, source: 'editorial' },
  { id: '6', title: 'Курган готовится к паводку', city: 'Курган', cityId: 'kurgan', category: 'Город', publishedAt: '2026-03-09', views: 3100, uniqueViews: 2700, avgTimeOnPage: 110, engagementScore: 70, contentScore: 74, source: 'editorial' },
  { id: '7', title: 'Новый парк в центре Кургана', city: 'Курган', cityId: 'kurgan', category: 'Город', publishedAt: '2026-03-07', views: 1450, uniqueViews: 1200, avgTimeOnPage: 85, engagementScore: 55, contentScore: 52, source: 'ai' },
  { id: '8', title: 'Лучшие рестораны Тюмени: обзор 2026', city: 'Тюмень', cityId: 'tyumen', category: 'Культура', publishedAt: '2026-03-06', views: 5200, uniqueViews: 4800, avgTimeOnPage: 200, engagementScore: 90, contentScore: 92, source: 'ai' },
  { id: '9', title: 'Строительство нового ЖК «Тюменский»', city: 'Тюмень', cityId: 'tyumen', category: 'Недвижимость', publishedAt: '2026-03-05', views: 1800, uniqueViews: 1500, avgTimeOnPage: 140, engagementScore: 68, contentScore: 66, source: 'editorial' },
  { id: '10', title: 'Концерт Баскова в Кургане', city: 'Курган', cityId: 'kurgan', category: 'Культура', publishedAt: '2026-03-08', views: 2200, uniqueViews: 1900, avgTimeOnPage: 60, engagementScore: 58, contentScore: 55, source: 'editorial' },
  { id: '11', title: 'Где гулять зимой в Тюмени', city: 'Тюмень', cityId: 'tyumen', category: 'Город', publishedAt: '2026-03-04', views: 6100, uniqueViews: 5500, avgTimeOnPage: 220, engagementScore: 95, contentScore: 96, source: 'ai' },
  { id: '12', title: 'Авария на трассе Курган-Челябинск', city: 'Курган', cityId: 'kurgan', category: 'Происшествия', publishedAt: '2026-03-09', views: 2800, uniqueViews: 2400, avgTimeOnPage: 75, engagementScore: 72, contentScore: 70, source: 'editorial' },
];

export const mockCategoryStats: CategoryStats[] = [
  { category: 'Происшествия', newsCount: 45, totalViews: 28500, avgEngagement: 74, trend: 'up', changePercent: 12 },
  { category: 'Город', newsCount: 38, totalViews: 22400, avgEngagement: 70, trend: 'up', changePercent: 8 },
  { category: 'Бизнес', newsCount: 22, totalViews: 12800, avgEngagement: 62, trend: 'stable', changePercent: 1 },
  { category: 'Спорт', newsCount: 18, totalViews: 9600, avgEngagement: 58, trend: 'up', changePercent: 15 },
  { category: 'Культура', newsCount: 15, totalViews: 8200, avgEngagement: 55, trend: 'down', changePercent: -8 },
  { category: 'Общество', newsCount: 25, totalViews: 14200, avgEngagement: 66, trend: 'stable', changePercent: 2 },
  { category: 'Недвижимость', newsCount: 12, totalViews: 7100, avgEngagement: 60, trend: 'up', changePercent: 20 },
];

export const mockCityStats: CityStats[] = [
  { city: 'Тюмень', cityId: 'tyumen', newsCount: 156, totalViews: 87400, avgEngagement: 72 },
  { city: 'Курган', cityId: 'kurgan', newsCount: 89, totalViews: 34200, avgEngagement: 64 },
  { city: 'Тобольск', cityId: 'tobolsk', newsCount: 42, totalViews: 12800, avgEngagement: 58 },
  { city: 'Ишим', cityId: 'ishim', newsCount: 28, totalViews: 8400, avgEngagement: 52 },
  { city: 'Ялуторовск', cityId: 'yalutorovsk', newsCount: 15, totalViews: 4200, avgEngagement: 48 },
];

export const mockTrendingTopics: TrendingTopic[] = [
  { topic: 'Аварии и ДТП', category: 'Происшествия', direction: 'up', growthPercent: 25, mentionCount: 34, period: 'week' },
  { topic: 'Недвижимость', category: 'Недвижимость', direction: 'up', growthPercent: 42, mentionCount: 28, period: 'week' },
  { topic: 'Городские события', category: 'Город', direction: 'up', growthPercent: 18, mentionCount: 45, period: 'week' },
  { topic: 'Спортивные матчи', category: 'Спорт', direction: 'up', growthPercent: 30, mentionCount: 22, period: 'week' },
  { topic: 'Тарифы ЖКХ', category: 'Общество', direction: 'stable', growthPercent: 2, mentionCount: 15, period: 'week' },
  { topic: 'Театры и концерты', category: 'Культура', direction: 'down', growthPercent: -12, mentionCount: 8, period: 'week' },
  { topic: 'Новые кафе', category: 'Культура', direction: 'up', growthPercent: 35, mentionCount: 12, period: 'week' },
  { topic: 'Паводок', category: 'Город', direction: 'up', growthPercent: 60, mentionCount: 18, period: 'week' },
];

export const mockRecommendations: AIRecommendation[] = [
  { id: 'r1', type: 'write_more', title: 'Больше о недвижимости', description: 'Тема «Недвижимость» растёт на 42%. Рекомендуем увеличить частоту публикаций.', priority: 'high', relatedTopic: 'Недвижимость', createdAt: '2026-03-09' },
  { id: 'r2', type: 'boost_category', title: 'Усилить рубрику «Спорт»', description: 'Интерес к спортивным матчам вырос на 30%. Добавьте обзоры и прогнозы.', priority: 'medium', relatedTopic: 'Спорт', createdAt: '2026-03-09' },
  { id: 'r3', type: 'create_collection', title: 'Подборка «Где поесть»', description: 'Тема «Новые кафе» набирает популярность (+35%). Создайте подборку ресторанов.', priority: 'medium', relatedTopic: 'Новые кафе', createdAt: '2026-03-08' },
  { id: 'r4', type: 'reduce', title: 'Культура: пересмотреть контент', description: 'Рубрика «Культура» теряет просмотры (-8%). Обновите формат.', priority: 'low', relatedTopic: 'Культура', createdAt: '2026-03-08' },
  { id: 'r5', type: 'write_more', title: 'Паводковая тема', description: 'Тема «Паводок» растёт на 60%. Подготовьте материалы и рекомендации.', priority: 'high', relatedTopic: 'Паводок', createdAt: '2026-03-09' },
];

// Helpers
export function getTopNews(period: 'day' | 'week' | 'month', cityId?: string): AnalyticsItem[] {
  let items = [...mockAnalyticsItems];
  if (cityId) items = items.filter(i => i.cityId === cityId);
  return items.sort((a, b) => b.views - a.views);
}

export function getAIContentStats(): AnalyticsItem[] {
  return mockAnalyticsItems.filter(i => i.source === 'ai');
}

export function getEditorialContentStats(): AnalyticsItem[] {
  return mockAnalyticsItems.filter(i => i.source === 'editorial');
}

// Signals for AI editors
export function getSignalsForAI(): { popularTopics: string[]; weakCategories: string[] } {
  const popular = mockTrendingTopics.filter(t => t.direction === 'up' && t.growthPercent > 20).map(t => t.topic);
  const weak = mockCategoryStats.filter(c => c.trend === 'down').map(c => c.category);
  return { popularTopics: popular, weakCategories: weak };
}

// View count data for charts
export const mockViewsChartData = [
  { date: '03 Мар', views: 8200 },
  { date: '04 Мар', views: 9100 },
  { date: '05 Мар', views: 7800 },
  { date: '06 Мар', views: 10400 },
  { date: '07 Мар', views: 11200 },
  { date: '08 Мар', views: 12800 },
  { date: '09 Мар', views: 14500 },
];
