import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Settings, FileText, History, Pin, Zap, ArrowUp, ArrowDown, Eye, Check, X } from 'lucide-react';
import {
  defaultFrontEditorSettings, mockSuggestions, getSectionLabel, allSections, availableCities,
  type FrontEditorSettings, type FrontPageSuggestion
} from '@/data/aiFrontEditorData';

const AIFrontEditorPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<FrontEditorSettings>(defaultFrontEditorSettings);
  const [suggestions, setSuggestions] = useState<FrontPageSuggestion[]>(mockSuggestions);
  const [filterSection, setFilterSection] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = suggestions
    .filter(s => s.cityId === settings.currentCityId)
    .filter(s => filterSection === 'all' || s.section === filterSection)
    .filter(s => filterStatus === 'all' || s.status === filterStatus)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.score - a.score;
    });

  const stats = {
    total: suggestions.filter(s => s.cityId === settings.currentCityId).length,
    suggested: suggestions.filter(s => s.status === 'suggested' && s.cityId === settings.currentCityId).length,
    accepted: suggestions.filter(s => s.status === 'accepted' && s.cityId === settings.currentCityId).length,
    breaking: suggestions.filter(s => s.isBreaking && s.cityId === settings.currentCityId).length,
    pinned: suggestions.filter(s => s.pinned && s.cityId === settings.currentCityId).length,
  };

  const handleAccept = (id: string) => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: 'accepted' as const, decidedAt: new Date().toISOString(), decidedBy: 'Редактор' } : s));
  };

  const handleReject = (id: string) => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' as const, decidedAt: new Date().toISOString(), decidedBy: 'Редактор' } : s));
  };

  const handlePin = (id: string) => {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, pinned: !s.pinned } : s));
  };

  const handleMoveUp = (id: string) => {
    setSuggestions(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx <= 0) return prev;
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };

  const handleMoveDown = (id: string) => {
    setSuggestions(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  };

  const modeLabels: Record<string, string> = {
    suggestions_only: 'Только предложения',
    editor_approval: 'Подтверждение редактора',
    auto_update: 'Автообновление',
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = { suggested: 'secondary', accepted: 'default', rejected: 'destructive', published: 'default' };
    const labels: Record<string, string> = { suggested: 'Предложено', accepted: 'Принято', rejected: 'Отклонено', published: 'Опубликовано' };
    return <Badge variant={map[status] as any}>{labels[status]}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Редактор главной</h1>
            <p className="text-muted-foreground">Управление контентом главной страницы с помощью AI</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin/control/ai/front-editor/suggestions')}>
              <FileText className="h-4 w-4 mr-2" />Предложения
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/control/ai/front-editor/log')}>
              <History className="h-4 w-4 mr-2" />Журнал
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/control/ai/front-editor/settings')}>
              <Settings className="h-4 w-4 mr-2" />Настройки
            </Button>
          </div>
        </div>

        {/* Global Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Редактор</p>
                  <p className="text-sm text-muted-foreground">{settings.enabled ? 'Активен' : 'Отключён'}</p>
                </div>
                <Switch checked={settings.enabled} onCheckedChange={v => setSettings(p => ({ ...p, enabled: v }))} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="font-medium">Режим работы</p>
                <Select value={settings.mode} onValueChange={v => setSettings(p => ({ ...p, mode: v as any }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestions_only">Только предложения</SelectItem>
                    <SelectItem value="editor_approval">Подтверждение редактора</SelectItem>
                    <SelectItem value="auto_update">Автообновление</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="font-medium">Город</p>
                <Select value={settings.currentCityId} onValueChange={v => setSettings(p => ({ ...p, currentCityId: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {availableCities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Всего', value: stats.total, icon: Newspaper },
            { label: 'Ожидают', value: stats.suggested, icon: FileText },
            { label: 'Принято', value: stats.accepted, icon: Check },
            { label: 'Срочные', value: stats.breaking, icon: Zap },
            { label: 'Закреплено', value: stats.pinned, icon: Pin },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="pt-4 pb-4 flex items-center gap-3">
                <s.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={filterSection} onValueChange={setFilterSection}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Раздел" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все разделы</SelectItem>
              {allSections.map(s => <SelectItem key={s} value={s}>{getSectionLabel(s)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Статус" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="suggested">Предложено</SelectItem>
              <SelectItem value="accepted">Принято</SelectItem>
              <SelectItem value="rejected">Отклонено</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardHeader><CardTitle>Материалы для главной</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Новость</TableHead>
                  <TableHead>Раздел</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {s.pinned && <Pin className="h-4 w-4 text-primary" />}
                        {s.isBreaking && <Badge variant="destructive" className="text-xs">СРОЧНО</Badge>}
                        <div>
                          <p className="font-medium">{s.title}</p>
                          <p className="text-xs text-muted-foreground">{s.excerpt.slice(0, 60)}...</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{getSectionLabel(s.section)}</Badge></TableCell>
                    <TableCell>
                      <span className={s.score >= 80 ? 'text-green-600 font-bold' : s.score >= 60 ? 'text-yellow-600 font-medium' : 'text-red-500'}>
                        {s.score}
                      </span>
                    </TableCell>
                    <TableCell>{statusBadge(s.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {s.status === 'suggested' && (
                          <>
                            <Button size="sm" variant="ghost" onClick={() => handleAccept(s.id)}><Check className="h-4 w-4 text-green-600" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => handleReject(s.id)}><X className="h-4 w-4 text-red-500" /></Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => handlePin(s.id)}>
                          <Pin className={`h-4 w-4 ${s.pinned ? 'text-primary' : ''}`} />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleMoveUp(s.id)}><ArrowUp className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleMoveDown(s.id)}><ArrowDown className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Нет материалов</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AIFrontEditorPage;
