import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_HUNTER_LOG } from '@/data/newsHunterData';

const actionColors: Record<string, string> = {
  'Поиск новостей': 'bg-blue-500/10 text-blue-700',
  'Анализ статьи': 'bg-cyan-500/10 text-cyan-700',
  'Переписывание': 'bg-orange-500/10 text-orange-700',
  'Отклонение': 'bg-destructive/10 text-destructive',
  'Черновик создан': 'bg-green-500/10 text-green-700',
  'Извлечение изображений': 'bg-purple-500/10 text-purple-700',
};

const NewsHunterLogPage = () => (
  <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Журнал AI News Hunter</h1>
          <p className="text-muted-foreground">История поиска и обработки новостей</p>
        </div>
        <Link to="/admin/control/news-hunter"><Button variant="outline" size="sm">← News Hunter</Button></Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Действие</TableHead>
                <TableHead>Запрос</TableHead>
                <TableHead>Результат</TableHead>
                <TableHead>Кол-во</TableHead>
                <TableHead>Детали</TableHead>
                <TableHead>Время</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_HUNTER_LOG.map(log => (
                <TableRow key={log.id}>
                  <TableCell><Badge className={actionColors[log.action] || 'bg-muted'}>{log.action}</Badge></TableCell>
                  <TableCell className="text-sm">{log.query ? `«${log.query}»` : '—'}</TableCell>
                  <TableCell className="text-sm">{log.result}</TableCell>
                  <TableCell className="text-sm font-medium">{log.count}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{log.details || '—'}</TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(log.timestamp).toLocaleString('ru')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
);

export default NewsHunterLogPage;
