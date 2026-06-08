import HoldingLayout from '@/components/holding/HoldingLayout';
import { MOCK_USERS, SYSTEM_ROLE_LABELS, SystemRole } from '@/data/mediaSystemData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Plus, Shield } from 'lucide-react';

const rolePermissions: Record<SystemRole, string> = {
  super_admin: 'Полный доступ ко всему холдингу, биллингу и системе',
  holding_admin: 'Все города, публикации, AI, аналитика — без биллинга',
  city_editor: 'Полный доступ только в рамках одного города',
  journalist: 'Создание и редактирование своих материалов',
  moderator: 'Очередь модерации, спам, дубликаты',
  seo_manager: 'SEO-центр, мета-шаблоны, sitemap, редиректы',
};

const PermissionsPage = () => (
  <HoldingLayout>
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-primary" /> Доступы и роли</h1>
          <p className="text-muted-foreground text-sm">{MOCK_USERS.length} пользователей · {Object.keys(SYSTEM_ROLE_LABELS).length} ролей</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Пригласить</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {(Object.keys(SYSTEM_ROLE_LABELS) as SystemRole[]).map(r => (
          <div key={r} className="bg-card border border-border rounded-md p-3">
            <div className="flex items-center gap-2 mb-1"><Shield className="w-3.5 h-3.5 text-primary" /><span className="font-semibold text-sm">{SYSTEM_ROLE_LABELS[r]}</span></div>
            <div className="text-xs text-muted-foreground">{rolePermissions[r]}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пользователь</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Город</TableHead>
              <TableHead>Активность</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map(u => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{u.email}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{SYSTEM_ROLE_LABELS[u.role]}</Badge></TableCell>
                <TableCell className="text-xs">{u.cityId === 'all' ? 'все' : u.cityId}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{u.lastSeen}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={
                    u.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    u.status === 'invited' ? 'bg-blue-100 text-blue-700' : 'bg-muted'
                  }>{u.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" className="h-7">Изменить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </HoldingLayout>
);

export default PermissionsPage;
