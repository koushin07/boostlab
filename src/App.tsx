import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import IndexPage from "./pages/Index";
import GuestLayout from "./layouts/GuestLayout";
import Terms from "./pages/Terms";
import ScrollToTop from "./utils/ScrollToTop";
import CookiesPolicy from "./pages/CookiesPolicy";
import NonAffiliation from "./pages/NonAffiliation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";

function App() {
  return (
    <TooltipProvider>
      <Toaster position="bottom-right" richColors closeButton />

      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          <Route element={<GuestLayout />} >
          <Route path="/" element={<IndexPage />} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/cookies" element={<CookiesPolicy/>} />
          <Route path="/non-affiliation" element={<NonAffiliation/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/refund" element={<RefundPolicy/>} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
