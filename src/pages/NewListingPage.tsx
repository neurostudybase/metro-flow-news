import CabinetLayout from '@/components/cabinet/CabinetLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NewListingPage = () => {
  return (
    <CabinetLayout>
      <div className="bg-card border border-border rounded-lg p-6">
        <h1 className="text-xl font-bold mb-6">Разместить объявление</h1>
        <form className="space-y-4 max-w-lg" onSubmit={e => e.preventDefault()}>
          <div>
            <Label>Категория</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Авто</SelectItem>
                <SelectItem value="realty">Недвижимость</SelectItem>
                <SelectItem value="services">Услуги</SelectItem>
                <SelectItem value="electronics">Электроника</SelectItem>
                <SelectItem value="other">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Заголовок</Label>
            <Input placeholder="Название объявления" />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea placeholder="Подробное описание..." rows={5} />
          </div>
          <div>
            <Label>Цена, ₽</Label>
            <Input type="number" placeholder="0" />
          </div>
          <div>
            <Label>Контактный телефон</Label>
            <Input placeholder="+7 (___) ___-__-__" />
          </div>
          <Button type="submit">Опубликовать</Button>
        </form>
      </div>
    </CabinetLayout>
  );
};

export default NewListingPage;
