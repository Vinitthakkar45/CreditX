import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Userpage from "./pages/users"
import ReportPage from "./pages/report"
// import ChatInterface from "@/components/ChatInterface";
import Chat from "./pages/chat";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/:userId" element={<Index />} />
          <Route path="/chat/:userId" element={<Chat />} />
          <Route path="/" element={<Userpage />} /> 
          <Route path="/report/:userId" element={<ReportPage />} /> 

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
