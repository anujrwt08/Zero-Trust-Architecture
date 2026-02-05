 import { useState } from 'react';
 import { motion } from 'framer-motion';
 import { 
   Shield, AlertTriangle, Users, Activity, Lock, Eye,
   CheckCircle, XCircle, TrendingUp, Zap
 } from 'lucide-react';
 import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { SecurityBadge } from '@/components/ui/SecurityBadge';
 import { Button } from '@/components/ui/button';
 import { mockUsers, mockAlerts, mockAuditLogs } from '@/lib/mockData';
 import { toast } from 'sonner';
 
 export default function AdminDashboard() {
   const [alerts, setAlerts] = useState(mockAlerts);
   
   const unresolvedAlerts = alerts.filter(a => !a.isResolved);
   const honeytokenAlerts = alerts.filter(a => a.type === 'honeytoken_access' && !a.isResolved);
   
   const handleResolveAlert = (alertId: string) => {
     setAlerts(prev => prev.map(a => 
       a.id === alertId ? { ...a, isResolved: true } : a
     ));
     toast.success('Alert marked as resolved');
   };
   
   const handleLockSession = (userId: string) => {
     toast.success('User session locked and terminated');
   };
 
   const stats = [
     { label: 'Total Users', value: mockUsers.length, icon: Users, color: 'text-primary' },
     { label: 'Active Alerts', value: unresolvedAlerts.length, icon: AlertTriangle, color: 'text-warning' },
     { label: 'Honeytoken Triggers', value: honeytokenAlerts.length, icon: Zap, color: 'text-destructive' },
     { label: 'Access Events Today', value: mockAuditLogs.length, icon: Activity, color: 'text-success' },
   ];
 
   return (
     <DashboardLayout>
       <div className="space-y-8">
         {/* Header */}
         <div>
           <h1 className="text-3xl font-bold">Security Dashboard</h1>
           <p className="text-muted-foreground mt-1">
             Monitor system security and active threats
           </p>
         </div>
         
         {/* Admin Notice */}
         <GlassCard className="border-accent/30">
           <div className="flex items-start gap-4">
             <div className="p-3 rounded-lg bg-accent/10">
               <Shield className="h-6 w-6 text-accent" />
             </div>
             <div>
               <h3 className="font-semibold">Zero-Trust Admin Access</h3>
               <p className="text-sm text-muted-foreground mt-1">
                 As an admin, you can monitor security events and manage users, 
                 but you cannot view any patient's medical data. The system 
                 architecture prevents even privileged access to encrypted content.
               </p>
             </div>
           </div>
         </GlassCard>
         
         {/* Stats Grid */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           {stats.map((stat, index) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
             >
               <GlassCard>
                 <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg bg-secondary/50 ${stat.color}`}>
                     <stat.icon className="h-5 w-5" />
                   </div>
                   <div>
                     <p className="text-2xl font-bold">{stat.value}</p>
                     <p className="text-xs text-muted-foreground">{stat.label}</p>
                   </div>
                 </div>
               </GlassCard>
             </motion.div>
           ))}
         </div>
         
         {/* Critical Alerts */}
         {honeytokenAlerts.length > 0 && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="space-y-4"
           >
             <h2 className="text-xl font-semibold text-destructive flex items-center gap-2">
               <Zap className="h-5 w-5" />
               Honeytoken Alerts - Active Threat Detection
             </h2>
             
             {honeytokenAlerts.map((alert, index) => (
               <motion.div
                 key={alert.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.1 }}
               >
                 <GlassCard className="border-destructive/50 animate-honeytoken">
                   <div className="flex items-start justify-between gap-4">
                     <div className="flex items-start gap-4">
                       <div className="p-3 rounded-lg bg-destructive/10">
                         <AlertTriangle className="h-6 w-6 text-destructive" />
                       </div>
                       <div>
                         <div className="flex items-center gap-2">
                           <h3 className="font-semibold text-destructive">
                             HONEYTOKEN TRIGGERED
                           </h3>
                           <SecurityBadge status="alert" size="sm" label="CRITICAL" pulse />
                         </div>
                         <p className="text-sm text-muted-foreground mt-1">
                           {alert.message}
                         </p>
                         <div className="mt-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                           <div className="grid grid-cols-2 gap-4 text-sm">
                             <div>
                               <span className="text-muted-foreground">IP Address:</span>
                               <p className="font-mono text-destructive">{alert.ipAddress}</p>
                             </div>
                             <div>
                               <span className="text-muted-foreground">Timestamp:</span>
                               <p className="font-mono">{alert.timestamp.toLocaleString()}</p>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex flex-col gap-2">
                       <Button 
                         variant="destructive" 
                         size="sm"
                         onClick={() => handleLockSession(alert.userId || '')}
                       >
                         <Lock className="h-4 w-4 mr-1" />
                         Lock Session
                       </Button>
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => handleResolveAlert(alert.id)}
                       >
                         <CheckCircle className="h-4 w-4 mr-1" />
                         Resolve
                       </Button>
                     </div>
                   </div>
                 </GlassCard>
               </motion.div>
             ))}
           </motion.div>
         )}
         
         {/* All Security Alerts */}
         <div>
           <h2 className="text-xl font-semibold mb-4">All Security Alerts</h2>
           <div className="space-y-3">
             {alerts.map((alert, index) => {
               const severityColors = {
                 low: 'text-muted-foreground',
                 medium: 'text-warning',
                 high: 'text-orange-500',
                 critical: 'text-destructive',
               };
               
               return (
                 <motion.div
                   key={alert.id}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: index * 0.05 }}
                 >
                   <GlassCard className={alert.isResolved ? 'opacity-50' : ''}>
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className={`p-2 rounded-lg bg-secondary/50 ${severityColors[alert.severity]}`}>
                           <AlertTriangle className="h-4 w-4" />
                         </div>
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="font-medium">{alert.message}</span>
                             <span className={`text-xs px-2 py-0.5 rounded-full border ${
                               alert.isResolved 
                                 ? 'border-success/30 bg-success/10 text-success' 
                                 : 'border-warning/30 bg-warning/10 text-warning'
                             }`}>
                               {alert.isResolved ? 'Resolved' : 'Active'}
                             </span>
                           </div>
                           <p className="text-xs text-muted-foreground mt-1">
                             {alert.timestamp.toLocaleString()} • IP: {alert.ipAddress}
                           </p>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-2">
                         <span className={`text-xs font-medium uppercase ${severityColors[alert.severity]}`}>
                           {alert.severity}
                         </span>
                         {!alert.isResolved && (
                           <Button 
                             variant="ghost" 
                             size="sm"
                             onClick={() => handleResolveAlert(alert.id)}
                           >
                             <CheckCircle className="h-4 w-4" />
                           </Button>
                         )}
                       </div>
                     </div>
                   </GlassCard>
                 </motion.div>
               );
             })}
           </div>
         </div>
         
         {/* Recent Activity */}
         <div>
           <h2 className="text-xl font-semibold mb-4">Recent System Activity</h2>
           <GlassCard>
             <div className="space-y-3">
               {mockAuditLogs.slice(0, 5).map((log) => (
                 <div 
                   key={log.id}
                   className={`flex items-center justify-between p-3 rounded-lg ${
                     log.isSuspicious ? 'bg-warning/10 border border-warning/30' : 'bg-secondary/30'
                   }`}
                 >
                   <div className="flex items-center gap-3">
                     <div className={`w-2 h-2 rounded-full ${log.isSuspicious ? 'bg-warning' : 'bg-success'}`} />
                     <span className="text-sm">{log.details}</span>
                   </div>
                   <span className="text-xs text-muted-foreground">
                     {log.timestamp.toLocaleTimeString()}
                   </span>
                 </div>
               ))}
             </div>
           </GlassCard>
         </div>
       </div>
     </DashboardLayout>
   );
 }