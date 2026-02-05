 import { motion } from 'framer-motion';
 import { Shield, Lock, Eye } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Link } from 'react-router-dom';
 
 export function HeroSection() {
   return (
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 security-grid opacity-50" />
       
       {/* Gradient Orbs */}
       <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
       <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
       
       <div className="container mx-auto px-6 relative z-10">
         <div className="max-w-4xl mx-auto text-center">
           {/* Security Badge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
           >
             <Shield className="h-4 w-4 text-primary animate-shield" />
             <span className="text-sm font-medium text-primary">Zero-Trust Architecture</span>
           </motion.div>
           
           {/* Main Headline */}
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
           >
             Your medical data.
             <br />
             <span className="text-gradient-primary">Only you can read it.</span>
           </motion.h1>
           
           {/* Subtitle */}
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
           >
             MedVault Zero is the self-defending medical archive. Your data is encrypted 
             before it ever leaves your device. Not even we can read it.
           </motion.p>
           
           {/* CTA Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="flex flex-col sm:flex-row gap-4 justify-center"
           >
             <Link to="/auth?role=patient">
               <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow-primary">
                 <Lock className="mr-2 h-5 w-5" />
                 Patient Portal
               </Button>
             </Link>
             <Link to="/auth?role=doctor">
               <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-primary/50 hover:bg-primary/10">
                 <Eye className="mr-2 h-5 w-5" />
                 Doctor Access
               </Button>
             </Link>
           </motion.div>
           
           {/* Trust Indicators */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.5 }}
             className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground"
           >
             <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
               <span className="text-sm">AES-256 Encryption</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
               <span className="text-sm">HIPAA Compliant</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
               <span className="text-sm">Active Defense</span>
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 }