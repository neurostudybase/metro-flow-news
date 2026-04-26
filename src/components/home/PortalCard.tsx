import { Link } from 'react-router-dom';
import { Eye, MessageSquare, Bookmark } from 'lucide-react';
import { coverImages, getCategoryById, categoryColors, formatTime, type Article } from '@/data/mockData';

interface PortalCardProps {
  article: Article;
  imageHeight?: number;
  className?: string;
}

/**
 * Универсальная вертикальная карточка в стиле 72.ru.
 * Пиксель-в-пиксель: фото сверху, цветная плашка рубрики (uppercase, bold, 11px),
 * жирный заголовок 16/20px, мета-блок снизу: время · просмотры · комментарии · закладка.
 * Цифры — синим (primary), иконки и время — серым.
 */
const PortalCard = ({ article, imageHeight = 200, className = '' }: PortalCardProps) => {
  const cat = getCategoryById(article.categoryId);
  const catColor = categoryColors[article.categoryId];

  return (
    <Link
      to={`/article/${article.slug}`}
      className={`group block bg-card overflow-hidden ${className}`}
    >
      {/* Фото — без скруглений и без бордера */}
      <div className="relative w-full overflow-hidden bg-secondary">
        <img
          src={coverImages[article.coverIndex]}
          alt={article.title}
          className="w-full object-cover"
          style={{ height: `${imageHeight}px` }}
          loading="lazy"
        />
      </div>

      {/* Текстовый блок */}
      <div className="px-3 pt-2.5 pb-3">
        {/* Лейбл рубрики — uppercase, мелкий, цвет рубрики */}
        <div
          className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1.5"
          style={{ color: catColor }}
        >
          {cat?.name}
        </div>

        {/* Заголовок — жирный, 16px, leading-tight */}
        <h3 className="text-[16px] font-bold leading-[1.25] text-foreground line-clamp-4">
          {article.title}
        </h3>

        {/* Мета — время · глаз+просмотры · коммент+комменты · bookmark справа */}
        <div className="flex items-center gap-3 mt-3 text-[13px] text-muted-foreground">
          <span className="text-muted-foreground">{formatTime(article.publishedAt)}</span>
          <span className="flex items-center gap-1">
            <Eye className="w-[15px] h-[15px] text-muted-foreground" strokeWidth={1.6} />
            <span className="text-primary font-normal tabular-nums">
              {article.views.toLocaleString('ru-RU').replace(/,/g, ' ')}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-[15px] h-[15px] text-muted-foreground" strokeWidth={1.6} />
            <span className="text-primary font-normal tabular-nums">{article.commentsCount}</span>
          </span>
          <Bookmark
            className="w-[16px] h-[16px] text-muted-foreground ml-auto cursor-pointer hover:text-primary transition-colors"
            strokeWidth={1.6}
          />
        </div>
      </div>
    </Link>
  );
};

export default PortalCard;
