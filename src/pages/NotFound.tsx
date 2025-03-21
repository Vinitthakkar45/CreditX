
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import BackgroundEffect from "@/components/BackgroundEffect";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background overflow-hidden">
      <BackgroundEffect />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl opacity-30 rounded-full transform rotate-12"></div>
        <div className="glass-card p-10 max-w-md text-center animate-fade-in relative overflow-hidden backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-destructive/10 p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
              <AlertTriangle className="h-12 w-12 text-destructive drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">404</h1>
          <p className="text-xl text-muted-foreground mb-8 relative">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            asChild 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)] transition-all duration-300 border border-white/10"
          >
            <a href="/" className="px-8 py-2 relative overflow-hidden group">
              <span className="relative z-10">Return to Dashboard</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
