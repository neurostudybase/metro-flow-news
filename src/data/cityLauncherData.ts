// AI City Launcher data layer

export type LaunchStatus = 'suggested' | 'pending_approval' | 'approved' | 'launching' | 'active' | 'rejected' | 'failed';
export type LaunchMode = 'manual_only' | 'approval_required' | 'auto_launch';

export interface CityLaunchItem {
  id: string;
  cityName: string;
  region: string;
  domain: string;
  growthScore: number;
  recommendedCategories: string[];
  status: LaunchStatus;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  launchedAt?: string;
  launchError?: string;
  failedStep?: string;
  aiModules: string[];
  populationEstimate?: number;
  searchVolume?: number;
  reason: string;
  checklist: LaunchChecklistItem[];
  log: LaunchLogEntry[];
}

export interface LaunchChecklistItem {
  step: string;
  label: string;
  completed: boolean;
  error?: string;
}

export interface LaunchLogEntry {
  timestamp: string;
  action: string;
  details: string;
  status: 'success' | 'error' | 'info';
}

export interface LauncherSettings {
  enabled: boolean;
  launchMode: LaunchMode;
  minGrowthScore: number;
  maxCitiesPerMonth: number;
  autoAIModules: string[];
  autoCreateSEO: boolean;
  autoCreateContent: boolean;
  requireManualApproval: boolean;
}

const defaultChecklist: LaunchChecklistItem[] = [
  { step: 'create_city', label: 'Создать запись города', completed: false },
  { step: 'bind_domain', label: 'Привязать домен', completed: false },
  { step: 'create_sections', label: 'Создать базовые разделы', completed: false },
  { step: 'create_seo', label: 'Создать SEO страницы', completed: false },
  { step: 'enable_news_hunter', label: 'Подключить AI News Hunter', completed: false },
  { step: 'enable_journalist', label: 'Подключить AI Journalist', completed: false },
  { step: 'enable_front_editor', label: 'Подключить AI Front Editor', completed: false },
  { step: 'enable_analytics', label: 'Подключить AI Analytics', completed: false },
  { step: 'create_initial_tasks', label: 'Создать задачи наполнения', completed: false },
];

export const LAUNCH_QUEUE: CityLaunchItem[] = [
  {
    id: 'launch-1',
    cityName: 'Сургут',
    region: 'ХМАО',
    domain: 'surgut.info',
    growthScore: 92,
    recommendedCategories: ['Недвижимость', 'Работа', 'Нефтегаз', 'Авто'],
    status: 'pending_approval',
    createdAt: '2025-06-01',
    reason: 'Высокий поисковый трафик (45K/мес), крупный город ХМАО, сильный бизнес-потенциал в нефтегазовом секторе',
    populationEstimate: 380000,
    searchVolume: 45000,
    aiModules: ['News Hunter', 'AI Journalist', 'AI Front Editor', 'AI Analytics'],
    checklist: defaultChecklist.map(c => ({ ...c })),
    log: [
      { timestamp: '2025-06-01 10:00', action: 'Город предложен', details: 'AI Growth рекомендовал запуск на основе score 92', status: 'info' },
    ],
  },
  {
    id: 'launch-2',
    cityName: 'Тобольск',
    region: 'Тюменская область',
    domain: 'tobolsk.info',
    growthScore: 78,
    recommendedCategories: ['Туризм', 'Культура', 'Город', 'Новости'],
    status: 'suggested',
    createdAt: '2025-06-03',
    reason: 'Туристический потенциал, исторический город, растущий поисковый интерес',
    populationEstimate: 100000,
    searchVolume: 12000,
    aiModules: ['News Hunter', 'AI Journalist', 'AI Front Editor'],
    checklist: defaultChecklist.map(c => ({ ...c })),
    log: [
      { timestamp: '2025-06-03 14:00', action: 'Город предложен', details: 'AI Growth рекомендовал запуск', status: 'info' },
    ],
  },
  {
    id: 'launch-3',
    cityName: 'Ишим',
    region: 'Тюменская область',
    domain: 'ishim.info',
    growthScore: 65,
    recommendedCategories: ['Новости', 'Город', 'Происшествия'],
    status: 'suggested',
    createdAt: '2025-06-05',
    reason: 'Средний потенциал, районный центр Тюменской области',
    populationEstimate: 65000,
    searchVolume: 5000,
    aiModules: ['News Hunter', 'AI Journalist'],
    checklist: defaultChecklist.map(c => ({ ...c })),
    log: [],
  },
];

export const LAUNCH_HISTORY: CityLaunchItem[] = [
  {
    id: 'launch-h1',
    cityName: 'Курган',
    region: 'Курганская область',
    domain: 'kurgan.info',
    growthScore: 85,
    recommendedCategories: ['Новости', 'Город', 'Работа', 'Авто'],
    status: 'active',
    createdAt: '2025-03-10',
    approvedAt: '2025-03-11',
    approvedBy: 'info@tyumen.info',
    launchedAt: '2025-03-12',
    reason: 'Областной центр, высокий спрос на локальные новости',
    populationEstimate: 310000,
    searchVolume: 32000,
    aiModules: ['News Hunter', 'AI Journalist', 'AI Front Editor', 'AI Analytics'],
    checklist: defaultChecklist.map(c => ({ ...c, completed: true })),
    log: [
      { timestamp: '2025-03-10 09:00', action: 'Город предложен', details: 'AI Growth рекомендовал запуск', status: 'info' },
      { timestamp: '2025-03-11 11:00', action: 'Подтверждён', details: 'Подтвердил: info@tyumen.info', status: 'success' },
      { timestamp: '2025-03-12 08:00', action: 'Запуск завершён', details: 'Все модули активированы', status: 'success' },
    ],
  },
  {
    id: 'launch-h2',
    cityName: 'Ялуторовск',
    region: 'Тюменская область',
    domain: 'yalutorovsk.info',
    growthScore: 45,
    recommendedCategories: ['Новости', 'Город'],
    status: 'rejected',
    createdAt: '2025-04-15',
    reason: 'Малый город, низкий поисковый трафик',
    populationEstimate: 40000,
    searchVolume: 2000,
    aiModules: ['News Hunter'],
    checklist: defaultChecklist.map(c => ({ ...c })),
    log: [
      { timestamp: '2025-04-15 10:00', action: 'Город предложен', details: 'AI Growth рекомендовал', status: 'info' },
      { timestamp: '2025-04-16 14:00', action: 'Отклонён', details: 'Недостаточный потенциал', status: 'error' },
    ],
  },
];

export const DEFAULT_LAUNCHER_SETTINGS: LauncherSettings = {
  enabled: true,
  launchMode: 'approval_required',
  minGrowthScore: 60,
  maxCitiesPerMonth: 3,
  autoAIModules: ['News Hunter', 'AI Journalist', 'AI Front Editor', 'AI Analytics'],
  autoCreateSEO: true,
  autoCreateContent: true,
  requireManualApproval: true,
};

export const DEFAULT_CITY_SECTIONS = [
  'Новости', 'Город', 'Происшествия', 'Бизнес', 'Спорт', 'Культура', 'Общество', 'Объявления', 'Каталог компаний',
];

export const INITIAL_TASKS = [
  'Найти новости города',
  'Создать 10 AI-черновиков новостей',
  'Создать 5 городских статей',
  'Создать базовые SEO страницы',
  'Создать стартовые категории каталога компаний',
  'Активировать объявления для города',
];

export const getStatusLabel = (status: LaunchStatus): string => {
  const map: Record<LaunchStatus, string> = {
    suggested: 'Рекомендован',
    pending_approval: 'Ожидает подтверждения',
    approved: 'Подтверждён',
    launching: 'Запускается',
    active: 'Активен',
    rejected: 'Отклонён',
    failed: 'Ошибка',
  };
  return map[status];
};

export const getStatusColor = (status: LaunchStatus): string => {
  const map: Record<LaunchStatus, string> = {
    suggested: 'bg-blue-100 text-blue-800',
    pending_approval: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    launching: 'bg-purple-100 text-purple-800',
    active: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
    failed: 'bg-red-200 text-red-900',
  };
  return map[status];
};
