import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CabinetLayout from '@/components/cabinet/CabinetLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useListings } from '@/contexts/ListingsContext';
import { ImagePlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categorySubcategories: Record<string, string[]> = {
  'Недвижимость': ['Квартиры', 'Дома', 'Комнаты', 'Участки', 'Коммерческая'],
  'Авто': ['Легковые', 'Запчасти', 'Шины и диски', 'Аксессуары'],
  'Услуги': ['Ремонт', 'Обучение', 'Красота', 'Транспорт', 'Клининг', 'Другое'],
  'Работа': ['Вакансии', 'Резюме', 'Подработка'],
  'Электроника': ['Телефоны', 'Ноутбуки', 'ТВ и аудио', 'Игры', 'Аксессуары'],
  'Дом и дача': ['Мебель', 'Сад и огород', 'Инструменты', 'Декор'],
};

const districts = ['Центр', 'Восточный', 'Калининский', 'Ленинский', 'Тюменская область'];

const NewListingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addListing } = useListings();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [district, setDistrict] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'new' | 'used'>('new');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [sellerType, setSellerType] = useState<'private' | 'company'>('private');
  const [phone, setPhone] = useState(user?.phone || '');

  const subcategories = category ? categorySubcategories[category] || [] : [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 10 - images.length;
    const toProcess = Array.from(files).slice(0, remaining);
    toProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => prev.length < 10 ? [...prev, reader.result as string] : prev);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (asDraft: boolean) => {
    if (!asDraft && (!category || !title || !price)) {
      toast({ title: 'Заполните обязательные поля', description: 'Категория, заголовок и цена обязательны', variant: 'destructive' });
      return;
    }
    addListing({
      category,
      subcategory,
      district,
      title,
      price: price ? `${price} ₽` : '',
      condition,
      description,
      images,
      sellerType,
      phone,
      status: asDraft ? 'draft' : 'moderation',
      authorEmail: user?.email || '',
    });
    toast({ title: asDraft ? 'Черновик сохранён' : 'Объявление отправлено на модерацию' });
    navigate('/cabinet/ads');
  };

  return (
    <CabinetLayout>
      <div className="bg-card border border-border rounded-lg p-6">
        <h1 className="text-xl font-bold mb-6">Разместить объявление</h1>
        <div className="space-y-5 max-w-xl">
          {/* Категория */}
          <div className="space-y-1.5">
            <Label>Категория *</Label>
            <Select value={category} onValueChange={v => { setCategory(v); setSubcategory(''); }}>
              <SelectTrigger><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
              <SelectContent>
                {Object.keys(categorySubcategories).map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Подкатегория */}
          {subcategories.length > 0 && (
            <div className="space-y-1.5">
              <Label>Подкатегория</Label>
              <Select value={subcategory} onValueChange={setSubcategory}>
                <SelectTrigger><SelectValue placeholder="Выберите подкатегорию" /></SelectTrigger>
                <SelectContent>
                  {subcategories.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Район */}
          <div className="space-y-1.5">
            <Label>Район / Город</Label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger><SelectValue placeholder="Выберите район" /></SelectTrigger>
              <SelectContent>
                {districts.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Заголовок */}
          <div className="space-y-1.5">
            <Label>Заголовок *</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Название объявления" maxLength={100} />
          </div>

          {/* Цена */}
          <div className="space-y-1.5">
            <Label>Цена, ₽ *</Label>
            <Input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="0" />
          </div>

          {/* Состояние */}
          <div className="space-y-1.5">
            <Label>Состояние</Label>
            <Select value={condition} onValueChange={v => setCondition(v as 'new' | 'used')}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Новое</SelectItem>
                <SelectItem value="used">Б/у</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Описание */}
          <div className="space-y-1.5">
            <Label>Описание</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Подробное описание..." rows={5} maxLength={2000} />
          </div>

          {/* Фото */}
          <div className="space-y-1.5">
            <Label>Фото (до 10)</Label>
            <div className="flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-md overflow-hidden border border-border">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-0.5 right-0.5 bg-background/80 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {images.length < 10 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <ImagePlus className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5">{images.length}/10</span>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </div>

          {/* Продавец */}
          <div className="space-y-1.5">
            <Label>Тип продавца</Label>
            <Select value={sellerType} onValueChange={v => setSellerType(v as 'private' | 'company')}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Частное лицо</SelectItem>
                <SelectItem value="company">Компания</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Телефон */}
          <div className="space-y-1.5">
            <Label>Контактный телефон</Label>
            <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" />
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-2">
            <Button onClick={() => handleSubmit(false)}>Опубликовать</Button>
            <Button variant="outline" onClick={() => handleSubmit(true)}>Сохранить черновик</Button>
          </div>
        </div>
      </div>
    </CabinetLayout>
  );
};

export default NewListingPage;
