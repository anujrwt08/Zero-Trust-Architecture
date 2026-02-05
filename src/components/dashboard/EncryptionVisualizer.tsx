 import { motion } from 'framer-motion';
 import { Lock, Unlock, ArrowRight } from 'lucide-react';
 
 interface EncryptionVisualizerProps {
   isDecrypting?: boolean;
   showProcess?: boolean;
 }
 
 export function EncryptionVisualizer({ isDecrypting = false, showProcess = true }: EncryptionVisualizerProps) {
   if (!showProcess) return null;
   
   return (
     <div className="flex items-center justify-center gap-4 p-6 rounded-lg bg-secondary/30 border border-border/50">
       {/* Raw Data */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="flex flex-col items-center gap-2"
       >
         <div className="w-12 h-12 rounded-lg bg-success/10 border border-success/30 flex items-center justify-center">
           <span className="text-xs font-mono text-success">DATA</span>
         </div>
         <span className="text-xs text-muted-foreground">Your Data</span>
       </motion.div>
       
       {/* Arrow */}
       <ArrowRight className="h-4 w-4 text-muted-foreground" />
       
       {/* Encryption */}
       <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ delay: 0.2 }}
         className="flex flex-col items-center gap-2"
       >
         <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center animate-encrypt">
           {isDecrypting ? (
             <Unlock className="h-5 w-5 text-primary" />
           ) : (
             <Lock className="h-5 w-5 text-primary" />
           )}
         </div>
         <span className="text-xs text-muted-foreground">
           {isDecrypting ? 'Decrypt' : 'Encrypt'}
         </span>
       </motion.div>
       
       {/* Arrow */}
       <ArrowRight className="h-4 w-4 text-muted-foreground" />
       
       {/* Result */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.4 }}
         className="flex flex-col items-center gap-2"
       >
         <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
           <span className="text-xs font-mono text-accent truncate">
             {isDecrypting ? 'DATA' : 'x9K...'}
           </span>
         </div>
         <span className="text-xs text-muted-foreground">
           {isDecrypting ? 'Readable' : 'Encrypted'}
         </span>
       </motion.div>
     </div>
   );
 }