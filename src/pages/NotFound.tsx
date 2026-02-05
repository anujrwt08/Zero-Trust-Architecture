import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      <div className="absolute inset-0 security-grid opacity-30" />
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center">
        <GlassCard className="max-w-md p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-gradient-primary mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            This page doesn't exist or you don't have access.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NotFound;
