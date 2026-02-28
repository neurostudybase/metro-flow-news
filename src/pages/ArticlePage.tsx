import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import {
  articles, coverImages, getCategoryById, getAuthorById,
  categoryColors, formatTime, formatDate, getArticleContent
} from '@/data/mockData';
import { Eye, MessageSquare, ArrowLeft, Bookmark } from 'lucide-react';
import RightPanel from '@/components/home/RightPanel';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="max-w-[1280px] mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Материал не найден</h1>
          <Link to="/" className="text-primary hover:underline">← Вернуться на главную</Link>
        </div>
      </Layout>
    );
  }

  const cat = getCategoryById(article.categoryId);
  const author = getAuthorById(article.authorId);
  const related = articles.filter(a => a.categoryId === article.categoryId && a.id !== article.id).slice(0, 4);

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Главная
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Article */}
          <article className="bg-card rounded-lg overflow-hidden">
            <img src={coverImages[article.coverIndex]} alt={article.title} className="w-full h-64 sm:h-80 object-cover" />
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ backgroundColor: categoryColors[article.categoryId] + '18', color: categoryColors[article.categoryId] }}
                >
                  {cat?.name}
                </span>
                <span className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}, {formatTime(article.publishedAt)}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">{article.title}</h1>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {author?.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{author?.name}</div>
                    <div className="text-xs text-muted-foreground">{author?.bio}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{article.views}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" />{article.commentsCount}</span>
                  <button className="hover:text-primary transition-colors"><Bookmark className="w-4 h-4" /></button>
                </div>
              </div>

              <div
                className="article-content text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: getArticleContent(article) }}
              />

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h2 className="font-bold text-lg mb-4">Читайте также</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {related.map(a => (
                      <Link key={a.id} to={`/article/${a.slug}`} className="news-card bg-background rounded-lg overflow-hidden">
                        <img src={coverImages[a.coverIndex]} alt="" className="w-full h-28 object-cover" loading="lazy" />
                        <div className="p-3">
                          <h3 className="text-sm font-semibold leading-tight line-clamp-2">{a.title}</h3>
                          <span className="text-xs text-muted-foreground mt-1 block">{formatTime(a.publishedAt)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments placeholder */}
              <div className="mt-8 pt-6 border-t border-border">
                <h2 className="font-bold text-lg mb-4">Комментарии ({article.commentsCount})</h2>
                <div className="bg-background rounded-lg p-4 text-center text-sm text-muted-foreground">
                  Войдите, чтобы оставить комментарий
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <RightPanel />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;
