import AdminLayout from '@/components/admin/AdminLayout';
import { useAI } from '@/contexts/AIContext';
import { Link } from 'react-router-dom';
import { TrendingUp, FileText, Search, Plus, RefreshCw, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const growthIdeas = [
  { id: 1, title: 'Лучшие автосервисы Тюмени', type: 'Подборка', status: 'черновик', seo: true, date: '2025-06-10' },
  { id: 2, title: 'ТОП стоматологий Тюмени 2025', type: 'Подборка', status: 'на проверке', seo: true, date: '2025-06-09' },
  { id: 3, title: 'Лучшие ЖК Тюмени для семей', type: 'SEO-статья', status: 'опубликовано', seo: true, date: '2025-06-08' },
  { id: 4, title: 'Куда сходить в Тюмени летом', type: 'Гайд', status: 'черновик', seo: false, date: '2025-06-10' },
  { id: 5, title: 'ТОП кафе Тюмени с верандой', type: 'Подборка', status: 'черновик', seo: true, date: '2025-06-10' },
  { id: 6, title: 'Лучшие районы Тюмени для покупки квартиры', type: 'SEO-статья', status: 'на проверке', seo: true, date: '2025-06-09' },
];

const suggestedTopics = [
  'Лучшие барбершопы Тюмени',
  'ТОП фитнес-клубов Тюмени',
  'Где купить б/у авто в Тюмени',
  'Лучшие школы Тюмени',
  'ТОП доставок еды Тюмени',
];

const statusColor: Record<string, string> = {
  'черновик': 'bg-muted text-muted-foreground',
  'на проверке': 'bg-yellow-100 text-yellow-700',
  'опубликовано': 'bg-green-100 text-green-700',
};

const GrowthEnginePage = () => {
  const { createTask } = useAI();

  const handleGenerate = (topic: string) => {
    createTask({
      moduleId: 'content',
      type: 'generate',
      description: `Генерация статьи: ${topic}`,
      status: 'new',
      priority: 'medium',
      needsApproval: true,
    });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" /> AI Growth Engine
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Рост портала: SEO-страницы, подборки, городские статьи</p>
          </div>
          <Link to="/admin/control"><Button variant="outline" size="sm">← Центр управления</Button></Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{growthIdeas.length}</div>
            <div className="text-xs text-muted-foreground">Всего материалов</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{growthIdeas.filter(i => i.status === 'черновик').length}</div>
            <div className="text-xs text-muted-foreground">Черновиков</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{growthIdeas.filter(i => i.status === 'на проверке').length}</div>
            <div className="text-xs text-muted-foreground">На проверке</div>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{growthIdeas.filter(i => i.status === 'опубликовано').length}</div>
            <div className="text-xs text-muted-foreground">Опубликовано</div>
          </CardContent></Card>
        </div>

        {/* Quick actions */}
        <Card className="mb-6">
          <CardHeader className="pb-3"><CardTitle className="text-base">Быстрые действия</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleGenerate('Новая подборка')}>
                <Plus className="w-3.5 h-3.5" /> Создать подборку
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleGenerate('SEO-страница')}>
                <Search className="w-3.5 h-3.5" /> Генерировать SEO-страницу
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Найти новые темы
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Анализ конкурентов
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Materials table */}
        <Card className="mb-6">
          <CardHeader className="pb-3"><CardTitle className="text-base">Материалы Growth Engine</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">Заголовок</th>
                    <th className="pb-2 font-medium">Тип</th>
                    <th className="pb-2 font-medium">SEO</th>
                    <th className="pb-2 font-medium">Статус</th>
                    <th className="pb-2 font-medium">Дата</th>
                    <th className="pb-2 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {growthIdeas.map(item => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-2 text-muted-foreground">{item.id}</td>
                      <td className="py-2 font-medium">{item.title}</td>
                      <td className="py-2"><Badge variant="outline">{item.type}</Badge></td>
                      <td className="py-2">{item.seo ? <span className="text-green-600">✓</span> : <span className="text-muted-foreground">—</span>}</td>
                      <td className="py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[item.status]}`}>{item.status}</span></td>
                      <td className="py-2 text-muted-foreground">{item.date}</td>
                      <td className="py-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2"><FileText className="w-3 h-3" /></Button>
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2"><RefreshCw className="w-3 h-3" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Suggested topics */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">AI рекомендует темы</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestedTopics.map(topic => (
                <div key={topic} className="flex items-center justify-between p-2 rounded-md border">
                  <span className="text-sm">{topic}</span>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleGenerate(topic)}>
                    Сгенерировать
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GrowthEnginePage;
