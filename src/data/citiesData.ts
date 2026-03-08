// Multi-city architecture data

export interface City {
  id: string;
  name: string;
  slug: string;
  domain: string;
  region: string;
  country: string;
  status: 'active' | 'setup' | 'disabled';
  timezone: string;
  searchKeywords: string[];
}

export const CITIES: City[] = [
  { id: 'tyumen', name: 'Тюмень', slug: 'tyumen', domain: 'tyumen.info', region: 'Тюменская область', country: 'Россия', status: 'active', timezone: 'Asia/Yekaterinburg', searchKeywords: ['Тюмень новости', 'происшествия Тюмень', 'Тюмень сегодня'] },
  { id: 'kurgan', name: 'Курган', slug: 'kurgan', domain: 'kurgan.info', region: 'Курганская область', country: 'Россия', status: 'active', timezone: 'Asia/Yekaterinburg', searchKeywords: ['Курган новости', 'происшествия Курган', 'Курган сегодня'] },
  { id: 'bryansk', name: 'Брянск', slug: 'bryansk', domain: 'bryansk.online', region: 'Брянская область', country: 'Россия', status: 'setup', timezone: 'Europe/Moscow', searchKeywords: ['Брянск новости', 'происшествия Брянск', 'Брянск сегодня'] },
  { id: 'nefteyugansk', name: 'Нефтеюганск', slug: 'nefteyugansk', domain: 'nefteyugansk.info', region: 'ХМАО', country: 'Россия', status: 'setup', timezone: 'Asia/Yekaterinburg', searchKeywords: ['Нефтеюганск новости', 'Нефтеюганск сегодня'] },
  { id: 'pyt-yah', name: 'Пыть-Ях', slug: 'pyt-yah', domain: 'pyt-yah.info', region: 'ХМАО', country: 'Россия', status: 'setup', timezone: 'Asia/Yekaterinburg', searchKeywords: ['Пыть-Ях новости', 'Пыть-Ях сегодня'] },
];

export const getCityById = (id: string) => CITIES.find(c => c.id === id);
export const getCityByDomain = (domain: string) => CITIES.find(c => c.domain === domain);
export const getCityBySlug = (slug: string) => CITIES.find(c => c.slug === slug);
export const getActiveCities = () => CITIES.filter(c => c.status === 'active');
