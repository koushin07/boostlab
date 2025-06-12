import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import IndexPage from "./pages/Index";

function App() {
  return (
    <TooltipProvider>
      <Toaster position="bottom-right" richColors closeButton />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
