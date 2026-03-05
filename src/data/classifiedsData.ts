export type DealType = 'buy' | 'sell' | 'rent' | 'daily';
export type PropertyType = 'apartment' | 'house' | 'land' | 'garage' | 'commercial';
export type AutoType = 'car' | 'moto' | 'truck' | 'special' | 'water' | 'parts' | 'tires';
export type ServiceType = 'repair' | 'household' | 'beauty' | 'transport' | 'education' | 'it' | 'events';

export interface Classified {
  id: number;
  title: string;
  price: string;
  numericPrice: number; // for sorting/filtering
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
}

// Unsplash thumbnail URLs by category
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
}> = [
  // Недвижимость (16 — покрываем все подкатегории)
  { title: 'Квартира 2-к, 56 м², 5/9 эт., ул. Республики', price: '4 200 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: true, imgIdx: 0, description: 'Просторная двухкомнатная квартира в центре Тюмени.', views: 234, dealType: 'buy', propertyType: 'apartment' },
  { title: '1-к квартира, 38 м², новостройка с ремонтом', price: '3 150 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 1, description: 'Новая квартира с отделкой под ключ.', views: 189, dealType: 'sell', propertyType: 'apartment' },
  { title: 'Студия 24 м², рядом с ТЮмГУ — аренда', price: '18 000 ₽', category: 'Недвижимость', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 2, description: 'Сдаётся студия рядом с университетом.', views: 156, dealType: 'rent', propertyType: 'apartment' },
  { title: 'Квартира посуточно, центр, Wi-Fi', price: '2 500 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Квартира посуточно в центре города.', views: 312, dealType: 'daily', propertyType: 'apartment' },
  { title: 'Дом 120 м² на участке 6 сот.', price: '6 800 000 ₽', category: 'Недвижимость', districtIdx: 3, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Частный дом в Ленинском округе.', views: 98, dealType: 'buy', propertyType: 'house' },
  { title: 'Коттедж 200 м², п. Винзили', price: '9 500 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 2, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 5, description: 'Новый коттедж с участком.', views: 201, dealType: 'sell', propertyType: 'house' },
  { title: 'Участок 10 сот., ИЖС', price: '1 200 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 14, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Участок под строительство.', views: 67, dealType: 'buy', propertyType: 'land' },
  { title: 'Участок 15 сот. у озера', price: '2 100 000 ₽', category: 'Недвижимость', districtIdx: 3, daysAgo: 7, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 7, description: 'Участок с видом на озеро.', views: 45, dealType: 'sell', propertyType: 'land' },
  { title: 'Гараж 24 м², ГСК «Мотор»', price: '450 000 ₽', category: 'Недвижимость', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Кирпичный гараж с ямой.', views: 56, dealType: 'buy', propertyType: 'garage' },
  { title: 'Гараж в аренду, ул. 50 лет Октября', price: '5 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Сдаётся гараж в хорошем районе.', views: 34, dealType: 'rent', propertyType: 'garage' },
  { title: 'Офис 80 м², бизнес-центр «Сити»', price: '55 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Аренда офисного помещения.', views: 123, dealType: 'rent', propertyType: 'commercial' },
  { title: 'Торговое помещение 150 м², 1 этаж', price: '12 000 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 5, condition: 'used', sellerType: 'company', urgent: true, top: false, imgIdx: 3, description: 'Коммерческое помещение на первом этаже.', views: 178, dealType: 'sell', propertyType: 'commercial' },

  // Авто (14 — покрываем все подкатегории)
  { title: 'Toyota Camry 2021, 45 000 км', price: '2 350 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 0, description: 'Автомобиль в отличном состоянии.', views: 345, autoType: 'car' },
  { title: 'Kia Rio 2019, автомат, 1 владелец', price: '1 150 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Один владелец, полная история обслуживания.', views: 278, autoType: 'car' },
  { title: 'ВАЗ 2114, 2008 г., на ходу', price: '95 000 ₽', category: 'Авто', districtIdx: 2, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 3, description: 'Машина на ходу, торг уместен.', views: 134, autoType: 'car' },
  { title: 'Hyundai Tucson 2023, дилерская гарантия', price: '3 200 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 4, description: 'Новый автомобиль от официального дилера.', views: 456, autoType: 'car' },
  { title: 'Yamaha YZF-R3, 2022 г., 3 000 км', price: '650 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Спортивный мотоцикл в идеальном состоянии.', views: 198, autoType: 'moto' },
  { title: 'Скутер Honda PCX 125, 2021', price: '185 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 4, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Экономичный городской скутер.', views: 87, autoType: 'moto' },
  { title: 'ГАЗель Next, фургон, 2020 г.', price: '1 800 000 ₽', category: 'Авто', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Грузовой фургон для перевозок.', views: 112, autoType: 'truck' },
  { title: 'КАМАЗ 65115 самосвал, 2018 г.', price: '3 500 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 7, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 0, description: 'Самосвал в рабочем состоянии.', views: 76, autoType: 'truck' },
  { title: 'Экскаватор-погрузчик JCB 3CX', price: '4 200 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 10, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Спецтехника для строительных работ.', views: 45, autoType: 'special' },
  { title: 'Мини-погрузчик Bobcat S650', price: '2 900 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 5, condition: 'used', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Компактный погрузчик.', views: 34, autoType: 'special' },
  { title: 'Лодка ПВХ Ривьера 3200, мотор Yamaha 9.9', price: '180 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Лодка с мотором, готова к сезону.', views: 156, autoType: 'water' },
  { title: 'Катер Казанка 5М4, с прицепом', price: '350 000 ₽', category: 'Авто', districtIdx: 2, daysAgo: 14, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Моторный катер с прицепом.', views: 67, autoType: 'water' },
  { title: 'Двигатель 1.6 для Kia Rio, б/у', price: '45 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Контрактный двигатель с гарантией.', views: 89, autoType: 'parts' },
  { title: 'Фары LED для Toyota Camry XV70', price: '12 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 6, description: 'Новые светодиодные фары.', views: 43, autoType: 'parts' },
  { title: 'Шины Michelin X-Ice 205/55 R16, комплект', price: '18 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Новый комплект зимних шин.', views: 89, autoType: 'tires' },
  { title: 'Комплект литых дисков R17, универсальные', price: '22 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 10, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 7, description: 'Диски в хорошем состоянии.', views: 56, autoType: 'tires' },

  // Услуги (14)
  { title: 'Репетитор по математике ЕГЭ/ОГЭ', price: '1 200 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Подготовка к ЕГЭ и ОГЭ по математике.', views: 123, serviceType: 'education' },
  { title: 'Ремонт квартир под ключ', price: '5 000 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 1, description: 'Полный ремонт квартир любой сложности.', views: 267, serviceType: 'repair' },
  { title: 'Клининг квартир и офисов', price: '2 500 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Профессиональная уборка помещений.', views: 145, serviceType: 'household' },
  { title: 'Установка кондиционеров с гарантией', price: '8 500 ₽', category: 'Услуги', districtIdx: 3, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3, description: 'Установка и обслуживание кондиционеров.', views: 98, serviceType: 'repair' },
  { title: 'Сантехник — вызов на дом', price: '1 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 5, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Все виды сантехнических работ.', views: 78, serviceType: 'household' },
  { title: 'Перевозка мебели, грузчики', price: '3 000 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 5, description: 'Перевозка мебели по городу и области.', views: 112, serviceType: 'transport' },
  { title: 'Фотограф на свадьбу / мероприятие', price: '5 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Профессиональная фотосъёмка.', views: 89, serviceType: 'events' },
  { title: 'Электрик — любая сложность', price: '800 ₽', category: 'Услуги', districtIdx: 3, daysAgo: 14, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 7, description: 'Электромонтажные работы.', views: 56, serviceType: 'repair' },
  { title: 'Маникюр и педикюр на дому', price: '1 500 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Мастер маникюра с выездом на дом.', views: 134, serviceType: 'beauty' },
  { title: 'Массаж лечебный и расслабляющий', price: '2 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 4, condition: 'new', sellerType: 'private', urgent: false, top: true, imgIdx: 1, description: 'Сертифицированный массажист, выезд.', views: 201, serviceType: 'beauty' },
  { title: 'Создание сайтов и лендингов', price: '15 000 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 2, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2, description: 'Разработка сайтов под ключ.', views: 176, serviceType: 'it' },
  { title: 'Настройка рекламы Яндекс / VK', price: '10 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 6, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Контекстная и таргетированная реклама.', views: 92, serviceType: 'it' },
  { title: 'Ведущий на свадьбу, корпоратив', price: '12 000 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Организация праздников.', views: 67, serviceType: 'events' },
  { title: 'Грузоперевозки по Тюмени и области', price: '4 500 ₽', category: 'Услуги', districtIdx: 3, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 5, description: 'Газели и грузчики, быстро.', views: 155, serviceType: 'transport' },

  // Работа (8)
  { title: 'Менеджер по продажам, от 60 000 ₽', price: '60 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 0, description: 'Вакансия менеджера по продажам.', views: 345 },
  { title: 'Курьер Яндекс.Еда, свободный график', price: '45 000 ₽', category: 'Работа', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 1, description: 'Работа курьером с гибким графиком.', views: 456 },
  { title: 'Разнорабочий на стройку, вахта', price: '80 000 ₽', category: 'Работа', districtIdx: 2, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 2, description: 'Работа вахтовым методом.', views: 234 },
  { title: 'Программист Python / Django (удалённо)', price: '150 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 3, description: 'Удалённая работа для Python-разработчика.', views: 567 },
  { title: 'Продавец-консультант в ТЦ «Гудвин»', price: '35 000 ₽', category: 'Работа', districtIdx: 2, daysAgo: 5, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 4, description: 'Работа продавцом в торговом центре.', views: 123 },
  { title: 'Водитель категории B, личное авто', price: '55 000 ₽', category: 'Работа', districtIdx: 3, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Требуется водитель с личным автомобилем.', views: 189 },
  { title: 'Бухгалтер на полставки', price: '25 000 ₽', category: 'Работа', districtIdx: 0, daysAgo: 10, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 6, description: 'Бухгалтер на неполный рабочий день.', views: 78 },
  { title: 'Администратор в фитнес-клуб', price: '40 000 ₽', category: 'Работа', districtIdx: 1, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Работа администратором фитнес-клуба.', views: 145 },

  // Электроника (8)
  { title: 'iPhone 14 Pro Max 256 ГБ, идеал', price: '65 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 0, description: 'Телефон в идеальном состоянии.', views: 389 },
  { title: 'Ноутбук ASUS VivoBook 15, i5/16 ГБ', price: '42 000 ₽', category: 'Электроника', districtIdx: 3, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Ноутбук для работы и учёбы.', views: 234 },
  { title: 'PlayStation 5 + 2 геймпада', price: '38 000 ₽', category: 'Электроника', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Игровая приставка с аксессуарами.', views: 278 },
  { title: 'Samsung Galaxy S24 Ultra, новый', price: '89 000 ₽', category: 'Электроника', districtIdx: 1, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3, description: 'Новый смартфон с гарантией.', views: 345 },
  { title: 'Наушники Sony WH-1000XM5', price: '22 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4, description: 'Наушники с шумоподавлением.', views: 156 },
  { title: 'MacBook Air M2, 256 ГБ, на гарантии', price: '95 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 5, description: 'MacBook в отличном состоянии.', views: 289 },
  { title: 'Телевизор LG 55" 4K Smart TV', price: '35 000 ₽', category: 'Электроника', districtIdx: 3, daysAgo: 14, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6, description: 'Телевизор с функцией Smart TV.', views: 112 },
  { title: 'Робот-пылесос Xiaomi, новый в коробке', price: '15 000 ₽', category: 'Электроника', districtIdx: 2, daysAgo: 5, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Робот-пылесос в заводской упаковке.', views: 198 },

  // Дом и дача (8)
  { title: 'Диван угловой раскладной, экокожа', price: '28 000 ₽', category: 'Дом и дача', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0, description: 'Угловой диван в хорошем состоянии.', views: 134 },
  { title: 'Кухонный гарнитур, белый глянец', price: '45 000 ₽', category: 'Дом и дача', districtIdx: 1, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1, description: 'Кухня в отличном состоянии.', views: 189 },
  { title: 'Комод IKEA Мальм, 6 ящиков', price: '8 500 ₽', category: 'Дом и дача', districtIdx: 2, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2, description: 'Комод IKEA, почти новый.', views: 67 },
  { title: 'Рассада томатов и перцев, оптом', price: '50 ₽', category: 'Дом и дача', districtIdx: 3, daysAgo: 3, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 3, description: 'Рассада овощей оптом.', views: 45 },
  { title: 'Газонокосилка Bosch, бензиновая', price: '12 000 ₽', category: 'Дом и дача', districtIdx: 3, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 4, description: 'Газонокосилка в рабочем состоянии.', views: 78 },
  { title: 'Стол обеденный раздвижной, дуб', price: '18 000 ₽', category: 'Дом и дача', districtIdx: 0, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5, description: 'Обеденный стол из натурального дуба.', views: 98 },
  { title: 'Шкаф-купе с зеркалом, 2.2 м', price: '32 000 ₽', category: 'Дом и дача', districtIdx: 1, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 6, description: 'Новый шкаф-купе с зеркальными дверями.', views: 156 },
  { title: 'Набор садовых инструментов, 12 предметов', price: '3 500 ₽', category: 'Дом и дача', districtIdx: 2, daysAgo: 30, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7, description: 'Полный набор для сада и дачи.', views: 34 },
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
}));
