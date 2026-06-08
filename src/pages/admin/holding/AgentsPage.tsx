import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_AGENTS, AGENT_ROLE_LABELS } from '@/data/mediaSystemData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Play, Pause, RotateCw } from 'lucide-react';
import { Input } from '@/components/ui/input';

const statusTone: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
};

const AgentsPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Bot className="w-6 h-6 text-primary" /> AI Агенты</h1>
          <p className="text-muted-foreground text-sm">{MOCK_AGENTS.length} агентов · {MOCK_AGENTS.filter(a=>a.status==='active').length} активных</p>
        </div>
        <Button size="sm"><Bot className="w-4 h-4 mr-1" /> Создать агента</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Поиск по имени или роли" className="max-w-xs h-9" />
      </div>
      <div className="bg-card border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Агент</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Модель</TableHead>
              <TableHead>Город</TableHead>
              <TableHead className="text-right">Публикаций</TableHead>
              <TableHead className="text-right">Качество</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Активность</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_AGENTS.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="text-xs">{AGENT_ROLE_LABELS[a.role]}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{a.provider} · {a.model}</TableCell>
                <TableCell className="text-xs">{a.cityId === 'all' ? 'все' : a.cityId}</TableCell>
                <TableCell className="text-right tabular-nums">{a.publications.toLocaleString('ru')}</TableCell>
                <TableCell className="text-right tabular-nums">{a.quality}%</TableCell>
                <TableCell><Badge className={statusTone[a.status]} variant="secondary">{a.status}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{a.lastRun}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Play className="w-3.5 h-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7"><Pause className="w-3.5 h-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7"><RotateCw className="w-3.5 h-3.5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </HoldingLayout>
);

export default AgentsPage;
