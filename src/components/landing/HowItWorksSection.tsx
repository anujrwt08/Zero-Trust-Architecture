 import { motion } from 'framer-motion';
 import { Upload, Lock, Send, Eye, ShieldCheck } from 'lucide-react';
 
 const steps = [
   {
     icon: Upload,
     step: '01',
     title: 'Upload Your Data',
     description: 'Add your medical records, lab results, or genomic data to MedVault.',
   },
   {
     icon: Lock,
     step: '02',
     title: 'Encrypted Locally',
     description: 'Your browser encrypts everything using AES-256 before sending.',
   },
   {
     icon: Send,
     step: '03',
     title: 'Stored Securely',
     description: 'Only encrypted blobs reach our servers. We never see your data.',
   },
   {
     icon: Eye,
     step: '04',
     title: 'Grant Access',
     description: 'Share decryption keys with doctors for limited time periods.',
   },
   {
     icon: ShieldCheck,
     step: '05',
     title: 'Stay Protected',
     description: 'Honeytokens and audit logs keep you safe from threats.',
   },
 ];
 
 export function HowItWorksSection() {
   return (
     <section className="py-24 bg-secondary/30">
       <div className="container mx-auto px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-16"
         >
           <h2 className="text-4xl font-bold mb-4">
             How <span className="text-gradient-primary">Zero-Trust</span> Works
           </h2>
           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             Simple for you, impossible for attackers. Here's how we keep your data safe.
           </p>
         </motion.div>
         
         <div className="relative">
           {/* Connection Line */}
           <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
           
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
             {steps.map((step, index) => (
               <motion.div
                 key={step.step}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="relative text-center"
               >
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4 relative z-10">
                   <step.icon className="h-7 w-7 text-primary" />
                 </div>
                 <div className="text-xs font-bold text-primary mb-2">{step.step}</div>
                 <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                 <p className="text-sm text-muted-foreground">{step.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </div>
     </section>
   );
 }