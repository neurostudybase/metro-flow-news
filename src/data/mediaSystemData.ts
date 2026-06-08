// Mock data for the Media Holding Operating System admin sections.

export type AgentRole =
  | 'news_writer' | 'rewriter' | 'seo' | 'fact_checker' | 'headline'
  | 'social' | 'image' | 'moderator' | 'trend' | 'city_agent';

export const AGENT_ROLE_LABELS: Record<AgentRole, string> = {
  news_writer: 'News Writer',
  rewriter: 'Rewriter',
  seo: 'SEO Agent',
  fact_checker: 'Fact Checker',
  headline: 'Headline Generator',
  social: 'Social Media Agent',
  image: 'Image Agent',
  moderator: 'Moderator',
  trend: 'Trend Agent',
  city_agent: 'City Agent',
};

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  model: string;
  provider: string;
  status: 'active' | 'paused' | 'error';
  publications: number;
  approved: number;
  rejected: number;
  quality: number;       // 0-100
  errors: number;
  lastRun: string;
  cityId?: string | 'all';
}

export const MOCK_AGENTS: Agent[] = [
  { id: 'a1', name: 'Writer-72', role: 'news_writer', model: 'gpt-4o-mini', provider: 'OpenAI', status: 'active', publications: 1284, approved: 1198, rejected: 86, quality: 92, errors: 3, lastRun: '2 мин назад', cityId: 'tyumen' },
  { id: 'a2', name: 'Rewriter-Pro', role: 'rewriter', model: 'deepseek-v3', provider: 'DeepSeek', status: 'active', publications: 4520, approved: 4380, rejected: 140, quality: 88, errors: 12, lastRun: '40 сек назад', cityId: 'all' },
  { id: 'a3', name: 'SEO-Optimizer', role: 'seo', model: 'gemini-2.5-flash', provider: 'Gemini', status: 'active', publications: 3210, approved: 3150, rejected: 60, quality: 95, errors: 1, lastRun: '1 мин назад', cityId: 'all' },
  { id: 'a4', name: 'FactCheck-AI', role: 'fact_checker', model: 'claude-3.5-sonnet', provider: 'Claude', status: 'active', publications: 980, approved: 920, rejected: 60, quality: 96, errors: 0, lastRun: '5 мин назад', cityId: 'all' },
  { id: 'a5', name: 'Headline-Genius', role: 'headline', model: 'gpt-4o-mini', provider: 'OpenAI', status: 'active', publications: 5200, approved: 5050, rejected: 150, quality: 90, errors: 2, lastRun: '20 сек назад', cityId: 'all' },
  { id: 'a6', name: 'SocialPost-Bot', role: 'social', model: 'qwen-2.5', provider: 'Qwen', status: 'paused', publications: 1840, approved: 1600, rejected: 240, quality: 78, errors: 18, lastRun: '2 ч назад', cityId: 'all' },
  { id: 'a7', name: 'ImageDesc-AI', role: 'image', model: 'gemini-2.5-flash', provider: 'Gemini', status: 'active', publications: 3100, approved: 3000, rejected: 100, quality: 91, errors: 4, lastRun: '12 сек назад', cityId: 'all' },
  { id: 'a8', name: 'Moderator-AI', role: 'moderator', model: 'claude-3.5-sonnet', provider: 'Claude', status: 'active', publications: 2150, approved: 1980, rejected: 170, quality: 93, errors: 5, lastRun: '8 сек назад', cityId: 'all' },
  { id: 'a9', name: 'Trend-Hunter', role: 'trend', model: 'grok-2', provider: 'Grok', status: 'active', publications: 420, approved: 390, rejected: 30, quality: 85, errors: 7, lastRun: '15 мин назад', cityId: 'all' },
  { id: 'a10', name: 'Kurgan-City-Agent', role: 'city_agent', model: 'deepseek-v3', provider: 'DeepSeek', status: 'active', publications: 612, approved: 580, rejected: 32, quality: 89, errors: 2, lastRun: '3 мин назад', cityId: 'kurgan' },
  { id: 'a11', name: 'Bryansk-City-Agent', role: 'city_agent', model: 'gpt-4o-mini', provider: 'OpenAI', status: 'error', publications: 380, approved: 340, rejected: 40, quality: 80, errors: 24, lastRun: '1 ч назад', cityId: 'bryansk' },
  { id: 'a12', name: 'NY-City-Agent', role: 'city_agent', model: 'kimi-k1.5', provider: 'Kimi', status: 'paused', publications: 210, approved: 195, rejected: 15, quality: 87, errors: 3, lastRun: 'вчера', cityId: 'nefteyugansk' },
];

export type Provider = 'OpenAI' | 'DeepSeek' | 'Gemini' | 'Claude' | 'Qwen' | 'Grok' | 'Kimi' | 'OpenRouter';

export interface ApiKey {
  id: string;
  provider: Provider;
  model: string;
  key: string;        // masked
  status: 'active' | 'disabled' | 'invalid';
  dailyRequests: number;
  tokens: number;
  costUsd: number;
  limitUsd: number;
}

export const MOCK_API_KEYS: ApiKey[] = [
  { id: 'k1', provider: 'OpenAI', model: 'gpt-4o-mini', key: 'sk-•••••••••a91c', status: 'active', dailyRequests: 18400, tokens: 5_200_000, costUsd: 42.18, limitUsd: 200 },
  { id: 'k2', provider: 'DeepSeek', model: 'deepseek-v3', key: 'ds-•••••••••7e22', status: 'active', dailyRequests: 24800, tokens: 8_100_000, costUsd: 11.40, limitUsd: 100 },
  { id: 'k3', provider: 'Gemini', model: 'gemini-2.5-flash', key: 'AIza•••••••KdL2', status: 'active', dailyRequests: 12400, tokens: 4_900_000, costUsd: 9.80, limitUsd: 150 },
  { id: 'k4', provider: 'Claude', model: 'claude-3.5-sonnet', key: 'sk-ant-•••••wq14', status: 'active', dailyRequests: 6400, tokens: 2_100_000, costUsd: 28.30, limitUsd: 200 },
  { id: 'k5', provider: 'Qwen', model: 'qwen-2.5', key: 'qw-•••••••••42a', status: 'disabled', dailyRequests: 0, tokens: 0, costUsd: 0, limitUsd: 50 },
  { id: 'k6', provider: 'Grok', model: 'grok-2', key: 'xai-••••••••b71', status: 'active', dailyRequests: 1900, tokens: 480_000, costUsd: 6.20, limitUsd: 50 },
  { id: 'k7', provider: 'Kimi', model: 'kimi-k1.5', key: 'km-•••••••••99x', status: 'invalid', dailyRequests: 0, tokens: 0, costUsd: 0, limitUsd: 50 },
  { id: 'k8', provider: 'OpenRouter', model: 'mixed', key: 'or-•••••••••a01', status: 'active', dailyRequests: 8200, tokens: 3_400_000, costUsd: 18.60, limitUsd: 100 },
];

export const PIPELINE_STAGES = ['Source', 'Rewrite', 'Fact Check', 'SEO', 'Moderation', 'Schedule', 'Publish'] as const;
export type PipelineStage = typeof PIPELINE_STAGES[number];

export const PIPELINE_COUNTS: Record<PipelineStage, number> = {
  Source: 184, Rewrite: 92, 'Fact Check': 47, SEO: 36, Moderation: 21, Schedule: 14, Publish: 8,
};

export interface PipelineItem { id: string; title: string; cityId: string; stage: PipelineStage; agent: string; }
export const MOCK_PIPELINE_ITEMS: PipelineItem[] = [
  { id: 'p1', title: 'Авария на Профсоюзной', cityId: 'tyumen', stage: 'Rewrite', agent: 'Rewriter-Pro' },
  { id: 'p2', title: 'Курган: открытие школы №42', cityId: 'kurgan', stage: 'Fact Check', agent: 'FactCheck-AI' },
  { id: 'p3', title: 'Брянск: цены на бензин', cityId: 'bryansk', stage: 'SEO', agent: 'SEO-Optimizer' },
  { id: 'p4', title: 'Тюмень: новый автобусный маршрут', cityId: 'tyumen', stage: 'Moderation', agent: 'Moderator-AI' },
  { id: 'p5', title: 'Нефтеюганск: добыча выросла', cityId: 'nefteyugansk', stage: 'Schedule', agent: 'Writer-72' },
  { id: 'p6', title: 'Пыть-Ях: турнир по хоккею', cityId: 'pyt-yah', stage: 'Publish', agent: 'NY-City-Agent' },
  { id: 'p7', title: 'Происшествия за сутки', cityId: 'tyumen', stage: 'Source', agent: 'Trend-Hunter' },
];

export type NewsroomColumn = 'draft' | 'ai' | 'review' | 'scheduled' | 'published' | 'rejected';
export const NEWSROOM_LABELS: Record<NewsroomColumn, string> = {
  draft: 'Draft', ai: 'AI Processing', review: 'Review', scheduled: 'Scheduled', published: 'Published', rejected: 'Rejected',
};
export interface NewsroomCard { id: string; title: string; cityId: string; author: string; column: NewsroomColumn; updated: string; }
export const MOCK_NEWSROOM: NewsroomCard[] = [
  { id: 'n1', title: 'Ремонт моста через Туру', cityId: 'tyumen', author: 'И. Петров', column: 'draft', updated: '10 мин' },
  { id: 'n2', title: 'Новый закон о такси', cityId: 'tyumen', author: 'AI', column: 'ai', updated: '2 мин' },
  { id: 'n3', title: 'Курган: рост безработицы', cityId: 'kurgan', author: 'AI', column: 'ai', updated: '5 мин' },
  { id: 'n4', title: 'Брянск: фестиваль уличной еды', cityId: 'bryansk', author: 'М. Иванова', column: 'review', updated: '1 ч' },
  { id: 'n5', title: 'Тюмень: открытие сезона', cityId: 'tyumen', author: 'Редакция', column: 'scheduled', updated: 'завтра 09:00' },
  { id: 'n6', title: 'Нефтеюганск: цены ЖКХ', cityId: 'nefteyugansk', author: 'AI', column: 'scheduled', updated: 'завтра 12:30' },
  { id: 'n7', title: 'Пыть-Ях: новая школа', cityId: 'pyt-yah', author: 'AI', column: 'published', updated: '3 ч назад' },
  { id: 'n8', title: 'Курган: ярмарка', cityId: 'kurgan', author: 'AI', column: 'published', updated: '5 ч назад' },
  { id: 'n9', title: 'Тюмень: фейковая новость', cityId: 'tyumen', author: 'AI', column: 'rejected', updated: 'вчера' },
  { id: 'n10', title: 'Реклама замаскирована под новость', cityId: 'bryansk', author: 'user_3812', column: 'rejected', updated: '2 дня' },
  { id: 'n11', title: 'Происшествия за ночь', cityId: 'tyumen', author: 'AI', column: 'review', updated: '30 мин' },
  { id: 'n12', title: 'Городская дума: бюджет', cityId: 'tyumen', author: 'А. Кузнецов', column: 'draft', updated: '1 ч' },
];

export type SourceType = 'rss' | 'manual' | 'ai' | 'partner' | 'newsroom';
export interface ContentSource { id: string; name: string; type: SourceType; cityId: string; category: string; status: 'active' | 'paused'; lastFetch: string; itemsToday: number; }
export const MOCK_SOURCES: ContentSource[] = [
  { id: 's1', name: '72.ru RSS', type: 'rss', cityId: 'tyumen', category: 'Город', status: 'active', lastFetch: '1 мин', itemsToday: 42 },
  { id: 's2', name: 'kurgan.ru RSS', type: 'rss', cityId: 'kurgan', category: 'Все', status: 'active', lastFetch: '3 мин', itemsToday: 18 },
  { id: 's3', name: 'bryansk.news', type: 'rss', cityId: 'bryansk', category: 'Все', status: 'active', lastFetch: '2 мин', itemsToday: 22 },
  { id: 's4', name: 'AI Writer-72', type: 'ai', cityId: 'tyumen', category: 'Все', status: 'active', lastFetch: 'realtime', itemsToday: 67 },
  { id: 's5', name: 'Партнёр: ТАСС', type: 'partner', cityId: 'all', category: 'Россия', status: 'active', lastFetch: '8 мин', itemsToday: 110 },
  { id: 's6', name: 'Редакция Тюмень', type: 'newsroom', cityId: 'tyumen', category: 'Все', status: 'active', lastFetch: 'realtime', itemsToday: 14 },
  { id: 's7', name: 'Ручной ввод', type: 'manual', cityId: 'all', category: 'Все', status: 'active', lastFetch: '—', itemsToday: 5 },
  { id: 's8', name: 'ugra-news.ru RSS', type: 'rss', cityId: 'nefteyugansk', category: 'Все', status: 'paused', lastFetch: '6 ч', itemsToday: 0 },
];

export interface MediaItem { id: string; name: string; type: 'image' | 'video' | 'doc'; size: string; tags: string[]; aiDesc: string; cityId: string; duplicate?: boolean; }
export const MOCK_MEDIA: MediaItem[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `m${i + 1}`,
  name: `IMG_${(2400 + i).toString().padStart(4, '0')}.jpg`,
  type: i % 6 === 5 ? 'video' : i % 6 === 4 ? 'doc' : 'image',
  size: `${(0.4 + (i % 5) * 0.7).toFixed(1)} МБ`,
  tags: [['город', 'мост', 'река'], ['авария', 'улица'], ['спорт', 'хоккей'], ['власть', 'дума'], ['бизнес', 'ТЦ']][i % 5],
  aiDesc: ['Городская панорама с мостом', 'Последствия ДТП', 'Хоккейный матч юниоров', 'Заседание думы', 'Открытие торгового центра'][i % 5],
  cityId: ['tyumen', 'kurgan', 'bryansk', 'nefteyugansk', 'pyt-yah'][i % 5],
  duplicate: i === 3 || i === 11,
}));

export interface ScheduleItem { id: string; title: string; cityId: string; mode: 'immediate' | 'scheduled' | 'recurring'; runAt: string; }
export const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: 'sc1', title: 'Утренний дайджест', cityId: 'tyumen', mode: 'recurring', runAt: 'ежедневно 08:00' },
  { id: 'sc2', title: 'Курган: открытие сезона', cityId: 'kurgan', mode: 'scheduled', runAt: '09.06 09:00' },
  { id: 'sc3', title: 'Брянск: афиша на выходные', cityId: 'bryansk', mode: 'scheduled', runAt: '10.06 18:00' },
  { id: 'sc4', title: 'Срочно: пожар на складе', cityId: 'tyumen', mode: 'immediate', runAt: 'сейчас' },
  { id: 'sc5', title: 'Еженедельная аналитика', cityId: 'all', mode: 'recurring', runAt: 'пн 10:00' },
  { id: 'sc6', title: 'Нефтеюганск: цены ЖКХ', cityId: 'nefteyugansk', mode: 'scheduled', runAt: '08.06 12:30' },
];

export type SystemRole = 'super_admin' | 'holding_admin' | 'city_editor' | 'journalist' | 'moderator' | 'seo_manager';
export const SYSTEM_ROLE_LABELS: Record<SystemRole, string> = {
  super_admin: 'Super Admin',
  holding_admin: 'Holding Admin',
  city_editor: 'City Editor',
  journalist: 'Journalist',
  moderator: 'Moderator',
  seo_manager: 'SEO Manager',
};
export interface SystemUser { id: string; name: string; email: string; role: SystemRole; cityId: string | 'all'; lastSeen: string; status: 'active' | 'invited' | 'disabled'; }
export const MOCK_USERS: SystemUser[] = [
  { id: 'u1', name: 'Алексей Соколов', email: 'asokolov@holding.media', role: 'super_admin', cityId: 'all', lastSeen: 'онлайн', status: 'active' },
  { id: 'u2', name: 'Мария Иванова', email: 'm.ivanova@holding.media', role: 'holding_admin', cityId: 'all', lastSeen: '5 мин', status: 'active' },
  { id: 'u3', name: 'Игорь Петров', email: 'i.petrov@tyumen.info', role: 'city_editor', cityId: 'tyumen', lastSeen: '1 ч', status: 'active' },
  { id: 'u4', name: 'Анна Кузнецова', email: 'a.kuznetsova@kurgan.info', role: 'city_editor', cityId: 'kurgan', lastSeen: 'вчера', status: 'active' },
  { id: 'u5', name: 'Сергей Орлов', email: 's.orlov@bryansk.online', role: 'journalist', cityId: 'bryansk', lastSeen: '3 ч', status: 'active' },
  { id: 'u6', name: 'Елена Морозова', email: 'e.morozova@holding.media', role: 'moderator', cityId: 'all', lastSeen: '12 мин', status: 'active' },
  { id: 'u7', name: 'Дмитрий Волков', email: 'd.volkov@holding.media', role: 'seo_manager', cityId: 'all', lastSeen: '40 мин', status: 'active' },
  { id: 'u8', name: 'Ольга Тимофеева', email: 'o.timofeeva@pyt-yah.info', role: 'journalist', cityId: 'pyt-yah', lastSeen: '—', status: 'invited' },
];

export interface ModerationQueueItem { id: string; type: 'spam' | 'duplicate' | 'low_quality' | 'suspicious'; title: string; cityId: string; score: number; createdAt: string; }
export const MOCK_MOD_QUEUE: ModerationQueueItem[] = [
  { id: 'mq1', type: 'spam', title: 'Покупайте часы со скидкой 90%!!!', cityId: 'tyumen', score: 98, createdAt: '5 мин' },
  { id: 'mq2', type: 'duplicate', title: 'Авария на Профсоюзной (повтор)', cityId: 'tyumen', score: 94, createdAt: '12 мин' },
  { id: 'mq3', type: 'low_quality', title: 'короткий текст без смысла', cityId: 'kurgan', score: 71, createdAt: '20 мин' },
  { id: 'mq4', type: 'suspicious', title: 'Фейк: метеорит упал в центре', cityId: 'bryansk', score: 88, createdAt: '40 мин' },
  { id: 'mq5', type: 'spam', title: 'Реклама казино', cityId: 'tyumen', score: 99, createdAt: '1 ч' },
  { id: 'mq6', type: 'duplicate', title: 'Цены на бензин (повтор)', cityId: 'kurgan', score: 81, createdAt: '2 ч' },
  { id: 'mq7', type: 'low_quality', title: 'Авто-генерация без фактов', cityId: 'nefteyugansk', score: 64, createdAt: '3 ч' },
];

// Analytics chart helpers
export const TRAFFIC_BY_DAY = Array.from({ length: 14 }).map((_, i) => ({
  day: `${i + 1}`,
  views: 40000 + Math.round(Math.sin(i / 2) * 8000 + i * 1500 + Math.random() * 3000),
  publications: 60 + Math.round(Math.cos(i / 3) * 12 + Math.random() * 8),
}));

export const CITY_PERFORMANCE = [
  { city: 'Тюмень', views: 412000, articles: 1820, growth: 12 },
  { city: 'Курган', views: 184000, articles: 920, growth: 8 },
  { city: 'Брянск', views: 156000, articles: 740, growth: 15 },
  { city: 'Нефтеюганск', views: 62000, articles: 280, growth: 4 },
  { city: 'Пыть-Ях', views: 31000, articles: 140, growth: 6 },
];

export const TRAFFIC_SOURCES = [
  { name: 'Поиск', value: 58 },
  { name: 'Соцсети', value: 22 },
  { name: 'Прямые', value: 14 },
  { name: 'Партнёры', value: 6 },
];
