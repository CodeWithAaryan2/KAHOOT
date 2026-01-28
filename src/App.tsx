import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "@/context/QuizContext";
import { AdminProvider } from "@/context/AdminContext";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminQuestionsPage from "./pages/admin/AdminQuestionsPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuizProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz/:categoryId" element={<QuizPage />} />
              <Route path="/result/:categoryId" element={<ResultPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/categories" element={<AdminCategoriesPage />} />
                <Route path="/admin/questions" element={<AdminQuestionsPage />} />
              </Route>
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
