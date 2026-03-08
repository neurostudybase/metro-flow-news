import AdminLayout from '@/components/admin/AdminLayout';
import { MapPin, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const trends = [
  { topic: 'Недвижимость', direction: 'up', change: '+32%', detail: 'Рост интереса к покупке квартир в Восточном мкр' },
  { topic: 'Работа — курьеры', direction: 'up', change: '+28%', detail: 'Рост объявлений о работе курьером' },
  { topic: 'Спортивные события', direction: 'up', change: '+40%', detail: 'Повышенный интерес после открытия ледового дворца' },
  { topic: 'Автосервисы', direction: 'down', change: '-8%', detail: 'Сезонное снижение спроса' },
  { topic: 'Аренда квартир', direction: 'up', change: '+15%', detail: 'Рост перед началом учебного года' },
];

const hotTopics = [
  'Ледовый дворец — 5000 мест',
  'Бизнес-форум Тюмень 2026',
  'Тарифы ЖКХ с апреля',
  'Ремонт дорог — программа 2026',
  'Новые маршруты Тобольск',
];

const districts = [
  { name: 'Центр', activity: 'Высокая', events: 12 },
  { name: 'Восточный', activity: 'Средняя', events: 7 },
  { name: 'ММС', activity: 'Высокая', events: 9 },
  { name: 'Тюменский', activity: 'Низкая', events: 3 },
  { name: 'Тобольск', activity: 'Средняя', events: 5 },
];

const CityIntelligencePage = () => (
  <AdminLayout>
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><MapPin className="w-6 h-6 text-primary" /> AI City Intelligence</h1>
      <p className="text-muted-foreground mb-6 text-sm">Городская аналитика, тренды, популярные темы</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Тренды города</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {trends.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  {t.direction === 'up' ? <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> : <TrendingDown className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />}
                  <div>
                    <div className="text-sm font-medium">{t.topic} <span className={t.direction === 'up' ? 'text-green-600' : 'text-red-600'}>{t.change}</span></div>
                    <div className="text-xs text-muted-foreground">{t.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Zap className="w-4 h-4" /> Горячие темы</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {hotTopics.map((t, i) => <li key={i} className="text-sm">🔥 {t}</li>)}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Районы</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {districts.map((d, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span>{d.name}</span>
                    <span className="text-xs text-muted-foreground">{d.activity} · {d.events} событий</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </AdminLayout>
);

export default CityIntelligencePage;
