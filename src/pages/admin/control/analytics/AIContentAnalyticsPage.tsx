import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getAIContentStats, getEditorialContentStats } from '@/data/contentAnalyticsData';

const AIContentAnalyticsPage = () => {
  const aiItems = getAIContentStats();
  const editorialItems = getEditorialContentStats();

  const aiAvgViews = aiItems.length ? Math.round(aiItems.reduce((s, i) => s + i.views, 0) / aiItems.length) : 0;
  const edAvgViews = editorialItems.length ? Math.round(editorialItems.reduce((s, i) => s + i.views, 0) / editorialItems.length) : 0;
  const aiAvgScore = aiItems.length ? Math.round(aiItems.reduce((s, i) => s + i.contentScore, 0) / aiItems.length) : 0;
  const edAvgScore = editorialItems.length ? Math.round(editorialItems.reduce((s, i) => s + i.contentScore, 0) / editorialItems.length) : 0;

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Bot className="w-6 h-6 text-primary" /> Статистика AI контента</h1>
            <p className="text-muted-foreground text-sm">Сравнение AI и редакторских статей</p>
          </div>
          <Link to="/admin/control/analytics"><Button variant="outline" size="sm">← Аналитика</Button></Link>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{aiItems.length}</div>
            <div className="text-xs text-muted-foreground">AI статей</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{editorialItems.length}</div>
            <div className="text-xs text-muted-foreground">Редакторских</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{aiAvgViews.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Ср. просмотры AI</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{edAvgViews.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Ср. просмотры ред.</div>
          </CardContent></Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-primary">{aiAvgScore}</div>
            <div className="text-xs text-muted-foreground">Ср. content_score AI</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-xl font-bold">{edAvgScore}</div>
            <div className="text-xs text-muted-foreground">Ср. content_score редакция</div>
          </CardContent></Card>
        </div>

        {/* AI articles table */}
        <Card className="mb-6">
          <CardHeader className="pb-2"><CardTitle className="text-sm">AI статьи</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Статья</TableHead>
                  <TableHead>Город</TableHead>
                  <TableHead>Просмотры</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-[300px] truncate">{item.title}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.views.toLocaleString()}</TableCell>
                    <TableCell><Badge>{item.contentScore}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Editorial articles table */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Редакторские статьи</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Статья</TableHead>
                  <TableHead>Город</TableHead>
                  <TableHead>Просмотры</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editorialItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-[300px] truncate">{item.title}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.views.toLocaleString()}</TableCell>
                    <TableCell><Badge variant="secondary">{item.contentScore}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AIContentAnalyticsPage;
