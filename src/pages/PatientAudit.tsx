 import { motion } from 'framer-motion';
 import { Activity, Eye, Upload, UserPlus, UserMinus, LogIn, AlertTriangle, Shield } from 'lucide-react';
 import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { SecurityBadge } from '@/components/ui/SecurityBadge';
 import { mockAuditLogs } from '@/lib/mockData';
 
 const actionIcons = {
   view: Eye,
   grant_access: UserPlus,
   revoke_access: UserMinus,
   upload: Upload,
   login: LogIn,
   logout: LogIn,
   honeytoken_trigger: AlertTriangle,
 };
 
 const actionColors = {
   view: 'text-primary',
   grant_access: 'text-success',
   revoke_access: 'text-destructive',
   upload: 'text-accent',
   login: 'text-muted-foreground',
   logout: 'text-muted-foreground',
   honeytoken_trigger: 'text-warning',
 };
 
 export default function PatientAudit() {
   return (
     <DashboardLayout>
       <div className="space-y-8">
         {/* Header */}
         <div>
           <h1 className="text-3xl font-bold">Audit Log</h1>
           <p className="text-muted-foreground mt-1">
             Immutable record of all access to your data
           </p>
         </div>
         
         {/* Info Card */}
         <GlassCard className="border-accent/30">
           <div className="flex items-start gap-4">
             <div className="p-3 rounded-lg bg-accent/10">
               <Shield className="h-6 w-6 text-accent" />
             </div>
             <div>
               <h3 className="font-semibold">Immutable Audit Trail</h3>
               <p className="text-sm text-muted-foreground mt-1">
                 Every access attempt is permanently logged. These records cannot be 
                 edited or deleted. You can see exactly who viewed your data, when, 
                 and from where.
               </p>
             </div>
           </div>
         </GlassCard>
         
         {/* Audit Log List */}
         <div className="space-y-3">
           {mockAuditLogs.map((log, index) => {
             const Icon = actionIcons[log.action];
             const colorClass = actionColors[log.action];
             
             return (
               <motion.div
                 key={log.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.05 }}
               >
                 <GlassCard 
                   className={log.isSuspicious ? 'border-warning/50 glow-warning' : ''}
                 >
                   <div className="flex items-start gap-4">
                     <div className={`p-2 rounded-lg bg-secondary/50 ${colorClass}`}>
                       <Icon className="h-4 w-4" />
                     </div>
                     
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 flex-wrap">
                         <span className="font-medium">{log.userName}</span>
                         <span className={`text-xs px-2 py-0.5 rounded-full bg-secondary ${colorClass}`}>
                           {log.userRole}
                         </span>
                         {log.isSuspicious && (
                           <SecurityBadge status="warning" size="sm" label="Suspicious" pulse />
                         )}
                       </div>
                       <p className="text-sm text-muted-foreground mt-1">
                         {log.details}
                       </p>
                       <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                         <span>IP: {log.ipAddress}</span>
                         <span>•</span>
                         <span>{log.timestamp.toLocaleString()}</span>
                       </div>
                     </div>
                     
                     <div className="text-right text-sm">
                       <span className={`capitalize ${colorClass}`}>
                         {log.action.replace('_', ' ')}
                       </span>
                     </div>
                   </div>
                 </GlassCard>
               </motion.div>
             );
           })}
         </div>
       </div>
     </DashboardLayout>
   );
 }