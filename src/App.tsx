import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import PatientDashboard from "./pages/PatientDashboard";
import PatientConsent from "./pages/PatientConsent";
import PatientAudit from "./pages/PatientAudit";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Settings from "./pages/Settings";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/consent" element={<PatientConsent />} />
            <Route path="/patient/audit" element={<PatientAudit />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/patient/settings" element={<Settings />} />
            <Route path="/doctor/settings" element={<Settings />} />
            <Route path="/admin/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
