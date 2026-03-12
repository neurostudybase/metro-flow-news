import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { LAUNCH_QUEUE, LAUNCH_HISTORY, getStatusLabel, getStatusColor, DEFAULT_CITY_SECTIONS, INITIAL_TASKS, CityLaunchItem } from '@/data/cityLauncherData';
import { CheckCircle2, XCircle, Rocket, Ban, RotateCcw, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const LauncherDetailPage = () => {
  const { id } = useParams();
  const allItems = [...LAUNCH_QUEUE, ...LAUNCH_HISTORY];
  const found = allItems.find(i => i.id === id);
  const [item, setItem] = useState<CityLaunchItem | undefined>(found);

  if (!item) {
    return (
      <HoldingLayout>
        <div className="text-center py-12 text-muted-foreground">Город не найден</div>
      </HoldingLayout>
    );
  }

  const handleApprove = () => {
    setItem(prev => prev ? { ...prev, status: 'approved', approvedAt: new Date().toISOString().slice(0, 10), approvedBy: 'info@tyumen.info', log: [...prev.log, { timestamp: new Date().toISOString(), action: 'Подтверждён', details: 'Подтвердил: info@tyumen.info', status: 'success' as const }] } : prev);
    toast.success('Запуск подтверждён');
  };

  const handleReject = () => {
    setItem(prev => prev ? { ...prev, status: 'rejected', log: [...prev.log, { timestamp: new Date().toISOString(), action: 'Отклонён', details: 'Город отклонён администратором', status: 'error' as const }] } : prev);
    toast.info('Город отклонён');
  };

  const handleLaunch = () => {
    setItem(prev => {
      if (!prev) return prev;
      const newChecklist = prev.checklist.map(c => ({ ...c, completed: true }));
      return {
        ...prev,
        status: 'active' as const,
        launchedAt: new Date().toISOString().slice(0, 10),
        checklist: newChecklist,
        log: [...prev.log, { timestamp: new Date().toISOString(), action: 'Запуск выполнен', details: 'Все модули активированы, базовая структура создана', status: 'success' as const }],
      };
    });
    toast.success('Город успешно запущен!');
  };

  return (
    <HoldingLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{item.cityName}</h1>
            <p className="text-muted-foreground text-sm">{item.region} · {item.domain}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
              {getStatusLabel(item.status)}
            </span>
            <Link to="/admin/holding/launcher/queue" className="text-sm text-primary hover:underline">← К очереди</Link>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Growth Score</p>
            <p className="text-3xl font-bold text-primary">{item.growthScore}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Население</p>
            <p className="text-xl font-bold">{item.populationEstimate?.toLocaleString() || '—'}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Поисковый трафик</p>
            <p className="text-xl font-bold">{item.searchVolume?.toLocaleString() || '—'}/мес</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Создан</p>
            <p className="text-xl font-bold">{item.createdAt}</p>
          </div>
        </div>

        {/* Why recommended */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Почему город рекомендован</h3>
          <p className="text-sm text-muted-foreground">{item.reason}</p>
        </div>

        {/* Categories & Modules */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Рекомендованные категории</h3>
            <div className="flex flex-wrap gap-2">
              {item.recommendedCategories.map(c => (
                <span key={c} className="bg-muted px-2 py-1 rounded text-xs">{c}</span>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-2">AI-модули</h3>
            <div className="flex flex-wrap gap-2">
              {item.aiModules.map(m => (
                <span key={m} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Чеклист запуска</h3>
          <div className="space-y-2">
            {item.checklist.map(step => (
              <div key={step.step} className="flex items-center gap-3 text-sm">
                {step.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                <span className={step.completed ? '' : 'text-muted-foreground'}>{step.label}</span>
              </div>
            ))}
          </div>
          {item.status === 'approved' && (
            <div className="mt-4 p-3 bg-muted rounded text-sm">
              <p className="font-medium mb-2">Базовые разделы для создания:</p>
              <div className="flex flex-wrap gap-1">
                {DEFAULT_CITY_SECTIONS.map(s => <span key={s} className="bg-background px-2 py-0.5 rounded text-xs">{s}</span>)}
              </div>
              <p className="font-medium mt-3 mb-2">Стартовые задачи:</p>
              <ul className="list-disc list-inside text-muted-foreground">
                {INITIAL_TASKS.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {(item.status === 'suggested' || item.status === 'pending_approval') && (
            <>
              <button onClick={handleApprove} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700">
                <CheckCircle2 className="w-4 h-4" /> Подтвердить запуск
              </button>
              <button onClick={handleReject} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                <Ban className="w-4 h-4" /> Отклонить
              </button>
            </>
          )}
          {item.status === 'approved' && (
            <button onClick={handleLaunch} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90">
              <Rocket className="w-4 h-4" /> Запустить город
            </button>
          )}
          {item.status === 'failed' && (
            <button onClick={handleLaunch} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90">
              <RotateCcw className="w-4 h-4" /> Запустить заново
            </button>
          )}
          {item.status === 'active' && (
            <Link to="/admin/holding/cities" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:opacity-90">
              <ExternalLink className="w-4 h-4" /> Открыть в админке
            </Link>
          )}
        </div>

        {/* Log */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Лог выполнения</h3>
          {item.log.length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет записей</p>
          ) : (
            <div className="space-y-2">
              {item.log.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-muted-foreground whitespace-nowrap font-mono text-xs">{entry.timestamp.slice(0, 16)}</span>
                  <span className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${entry.status === 'success' ? 'bg-emerald-500' : entry.status === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <div>
                    <span className="font-medium">{entry.action}</span>
                    <span className="text-muted-foreground ml-2">{entry.details}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </HoldingLayout>
  );
};

export default LauncherDetailPage;
