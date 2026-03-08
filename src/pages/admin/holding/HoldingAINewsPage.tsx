import { useState } from 'react';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Bot } from 'lucide-react';
import { MOCK_HOLDING_NEWS, STATUS_LABELS, STATUS_COLORS } from '@/data/holdingData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const HoldingAINewsPage = () => {
  const { cities } = useCity();
  const { toast } = useToast();
  const [cityFilter, setCityFilter] = useState('all');
  const [items, setItems] = useState(MOCK_HOLDING_NEWS);

  const filtered = items.filter(n => {
    if (cityFilter !== 'all' && !n.cityIds.includes(cityFilter)) return false;
    return true;
  });

  const handlePublish = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, status: 'published' as const, publishedAt: new Date().toISOString().slice(0, 10) } : n));
    toast({ title: 'Опубликовано' });
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, status: 'rejected' as const } : n));
    toast({ title: 'Отклонено' });
  };

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" /> AI Очередь новостей
        </h1>
        <p className="text-muted-foreground mb-4">Центральная очередь AI-новостей по всем городам</p>

        <div className="flex gap-3 mb-4">
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Город" /></SelectTrigger>
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
                <TableHead>Заголовок</TableHead>
                <TableHead>Город</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(n => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium max-w-[300px] truncate">{n.title}</TableCell>
                  <TableCell className="text-xs">{n.cityIds.map(cid => cities.find(c => c.id === cid)?.name).join(', ')}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{n.source}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[n.status]}`}>{STATUS_LABELS[n.status]}</span>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {n.status !== 'published' && n.status !== 'rejected' && (
                      <>
                        <Button size="sm" variant="default" onClick={() => handlePublish(n.id)}>Опубликовать</Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(n.id)}>Отклонить</Button>
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

export default HoldingAINewsPage;
