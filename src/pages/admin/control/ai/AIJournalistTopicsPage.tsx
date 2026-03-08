import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MOCK_TOPICS, JournalistTopic, ArticleType, ARTICLE_TYPE_LABELS } from '@/data/aiJournalistData';

const AIJournalistTopicsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topics, setTopics] = useState<JournalistTopic[]>(MOCK_TOPICS);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<ArticleType>('compilation');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const topic: JournalistTopic = {
      id: `topic-${Date.now()}`, title: newTitle.trim(), description: newDesc.trim(),
      articleType: newType, enabled: true, createdAt: new Date().toISOString(),
    };
    setTopics(prev => [topic, ...prev]);
    setNewTitle(''); setNewDesc(''); setShowAdd(false);
    toast({ title: 'Тема добавлена' });
  };

  const toggleTopic = (id: string) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  const deleteTopic = (id: string) => {
    setTopics(prev => prev.filter(t => t.id !== id));
    toast({ title: 'Тема удалена' });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/control/ai/journalist')}><ArrowLeft className="h-4 w-4" /></Button>
            <div>
              <h1 className="text-2xl font-bold">Темы AI Журналиста</h1>
              <p className="text-muted-foreground">Управление темами для генерации статей</p>
            </div>
          </div>
          <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" /> Добавить тему</Button>
        </div>

        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Тема</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Активна</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topics.map(topic => (
                  <TableRow key={topic.id}>
                    <TableCell>
                      <div className="font-medium">{topic.title}</div>
                      <div className="text-xs text-muted-foreground">{topic.description}</div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{ARTICLE_TYPE_LABELS[topic.articleType]}</Badge></TableCell>
                    <TableCell><Switch checked={topic.enabled} onCheckedChange={() => toggleTopic(topic.id)} /></TableCell>
                    <TableCell><Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteTopic(topic.id)}><Trash2 className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogContent>
            <DialogHeader><DialogTitle>Новая тема</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1"><Label>Название</Label><Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Лучшие рестораны города" /></div>
              <div className="space-y-1"><Label>Описание</Label><Textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Подборка ресторанов..." /></div>
              <div className="space-y-1">
                <Label>Тип статьи</Label>
                <Select value={newType} onValueChange={(v: ArticleType) => setNewType(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(Object.entries(ARTICLE_TYPE_LABELS) as [ArticleType, string][]).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAdd} className="w-full">Добавить</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AIJournalistTopicsPage;
