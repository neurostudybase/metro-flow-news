import { useState } from 'react';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { Link } from 'react-router-dom';
import { LAUNCH_QUEUE, getStatusLabel, getStatusColor, CityLaunchItem } from '@/data/cityLauncherData';
import { toast } from 'sonner';

const LauncherQueuePage = () => {
  const [queue, setQueue] = useState<CityLaunchItem[]>(LAUNCH_QUEUE);

  const handleApprove = (id: string) => {
    setQueue(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as const, approvedAt: new Date().toISOString().slice(0, 10), approvedBy: 'info@tyumen.info' } : c));
    toast.success('Город подтверждён для запуска');
  };

  const handleReject = (id: string) => {
    setQueue(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as const } : c));
    toast.info('Город отклонён');
  };

  return (
    <HoldingLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Очередь запуска городов</h1>
          <Link to="/admin/holding/launcher" className="text-sm text-primary hover:underline">← Назад</Link>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Город</th>
                <th className="text-left p-3">Регион</th>
                <th className="text-left p-3">Домен</th>
                <th className="text-center p-3">Score</th>
                <th className="text-left p-3">Категории</th>
                <th className="text-center p-3">Статус</th>
                <th className="text-left p-3">Создан</th>
                <th className="text-center p-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {queue.map(item => (
                <tr key={item.id} className="border-t border-border hover:bg-secondary/50">
                  <td className="p-3 font-medium">
                    <Link to={`/admin/holding/launcher/${item.id}`} className="text-primary hover:underline">{item.cityName}</Link>
                  </td>
                  <td className="p-3 text-muted-foreground">{item.region}</td>
                  <td className="p-3 font-mono text-xs">{item.domain}</td>
                  <td className="p-3 text-center font-bold">{item.growthScore}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {item.recommendedCategories.slice(0, 3).map(c => (
                        <span key={c} className="bg-muted px-1.5 py-0.5 rounded text-xs">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{item.createdAt}</td>
                  <td className="p-3 text-center">
                    {(item.status === 'suggested' || item.status === 'pending_approval') && (
                      <div className="flex gap-1 justify-center">
                        <button onClick={() => handleApprove(item.id)} className="px-2 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700">Подтвердить</button>
                        <button onClick={() => handleReject(item.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">Отклонить</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default LauncherQueuePage;
