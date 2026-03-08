import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, ShoppingBag, Flame, Globe, BarChart3, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

const geoStats = [
  { label: 'Организаций на карте', value: 8, icon: Building2, color: 'text-primary' },
  { label: 'Объявлений с геопривязкой', value: 5, icon: ShoppingBag, color: 'text-green-500' },
  { label: 'Без координат', value: 12, icon: AlertTriangle, color: 'text-orange-500' },
  { label: 'Точность привязки', value: '94%', icon: CheckCircle2, color: 'text-emerald-500' },
];

const geoTasks = [
  { id: 1, task: 'Определить координаты для 12 организаций', status: 'ожидает', module: 'AI Geo' },
  { id: 2, task: 'Привязать 5 новых объявлений к карте', status: 'в работе', module: 'AI Geo' },
  { id: 3, task: 'Обновить координаты ресторанов', status: 'завершено', module: 'AI Geo' },
  { id: 4, task: 'Анализ плотности по районам', status: 'ожидает', module: 'AI Analytics' },
];

const districtAnalysis = [
  { district: 'Центр', orgs: 3, ads: 2, activity: 'высокая', trend: '↑' },
  { district: 'Калининский', orgs: 2, ads: 1, activity: 'средняя', trend: '→' },
  { district: 'Ленинский', orgs: 2, ads: 1, activity: 'средняя', trend: '↑' },
  { district: 'Восточный', orgs: 1, ads: 1, activity: 'растущая', trend: '↑↑' },
];

const ControlMapPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              AI Карта и Геоаналитика
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Управление геопривязкой и анализ активности по районам</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><RefreshCw className="w-4 h-4 mr-1" />Обновить координаты</Button>
            <Button size="sm"><MapPin className="w-4 h-4 mr-1" />Привязать все</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {geoStats.map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* District Analysis */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Анализ по районам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2">Район</th>
                      <th className="text-center py-2">Орг.</th>
                      <th className="text-center py-2">Объяв.</th>
                      <th className="text-center py-2">Активность</th>
                      <th className="text-center py-2">Тренд</th>
                    </tr>
                  </thead>
                  <tbody>
                    {districtAnalysis.map(d => (
                      <tr key={d.district} className="border-b border-border/50">
                        <td className="py-2 font-medium">{d.district}</td>
                        <td className="text-center py-2">{d.orgs}</td>
                        <td className="text-center py-2">{d.ads}</td>
                        <td className="text-center py-2">
                          <Badge variant={d.activity === 'высокая' ? 'default' : 'secondary'} className="text-xs">{d.activity}</Badge>
                        </td>
                        <td className="text-center py-2 text-green-600 font-bold">{d.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Geo Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Задачи геопривязки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {geoTasks.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <div className="text-sm font-medium">{t.task}</div>
                      <div className="text-xs text-muted-foreground">{t.module}</div>
                    </div>
                    <Badge variant={t.status === 'завершено' ? 'default' : t.status === 'в работе' ? 'secondary' : 'outline'} className="text-xs">
                      {t.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap Analysis */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Тепловая карта активности
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {districtAnalysis.map(d => (
                <div key={d.district} className="p-4 rounded-lg bg-secondary/30 text-center">
                  <div className="text-lg font-bold">{d.district}</div>
                  <div className="text-3xl mt-2">{d.activity === 'высокая' ? '🔴' : d.activity === 'растущая' ? '🟠' : '🟡'}</div>
                  <div className="text-xs text-muted-foreground mt-1">{d.orgs + d.ads} объектов</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ControlMapPage;
