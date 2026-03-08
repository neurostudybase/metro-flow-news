// Editorial system data — enhanced

export type EditorialRole = 'chief_editor' | 'editor' | 'moderator' | 'author' | 'ai_editor';
export type EditorialStatus = 'draft' | 'review' | 'ready' | 'scheduled' | 'published' | 'rejected' | 'archived';

export const EDITORIAL_ROLE_LABELS: Record<EditorialRole, string> = {
  chief_editor: 'Главный редактор',
  editor: 'Редактор',
  moderator: 'Модератор',
  author: 'Автор',
  ai_editor: 'AI Редактор',
};

export const EDITORIAL_STATUS_LABELS: Record<EditorialStatus, string> = {
  draft: 'Черновик',
  review: 'На проверке',
  ready: 'Готов к публикации',
  scheduled: 'Запланировано',
  published: 'Опубликовано',
  rejected: 'Отклонено',
  archived: 'Архив',
};

export const EDITORIAL_STATUS_COLORS: Record<EditorialStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  review: 'bg-amber-100 text-amber-700',
  ready: 'bg-blue-100 text-blue-700',
  scheduled: 'bg-purple-100 text-purple-700',
  published: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  archived: 'bg-muted text-muted-foreground',
};

export const REJECT_REASONS = [
  'Дубль',
  'Слабый источник',
  'Нерелевантно',
  'Реклама',
  'Недостоверно',
  'Другое',
];

export interface Author {
  id: string;
  name: string;
  role: EditorialRole;
  avatar?: string;
  bio?: string;
  isAI: boolean;
}

export interface EditorialMember {
  id: string;
  name: string;
  role: EditorialRole;
  avatar?: string;
  isAI: boolean;
}

export interface NewsVersion {
  id: string;
  articleId: string;
  title: string;
  content: string;
  changedBy: string;
  changedAt: string;
  changeNote?: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  slug: string;
  description: string; // lead / excerpt
  content: string;
  subtitles: string[];
  quote: string;
  image: string;
  imageCredit: string;
  imageSource: string;
  gallery: string[];
  source: string;
  sourceUrl: string;
  category: string;
  tags: string[];
  cityId: string;
  status: EditorialStatus;
  authorId: string;
  editorId?: string;
  createdAt: string;
  updatedAt: string;
  publishAt?: string;
  publishedAt?: string;
  seoTitle: string;
  seoDescription: string;
  qualityScore?: number;
  qualityNotes?: string[];
  editorNotes: string;
  rejectReason?: string;
  isFeatured: boolean;
  isTop: boolean;
  isUrgent: boolean;
  versions: NewsVersion[];
}

export interface EditorialTopic {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  articlesCount: number;
  isActive: boolean;
}

export interface EditorialTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'pending' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueAt?: string;
}

export interface EditorialLogEntry {
  id: string;
  articleId?: string;
  articleTitle?: string;
  action: string;
  performedBy: string;
  role: EditorialRole;
  timestamp: string;
  details?: string;
}

export const AUTHORS: Author[] = [
  { id: 'au-1', name: 'Иванов А.С.', role: 'chief_editor', bio: 'Главный редактор медиахолдинга', isAI: false },
  { id: 'au-2', name: 'Петрова М.В.', role: 'editor', bio: 'Редактор городского портала', isAI: false },
  { id: 'au-3', name: 'Сидоров К.Н.', role: 'moderator', bio: 'Модератор контента', isAI: false },
  { id: 'au-4', name: 'Козлова Е.А.', role: 'author', bio: 'Автор и корреспондент', isAI: false },
  { id: 'au-5', name: 'AI Редакция', role: 'ai_editor', bio: 'Автоматическая генерация контента', isAI: true },
  { id: 'au-6', name: 'Редактор портала', role: 'editor', bio: 'Штатный редактор', isAI: false },
];

export const EDITORIAL_TEAM: EditorialMember[] = AUTHORS.map(a => ({
  id: a.id,
  name: a.name,
  role: a.role,
  avatar: a.avatar,
  isAI: a.isAI,
}));

const makeSlug = (title: string) =>
  title.toLowerCase().replace(/[^а-яa-z0-9\s]/gi, '').replace(/\s+/g, '-').slice(0, 80);

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'ea-1',
    title: 'В Тюмени открылся новый ледовый дворец на 5000 зрителей',
    slug: makeSlug('В Тюмени открылся новый ледовый дворец на 5000 зрителей'),
    description: 'Современный спортивный объект стал крупнейшим в регионе',
    content: 'В Тюмени состоялось торжественное открытие нового ледового дворца вместимостью 5000 зрителей. Объект стал крупнейшим спортивным сооружением в Тюменской области. Строительство велось два года и обошлось в 3,5 миллиарда рублей.',
    subtitles: ['Крупнейший спортивный объект', 'История строительства'],
    quote: '',
    image: '/placeholder.svg',
    imageCredit: '',
    imageSource: '',
    gallery: [],
    source: 'AI генерация',
    sourceUrl: '',
    category: 'Город',
    tags: ['спорт', 'тюмень'],
    cityId: 'tyumen',
    status: 'review',
    authorId: 'au-5',
    editorId: 'au-2',
    createdAt: '2026-03-08T10:00:00',
    updatedAt: '2026-03-08T11:00:00',
    seoTitle: 'Новый ледовый дворец в Тюмени',
    seoDescription: 'В Тюмени открылся ледовый дворец на 5000 мест.',
    qualityScore: 85,
    qualityNotes: ['✓ Уникальный текст', '✓ Актуальная тема'],
    editorNotes: '',
    isFeatured: false,
    isTop: false,
    isUrgent: false,
    versions: [],
  },
  {
    id: 'ea-2',
    title: 'Бизнес-форум «Тюмень 2026» соберёт более 2000 участников',
    slug: makeSlug('Бизнес-форум Тюмень 2026'),
    description: 'Форум пройдёт в апреле',
    content: 'В апреле в Тюмени пройдёт крупный бизнес-форум с участием более 2000 предпринимателей.',
    subtitles: [],
    quote: '',
    image: '',
    imageCredit: '',
    imageSource: '',
    gallery: [],
    source: 'RSS: ТюменьПро',
    sourceUrl: 'https://tyumenpro.ru/forum',
    category: 'Бизнес',
    tags: ['бизнес', 'форум'],
    cityId: 'tyumen',
    status: 'draft',
    authorId: 'au-5',
    createdAt: '2026-03-08T09:30:00',
    updatedAt: '2026-03-08T09:30:00',
    seoTitle: '',
    seoDescription: '',
    qualityScore: 72,
    qualityNotes: ['⚠ Нет SEO', '⚠ Нет изображения'],
    editorNotes: '',
    isFeatured: false,
    isTop: false,
    isUrgent: false,
    versions: [],
  },
  {
    id: 'ea-3',
    title: 'ДТП на объездной: столкнулись 3 машины',
    slug: makeSlug('ДТП на объездной столкнулись 3 машины'),
    description: 'Пострадавших нет',
    content: 'На объездной дороге Тюмени произошло столкновение трёх автомобилей. По предварительным данным, пострадавших нет.',
    subtitles: [],
    quote: '',
    image: '/placeholder.svg',
    imageCredit: 'ГИБДД',
    imageSource: '72.ru',
    gallery: [],
    source: '72.ru',
    sourceUrl: 'https://72.ru/incidents',
    category: 'Происшествия',
    tags: ['дтп'],
    cityId: 'tyumen',
    status: 'scheduled',
    authorId: 'au-5',
    editorId: 'au-1',
    createdAt: '2026-03-08T09:00:00',
    updatedAt: '2026-03-08T10:30:00',
    publishAt: '2026-03-08T14:00:00',
    seoTitle: 'ДТП на объездной Тюмени',
    seoDescription: 'На объездной дороге Тюмени столкнулись 3 машины.',
    qualityScore: 90,
    editorNotes: 'Ждём подтверждение от ГИБДД',
    isFeatured: false,
    isTop: false,
    isUrgent: true,
    versions: [],
  },
  {
    id: 'ea-4',
    title: 'Тюменский «Рубин» выиграл кубок области',
    slug: makeSlug('Тюменский Рубин выиграл кубок области'),
    description: 'Хоккейная команда стала чемпионом',
    content: 'Тюменский хоккейный клуб «Рубин» одержал победу в финале кубка области.',
    subtitles: [],
    quote: '',
    image: '/placeholder.svg',
    imageCredit: '',
    imageSource: '',
    gallery: [],
    source: 'Спорт72',
    sourceUrl: 'https://sport72.ru/hockey',
    category: 'Спорт',
    tags: ['спорт', 'хоккей'],
    cityId: 'tyumen',
    status: 'published',
    authorId: 'au-4',
    editorId: 'au-2',
    createdAt: '2026-03-07T18:00:00',
    updatedAt: '2026-03-07T19:00:00',
    publishedAt: '2026-03-07T19:00:00',
    seoTitle: 'Рубин — чемпион области',
    seoDescription: 'Тюменский Рубин выиграл кубок области.',
    qualityScore: 95,
    editorNotes: '',
    isFeatured: true,
    isTop: true,
    isUrgent: false,
    versions: [],
  },
  {
    id: 'ea-5',
    title: 'Выставка современного искусства в музее',
    slug: makeSlug('Выставка современного искусства в музее'),
    description: 'Новая экспозиция',
    content: 'В Тюменском краеведческом музее открылась выставка современного искусства.',
    subtitles: [],
    quote: '',
    image: '',
    imageCredit: '',
    imageSource: '',
    gallery: [],
    source: 'Культура72',
    sourceUrl: '',
    category: 'Культура',
    tags: ['культура'],
    cityId: 'tyumen',
    status: 'draft',
    authorId: 'au-5',
    createdAt: '2026-03-07T15:00:00',
    updatedAt: '2026-03-07T15:00:00',
    seoTitle: '',
    seoDescription: '',
    editorNotes: '',
    isFeatured: false,
    isTop: false,
    isUrgent: false,
    versions: [],
  },
  {
    id: 'ea-6',
    title: 'Новые тарифы ЖКХ с 1 апреля',
    slug: makeSlug('Новые тарифы ЖКХ с 1 апреля'),
    description: 'Рост 4-9%',
    content: 'С 1 апреля в Тюменской области изменятся тарифы на ЖКУ.',
    subtitles: [],
    quote: '',
    image: '/placeholder.svg',
    imageCredit: '',
    imageSource: '',
    gallery: [],
    source: 'AI генерация',
    sourceUrl: '',
    category: 'Общество',
    tags: ['жкх'],
    cityId: 'tyumen',
    status: 'review',
    authorId: 'au-5',
    editorId: 'au-1',
    createdAt: '2026-03-07T12:00:00',
    updatedAt: '2026-03-08T08:00:00',
    seoTitle: 'Новые тарифы ЖКХ Тюмень',
    seoDescription: 'Тарифы ЖКХ изменятся с 1 апреля.',
    qualityScore: 80,
    editorNotes: 'Проверить цифры',
    isFeatured: false,
    isTop: false,
    isUrgent: false,
    versions: [],
  },
  {
    id: 'ea-7',
    title: 'Рекламный текст компании',
    slug: makeSlug('Рекламный текст компании'),
    description: '',
    content: 'Лучший магазин в городе! Скидки!',
    subtitles: [],
    quote: '',
    image: '',
    imageCredit: '',
    imageSource: '',
    gallery: [],
    source: 'AI сбор',
    sourceUrl: '',
    category: 'Новости',
    tags: [],
    cityId: 'tyumen',
    status: 'rejected',
    authorId: 'au-5',
    createdAt: '2026-03-06T10:00:00',
    updatedAt: '2026-03-06T11:00:00',
    seoTitle: '',
    seoDescription: '',
    qualityScore: 15,
    qualityNotes: ['❌ Рекламный материал', '❌ Не новость'],
    editorNotes: '',
    rejectReason: 'Реклама',
    isFeatured: false,
    isTop: false,
    isUrgent: false,
    versions: [],
  },
  {
    id: 'ea-8',
    title: 'В Кургане обновили парк Победы',
    slug: makeSlug('В Кургане обновили парк Победы'),
    description: 'Реконструкция завершена',
    content: 'В Кургане завершилась реконструкция парка Победы. Установлены новые аттракционы и зоны отдыха.',
    subtitles: [],
    quote: '',
    image: '/placeholder.svg',
    imageCredit: '',
    imageSource: '',
    gallery: [],
    source: 'AI генерация',
    sourceUrl: '',
    category: 'Город',
    tags: ['парк', 'курган'],
    cityId: 'kurgan',
    status: 'published',
    authorId: 'au-5',
    editorId: 'au-2',
    createdAt: '2026-03-07T10:00:00',
    updatedAt: '2026-03-07T12:00:00',
    publishedAt: '2026-03-07T12:00:00',
    seoTitle: 'Парк Победы Курган обновлён',
    seoDescription: 'Реконструкция парка Победы в Кургане завершена.',
    qualityScore: 88,
    editorNotes: '',
    isFeatured: false,
    isTop: false,
    isUrgent: false,
    versions: [],
  },
];

export const EDITORIAL_TOPICS: EditorialTopic[] = [
  { id: 'et-1', name: 'Происшествия Тюмени', description: 'ДТП, пожары, ЧП', category: 'Происшествия', priority: 'high', articlesCount: 12, isActive: true },
  { id: 'et-2', name: 'Городское хозяйство', description: 'Дороги, ЖКХ, благоустройство', category: 'Город', priority: 'high', articlesCount: 8, isActive: true },
  { id: 'et-3', name: 'Бизнес и экономика', description: 'Предприятия, инвестиции', category: 'Бизнес', priority: 'medium', articlesCount: 6, isActive: true },
  { id: 'et-4', name: 'Спортивная жизнь', description: 'Соревнования и клубы', category: 'Спорт', priority: 'medium', articlesCount: 5, isActive: true },
  { id: 'et-5', name: 'Культурные события', description: 'Выставки, концерты, фестивали', category: 'Культура', priority: 'low', articlesCount: 4, isActive: true },
  { id: 'et-6', name: 'Общество и социум', description: 'Тарифы, соцпрограммы', category: 'Общество', priority: 'medium', articlesCount: 7, isActive: true },
];

export const EDITORIAL_TASKS: EditorialTask[] = [
  { id: 'etk-1', title: 'Создать 5 новостей по происшествиям', description: 'AI должен найти и написать 5 новостей по теме ДТП и ЧП', assignee: 'AI Редакция', status: 'in_progress', priority: 'high', createdAt: '2026-03-08T08:00:00', dueAt: '2026-03-08T18:00:00' },
  { id: 'etk-2', title: 'Переписать новость о бизнес-форуме', description: 'Сделать уникальную версию статьи', assignee: 'AI Редакция', status: 'pending', priority: 'medium', createdAt: '2026-03-08T09:00:00' },
  { id: 'etk-3', title: 'Обновить статью о тарифах ЖКХ', description: 'Добавить актуальные данные', assignee: 'Петрова М.В.', status: 'pending', priority: 'medium', createdAt: '2026-03-08T10:00:00' },
  { id: 'etk-4', title: 'Найти инфоповоды на неделю', description: 'Подготовить список тем для публикаций', assignee: 'AI Редакция', status: 'done', priority: 'high', createdAt: '2026-03-07T08:00:00' },
  { id: 'etk-5', title: 'Проверить качество AI-статей', description: 'Ревью 10 последних AI-генераций', assignee: 'Иванов А.С.', status: 'pending', priority: 'low', createdAt: '2026-03-08T07:00:00' },
];

export const EDITORIAL_LOG: EditorialLogEntry[] = [
  { id: 'el-1', articleId: 'ea-1', articleTitle: 'Новый ледовый дворец', action: 'Создано AI', performedBy: 'AI Редакция', role: 'ai_editor', timestamp: '2026-03-08T10:00:00' },
  { id: 'el-2', articleId: 'ea-1', articleTitle: 'Новый ледовый дворец', action: 'Отправлено на проверку', performedBy: 'AI Редакция', role: 'ai_editor', timestamp: '2026-03-08T10:05:00' },
  { id: 'el-3', articleId: 'ea-1', articleTitle: 'Новый ледовый дворец', action: 'Принято в работу', performedBy: 'Петрова М.В.', role: 'editor', timestamp: '2026-03-08T11:00:00' },
  { id: 'el-4', articleId: 'ea-4', articleTitle: 'Рубин — чемпион', action: 'Опубликовано', performedBy: 'Петрова М.В.', role: 'editor', timestamp: '2026-03-07T19:00:00', details: 'Одобрено главным редактором' },
  { id: 'el-5', articleId: 'ea-3', articleTitle: 'ДТП на объездной', action: 'Запланирована публикация', performedBy: 'Иванов А.С.', role: 'chief_editor', timestamp: '2026-03-08T10:30:00', details: 'Публикация в 14:00' },
  { id: 'el-6', articleId: 'ea-7', articleTitle: 'Рекламный текст', action: 'Отклонено', performedBy: 'AI Редакция', role: 'ai_editor', timestamp: '2026-03-06T11:00:00', details: 'Рекламный материал' },
  { id: 'el-7', articleId: 'ea-6', articleTitle: 'Тарифы ЖКХ', action: 'Редактирование', performedBy: 'Иванов А.С.', role: 'chief_editor', timestamp: '2026-03-08T08:00:00' },
  { id: 'el-8', articleId: 'ea-8', articleTitle: 'Парк Победы Курган', action: 'Опубликовано', performedBy: 'Петрова М.В.', role: 'editor', timestamp: '2026-03-07T12:00:00' },
];

// Quality check helpers
export const validateArticleForPublish = (article: EditorialArticle): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!article.title.trim()) errors.push('Заголовок обязателен');
  if (!article.slug.trim()) errors.push('Slug обязателен');
  if (!article.category.trim()) errors.push('Категория обязательна');
  if (!article.content.trim()) errors.push('Текст обязателен');
  if (!article.image) errors.push('Изображение рекомендуется');
  if (!article.description.trim()) errors.push('Лид (описание) рекомендуется');
  return { valid: errors.filter(e => !e.includes('рекомендуется')).length === 0, errors };
};

export const checkAIQuality = (article: EditorialArticle): { score: number; notes: string[] } => {
  const notes: string[] = [];
  let score = 100;
  if (article.content.length < 200) { score -= 20; notes.push('⚠ Текст слишком короткий (< 200 символов)'); }
  if (!article.description) { score -= 10; notes.push('⚠ Нет лида'); }
  if (!article.seoTitle) { score -= 10; notes.push('⚠ Нет SEO title'); }
  if (!article.seoDescription) { score -= 10; notes.push('⚠ Нет SEO description'); }
  if (!article.image) { score -= 10; notes.push('⚠ Нет изображения'); }
  if (article.tags.length === 0) { score -= 5; notes.push('⚠ Нет тегов'); }
  // Check title uniqueness against other articles
  const duplicateTitle = EDITORIAL_ARTICLES.filter(a => a.id !== article.id && a.title === article.title);
  if (duplicateTitle.length > 0) { score -= 30; notes.push('❌ Дублирующий заголовок'); }
  if (notes.length === 0) notes.push('✓ Все проверки пройдены');
  return { score: Math.max(0, score), notes };
};
