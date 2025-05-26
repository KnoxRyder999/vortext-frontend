
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/store';
import ProjectEditor from "@/pages/ProjectEditor";
import Demo from "./pages/Demo";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/project" element={<ProjectEditor/>}/>
              <Route path="/project/:id" element={<ProjectEditor/>}/>
              <Route path="/demo/:id" element={<Demo/>}/>
              { /* ROUTE */}
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
