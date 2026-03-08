// AI Editor - автоматический анализ и обработка новостей

import { NEWS_CATEGORIES } from './newsPipelineData';
import { CITIES } from './citiesData';

export type AINewsType = 'urgent' | 'short' | 'regular' | 'analytics';
export type AIEditorStatus = 'processing' | 'draft' | 'review_required' | 'approved' | 'rejected';

export interface AIEditorItem {
  id: string;
  originalTitle: string;
  originalText: string;
  sourceUrl: string;
  sourceName: string;
  // AI-generated fields
  title: string;
  seoTitle: string;
  excerpt: string;
  slug: string;
  content: string;
  categoryAuto: string;
  cityId: string | undefined;
  cityName: string | undefined;
  tagsAuto: string[];
  newsType: AINewsType;
  contentScore: number;
  // Status
  status: AIEditorStatus;
  createdAt: string;
  processedAt: string;
  // Manual overrides
  categoryManual?: string;
  cityManual?: string;
  tagsManual?: string[];
  titleManual?: string;
  reviewNote?: string;
}

export interface AIEditorLogEntry {
  id: string;
  itemId: string;
  itemTitle: string;
  action: string;
  details: string;
  timestamp: string;
  result: 'processed' | 'review' | 'rejected' | 'approved';
}

export interface AIEditorSettings {
  minScore: number;
  maxNewsPerDay: number;
  autoPublishEnabled: boolean;
  autoCategorizationEnabled: boolean;
  autoCityDetection: boolean;
  autoTagGeneration: boolean;
  autoHeadlineGeneration: boolean;
}

export const NEWS_TYPE_LABELS: Record<AINewsType, string> = {
  urgent: 'Срочная новость',
  short: 'Короткая заметка',
  regular: 'Обычная новость',
  analytics: 'Аналитика',
};

export const EDITOR_STATUS_LABELS: Record<AIEditorStatus, string> = {
  processing: 'Обработка',
  draft: 'Черновик',
  review_required: 'На проверке',
  approved: 'Одобрено',
  rejected: 'Отклонено',
};

// City detection keywords
const CITY_KEYWORDS: Record<string, string[]> = {
  tyumen: ['Тюмень', 'Тюмени', 'Тюменск', 'тюмен'],
  kurgan: ['Курган', 'Кургане', 'Курганск', 'курган'],
  bryansk: ['Брянск', 'Брянске', 'Брянской', 'брянск'],
  nefteyugansk: ['Нефтеюганск', 'Нефтеюганске', 'нефтеюганск'],
  'pyt-yah': ['Пыть-Ях', 'Пыть-Яхе', 'пыть-ях'],
  tomsk: ['Томск', 'Томске', 'Томской', 'томск'],
  omsk: ['Омск', 'Омске', 'Омской', 'омск'],
};

// Category detection keywords
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Происшествия': ['дтп', 'авария', 'пожар', 'полиция', 'мчс', 'происшестви', 'убийств', 'кража', 'наркотик', 'задержан'],
  'Спорт': ['матч', 'хоккей', 'футбол', 'спорт', 'турнир', 'чемпион', 'олимпи', 'стадион', 'команда', 'игрок'],
  'Бизнес': ['бизнес', 'компани', 'инвести', 'экономи', 'рынок', 'предприним', 'банк', 'финанс', 'торгов'],
  'Культура': ['выставк', 'театр', 'концерт', 'фестиваль', 'музей', 'артист', 'культур', 'кино', 'литератур'],
  'Общество': ['жкх', 'тариф', 'образован', 'здоров', 'пенси', 'социал', 'благотвор', 'волонтер'],
  'Город': ['строительств', 'дорог', 'транспорт', 'благоустрой', 'парк', 'ремонт', 'инфраструктур'],
};

// AI functions
export function detectCity(text: string): { cityId: string | undefined; cityName: string | undefined } {
  const lower = text.toLowerCase();
  for (const [cityId, keywords] of Object.entries(CITY_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) {
        const city = CITIES.find(c => c.id === cityId);
        return { cityId, cityName: city?.name || cityId };
      }
    }
  }
  return { cityId: undefined, cityName: undefined };
}

export function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  let best = 'Новости';
  let bestCount = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const count = keywords.filter(kw => lower.includes(kw)).length;
    if (count > bestCount) { bestCount = count; best = cat; }
  }
  return best;
}

export function detectNewsType(text: string): AINewsType {
  if (text.length < 200) return 'short';
  const urgentKw = ['срочно', 'экстренно', 'молния', 'breaking', 'чп'];
  if (urgentKw.some(kw => text.toLowerCase().includes(kw))) return 'urgent';
  if (text.length > 2000) return 'analytics';
  return 'regular';
}

export function generateTags(text: string, category: string): string[] {
  const tags: string[] = [];
  const lower = text.toLowerCase();
  // Add category-based tag
  tags.push(category.toLowerCase());
  // Extract common keywords
  const commonTags: Record<string, string> = {
    'авария': 'авария', 'пожар': 'пожар', 'полиция': 'полиция', 'дтп': 'дтп',
    'хоккей': 'хоккей', 'футбол': 'футбол', 'строительств': 'строительство',
    'ремонт': 'ремонт дорог', 'выставк': 'выставка', 'фестиваль': 'фестиваль',
    'жкх': 'жкх', 'тариф': 'тарифы', 'бизнес': 'бизнес', 'инвестиц': 'инвестиции',
  };
  for (const [kw, tag] of Object.entries(commonTags)) {
    if (lower.includes(kw) && !tags.includes(tag)) tags.push(tag);
  }
  return tags.slice(0, 8);
}

export function calculateContentScore(item: { title: string; content: string; sourceUrl: string; excerpt: string; tagsAuto: string[] }): number {
  let score = 0;
  if (item.title && item.title.length > 10) score += 20;
  if (item.content && item.content.length > 100) score += 25;
  if (item.content && item.content.length > 500) score += 10;
  if (item.sourceUrl) score += 15;
  if (item.excerpt && item.excerpt.length > 20) score += 15;
  if (item.tagsAuto.length >= 3) score += 10;
  if (item.title !== item.content?.slice(0, item.title.length)) score += 5; // uniqueness hint
  return Math.min(score, 100);
}

export function generateSlug(title: string): string {
  const map: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i',
    'й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t',
    'у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y',
    'ь':'','э':'e','ю':'yu','я':'ya',' ':'-',
  };
  return title.toLowerCase().split('').map(c => map[c] ?? (c.match(/[a-z0-9-]/) ? c : '')).join('').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}

// Process raw news into AI editor item
export function processNewsWithAI(raw: { originalTitle: string; originalText: string; sourceUrl: string; sourceName: string }): AIEditorItem {
  const fullText = `${raw.originalTitle} ${raw.originalText}`;
  const { cityId, cityName } = detectCity(fullText);
  const categoryAuto = detectCategory(fullText);
  const newsType = detectNewsType(raw.originalText);
  const tagsAuto = generateTags(fullText, categoryAuto);

  const title = raw.originalTitle; // In real AI would rewrite
  const excerpt = raw.originalText.slice(0, 160).trim();
  const seoTitle = title.slice(0, 60);
  const slug = generateSlug(title);
  const content = raw.originalText;

  const contentScore = calculateContentScore({ title, content, sourceUrl: raw.sourceUrl, excerpt, tagsAuto });
  const status: AIEditorStatus = !cityId ? 'review_required' : contentScore < 40 ? 'review_required' : 'draft';

  const now = new Date().toISOString();
  return {
    id: `aie-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    originalTitle: raw.originalTitle,
    originalText: raw.originalText,
    sourceUrl: raw.sourceUrl,
    sourceName: raw.sourceName,
    title, seoTitle, excerpt, slug, content,
    categoryAuto, cityId, cityName, tagsAuto, newsType, contentScore, status,
    createdAt: now, processedAt: now,
  };
}

// Mock data
export const MOCK_AI_EDITOR_ITEMS: AIEditorItem[] = [
  {
    id: 'aie-1', originalTitle: 'New ice arena in Tyumen', originalText: 'В Тюмени открылся новый ледовый дворец на 5000 зрителей. Строительство велось два года.',
    sourceUrl: 'https://tyumenpro.ru/123', sourceName: 'ТюменьПро',
    title: 'В Тюмени открылся новый ледовый дворец на 5000 зрителей', seoTitle: 'Новый ледовый дворец в Тюмени — открытие 2026',
    excerpt: 'В Тюмени состоялось торжественное открытие нового ледового дворца вместимостью 5000 зрителей.',
    slug: 'v-tyumeni-otkrylsya-novyy-ledovyy-dvorets', content: 'В Тюмени открылся новый ледовый дворец на 5000 зрителей. Строительство велось два года и обошлось в 3,5 миллиарда рублей.',
    categoryAuto: 'Город', cityId: 'tyumen', cityName: 'Тюмень', tagsAuto: ['город', 'строительство', 'спорт'], newsType: 'regular', contentScore: 75,
    status: 'draft', createdAt: '2026-03-08T10:00:00', processedAt: '2026-03-08T10:01:00',
  },
  {
    id: 'aie-2', originalTitle: 'ДТП на трассе под Курганом', originalText: 'На трассе под Курганом произошло серьёзное ДТП с участием грузовика. Полиция выехала на место.',
    sourceUrl: 'https://kurgan-news.ru/dtp', sourceName: 'КурганНовости',
    title: 'Серьёзное ДТП на трассе под Курганом с участием грузовика', seoTitle: 'ДТП под Курганом — авария с грузовиком',
    excerpt: 'На трассе под Курганом произошло серьёзное ДТП с участием грузовика.',
    slug: 'seryoznoe-dtp-na-trasse-pod-kurganom', content: 'На трассе под Курганом произошло серьёзное ДТП с участием грузовика. Полиция выехала на место. По предварительным данным, есть пострадавшие.',
    categoryAuto: 'Происшествия', cityId: 'kurgan', cityName: 'Курган', tagsAuto: ['происшествия', 'дтп', 'полиция', 'авария'], newsType: 'urgent', contentScore: 68,
    status: 'draft', createdAt: '2026-03-08T09:30:00', processedAt: '2026-03-08T09:31:00',
  },
  {
    id: 'aie-3', originalTitle: 'Фестиваль в неизвестном городе', originalText: 'Фестиваль уличной еды пройдёт в выходные.',
    sourceUrl: 'https://example.com/fest', sourceName: 'Unknown',
    title: 'Фестиваль уличной еды пройдёт в выходные', seoTitle: 'Фестиваль уличной еды',
    excerpt: 'Фестиваль уличной еды пройдёт в выходные.',
    slug: 'festival-ulichnoy-edy', content: 'Фестиваль уличной еды пройдёт в выходные.',
    categoryAuto: 'Культура', cityId: undefined, cityName: undefined, tagsAuto: ['культура', 'фестиваль'], newsType: 'short', contentScore: 25,
    status: 'review_required', createdAt: '2026-03-08T08:00:00', processedAt: '2026-03-08T08:01:00',
  },
  {
    id: 'aie-4', originalTitle: 'Бизнес-инвестиции в Томск', originalText: 'Крупная компания объявила о строительстве нового завода в Томске. Инвестиции составят 5 миллиардов рублей. Проект создаст более 500 рабочих мест в Томской области.',
    sourceUrl: 'https://tomsk-biz.ru/invest', sourceName: 'ТомскБизнес',
    title: 'Крупная компания инвестирует 5 млрд в новый завод в Томске', seoTitle: 'Инвестиции 5 млрд в завод в Томске',
    excerpt: 'Крупная компания объявила о строительстве нового завода в Томске с инвестициями 5 млрд рублей.',
    slug: 'krupnaya-kompaniya-investiruet-v-tomsk', content: 'Крупная компания объявила о строительстве нового завода в Томске. Инвестиции составят 5 миллиардов рублей. Проект создаст более 500 рабочих мест в Томской области.',
    categoryAuto: 'Бизнес', cityId: undefined, cityName: 'Томск', tagsAuto: ['бизнес', 'инвестиции', 'строительство'], newsType: 'regular', contentScore: 72,
    status: 'review_required', createdAt: '2026-03-08T07:00:00', processedAt: '2026-03-08T07:01:00',
    reviewNote: 'Город Томск не в сети порталов — требуется ручная проверка',
  },
  {
    id: 'aie-5', originalTitle: 'Хоккейный матч в Нефтеюганске', originalText: 'В Нефтеюганске состоялся хоккейный матч между местными командами. Победу одержала команда «Югра» со счётом 4:2.',
    sourceUrl: 'https://nefteyugansk-sport.ru/hockey', sourceName: 'НефтеюганскСпорт',
    title: '«Югра» победила в хоккейном матче в Нефтеюганске со счётом 4:2', seoTitle: 'Хоккей в Нефтеюганске — Югра победила 4:2',
    excerpt: 'В Нефтеюганске состоялся хоккейный матч. Победу одержала команда «Югра» со счётом 4:2.',
    slug: 'yugra-pobedila-v-nefteyuganske', content: 'В Нефтеюганске состоялся хоккейный матч между местными командами. Победу одержала команда «Югра» со счётом 4:2. Матч прошёл при полных трибунах.',
    categoryAuto: 'Спорт', cityId: 'nefteyugansk', cityName: 'Нефтеюганск', tagsAuto: ['спорт', 'хоккей'], newsType: 'regular', contentScore: 65,
    status: 'draft', createdAt: '2026-03-07T20:00:00', processedAt: '2026-03-07T20:01:00',
  },
  {
    id: 'aie-6', originalTitle: 'Пожар на складе в Брянске', originalText: 'Срочно! В Брянске произошёл пожар на складе. МЧС направило на место 5 расчётов. Площадь возгорания — 200 кв.м.',
    sourceUrl: 'https://bryansk-news.ru/fire', sourceName: 'БрянскНовости',
    title: 'Пожар на складе в Брянске: МЧС направило 5 расчётов', seoTitle: 'Пожар на складе в Брянске — 200 кв.м',
    excerpt: 'В Брянске произошёл пожар на складе. МЧС направило 5 расчётов.',
    slug: 'pozhar-na-sklade-v-bryanske', content: 'В Брянске произошёл пожар на складе. МЧС направило на место 5 расчётов. Площадь возгорания составила 200 квадратных метров.',
    categoryAuto: 'Происшествия', cityId: 'bryansk', cityName: 'Брянск', tagsAuto: ['происшествия', 'пожар'], newsType: 'urgent', contentScore: 70,
    status: 'approved', createdAt: '2026-03-07T15:00:00', processedAt: '2026-03-07T15:01:00',
  },
];

export const MOCK_AI_EDITOR_LOG: AIEditorLogEntry[] = [
  { id: 'ael-1', itemId: 'aie-1', itemTitle: 'В Тюмени открылся ледовый дворец', action: 'AI обработал новость', details: 'Категория: Город, Город: Тюмень, Score: 75', timestamp: '2026-03-08T10:01:00', result: 'processed' },
  { id: 'ael-2', itemId: 'aie-2', itemTitle: 'ДТП под Курганом', action: 'AI обработал новость', details: 'Категория: Происшествия, Город: Курган, Score: 68', timestamp: '2026-03-08T09:31:00', result: 'processed' },
  { id: 'ael-3', itemId: 'aie-3', itemTitle: 'Фестиваль уличной еды', action: 'Отправлено на проверку', details: 'Город не определён, Score: 25 (ниже порога)', timestamp: '2026-03-08T08:01:00', result: 'review' },
  { id: 'ael-4', itemId: 'aie-4', itemTitle: 'Инвестиции в Томск', action: 'Отправлено на проверку', details: 'Город Томск не в сети порталов', timestamp: '2026-03-08T07:01:00', result: 'review' },
  { id: 'ael-5', itemId: 'aie-6', itemTitle: 'Пожар на складе в Брянске', action: 'Одобрено', details: 'Срочная новость, Score: 70', timestamp: '2026-03-07T15:05:00', result: 'approved' },
  { id: 'ael-6', itemId: 'aie-5', itemTitle: 'Хоккей в Нефтеюганске', action: 'AI обработал новость', details: 'Категория: Спорт, Город: Нефтеюганск, Score: 65', timestamp: '2026-03-07T20:01:00', result: 'processed' },
];

export const DEFAULT_AI_EDITOR_SETTINGS: AIEditorSettings = {
  minScore: 40,
  maxNewsPerDay: 50,
  autoPublishEnabled: false,
  autoCategorizationEnabled: true,
  autoCityDetection: true,
  autoTagGeneration: true,
  autoHeadlineGeneration: true,
};
