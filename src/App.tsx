
import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initSentry } from "@/lib/monitoring";
import { initHoneybadger } from "@/lib/honeybadger";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Lazy load pages for better performance
import { lazy } from "react";

const OptimizedIndex = lazy(() => import("./pages/OptimizedIndex"));
const Blog = lazy(() => import("./pages/Blog"));
const Tools = lazy(() => import("./pages/Tools"));
const Pickup = lazy(() => import("./pages/tools/Pickup"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize monitoring services
    if (import.meta.env.MODE === 'production') {
      initSentry();
      initHoneybadger();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GoogleAnalytics />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<OptimizedIndex />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/pickup" element={<Pickup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
