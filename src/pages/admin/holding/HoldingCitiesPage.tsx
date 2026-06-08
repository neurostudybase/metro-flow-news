import { Link } from 'react-router-dom';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Globe, Plus, Users, Bot, Newspaper, Copy, Power, ArrowLeftRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_AGENTS } from '@/data/mediaSystemData';

const populationByCity: Record<string, string> = {
  tyumen: '847 488', kurgan: '309 472', bryansk: '395 200', nefteyugansk: '128 200', 'pyt-yah': '40 800',
};
const publicationsByCity: Record<string, number> = { tyumen: 1820, kurgan: 920, bryansk: 740, nefteyugansk: 280, 'pyt-yah': 140 };
const editorsByCity: Record<string, number> = { tyumen: 6, kurgan: 3, bryansk: 4, nefteyugansk: 2, 'pyt-yah': 1 };

const HoldingCitiesPage = () => {
  const { cities } = useCity();

  return (
    <HoldingLayout>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Globe className="w-6 h-6 text-primary" /> Города холдинга</h1>
            <p className="text-muted-foreground text-sm">{cities.length} городов · {cities.filter(c=>c.status==='active').length} активных</p>
          </div>
          <Button asChild size="sm"><Link to="/admin/holding/create-city"><Plus className="w-4 h-4 mr-1" /> Создать город</Link></Button>
        </div>

        <div className="bg-card border border-border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Город</TableHead>
                <TableHead>Домен</TableHead>
                <TableHead>Регион</TableHead>
                <TableHead className="text-right">Население</TableHead>
                <TableHead className="text-right">Публикаций</TableHead>
                <TableHead className="text-right">Редакторов</TableHead>
                <TableHead className="text-right">AI агентов</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map(city => {
                const agents = MOCK_AGENTS.filter(a => a.cityId === city.id || a.cityId === 'all').length;
                return (
                  <TableRow key={city.id}>
                    <TableCell className="font-medium">{city.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{city.domain}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{city.region}</TableCell>
                    <TableCell className="text-right tabular-nums text-xs">{populationByCity[city.id] || '—'}</TableCell>
                    <TableCell className="text-right tabular-nums"><Newspaper className="w-3 h-3 inline mr-1 text-muted-foreground" />{publicationsByCity[city.id] || 0}</TableCell>
                    <TableCell className="text-right tabular-nums"><Users className="w-3 h-3 inline mr-1 text-muted-foreground" />{editorsByCity[city.id] || 0}</TableCell>
                    <TableCell className="text-right tabular-nums"><Bot className="w-3 h-3 inline mr-1 text-muted-foreground" />{agents}</TableCell>
                    <TableCell>
                      <Badge variant={city.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {city.status === 'active' ? 'Активен' : city.status === 'setup' ? 'Настройка' : 'Отключён'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="h-7 w-7" title="Клонировать"><Copy className="w-3.5 h-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" title="Передать контент"><ArrowLeftRight className="w-3.5 h-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" title="Отключить"><Power className="w-3.5 h-3.5" /></Button>
                      <Button size="sm" variant="outline" className="h-7 ml-1">Открыть</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingCitiesPage;
