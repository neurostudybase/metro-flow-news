import HoldingLayout from '@/components/holding/HoldingLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_MOD_QUEUE, ModerationQueueItem } from '@/data/mediaSystemData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Check, X } from 'lucide-react';

const types: { id: ModerationQueueItem['type'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'spam', label: 'Спам' },
  { id: 'duplicate', label: 'Дубликаты' },
  { id: 'low_quality', label: 'Низкое качество' },
  { id: 'suspicious', label: 'Подозрительный' },
];

const Row = ({ item }: { item: ModerationQueueItem }) => (
  <TableRow>
    <TableCell><Badge variant="outline" className="text-xs">{item.type}</Badge></TableCell>
    <TableCell className="font-medium">{item.title}</TableCell>
    <TableCell className="text-xs">{item.cityId}</TableCell>
    <TableCell className="text-right tabular-nums">{item.score}%</TableCell>
    <TableCell className="text-xs text-muted-foreground">{item.createdAt}</TableCell>
    <TableCell className="text-right">
      <Button size="sm" variant="ghost" className="h-7"><Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Одобрить</Button>
      <Button size="sm" variant="ghost" className="h-7"><X className="w-3.5 h-3.5 mr-1 text-red-600" /> Отклонить</Button>
    </TableCell>
  </TableRow>
);

const HoldingModerationPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> Центр модерации</h1>
        <p className="text-muted-foreground text-sm">{MOCK_MOD_QUEUE.length} элементов в очереди</p>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          {types.map(t => <TabsTrigger key={t.id} value={t.id} className="text-xs">{t.label}</TabsTrigger>)}
        </TabsList>
        {types.map(t => (
          <TabsContent key={t.id} value={t.id}>
            <div className="bg-card border border-border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Тип</TableHead>
                    <TableHead>Заголовок</TableHead>
                    <TableHead>Город</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead>Создано</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_MOD_QUEUE.filter(m => t.id === 'all' || m.type === t.id).map(m => <Row key={m.id} item={m} />)}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  </HoldingLayout>
);

export default HoldingModerationPage;
