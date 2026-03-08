import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Rss, Plus, Trash2, RefreshCw, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface NewsSource {
  id: string;
  name: string;
  type: 'rss' | 'api' | 'website';
  url: string;
  enabled: boolean;
  lastCheck: string;
  articlesFound: number;
}

const MOCK_SOURCES: NewsSource[] = [
  { id: 's-1', name: 'ТюменьПро', type: 'rss', url: 'https://tyumenpro.ru/rss', enabled: true, lastCheck: '2026-03-08T10:00:00', articlesFound: 45 },
  { id: 's-2', name: 'Культура72', type: 'rss', url: 'https://kultura72.ru/feed', enabled: true, lastCheck: '2026-03-08T09:00:00', articlesFound: 23 },
  { id: 's-3', name: 'Тюмень Сегодня', type: 'website', url: 'https://tyumen-today.ru', enabled: false, lastCheck: '2026-03-07T18:00:00', articlesFound: 12 },
  { id: 's-4', name: 'Новости API', type: 'api', url: 'https://api.news72.ru/v1/feed', enabled: true, lastCheck: '2026-03-08T10:30:00', articlesFound: 67 },
];

const TYPE_LABELS: Record<NewsSource['type'], string> = { rss: 'RSS', api: 'API', website: 'Сайт' };

const AINewsSourcesPage = () => {
  const [sources, setSources] = useState<NewsSource[]>(MOCK_SOURCES);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<NewsSource['type']>('rss');
  const [newUrl, setNewUrl] = useState('');
  const { toast } = useToast();

  const handleAdd = () => {
    if (!newName || !newUrl) { toast({ title: 'Заполните все поля', variant: 'destructive' }); return; }
    const source: NewsSource = { id: `s-${Date.now()}`, name: newName, type: newType, url: newUrl, enabled: true, lastCheck: '-', articlesFound: 0 };
    setSources(prev => [...prev, source]);
    setNewName(''); setNewUrl(''); setShowAdd(false);
    toast({ title: 'Источник добавлен', description: newName });
  };

  const handleToggle = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const handleDelete = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Источник удалён' });
  };

  const handleCheck = (s: NewsSource) => {
    setSources(prev => prev.map(src => src.id === s.id ? { ...src, lastCheck: new Date().toISOString(), articlesFound: src.articlesFound + Math.floor(Math.random() * 5) } : src));
    toast({ title: 'Проверка завершена', description: `Источник: ${s.name}` });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Link to="/admin/ai/news"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Назад</Button></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2"><Rss className="w-6 h-6 text-primary" /> Источники новостей</h1>
            <p className="text-muted-foreground text-sm">RSS, API и сайты для сбора новостей</p>
          </div>
          <Button size="sm" onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4 mr-1" /> Добавить источник</Button>
        </div>

        {showAdd && (
          <div className="bg-card border border-border rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[150px]">
              <label className="text-xs text-muted-foreground">Название</label>
              <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Название источника" className="h-8 text-sm mt-1" />
            </div>
            <div className="w-[120px]">
              <label className="text-xs text-muted-foreground">Тип</label>
              <Select value={newType} onValueChange={v => setNewType(v as NewsSource['type'])}>
                <SelectTrigger className="h-8 text-xs mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rss">RSS</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="website">Сайт</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-muted-foreground">URL</label>
              <Input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://..." className="h-8 text-sm mt-1" />
            </div>
            <Button size="sm" onClick={handleAdd}>Добавить</Button>
          </div>
        )}

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Последняя проверка</TableHead>
                <TableHead>Найдено</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium text-sm">{s.name}</TableCell>
                  <TableCell><span className="text-xs bg-muted px-2 py-0.5 rounded">{TYPE_LABELS[s.type]}</span></TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{s.url}</TableCell>
                  <TableCell>
                    {s.enabled ? (
                      <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Активен</span>
                    ) : (
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><XCircle className="w-3 h-3" /> Отключён</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{s.lastCheck === '-' ? '-' : new Date(s.lastCheck).toLocaleString('ru')}</TableCell>
                  <TableCell className="text-xs">{s.articlesFound}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleCheck(s)}><RefreshCw className="w-3 h-3 mr-1" /> Проверить</Button>
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleToggle(s.id)}>{s.enabled ? 'Откл.' : 'Вкл.'}</Button>
                      <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive" onClick={() => handleDelete(s.id)}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AINewsSourcesPage;
