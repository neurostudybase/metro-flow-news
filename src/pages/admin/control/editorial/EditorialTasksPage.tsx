import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ListTodo, Plus, CheckCircle, Clock, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EDITORIAL_TASKS, EditorialTask } from '@/data/editorialData';

const STATUS_LABELS = { pending: 'Ожидает', in_progress: 'В работе', done: 'Готово' };
const STATUS_COLORS = { pending: 'bg-muted text-muted-foreground', in_progress: 'bg-amber-100 text-amber-700', done: 'bg-green-100 text-green-700' };

const EditorialTasksPage = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(EDITORIAL_TASKS);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: `etk-${Date.now()}`, title: newTask, description: '', assignee: 'AI Редакция', status: 'pending', priority: 'medium', createdAt: new Date().toISOString() }]);
    setNewTask('');
    toast({ title: 'Задача создана' });
  };

  const updateStatus = (id: string, status: EditorialTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/control/editorial"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Редакция</Button></Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><ListTodo className="w-6 h-6 text-primary" /> Задачи редакции</h1>
              <p className="text-muted-foreground text-sm">AI и ручные задачи</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Новая задача для AI..." className="max-w-[400px]" onKeyDown={e => e.key === 'Enter' && addTask()} />
          <Button onClick={addTask}><Plus className="w-4 h-4 mr-1" /> Добавить</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['pending', 'in_progress', 'done'] as const).map(status => (
            <div key={status}>
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                {status === 'pending' && <Clock className="w-4 h-4" />}
                {status === 'in_progress' && <Bot className="w-4 h-4 text-amber-500" />}
                {status === 'done' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {STATUS_LABELS[status]} ({tasks.filter(t => t.status === status).length})
              </h3>
              <div className="space-y-2">
                {tasks.filter(t => t.status === status).map(t => (
                  <Card key={t.id}>
                    <CardContent className="p-3 space-y-2">
                      <div className="text-sm font-medium">{t.title}</div>
                      {t.description && <div className="text-xs text-muted-foreground">{t.description}</div>}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{t.assignee}</span>
                        <Badge variant={t.priority === 'high' ? 'destructive' : 'secondary'} className="text-[10px]">
                          {t.priority === 'high' ? '!' : t.priority === 'medium' ? '•' : '○'}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        {status === 'pending' && <Button size="sm" variant="outline" className="text-xs h-6 flex-1" onClick={() => updateStatus(t.id, 'in_progress')}>Начать</Button>}
                        {status === 'in_progress' && <Button size="sm" variant="outline" className="text-xs h-6 flex-1" onClick={() => updateStatus(t.id, 'done')}>Готово</Button>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorialTasksPage;
