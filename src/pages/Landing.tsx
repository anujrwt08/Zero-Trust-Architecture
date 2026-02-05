 import { Navbar } from '@/components/landing/Navbar';
 import { HeroSection } from '@/components/landing/HeroSection';
 import { FeaturesSection } from '@/components/landing/FeaturesSection';
 import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
 import { Footer } from '@/components/landing/Footer';
 
 export default function Landing() {
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       <main>
         <HeroSection />
         <div id="features">
           <FeaturesSection />
         </div>
         <div id="how-it-works">
           <HowItWorksSection />
         </div>
       </main>
       <Footer />
     </div>
   );
 }