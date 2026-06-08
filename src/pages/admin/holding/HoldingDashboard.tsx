import HoldingLayout from '@/components/holding/HoldingLayout';
import { Link } from 'react-router-dom';
import { useCity } from '@/contexts/CityContext';
import { MOCK_HOLDING_NEWS, MOCK_MODERATION } from '@/data/holdingData';
import { MOCK_AGENTS, MOCK_PIPELINE_ITEMS, CITY_PERFORMANCE, TRAFFIC_BY_DAY } from '@/data/mediaSystemData';
import { Building2, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const KpiCard = ({ label, value, delta, tone = 'default' }: { label: string; value: string | number; delta?: string; tone?: 'default' | 'warn' | 'ok' | 'bad' }) => (
  <div className="bg-card border border-border rounded-md p-3">
    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className="mt-1 flex items-baseline gap-2">
      <span className="text-2xl font-bold tabular-nums">{value}</span>
      {delta && (
        <span className={
          tone === 'warn' ? 'text-[11px] text-amber-600' :
          tone === 'bad' ? 'text-[11px] text-red-600' :
          tone === 'ok' ? 'text-[11px] text-emerald-600' :
          'text-[11px] text-muted-foreground'
        }>{delta}</span>
      )}
    </div>
  </div>
);

const HoldingDashboard = () => {
  const { cities } = useCity();
  const totalArticles = 3920;
  const totalViews = 845000;
  const todayPubs = 142;
  const scheduled = 38;
  const moderation = MOCK_MODERATION.filter(m => m.status === 'pending').length;
  const aiQueue = MOCK_PIPELINE_ITEMS.length;
  const failed = MOCK_AGENTS.reduce((acc, a) => acc + a.errors, 0);
  const aiAgents = MOCK_AGENTS.length;

  return (
    <HoldingLayout>
      <div className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Building2 className="w-6 h-6 text-primary" /> Media Holding OS</h1>
            <p className="text-muted-foreground text-sm">Командный центр сети городских порталов</p>
          </div>
          <div className="text-xs text-muted-foreground">обновлено: 2 сек назад · live</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <KpiCard label="Городов" value={cities.length} delta={`${cities.filter(c=>c.status==='active').length} активных`} tone="ok" />
          <KpiCard label="Статей всего" value={totalArticles.toLocaleString('ru')} delta="+312 за неделю" tone="ok" />
          <KpiCard label="AI агентов" value={aiAgents} delta={`${MOCK_AGENTS.filter(a=>a.status==='active').length} в работе`} />
          <KpiCard label="Просмотров" value={`${(totalViews/1000).toFixed(0)}K`} delta="+8.4%" tone="ok" />
          <KpiCard label="Сегодня опубликовано" value={todayPubs} delta="цель 160" />
          <KpiCard label="Запланировано" value={scheduled} />
          <KpiCard label="Очередь модерации" value={moderation} tone="warn" delta="требует внимания" />
          <KpiCard label="AI очередь" value={aiQueue} />
          <KpiCard label="Ошибки задач" value={failed} tone="bad" delta="за 24ч" />
          <KpiCard label="Активность сети" value="99.2%" delta="uptime" tone="ok" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-card border border-border rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Трафик и публикации за 14 дней</h3>
              <span className="text-xs text-muted-foreground">просмотры / публикации</span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TRAFFIC_BY_DAY}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="publications" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-md p-4">
            <h3 className="font-semibold text-sm mb-3">Активность по городам</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CITY_PERFORMANCE} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="city" type="category" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Активные задачи AI</h3>
              <Link to="/admin/holding/pipeline" className="text-xs text-primary inline-flex items-center gap-1">Pipeline <ArrowUpRight className="w-3 h-3" /></Link>
            </div>
            <ul className="divide-y divide-border text-sm">
              {MOCK_PIPELINE_ITEMS.slice(0, 6).map(p => (
                <li key={p.id} className="py-2 flex items-center justify-between gap-3">
                  <span className="truncate">{p.title}</span>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">{p.stage} · {p.agent}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Требует внимания</h3>
              <Link to="/admin/holding/moderation" className="text-xs text-primary inline-flex items-center gap-1">Модерация <ArrowUpRight className="w-3 h-3" /></Link>
            </div>
            <ul className="divide-y divide-border text-sm">
              {MOCK_HOLDING_NEWS.filter(n => n.status === 'review').concat(MOCK_HOLDING_NEWS.filter(n => n.status === 'rewritten')).slice(0, 6).map(n => (
                <li key={n.id} className="py-2 flex items-center justify-between gap-3">
                  <span className="truncate">{n.title}</span>
                  <span className="text-[11px] text-muted-foreground">{n.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default HoldingDashboard;
