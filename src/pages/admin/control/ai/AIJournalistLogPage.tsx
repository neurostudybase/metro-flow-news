import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MOCK_JOURNALIST_LOG, JournalistLogEntry } from '@/data/aiJournalistData';

const statusColor: Record<string, string> = {
  generated: 'bg-blue-100 text-blue-800',
  regenerated: 'bg-purple-100 text-purple-800',
  review: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  draft: 'bg-muted text-muted-foreground',
  rejected: 'bg-red-100 text-red-800',
};

const statusLabel: Record<string, string> = {
  generated: 'Сгенерировано',
  regenerated: 'Перегенерировано',
  review: 'На проверке',
  published: 'Опубликовано',
  draft: 'Черновик',
  rejected: 'Отклонено',
};

const AIJournalistLogPage = () => {
  const navigate = useNavigate();
  const [logs] = useState<JournalistLogEntry[]>(MOCK_JOURNALIST_LOG);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/control/ai/journalist')}><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold">Журнал AI Журналиста</h1>
            <p className="text-muted-foreground">История генерации и публикации статей</p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Статья</TableHead>
                  <TableHead>Город</TableHead>
                  <TableHead>Действие</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.articleTitle}</TableCell>
                    <TableCell>{log.cityName}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell><Badge className={statusColor[log.status] || ''}>{statusLabel[log.status] || log.status}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleString('ru')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AIJournalistLogPage;
