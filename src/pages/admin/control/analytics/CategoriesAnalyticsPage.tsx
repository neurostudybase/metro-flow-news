import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockCategoryStats } from '@/data/contentAnalyticsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CategoriesAnalyticsPage = () => {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6 text-primary" /> Аналитика по категориям</h1>
            <p className="text-muted-foreground text-sm">Статистика рубрик портала</p>
          </div>
          <Link to="/admin/control/analytics"><Button variant="outline" size="sm">← Аналитика</Button></Link>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockCategoryStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="totalViews" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Просмотры" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Категория</TableHead>
                  <TableHead>Новостей</TableHead>
                  <TableHead>Просмотры</TableHead>
                  <TableHead>Ср. engagement</TableHead>
                  <TableHead>Тренд</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCategoryStats.map(c => (
                  <TableRow key={c.category}>
                    <TableCell className="font-medium">{c.category}</TableCell>
                    <TableCell>{c.newsCount}</TableCell>
                    <TableCell>{c.totalViews.toLocaleString()}</TableCell>
                    <TableCell><Badge variant={c.avgEngagement >= 65 ? 'default' : 'secondary'}>{c.avgEngagement}</Badge></TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1 text-sm ${c.trend === 'up' ? 'text-green-600' : c.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {c.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : c.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                        {c.changePercent > 0 ? '+' : ''}{c.changePercent}%
                      </span>
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

export default CategoriesAnalyticsPage;
