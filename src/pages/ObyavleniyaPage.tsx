import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { MapPin, Camera, User, Star, PlusCircle, Megaphone, Search, ChevronDown, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { classifieds } from '@/data/classifiedsData';
import { Checkbox } from '@/components/ui/checkbox';

const DISTRICTS = ['Центральный', 'Калининский', 'Ленинский', 'Восточный'];
const CATEGORIES = ['Недвижимость', 'Авто', 'Услуги', 'Работа', 'Электроника', 'Дом и дача'];
const PRICE_RANGES = [
  { label: 'До 1 000 ₽', min: 0, max: 1000 },
  { label: '1 000 – 10 000 ₽', min: 1000, max: 10000 },
  { label: '10 000 – 100 000 ₽', min: 10000, max: 100000 },
  { label: 'Более 100 000 ₽', min: 100000, max: Infinity },
];
const SELLER_TYPES = [
  { label: 'Частное лицо', value: 'private' as const },
  { label: 'Компания', value: 'company' as const },
];
const CONDITIONS = [
  { label: 'Новое', value: 'new' as const },
  { label: 'Б/у', value: 'used' as const },
];
const DATE_RANGES = [
  { label: 'Сегодня', maxDays: 0 },
  { label: '3 дня', maxDays: 3 },
  { label: '7 дней', maxDays: 7 },
  { label: '30 дней', maxDays: 30 },
];
const sortOptions = ['Сначала новые', 'Дешевле', 'Дороже', 'Популярные'];

const ObyavleniyaPage = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState(sortOptions[0]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Filter state
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [onlyWithPhoto, setOnlyWithPhoto] = useState(false);
  const [selectedSellerTypes, setSelectedSellerTypes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const hasAnyFilter = selectedDistricts.length > 0 || selectedCategories.length > 0 || selectedPriceRanges.length > 0 || onlyWithPhoto || selectedSellerTypes.length > 0 || selectedConditions.length > 0 || selectedDateRange !== null || searchQuery.trim() !== '';

  const resetFilters = useCallback(() => {
    setSelectedDistricts([]);
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setOnlyWithPhoto(false);
    setSelectedSellerTypes([]);
    setSelectedConditions([]);
    setSelectedDateRange(null);
    setSearchQuery('');
    setSortValue(sortOptions[0]);
  }, []);

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const toggleNumberArray = (arr: number[], val: number) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const filtered = useMemo(() => {
    let result = [...classifieds];
    const q = searchQuery.trim().toLowerCase();

    if (q) result = result.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    if (selectedDistricts.length > 0) result = result.filter(c => selectedDistricts.includes(c.district));
    if (selectedCategories.length > 0) result = result.filter(c => selectedCategories.includes(c.category));
    if (selectedPriceRanges.length > 0) {
      result = result.filter(c => selectedPriceRanges.some(idx => {
        const range = PRICE_RANGES[idx];
        return c.numericPrice >= range.min && c.numericPrice < (range.max === Infinity ? Infinity : range.max + 1);
      }));
    }
    if (onlyWithPhoto) result = result.filter(c => c.hasImage);
    if (selectedSellerTypes.length > 0) result = result.filter(c => selectedSellerTypes.includes(c.sellerType));
    if (selectedConditions.length > 0) result = result.filter(c => selectedConditions.includes(c.condition));
    if (selectedDateRange !== null) {
      const maxDays = DATE_RANGES[selectedDateRange].maxDays;
      result = result.filter(c => c.daysAgo <= maxDays);
    }

    // Sort
    switch (sortValue) {
      case 'Сначала новые': result.sort((a, b) => a.daysAgo - b.daysAgo); break;
      case 'Дешевле': result.sort((a, b) => a.numericPrice - b.numericPrice); break;
      case 'Дороже': result.sort((a, b) => b.numericPrice - a.numericPrice); break;
      case 'Популярные': result.sort((a, b) => b.views - a.views); break;
    }

    return result;
  }, [searchQuery, selectedDistricts, selectedCategories, selectedPriceRanges, onlyWithPhoto, selectedSellerTypes, selectedConditions, selectedDateRange, sortValue]);

  const handlePostClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/cabinet/new-listing');
    }
  };

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-5">

          {/* Left column — Filters */}
          <aside className="hidden lg:block space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-foreground">Фильтры</h2>
              {hasAnyFilter && (
                <button onClick={resetFilters} className="text-xs text-primary hover:underline">Сбросить</button>
              )}
            </div>

            {/* Локация */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Локация
              </h3>
              <ul className="space-y-1.5">
                {DISTRICTS.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={selectedDistricts.includes(d)}
                      onCheckedChange={() => setSelectedDistricts(prev => toggleArray(prev, d))}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Категория */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">Категория</h3>
              <ul className="space-y-1.5">
                {CATEGORIES.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={selectedCategories.includes(c)}
                      onCheckedChange={() => setSelectedCategories(prev => toggleArray(prev, c))}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Цена */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">Цена</h3>
              <ul className="space-y-1.5">
                {PRICE_RANGES.map((r, i) => (
                  <li key={r.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={selectedPriceRanges.includes(i)}
                      onCheckedChange={() => setSelectedPriceRanges(prev => toggleNumberArray(prev, i))}
                    />
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Только с фото */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Только с фото
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox checked={onlyWithPhoto} onCheckedChange={(v) => setOnlyWithPhoto(!!v)} />
                Да
              </div>
            </div>

            {/* Тип продавца */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Тип продавца
              </h3>
              <ul className="space-y-1.5">
                {SELLER_TYPES.map((s) => (
                  <li key={s.value} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={selectedSellerTypes.includes(s.value)}
                      onCheckedChange={() => setSelectedSellerTypes(prev => toggleArray(prev, s.value))}
                    />
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Состояние */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">Состояние</h3>
              <ul className="space-y-1.5">
                {CONDITIONS.map((c) => (
                  <li key={c.value} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={selectedConditions.includes(c.value)}
                      onCheckedChange={() => setSelectedConditions(prev => toggleArray(prev, c.value))}
                    />
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Дата публикации */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">Дата публикации</h3>
              <ul className="space-y-1.5">
                {DATE_RANGES.map((d, i) => (
                  <li key={d.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={selectedDateRange === i}
                      onCheckedChange={() => setSelectedDateRange(prev => prev === i ? null : i)}
                    />
                    {d.label}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Center — Listings */}
          <section>
            <h1 className="text-2xl font-bold text-foreground mb-1">Объявления Тюмени</h1>
            <p className="text-sm text-muted-foreground mb-4">Найдено {filtered.length} объявлений</p>

            {/* Search + Sort bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск по объявлениям"
                  className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <SortDropdown sortValue={sortValue} onSelect={(opt) => setSortValue(opt)} options={sortOptions} />
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <p className="text-foreground font-semibold mb-1">Ничего не найдено</p>
                <p className="text-sm text-muted-foreground mb-4">Попробуйте изменить параметры поиска</p>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <X className="w-4 h-4" />
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((card) => (
                  <Link to={`/obyavleniya/${card.id}`} key={card.id} className="bg-card rounded-lg border border-border overflow-hidden news-card cursor-pointer relative block">
                    {card.urgent && (
                      <span className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-[11px] font-bold px-2 py-0.5 rounded">
                        Срочно
                      </span>
                    )}
                    {card.top && (
                      <span className={`absolute top-2 ${card.urgent ? 'left-[70px]' : 'left-2'} z-10 bg-primary text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded`}>
                        Топ
                      </span>
                    )}
                    <div className="aspect-[4/3] bg-secondary overflow-hidden">
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-3.5 space-y-1">
                      <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2">{card.title}</h3>
                      <p className="text-primary font-bold text-lg">{card.price}</p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {card.district}
                        </span>
                        <span>{card.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Right column */}
          <aside className="hidden lg:block space-y-4">
            <button
              onClick={handlePostClick}
              className="w-full bg-primary text-primary-foreground font-semibold rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <PlusCircle className="w-5 h-5" />
              Разместить объявление
            </button>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-sm text-foreground">Продвинуть объявление</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Поднимите своё объявление в топ, чтобы его увидело больше людей.
              </p>
            </div>

            <div className="bg-secondary rounded-lg border border-border p-4 flex flex-col items-center justify-center min-h-[200px]">
              <Megaphone className="w-8 h-8 text-muted-foreground/40 mb-2" />
              <span className="text-xs text-muted-foreground">Рекламный блок</span>
            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
};

export default ObyavleniyaPage;
