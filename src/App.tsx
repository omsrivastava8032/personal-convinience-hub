
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import LearningPage from "./pages/LearningPage";
import ResumePage from "./pages/ResumePage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
