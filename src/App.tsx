
import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initSentry } from "@/lib/monitoring";
import { initHoneybadger } from "@/lib/honeybadger";

// Lazy load pages with better error handling
import { lazy } from "react";

const FastIndex = lazy(() => import("./pages/FastIndex"));
const Blog = lazy(() => import("./pages/Blog"));
const Tools = lazy(() => import("./pages/Tools"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes - increased for better caching
      gcTime: 15 * 60 * 1000, // 15 minutes - increased
      retry: (failureCount, error) => {
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 2; // Reduced retry attempts
      },
      refetchOnWindowFocus: false, // Disable for better performance
      refetchOnMount: false, // Only refetch when really needed
    },
    mutations: {
      retry: 1, // Reduced retry for mutations
    },
  },
});

// Faster loading component
const FastPageLoader = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize monitoring only in production
    if (import.meta.env.MODE === 'production') {
      // Defer monitoring initialization to not block initial render
      setTimeout(() => {
        initSentry();
        initHoneybadger();
      }, 1000);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<FastPageLoader />}>
            <Routes>
              <Route path="/" element={<FastIndex />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
