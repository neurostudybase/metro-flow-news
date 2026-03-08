// AI City Discovery & Growth data

export interface CityCandidate {
  id: string;
  name: string;
  slug: string;
  region: string;
  country: string;
  population: number;
  searchVolume: number;
  newsActivity: number;
  companiesCount: number;
  adsActivity: number;
  growthScore: number;
  potential: 'high' | 'medium' | 'low';
  status: 'suggested' | 'approved' | 'launched' | 'rejected';
  suggestedDomain: string;
}

export interface GrowthSuggestion {
  id: string;
  type: 'launch_portal' | 'boost_seo' | 'create_articles' | 'increase_ads';
  cityName: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  expectedImpact: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface NetworkStats {
  cityId: string;
  cityName: string;
  domain: string;
  traffic: number;
  trafficGrowth: number;
  newsCount: number;
  adsCount: number;
  companiesCount: number;
}

const calcPotential = (score: number): 'high' | 'medium' | 'low' =>
  score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low';

const calcScore = (pop: number, search: number, news: number, companies: number, ads: number): number => {
  const popScore = Math.min(pop / 20000, 25);
  const searchScore = Math.min(search / 400, 25);
  const newsScore = Math.min(news / 4, 25);
  const otherScore = Math.min((companies + ads) / 200, 25);
  return Math.round(popScore + searchScore + newsScore + otherScore);
};

const raw: Omit<CityCandidate, 'growthScore' | 'potential'>[] = [
  { id: 'tomsk', name: 'Томск', slug: 'tomsk', region: 'Томская область', country: 'Россия', population: 574000, searchVolume: 8200, newsActivity: 85, companiesCount: 3200, adsActivity: 4100, status: 'suggested', suggestedDomain: 'tomsk.info' },
  { id: 'omsk', name: 'Омск', slug: 'omsk', region: 'Омская область', country: 'Россия', population: 1100000, searchVolume: 12400, newsActivity: 120, companiesCount: 5600, adsActivity: 7200, status: 'suggested', suggestedDomain: 'omsk.info' },
  { id: 'tula', name: 'Тула', slug: 'tula', region: 'Тульская область', country: 'Россия', population: 470000, searchVolume: 5800, newsActivity: 60, companiesCount: 2100, adsActivity: 2800, status: 'suggested', suggestedDomain: 'tula.online' },
  { id: 'chelyabinsk', name: 'Челябинск', slug: 'chelyabinsk', region: 'Челябинская область', country: 'Россия', population: 1130000, searchVolume: 14200, newsActivity: 130, companiesCount: 6100, adsActivity: 8500, status: 'suggested', suggestedDomain: 'chelyabinsk.info' },
  { id: 'surgut', name: 'Сургут', slug: 'surgut', region: 'ХМАО', country: 'Россия', population: 380000, searchVolume: 6100, newsActivity: 70, companiesCount: 2800, adsActivity: 3500, status: 'suggested', suggestedDomain: 'surgut.info' },
  { id: 'nizhnevartovsk', name: 'Нижневартовск', slug: 'nizhnevartovsk', region: 'ХМАО', country: 'Россия', population: 280000, searchVolume: 3200, newsActivity: 40, companiesCount: 1400, adsActivity: 1800, status: 'suggested', suggestedDomain: 'nizhnevartovsk.info' },
  { id: 'novosibirsk', name: 'Новосибирск', slug: 'novosibirsk', region: 'Новосибирская область', country: 'Россия', population: 1620000, searchVolume: 18500, newsActivity: 160, companiesCount: 8200, adsActivity: 11000, status: 'suggested', suggestedDomain: 'novosibirsk.info' },
  { id: 'yekaterinburg', name: 'Екатеринбург', slug: 'yekaterinburg', region: 'Свердловская область', country: 'Россия', population: 1540000, searchVolume: 17200, newsActivity: 150, companiesCount: 7800, adsActivity: 10200, status: 'suggested', suggestedDomain: 'yekaterinburg.info' },
];

export const CITY_CANDIDATES: CityCandidate[] = raw.map(c => {
  const score = calcScore(c.population, c.searchVolume, c.newsActivity, c.companiesCount, c.adsActivity);
  return { ...c, growthScore: score, potential: calcPotential(score) };
}).sort((a, b) => b.growthScore - a.growthScore);

export const GROWTH_SUGGESTIONS: GrowthSuggestion[] = [
  { id: 's1', type: 'launch_portal', cityName: 'Новосибирск', description: 'Запустить портал novosibirsk.info — крупнейший город без покрытия', priority: 'high', expectedImpact: '+15000 посетителей/мес', status: 'pending', createdAt: '2025-03-07' },
  { id: 's2', type: 'launch_portal', cityName: 'Екатеринбург', description: 'Запустить портал yekaterinburg.info — высокий поисковый объём', priority: 'high', expectedImpact: '+12000 посетителей/мес', status: 'pending', createdAt: '2025-03-07' },
  { id: 's3', type: 'launch_portal', cityName: 'Челябинск', description: 'Запустить портал chelyabinsk.info — сильная новостная активность', priority: 'high', expectedImpact: '+10000 посетителей/мес', status: 'pending', createdAt: '2025-03-06' },
  { id: 's4', type: 'boost_seo', cityName: 'Тюмень', description: 'Усилить SEO-статьи для категории "рестораны" и "недвижимость"', priority: 'medium', expectedImpact: '+3000 посетителей/мес', status: 'pending', createdAt: '2025-03-06' },
  { id: 's5', type: 'create_articles', cityName: 'Курган', description: 'Сгенерировать 20 тематических статей для kurgan.info', priority: 'medium', expectedImpact: '+1500 посетителей/мес', status: 'pending', createdAt: '2025-03-05' },
  { id: 's6', type: 'increase_ads', cityName: 'Брянск', description: 'Расширить категории объявлений для bryansk.online', priority: 'low', expectedImpact: '+800 объявлений/мес', status: 'pending', createdAt: '2025-03-05' },
];

export const NETWORK_STATS: NetworkStats[] = [
  { cityId: 'tyumen', cityName: 'Тюмень', domain: 'tyumen.info', traffic: 45200, trafficGrowth: 12.5, newsCount: 1240, adsCount: 3400, companiesCount: 890 },
  { cityId: 'kurgan', cityName: 'Курган', domain: 'kurgan.info', traffic: 18700, trafficGrowth: 8.2, newsCount: 620, adsCount: 1200, companiesCount: 340 },
  { cityId: 'bryansk', cityName: 'Брянск', domain: 'bryansk.online', traffic: 5200, trafficGrowth: 24.1, newsCount: 180, adsCount: 420, companiesCount: 120 },
  { cityId: 'nefteyugansk', cityName: 'Нефтеюганск', domain: 'nefteyugansk.info', traffic: 3100, trafficGrowth: 15.3, newsCount: 95, adsCount: 210, companiesCount: 65 },
  { cityId: 'pyt-yah', cityName: 'Пыть-Ях', domain: 'pyt-yah.info', traffic: 1800, trafficGrowth: 18.7, newsCount: 42, adsCount: 85, companiesCount: 28 },
];
