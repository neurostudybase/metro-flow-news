import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_SCHEDULE } from '@/data/mediaSystemData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Plus, Zap, Calendar as CalIcon, Repeat } from 'lucide-react';

const modeIcon = (m: string) => m === 'immediate' ? <Zap className="w-3 h-3" /> : m === 'recurring' ? <Repeat className="w-3 h-3" /> : <CalIcon className="w-3 h-3" />;

const SchedulerPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Clock className="w-6 h-6 text-primary" /> Планировщик публикаций</h1>
          <p className="text-muted-foreground text-sm">Immediate · Scheduled · Recurring</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Новая задача</Button>
      </div>
      <div className="bg-card border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Задача</TableHead>
              <TableHead>Город</TableHead>
              <TableHead>Режим</TableHead>
              <TableHead>Когда</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_SCHEDULE.map(s => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="text-xs">{s.cityId}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs gap-1">{modeIcon(s.mode)} {s.mode}</Badge>
                </TableCell>
                <TableCell className="text-xs">{s.runAt}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" className="h-7">Запустить</Button>
                  <Button size="sm" variant="ghost" className="h-7">Отменить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </HoldingLayout>
);

export default SchedulerPage;
