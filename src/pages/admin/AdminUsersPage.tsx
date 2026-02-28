import AdminLayout from '@/components/admin/AdminLayout';
import { Badge } from '@/components/ui/badge';

const mockUsersList = [
  { id: 1, name: 'Администратор', email: 'info@tyumen.info', role: 'administrator', status: 'active' },
  { id: 2, name: 'Иван Иванов', email: 'ivan@tyumen.info', role: 'user', status: 'active' },
];

const AdminUsersPage = () => (
  <AdminLayout>
    <div>
      <h1 className="text-2xl font-bold mb-1">Управление пользователями</h1>
      <p className="text-muted-foreground mb-6">Список всех зарегистрированных пользователей</p>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left px-4 py-3 font-medium">Имя</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Роль</th>
              <th className="text-left px-4 py-3 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {mockUsersList.map(u => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={u.role === 'administrator' ? 'default' : 'secondary'}>
                    {u.role === 'administrator' ? 'Админ' : 'Пользователь'}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="text-green-600 border-green-600">Активен</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
);

export default AdminUsersPage;
