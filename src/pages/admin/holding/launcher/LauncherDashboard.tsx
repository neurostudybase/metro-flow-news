import HoldingLayout from '@/components/holding/HoldingLayout';
import { Link } from 'react-router-dom';
import { Rocket, ListChecks, History, Settings, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { LAUNCH_QUEUE, LAUNCH_HISTORY, DEFAULT_LAUNCHER_SETTINGS, getStatusLabel, getStatusColor } from '@/data/cityLauncherData';

const LauncherDashboard = () => {
  const pending = LAUNCH_QUEUE.filter(c => c.status === 'pending_approval').length;
  const suggested = LAUNCH_QUEUE.filter(c => c.status === 'suggested').length;
  const active = LAUNCH_HISTORY.filter(c => c.status === 'active').length;
  const failed = LAUNCH_HISTORY.filter(c => c.status === 'failed').length;

  const cards = [
    { label: 'Ожидают подтверждения', value: pending, icon: Clock, color: 'text-yellow-600' },
    { label: 'Рекомендовано', value: suggested, icon: Rocket, color: 'text-blue-600' },
    { label: 'Активных городов', value: active, icon: CheckCircle2, color: 'text-emerald-600' },
    { label: 'Ошибки запуска', value: failed, icon: AlertTriangle, color: 'text-red-600' },
  ];

  const links = [
    { label: 'Очередь запуска', to: '/admin/holding/launcher/queue', icon: ListChecks },
    { label: 'История запусков', to: '/admin/holding/launcher/history', icon: History },
    { label: 'Настройки', to: '/admin/holding/launcher/settings', icon: Settings },
  ];

  return (
    <HoldingLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Запуск городов</h1>
            <p className="text-muted-foreground text-sm">Автоматический запуск новых городских порталов по рекомендациям AI Growth</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${DEFAULT_LAUNCHER_SETTINGS.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            {DEFAULT_LAUNCHER_SETTINGS.enabled ? 'Система активна' : 'Система отключена'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(c => (
            <div key={c.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <c.icon className={`w-5 h-5 ${c.color}`} />
                <span className="text-2xl font-bold">{c.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="bg-card border border-border rounded-lg p-4 hover:bg-secondary transition-colors flex items-center gap-3">
              <l.icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{l.label}</span>
            </Link>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Последние рекомендации</h2>
          <div className="space-y-2">
            {LAUNCH_QUEUE.slice(0, 5).map(item => (
              <Link key={item.id} to={`/admin/holding/launcher/${item.id}`} className="flex items-center justify-between p-3 rounded-md hover:bg-secondary transition-colors">
                <div>
                  <span className="font-medium">{item.cityName}</span>
                  <span className="text-muted-foreground text-sm ml-2">{item.region} · {item.domain}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono">Score: {item.growthScore}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-sm text-muted-foreground">
          <p><strong>Режим запуска:</strong> {DEFAULT_LAUNCHER_SETTINGS.launchMode === 'approval_required' ? 'Требуется подтверждение' : DEFAULT_LAUNCHER_SETTINGS.launchMode === 'manual_only' ? 'Только вручную' : 'Автозапуск'}</p>
          <p><strong>Мин. Growth Score:</strong> {DEFAULT_LAUNCHER_SETTINGS.minGrowthScore} · <strong>Макс. городов/мес:</strong> {DEFAULT_LAUNCHER_SETTINGS.maxCitiesPerMonth}</p>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default LauncherDashboard;
