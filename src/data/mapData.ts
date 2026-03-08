export interface MapOrganization {
  id: string;
  name: string;
  category: string;
  address: string;
  district: string;
  phone: string;
  rating: number;
  lat: number;
  lng: number;
}

export interface MapAd {
  id: string;
  title: string;
  price: string;
  image: string;
  district: string;
  lat: number;
  lng: number;
}

export interface MapEvent {
  id: string;
  title: string;
  date: string;
  address: string;
  lat: number;
  lng: number;
}

export interface MapNews {
  id: string;
  title: string;
  date: string;
  lat: number;
  lng: number;
}

export const mapOrganizations: MapOrganization[] = [
  { id: 'org-1', name: 'Ресторан «Сибирь»', category: 'рестораны', address: 'ул. Республики, 44', district: 'Центр', phone: '+7 (3452) 55-11-22', rating: 4.7, lat: 57.1553, lng: 65.5342 },
  { id: 'org-2', name: 'Автосервис «Мастер»', category: 'автосервисы', address: 'ул. Мельникайте, 101', district: 'Калининский', phone: '+7 (3452) 33-44-55', rating: 4.5, lat: 57.1420, lng: 65.5560 },
  { id: 'org-3', name: 'Стоматология «Улыбка»', category: 'медицина', address: 'ул. Ленина, 15', district: 'Центр', phone: '+7 (3452) 22-33-44', rating: 4.8, lat: 57.1580, lng: 65.5280 },
  { id: 'org-4', name: 'Магазин «Всё для дома»', category: 'магазины', address: 'ул. 50 лет Октября, 30', district: 'Ленинский', phone: '+7 (3452) 66-77-88', rating: 4.2, lat: 57.1650, lng: 65.5100 },
  { id: 'org-5', name: 'Салон красоты «Элит»', category: 'услуги', address: 'ул. Герцена, 55', district: 'Центр', phone: '+7 (3452) 11-22-33', rating: 4.6, lat: 57.1530, lng: 65.5400 },
  { id: 'org-6', name: 'Кафе «Уют»', category: 'рестораны', address: 'ул. Широтная, 120', district: 'Восточный', phone: '+7 (3452) 88-99-00', rating: 4.3, lat: 57.1350, lng: 65.5800 },
  { id: 'org-7', name: 'Шиномонтаж «Колесо»', category: 'автосервисы', address: 'ул. Федюнинского, 7', district: 'Калининский', phone: '+7 (3452) 44-55-66', rating: 4.1, lat: 57.1480, lng: 65.5650 },
  { id: 'org-8', name: 'Аптека «Здоровье»', category: 'медицина', address: 'ул. Пермякова, 48', district: 'Ленинский', phone: '+7 (3452) 77-88-99', rating: 4.4, lat: 57.1600, lng: 65.5050 },
];

export const mapAds: MapAd[] = [
  { id: 'ad-1', title: '2-к квартира, 65 м², Центр', price: '5 500 000 ₽', image: '/placeholder.svg', district: 'Центр', lat: 57.1560, lng: 65.5320 },
  { id: 'ad-2', title: 'iPhone 15 Pro Max', price: '89 000 ₽', image: '/placeholder.svg', district: 'Калининский', lat: 57.1440, lng: 65.5580 },
  { id: 'ad-3', title: 'Toyota Camry 2020', price: '2 100 000 ₽', image: '/placeholder.svg', district: 'Восточный', lat: 57.1370, lng: 65.5750 },
  { id: 'ad-4', title: 'Диван угловой', price: '25 000 ₽', image: '/placeholder.svg', district: 'Ленинский', lat: 57.1620, lng: 65.5150 },
  { id: 'ad-5', title: '1-к квартира, 40 м²', price: '3 200 000 ₽', image: '/placeholder.svg', district: 'Центр', lat: 57.1545, lng: 65.5380 },
];

export const mapEvents: MapEvent[] = [
  { id: 'ev-1', title: 'Фестиваль «Лето в Тюмени»', date: '2026-06-15', address: 'Цветной бульвар', lat: 57.1570, lng: 65.5360 },
  { id: 'ev-2', title: 'Выставка современного искусства', date: '2026-03-20', address: 'Музейный комплекс', lat: 57.1590, lng: 65.5250 },
  { id: 'ev-3', title: 'Марафон «Тюмень бежит»', date: '2026-05-01', address: 'Набережная', lat: 57.1520, lng: 65.5300 },
];

export const mapNews: MapNews[] = [
  { id: 'nw-1', title: 'Новый парк откроют в Восточном районе', date: '2026-03-07', lat: 57.1380, lng: 65.5820 },
  { id: 'nw-2', title: 'Ремонт дорог на ул. Республики', date: '2026-03-06', lat: 57.1555, lng: 65.5350 },
  { id: 'nw-3', title: 'Новая школа в Калининском районе', date: '2026-03-05', lat: 57.1460, lng: 65.5600 },
];

export const orgCategories = ['рестораны', 'автосервисы', 'медицина', 'магазины', 'услуги'];
export const districts = ['Центр', 'Восточный', 'Ленинский', 'Калининский'];
