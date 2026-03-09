import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { getTopNews } from '@/data/contentAnalyticsData';

type Period = 'day' | 'week' | 'month';

const TopNewsPage = () => {
  const [period, setPeriod] = useState<Period>('week');
  const [cityFilter, setCityFilter] = useState<string>('');
  const items = getTopNews(period, cityFilter || undefined);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="w-6 h-6 text-primary" /> ТОП новостей</h1>
            <p className="text-muted-foreground text-sm">Самые популярные материалы</p>
          </div>
          <Link to="/admin/control/analytics"><Button variant="outline" size="sm">← Аналитика</Button></Link>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {(['day', 'week', 'month'] as Period[]).map(p => (
            <Button key={p} size="sm" variant={period === p ? 'default' : 'outline'} onClick={() => setPeriod(p)}>
              {p === 'day' ? 'За день' : p === 'week' ? 'За неделю' : 'За месяц'}
            </Button>
          ))}
          <select className="border border-border rounded px-2 py-1 text-sm bg-background" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
            <option value="">Все города</option>
            <option value="tyumen">Тюмень</option>
            <option value="kurgan">Курган</option>
          </select>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Новость</TableHead>
                  <TableHead>Город</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Просмотры</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Источник</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{item.title}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={item.engagementScore >= 70 ? 'default' : 'secondary'}>{item.engagementScore}</Badge>
                    </TableCell>
                    <TableCell>{item.contentScore}</TableCell>
                    <TableCell>
                      <Badge variant={item.source === 'ai' ? 'outline' : 'secondary'}>{item.source === 'ai' ? 'AI' : 'Редакция'}</Badge>
                    </TableCell>
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

export default TopNewsPage;
