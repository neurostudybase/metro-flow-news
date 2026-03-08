import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { AI_STATUS_LABELS, AI_PRIORITY_LABELS, AITaskStatus } from '@/types/ai';
import { AI_MODULE_LABELS } from '@/types/ai';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { ListTodo, Check, X, RotateCcw, Trash2, Eye } from 'lucide-react';

const FILTERS: { label: string; value: AITaskStatus | 'all' }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Новые', value: 'new' },
  { label: 'В работе', value: 'in_progress' },
  { label: 'На подтверждении', value: 'needs_approval' },
  { label: 'Завершённые', value: 'completed' },
  { label: 'Отклонённые', value: 'rejected' },
];

const statusColors: Record<AITaskStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  needs_approval: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  completed: 'bg-green-100 text-green-700',
};

const priorityColors: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-blue-100 text-blue-600',
  high: 'bg-orange-100 text-orange-600',
  critical: 'bg-red-100 text-red-600',
};

const AITasksPage = () => {
  const { tasks, updateTaskStatus, deleteTask } = useAI();
  const [filter, setFilter] = useState<AITaskStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><ListTodo className="w-6 h-6 text-primary" /> Задачи AI</h1>
        <p className="text-muted-foreground mb-4">Управление задачами всех AI-модулей</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {FILTERS.map(f => (
            <Button key={f.value} size="sm" variant={filter === f.value ? 'default' : 'outline'} onClick={() => setFilter(f.value)} className="text-xs">
              {f.label}
              {f.value !== 'all' && <span className="ml-1 opacity-70">({tasks.filter(t => t.status === f.value).length})</span>}
            </Button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Модуль</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead className="hidden md:table-cell">Описание</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="hidden sm:table-cell">Приоритет</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Нет задач</TableCell></TableRow>
              )}
              {filtered.map(task => (
                <>
                  <TableRow key={task.id}>
                    <TableCell className="font-mono text-xs">{task.id.replace('task-', '#')}</TableCell>
                    <TableCell className="text-xs">{AI_MODULE_LABELS[task.moduleId]}</TableCell>
                    <TableCell className="text-xs">{task.type}</TableCell>
                    <TableCell className="text-xs hidden md:table-cell max-w-[200px] truncate">{task.description}</TableCell>
                    <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>{AI_STATUS_LABELS[task.status]}</span></TableCell>
                    <TableCell className="hidden sm:table-cell"><span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>{AI_PRIORITY_LABELS[task.priority]}</span></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setExpandedId(expandedId === task.id ? null : task.id)}><Eye className="w-3 h-3" /></Button>
                        {task.status === 'needs_approval' && (
                          <>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600" onClick={() => updateTaskStatus(task.id, 'approved')}><Check className="w-3 h-3" /></Button>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-600" onClick={() => updateTaskStatus(task.id, 'rejected', 'Отклонено администратором')}><X className="w-3 h-3" /></Button>
                          </>
                        )}
                        {task.status === 'rejected' && (
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => updateTaskStatus(task.id, 'new')}><RotateCcw className="w-3 h-3" /></Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => deleteTask(task.id)}><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === task.id && (
                    <TableRow key={`${task.id}-detail`}>
                      <TableCell colSpan={7} className="bg-muted/30">
                        <div className="text-xs space-y-1 p-2">
                          <p><strong>Описание:</strong> {task.description}</p>
                          {task.result && <p><strong>Результат:</strong> {task.result}</p>}
                          {task.approvedBy && <p><strong>Подтверждено:</strong> {task.approvedBy} ({task.approvedAt})</p>}
                          {task.rejectedReason && <p><strong>Причина отклонения:</strong> {task.rejectedReason}</p>}
                          <p><strong>Создано:</strong> {task.createdAt} | <strong>Обновлено:</strong> {task.updatedAt}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AITasksPage;
