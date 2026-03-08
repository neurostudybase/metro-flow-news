import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { AI_MODULE_LABELS } from '@/types/ai';
import { ScrollText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const resultColors: Record<string, string> = {
  success: 'bg-green-100 text-green-700',
  error: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

const AILogPage = () => {
  const { logs } = useAI();

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><ScrollText className="w-6 h-6 text-primary" /> Журнал AI</h1>
        <p className="text-muted-foreground mb-4">Полный журнал действий всех AI-модулей</p>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Время</TableHead>
                <TableHead>Модуль</TableHead>
                <TableHead>Действие</TableHead>
                <TableHead className="hidden md:table-cell">Детали</TableHead>
                <TableHead>Результат</TableHead>
                <TableHead className="hidden sm:table-cell">Подтвердил</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Журнал пуст</TableCell></TableRow>
              )}
              {logs.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(log.timestamp).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell className="text-xs">{AI_MODULE_LABELS[log.moduleId]}</TableCell>
                  <TableCell className="text-xs">{log.action}</TableCell>
                  <TableCell className="text-xs hidden md:table-cell max-w-[250px] truncate">{log.details}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${resultColors[log.result]}`}>{log.result === 'success' ? 'Успех' : log.result === 'error' ? 'Ошибка' : 'Ожидание'}</span></TableCell>
                  <TableCell className="text-xs hidden sm:table-cell">{log.approvedBy || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AILogPage;
