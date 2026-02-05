 import { useState } from 'react';
 import { motion } from 'framer-motion';
 import { 
   FileText, Plus, Lock, Eye, Clock, Upload, 
   TestTube, Stethoscope, Pill, Dna, Calendar,
   Shield, CheckCircle
 } from 'lucide-react';
 import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { SecurityBadge } from '@/components/ui/SecurityBadge';
 import { Button } from '@/components/ui/button';
 import { mockRecords } from '@/lib/mockData';
 import { useAuth } from '@/contexts/AuthContext';
 import { EncryptedRecord } from '@/lib/types';
 import { EncryptionVisualizer } from '@/components/dashboard/EncryptionVisualizer';
 import { toast } from 'sonner';
 
 const recordTypeIcons = {
   lab_result: TestTube,
   imaging: Eye,
   prescription: Pill,
   genomic: Dna,
   consultation: Stethoscope,
 };
 
 const recordTypeColors = {
   lab_result: 'text-accent',
   imaging: 'text-primary',
   prescription: 'text-success',
   genomic: 'text-warning',
   consultation: 'text-muted-foreground',
 };
 
 export default function PatientDashboard() {
   const { user } = useAuth();
   const [selectedRecord, setSelectedRecord] = useState<EncryptedRecord | null>(null);
   const [isDecrypting, setIsDecrypting] = useState(false);
   const [decryptedData, setDecryptedData] = useState<string | null>(null);
   
   // Filter out honeytokens for patient view
   const patientRecords = mockRecords.filter(r => !r.isHoneytoken);
   
   const handleViewRecord = async (record: EncryptedRecord) => {
     setSelectedRecord(record);
     setIsDecrypting(true);
     setDecryptedData(null);
     
     // Simulate decryption
     await new Promise(resolve => setTimeout(resolve, 1500));
     
     setIsDecrypting(false);
     setDecryptedData(`
 === DECRYPTED MEDICAL RECORD ===
 Title: ${record.title}
 Type: ${record.type.replace('_', ' ').toUpperCase()}
 Date: ${record.createdAt.toLocaleDateString()}
 
 [Simulated decrypted content]
 This data was encrypted with AES-256-GCM
 and decrypted locally in your browser.
 The server never saw this content.
     `);
     
     toast.success('Record decrypted locally');
   };
   
   const handleUpload = () => {
     toast.info('File would be encrypted client-side before upload');
   };
 
   return (
     <DashboardLayout>
       <div className="space-y-8">
         {/* Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-3xl font-bold">My Medical Records</h1>
             <p className="text-muted-foreground mt-1">
               All data is encrypted. Only you can read it.
             </p>
           </div>
           <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90">
             <Upload className="h-4 w-4 mr-2" />
             Upload Record
           </Button>
         </div>
         
         {/* Security Status */}
         <GlassCard className="flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
               <Shield className="h-6 w-6 text-success" />
             </div>
             <div>
               <h3 className="font-semibold">Vault Status: Secure</h3>
               <p className="text-sm text-muted-foreground">
                 {patientRecords.length} encrypted records • Last access: Today
               </p>
             </div>
           </div>
           <div className="flex items-center gap-2">
             <SecurityBadge status="encrypted" />
             <SecurityBadge status="secure" label="Zero-Trust Active" />
           </div>
         </GlassCard>
         
         {/* Records Grid */}
         <div className="grid md:grid-cols-2 gap-4">
           {patientRecords.map((record, index) => {
             const Icon = recordTypeIcons[record.type];
             const colorClass = recordTypeColors[record.type];
             const isSelected = selectedRecord?.id === record.id;
             
             return (
               <motion.div
                 key={record.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
               >
                 <GlassCard 
                   hover 
                   glow={isSelected ? 'primary' : 'none'}
                   className={isSelected ? 'border-primary/50' : ''}
                   onClick={() => handleViewRecord(record)}
                 >
                   <div className="flex items-start gap-4">
                     <div className={`p-3 rounded-lg bg-secondary/50 ${colorClass}`}>
                       <Icon className="h-5 w-5" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between gap-2">
                         <h3 className="font-medium truncate">{record.title}</h3>
                         <SecurityBadge status="encrypted" size="sm" />
                       </div>
                       <p className="text-sm text-muted-foreground capitalize mt-1">
                         {record.type.replace('_', ' ')}
                       </p>
                       <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                         <Calendar className="h-3 w-3" />
                         {record.createdAt.toLocaleDateString()}
                       </div>
                     </div>
                   </div>
                   
                   {/* Encrypted Data Preview */}
                   <div className="mt-4 p-3 rounded-lg bg-secondary/30 font-mono text-xs text-muted-foreground overflow-hidden">
                     <div className="flex items-center gap-2 mb-1">
                       <Lock className="h-3 w-3 text-accent" />
                       <span className="text-accent">Encrypted Data:</span>
                     </div>
                     <p className="truncate">{record.encryptedData}</p>
                   </div>
                 </GlassCard>
               </motion.div>
             );
           })}
         </div>
         
         {/* Decryption Modal/Panel */}
         {selectedRecord && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <GlassCard className="border-primary/30">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold flex items-center gap-2">
                   {isDecrypting ? (
                     <>
                       <Lock className="h-5 w-5 text-primary animate-pulse" />
                       Decrypting Locally...
                     </>
                   ) : (
                     <>
                       <CheckCircle className="h-5 w-5 text-success" />
                       Decrypted View
                     </>
                   )}
                 </h3>
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={() => {
                     setSelectedRecord(null);
                     setDecryptedData(null);
                   }}
                 >
                   Close
                 </Button>
               </div>
               
               {isDecrypting ? (
                 <EncryptionVisualizer isDecrypting />
               ) : (
                 <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                   <pre className="text-sm whitespace-pre-wrap font-mono text-success">
                     {decryptedData}
                   </pre>
                 </div>
               )}
               
               <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                 <Shield className="h-3 w-3" />
                 Data decrypted in your browser. Server never sees readable content.
               </p>
             </GlassCard>
           </motion.div>
         )}
       </div>
     </DashboardLayout>
   );
 }