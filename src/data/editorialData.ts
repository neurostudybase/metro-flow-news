// Editorial system data

export type EditorialRole = 'chief_editor' | 'editor' | 'moderator' | 'author' | 'ai_editor';
export type EditorialStatus = 'draft' | 'ai_generated' | 'editor_review' | 'ready_to_publish' | 'published' | 'rejected';

export const EDITORIAL_ROLE_LABELS: Record<EditorialRole, string> = {
  chief_editor: 'Главный редактор',
  editor: 'Редактор',
  moderator: 'Модератор',
  author: 'Автор',
  ai_editor: 'AI Редактор',
};

export const EDITORIAL_STATUS_LABELS: Record<EditorialStatus, string> = {
  draft: 'Черновик',
  ai_generated: 'AI генерация',
  editor_review: 'На проверке',
  ready_to_publish: 'Готов к публикации',
  published: 'Опубликовано',
  rejected: 'Отклонено',
};

export const EDITORIAL_STATUS_COLORS: Record<EditorialStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  ai_generated: 'bg-purple-100 text-purple-700',
  editor_review: 'bg-amber-100 text-amber-700',
  ready_to_publish: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export interface EditorialMember {
  id: string;
  name: string;
  role: EditorialRole;
  avatar?: string;
  isAI: boolean;
}

export interface EditorialArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  source: string;
  sourceUrl: string;
  category: string;
  tags: string[];
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

export const EDITORIAL_TEAM: EditorialMember[] = [
  { id: 'em-1', name: 'Иванов А.С.', role: 'chief_editor', isAI: false },
  { id: 'em-2', name: 'Петрова М.В.', role: 'editor', isAI: false },
  { id: 'em-3', name: 'Сидоров К.Н.', role: 'moderator', isAI: false },
  { id: 'em-4', name: 'Козлова Е.А.', role: 'author', isAI: false },
  { id: 'em-5', name: 'AI Редакция', role: 'ai_editor', isAI: true },
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'ea-1', title: 'В Тюмени открылся новый ледовый дворец на 5000 зрителей', description: 'Современный спортивный объект стал крупнейшим в регионе', content: 'В Тюмени состоялось торжественное открытие нового ледового дворца вместимостью 5000 зрителей. Объект стал крупнейшим спортивным сооружением в Тюменской области.', image: '/placeholder.svg', source: 'AI генерация', sourceUrl: '', category: 'Город', tags: ['спорт', 'тюмень'], status: 'editor_review', authorId: 'em-5', editorId: 'em-2', createdAt: '2026-03-08T10:00:00', updatedAt: '2026-03-08T11:00:00', seoTitle: 'Новый ледовый дворец в Тюмени', seoDescription: 'В Тюмени открылся ледовый дворец на 5000 мест.', qualityScore: 85, qualityNotes: ['✓ Уникальный текст', '✓ Актуальная тема'],
  },
  {
    id: 'ea-2', title: 'Бизнес-форум «Тюмень 2026» соберёт более 2000 участников', description: 'Форум пройдёт в апреле', content: 'В апреле в Тюмени пройдёт крупный бизнес-форум с участием более 2000 предпринимателей.', image: '', source: 'RSS: ТюменьПро', sourceUrl: 'https://tyumenpro.ru/forum', category: 'Бизнес', tags: ['бизнес', 'форум'], status: 'ai_generated', authorId: 'em-5', createdAt: '2026-03-08T09:30:00', updatedAt: '2026-03-08T09:30:00', seoTitle: '', seoDescription: '', qualityScore: 72, qualityNotes: ['⚠ Нет SEO', '⚠ Нет изображения'],
  },
  {
    id: 'ea-3', title: 'ДТП на объездной: столкнулись 3 машины', description: 'Пострадавших нет', content: 'На объездной дороге Тюмени произошло столкновение трёх автомобилей.', image: '/placeholder.svg', source: '72.ru', sourceUrl: 'https://72.ru/incidents', category: 'Происшествия', tags: ['дтп'], status: 'ready_to_publish', authorId: 'em-5', editorId: 'em-1', createdAt: '2026-03-08T09:00:00', updatedAt: '2026-03-08T10:30:00', publishAt: '2026-03-08T14:00:00', seoTitle: 'ДТП на объездной Тюмени', seoDescription: 'На объездной дороге Тюмени столкнулись 3 машины.', qualityScore: 90,
  },
  {
    id: 'ea-4', title: 'Тюменский «Рубин» выиграл кубок области', description: 'Хоккейная команда стала чемпионом', content: 'Тюменский хоккейный клуб «Рубин» одержал победу в финале кубка области.', image: '/placeholder.svg', source: 'Спорт72', sourceUrl: 'https://sport72.ru/hockey', category: 'Спорт', tags: ['спорт', 'хоккей'], status: 'published', authorId: 'em-4', editorId: 'em-2', createdAt: '2026-03-07T18:00:00', updatedAt: '2026-03-07T19:00:00', publishedAt: '2026-03-07T19:00:00', seoTitle: 'Рубин — чемпион области', seoDescription: 'Тюменский Рубин выиграл кубок области.', qualityScore: 95,
  },
  {
    id: 'ea-5', title: 'Выставка современного искусства в музее', description: 'Новая экспозиция', content: 'В Тюменском краеведческом музее открылась выставка современного искусства.', image: '', source: 'Культура72', sourceUrl: '', category: 'Культура', tags: ['культура'], status: 'draft', authorId: 'em-5', createdAt: '2026-03-07T15:00:00', updatedAt: '2026-03-07T15:00:00', seoTitle: '', seoDescription: '',
  },
  {
    id: 'ea-6', title: 'Новые тарифы ЖКХ с 1 апреля', description: 'Рост 4-9%', content: 'С 1 апреля в Тюменской области изменятся тарифы на ЖКУ.', image: '/placeholder.svg', source: 'AI генерация', sourceUrl: '', category: 'Общество', tags: ['жкх'], status: 'editor_review', authorId: 'em-5', editorId: 'em-1', createdAt: '2026-03-07T12:00:00', updatedAt: '2026-03-08T08:00:00', seoTitle: 'Новые тарифы ЖКХ Тюмень', seoDescription: 'Тарифы ЖКХ изменятся с 1 апреля.', qualityScore: 80,
  },
  {
    id: 'ea-7', title: 'Рекламный текст компании', description: '', content: 'Лучший магазин в городе! Скидки!', image: '', source: 'AI сбор', sourceUrl: '', category: 'Новости', tags: [], status: 'rejected', authorId: 'em-5', createdAt: '2026-03-06T10:00:00', updatedAt: '2026-03-06T11:00:00', seoTitle: '', seoDescription: '', qualityScore: 15, qualityNotes: ['❌ Рекламный материал', '❌ Не новость'],
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
];
