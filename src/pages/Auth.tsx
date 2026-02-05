 import { useState, useEffect } from 'react';
 import { useNavigate, useSearchParams, Link } from 'react-router-dom';
 import { motion } from 'framer-motion';
 import { Shield, Lock, Eye, EyeOff, Mail, User, ArrowLeft, Loader2 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { useAuth } from '@/contexts/AuthContext';
 import { UserRole } from '@/lib/types';
 import { toast } from 'sonner';
 
 export default function Auth() {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const { login, signup, isLoading, isAuthenticated, user } = useAuth();
   
   const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
   const [showPassword, setShowPassword] = useState(false);
   const [selectedRole, setSelectedRole] = useState<UserRole>(
     (searchParams.get('role') as UserRole) || 'patient'
   );
   
   const [formData, setFormData] = useState({
     email: '',
     password: '',
     name: '',
   });
 
   // Redirect if already authenticated
   useEffect(() => {
     if (isAuthenticated && user) {
       const dashboardPath = 
         user.role === 'patient' ? '/patient' :
         user.role === 'doctor' ? '/doctor' :
         '/admin';
       navigate(dashboardPath);
     }
   }, [isAuthenticated, user, navigate]);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (isLogin) {
       const success = await login(formData.email, formData.password);
       if (success) {
         toast.success('Welcome back! Redirecting to your dashboard...');
       } else {
         toast.error('Invalid credentials. Try: anujrwt08@gmail.com / anujrwt08');
       }
     } else {
       const success = await signup(formData.email, formData.password, formData.name, selectedRole);
       if (success) {
         toast.success('Account created! Welcome to MedVault Zero.');
       } else {
         toast.error('Failed to create account. Please try again.');
       }
     }
   };
 
   return (
     <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
       {/* Background Effects */}
       <div className="absolute inset-0 security-grid opacity-30" />
       <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
       <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
       
       <div className="w-full max-w-md relative z-10">
         {/* Back Link */}
         <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
           <ArrowLeft className="h-4 w-4" />
           Back to Home
         </Link>
         
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
         >
           <GlassCard className="p-8">
             {/* Header */}
             <div className="text-center mb-8">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
                 <Shield className="h-8 w-8 text-primary" />
               </div>
               <h1 className="text-2xl font-bold mb-2">
                 {isLogin ? 'Welcome Back' : 'Create Account'}
               </h1>
               <p className="text-muted-foreground text-sm">
                 {isLogin 
                   ? 'Sign in to access your secure medical vault' 
                   : 'Join MedVault Zero and take control of your data'}
               </p>
             </div>
             
             {/* Zero-Trust Notice */}
             <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 mb-6">
               <Lock className="h-4 w-4 text-primary flex-shrink-0" />
               <p className="text-xs text-muted-foreground">
                 Your session is protected by end-to-end encryption. We never see your password.
               </p>
             </div>
             
             {/* Role Selection (Signup only) */}
             {!isLogin && (
               <div className="mb-6">
                 <Label className="text-sm font-medium mb-3 block">I am a:</Label>
                 <div className="grid grid-cols-2 gap-3">
                   <button
                     type="button"
                     onClick={() => setSelectedRole('patient')}
                     className={`p-4 rounded-lg border transition-all ${
                       selectedRole === 'patient'
                         ? 'border-primary bg-primary/10 text-primary'
                         : 'border-border hover:border-primary/50'
                     }`}
                   >
                     <User className="h-5 w-5 mx-auto mb-2" />
                     <span className="text-sm font-medium">Patient</span>
                   </button>
                   <button
                     type="button"
                     onClick={() => setSelectedRole('doctor')}
                     className={`p-4 rounded-lg border transition-all ${
                       selectedRole === 'doctor'
                         ? 'border-primary bg-primary/10 text-primary'
                         : 'border-border hover:border-primary/50'
                     }`}
                   >
                     <Shield className="h-5 w-5 mx-auto mb-2" />
                     <span className="text-sm font-medium">Doctor</span>
                   </button>
                 </div>
               </div>
             )}
             
             {/* Form */}
             <form onSubmit={handleSubmit} className="space-y-4">
               {!isLogin && (
                 <div>
                   <Label htmlFor="name">Full Name</Label>
                   <div className="relative mt-1">
                     <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                       id="name"
                       type="text"
                       placeholder="Dr. Jane Smith"
                       value={formData.name}
                       onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                       className="pl-10 bg-secondary/50 border-border"
                       required={!isLogin}
                     />
                   </div>
                 </div>
               )}
               
               <div>
                 <Label htmlFor="email">Email</Label>
                 <div className="relative mt-1">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input
                     id="email"
                     type="email"
                     placeholder="you@example.com"
                     value={formData.email}
                     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                     className="pl-10 bg-secondary/50 border-border"
                     required
                   />
                 </div>
               </div>
               
               <div>
                 <Label htmlFor="password">Password</Label>
                 <div className="relative mt-1">
                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input
                     id="password"
                     type={showPassword ? 'text' : 'password'}
                     placeholder="••••••••"
                     value={formData.password}
                     onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                     className="pl-10 pr-10 bg-secondary/50 border-border"
                     required
                     minLength={6}
                   />
                   <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                   >
                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                   </button>
                 </div>
               </div>
               
               <Button 
                 type="submit" 
                 className="w-full bg-primary hover:bg-primary/90"
                 disabled={isLoading}
               >
                 {isLoading ? (
                   <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     {isLogin ? 'Signing In...' : 'Creating Account...'}
                   </>
                 ) : (
                   <>
                     <Lock className="mr-2 h-4 w-4" />
                     {isLogin ? 'Sign In Securely' : 'Create Secure Account'}
                   </>
                 )}
               </Button>
             </form>
             
             {/* Toggle Login/Signup */}
             <p className="text-center text-sm text-muted-foreground mt-6">
               {isLogin ? "Don't have an account? " : 'Already have an account? '}
               <button
                 type="button"
                 onClick={() => setIsLogin(!isLogin)}
                 className="text-primary hover:underline font-medium"
               >
                 {isLogin ? 'Sign up' : 'Sign in'}
               </button>
             </p>
             
             {/* Demo Credentials */}
             {isLogin && (
               <div className="mt-6 p-3 rounded-lg bg-secondary/50 border border-border">
                 <p className="text-xs text-muted-foreground mb-2 font-medium">Demo Credentials:</p>
                 <div className="space-y-1 text-xs text-muted-foreground">
                   <p>Patient: sarah.johnson@email.com</p>
                   <p>Doctor: dr.chen@hospital.com</p>
                   <p>Admin: admin@medvault.com</p>
                   <p className="text-primary">Password: any 6+ characters</p>
                 </div>
               </div>
             )}
           </GlassCard>
         </motion.div>
       </div>
     </div>
   );
 }