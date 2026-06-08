import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_AGENTS, AGENT_ROLE_LABELS } from '@/data/mediaSystemData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const AIPerformancePage = () => {
  const totalCreated = MOCK_AGENTS.reduce((s, a) => s + a.publications, 0);
  const totalApproved = MOCK_AGENTS.reduce((s, a) => s + a.approved, 0);
  const totalRejected = MOCK_AGENTS.reduce((s, a) => s + a.rejected, 0);
  const totalErrors = MOCK_AGENTS.reduce((s, a) => s + a.errors, 0);
  const avgQuality = Math.round(MOCK_AGENTS.reduce((s, a) => s + a.quality, 0) / MOCK_AGENTS.length);

  return (
    <HoldingLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Activity className="w-6 h-6 text-primary" /> AI Производительность</h1>
          <p className="text-muted-foreground text-sm">Мониторинг качества и активности каждого AI агента</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            ['Создано', totalCreated.toLocaleString('ru')],
            ['Одобрено', totalApproved.toLocaleString('ru')],
            ['Отклонено', totalRejected.toLocaleString('ru')],
            ['Среднее качество', `${avgQuality}%`],
            ['Ошибок', totalErrors],
          ].map(([l, v]) => (
            <div key={l as string} className="bg-card border border-border rounded-md p-3">
              <div className="text-[11px] uppercase text-muted-foreground tracking-wider">{l}</div>
              <div className="text-2xl font-bold tabular-nums mt-1">{v}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-md p-4">
          <h3 className="font-semibold text-sm mb-3">Публикации по агентам</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_AGENTS.map(a => ({ name: a.name, approved: a.approved, rejected: a.rejected }))}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="approved" fill="hsl(var(--primary))" stackId="a" />
                <Bar dataKey="rejected" fill="#ef4444" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Агент</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead className="text-right">Создано</TableHead>
                <TableHead className="text-right">Одобрено</TableHead>
                <TableHead className="text-right">Отклонено</TableHead>
                <TableHead>Качество</TableHead>
                <TableHead className="text-right">Ошибок</TableHead>
                <TableHead>Последний запуск</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_AGENTS.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell className="text-xs">{AGENT_ROLE_LABELS[a.role]}</TableCell>
                  <TableCell className="text-right tabular-nums">{a.publications.toLocaleString('ru')}</TableCell>
                  <TableCell className="text-right tabular-nums text-emerald-700">{a.approved.toLocaleString('ru')}</TableCell>
                  <TableCell className="text-right tabular-nums text-red-700">{a.rejected.toLocaleString('ru')}</TableCell>
                  <TableCell className="min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <Progress value={a.quality} className="h-1.5 w-20" />
                      <span className="text-xs tabular-nums">{a.quality}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{a.errors}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{a.lastRun}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default AIPerformancePage;
