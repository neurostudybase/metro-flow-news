import { useState } from 'react';
import HoldingLayout from '@/components/holding/HoldingLayout';
import { Link } from 'react-router-dom';
import { DEFAULT_LAUNCHER_SETTINGS, LauncherSettings, LaunchMode } from '@/data/cityLauncherData';
import { toast } from 'sonner';

const LauncherSettingsPage = () => {
  const [settings, setSettings] = useState<LauncherSettings>(DEFAULT_LAUNCHER_SETTINGS);

  const handleSave = () => toast.success('Настройки сохранены');

  const aiModuleOptions = ['News Hunter', 'AI Journalist', 'AI Front Editor', 'AI Analytics', 'AI Editor', 'AI SEO'];

  return (
    <HoldingLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Настройки AI Launcher</h1>
          <Link to="/admin/holding/launcher" className="text-sm text-primary hover:underline">← Назад</Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">AI City Launcher</h3>
              <p className="text-sm text-muted-foreground">Включить / выключить систему автозапуска городов</p>
            </div>
            <button
              onClick={() => setSettings(s => ({ ...s, enabled: !s.enabled }))}
              className={`px-4 py-2 rounded text-sm font-medium ${settings.enabled ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'}`}
            >
              {settings.enabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <label className="block text-sm font-medium mb-2">Режим запуска (CITY_LAUNCH_MODE)</label>
            <select
              value={settings.launchMode}
              onChange={e => setSettings(s => ({ ...s, launchMode: e.target.value as LaunchMode }))}
              className="border border-border rounded px-3 py-2 text-sm bg-background w-full max-w-xs"
            >
              <option value="manual_only">Только вручную</option>
              <option value="approval_required">Требуется подтверждение</option>
              <option value="auto_launch">Автозапуск</option>
            </select>
          </div>

          <div className="border-t border-border pt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Мин. Growth Score для предложения</label>
              <input
                type="number"
                value={settings.minGrowthScore}
                onChange={e => setSettings(s => ({ ...s, minGrowthScore: +e.target.value }))}
                className="border border-border rounded px-3 py-2 text-sm bg-background w-full max-w-xs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Макс. новых городов в месяц</label>
              <input
                type="number"
                value={settings.maxCitiesPerMonth}
                onChange={e => setSettings(s => ({ ...s, maxCitiesPerMonth: +e.target.value }))}
                className="border border-border rounded px-3 py-2 text-sm bg-background w-full max-w-xs"
              />
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <label className="block text-sm font-medium mb-2">AI-модули для автоподключения</label>
            <div className="flex flex-wrap gap-2">
              {aiModuleOptions.map(mod => (
                <button
                  key={mod}
                  onClick={() => setSettings(s => ({
                    ...s,
                    autoAIModules: s.autoAIModules.includes(mod)
                      ? s.autoAIModules.filter(m => m !== mod)
                      : [...s.autoAIModules, mod],
                  }))}
                  className={`px-3 py-1 rounded text-xs font-medium border ${settings.autoAIModules.includes(mod) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground'}`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            {[
              { key: 'autoCreateSEO' as const, label: 'Автосоздание SEO страниц' },
              { key: 'autoCreateContent' as const, label: 'Автосоздание стартового контента' },
              { key: 'requireManualApproval' as const, label: 'Всегда требовать ручное подтверждение' },
            ].map(opt => (
              <label key={opt.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[opt.key]}
                  onChange={() => setSettings(s => ({ ...s, [opt.key]: !s[opt.key] }))}
                  className="rounded"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>

          <button onClick={handleSave} className="bg-primary text-primary-foreground px-6 py-2 rounded text-sm font-medium hover:opacity-90">
            Сохранить настройки
          </button>
        </div>
      </div>
    </HoldingLayout>
  );
};

export default LauncherSettingsPage;
