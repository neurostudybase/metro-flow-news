import AdminLayout from '@/components/admin/AdminLayout';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const networks = [
  {
    name: 'OpenAI (GPT-4o)',
    status: 'connected',
    tasks: [
      'Генерация новостей',
      'Заголовки и анонсы',
      'SEO title / description',
      'Переписывание коротких текстов',
      'Модерация объявлений',
    ],
    modules: ['AI News Writer', 'AI SEO Editor', 'AI Headline Generator', 'AI Moderation'],
  },
  {
    name: 'Claude (Anthropic)',
    status: 'connected',
    tasks: [
      'Длинные новости и статьи',
      'Глубокая редактура',
      'Аналитические материалы',
      'Проверка логики и структуры текста',
      'Сложные редакторские задачи',
    ],
    modules: ['AI News Rewriter', 'AI Content Studio', 'AI Fact Check'],
  },
  {
    name: 'Perplexity',
    status: 'not_connected',
    tasks: [
      'Поиск новостей и инфоповодов',
      'Анализ источников',
      'Проверка новостной повестки',
      'Поиск информации по городу',
    ],
    modules: ['AI Source Scanner', 'AI City Classifier', 'AI City Intelligence'],
  },
];

const AINetworksPage = () => (
  <AdminLayout>
    <div>
      <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Brain className="w-6 h-6 text-primary" /> Распределение нейросетей</h1>
      <p className="text-muted-foreground mb-6 text-sm">Какая нейросеть за что отвечает</p>

      <div className="space-y-4">
        {networks.map(net => (
          <Card key={net.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{net.name}</CardTitle>
                <Badge variant={net.status === 'connected' ? 'default' : 'secondary'}>
                  {net.status === 'connected' ? 'Подключено' : 'Не подключено'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Задачи</h4>
                  <ul className="space-y-1">
                    {net.tasks.map((t, i) => <li key={i} className="text-sm">• {t}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Модули</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {net.modules.map((m, i) => <Badge key={i} variant="outline" className="text-xs">{m}</Badge>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </AdminLayout>
);

export default AINetworksPage;
