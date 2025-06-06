import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import TimelinePage from "./pages/TimelinePage";
import WorkshopsPage from "./pages/WorkshopsPage";
import SubmitPage from "./pages/SubmitPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import SponsorsPage from "./pages/SponsorsPage";
import PartnersPage from '@/pages/PartnersPage';
import EducatorsPage from '@/pages/EducatorsPage';
import { PopupNotificationSystem } from '@/components/popups';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/sponsors" element={<SponsorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/educators" element={<EducatorsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* OnScreen '25 Popup Notification System */}
          <PopupNotificationSystem 
                    autoShow={true}
                    showDelay={1500}
                    maxAutoShows={1}
                    forceShow={false}
          />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;