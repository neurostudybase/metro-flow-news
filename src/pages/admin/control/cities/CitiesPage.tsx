import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Globe, Plus, Pencil, Power, PowerOff, Trash2, MapPin, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCity } from '@/contexts/CityContext';
import { City } from '@/data/citiesData';

const STATUS_LABELS: Record<City['status'], string> = { active: 'Активен', setup: 'Настройка', disabled: 'Отключён' };
const STATUS_COLORS: Record<City['status'], string> = { active: 'bg-green-100 text-green-700', setup: 'bg-amber-100 text-amber-700', disabled: 'bg-muted text-muted-foreground' };

const CitiesPage = () => {
  const { toast } = useToast();
  const { cities, addCity, updateCity, removeCity } = useCity();
  const [showAdd, setShowAdd] = useState(false);
  const [editCity, setEditCity] = useState<City | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', domain: '', region: '', country: 'Россия', timezone: 'Europe/Moscow' });

  const resetForm = () => setForm({ name: '', slug: '', domain: '', region: '', country: 'Россия', timezone: 'Europe/Moscow' });

  const handleAdd = () => {
    if (!form.name || !form.slug || !form.domain) { toast({ title: 'Заполните все поля', variant: 'destructive' }); return; }
    addCity({ ...form, id: form.slug, status: 'setup', searchKeywords: [`${form.name} новости`, `происшествия ${form.name}`, `${form.name} сегодня`] });
    toast({ title: '✅ Город добавлен', description: form.name });
    resetForm();
    setShowAdd(false);
  };

  const handleToggle = (city: City) => {
    const newStatus = city.status === 'active' ? 'disabled' : 'active';
    updateCity(city.id, { status: newStatus });
    toast({ title: newStatus === 'active' ? '✅ Портал активирован' : '⏸ Портал отключён', description: city.name });
  };

  const handleDelete = (city: City) => {
    removeCity(city.id);
    toast({ title: '🗑 Город удалён', description: city.name });
  };

  const handleSaveEdit = () => {
    if (!editCity) return;
    updateCity(editCity.id, editCity);
    setEditCity(null);
    toast({ title: '✅ Сохранено' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /> Сеть порталов</h1>
            <p className="text-muted-foreground text-sm">Мультигородская архитектура медиахолдинга</p>
          </div>
          <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" /> Добавить город</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card><CardContent className="p-3 text-center"><div className="text-2xl font-bold text-green-500">{cities.filter(c => c.status === 'active').length}</div><div className="text-[10px] text-muted-foreground">Активных</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-2xl font-bold text-amber-500">{cities.filter(c => c.status === 'setup').length}</div><div className="text-[10px] text-muted-foreground">Настройка</div></CardContent></Card>
          <Card><CardContent className="p-3 text-center"><div className="text-2xl font-bold text-muted-foreground">{cities.filter(c => c.status === 'disabled').length}</div><div className="text-[10px] text-muted-foreground">Отключены</div></CardContent></Card>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Город</TableHead>
                <TableHead>Домен</TableHead>
                <TableHead>Регион</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map(city => (
                <TableRow key={city.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-medium text-sm">{city.name}</div>
                        <div className="text-[10px] text-muted-foreground">slug: {city.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href={`https://${city.domain}`} target="_blank" rel="noopener" className="text-sm text-primary hover:underline flex items-center gap-1">
                      {city.domain} <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{city.region}</TableCell>
                  <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[city.status]}`}>{STATUS_LABELS[city.status]}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => setEditCity({ ...city })}><Pencil className="w-3 h-3" /></Button>
                      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleToggle(city)}>
                        {city.status === 'active' ? <PowerOff className="w-3 h-3" /> : <Power className="w-3 h-3" />}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive" onClick={() => handleDelete(city)}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add Dialog */}
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogContent>
            <DialogHeader><DialogTitle>Добавить город</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><label className="text-xs text-muted-foreground">Название</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-zа-яё0-9-]/gi, '-') }))} placeholder="Томск" className="mt-1" /></div>
              <div><label className="text-xs text-muted-foreground">Slug</label><Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="tomsk" className="mt-1" /></div>
              <div><label className="text-xs text-muted-foreground">Домен</label><Input value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} placeholder="tomsk.info" className="mt-1" /></div>
              <div><label className="text-xs text-muted-foreground">Регион</label><Input value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} placeholder="Томская область" className="mt-1" /></div>
            </div>
            <DialogFooter><Button onClick={handleAdd}>Добавить</Button></DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editCity} onOpenChange={() => setEditCity(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Редактировать город</DialogTitle></DialogHeader>
            {editCity && (
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Название</label><Input value={editCity.name} onChange={e => setEditCity({ ...editCity, name: e.target.value })} className="mt-1" /></div>
                <div><label className="text-xs text-muted-foreground">Домен</label><Input value={editCity.domain} onChange={e => setEditCity({ ...editCity, domain: e.target.value })} className="mt-1" /></div>
                <div><label className="text-xs text-muted-foreground">Регион</label><Input value={editCity.region} onChange={e => setEditCity({ ...editCity, region: e.target.value })} className="mt-1" /></div>
                <div>
                  <label className="text-xs text-muted-foreground">Ключевые слова для AI поиска</label>
                  <Input value={editCity.searchKeywords.join(', ')} onChange={e => setEditCity({ ...editCity, searchKeywords: e.target.value.split(',').map(s => s.trim()) })} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Статус</label>
                  <Select value={editCity.status} onValueChange={v => setEditCity({ ...editCity, status: v as City['status'] })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Активен</SelectItem>
                      <SelectItem value="setup">Настройка</SelectItem>
                      <SelectItem value="disabled">Отключён</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter><Button onClick={handleSaveEdit}>Сохранить</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default CitiesPage;
