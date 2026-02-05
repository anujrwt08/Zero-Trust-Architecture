 import { Link } from 'react-router-dom';
 import { Shield } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 export function Navbar() {
   return (
     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
       <div className="container mx-auto px-6">
         <div className="flex items-center justify-between h-16">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-2">
             <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/30">
               <Shield className="h-5 w-5 text-primary" />
             </div>
             <span className="font-bold text-lg">
               MedVault <span className="text-primary">Zero</span>
             </span>
           </Link>
           
           {/* Navigation */}
           <div className="hidden md:flex items-center gap-8">
             <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
               Features
             </a>
             <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
               How It Works
             </a>
             <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
               Security
             </a>
           </div>
           
           {/* Auth Buttons */}
           <div className="flex items-center gap-3">
             <Link to="/auth">
               <Button variant="ghost" size="sm">
                 Sign In
               </Button>
             </Link>
             <Link to="/auth?mode=signup">
               <Button size="sm" className="bg-primary hover:bg-primary/90">
                 Get Started
               </Button>
             </Link>
           </div>
         </div>
       </div>
     </nav>
   );
 }