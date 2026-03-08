import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockFrontEditorLog } from '@/data/aiFrontEditorData';

const AIFrontEditorLogPage = () => {
  const navigate = useNavigate();

  const resultBadge = (result: string) => {
    const map: Record<string, any> = { success: 'default', rejected: 'destructive', info: 'secondary' };
    const labels: Record<string, string> = { success: 'Успех', rejected: 'Отклонено', info: 'Инфо' };
    return <Badge variant={map[result]}>{labels[result]}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/control/ai/front-editor')}>
            <ArrowLeft className="h-4 w-4 mr-2" />Назад
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Журнал AI редактора главной</h1>
            <p className="text-muted-foreground">История действий AI по управлению главной страницей</p>
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle>Журнал действий</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Действие</TableHead>
                  <TableHead>Новость</TableHead>
                  <TableHead>Детали</TableHead>
                  <TableHead>Результат</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFrontEditorLog.map(entry => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-sm">{new Date(entry.timestamp).toLocaleString('ru')}</TableCell>
                    <TableCell className="font-medium">{entry.action}</TableCell>
                    <TableCell>{entry.newsTitle}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{entry.details}</TableCell>
                    <TableCell>{resultBadge(entry.result)}</TableCell>
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

export default AIFrontEditorLogPage;
