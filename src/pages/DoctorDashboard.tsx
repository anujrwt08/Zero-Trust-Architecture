 import { useState, useEffect } from 'react';
 import { motion } from 'framer-motion';
 import { 
   Users, Clock, Eye, Lock, Shield, AlertTriangle,
   FileText, TestTube, Pill, Dna, Stethoscope
 } from 'lucide-react';
 import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { SecurityBadge } from '@/components/ui/SecurityBadge';
 import { Button } from '@/components/ui/button';
 import { mockConsents, mockRecords, mockUsers } from '@/lib/mockData';
 import { EncryptionVisualizer } from '@/components/dashboard/EncryptionVisualizer';
 import { toast } from 'sonner';
 
 const recordTypeIcons = {
   lab_result: TestTube,
   imaging: Eye,
   prescription: Pill,
   genomic: Dna,
   consultation: Stethoscope,
 };
 
 export default function DoctorDashboard() {
   const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
   const [isDecrypting, setIsDecrypting] = useState(false);
   const [decryptedRecords, setDecryptedRecords] = useState<string[]>([]);
   const [timeRemaining, setTimeRemaining] = useState<number>(0);
   
   // Get active consents for this doctor
   const activeConsents = mockConsents.filter(c => c.isActive && c.doctorId === 'doctor-1');
   
   // Timer for consent expiry
   useEffect(() => {
     if (selectedPatient) {
       const consent = activeConsents.find(c => c.patientId === selectedPatient);
       if (consent) {
         const interval = setInterval(() => {
           const diff = consent.expiresAt.getTime() - Date.now();
           setTimeRemaining(Math.max(0, Math.floor(diff / 1000)));
           
           if (diff <= 0) {
             setSelectedPatient(null);
             setDecryptedRecords([]);
             toast.error('Access expired. Session terminated.');
           }
         }, 1000);
         
         return () => clearInterval(interval);
       }
     }
   }, [selectedPatient, activeConsents]);
   
   const handleAccessPatient = async (patientId: string) => {
     setSelectedPatient(patientId);
     setIsDecrypting(true);
     setDecryptedRecords([]);
     
     // Simulate decryption
     await new Promise(resolve => setTimeout(resolve, 2000));
     
     setIsDecrypting(false);
     setDecryptedRecords(mockRecords.filter(r => r.patientId === patientId && !r.isHoneytoken).map(r => r.id));
     toast.success('Patient records decrypted. Remember: no download or export allowed.');
   };
   
   const formatTime = (seconds: number) => {
     const h = Math.floor(seconds / 3600);
     const m = Math.floor((seconds % 3600) / 60);
     const s = seconds % 60;
     return `${h}h ${m}m ${s}s`;
   };
   
   const patient = mockUsers.find(u => u.id === 'patient-1');
 
   return (
     <DashboardLayout>
       <div className="space-y-8">
         {/* Header */}
         <div>
           <h1 className="text-3xl font-bold">Patient Access</h1>
           <p className="text-muted-foreground mt-1">
             View patient records with their consent
           </p>
         </div>
         
         {/* Security Notice */}
         <GlassCard className="border-warning/30">
           <div className="flex items-start gap-4">
             <div className="p-3 rounded-lg bg-warning/10">
               <AlertTriangle className="h-6 w-6 text-warning" />
             </div>
             <div>
               <h3 className="font-semibold">Strict Access Policy</h3>
               <p className="text-sm text-muted-foreground mt-1">
                 You can only view patient records with active consent. 
                 Download, export, and copy functions are disabled. 
                 All access is logged and audited.
               </p>
             </div>
           </div>
         </GlassCard>
         
         {/* Active Access Timer */}
         {selectedPatient && timeRemaining > 0 && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <GlassCard className="border-success/30 bg-success/5">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                     <Clock className="h-6 w-6 text-success animate-pulse" />
                   </div>
                   <div>
                     <h3 className="font-semibold">Active Session: {patient?.name}</h3>
                     <p className="text-sm text-muted-foreground">
                       Access granted by patient
                     </p>
                   </div>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-mono font-bold text-warning">
                     {formatTime(timeRemaining)}
                   </div>
                   <p className="text-xs text-muted-foreground">until auto-logout</p>
                 </div>
               </div>
             </GlassCard>
           </motion.div>
         )}
         
         {/* Patients with Consent */}
         <div>
           <h2 className="text-xl font-semibold mb-4">Patients Who Granted Consent</h2>
           
           {activeConsents.length === 0 ? (
             <GlassCard className="text-center py-12">
               <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
               <h3 className="font-medium text-lg">No Active Consents</h3>
               <p className="text-muted-foreground text-sm mt-1">
                 Patients must grant you access before you can view their records
               </p>
             </GlassCard>
           ) : (
             <div className="space-y-4">
               {activeConsents.map((consent, index) => (
                 <motion.div
                   key={consent.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                   <GlassCard hover glow="success">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                           <Users className="h-6 w-6 text-primary" />
                         </div>
                         <div>
                           <h3 className="font-medium">{patient?.name}</h3>
                           <p className="text-sm text-muted-foreground">
                             Consent granted: {consent.grantedAt.toLocaleDateString()}
                           </p>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-4">
                         <SecurityBadge status="decrypted" label="Consent Active" />
                         <Button 
                           onClick={() => handleAccessPatient(consent.patientId)}
                           disabled={selectedPatient === consent.patientId}
                           className="bg-primary hover:bg-primary/90"
                         >
                           <Eye className="h-4 w-4 mr-2" />
                           {selectedPatient === consent.patientId ? 'Viewing' : 'View Records'}
                         </Button>
                       </div>
                     </div>
                   </GlassCard>
                 </motion.div>
               ))}
             </div>
           )}
         </div>
         
         {/* Decrypted Records View */}
         {selectedPatient && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
           >
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-semibold">Patient Records</h2>
               <SecurityBadge status="warning" label="View Only - No Export" />
             </div>
             
             {isDecrypting ? (
               <GlassCard>
                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                   <Lock className="h-5 w-5 text-primary animate-pulse" />
                   Decrypting Patient Records...
                 </h3>
                 <EncryptionVisualizer isDecrypting />
               </GlassCard>
             ) : (
               <div className="grid md:grid-cols-2 gap-4">
                 {mockRecords
                   .filter(r => r.patientId === selectedPatient && !r.isHoneytoken)
                   .map((record, index) => {
                     const Icon = recordTypeIcons[record.type];
                     
                     return (
                       <motion.div
                         key={record.id}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: index * 0.1 }}
                       >
                         <GlassCard className="border-success/30">
                           <div className="flex items-start gap-4">
                             <div className="p-3 rounded-lg bg-success/10 text-success">
                               <Icon className="h-5 w-5" />
                             </div>
                             <div className="flex-1">
                               <div className="flex items-center justify-between">
                                 <h3 className="font-medium">{record.title}</h3>
                                 <SecurityBadge status="decrypted" size="sm" />
                               </div>
                               <p className="text-sm text-muted-foreground capitalize mt-1">
                                 {record.type.replace('_', ' ')}
                               </p>
                               <p className="text-xs text-muted-foreground mt-2">
                                 {record.createdAt.toLocaleDateString()}
                               </p>
                               
                               <div className="mt-4 p-3 rounded-lg bg-success/5 border border-success/20">
                                 <pre className="text-xs font-mono text-success whitespace-pre-wrap">
                                   [Decrypted Content]
                                   Patient: {patient?.name}
                                   Record: {record.title}
                                   View-only mode active
                                 </pre>
                               </div>
                             </div>
                           </div>
                         </GlassCard>
                       </motion.div>
                     );
                   })}
               </div>
             )}
           </motion.div>
         )}
       </div>
     </DashboardLayout>
   );
 }