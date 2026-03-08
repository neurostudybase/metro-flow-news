import AdminLayout from '@/components/admin/AdminLayout';
import { MOCK_AI_EDITOR_LOG } from '@/data/aiEditorData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const resultColors: Record<string, string> = {
  processed: 'bg-blue-100 text-blue-700',
  review: 'bg-orange-100 text-orange-700',
  rejected: 'bg-red-100 text-red-700',
  approved: 'bg-green-100 text-green-700',
};

const resultLabels: Record<string, string> = {
  processed: 'Обработано',
  review: 'На проверке',
  rejected: 'Отклонено',
  approved: 'Одобрено',
};

const AIEditorLogPage = () => (
  <AdminLayout>
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><ScrollText className="w-6 h-6 text-primary" /> Журнал AI Редактора</h1>
          <p className="text-muted-foreground">Все действия AI при обработке новостей</p>
        </div>
        <Link to="/admin/control/ai/editor"><Button variant="outline" size="sm">← Очередь</Button></Link>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Время</TableHead>
              <TableHead>Новость</TableHead>
              <TableHead>Действие</TableHead>
              <TableHead className="hidden md:table-cell">Детали</TableHead>
              <TableHead>Результат</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_AI_EDITOR_LOG.map(log => (
              <TableRow key={log.id}>
                <TableCell className="text-xs whitespace-nowrap">{new Date(log.timestamp).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</TableCell>
                <TableCell className="text-sm max-w-[200px] truncate">{log.itemTitle}</TableCell>
                <TableCell className="text-sm">{log.action}</TableCell>
                <TableCell className="text-xs hidden md:table-cell max-w-[250px] truncate">{log.details}</TableCell>
                <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${resultColors[log.result]}`}>{resultLabels[log.result]}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </AdminLayout>
);

export default AIEditorLogPage;
