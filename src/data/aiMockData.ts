import { AIModule, AITask, AILogEntry, AISettings } from '@/types/ai';

export const defaultModules: AIModule[] = [
  { id: 'news', name: 'AI News Editor', description: 'Подготовка черновиков новостей, заголовков, анонсов', enabled: true, autonomyLevel: 'manual', requireApproval: true, dailyTaskLimit: 20, logging: true },
  { id: 'moderation', name: 'AI Moderation', description: 'Проверка объявлений, комментариев, спам-фильтр', enabled: true, autonomyLevel: 'semi', requireApproval: true, dailyTaskLimit: 50, logging: true },
  { id: 'seo', name: 'AI SEO Engine', description: 'SEO-рекомендации, мета-теги, перелинковка', enabled: false, autonomyLevel: 'manual', requireApproval: true, dailyTaskLimit: 10, logging: true },
  { id: 'content', name: 'AI Content Generator', description: 'Городские подборки, гиды, статьи', enabled: false, autonomyLevel: 'manual', requireApproval: true, dailyTaskLimit: 5, logging: true },
  { id: 'analytics', name: 'AI Analytics', description: 'Анализ просмотров, рекомендации по развитию', enabled: true, autonomyLevel: 'auto', requireApproval: false, dailyTaskLimit: 10, logging: true },
  { id: 'security', name: 'AI Security', description: 'Антиспам, антибот, подозрительные действия', enabled: true, autonomyLevel: 'semi', requireApproval: true, dailyTaskLimit: 100, logging: true },
];

export const defaultTasks: AITask[] = [
  { id: 'task-1', moduleId: 'news', type: 'Генерация новости', description: 'Подготовить 5 новостей по теме "Городские события"', createdAt: '2026-03-08T10:00:00', updatedAt: '2026-03-08T10:05:00', status: 'needs_approval', priority: 'high', needsApproval: true, result: 'Сгенерировано 5 черновиков новостей о городских событиях Тюмени' },
  { id: 'task-2', moduleId: 'moderation', type: 'Проверка объявлений', description: 'Проверить 12 новых объявлений на спам', createdAt: '2026-03-08T09:30:00', updatedAt: '2026-03-08T09:35:00', status: 'completed', priority: 'medium', needsApproval: false, result: '10 одобрено, 2 помечены как подозрительные', approvedBy: 'Администратор', approvedAt: '2026-03-08T09:40:00' },
  { id: 'task-3', moduleId: 'seo', type: 'SEO-аудит', description: 'Собрать SEO-рекомендации для раздела Недвижимость', createdAt: '2026-03-07T14:00:00', updatedAt: '2026-03-07T14:10:00', status: 'new', priority: 'low', needsApproval: true },
  { id: 'task-4', moduleId: 'content', type: 'Генерация подборки', description: 'Создать статью "Куда сходить в Тюмени зимой"', createdAt: '2026-03-07T12:00:00', updatedAt: '2026-03-07T12:30:00', status: 'needs_approval', priority: 'medium', needsApproval: true, result: 'Черновик статьи на 1200 слов с 8 рекомендациями мест' },
  { id: 'task-5', moduleId: 'analytics', type: 'Недельный отчёт', description: 'Сформировать отчёт за неделю 1–7 марта', createdAt: '2026-03-08T08:00:00', updatedAt: '2026-03-08T08:05:00', status: 'completed', priority: 'medium', needsApproval: false, result: 'Рост трафика +12%, популярная категория: Недвижимость' },
  { id: 'task-6', moduleId: 'security', type: 'Проверка аккаунтов', description: 'Проверить подозрительные аккаунты за последние 24 часа', createdAt: '2026-03-08T07:00:00', updatedAt: '2026-03-08T07:15:00', status: 'needs_approval', priority: 'critical', needsApproval: true, result: 'Обнаружено 3 подозрительных аккаунта с аномальной активностью' },
  { id: 'task-7', moduleId: 'news', type: 'Переписывание', description: 'Переписать 3 новости в редакционном стиле', createdAt: '2026-03-08T11:00:00', updatedAt: '2026-03-08T11:00:00', status: 'in_progress', priority: 'medium', needsApproval: true },
  { id: 'task-8', moduleId: 'moderation', type: 'Проверка комментариев', description: 'Проанализировать 25 новых комментариев', createdAt: '2026-03-08T10:30:00', updatedAt: '2026-03-08T10:30:00', status: 'new', priority: 'high', needsApproval: true },
];

export const defaultLogs: AILogEntry[] = [
  { id: 'log-1', moduleId: 'news', action: 'Генерация новостей', details: 'Сгенерировано 5 черновиков новостей', timestamp: '2026-03-08T10:05:00', result: 'success' },
  { id: 'log-2', moduleId: 'moderation', action: 'Проверка объявлений', details: 'Проверено 12 объявлений, 2 помечены', timestamp: '2026-03-08T09:35:00', result: 'success', approvedBy: 'Администратор' },
  { id: 'log-3', moduleId: 'analytics', action: 'Недельный отчёт', details: 'Сформирован отчёт за 1–7 марта', timestamp: '2026-03-08T08:05:00', result: 'success' },
  { id: 'log-4', moduleId: 'security', action: 'Сканирование аккаунтов', details: 'Найдено 3 подозрительных аккаунта', timestamp: '2026-03-08T07:15:00', result: 'pending' },
  { id: 'log-5', moduleId: 'seo', action: 'SEO-анализ', details: 'Запущен анализ раздела Недвижимость', timestamp: '2026-03-07T14:00:00', result: 'pending' },
  { id: 'log-6', moduleId: 'content', action: 'Генерация статьи', details: 'Создан черновик "Куда сходить в Тюмени зимой"', timestamp: '2026-03-07T12:30:00', result: 'success' },
  { id: 'log-7', moduleId: 'news', action: 'Переписывание', details: 'Начата обработка 3 новостей', timestamp: '2026-03-08T11:00:00', result: 'pending' },
];

export const defaultSettings: AISettings = {
  globalAutoPublishDisabled: true,
  globalApprovalRequired: true,
  loggingEnabled: true,
  notificationsEnabled: true,
};
