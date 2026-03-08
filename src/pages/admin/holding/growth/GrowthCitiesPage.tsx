import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { MapPin, Rocket, TrendingUp, Search } from 'lucide-react';
import { CITY_CANDIDATES, CityCandidate } from '@/data/growthCitiesData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const potentialColors: Record<string, string> = {
  high: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-gray-100 text-gray-800',
};
const potentialLabels: Record<string, string> = { high: 'Высокий', medium: 'Средний', low: 'Низкий' };

const GrowthCitiesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [potentialFilter, setPotentialFilter] = useState<string>('all');

  const filtered = CITY_CANDIDATES.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (potentialFilter !== 'all' && c.potential !== potentialFilter) return false;
    return true;
  });

  return (
    <HoldingLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" /> AI City Discovery
        </h1>
        <p className="text-muted-foreground mb-6">AI-анализ городов для расширения сети порталов</p>

        <div className="flex gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Поиск города..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={potentialFilter} onValueChange={setPotentialFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="high">Высокий</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="low">Низкий</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Город</TableHead>
                <TableHead>Регион</TableHead>
                <TableHead>Население</TableHead>
                <TableHead>Поиск/мес</TableHead>
                <TableHead>Новости</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Потенциал</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.suggestedDomain}</div>
                  </TableCell>
                  <TableCell className="text-sm">{c.region}</TableCell>
                  <TableCell className="text-sm">{c.population.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{c.searchVolume.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{c.newsActivity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="font-bold">{c.growthScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={potentialColors[c.potential]}>{potentialLabels[c.potential]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => navigate('/admin/holding/create-city')}>
                      <Rocket className="w-3 h-3 mr-1" /> Создать
                    </Button>
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

export default GrowthCitiesPage;
