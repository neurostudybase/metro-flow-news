import AdminLayout from '@/components/admin/AdminLayout';

const AdminContentPage = () => (
  <AdminLayout>
    <div>
      <h1 className="text-2xl font-bold mb-1">Управление контентом</h1>
      <p className="text-muted-foreground mb-6">Управление статьями, категориями и материалами</p>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Управление контентом будет доступно после подключения бэкенда</p>
      </div>
    </div>
  </AdminLayout>
);

export default AdminContentPage;
