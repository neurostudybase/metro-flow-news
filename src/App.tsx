import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
