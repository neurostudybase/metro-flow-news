export interface Classified {
  id: number;
  title: string;
  price: string;
  category: string;
  district: string;
  date: string;
  daysAgo: number;
  condition: 'new' | 'used';
  sellerType: 'private' | 'company';
  urgent: boolean;
  top: boolean;
  image: string;
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

const districts = ['Центр', 'Восточный', 'Калининский', 'Ленинский', 'Тюменская область'];

function dateLabel(daysAgo: number): string {
  if (daysAgo === 0) return 'Сегодня';
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
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
}> = [
  // Недвижимость (8)
  { title: 'Квартира 2-к, 56 м², 5/9 эт., ул. Республики', price: '4 200 000 ₽', category: 'Недвижимость', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: true, imgIdx: 0 },
  { title: '1-к квартира, 38 м², новостройка с ремонтом', price: '3 150 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 1 },
  { title: 'Студия 24 м², рядом с ТЮмГУ', price: '2 400 000 ₽', category: 'Недвижимость', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 2 },
  { title: 'Дом 120 м² на участке 6 сот., п. Винзили', price: '6 800 000 ₽', category: 'Недвижимость', districtIdx: 4, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 3 },
  { title: '3-к квартира, 82 м², ул. Мельникайте', price: '7 900 000 ₽', category: 'Недвижимость', districtIdx: 3, daysAgo: 0, condition: 'used', sellerType: 'company', urgent: false, top: true, imgIdx: 4 },
  { title: 'Комната 18 м² в общежитии', price: '850 000 ₽', category: 'Недвижимость', districtIdx: 2, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5 },
  { title: 'Таунхаус 150 м², ЖК «Тюменский»', price: '12 500 000 ₽', category: 'Недвижимость', districtIdx: 1, daysAgo: 2, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 6 },
  { title: 'Участок 10 сот., с. Каменка', price: '1 200 000 ₽', category: 'Недвижимость', districtIdx: 4, daysAgo: 14, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 7 },

  // Авто (8)
  { title: 'Toyota Camry 2021, 45 000 км', price: '2 350 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 0 },
  { title: 'Kia Rio 2019, автомат, 1 владелец', price: '1 150 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1 },
  { title: 'Шины Michelin X-Ice 205/55 R16, комплект', price: '18 000 ₽', category: 'Авто', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2 },
  { title: 'ВАЗ 2114, 2008 г., на ходу', price: '95 000 ₽', category: 'Авто', districtIdx: 2, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 3 },
  { title: 'Hyundai Tucson 2023, дилерская гарантия', price: '3 200 000 ₽', category: 'Авто', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 4 },
  { title: 'Комплект литых дисков R17, универсальные', price: '22 000 ₽', category: 'Авто', districtIdx: 3, daysAgo: 10, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5 },
  { title: 'Skoda Octavia 2020, 1.4 TSI', price: '1 750 000 ₽', category: 'Авто', districtIdx: 4, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6 },
  { title: 'Детское автокресло Britax Römer', price: '8 500 ₽', category: 'Авто', districtIdx: 1, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 7 },

  // Услуги (8)
  { title: 'Репетитор по математике ЕГЭ/ОГЭ', price: '1 200 ₽/ч', category: 'Услуги', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 0 },
  { title: 'Ремонт квартир под ключ', price: 'от 5 000 ₽/м²', category: 'Услуги', districtIdx: 2, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 1 },
  { title: 'Клининг квартир и офисов', price: 'от 2 500 ₽', category: 'Услуги', districtIdx: 1, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 2 },
  { title: 'Установка кондиционеров с гарантией', price: '8 500 ₽', category: 'Услуги', districtIdx: 3, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3 },
  { title: 'Сантехник — вызов на дом', price: 'от 1 000 ₽', category: 'Услуги', districtIdx: 0, daysAgo: 5, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 4 },
  { title: 'Перевозка мебели, грузчики', price: 'от 3 000 ₽', category: 'Услуги', districtIdx: 4, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 5 },
  { title: 'Фотограф на свадьбу / мероприятие', price: '5 000 ₽/ч', category: 'Услуги', districtIdx: 0, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 6 },
  { title: 'Электрик — любая сложность', price: 'от 800 ₽', category: 'Услуги', districtIdx: 2, daysAgo: 14, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 7 },

  // Работа (8)
  { title: 'Менеджер по продажам, от 60 000 ₽', price: '60 000 ₽/мес', category: 'Работа', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 0 },
  { title: 'Курьер Яндекс.Еда, свободный график', price: 'от 45 000 ₽/мес', category: 'Работа', districtIdx: 1, daysAgo: 1, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 1 },
  { title: 'Разнорабочий на стройку, вахта', price: '80 000 ₽/мес', category: 'Работа', districtIdx: 4, daysAgo: 3, condition: 'new', sellerType: 'company', urgent: true, top: false, imgIdx: 2 },
  { title: 'Программист Python / Django (удалённо)', price: '150 000 ₽/мес', category: 'Работа', districtIdx: 0, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: true, imgIdx: 3 },
  { title: 'Продавец-консультант в ТЦ «Гудвин»', price: '35 000 ₽/мес', category: 'Работа', districtIdx: 2, daysAgo: 5, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 4 },
  { title: 'Водитель категории B, личное авто', price: '55 000 ₽/мес', category: 'Работа', districtIdx: 3, daysAgo: 2, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 5 },
  { title: 'Бухгалтер на полставки', price: '25 000 ₽/мес', category: 'Работа', districtIdx: 0, daysAgo: 10, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 6 },
  { title: 'Администратор в фитнес-клуб', price: '40 000 ₽/мес', category: 'Работа', districtIdx: 1, daysAgo: 7, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7 },

  // Электроника (8)
  { title: 'iPhone 14 Pro Max 256 ГБ, идеал', price: '65 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 0 },
  { title: 'Ноутбук ASUS VivoBook 15, i5/16 ГБ', price: '42 000 ₽', category: 'Электроника', districtIdx: 3, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1 },
  { title: 'PlayStation 5 + 2 геймпада', price: '38 000 ₽', category: 'Электроника', districtIdx: 2, daysAgo: 3, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2 },
  { title: 'Samsung Galaxy S24 Ultra, новый', price: '89 000 ₽', category: 'Электроника', districtIdx: 1, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 3 },
  { title: 'Наушники Sony WH-1000XM5', price: '22 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 4 },
  { title: 'MacBook Air M2, 256 ГБ, на гарантии', price: '95 000 ₽', category: 'Электроника', districtIdx: 0, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 5 },
  { title: 'Телевизор LG 55" 4K Smart TV', price: '35 000 ₽', category: 'Электроника', districtIdx: 4, daysAgo: 14, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 6 },
  { title: 'Робот-пылесос Xiaomi, новый в коробке', price: '15 000 ₽', category: 'Электроника', districtIdx: 3, daysAgo: 5, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7 },

  // Дом и дача (8)
  { title: 'Диван угловой раскладной, экокожа', price: '28 000 ₽', category: 'Дом и дача', districtIdx: 0, daysAgo: 0, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 0 },
  { title: 'Кухонный гарнитур, белый глянец', price: '45 000 ₽', category: 'Дом и дача', districtIdx: 1, daysAgo: 2, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 1 },
  { title: 'Комод IKEA Мальм, 6 ящиков', price: '8 500 ₽', category: 'Дом и дача', districtIdx: 2, daysAgo: 1, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 2 },
  { title: 'Рассада томатов и перцев, оптом', price: '50 ₽/шт', category: 'Дом и дача', districtIdx: 4, daysAgo: 3, condition: 'new', sellerType: 'private', urgent: false, top: false, imgIdx: 3 },
  { title: 'Газонокосилка Bosch, бензиновая', price: '12 000 ₽', category: 'Дом и дача', districtIdx: 3, daysAgo: 7, condition: 'used', sellerType: 'private', urgent: true, top: false, imgIdx: 4 },
  { title: 'Стол обеденный раздвижной, дуб', price: '18 000 ₽', category: 'Дом и дача', districtIdx: 0, daysAgo: 5, condition: 'used', sellerType: 'private', urgent: false, top: false, imgIdx: 5 },
  { title: 'Шкаф-купе с зеркалом, 2.2 м', price: '32 000 ₽', category: 'Дом и дача', districtIdx: 1, daysAgo: 0, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 6 },
  { title: 'Набор садовых инструментов, 12 предметов', price: '3 500 ₽', category: 'Дом и дача', districtIdx: 4, daysAgo: 30, condition: 'new', sellerType: 'company', urgent: false, top: false, imgIdx: 7 },
];

export const classifieds: Classified[] = raw.map((r, i) => ({
  id: i,
  title: r.title,
  price: r.price,
  category: r.category,
  district: districts[r.districtIdx],
  date: dateLabel(r.daysAgo),
  daysAgo: r.daysAgo,
  condition: r.condition,
  sellerType: r.sellerType,
  urgent: r.urgent,
  top: r.top,
  image: images[r.category][r.imgIdx],
}));
