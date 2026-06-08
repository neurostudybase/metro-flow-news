import HoldingLayout from '@/components/holding/HoldingLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CITY_PERFORMANCE, TRAFFIC_BY_DAY, TRAFFIC_SOURCES, MOCK_AGENTS } from '@/data/mediaSystemData';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['hsl(var(--primary))', '#f59e0b', '#10b981', '#6366f1', '#ef4444'];

const Card = ({ title, children }: any) => (
  <div className="bg-card border border-border rounded-md p-4">
    <h3 className="font-semibold text-sm mb-3">{title}</h3>
    <div className="h-64">{children}</div>
  </div>
);

const HoldingAnalyticsPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6 text-primary" /> Аналитика холдинга</h1>
        <p className="text-muted-foreground text-sm">Сводная производительность сети</p>
      </div>
      <Tabs defaultValue="cities">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="cities" className="text-xs">Города</TabsTrigger>
          <TabsTrigger value="traffic" className="text-xs">Трафик</TabsTrigger>
          <TabsTrigger value="sources" className="text-xs">Источники</TabsTrigger>
          <TabsTrigger value="ai" className="text-xs">AI</TabsTrigger>
          <TabsTrigger value="frequency" className="text-xs">Частота публикаций</TabsTrigger>
        </TabsList>
        <TabsContent value="cities" className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card title="Просмотры по городам">
            <ResponsiveContainer><BarChart data={CITY_PERFORMANCE}><XAxis dataKey="city" tick={{fontSize:11}} /><YAxis tick={{fontSize:11}} /><Tooltip /><Bar dataKey="views" fill="hsl(var(--primary))" /></BarChart></ResponsiveContainer>
          </Card>
          <Card title="Статей по городам">
            <ResponsiveContainer><BarChart data={CITY_PERFORMANCE}><XAxis dataKey="city" tick={{fontSize:11}} /><YAxis tick={{fontSize:11}} /><Tooltip /><Bar dataKey="articles" fill="#f59e0b" /></BarChart></ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="traffic">
          <Card title="Просмотры за 14 дней">
            <ResponsiveContainer><LineChart data={TRAFFIC_BY_DAY}><XAxis dataKey="day" tick={{fontSize:11}} /><YAxis tick={{fontSize:11}} /><Tooltip /><Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} /></LineChart></ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="sources">
          <Card title="Источники трафика">
            <ResponsiveContainer><PieChart><Pie data={TRAFFIC_SOURCES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>{TRAFFIC_SOURCES.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Legend /><Tooltip /></PieChart></ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="ai">
          <Card title="Активность AI агентов">
            <ResponsiveContainer><BarChart data={MOCK_AGENTS.map(a => ({ name: a.name, publications: a.publications, quality: a.quality }))}><XAxis dataKey="name" tick={{fontSize:10}} interval={0} angle={-20} textAnchor="end" height={70} /><YAxis tick={{fontSize:10}} /><Tooltip /><Bar dataKey="publications" fill="hsl(var(--primary))" /></BarChart></ResponsiveContainer>
          </Card>
        </TabsContent>
        <TabsContent value="frequency">
          <Card title="Публикаций в день">
            <ResponsiveContainer><LineChart data={TRAFFIC_BY_DAY}><XAxis dataKey="day" tick={{fontSize:11}} /><YAxis tick={{fontSize:11}} /><Tooltip /><Line type="monotone" dataKey="publications" stroke="#10b981" strokeWidth={2} /></LineChart></ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </HoldingLayout>
);

export default HoldingAnalyticsPage;
