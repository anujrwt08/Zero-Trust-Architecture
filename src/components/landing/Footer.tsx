 import { Shield } from 'lucide-react';
 import { Link } from 'react-router-dom';
 
 export function Footer() {
   return (
     <footer className="py-12 border-t border-border/50">
       <div className="container mx-auto px-6">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-2">
             <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/30">
               <Shield className="h-5 w-5 text-primary" />
             </div>
             <span className="font-bold text-lg">
               MedVault <span className="text-primary">Zero</span>
             </span>
           </Link>
           
           {/* Links */}
           <div className="flex items-center gap-6 text-sm text-muted-foreground">
             <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
             <a href="#" className="hover:text-foreground transition-colors">Terms</a>
             <a href="#" className="hover:text-foreground transition-colors">Security</a>
             <a href="#" className="hover:text-foreground transition-colors">Contact</a>
           </div>
           
           {/* Copyright */}
           <p className="text-sm text-muted-foreground">
             © 2025 MedVault Zero. All rights reserved.
           </p>
         </div>
       </div>
     </footer>
   );
 }