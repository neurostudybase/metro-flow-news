import HoldingLayout from '@/components/holding/HoldingLayout';
import { useCity } from '@/contexts/CityContext';
import { Globe } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HoldingCitiesPage = () => {
  const { cities } = useCity();

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Globe className="w-6 h-6 text-primary" /> Города холдинга
        </h1>
        <p className="text-muted-foreground mb-6">Управление сетью городских порталов</p>

        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Город</TableHead>
                <TableHead>Домен</TableHead>
                <TableHead>Регион</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map(city => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell className="text-muted-foreground">{city.domain}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{city.region}</TableCell>
                  <TableCell>
                    <Badge variant={city.status === 'active' ? 'default' : 'secondary'}>
                      {city.status === 'active' ? 'Активен' : city.status === 'setup' ? 'Настройка' : 'Отключён'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Открыть</Button>
                    <Button size="sm" variant="ghost" className="ml-1">Редактировать</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingCitiesPage;
