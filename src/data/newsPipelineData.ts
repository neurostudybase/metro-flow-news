// News Pipeline mock data

export type NewsPipelineStatus = 'found' | 'processing' | 'draft' | 'needs_approval' | 'published' | 'rejected';

export interface NewsQueueItem {
  id: string;
  title: string;
  originalTitle: string;
  originalText: string;
  sourceUrl: string;
  sourceName: string;
  aiModule: string;
  category: string;
  city: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  status: NewsPipelineStatus;
  subtitle?: string;
  summary?: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  imageUrl?: string;
  factCheckNotes?: string;
  editedByAdmin?: boolean;
  publishedAt?: string;
  approvedBy?: string;
}

export interface NewsPrompt {
  id: string;
  name: string;
  type: 'generation' | 'headline' | 'seo' | 'classification' | 'quality';
  content: string;
  enabled: boolean;
  isDefault: boolean;
  updatedAt: string;
}

export interface NewsPublicationLog {
  id: string;
  newsId: string;
  newsTitle: string;
  action: string;
  aiModule: string;
  performedBy: string;
  timestamp: string;
  wasEdited: boolean;
  details?: string;
}

export const NEWS_CATEGORIES = ['Новости', 'Город', 'Происшествия', 'Бизнес', 'Спорт', 'Культура', 'Политика', 'Общество'];

export const MOCK_QUEUE: NewsQueueItem[] = [
  {
    id: 'nq-1', title: 'В Тюмени открылся новый ледовый дворец на 5000 зрителей', originalTitle: 'New ice arena opens in Tyumen', originalText: 'A new ice arena with 5000 seats opened in Tyumen today...', sourceUrl: 'https://tyumenpro.ru/news/123', sourceName: 'ТюменьПро', aiModule: 'AI News Writer', category: 'Город', city: 'Тюмень', createdAt: '2026-03-08T10:00:00', priority: 'high', status: 'needs_approval',
    subtitle: 'Современный спортивный объект стал крупнейшим в регионе', summary: 'В Тюмени состоялось торжественное открытие нового ледового дворца вместимостью 5000 зрителей.', content: 'В Тюмени состоялось торжественное открытие нового ледового дворца. Объект стал крупнейшим спортивным сооружением в Тюменской области. Строительство велось два года и обошлось в 3,5 миллиарда рублей. Дворец оснащён современным оборудованием для хоккея, фигурного катания и шорт-трека.',
    seoTitle: 'Новый ледовый дворец в Тюмени — открытие 2026', seoDescription: 'В Тюмени открылся новый ледовый дворец на 5000 мест. Крупнейший спортивный объект региона.', tags: ['спорт', 'тюмень', 'ледовый дворец', 'строительство'],
  },
  {
    id: 'nq-2', title: 'Бизнес-форум «Тюмень 2026» соберёт более 2000 участников', originalTitle: 'Бизнес-форум Тюмень 2026', originalText: 'В апреле в Тюмени пройдёт крупный бизнес-форум...', sourceUrl: 'https://business72.ru/forum', sourceName: 'Бизнес72', aiModule: 'AI News Writer', category: 'Бизнес', city: 'Тюмень', createdAt: '2026-03-08T09:30:00', priority: 'medium', status: 'draft',
    subtitle: 'Форум пройдёт 15-17 апреля в конгресс-холле', summary: 'Ежегодный бизнес-форум соберёт предпринимателей со всей России.', content: 'Бизнес-форум «Тюмень 2026» пройдёт 15-17 апреля. Ожидается более 2000 участников из 40 регионов России.',
    seoTitle: 'Бизнес-форум Тюмень 2026 — программа и участники', seoDescription: 'Бизнес-форум Тюмень 2026 пройдёт в апреле. Более 2000 участников, 40 регионов.', tags: ['бизнес', 'форум', 'тюмень'],
  },
  {
    id: 'nq-3', title: 'ДТП на объездной дороге: столкнулись 3 автомобиля', originalTitle: 'Авария на объездной', originalText: 'На объездной дороге Тюмени произошло ДТП с участием 3 машин...', sourceUrl: 'https://72.ru/incidents/dtp', sourceName: '72.ru', aiModule: 'AI News Writer', category: 'Происшествия', city: 'Тюмень', createdAt: '2026-03-08T09:00:00', priority: 'high', status: 'needs_approval',
    content: 'На объездной дороге Тюмени произошло столкновение трёх автомобилей. По предварительным данным, пострадавших нет.',
    seoTitle: 'ДТП на объездной Тюмени — 3 автомобиля', seoDescription: 'На объездной дороге Тюмени столкнулись 3 машины. Подробности происшествия.', tags: ['дтп', 'происшествия', 'тюмень'],
    factCheckNotes: '⚠️ Данные предварительные, требуется подтверждение от ГИБДД',
  },
  {
    id: 'nq-4', title: 'Тюменский «Рубин» выиграл кубок области по хоккею', originalTitle: 'Рубин — чемпион', originalText: 'Тюменский хоккейный клуб Рубин стал чемпионом...', sourceUrl: 'https://sport72.ru/hockey', sourceName: 'Спорт72', aiModule: 'AI News Writer', category: 'Спорт', city: 'Тюмень', createdAt: '2026-03-07T18:00:00', priority: 'medium', status: 'published', publishedAt: '2026-03-07T19:00:00', approvedBy: 'Администратор',
    content: 'Тюменский хоккейный клуб «Рубин» одержал победу в финале кубка Тюменской области.',
    tags: ['спорт', 'хоккей', 'рубин'],
  },
  {
    id: 'nq-5', title: 'Выставка современного искусства открылась в краеведческом музее', originalTitle: 'Art exhibition in Tyumen', originalText: 'A contemporary art exhibition has opened...', sourceUrl: 'https://kultura72.ru/exhibits', sourceName: 'Культура72', aiModule: 'AI News Writer', category: 'Культура', city: 'Тюмень', createdAt: '2026-03-07T15:00:00', priority: 'low', status: 'draft',
    content: 'В Тюменском краеведческом музее открылась выставка современного искусства.',
    tags: ['культура', 'выставка', 'музей'],
  },
  {
    id: 'nq-6', title: 'Новые тарифы ЖКХ вступят в силу с 1 апреля', originalTitle: 'Тарифы ЖКХ', originalText: 'С 1 апреля в Тюменской области изменятся тарифы на ЖКУ...', sourceUrl: 'https://tyumen-today.ru/tariffs', sourceName: 'Тюмень Сегодня', aiModule: 'AI News Writer', category: 'Общество', city: 'Тюмень', createdAt: '2026-03-07T12:00:00', priority: 'medium', status: 'needs_approval',
    content: 'С 1 апреля в Тюменской области изменятся тарифы на жилищно-коммунальные услуги. Рост составит от 4% до 9%.',
    seoTitle: 'Новые тарифы ЖКХ в Тюмени с апреля 2026', seoDescription: 'Тарифы ЖКХ в Тюменской области изменятся с 1 апреля. Рост 4-9%.', tags: ['жкх', 'тарифы', 'тюмень'],
  },
  {
    id: 'nq-7', title: 'Губернатор анонсировал программу ремонта дорог на 2026 год', originalTitle: 'Дорожная программа 2026', originalText: 'Губернатор Тюменской области объявил...', sourceUrl: 'https://admtyumen.ru/roads2026', sourceName: 'Адм. ТО', aiModule: 'AI Source Scanner', category: 'Политика', city: 'Тюмень', createdAt: '2026-03-08T08:00:00', priority: 'high', status: 'found',
    content: '',
  },
  {
    id: 'nq-8', title: 'В Тобольске откроется новый туристический маршрут', originalTitle: 'Туризм в Тобольске', originalText: 'Новый маршрут по историческим местам Тобольска...', sourceUrl: 'https://tobolsk-info.ru/tourism', sourceName: 'Тобольск Инфо', aiModule: 'AI Source Scanner', category: 'Город', city: 'Тобольск', createdAt: '2026-03-08T07:30:00', priority: 'low', status: 'processing',
    content: '',
  },
  {
    id: 'nq-9', title: '', originalTitle: 'Пожар на складе в промзоне', originalText: 'На промышленной территории Тюмени произошёл пожар...', sourceUrl: 'https://72.ru/incidents/fire', sourceName: '72.ru', aiModule: 'AI Source Scanner', category: 'Происшествия', city: 'Тюмень', createdAt: '2026-03-08T11:00:00', priority: 'high', status: 'found',
    content: '',
  },
  {
    id: 'nq-10', title: 'Фестиваль уличной еды пройдёт в центре Тюмени', originalTitle: 'Street food fest', originalText: 'A street food festival will take place...', sourceUrl: 'https://tyumen-life.ru/events/food', sourceName: 'TyumenLife', aiModule: 'AI News Writer', category: 'Общество', city: 'Тюмень', createdAt: '2026-03-06T14:00:00', priority: 'low', status: 'rejected',
    content: 'В центре Тюмени пройдёт фестиваль уличной еды.',
  },
];

export const MOCK_PROMPTS: NewsPrompt[] = [
  { id: 'p-1', name: 'Генерация новости', type: 'generation', content: 'Напиши новостную статью для городского портала Тюмени. Стиль — информационный, нейтральный. Структура: заголовок, лид-абзац, основной текст (3-5 абзацев), заключение. Упоминай город и конкретные детали.', enabled: true, isDefault: true, updatedAt: '2026-03-01T00:00:00' },
  { id: 'p-2', name: 'Генерация заголовка', type: 'headline', content: 'Создай 5 вариантов заголовков для новости. Требования: информативность, привлекательность, длина до 80 символов, без кликбейта. Включи ключевые факты.', enabled: true, isDefault: true, updatedAt: '2026-03-01T00:00:00' },
  { id: 'p-3', name: 'SEO-оптимизация', type: 'seo', content: 'Создай SEO title (до 60 символов), meta description (до 160 символов) и набор тегов (5-8 штук) для новости. Включи географию (Тюмень) и ключевые слова.', enabled: true, isDefault: true, updatedAt: '2026-03-01T00:00:00' },
  { id: 'p-4', name: 'Классификация новости', type: 'classification', content: 'Определи: 1) Относится ли новость к Тюмени или Тюменской области. 2) Какая рубрика подходит: Город, Происшествия, Бизнес, Спорт, Культура, Политика, Общество. 3) Приоритет: высокий, средний, низкий.', enabled: true, isDefault: true, updatedAt: '2026-03-01T00:00:00' },
  { id: 'p-5', name: 'Проверка качества', type: 'quality', content: 'Проверь текст новости на: 1) фактические ошибки, 2) стилистические проблемы, 3) неполные данные, 4) необоснованные утверждения. Помечай рискованные места символом ⚠️.', enabled: true, isDefault: true, updatedAt: '2026-03-01T00:00:00' },
];

export const MOCK_PUB_LOG: NewsPublicationLog[] = [
  { id: 'pl-1', newsId: 'nq-4', newsTitle: 'Тюменский «Рубин» выиграл кубок области по хоккею', action: 'Опубликовано', aiModule: 'AI News Writer', performedBy: 'Администратор', timestamp: '2026-03-07T19:00:00', wasEdited: true, details: 'Отредактирован заголовок перед публикацией' },
  { id: 'pl-2', newsId: 'nq-4', newsTitle: 'Тюменский «Рубин» выиграл кубок области по хоккею', action: 'Черновик создан', aiModule: 'AI News Writer', performedBy: 'AI', timestamp: '2026-03-07T18:00:00', wasEdited: false },
  { id: 'pl-3', newsId: 'nq-1', newsTitle: 'В Тюмени открылся новый ледовый дворец', action: 'Черновик создан', aiModule: 'AI News Writer', performedBy: 'AI', timestamp: '2026-03-08T10:00:00', wasEdited: false },
  { id: 'pl-4', newsId: 'nq-3', newsTitle: 'ДТП на объездной дороге', action: 'Отправлено на проверку', aiModule: 'AI Fact Check', performedBy: 'AI', timestamp: '2026-03-08T09:15:00', wasEdited: false, details: 'Помечено: данные предварительные' },
  { id: 'pl-5', newsId: 'nq-10', newsTitle: 'Фестиваль уличной еды', action: 'Отклонено', aiModule: 'AI City Classifier', performedBy: 'Администратор', timestamp: '2026-03-06T15:00:00', wasEdited: false, details: 'Недостаточно деталей' },
];

export const NEWS_PIPELINE_SETTINGS_DEFAULT = {
  pipelineEnabled: true,
  maxNewsPerDay: 20,
  priorityCategories: ['Город', 'Происшествия', 'Бизнес'] as string[],
  geoFilter: 'tyumen_and_region' as 'tyumen_only' | 'tyumen_and_region',
  alwaysRequireApproval: true,
  articleLength: 'medium' as 'short' | 'medium' | 'long',
  headlineStyle: 'informative' as 'informative' | 'engaging' | 'neutral',
  headlineVariants: 3,
  autoGenerateSeo: true,
  autoGenerateTags: true,
  noAutoPublish: true,
  notifyOnDraft: true,
  logAllActions: true,
};
