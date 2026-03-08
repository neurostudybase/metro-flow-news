// Media holding data

export type HoldingRole = 'chief_editor' | 'city_editor' | 'ai_editor' | 'moderator' | 'author';

export const HOLDING_ROLES: { id: HoldingRole; label: string; description: string }[] = [
  { id: 'chief_editor', label: 'Главный редактор холдинга', description: 'Видит все города, полный доступ' },
  { id: 'city_editor', label: 'Редактор города', description: 'Видит только свой город' },
  { id: 'ai_editor', label: 'AI редактор', description: 'Автоматическая генерация контента' },
  { id: 'moderator', label: 'Модератор', description: 'Проверка контента' },
  { id: 'author', label: 'Автор', description: 'Создание материалов' },
];

export type HoldingNewsStatus = 'found' | 'rewritten' | 'review' | 'ready' | 'published' | 'rejected';

export interface HoldingNewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  cityIds: string[]; // multi-city support
  source: string;
  sourceUrl: string;
  status: HoldingNewsStatus;
  author: string;
  role: HoldingRole;
  createdAt: string;
  publishedAt?: string;
  publishAt?: string;
}

export interface ModerationItem {
  id: string;
  type: 'news' | 'ad' | 'company' | 'review';
  title: string;
  cityId: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const MOCK_HOLDING_NEWS: HoldingNewsItem[] = [
  { id: 'hn1', title: 'Новый мост через Туру открыт для движения', description: 'Мост соединил два берега города', content: 'Полный текст статьи о новом мосте...', image: '', category: 'Город', cityIds: ['tyumen'], source: '72.ru', sourceUrl: 'https://72.ru', status: 'published', author: 'AI Редакция', role: 'ai_editor', createdAt: '2025-06-01', publishedAt: '2025-06-01' },
  { id: 'hn2', title: 'В Кургане открылся новый ТЦ', description: 'Торговый центр в центре города', content: 'Полный текст...', image: '', category: 'Бизнес', cityIds: ['kurgan'], source: 'kurgan.ru', sourceUrl: 'https://kurgan.ru', status: 'review', author: 'AI Редакция', role: 'ai_editor', createdAt: '2025-06-02' },
  { id: 'hn3', title: 'Брянск готовится к Дню города', description: 'Праздник пройдёт в центре', content: 'Полный текст...', image: '', category: 'Культура', cityIds: ['bryansk'], source: 'bryansk.news', sourceUrl: 'https://bryansk.news', status: 'ready', author: 'AI Редакция', role: 'ai_editor', createdAt: '2025-06-03' },
  { id: 'hn4', title: 'Рост цен на жильё в регионах', description: 'Аналитика рынка недвижимости', content: 'Подробный анализ...', image: '', category: 'Бизнес', cityIds: ['tyumen', 'kurgan', 'bryansk'], source: 'rbc.ru', sourceUrl: 'https://rbc.ru', status: 'rewritten', author: 'AI Редакция', role: 'ai_editor', createdAt: '2025-06-04' },
  { id: 'hn5', title: 'Нефтеюганск: итоги нефтяного сезона', description: 'Добыча выросла на 5%', content: 'Статья о нефтедобыче...', image: '', category: 'Бизнес', cityIds: ['nefteyugansk'], source: 'ugra-news.ru', sourceUrl: 'https://ugra-news.ru', status: 'found', author: 'AI Редакция', role: 'ai_editor', createdAt: '2025-06-05' },
  { id: 'hn6', title: 'Спортивные соревнования в Пыть-Яхе', description: 'Турнир по хоккею среди юниоров', content: 'Текст...', image: '', category: 'Спорт', cityIds: ['pyt-yah'], source: 'ugra-news.ru', sourceUrl: 'https://ugra-news.ru', status: 'review', author: 'AI Редакция', role: 'ai_editor', createdAt: '2025-06-05' },
];

export const MOCK_MODERATION: ModerationItem[] = [
  { id: 'mod1', type: 'news', title: 'Подозрительная новость о выигрыше', cityId: 'tyumen', author: 'user1', status: 'pending', createdAt: '2025-06-05' },
  { id: 'mod2', type: 'ad', title: 'Объявление с запрещённым контентом', cityId: 'kurgan', author: 'user2', status: 'pending', createdAt: '2025-06-04' },
  { id: 'mod3', type: 'review', title: 'Оскорбительный отзыв', cityId: 'bryansk', author: 'user3', status: 'pending', createdAt: '2025-06-03' },
  { id: 'mod4', type: 'company', title: 'Фейковая компания', cityId: 'tyumen', author: 'user4', status: 'rejected', createdAt: '2025-06-02' },
];

export const STATUS_LABELS: Record<HoldingNewsStatus, string> = {
  found: 'Найдена',
  rewritten: 'Переписана',
  review: 'На проверке',
  ready: 'Готова',
  published: 'Опубликована',
  rejected: 'Отклонена',
};

export const STATUS_COLORS: Record<HoldingNewsStatus, string> = {
  found: 'bg-blue-100 text-blue-700',
  rewritten: 'bg-amber-100 text-amber-700',
  review: 'bg-purple-100 text-purple-700',
  ready: 'bg-green-100 text-green-700',
  published: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};
