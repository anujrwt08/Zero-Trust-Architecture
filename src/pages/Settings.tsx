 import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { Shield, Bell, Key, Lock } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Switch } from '@/components/ui/switch';
 import { Label } from '@/components/ui/label';
 
 export default function Settings() {
   return (
     <DashboardLayout>
       <div className="space-y-8">
         <div>
           <h1 className="text-3xl font-bold">Security Settings</h1>
           <p className="text-muted-foreground mt-1">
             Manage your account security preferences
           </p>
         </div>
         
         <div className="grid gap-6 max-w-2xl">
           <GlassCard>
             <div className="flex items-start gap-4">
               <div className="p-3 rounded-lg bg-primary/10">
                 <Key className="h-5 w-5 text-primary" />
               </div>
               <div className="flex-1">
                 <h3 className="font-semibold">Encryption Key</h3>
                 <p className="text-sm text-muted-foreground mt-1">
                   Your local encryption key is stored securely in your browser.
                 </p>
                 <Button variant="outline" size="sm" className="mt-3">
                   Backup Key
                 </Button>
               </div>
             </div>
           </GlassCard>
           
           <GlassCard>
             <div className="flex items-start gap-4">
               <div className="p-3 rounded-lg bg-primary/10">
                 <Bell className="h-5 w-5 text-primary" />
               </div>
               <div className="flex-1">
                 <h3 className="font-semibold">Security Notifications</h3>
                 <p className="text-sm text-muted-foreground mt-1">
                   Get notified about access attempts and security events.
                 </p>
                 <div className="mt-4 space-y-4">
                   <div className="flex items-center justify-between">
                     <Label htmlFor="email-alerts">Email alerts</Label>
                     <Switch id="email-alerts" defaultChecked />
                   </div>
                   <div className="flex items-center justify-between">
                     <Label htmlFor="access-alerts">Access notifications</Label>
                     <Switch id="access-alerts" defaultChecked />
                   </div>
                 </div>
               </div>
             </div>
           </GlassCard>
           
           <GlassCard>
             <div className="flex items-start gap-4">
               <div className="p-3 rounded-lg bg-primary/10">
                 <Lock className="h-5 w-5 text-primary" />
               </div>
               <div className="flex-1">
                 <h3 className="font-semibold">Two-Factor Authentication</h3>
                 <p className="text-sm text-muted-foreground mt-1">
                   Add an extra layer of security to your account.
                 </p>
                 <Button variant="outline" size="sm" className="mt-3">
                   Enable 2FA
                 </Button>
               </div>
             </div>
           </GlassCard>
         </div>
       </div>
     </DashboardLayout>
   );
 }