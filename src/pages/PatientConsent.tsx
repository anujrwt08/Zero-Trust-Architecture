 import { useState } from 'react';
 import { motion } from 'framer-motion';
 import { Users, Clock, Shield, UserPlus, X, Check, AlertTriangle } from 'lucide-react';
 import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { SecurityBadge } from '@/components/ui/SecurityBadge';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { mockConsents, mockUsers } from '@/lib/mockData';
 import { toast } from 'sonner';
 
 export default function PatientConsent() {
   const [consents, setConsents] = useState(mockConsents);
   const [showGrantModal, setShowGrantModal] = useState(false);
   const [newConsent, setNewConsent] = useState({
     doctorEmail: '',
     duration: 24,
   });
   
   const handleGrant = () => {
     const doctor = mockUsers.find(u => u.role === 'doctor');
     if (doctor) {
       setConsents(prev => [...prev, {
         id: `consent-${Date.now()}`,
         patientId: 'patient-1',
         doctorId: doctor.id,
         doctorName: doctor.name,
         grantedAt: new Date(),
         expiresAt: new Date(Date.now() + newConsent.duration * 60 * 60 * 1000),
         isActive: true,
       }]);
       setShowGrantModal(false);
       toast.success(`Access granted to ${doctor.name} for ${newConsent.duration} hours`);
     }
   };
   
   const handleRevoke = (consentId: string) => {
     setConsents(prev => prev.map(c => 
       c.id === consentId ? { ...c, isActive: false } : c
     ));
     toast.success('Access revoked immediately');
   };
   
   const getTimeRemaining = (expiresAt: Date) => {
     const diff = expiresAt.getTime() - Date.now();
     const hours = Math.floor(diff / (1000 * 60 * 60));
     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
     return `${hours}h ${minutes}m`;
   };
 
   return (
     <DashboardLayout>
       <div className="space-y-8">
         {/* Header */}
         <div className="flex items-center justify-between">
           <div>
             <h1 className="text-3xl font-bold">Consent Management</h1>
             <p className="text-muted-foreground mt-1">
               Control who can access your medical data
             </p>
           </div>
           <Button 
             onClick={() => setShowGrantModal(true)}
             className="bg-primary hover:bg-primary/90"
           >
             <UserPlus className="h-4 w-4 mr-2" />
             Grant Access
           </Button>
         </div>
         
         {/* Info Card */}
         <GlassCard className="border-primary/30">
           <div className="flex items-start gap-4">
             <div className="p-3 rounded-lg bg-primary/10">
               <Shield className="h-6 w-6 text-primary" />
             </div>
             <div>
               <h3 className="font-semibold">You Control Access</h3>
               <p className="text-sm text-muted-foreground mt-1">
                 Doctors can only view your records with your explicit consent. 
                 Access automatically expires after the time you set, and you can 
                 revoke access instantly at any time.
               </p>
             </div>
           </div>
         </GlassCard>
         
         {/* Active Consents */}
         <div>
           <h2 className="text-xl font-semibold mb-4">Active Access Grants</h2>
           <div className="space-y-4">
             {consents.filter(c => c.isActive).map((consent, index) => (
               <motion.div
                 key={consent.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.1 }}
               >
                 <GlassCard className="border-success/30">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                         <Users className="h-6 w-6 text-success" />
                       </div>
                       <div>
                         <h3 className="font-medium">{consent.doctorName}</h3>
                         <p className="text-sm text-muted-foreground">
                           Granted: {consent.grantedAt.toLocaleDateString()}
                         </p>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-4">
                       <div className="text-right">
                         <div className="flex items-center gap-2 text-warning">
                           <Clock className="h-4 w-4" />
                           <span className="font-medium">
                             {getTimeRemaining(consent.expiresAt)} remaining
                           </span>
                         </div>
                         <p className="text-xs text-muted-foreground">
                           Expires: {consent.expiresAt.toLocaleString()}
                         </p>
                       </div>
                       <Button 
                         variant="destructive" 
                         size="sm"
                         onClick={() => handleRevoke(consent.id)}
                       >
                         <X className="h-4 w-4 mr-1" />
                         Revoke
                       </Button>
                     </div>
                   </div>
                 </GlassCard>
               </motion.div>
             ))}
             
             {consents.filter(c => c.isActive).length === 0 && (
               <GlassCard className="text-center py-12">
                 <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                 <h3 className="font-medium text-lg">No Active Access</h3>
                 <p className="text-muted-foreground text-sm mt-1">
                   You haven't granted access to any doctors yet
                 </p>
               </GlassCard>
             )}
           </div>
         </div>
         
         {/* Revoked/Expired */}
         {consents.filter(c => !c.isActive).length > 0 && (
           <div>
             <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
               Revoked / Expired
             </h2>
             <div className="space-y-4 opacity-60">
               {consents.filter(c => !c.isActive).map((consent) => (
                 <GlassCard key={consent.id}>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                         <Users className="h-6 w-6 text-muted-foreground" />
                       </div>
                       <div>
                         <h3 className="font-medium">{consent.doctorName}</h3>
                         <p className="text-sm text-muted-foreground">
                           Access revoked
                         </p>
                       </div>
                     </div>
                     <SecurityBadge status="alert" label="Revoked" />
                   </div>
                 </GlassCard>
               ))}
             </div>
           </div>
         )}
         
         {/* Grant Modal */}
         {showGrantModal && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setShowGrantModal(false)}
           >
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               onClick={e => e.stopPropagation()}
             >
               <GlassCard className="w-full max-w-md">
                 <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-semibold">Grant Doctor Access</h2>
                   <Button 
                     variant="ghost" 
                     size="sm"
                     onClick={() => setShowGrantModal(false)}
                   >
                     <X className="h-4 w-4" />
                   </Button>
                 </div>
                 
                 <div className="space-y-4">
                   <div>
                     <Label>Doctor's Email</Label>
                     <Input
                       placeholder="dr.chen@hospital.com"
                       value={newConsent.doctorEmail}
                       onChange={e => setNewConsent(prev => ({ ...prev, doctorEmail: e.target.value }))}
                       className="mt-1 bg-secondary/50"
                     />
                   </div>
                   
                   <div>
                     <Label>Access Duration (hours)</Label>
                     <div className="grid grid-cols-4 gap-2 mt-1">
                       {[1, 8, 24, 48].map(hours => (
                         <button
                           key={hours}
                           onClick={() => setNewConsent(prev => ({ ...prev, duration: hours }))}
                           className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                             newConsent.duration === hours
                               ? 'border-primary bg-primary/10 text-primary'
                               : 'border-border hover:border-primary/50'
                           }`}
                         >
                           {hours}h
                         </button>
                       ))}
                     </div>
                   </div>
                   
                   <div className="p-3 rounded-lg bg-warning/10 border border-warning/30 flex items-start gap-2">
                     <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                     <p className="text-xs text-muted-foreground">
                       The doctor will be able to view all your encrypted records for 
                       {' '}{newConsent.duration} hours. You can revoke access at any time.
                     </p>
                   </div>
                   
                   <Button 
                     className="w-full bg-primary hover:bg-primary/90"
                     onClick={handleGrant}
                   >
                     <Check className="h-4 w-4 mr-2" />
                     Grant Access
                   </Button>
                 </div>
               </GlassCard>
             </motion.div>
           </motion.div>
         )}
       </div>
     </DashboardLayout>
   );
 }