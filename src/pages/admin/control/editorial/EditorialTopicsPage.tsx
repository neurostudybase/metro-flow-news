import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Tag, Plus, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EDITORIAL_TOPICS, EditorialTopic } from '@/data/editorialData';

const EditorialTopicsPage = () => {
  const { toast } = useToast();
  const [topics, setTopics] = useState(EDITORIAL_TOPICS);
  const [newName, setNewName] = useState('');

  const toggleTopic = (id: string) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  const addTopic = () => {
    if (!newName.trim()) return;
    setTopics(prev => [...prev, { id: `et-${Date.now()}`, name: newName, description: '', category: 'Новости', priority: 'medium', articlesCount: 0, isActive: true }]);
    setNewName('');
    toast({ title: 'Тема добавлена' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/control/editorial"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Редакция</Button></Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><Tag className="w-6 h-6 text-primary" /> Темы редакции</h1>
              <p className="text-muted-foreground text-sm">Тематические направления для контента</p>
            </div>
          </div>
          <Button size="sm" onClick={() => toast({ title: 'AI генерирует новости по всем темам...' })}><Bot className="w-4 h-4 mr-1" /> AI по всем темам</Button>
        </div>

        <div className="flex gap-2">
          <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Новая тема..." className="max-w-[300px]" onKeyDown={e => e.key === 'Enter' && addTopic()} />
          <Button variant="outline" onClick={addTopic}><Plus className="w-4 h-4 mr-1" /> Добавить</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map(t => (
            <Card key={t.id} className={!t.isActive ? 'opacity-50' : ''}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{t.name}</h3>
                  <Switch checked={t.isActive} onCheckedChange={() => toggleTopic(t.id)} />
                </div>
                {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{t.category}</Badge>
                  <Badge variant={t.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {t.priority === 'high' ? 'Высокий' : t.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{t.articlesCount} статей</span>
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => toast({ title: `AI: генерация по теме «${t.name}»` })}><Bot className="w-3 h-3 mr-1" /> AI</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditorialTopicsPage;
