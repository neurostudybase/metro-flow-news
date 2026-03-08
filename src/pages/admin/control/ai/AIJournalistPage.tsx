import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { Bot, Settings, FileText, RefreshCw, Eye, Check, X, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  MOCK_JOURNALIST_ARTICLES, JournalistArticle, JournalistArticleStatus,
  JOURNALIST_STATUS_LABELS, ARTICLE_TYPE_LABELS, DEFAULT_JOURNALIST_SETTINGS,
  PublicationMode, PUBLICATION_MODE_LABELS, JournalistSettings
} from '@/data/aiJournalistData';
import { CITIES } from '@/data/citiesData';

const statusColor: Record<JournalistArticleStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  review: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const AIJournalistPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<JournalistArticle[]>(MOCK_JOURNALIST_ARTICLES);
  const [settings, setSettings] = useState<JournalistSettings>(DEFAULT_JOURNALIST_SETTINGS);
  const [editArticle, setEditArticle] = useState<JournalistArticle | null>(null);
  const [previewArticle, setPreviewArticle] = useState<JournalistArticle | null>(null);

  const handleApprove = (id: string) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'published' as const, publishedAt: new Date().toISOString() } : a));
    toast({ title: 'Статья опубликована' });
  };

  const handleReject = (id: string) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' as const } : a));
    toast({ title: 'Статья отклонена' });
  };

  const handleRegenerate = (id: string) => {
    toast({ title: 'Перегенерация запущена', description: 'AI переписывает статью...' });
  };

  const handleSaveEdit = () => {
    if (!editArticle) return;
    setArticles(prev => prev.map(a => a.id === editArticle.id ? editArticle : a));
    setEditArticle(null);
    toast({ title: 'Статья обновлена' });
  };

  const todayCount = articles.filter(a => a.createdAt.startsWith('2026-03-08')).length;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Bot className="h-6 w-6" /> AI Журналист</h1>
            <p className="text-muted-foreground">Генерация уникальных городских статей</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin/control/ai/journalist/topics')}>
              <FileText className="h-4 w-4 mr-1" /> Темы
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/control/ai/journalist/log')}>
              Журнал
            </Button>
          </div>
        </div>

        <Tabs defaultValue="articles">
          <TabsList>
            <TabsTrigger value="articles">Статьи ({articles.length})</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card><CardContent className="pt-4"><div className="text-2xl font-bold">{articles.length}</div><p className="text-sm text-muted-foreground">Всего статей</p></CardContent></Card>
              <Card><CardContent className="pt-4"><div className="text-2xl font-bold">{articles.filter(a => a.status === 'published').length}</div><p className="text-sm text-muted-foreground">Опубликовано</p></CardContent></Card>
              <Card><CardContent className="pt-4"><div className="text-2xl font-bold">{articles.filter(a => a.status === 'review').length}</div><p className="text-sm text-muted-foreground">На проверке</p></CardContent></Card>
              <Card><CardContent className="pt-4"><div className="text-2xl font-bold">{todayCount} / {settings.maxArticlesPerDay}</div><p className="text-sm text-muted-foreground">Сегодня / лимит</p></CardContent></Card>
            </div>

            {!settings.enabled && (
              <Card className="border-destructive"><CardContent className="pt-4 text-center text-destructive font-medium">AI Журналист отключён. Включите в настройках.</CardContent></Card>
            )}

            <Card>
              <CardHeader><CardTitle>Сгенерированные статьи</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Заголовок</TableHead>
                      <TableHead>Город</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map(article => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium max-w-[300px] truncate">{article.title}</TableCell>
                        <TableCell>{article.cityName}</TableCell>
                        <TableCell><Badge variant="outline">{ARTICLE_TYPE_LABELS[article.articleType]}</Badge></TableCell>
                        <TableCell><Badge variant={article.contentScore >= 70 ? 'default' : 'secondary'}>{article.contentScore}</Badge></TableCell>
                        <TableCell><Badge className={statusColor[article.status]}>{JOURNALIST_STATUS_LABELS[article.status]}</Badge></TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => setPreviewArticle(article)}><Eye className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditArticle({...article})}><Pencil className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => handleRegenerate(article.id)}><RefreshCw className="h-4 w-4" /></Button>
                            {article.status !== 'published' && (
                              <>
                                <Button size="sm" variant="ghost" className="text-green-600" onClick={() => handleApprove(article.id)}><Check className="h-4 w-4" /></Button>
                                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleReject(article.id)}><X className="h-4 w-4" /></Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Настройки AI Журналиста</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">AI Журналист включён</Label>
                    <p className="text-sm text-muted-foreground">Глобальный переключатель AI_JOURNALIST_ENABLED</p>
                  </div>
                  <Switch checked={settings.enabled} onCheckedChange={(v) => setSettings(s => ({...s, enabled: v}))} />
                </div>

                <div className="space-y-2">
                  <Label>Лимит статей в день (MAX_AI_ARTICLES_PER_DAY)</Label>
                  <Input type="number" value={settings.maxArticlesPerDay} onChange={e => setSettings(s => ({...s, maxArticlesPerDay: parseInt(e.target.value) || 1}))} />
                </div>

                <div className="space-y-2">
                  <Label>Режим публикации (AI_PUBLICATION_MODE)</Label>
                  <Select value={settings.publicationMode} onValueChange={(v: PublicationMode) => setSettings(s => ({...s, publicationMode: v}))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.entries(PUBLICATION_MODE_LABELS) as [PublicationMode, string][]).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {settings.publicationMode === 'draft_only' && 'AI создаёт только черновики. Редактор публикует вручную.'}
                    {settings.publicationMode === 'review_required' && 'AI создаёт статью, редактор должен подтвердить публикацию.'}
                    {settings.publicationMode === 'auto_publish' && 'AI автоматически публикует статьи. Используйте с осторожностью.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Отключённые города (AI_DISABLED_CITIES)</Label>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map(city => (
                      <label key={city.id} className="flex items-center gap-1.5 text-sm">
                        <input type="checkbox" checked={settings.disabledCities.includes(city.id)}
                          onChange={e => {
                            setSettings(s => ({
                              ...s,
                              disabledCities: e.target.checked
                                ? [...s.disabledCities, city.id]
                                : s.disabledCities.filter(c => c !== city.id)
                            }));
                          }}
                        />
                        {city.name}
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">AI не будет генерировать статьи для отключённых городов</p>
                </div>

                <Button onClick={() => toast({ title: 'Настройки сохранены' })}>Сохранить настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Dialog */}
        <Dialog open={!!previewArticle} onOpenChange={() => setPreviewArticle(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {previewArticle && (
              <>
                <DialogHeader><DialogTitle>{previewArticle.title}</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Badge>{previewArticle.cityName}</Badge>
                    <Badge variant="outline">{previewArticle.category}</Badge>
                    <Badge variant="outline">{ARTICLE_TYPE_LABELS[previewArticle.articleType]}</Badge>
                  </div>
                  <p className="text-muted-foreground italic">{previewArticle.excerpt}</p>
                  <div className="prose prose-sm max-w-none">{previewArticle.content}</div>
                  <div className="flex gap-1 flex-wrap">{previewArticle.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>SEO Title: {previewArticle.seoTitle}</p>
                    <p>SEO Description: {previewArticle.seoDescription}</p>
                    <p>Slug: {previewArticle.slug}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editArticle} onOpenChange={() => setEditArticle(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {editArticle && (
              <>
                <DialogHeader><DialogTitle>Редактирование статьи</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-1"><Label>Заголовок</Label><Input value={editArticle.title} onChange={e => setEditArticle({...editArticle, title: e.target.value})} /></div>
                  <div className="space-y-1"><Label>Лид</Label><Textarea value={editArticle.excerpt} onChange={e => setEditArticle({...editArticle, excerpt: e.target.value})} /></div>
                  <div className="space-y-1"><Label>Текст</Label><Textarea rows={6} value={editArticle.content} onChange={e => setEditArticle({...editArticle, content: e.target.value})} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Категория</Label><Input value={editArticle.category} onChange={e => setEditArticle({...editArticle, category: e.target.value})} /></div>
                    <div className="space-y-1">
                      <Label>Город</Label>
                      <Select value={editArticle.cityId} onValueChange={v => {
                        const city = CITIES.find(c => c.id === v);
                        setEditArticle({...editArticle, cityId: v, cityName: city?.name || v});
                      }}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{CITIES.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1"><Label>Теги (через запятую)</Label><Input value={editArticle.tags.join(', ')} onChange={e => setEditArticle({...editArticle, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})} /></div>
                  <Button onClick={handleSaveEdit}>Сохранить</Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AIJournalistPage;
