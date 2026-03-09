import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ListingsProvider } from "@/contexts/ListingsContext";
import { NewsProvider } from "@/contexts/NewsContext";
import { CityProvider } from "@/contexts/CityContext";
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
import AINewsPipelinePage from "./pages/admin/ai/AINewsPipelinePage";
import AINewsQueuePage from "./pages/admin/ai/AINewsQueuePage";
import AINewsReviewPage from "./pages/admin/ai/AINewsReviewPage";
import AINewsPendingPage from "./pages/admin/ai/AINewsPendingPage";
import AINewsPromptsPage from "./pages/admin/ai/AINewsPromptsPage";
import AINewsSettingsPage from "./pages/admin/ai/AINewsSettingsPage";
import AINewsLogPage from "./pages/admin/ai/AINewsLogPage";
import { AIProvider } from "./contexts/AIContext";
import ControlDashboard from "./pages/admin/control/ControlDashboard";
import ControlNewsPage from "./pages/admin/control/ControlNewsPage";
import ControlAdsPage from "./pages/admin/control/ControlAdsPage";
import ControlSEOPage from "./pages/admin/control/ControlSEOPage";
import ControlContentPage from "./pages/admin/control/ControlContentPage";
import ControlAnalyticsPage from "./pages/admin/control/ControlAnalyticsPage";
import ControlSecurityPage from "./pages/admin/control/ControlSecurityPage";
import CityIntelligencePage from "./pages/admin/control/CityIntelligencePage";
import AINetworksPage from "./pages/admin/control/AINetworksPage";
import ControlAPIPage from "./pages/admin/control/ControlAPIPage";
import ControlTasksPage from "./pages/admin/control/ControlTasksPage";
import ControlLogPage from "./pages/admin/control/ControlLogPage";
import AICommandCenter from "./pages/admin/control/AICommandCenter";
import GrowthEnginePage from "./pages/admin/control/GrowthEnginePage";
import GrowthTopicsPage from "./pages/admin/control/growth/GrowthTopicsPage";
import GrowthArticlesPage from "./pages/admin/control/growth/GrowthArticlesPage";
import GrowthTrendsPage from "./pages/admin/control/growth/GrowthTrendsPage";
import GrowthCalendarPage from "./pages/admin/control/growth/GrowthCalendarPage";
import GrowthSEOPagesPage from "./pages/admin/control/growth/GrowthSEOPagesPage";
import GrowthLinkingPage from "./pages/admin/control/growth/GrowthLinkingPage";
import GrowthPredictionsPage from "./pages/admin/control/growth/GrowthPredictionsPage";
import ControlPromptsPage from "./pages/admin/control/ControlPromptsPage";
import MapPage from "./pages/MapPage";
import ControlMapPage from "./pages/admin/control/ControlMapPage";
import NewsHunterPage from "./pages/admin/control/news-hunter/NewsHunterPage";
import NewsHunterQueuePage from "./pages/admin/control/news-hunter/NewsHunterQueuePage";
import NewsHunterLogPage from "./pages/admin/control/news-hunter/NewsHunterLogPage";
import NewsHunterSettingsPage from "./pages/admin/control/news-hunter/NewsHunterSettingsPage";
import DraftEditPage from "./pages/admin/control/news/DraftEditPage";
import NewsEditorPage from "./pages/admin/control/news/NewsEditorPage";
import NewsListPage from "./pages/admin/control/news/NewsListPage";
import EditorialLogFullPage from "./pages/admin/control/news/EditorialLogPage";
import EditorialDashboard from "./pages/admin/control/editorial/EditorialDashboard";
import EditorialQueuePage from "./pages/admin/control/editorial/EditorialQueuePage";
import EditorialArticlePage from "./pages/admin/control/editorial/EditorialArticlePage";
import EditorialCalendarPage from "./pages/admin/control/editorial/EditorialCalendarPage";
import EditorialTopicsPage from "./pages/admin/control/editorial/EditorialTopicsPage";
import EditorialTasksPage from "./pages/admin/control/editorial/EditorialTasksPage";
import EditorialLogPage from "./pages/admin/control/editorial/EditorialLogPage";
import CitiesPage from "./pages/admin/control/cities/CitiesPage";
import HoldingDashboard from "./pages/admin/holding/HoldingDashboard";
import HoldingCitiesPage from "./pages/admin/holding/HoldingCitiesPage";
import HoldingNewsPage from "./pages/admin/holding/HoldingNewsPage";
import HoldingAINewsPage from "./pages/admin/holding/HoldingAINewsPage";
import HoldingModerationPage from "./pages/admin/holding/HoldingModerationPage";
import HoldingCalendarPage from "./pages/admin/holding/HoldingCalendarPage";
import HoldingAnalyticsPage from "./pages/admin/holding/HoldingAnalyticsPage";
import CreateCityPage from "./pages/admin/holding/CreateCityPage";
import HoldingGrowthPage from "./pages/admin/holding/growth/HoldingGrowthPage";
import GrowthCitiesPage from "./pages/admin/holding/growth/GrowthCitiesPage";
import GrowthSuggestionsPage from "./pages/admin/holding/growth/GrowthSuggestionsPage";
import GrowthAnalyticsPage from "./pages/admin/holding/growth/GrowthAnalyticsPage";
import AdminMapPage from "./pages/admin/AdminMapPage";
import AIEditorQueuePage from "./pages/admin/control/ai/AIEditorQueuePage";
import AIEditorLogPage from "./pages/admin/control/ai/AIEditorLogPage";
import AIEditorSettingsPage from "./pages/admin/control/ai/AIEditorSettingsPage";
import AIJournalistPage from "./pages/admin/control/ai/AIJournalistPage";
import AIJournalistTopicsPage from "./pages/admin/control/ai/AIJournalistTopicsPage";
import AIJournalistLogPage from "./pages/admin/control/ai/AIJournalistLogPage";
import AIFrontEditorPage from "./pages/admin/control/ai/AIFrontEditorPage";
import AIFrontEditorSuggestionsPage from "./pages/admin/control/ai/AIFrontEditorSuggestionsPage";
import AIFrontEditorLogPage from "./pages/admin/control/ai/AIFrontEditorLogPage";
import AIFrontEditorSettingsPage from "./pages/admin/control/ai/AIFrontEditorSettingsPage";
import ContentAnalyticsDashboard from "./pages/admin/control/analytics/ContentAnalyticsDashboard";
import TopNewsPage from "./pages/admin/control/analytics/TopNewsPage";
import CategoriesAnalyticsPage from "./pages/admin/control/analytics/CategoriesAnalyticsPage";
import CitiesAnalyticsPage from "./pages/admin/control/analytics/CitiesAnalyticsPage";
import RecommendationsPage from "./pages/admin/control/analytics/RecommendationsPage";
import AIContentAnalyticsPage from "./pages/admin/control/analytics/AIContentAnalyticsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ListingsProvider>
        <NewsProvider>
        <CityProvider>
        <AIProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
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
            <Route path="/admin/ai/news/settings" element={<AINewsSettingsPage />} />
            <Route path="/admin/ai/news/pending" element={<AINewsPendingPage />} />
            <Route path="/admin/ai/news/log" element={<AINewsLogPage />} />
            <Route path="/admin/ai/news-pipeline" element={<AINewsPipelinePage />} />
            <Route path="/admin/ai/news-queue" element={<AINewsQueuePage />} />
            <Route path="/admin/ai/news-review/:id" element={<AINewsReviewPage />} />
            <Route path="/admin/ai/news-prompts" element={<AINewsPromptsPage />} />
            <Route path="/admin/ai/moderation" element={<AIModerationPage />} />
            <Route path="/admin/ai/seo" element={<AISEOPage />} />
            <Route path="/admin/ai/content" element={<AIContentPage />} />
            <Route path="/admin/ai/analytics" element={<AIAnalyticsPage />} />
            <Route path="/admin/ai/security" element={<AISecurityPage />} />
            <Route path="/admin/ai/tasks" element={<AITasksPage />} />
            <Route path="/admin/ai/settings" element={<AISettingsPage />} />
            <Route path="/admin/ai/log" element={<AILogPage />} />
            <Route path="/admin/control" element={<ControlDashboard />} />
            <Route path="/admin/control/news" element={<ControlNewsPage />} />
            <Route path="/admin/control/news/queue" element={<AINewsQueuePage />} />
            <Route path="/admin/control/news/editor/new" element={<NewsEditorPage />} />
            <Route path="/admin/control/news/editor/:id" element={<NewsEditorPage />} />
            <Route path="/admin/control/news/drafts/:id" element={<DraftEditPage />} />
            <Route path="/admin/control/news/drafts" element={<NewsListPage mode="drafts" />} />
            <Route path="/admin/control/news/published" element={<NewsListPage mode="published" />} />
            <Route path="/admin/control/news/log" element={<EditorialLogFullPage />} />
            <Route path="/admin/control/news/sources" element={<AINewsSourcesPage />} />
            <Route path="/admin/control/news/prompts" element={<AINewsPromptsPage />} />
            <Route path="/admin/control/news/settings" element={<AINewsSettingsPage />} />
            <Route path="/admin/control/ads" element={<ControlAdsPage />} />
            <Route path="/admin/control/seo" element={<ControlSEOPage />} />
            <Route path="/admin/control/content" element={<ControlContentPage />} />
            <Route path="/admin/control/analytics" element={<ContentAnalyticsDashboard />} />
            <Route path="/admin/control/analytics/top-news" element={<TopNewsPage />} />
            <Route path="/admin/control/analytics/categories" element={<CategoriesAnalyticsPage />} />
            <Route path="/admin/control/analytics/cities" element={<CitiesAnalyticsPage />} />
            <Route path="/admin/control/analytics/recommendations" element={<RecommendationsPage />} />
            <Route path="/admin/control/analytics/ai-content" element={<AIContentAnalyticsPage />} />
            <Route path="/admin/control/security" element={<ControlSecurityPage />} />
            <Route path="/admin/control/city" element={<CityIntelligencePage />} />
            <Route path="/admin/control/ai-networks" element={<AINetworksPage />} />
            <Route path="/admin/control/api" element={<ControlAPIPage />} />
            <Route path="/admin/control/tasks" element={<ControlTasksPage />} />
            <Route path="/admin/control/log" element={<ControlLogPage />} />
            <Route path="/admin/control/ai" element={<AICommandCenter />} />
            <Route path="/admin/control/growth" element={<GrowthEnginePage />} />
            <Route path="/admin/control/growth/topics" element={<GrowthTopicsPage />} />
            <Route path="/admin/control/growth/articles" element={<GrowthArticlesPage />} />
            <Route path="/admin/control/growth/trends" element={<GrowthTrendsPage />} />
            <Route path="/admin/control/growth/calendar" element={<GrowthCalendarPage />} />
            <Route path="/admin/control/growth/seo-pages" element={<GrowthSEOPagesPage />} />
            <Route path="/admin/control/growth/linking" element={<GrowthLinkingPage />} />
            <Route path="/admin/control/growth/predictions" element={<GrowthPredictionsPage />} />
            <Route path="/admin/control/prompts" element={<ControlPromptsPage />} />
            <Route path="/admin/control/map" element={<ControlMapPage />} />
            <Route path="/admin/control/news-hunter" element={<NewsHunterPage />} />
            <Route path="/admin/control/news-hunter/queue" element={<NewsHunterQueuePage />} />
            <Route path="/admin/control/news-hunter/log" element={<NewsHunterLogPage />} />
            <Route path="/admin/control/news-hunter/settings" element={<NewsHunterSettingsPage />} />
            <Route path="/admin/control/editorial" element={<EditorialDashboard />} />
            <Route path="/admin/control/editorial/queue" element={<EditorialQueuePage />} />
            <Route path="/admin/control/editorial/article/:id" element={<EditorialArticlePage />} />
            <Route path="/admin/control/editorial/calendar" element={<EditorialCalendarPage />} />
            <Route path="/admin/control/editorial/topics" element={<EditorialTopicsPage />} />
            <Route path="/admin/control/editorial/tasks" element={<EditorialTasksPage />} />
            <Route path="/admin/control/editorial/log" element={<EditorialLogPage />} />
            <Route path="/admin/control/cities" element={<CitiesPage />} />
            <Route path="/admin/control/ai/editor" element={<AIEditorQueuePage />} />
            <Route path="/admin/control/ai/editor-log" element={<AIEditorLogPage />} />
            <Route path="/admin/control/ai/editor-settings" element={<AIEditorSettingsPage />} />
            <Route path="/admin/control/ai/journalist" element={<AIJournalistPage />} />
            <Route path="/admin/control/ai/journalist/topics" element={<AIJournalistTopicsPage />} />
            <Route path="/admin/control/ai/journalist/log" element={<AIJournalistLogPage />} />
            <Route path="/admin/control/ai/front-editor" element={<AIFrontEditorPage />} />
            <Route path="/admin/control/ai/front-editor/suggestions" element={<AIFrontEditorSuggestionsPage />} />
            <Route path="/admin/control/ai/front-editor/log" element={<AIFrontEditorLogPage />} />
            <Route path="/admin/control/ai/front-editor/settings" element={<AIFrontEditorSettingsPage />} />
            <Route path="/admin/holding" element={<HoldingDashboard />} />
            <Route path="/admin/holding/cities" element={<HoldingCitiesPage />} />
            <Route path="/admin/holding/news" element={<HoldingNewsPage />} />
            <Route path="/admin/holding/ai-news" element={<HoldingAINewsPage />} />
            <Route path="/admin/holding/moderation" element={<HoldingModerationPage />} />
            <Route path="/admin/holding/calendar" element={<HoldingCalendarPage />} />
            <Route path="/admin/holding/analytics" element={<HoldingAnalyticsPage />} />
            <Route path="/admin/holding/create-city" element={<CreateCityPage />} />
            <Route path="/admin/holding/growth" element={<HoldingGrowthPage />} />
            <Route path="/admin/holding/growth/cities" element={<GrowthCitiesPage />} />
            <Route path="/admin/holding/growth/suggestions" element={<GrowthSuggestionsPage />} />
            <Route path="/admin/holding/growth/analytics" element={<GrowthAnalyticsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AIProvider>
        </CityProvider>
        </NewsProvider>
        </ListingsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
