import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import {
  articles, categories, coverImages, getCategoryById,
  categoryColors, formatTime
} from '@/data/mockData';
import { Eye, MessageSquare } from 'lucide-react';
import RightPanel from '@/components/home/RightPanel';

const CategoryPage = () => {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return (
      <Layout>
        <div className="max-w-[1280px] mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Рубрика не найдена</h1>
          <Link to="/" className="text-primary hover:underline">← Вернуться на главную</Link>
        </div>
      </Layout>
    );
  }

  const catArticles = articles.filter(a => a.categoryId === category.id);

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        <div className="flex items-center gap-3 mb-5">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Главная</Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="font-bold text-xl">{category.name}</h1>
          <span className="text-sm text-muted-foreground">({catArticles.length})</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div>
            {/* Featured card */}
            {catArticles.length > 0 && (
              <Link to={`/article/${catArticles[0].slug}`} className="news-card block bg-card rounded-lg overflow-hidden mb-4">
                <img src={coverImages[catArticles[0].coverIndex]} alt="" className="w-full h-52 object-cover" loading="lazy" />
                <div className="p-4">
                  <h2 className="font-bold text-lg leading-snug mb-2">{catArticles[0].title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">{catArticles[0].excerpt}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                    <span>{formatTime(catArticles[0].publishedAt)}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{catArticles[0].views}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{catArticles[0].commentsCount}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* List */}
            <div className="space-y-3">
              {catArticles.slice(1).map(article => (
                <Link key={article.id} to={`/article/${article.slug}`} className="news-card bg-card rounded-lg p-3 flex gap-3">
                  <img src={coverImages[article.coverIndex]} alt="" className="w-28 h-20 object-cover rounded flex-shrink-0" loading="lazy" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-tight line-clamp-2 mb-1.5">{article.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatTime(article.publishedAt)}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{article.commentsCount}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <RightPanel />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
