import HoldingLayout from '@/components/holding/HoldingLayout';
import { Link } from 'react-router-dom';
import { LAUNCH_HISTORY, getStatusLabel, getStatusColor } from '@/data/cityLauncherData';

const LauncherHistoryPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">История запусков</h1>
        <Link to="/admin/holding/launcher" className="text-sm text-primary hover:underline">← Назад</Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">Город</th>
              <th className="text-left p-3">Домен</th>
              <th className="text-left p-3">Дата запуска</th>
              <th className="text-left p-3">Подтвердил</th>
              <th className="text-center p-3">Score</th>
              <th className="text-center p-3">Статус</th>
              <th className="text-left p-3">Результат</th>
            </tr>
          </thead>
          <tbody>
            {LAUNCH_HISTORY.map(item => (
              <tr key={item.id} className="border-t border-border hover:bg-secondary/50">
                <td className="p-3 font-medium">
                  <Link to={`/admin/holding/launcher/${item.id}`} className="text-primary hover:underline">{item.cityName}</Link>
                </td>
                <td className="p-3 font-mono text-xs">{item.domain}</td>
                <td className="p-3 text-muted-foreground">{item.launchedAt || '—'}</td>
                <td className="p-3 text-muted-foreground">{item.approvedBy || '—'}</td>
                <td className="p-3 text-center font-bold">{item.growthScore}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground text-xs">
                  {item.status === 'active' ? 'Все модули активны' : item.status === 'rejected' ? 'Отклонён' : item.launchError || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </HoldingLayout>
);

export default LauncherHistoryPage;
