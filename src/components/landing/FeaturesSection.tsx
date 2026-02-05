 import { motion } from 'framer-motion';
 import { Lock, Shield, AlertTriangle, Eye, Server, UserCheck } from 'lucide-react';
 import { GlassCard } from '@/components/ui/GlassCard';
 
 const features = [
   {
     icon: Lock,
     title: 'Client-Side Encryption',
     description: 'Your data is encrypted in your browser before it ever reaches our servers. We literally cannot read your medical records.',
     color: 'text-accent',
   },
   {
     icon: Server,
     title: 'Zero-Trust Architecture',
     description: 'The server never sees your unencrypted data. Even in case of a breach, attackers only get meaningless encrypted blobs.',
     color: 'text-primary',
   },
   {
     icon: UserCheck,
     title: 'Consent-Based Access',
     description: 'Doctors can only access your records with your explicit, time-limited consent. You control who sees what and for how long.',
     color: 'text-success',
   },
   {
     icon: Eye,
     title: 'Immutable Audit Trail',
     description: 'Every access attempt is permanently logged. See exactly who viewed your records, when, and from where.',
     color: 'text-primary',
   },
   {
     icon: AlertTriangle,
     title: 'Active Defense System',
     description: 'Honeytokens detect and trap attackers. Fake records trigger instant alerts when accessed, exposing malicious actors.',
     color: 'text-warning',
   },
   {
     icon: Shield,
     title: 'Automatic Expiry',
     description: 'Doctor access automatically expires. No more worrying about lingering permissions or forgotten access grants.',
     color: 'text-primary',
   },
 ];
 
 export function FeaturesSection() {
   return (
     <section className="py-24 relative">
       <div className="absolute inset-0 security-grid opacity-30" />
       
       <div className="container mx-auto px-6 relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-16"
         >
           <h2 className="text-4xl font-bold mb-4">
             Security That <span className="text-gradient-primary">Fights Back</span>
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             Built from the ground up with a paranoid mindset. Every layer designed to protect your most sensitive data.
           </p>
         </motion.div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {features.map((feature, index) => (
             <motion.div
               key={feature.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
             >
               <GlassCard hover glow="primary" className="h-full">
                 <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                 <p className="text-muted-foreground">{feature.description}</p>
               </GlassCard>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 }