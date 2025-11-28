import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Venues from "./pages/Venues";
import VenueDetail from "./pages/VenueDetail";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import Guidelines from "./pages/Guidelines";
import BookingStep1 from "./pages/BookingStep1";
import BookingStep2 from "./pages/BookingStep2";
import BookingStep3 from "./pages/BookingStep3";
import BookingStep4 from "./pages/BookingStep4";
import BookingConfirmation from "./pages/BookingConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/venues/:id" element={<VenueDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/booking/step1" element={<BookingStep1 />} />
              <Route path="/booking/step2" element={<BookingStep2 />} />
              <Route path="/booking/step3" element={<BookingStep3 />} />
              <Route path="/booking/step4" element={<BookingStep4 />} />
              <Route path="/booking/confirmation" element={<BookingConfirmation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
