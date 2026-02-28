import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useListings, ListingStatus } from '@/contexts/ListingsContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';

const statusLabels: Record<ListingStatus, string> = {
  draft: 'Черновик',
  moderation: 'На модерации',
  published: 'Опубликовано',
  unpublished: 'Снято',
  rejected: 'Отклонено',
};

const statusVariant: Record<ListingStatus, 'secondary' | 'default' | 'outline' | 'destructive'> = {
  draft: 'secondary',
  moderation: 'default',
  published: 'outline',
  unpublished: 'destructive',
  rejected: 'destructive',
};

const AdminAdsPage = () => {
  const { listings, updateListingStatus, deleteListing } = useListings();
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [viewListing, setViewListing] = useState<typeof listings[0] | null>(null);

  const handleReject = () => {
    if (rejectId) {
      updateListingStatus(rejectId, 'rejected', rejectReason);
      setRejectId(null);
      setRejectReason('');
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-1">Модерация объявлений</h1>
        <p className="text-muted-foreground mb-6">Объявления, ожидающие проверки</p>

        {listings.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">Нет объявлений</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Автор</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing, idx) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-mono text-xs">{idx + 1}</TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{listing.title || 'Без названия'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{listing.authorEmail || '—'}</TableCell>
                    <TableCell className="text-xs">{listing.category}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{listing.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[listing.status]}>{statusLabels[listing.status]}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost" size="icon" className="h-8 w-8"
                          title="Просмотреть"
                          onClick={() => setViewListing(listing)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {(listing.status === 'moderation' || listing.status === 'draft') && (
                          <Button
                            variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700"
                            title="Одобрить"
                            onClick={() => updateListingStatus(listing.id, 'published')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {listing.status !== 'rejected' && (
                          <Button
                            variant="ghost" size="icon" className="h-8 w-8 text-orange-600 hover:text-orange-700"
                            title="Отклонить"
                            onClick={() => { setRejectId(listing.id); setRejectReason(''); }}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"
                          title="Удалить"
                          onClick={() => deleteListing(listing.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Reject dialog */}
      <Dialog open={!!rejectId} onOpenChange={(open) => { if (!open) setRejectId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отклонить объявление</DialogTitle>
            <DialogDescription>Укажите причину отклонения. Пользователь увидит её в личном кабинете.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Причина отклонения..."
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectId(null)}>Отмена</Button>
            <Button variant="destructive" onClick={handleReject}>Отклонить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View dialog */}
      <Dialog open={!!viewListing} onOpenChange={(open) => { if (!open) setViewListing(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewListing?.title || 'Без названия'}</DialogTitle>
            <DialogDescription>Просмотр объявления</DialogDescription>
          </DialogHeader>
          {viewListing && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Категория:</span> {viewListing.category}</div>
                <div><span className="text-muted-foreground">Подкатегория:</span> {viewListing.subcategory || '—'}</div>
                <div><span className="text-muted-foreground">Район:</span> {viewListing.district || '—'}</div>
                <div><span className="text-muted-foreground">Цена:</span> {viewListing.price || '—'}</div>
                <div><span className="text-muted-foreground">Состояние:</span> {viewListing.condition === 'new' ? 'Новое' : 'Б/у'}</div>
                <div><span className="text-muted-foreground">Продавец:</span> {viewListing.sellerType === 'private' ? 'Частное лицо' : 'Компания'}</div>
                <div><span className="text-muted-foreground">Телефон:</span> {viewListing.phone || '—'}</div>
                <div><span className="text-muted-foreground">Автор:</span> {viewListing.authorEmail || '—'}</div>
              </div>
              {viewListing.description && (
                <div>
                  <span className="text-muted-foreground">Описание:</span>
                  <p className="mt-1">{viewListing.description}</p>
                </div>
              )}
              {viewListing.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {viewListing.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded-md border border-border" />
                  ))}
                </div>
              )}
              {viewListing.rejectionReason && (
                <div className="text-destructive">
                  <span className="font-medium">Причина отклонения:</span> {viewListing.rejectionReason}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAdsPage;
