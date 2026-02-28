import AdminLayout from '@/components/admin/AdminLayout';
import { Users, FileText, Newspaper, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const cards = [
  { label: 'Пользователи', desc: '1 зарегистрирован', icon: Users, to: '/admin/users' },
  { label: 'Модерация объявлений', desc: '0 на проверке', icon: FileText, to: '/admin/ads' },
  { label: 'Управление контентом', desc: 'Статьи, категории', icon: Newspaper, to: '/admin/content' },
  { label: 'Безопасность', desc: 'Роли и права', icon: Shield, to: '/admin' },
];

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1">Админ-панель</h1>
        <p className="text-muted-foreground mb-6">Добро пожаловать, {user?.name} ({user?.email})</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map(card => (
            <Link
              key={card.label}
              to={card.to}
              className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="bg-primary/10 rounded-md p-2.5">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{card.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
