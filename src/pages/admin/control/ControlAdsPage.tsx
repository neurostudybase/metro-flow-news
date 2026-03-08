import AdminLayout from '@/components/admin/AdminLayout';
import { useListings } from '@/contexts/ListingsContext';
import { useAI } from '@/contexts/AIContext';
import { FileText, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockAdsQueue = [
  { id: 'ad-1', title: 'Продам iPhone 15 Pro', author: 'user@mail.ru', category: 'Электроника', risk: 'low', aiStatus: 'safe', date: '2026-03-08' },
  { id: 'ad-2', title: 'Требуются курьеры, оплата ежедневно!!!', author: 'spam@test.com', category: 'Работа', risk: 'high', aiStatus: 'suspicious', date: '2026-03-08' },
  { id: 'ad-3', title: 'Квартира 2-комн., ул. Республики', author: 'realty@tmn.ru', category: 'Недвижимость', risk: 'low', aiStatus: 'safe', date: '2026-03-07' },
  { id: 'ad-4', title: 'ЗАРАБОТОК БЕЗ ВЛОЖЕНИЙ 100% ГАРАНТИЯ', author: 'scam@fake.ru', category: 'Услуги', risk: 'critical', aiStatus: 'spam', date: '2026-03-08' },
  { id: 'ad-5', title: 'Ремонт квартир под ключ', author: 'master72@mail.ru', category: 'Услуги', risk: 'low', aiStatus: 'safe', date: '2026-03-07' },
];

const riskColors: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  safe: 'Безопасно',
  suspicious: 'Подозрительно',
  spam: 'Спам',
  manual: 'Ручная проверка',
};

const ControlAdsPage = () => {
  const { createTask } = useAI();

  const runCheck = () => {
    createTask({ moduleId: 'moderation', type: 'ads_check', description: 'Проверка новых объявлений AI Moderation', status: 'new', priority: 'medium', needsApproval: false });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><FileText className="w-6 h-6 text-primary" /> AI Ads Moderation</h1>
            <p className="text-muted-foreground text-sm">Автоматическая проверка объявлений</p>
          </div>
          <Button size="sm" onClick={runCheck}>Проверить новые</Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold">{mockAdsQueue.length}</div><div className="text-xs text-muted-foreground">Всего</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-green-600">{mockAdsQueue.filter(a => a.aiStatus === 'safe').length}</div><div className="text-xs text-muted-foreground">Безопасно</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-yellow-600">{mockAdsQueue.filter(a => a.aiStatus === 'suspicious').length}</div><div className="text-xs text-muted-foreground">Подозрительно</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-xl font-bold text-red-600">{mockAdsQueue.filter(a => a.aiStatus === 'spam').length}</div><div className="text-xs text-muted-foreground">Спам</div></CardContent></Card>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Объявление</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Риск</TableHead>
                <TableHead>AI статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAdsQueue.map(ad => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <div className="text-sm font-medium">{ad.title}</div>
                    <div className="text-xs text-muted-foreground">{ad.author} · {ad.date}</div>
                  </TableCell>
                  <TableCell className="text-xs">{ad.category}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${riskColors[ad.risk]}`}>{ad.risk}</span></TableCell>
                  <TableCell><span className="text-xs">{statusLabels[ad.aiStatus]}</span></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><CheckCircle className="w-3.5 h-3.5 text-green-600" /></Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><XCircle className="w-3.5 h-3.5 text-red-600" /></Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Eye className="w-3.5 h-3.5" /></Button>
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

export default ControlAdsPage;
