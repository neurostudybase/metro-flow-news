import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ListingsProvider } from "@/contexts/ListingsContext";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import ObyavleniyaPage from "./pages/ObyavleniyaPage";
import ClassifiedDetailPage from "./pages/ClassifiedDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CabinetPage from "./pages/CabinetPage";
import ProfilePage from "./pages/ProfilePage";
import MyAdsPage from "./pages/MyAdsPage";
import NewListingPage from "./pages/NewListingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminAdsPage from "./pages/admin/AdminAdsPage";
import AdminContentPage from "./pages/admin/AdminContentPage";
import AIDashboardPage from "./pages/admin/ai/AIDashboardPage";
import AINewsPage from "./pages/admin/ai/AINewsPage";
import AIModerationPage from "./pages/admin/ai/AIModerationPage";
import AISEOPage from "./pages/admin/ai/AISEOPage";
import AIContentPage from "./pages/admin/ai/AIContentPage";
import AIAnalyticsPage from "./pages/admin/ai/AIAnalyticsPage";
import AISecurityPage from "./pages/admin/ai/AISecurityPage";
import AITasksPage from "./pages/admin/ai/AITasksPage";
import AISettingsPage from "./pages/admin/ai/AISettingsPage";
import AILogPage from "./pages/admin/ai/AILogPage";
import AINewsDraftsPage from "./pages/admin/ai/AINewsDraftsPage";
import AINewsPublishedPage from "./pages/admin/ai/AINewsPublishedPage";
import AINewsSourcesPage from "./pages/admin/ai/AINewsSourcesPage";
import { AIProvider } from "./contexts/AIContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ListingsProvider>
        <AIProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/obyavleniya" element={<ObyavleniyaPage />} />
            <Route path="/obyavleniya/:id" element={<ClassifiedDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cabinet" element={<CabinetPage />} />
            <Route path="/cabinet/profile" element={<ProfilePage />} />
            <Route path="/cabinet/ads" element={<MyAdsPage />} />
            <Route path="/cabinet/new-listing" element={<NewListingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/ads" element={<AdminAdsPage />} />
            <Route path="/admin/content" element={<AdminContentPage />} />
            <Route path="/admin/ai" element={<AIDashboardPage />} />
            <Route path="/admin/ai/news" element={<AINewsPage />} />
            <Route path="/admin/ai/news/drafts" element={<AINewsDraftsPage />} />
            <Route path="/admin/ai/news/published" element={<AINewsPublishedPage />} />
            <Route path="/admin/ai/news/sources" element={<AINewsSourcesPage />} />
            <Route path="/admin/ai/moderation" element={<AIModerationPage />} />
            <Route path="/admin/ai/seo" element={<AISEOPage />} />
            <Route path="/admin/ai/content" element={<AIContentPage />} />
            <Route path="/admin/ai/analytics" element={<AIAnalyticsPage />} />
            <Route path="/admin/ai/security" element={<AISecurityPage />} />
            <Route path="/admin/ai/tasks" element={<AITasksPage />} />
            <Route path="/admin/ai/settings" element={<AISettingsPage />} />
            <Route path="/admin/ai/log" element={<AILogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AIProvider>
        </ListingsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
