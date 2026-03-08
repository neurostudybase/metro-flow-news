import HoldingLayout from '@/components/holding/HoldingLayout';
import { BarChart3, TrendingUp, Globe } from 'lucide-react';
import { NETWORK_STATS } from '@/data/growthCitiesData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const GrowthAnalyticsPage = () => {
  const totalTraffic = NETWORK_STATS.reduce((s, n) => s + n.traffic, 0);
  const totalNews = NETWORK_STATS.reduce((s, n) => s + n.newsCount, 0);
  const avgGrowth = (NETWORK_STATS.reduce((s, n) => s + n.trafficGrowth, 0) / NETWORK_STATS.length).toFixed(1);

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Аналитика сети
        </h1>
        <p className="text-muted-foreground mb-6">Статистика всех порталов медиахолдинга</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold">{NETWORK_STATS.length}</div>
            <div className="text-sm text-muted-foreground">Порталов</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold">{totalTraffic.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Трафик/мес</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-600">+{avgGrowth}%</div>
            <div className="text-sm text-muted-foreground">Средний рост</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold">{totalNews.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Новостей</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Портал</TableHead>
                <TableHead>Домен</TableHead>
                <TableHead>Трафик</TableHead>
                <TableHead>Рост</TableHead>
                <TableHead>Новости</TableHead>
                <TableHead>Объявления</TableHead>
                <TableHead>Компании</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {NETWORK_STATS.sort((a, b) => b.traffic - a.traffic).map(s => (
                <TableRow key={s.cityId}>
                  <TableCell className="font-medium">{s.cityName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.domain}</TableCell>
                  <TableCell>{s.traffic.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="w-3 h-3" /> +{s.trafficGrowth}%
                    </span>
                  </TableCell>
                  <TableCell>{s.newsCount.toLocaleString()}</TableCell>
                  <TableCell>{s.adsCount.toLocaleString()}</TableCell>
                  <TableCell>{s.companiesCount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2"><Globe className="w-4 h-4" /> Самые популярные города</h2>
          <ol className="space-y-2">
            {NETWORK_STATS.sort((a, b) => b.traffic - a.traffic).map((s, i) => (
              <li key={s.cityId} className="flex items-center justify-between bg-secondary/50 rounded-md px-3 py-2">
                <span><span className="font-bold text-primary mr-2">{i + 1}.</span>{s.cityName}</span>
                <span className="text-sm text-muted-foreground">{s.traffic.toLocaleString()} визитов/мес</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default GrowthAnalyticsPage;
