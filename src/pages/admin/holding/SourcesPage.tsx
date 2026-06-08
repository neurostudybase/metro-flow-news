import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_SOURCES } from '@/data/mediaSystemData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Radio, Plus } from 'lucide-react';

const typeLabel: Record<string, string> = { rss: 'RSS', manual: 'Ручной', ai: 'AI', partner: 'Партнёр', newsroom: 'Редакция' };

const SourcesPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Radio className="w-6 h-6 text-primary" /> Источники контента</h1>
          <p className="text-muted-foreground text-sm">{MOCK_SOURCES.length} активных каналов · {MOCK_SOURCES.reduce((s,x)=>s+x.itemsToday,0)} материалов сегодня</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Добавить источник</Button>
      </div>
      <div className="bg-card border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Источник</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Город</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Последняя выгрузка</TableHead>
              <TableHead className="text-right">Материалов сегодня</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_SOURCES.map(s => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{typeLabel[s.type]}</Badge></TableCell>
                <TableCell className="text-xs">{s.cityId}</TableCell>
                <TableCell className="text-xs">{s.category}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={s.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-muted'}>{s.status}</Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{s.lastFetch}</TableCell>
                <TableCell className="text-right tabular-nums">{s.itemsToday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </HoldingLayout>
);

export default SourcesPage;
