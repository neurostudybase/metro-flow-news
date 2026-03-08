import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Shield, AlertTriangle, Bot, UserX, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockRisks = [
  { id: 's-1', type: 'Спам-аккаунт', target: 'spam_user_42@fake.ru', severity: 'high', date: '2026-03-08 11:30', status: 'active' },
  { id: 's-2', type: 'Бот-активность', target: 'IP 185.22.xx.xx', severity: 'critical', date: '2026-03-08 10:15', status: 'active' },
  { id: 's-3', type: 'Массовые объявления', target: 'seller88@mail.ru', severity: 'medium', date: '2026-03-07 22:00', status: 'resolved' },
  { id: 's-4', type: 'Подозрительный логин', target: 'admin-fake@test.com', severity: 'high', date: '2026-03-08 09:45', status: 'active' },
  { id: 's-5', type: 'Аномальный трафик', target: 'IP 91.108.xx.xx', severity: 'medium', date: '2026-03-07 18:00', status: 'monitoring' },
];

const sevColors: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
};

const ControlSecurityPage = () => {
  const { createTask } = useAI();

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> AI Security</h1>
            <p className="text-muted-foreground text-sm">Антиспам, антибот, подозрительная активность</p>
          </div>
          <Button size="sm" onClick={() => createTask({ moduleId: 'security', type: 'scan', description: 'Полное сканирование безопасности', status: 'new', priority: 'high', needsApproval: false })}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Сканировать
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-red-600">{mockRisks.filter(r => r.status === 'active').length}</div><div className="text-xs text-muted-foreground">Активных угроз</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-orange-600">{mockRisks.filter(r => r.severity === 'critical').length}</div><div className="text-xs text-muted-foreground">Критических</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-yellow-600">{mockRisks.filter(r => r.status === 'monitoring').length}</div><div className="text-xs text-muted-foreground">На мониторинге</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-green-600">{mockRisks.filter(r => r.status === 'resolved').length}</div><div className="text-xs text-muted-foreground">Решено</div></CardContent></Card>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Угроза</TableHead>
                <TableHead>Цель</TableHead>
                <TableHead>Уровень</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRisks.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="text-sm font-medium">{r.type}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r.target}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${sevColors[r.severity]}`}>{r.severity}</span></TableCell>
                  <TableCell className="text-xs">{r.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="text-xs h-7">Детали</Button>
                      <Button size="sm" variant="destructive" className="text-xs h-7">Блокировать</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ControlSecurityPage;
