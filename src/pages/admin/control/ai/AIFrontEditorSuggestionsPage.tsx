import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Eye, Pin, Zap } from 'lucide-react';
import { mockSuggestions, getSectionLabel, allSections, type FrontPageSuggestion } from '@/data/aiFrontEditorData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AIFrontEditorSuggestionsPage = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<FrontPageSuggestion[]>(mockSuggestions.filter(s => s.status === 'suggested'));
  const [filterSection, setFilterSection] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<FrontPageSuggestion | null>(null);

  const filtered = suggestions
    .filter(s => filterSection === 'all' || s.section === filterSection)
    .sort((a, b) => b.score - a.score);

  const handleAccept = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const handleReject = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const handleAcceptAll = () => setSuggestions([]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/control/ai/front-editor')}>
            <ArrowLeft className="h-4 w-4 mr-2" />Назад
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Предложения AI</h1>
            <p className="text-muted-foreground">Материалы, предложенные AI для главной страницы</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Select value={filterSection} onValueChange={setFilterSection}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Раздел" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все разделы</SelectItem>
              {allSections.map(s => <SelectItem key={s} value={s}>{getSectionLabel(s)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleAcceptAll} disabled={filtered.length === 0}>
            <Check className="h-4 w-4 mr-2" />Принять все ({filtered.length})
          </Button>
        </div>

        <Card>
          <CardHeader><CardTitle>Ожидают решения — {filtered.length}</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Новость</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Раздел</TableHead>
                  <TableHead>Город</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {s.isBreaking && <Badge variant="destructive" className="text-xs">СРОЧНО</Badge>}
                        <span className="font-medium">{s.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell><Badge variant="outline">{getSectionLabel(s.section)}</Badge></TableCell>
                    <TableCell>{s.cityName}</TableCell>
                    <TableCell>
                      <span className={s.score >= 80 ? 'text-green-600 font-bold' : s.score >= 60 ? 'text-yellow-600' : 'text-red-500'}>
                        {s.score}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => setPreviewItem(s)}><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleAccept(s.id)}><Check className="h-4 w-4 text-green-600" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleReject(s.id)}><X className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Нет ожидающих предложений</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Предпросмотр</DialogTitle></DialogHeader>
          {previewItem && (
            <div className="space-y-3">
              <div className="flex gap-2">
                {previewItem.isBreaking && <Badge variant="destructive">СРОЧНО</Badge>}
                <Badge variant="outline">{previewItem.category}</Badge>
                <Badge variant="secondary">{previewItem.cityName}</Badge>
              </div>
              <h3 className="text-lg font-bold">{previewItem.title}</h3>
              <p className="text-muted-foreground">{previewItem.excerpt}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Score: {previewItem.score}</span>
                <span>Раздел: {getSectionLabel(previewItem.section)}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => { handleAccept(previewItem.id); setPreviewItem(null); }}>
                  <Check className="h-4 w-4 mr-2" />Принять
                </Button>
                <Button variant="destructive" onClick={() => { handleReject(previewItem.id); setPreviewItem(null); }}>
                  <X className="h-4 w-4 mr-2" />Отклонить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AIFrontEditorSuggestionsPage;
