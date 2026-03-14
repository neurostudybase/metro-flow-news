export type DealType = 'buy' | 'sell' | 'rent' | 'daily';
export type PropertyType = 'apartment' | 'room' | 'newbuilding' | 'house' | 'land' | 'garage' | 'commercial';
export type AutoType = 'car' | 'truck' | 'moto' | 'special' | 'water' | 'trailer' | 'bus';
export type ServiceType = 'repair' | 'autoservice' | 'computer' | 'beauty' | 'transport' | 'legal' | 'tutoring' | 'photo_video' | 'marketing';
export type JobType = 'vacancy' | 'resume' | 'parttime' | 'remote';
export type ElectronicsType = 'smartphones' | 'laptops' | 'computers' | 'tv' | 'cameras' | 'gaming' | 'audio';
export type HomeType = 'furniture' | 'appliances' | 'lighting' | 'construction' | 'garden';
export type KidsType = 'clothes' | 'toys' | 'strollers' | 'beds' | 'transport';
export type AnimalType = 'dogs' | 'cats' | 'birds' | 'aquarium' | 'pet_goods';
export type HobbyType = 'sport' | 'tourism' | 'fishing' | 'music' | 'collection';
export type FreeType = 'clothes' | 'furniture' | 'tech' | 'pets';

export interface Classified {
  id: number;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
  district: string;
  date: string;
  daysAgo: number;
  condition: 'new' | 'used';
  sellerType: 'private' | 'company';
  urgent: boolean;
  top: boolean;
  image: string;
  hasImage: boolean;
  views: number;
  description: string;
  dealType?: DealType;
  propertyType?: PropertyType;
  autoType?: AutoType;
  serviceType?: ServiceType;
  jobType?: JobType;
  electronicsType?: ElectronicsType;
  homeType?: HomeType;
  kidsType?: KidsType;
  animalType?: AnimalType;
  hobbyType?: HobbyType;
  freeType?: FreeType;
}

const images: Record<string, string[]> = {
  'Недвижимость': [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop',
  ],
  'Авто': [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0ffe?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
  ],
  'Услуги': [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585502781079-39ecb27e9f1a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=400&h=300&fit=crop',
  ],
  'Работа': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
  ],
  'Электроника': [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&h=300&fit=crop',
  ],
  'Дом и дача': [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
  ],
  'Детский мир': [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1566004100477-7b3b6f6e7d59?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=400&h=300&fit=crop',
  ],
  'Животные': [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-13104dec14a3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=300&fit=crop',
  ],
  'Хобби и отдых': [
    'https://images.unsplash.com/photo-1461896836934-bd45ba48e2cc?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=400&h=300&fit=crop',
  ],
  'Отдам даром': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
  ],
};

const districts = ['Центральный', 'Восточный', 'Калининский', 'Ленинский'];

function dateLabel(daysAgo: number): string {
  if (daysAgo === 0) return 'Сегодня';
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function extractNumericPrice(price: string): number {
  const m = price.replace(/\s/g, '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

const raw: Array<{
  title: string;
  price: string;
  category: string;
  districtIdx: number;
  daysAgo: number;
  condition: 'new' | 'used';
  sellerType: 'private' | 'company';
  urgent: boolean;
  top: boolean;
  imgIdx: number;
  description: string;
  views: number;
  dealType?: DealType;
  propertyType?: PropertyType;
  autoType?: AutoType;
  serviceType?: ServiceType;
  jobType?: JobType;
  electronicsType?: ElectronicsType;
  homeType?: HomeType;
  kidsType?: KidsType;
  animalType?: AnimalType;
  hobbyType?: HobbyType;
  freeType?: FreeType;
}> = [
  // ===== Недвижимость (16) =====
  { title: 'Квартира 2-к, 56 м², 5/9 эт., ул. Республики', price: '4 200 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: true, imgIdx: 0, description: 'Просторная двухкомнатная квартира в центре Тюмени.', views: 234, dealType: 'buy', propertyType: 'apartment' },
  { title: '1-к квартира, 38 м², новостройка с ремонтом', price: '3 150 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 1, description: 'Новая квартира с отделкой под ключ.', views: 189, dealType: 'sell', propertyType: 'newbuilding' },
  { title: 'Студия 24 м², рядом с ТЮмГУ — аренда', price: '18 000 ₽', category: 'Недвижимость', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 2, description: 'Сдаётся студия рядом с университетом.', views: 156, dealType: 'rent', propertyType: 'apartment' },
  { title: 'Квартира посуточно, центр, Wi-Fi', price: '2 500 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Квартира посуточно в центре города.', views: 312, dealType: 'daily', propertyType: 'apartment' },
  { title: 'Комната 18 м², ул. Мельникайте', price: '850 000 ₽', category: 'Недвижимость', districtIdx: 3, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Комната в 3-комнатной квартире.', views: 67, dealType: 'buy', propertyType: 'room' },
  { title: 'Комната 14 м², сдаётся студенту', price: '8 000 ₽', category: 'Недвижимость', districtIdx: 2, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Сдаётся комната в тихой квартире.', views: 45, dealType: 'rent', propertyType: 'room' },
  { title: 'ЖК «Сибирский», 2-к, 65 м², сдача 2026', price: '5 200 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 6, description: 'Новостройка с отделкой.', views: 289, dealType: 'buy', propertyType: 'newbuilding' },
  { title: 'Дом 120 м² на участке 6 сот.', price: '6 800 000 ₽', category: 'Недвижимость', districtIdx: 3, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 7, description: 'Частный дом в Ленинском округе.', views: 98, dealType: 'buy', propertyType: 'house' },
  { title: 'Участок 10 сот., ИЖС', price: '1 200 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 14, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Участок под строительство.', views: 67, dealType: 'buy', propertyType: 'land' },
  { title: 'Гараж 24 м², ГСК «Мотор»', price: '450 000 ₽', category: 'Недвижимость', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Кирпичный гараж с ямой.', views: 56, dealType: 'buy', propertyType: 'garage' },
  { title: 'Офис 80 м², бизнес-центр «Сити»', price: '55 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Аренда офисного помещения.', views: 123, dealType: 'rent', propertyType: 'commercial' },
  { title: 'Торговое помещение 150 м², 1 этаж', price: '12 000 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 5, condition: 'used', sellerType: 'company', urgent: true, top: false, imgIdx: 3, description: 'Коммерческое помещение на первом этаже.', views: 178, dealType: 'sell', propertyType: 'commercial' },

  // ===== Авто (14) =====
  { title: 'Toyota Camry 2021, 45 000 км', price: '2 350 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 0, description: 'Автомобиль в отличном состоянии.', views: 345, autoType: 'car' },
  { title: 'Kia Rio 2019, автомат, 1 владелец', price: '1 150 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Один владелец, полная история обслуживания.', views: 278, autoType: 'car' },
  { title: 'Hyundai Tucson 2023, дилерская гарантия', price: '3 200 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 4, description: 'Новый автомобиль от официального дилера.', views: 456, autoType: 'car' },
  { title: 'ГАЗель Next, фургон, 2020 г.', price: '1 800 000 ₽', category: 'Авто', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Грузовой фургон для перевозок.', views: 112, autoType: 'truck' },
  { title: 'КАМАЗ 65115 самосвал, 2018 г.', price: '3 500 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 7, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 0, description: 'Самосвал в рабочем состоянии.', views: 76, autoType: 'truck' },
  { title: 'Yamaha YZF-R3, 2022 г., 3 000 км', price: '650 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Спортивный мотоцикл в идеальном состоянии.', views: 198, autoType: 'moto' },
  { title: 'Скутер Honda PCX 125, 2021', price: '185 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 4, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Экономичный городской скутер.', views: 87, autoType: 'moto' },
  { title: 'Экскаватор-погрузчик JCB 3CX', price: '4 200 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 10, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Спецтехника для строительных работ.', views: 45, autoType: 'special' },
  { title: 'Мини-погрузчик Bobcat S650', price: '2 900 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 5, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Компактный погрузчик.', views: 34, autoType: 'special' },
  { title: 'Лодка ПВХ Ривьера 3200, мотор Yamaha 9.9', price: '180 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Лодка с мотором, готова к сезону.', views: 156, autoType: 'water' },
  { title: 'Катер Казанка 5М4, с прицепом', price: '350 000 ₽', category: 'Авто', districtIdx: 2, daysAgo: 14, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Моторный катер с прицепом.', views: 67, autoType: 'water' },
  { title: 'Прицеп легковой МЗСА 817711, 2023', price: '120 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 5, description: 'Новый легковой прицеп с документами.', views: 89, autoType: 'trailer' },
  { title: 'Прицеп-дача Hobby 460, 2019', price: '850 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Прицеп-дача для путешествий.', views: 123, autoType: 'trailer' },
  { title: 'ПАЗ 3205, 2017 г., 45 мест', price: '1 500 000 ₽', category: 'Авто', districtIdx: 2, daysAgo: 5, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Автобус в рабочем состоянии.', views: 56, autoType: 'bus' },

  // ===== Услуги (18) =====
  { title: 'Ремонт квартир под ключ', price: '5 000 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 1, description: 'Полный ремонт квартир любой сложности.', views: 267, serviceType: 'repair' },
  { title: 'Установка кондиционеров с гарантией', price: '8 500 ₽', category: 'Услуги', districtIdx: 3, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3, description: 'Установка и обслуживание кондиционеров.', views: 98, serviceType: 'repair' },
  { title: 'Автосервис — диагностика и ремонт', price: '2 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 0, description: 'Полная диагностика автомобиля.', views: 312, serviceType: 'autoservice' },
  { title: 'Шиномонтаж, балансировка', price: '1 500 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 2, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Шиномонтаж легковых и грузовых.', views: 145, serviceType: 'autoservice' },
  { title: 'Ремонт компьютеров и ноутбуков', price: '1 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 1, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Диагностика и ремонт ПК.', views: 178, serviceType: 'computer' },
  { title: 'Настройка Wi-Fi, установка Windows', price: '800 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 3, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Компьютерная помощь на дому.', views: 89, serviceType: 'computer' },
  { title: 'Маникюр и педикюр на дому', price: '1 500 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Мастер маникюра с выездом на дом.', views: 134, serviceType: 'beauty' },
  { title: 'Массаж лечебный и расслабляющий', price: '2 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 4, condition: 'new', sellerType: 'private', urgent: false, top: true, imgIdx: 7, description: 'Сертифицированный массажист, выезд.', views: 201, serviceType: 'beauty' },
  { title: 'Перевозка мебели, грузчики', price: '3 000 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 0, description: 'Перевозка мебели по городу.', views: 112, serviceType: 'transport' },
  { title: 'Грузоперевозки по Тюмени', price: '4 500 ₽', category: 'Услуги', districtIdx: 3, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 1, description: 'Газели и грузчики, быстро.', views: 155, serviceType: 'transport' },
  { title: 'Юрист — консультация, договоры', price: '2 500 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Юридические услуги для граждан и бизнеса.', views: 98, serviceType: 'legal' },
  { title: 'Оформление банкротства физлиц', price: '30 000 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 5, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3, description: 'Банкротство под ключ.', views: 67, serviceType: 'legal' },
  { title: 'Репетитор по математике ЕГЭ/ОГЭ', price: '1 200 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Подготовка к ЕГЭ и ОГЭ по математике.', views: 123, serviceType: 'tutoring' },
  { title: 'Репетитор по английскому языку', price: '1 500 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 3, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Английский для детей и взрослых.', views: 145, serviceType: 'tutoring' },
  { title: 'Фотограф на свадьбу / мероприятие', price: '5 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Профессиональная фотосъёмка.', views: 89, serviceType: 'photo_video' },
  { title: 'Видеосъёмка мероприятий, монтаж', price: '8 000 ₽', category: 'Услуги', districtIdx: 3, daysAgo: 1, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 7, description: 'Видеосъёмка и монтаж роликов.', views: 76, serviceType: 'photo_video' },
  { title: 'Настройка рекламы Яндекс / VK', price: '10 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 6, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Контекстная и таргетированная реклама.', views: 92, serviceType: 'marketing' },
  { title: 'SMM-продвижение для бизнеса', price: '15 000 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Ведение соцсетей и продвижение.', views: 134, serviceType: 'marketing' },

  // ===== Работа (12) =====
  { title: 'Менеджер по продажам, от 60 000 ₽', price: '60 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 0, description: 'Вакансия менеджера по продажам.', views: 345, jobType: 'vacancy' },
  { title: 'Курьер Яндекс.Еда, свободный график', price: '45 000 ₽', category: 'Работа', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Работа курьером с гибким графиком.', views: 456, jobType: 'vacancy' },
  { title: 'Продавец-консультант в ТЦ «Гудвин»', price: '35 000 ₽', category: 'Работа', districtIdx: 2, daysAgo: 5, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 4, description: 'Работа продавцом в торговом центре.', views: 123, jobType: 'vacancy' },
  { title: 'Водитель категории B, личное авто', price: '55 000 ₽', category: 'Работа', districtIdx: 3, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Требуется водитель с личным автомобилем.', views: 189, jobType: 'vacancy' },
  { title: 'Резюме: бухгалтер, опыт 10 лет', price: '50 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 1, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Ищу работу бухгалтером, большой опыт.', views: 78, jobType: 'resume' },
  { title: 'Резюме: маркетолог, digital', price: '70 000 ₽', category: 'Работа', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 7, description: 'Специалист по digital-маркетингу ищет работу.', views: 112, jobType: 'resume' },
  { title: 'Разнорабочий на стройку, вахта', price: '80 000 ₽', category: 'Работа', districtIdx: 2, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 2, description: 'Работа вахтовым методом.', views: 234, jobType: 'parttime' },
  { title: 'Промоутер на выходные, 2 000 ₽/день', price: '2 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3, description: 'Подработка промоутером на выходные.', views: 198, jobType: 'parttime' },
  { title: 'Администратор в фитнес-клуб, подработка', price: '20 000 ₽', category: 'Работа', districtIdx: 1, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Подработка администратором.', views: 145, jobType: 'parttime' },
  { title: 'Программист Python / Django (удалённо)', price: '150 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 3, description: 'Удалённая работа для Python-разработчика.', views: 567, jobType: 'remote' },
  { title: 'Дизайнер UI/UX, удалённо', price: '120 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 2, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 0, description: 'Удалённая вакансия дизайнера интерфейсов.', views: 321, jobType: 'remote' },
  { title: 'Копирайтер, удалённая работа', price: '45 000 ₽', category: 'Работа', districtIdx: 2, daysAgo: 4, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Пишем тексты для сайтов и соцсетей, удалённо.', views: 156, jobType: 'remote' },

  // ===== Электроника (14) =====
  { title: 'iPhone 14 Pro Max 256 ГБ, идеал', price: '65 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 0, description: 'Телефон в идеальном состоянии.', views: 389, electronicsType: 'smartphones' },
  { title: 'Samsung Galaxy S24 Ultra, новый', price: '89 000 ₽', category: 'Электроника', districtIdx: 1, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3, description: 'Новый смартфон с гарантией.', views: 345, electronicsType: 'smartphones' },
  { title: 'Ноутбук ASUS VivoBook 15, i5/16 ГБ', price: '42 000 ₽', category: 'Электроника', districtIdx: 3, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Ноутбук для работы и учёбы.', views: 234, electronicsType: 'laptops' },
  { title: 'MacBook Air M2, 256 ГБ, на гарантии', price: '95 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 5, description: 'MacBook в отличном состоянии.', views: 289, electronicsType: 'laptops' },
  { title: 'ПК игровой RTX 4060, 32 ГБ RAM', price: '85 000 ₽', category: 'Электроника', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Мощный игровой компьютер.', views: 234, electronicsType: 'computers' },
  { title: 'Моноблок Apple iMac 24", M1', price: '110 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Моноблок Apple для дизайна.', views: 167, electronicsType: 'computers' },
  { title: 'Телевизор LG 55" 4K Smart TV', price: '35 000 ₽', category: 'Электроника', districtIdx: 3, daysAgo: 14, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Телевизор с функцией Smart TV.', views: 112, electronicsType: 'tv' },
  { title: 'Samsung 65" QLED, новый', price: '75 000 ₽', category: 'Электроника', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Новый телевизор с гарантией.', views: 198, electronicsType: 'tv' },
  { title: 'Фотоаппарат Canon EOS R50, kit', price: '75 000 ₽', category: 'Электроника', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Беззеркальный фотоаппарат с объективом.', views: 134, electronicsType: 'cameras' },
  { title: 'Экшн-камера GoPro Hero 12', price: '32 000 ₽', category: 'Электроника', districtIdx: 2, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 7, description: 'Экшн-камера в отличном состоянии.', views: 87, electronicsType: 'cameras' },
  { title: 'PlayStation 5 + 2 геймпада', price: '38 000 ₽', category: 'Электроника', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Игровая приставка с аксессуарами.', views: 278, electronicsType: 'gaming' },
  { title: 'Nintendo Switch OLED, комплект игр', price: '25 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Портативная консоль с играми.', views: 198, electronicsType: 'gaming' },
  { title: 'Колонка JBL Charge 5, новая', price: '12 000 ₽', category: 'Электроника', districtIdx: 1, daysAgo: 2, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 4, description: 'Портативная Bluetooth-колонка.', views: 156, electronicsType: 'audio' },
  { title: 'Наушники Sony WH-1000XM5', price: '22 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: false, top: true, imgIdx: 5, description: 'Наушники с шумоподавлением.', views: 223, electronicsType: 'audio' },

  // ===== Дом и дача (10) =====
  { title: 'Диван угловой раскладной, экокожа', price: '28 000 ₽', category: 'Дом и дача', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Угловой диван в хорошем состоянии.', views: 134, homeType: 'furniture' },
  { title: 'Кухонный гарнитур, белый глянец', price: '45 000 ₽', category: 'Дом и дача', districtIdx: 1, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Кухня в отличном состоянии.', views: 189, homeType: 'furniture' },
  { title: 'Стиральная машина Bosch, 7 кг', price: '18 000 ₽', category: 'Дом и дача', districtIdx: 2, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Стиральная машина в рабочем состоянии.', views: 98, homeType: 'appliances' },
  { title: 'Холодильник Samsung, No Frost, новый', price: '42 000 ₽', category: 'Дом и дача', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 3, description: 'Новый холодильник с гарантией.', views: 234, homeType: 'appliances' },
  { title: 'Люстра потолочная LED, современная', price: '5 500 ₽', category: 'Дом и дача', districtIdx: 3, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 4, description: 'LED люстра с пультом управления.', views: 67, homeType: 'lighting' },
  { title: 'Торшер напольный, дизайнерский', price: '3 800 ₽', category: 'Дом и дача', districtIdx: 1, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Дизайнерский напольный торшер.', views: 45, homeType: 'lighting' },
  { title: 'Ламинат 33 класс, 15 м², дуб', price: '8 500 ₽', category: 'Дом и дача', districtIdx: 2, daysAgo: 2, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 6, description: 'Ламинат влагостойкий, остаток.', views: 56, homeType: 'construction' },
  { title: 'Кирпич облицовочный, поддон 400 шт.', price: '12 000 ₽', category: 'Дом и дача', districtIdx: 3, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Облицовочный кирпич оптом.', views: 34, homeType: 'construction' },
  { title: 'Газонокосилка Bosch, бензиновая', price: '12 000 ₽', category: 'Дом и дача', districtIdx: 3, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 0, description: 'Газонокосилка в рабочем состоянии.', views: 78, homeType: 'garden' },
  { title: 'Набор садовых инструментов, 12 предметов', price: '3 500 ₽', category: 'Дом и дача', districtIdx: 2, daysAgo: 30, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Полный набор для сада и дачи.', views: 34, homeType: 'garden' },

  // ===== Детский мир (10) =====
  { title: 'Комбинезон зимний, 86 размер', price: '2 500 ₽', category: 'Детский мир', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Тёплый зимний комбинезон.', views: 89, kidsType: 'clothes' },
  { title: 'Пакет детской одежды 1-2 года', price: '1 800 ₽', category: 'Детский мир', districtIdx: 1, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Пакет одежды на мальчика.', views: 67, kidsType: 'clothes' },
  { title: 'Конструктор LEGO Technic, 1200 деталей', price: '4 500 ₽', category: 'Детский мир', districtIdx: 2, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 2, description: 'Конструктор LEGO в запечатанной коробке.', views: 234, kidsType: 'toys' },
  { title: 'Набор мягких игрушек, 5 шт.', price: '1 200 ₽', category: 'Детский мир', districtIdx: 3, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Мягкие игрушки в хорошем состоянии.', views: 45, kidsType: 'toys' },
  { title: 'Коляска Bugaboo Fox 3, универсальная', price: '35 000 ₽', category: 'Детский мир', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 4, description: 'Коляска 2 в 1 в отличном состоянии.', views: 178, kidsType: 'strollers' },
  { title: 'Коляска прогулочная Yoyo, складная', price: '18 000 ₽', category: 'Детский мир', districtIdx: 1, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Лёгкая прогулочная коляска.', views: 112, kidsType: 'strollers' },
  { title: 'Кроватка детская с маятником, б/у', price: '5 000 ₽', category: 'Детский мир', districtIdx: 2, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Кроватка в хорошем состоянии.', views: 56, kidsType: 'beds' },
  { title: 'Кроватка-трансформер 3 в 1', price: '12 000 ₽', category: 'Детский мир', districtIdx: 3, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Растёт вместе с ребёнком.', views: 98, kidsType: 'beds' },
  { title: 'Велосипед детский 16", с доп. колёсами', price: '4 000 ₽', category: 'Детский мир', districtIdx: 0, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Велосипед для ребёнка 4-7 лет.', views: 134, kidsType: 'transport' },
  { title: 'Самокат трёхколёсный, светящиеся колёса', price: '2 800 ₽', category: 'Детский мир', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Яркий самокат для малышей.', views: 167, kidsType: 'transport' },

  // ===== Животные (10) =====
  { title: 'Щенок лабрадора, мальчик, 3 мес.', price: '25 000 ₽', category: 'Животные', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'private', urgent: false, top: true, imgIdx: 0, description: 'Щенок с документами и прививками.', views: 345, animalType: 'dogs' },
  { title: 'Щенок корги, девочка, с родословной', price: '45 000 ₽', category: 'Животные', districtIdx: 1, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Щенок от титулованных родителей.', views: 278, animalType: 'dogs' },
  { title: 'Котёнок шотландский вислоухий', price: '15 000 ₽', category: 'Животные', districtIdx: 2, daysAgo: 1, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Котёнок 2 месяца, к лотку приучен.', views: 234, animalType: 'cats' },
  { title: 'Кошка мейн-кун, стерилизована', price: '20 000 ₽', category: 'Животные', districtIdx: 3, daysAgo: 3, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Кошка 1,5 года, ласковая.', views: 167, animalType: 'cats' },
  { title: 'Попугай корелла, ручной', price: '5 000 ₽', category: 'Животные', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Попугай ручной, разговаривает.', views: 123, animalType: 'birds' },
  { title: 'Волнистые попугаи, пара', price: '2 000 ₽', category: 'Животные', districtIdx: 1, daysAgo: 5, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Молодая пара попугаев.', views: 67, animalType: 'birds' },
  { title: 'Аквариум 200 л, с оборудованием', price: '12 000 ₽', category: 'Животные', districtIdx: 2, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Аквариум с фильтром и подсветкой.', views: 89, animalType: 'aquarium' },
  { title: 'Рыбки гуппи, 10 шт.', price: '500 ₽', category: 'Животные', districtIdx: 3, daysAgo: 7, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Гуппи разных окрасов.', views: 34, animalType: 'aquarium' },
  { title: 'Корм для собак Royal Canin, 15 кг', price: '5 500 ₽', category: 'Животные', districtIdx: 0, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Корм премиум-класса.', views: 156, animalType: 'pet_goods' },
  { title: 'Когтеточка-домик для кошки', price: '3 500 ₽', category: 'Животные', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 4, description: 'Многоуровневый домик с когтеточкой.', views: 98, animalType: 'pet_goods' },

  // ===== Хобби и отдых (10) =====
  { title: 'Велосипед горный Stels, 26"', price: '15 000 ₽', category: 'Хобби и отдых', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Горный велосипед в отличном состоянии.', views: 198, hobbyType: 'sport' },
  { title: 'Гантели разборные 2×20 кг', price: '6 000 ₽', category: 'Хобби и отдых', districtIdx: 1, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Набор разборных гантелей.', views: 134, hobbyType: 'sport' },
  { title: 'Палатка 4-местная, водонепроницаемая', price: '8 000 ₽', category: 'Хобби и отдых', districtIdx: 2, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: true, imgIdx: 1, description: 'Палатка для кемпинга.', views: 167, hobbyType: 'tourism' },
  { title: 'Рюкзак туристический 80 л', price: '4 500 ₽', category: 'Хобби и отдых', districtIdx: 3, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Вместительный рюкзак для походов.', views: 89, hobbyType: 'tourism' },
  { title: 'Спиннинг Shimano, катушка, набор блёсен', price: '7 000 ₽', category: 'Хобби и отдых', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Комплект для рыбалки.', views: 145, hobbyType: 'fishing' },
  { title: 'Лодка ПВХ 2-местная, без мотора', price: '12 000 ₽', category: 'Хобби и отдых', districtIdx: 3, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Лодка для рыбалки.', views: 78, hobbyType: 'fishing' },
  { title: 'Гитара акустическая Yamaha F310', price: '9 000 ₽', category: 'Хобби и отдых', districtIdx: 1, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Гитара с чехлом.', views: 123, hobbyType: 'music' },
  { title: 'Синтезатор Casio CTK-3500', price: '14 000 ₽', category: 'Хобби и отдых', districtIdx: 2, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Синтезатор с обучающим режимом.', views: 67, hobbyType: 'music' },
  { title: 'Монеты СССР, коллекция 50 шт.', price: '8 000 ₽', category: 'Хобби и отдых', districtIdx: 0, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Коллекция монет советского периода.', views: 56, hobbyType: 'collection' },
  { title: 'Марки почтовые, альбом 200 шт.', price: '3 000 ₽', category: 'Хобби и отдых', districtIdx: 1, daysAgo: 14, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Филателистический альбом.', views: 34, hobbyType: 'collection' },

  // ===== Отдам даром (8) =====
  { title: 'Одежда женская, пакетом, 44-46', price: '0 ₽', category: 'Отдам даром', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Отдам пакет женской одежды.', views: 234, freeType: 'clothes' },
  { title: 'Детские вещи 3-5 лет, мальчик', price: '0 ₽', category: 'Отдам даром', districtIdx: 1, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Одежда на мальчика, всё чистое.', views: 178, freeType: 'clothes' },
  { title: 'Стол письменный, самовывоз', price: '0 ₽', category: 'Отдам даром', districtIdx: 2, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: true, imgIdx: 1, description: 'Стол б/у, нужно забрать.', views: 312, freeType: 'furniture' },
  { title: 'Кресло-качалка, требует ремонта', price: '0 ₽', category: 'Отдам даром', districtIdx: 3, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Кресло для ремонта.', views: 89, freeType: 'furniture' },
  { title: 'Принтер HP, не печатает', price: '0 ₽', category: 'Отдам даром', districtIdx: 0, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Принтер на запчасти или ремонт.', views: 67, freeType: 'tech' },
  { title: 'Монитор 19", рабочий', price: '0 ₽', category: 'Отдам даром', districtIdx: 1, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Старый монитор, работает.', views: 145, freeType: 'tech' },
  { title: 'Корм для кошки, открытый пакет 3 кг', price: '0 ₽', category: 'Отдам даром', districtIdx: 2, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Не подошёл нашему коту.', views: 56, freeType: 'pets' },
  { title: 'Лежанка для собаки, большая', price: '0 ₽', category: 'Отдам даром', districtIdx: 3, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Лежанка б/у, чистая.', views: 78, freeType: 'pets' },
];

export const classifieds: Classified[] = raw.map((r, i) => ({
  id: i,
  title: r.title,
  price: r.price,
  numericPrice: extractNumericPrice(r.price),
  category: r.category,
  district: districts[r.districtIdx],
  date: dateLabel(r.daysAgo),
  daysAgo: r.daysAgo,
  condition: r.condition,
  sellerType: r.sellerType,
  urgent: r.urgent,
  top: r.top,
  image: images[r.category][r.imgIdx],
  hasImage: true,
  views: r.views,
  description: r.description,
  dealType: r.dealType,
  propertyType: r.propertyType,
  autoType: r.autoType,
  serviceType: r.serviceType,
  jobType: r.jobType,
  electronicsType: r.electronicsType,
  homeType: r.homeType,
  kidsType: r.kidsType,
  animalType: r.animalType,
  hobbyType: r.hobbyType,
  freeType: r.freeType,
}));
