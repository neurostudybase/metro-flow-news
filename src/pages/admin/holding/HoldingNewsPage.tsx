import { useState } from 'react';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Newspaper } from 'lucide-react';
import { MOCK_HOLDING_NEWS, STATUS_LABELS, STATUS_COLORS } from '@/data/holdingData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const CATEGORIES = ['Все', 'Новости', 'Город', 'Происшествия', 'Бизнес', 'Спорт', 'Культура', 'Общество'];

const HoldingNewsPage = () => {
  const { cities } = useCity();
  const [cityFilter, setCityFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('Все');

  const filtered = MOCK_HOLDING_NEWS.filter(n => {
    if (cityFilter !== 'all' && !n.cityIds.includes(cityFilter)) return false;
    if (catFilter !== 'Все' && n.category !== catFilter) return false;
    return true;
  });

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-primary" /> Центральная лента новостей
        </h1>
        <p className="text-muted-foreground mb-4">Все новости всех городов холдинга</p>

        <div className="flex gap-3 mb-4">
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Город" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Категория" /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(n => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium max-w-[300px] truncate">{n.title}</TableCell>
                  <TableCell className="text-xs">
                    {n.cityIds.map(cid => cities.find(c => c.id === cid)?.name).join(', ')}
                  </TableCell>
                  <TableCell className="text-xs">{n.category}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[n.status]}`}>
                      {STATUS_LABELS[n.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{n.createdAt}</TableCell>
                  <TableCell><Button size="sm" variant="outline">Открыть</Button></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Нет новостей</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingNewsPage;
