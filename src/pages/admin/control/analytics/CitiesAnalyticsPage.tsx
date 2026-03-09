import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockCityStats } from '@/data/contentAnalyticsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CitiesAnalyticsPage = () => {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /> Аналитика по городам</h1>
            <p className="text-muted-foreground text-sm">Активность городов сети</p>
          </div>
          <Link to="/admin/control/analytics"><Button variant="outline" size="sm">← Аналитика</Button></Link>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockCityStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="totalViews" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Просмотры" />
                <Bar dataKey="newsCount" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="Новостей" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Город</TableHead>
                  <TableHead>Новостей</TableHead>
                  <TableHead>Просмотры</TableHead>
                  <TableHead>Ср. engagement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCityStats.map(c => (
                  <TableRow key={c.cityId}>
                    <TableCell className="font-medium">{c.city}</TableCell>
                    <TableCell>{c.newsCount}</TableCell>
                    <TableCell>{c.totalViews.toLocaleString()}</TableCell>
                    <TableCell><Badge variant={c.avgEngagement >= 60 ? 'default' : 'secondary'}>{c.avgEngagement}</Badge></TableCell>
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

export default CitiesAnalyticsPage;
