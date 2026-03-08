import { useState } from 'react';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Shield } from 'lucide-react';
import { MOCK_MODERATION } from '@/data/holdingData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const TYPE_LABELS: Record<string, string> = { news: 'Новость', ad: 'Объявление', company: 'Компания', review: 'Отзыв' };

const HoldingModerationPage = () => {
  const { cities } = useCity();
  const { toast } = useToast();
  const [cityFilter, setCityFilter] = useState('all');
  const [items, setItems] = useState(MOCK_MODERATION);

  const filtered = items.filter(m => cityFilter === 'all' || m.cityId === cityFilter);

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(m => m.id === id ? { ...m, status: 'approved' as const } : m));
    toast({ title: 'Одобрено' });
  };
  const handleReject = (id: string) => {
    setItems(prev => prev.map(m => m.id === id ? { ...m, status: 'rejected' as const } : m));
    toast({ title: 'Отклонено' });
  };

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Центральная модерация
        </h1>
        <p className="text-muted-foreground mb-4">Модерация контента всех городов</p>

        <div className="flex gap-3 mb-4">
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
              {cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(m => (
                <TableRow key={m.id}>
                  <TableCell><Badge variant="outline">{TYPE_LABELS[m.type]}</Badge></TableCell>
                  <TableCell className="font-medium">{m.title}</TableCell>
                  <TableCell className="text-xs">{cities.find(c => c.id === m.cityId)?.name}</TableCell>
                  <TableCell>
                    <Badge variant={m.status === 'pending' ? 'secondary' : m.status === 'approved' ? 'default' : 'destructive'}>
                      {m.status === 'pending' ? 'Ожидает' : m.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {m.status === 'pending' && (
                      <>
                        <Button size="sm" variant="default" onClick={() => handleApprove(m.id)}>Одобрить</Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(m.id)}>Отклонить</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingModerationPage;
