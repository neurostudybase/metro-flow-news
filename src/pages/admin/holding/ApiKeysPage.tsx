import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_API_KEYS } from '@/data/mediaSystemData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { KeyRound, Plus, RotateCw, FlaskConical } from 'lucide-react';

const tone: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  disabled: 'bg-muted text-muted-foreground',
  invalid: 'bg-red-100 text-red-700',
};

const ApiKeysPage = () => {
  const totalCost = MOCK_API_KEYS.reduce((s, k) => s + k.costUsd, 0);
  const totalReq = MOCK_API_KEYS.reduce((s, k) => s + k.dailyRequests, 0);

  return (
    <HoldingLayout>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><KeyRound className="w-6 h-6 text-primary" /> AI API ключи</h1>
            <p className="text-muted-foreground text-sm">8 провайдеров · {totalReq.toLocaleString('ru')} запросов сегодня · ${totalCost.toFixed(2)}</p>
          </div>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Добавить ключ</Button>
        </div>

        <div className="bg-card border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Провайдер</TableHead>
                <TableHead>Модель</TableHead>
                <TableHead>Ключ</TableHead>
                <TableHead className="text-right">Запросов</TableHead>
                <TableHead className="text-right">Токенов</TableHead>
                <TableHead>Использование $</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_API_KEYS.map(k => {
                const pct = Math.min(100, Math.round((k.costUsd / k.limitUsd) * 100));
                return (
                  <TableRow key={k.id}>
                    <TableCell className="font-medium">{k.provider}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{k.model}</TableCell>
                    <TableCell className="font-mono text-xs">{k.key}</TableCell>
                    <TableCell className="text-right tabular-nums">{k.dailyRequests.toLocaleString('ru')}</TableCell>
                    <TableCell className="text-right tabular-nums">{(k.tokens/1_000_000).toFixed(2)}M</TableCell>
                    <TableCell className="min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="h-1.5 w-24" />
                        <span className="text-xs tabular-nums">${k.costUsd.toFixed(2)} / ${k.limitUsd}</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="secondary" className={tone[k.status]}>{k.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="h-7"><FlaskConical className="w-3.5 h-3.5 mr-1" /> Тест</Button>
                      <Button size="sm" variant="ghost" className="h-7"><RotateCw className="w-3.5 h-3.5 mr-1" /> Ротация</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="text-xs text-muted-foreground">Внимание: для реального хранения ключей подключите Lovable Cloud (Supabase secrets). В текущем макете значения только для просмотра.</div>
      </div>
    </HoldingLayout>
  );
};

export default ApiKeysPage;
