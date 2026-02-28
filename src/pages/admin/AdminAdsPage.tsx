import AdminLayout from '@/components/admin/AdminLayout';

const AdminAdsPage = () => (
  <AdminLayout>
    <div>
      <h1 className="text-2xl font-bold mb-1">Модерация объявлений</h1>
      <p className="text-muted-foreground mb-6">Объявления, ожидающие проверки</p>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">Нет объявлений на модерации</p>
      </div>
    </div>
  </AdminLayout>
);

export default AdminAdsPage;
