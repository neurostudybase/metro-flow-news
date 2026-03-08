import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const predictions = [
  { topic: 'Аренда квартир Тюмень', traffic: '~12,000', confidence: 92, category: 'Недвижимость', recommendation: 'Создать SEO-страницу + 3 статьи' },
  { topic: 'Доставка еды Тюмень', traffic: '~8,500', confidence: 87, category: 'Еда', recommendation: 'Создать подборку + SEO-страницу' },
  { topic: 'Летние мероприятия Тюмень', traffic: '~6,200', confidence: 78, category: 'Досуг', recommendation: 'Серия новостей + гайд' },
  { topic: 'Ремонт квартир Тюмень', traffic: '~5,800', confidence: 85, category: 'Услуги', recommendation: 'SEO-страница + подборка компаний' },
  { topic: 'Частные школы Тюмень', traffic: '~3,400', confidence: 71, category: 'Образование', recommendation: 'Статья-обзор' },
  { topic: 'Электросамокаты Тюмень', traffic: '~4,100', confidence: 65, category: 'Транспорт', recommendation: 'Новость + подборка' },
];

const growingCategories = [
  { name: 'Недвижимость', growth: '+24%', forecast: 'Продолжит расти до осени' },
  { name: 'Доставка', growth: '+18%', forecast: 'Стабильный рост' },
  { name: 'Досуг', growth: '+32%', forecast: 'Сезонный пик летом' },
  { name: 'Авто', growth: '+7%', forecast: 'Умеренный рост' },
];

const GrowthPredictionsPage = () => {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> AI Traffic Predictor
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Прогнозирование трафика и рекомендации по развитию</p>
          </div>
          <Link to="/admin/control/growth"><Button variant="outline" size="sm">← Growth Engine</Button></Link>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3"><CardTitle className="text-base">Прогнозы по темам</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Тема</th>
                    <th className="pb-2 font-medium">Категория</th>
                    <th className="pb-2 font-medium">Прогноз трафика</th>
                    <th className="pb-2 font-medium">Уверенность</th>
                    <th className="pb-2 font-medium">Рекомендация</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((p, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 font-medium">{p.topic}</td>
                      <td className="py-2 text-muted-foreground">{p.category}</td>
                      <td className="py-2 text-primary font-medium">{p.traffic}</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${p.confidence}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{p.confidence}%</span>
                        </div>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">{p.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Растущие категории</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {growingCategories.map(c => (
                <div key={c.name} className="p-3 rounded-md border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{c.name}</span>
                    <span className="text-green-600 text-sm flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" /> {c.growth}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.forecast}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GrowthPredictionsPage;
