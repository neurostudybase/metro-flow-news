import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { useState } from 'react';
import { ClipboardList, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AI_MODULE_LABELS, AI_STATUS_LABELS, AI_PRIORITY_LABELS } from '@/types/ai';

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-purple-100 text-purple-700',
  needs_approval: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  completed: 'bg-muted text-muted-foreground',
};

const filters = ['all', 'new', 'in_progress', 'needs_approval', 'completed', 'rejected'] as const;
const filterLabels: Record<string, string> = { all: 'Все', new: 'Новые', in_progress: 'В работе', needs_approval: 'На подтверждении', completed: 'Завершённые', rejected: 'Отклонённые' };

const ControlTasksPage = () => {
  const { tasks, updateTaskStatus, deleteTask } = useAI();
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><ClipboardList className="w-6 h-6 text-primary" /> Задачи AI</h1>
        <p className="text-muted-foreground mb-4 text-sm">Управление всеми задачами AI-агентов</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map(f => (
            <Button key={f} size="sm" variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)} className="text-xs">
              {filterLabels[f]} {f !== 'all' && `(${tasks.filter(t => t.status === f).length})`}
            </Button>
          ))}
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Модуль</TableHead>
                <TableHead>Задача</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Нет задач</TableCell></TableRow>}
              {filtered.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="text-xs">{AI_MODULE_LABELS[t.moduleId]}</TableCell>
                  <TableCell className="text-sm">{t.description}</TableCell>
                  <TableCell className="text-xs">{AI_PRIORITY_LABELS[t.priority]}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[t.status]}`}>{AI_STATUS_LABELS[t.status]}</span></TableCell>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(t.createdAt).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {t.status === 'needs_approval' && (
                        <>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => updateTaskStatus(t.id, 'approved')}><CheckCircle className="w-3.5 h-3.5 text-green-600" /></Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => updateTaskStatus(t.id, 'rejected', 'Отклонено администратором')}><XCircle className="w-3.5 h-3.5 text-red-600" /></Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => deleteTask(t.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
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

export default ControlTasksPage;
