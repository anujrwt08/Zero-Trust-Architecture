 import { ReactNode } from 'react';
 import { Link, useNavigate, useLocation } from 'react-router-dom';
 import { Shield, LogOut, User, FileText, Users, AlertTriangle, Settings, Activity } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { useAuth } from '@/contexts/AuthContext';
 import { cn } from '@/lib/utils';
 
 interface DashboardLayoutProps {
   children: ReactNode;
 }
 
 const patientNav = [
   { icon: FileText, label: 'My Records', path: '/patient' },
   { icon: Users, label: 'Consent', path: '/patient/consent' },
   { icon: Activity, label: 'Audit Log', path: '/patient/audit' },
   { icon: Settings, label: 'Settings', path: '/patient/settings' },
 ];
 
 const doctorNav = [
   { icon: Users, label: 'Patients', path: '/doctor' },
   { icon: Activity, label: 'Access History', path: '/doctor/history' },
   { icon: Settings, label: 'Settings', path: '/doctor/settings' },
 ];
 
 const adminNav = [
   { icon: Activity, label: 'Overview', path: '/admin' },
   { icon: Users, label: 'Users', path: '/admin/users' },
   { icon: AlertTriangle, label: 'Alerts', path: '/admin/alerts' },
   { icon: Shield, label: 'Honeytokens', path: '/admin/honeytokens' },
   { icon: Settings, label: 'Settings', path: '/admin/settings' },
 ];
 
 export function DashboardLayout({ children }: DashboardLayoutProps) {
   const { user, logout } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   
   const handleLogout = () => {
     logout();
     navigate('/');
   };
   
   const navItems = 
     user?.role === 'patient' ? patientNav :
     user?.role === 'doctor' ? doctorNav :
     adminNav;
   
   const roleColor = 
     user?.role === 'patient' ? 'text-primary' :
     user?.role === 'doctor' ? 'text-success' :
     'text-warning';
 
   return (
     <div className="min-h-screen bg-background flex">
       {/* Sidebar */}
       <aside className="w-64 border-r border-border/50 bg-sidebar flex flex-col">
         {/* Logo */}
         <div className="p-6 border-b border-border/50">
           <Link to="/" className="flex items-center gap-2">
             <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/30">
               <Shield className="h-5 w-5 text-primary" />
             </div>
             <span className="font-bold">
               MedVault <span className="text-primary">Zero</span>
             </span>
           </Link>
         </div>
         
         {/* User Info */}
         <div className="p-4 border-b border-border/50">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
               <User className="h-5 w-5 text-muted-foreground" />
             </div>
             <div className="flex-1 min-w-0">
               <p className="font-medium text-sm truncate">{user?.name}</p>
               <p className={`text-xs capitalize ${roleColor}`}>{user?.role}</p>
             </div>
           </div>
         </div>
         
         {/* Navigation */}
         <nav className="flex-1 p-4 space-y-1">
           {navItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
               <Link
                 key={item.path}
                 to={item.path}
                 className={cn(
                   'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                   isActive 
                     ? 'bg-primary/10 text-primary border border-primary/30' 
                     : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                 )}
               >
                 <item.icon className="h-4 w-4" />
                 {item.label}
               </Link>
             );
           })}
         </nav>
         
         {/* Logout */}
         <div className="p-4 border-t border-border/50">
           <Button 
             variant="ghost" 
             className="w-full justify-start text-muted-foreground hover:text-destructive"
             onClick={handleLogout}
           >
             <LogOut className="h-4 w-4 mr-3" />
             Sign Out
           </Button>
         </div>
       </aside>
       
       {/* Main Content */}
       <main className="flex-1 overflow-auto">
         <div className="p-8">
           {children}
         </div>
       </main>
     </div>
   );
 }