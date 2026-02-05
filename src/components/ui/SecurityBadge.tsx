 import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 interface SecurityBadgeProps {
   status: 'encrypted' | 'decrypted' | 'alert' | 'warning' | 'secure';
   size?: 'sm' | 'md' | 'lg';
   showIcon?: boolean;
   label?: string;
   className?: string;
   pulse?: boolean;
 }
 
 const statusConfig = {
   encrypted: {
     icon: Lock,
     label: 'Encrypted',
     className: 'status-encrypted',
   },
   decrypted: {
     icon: Eye,
     label: 'Decrypted',
     className: 'status-decrypted',
   },
   alert: {
     icon: AlertTriangle,
     label: 'Alert',
     className: 'status-alert',
   },
   warning: {
     icon: AlertTriangle,
     label: 'Warning',
     className: 'status-warning',
   },
   secure: {
     icon: Shield,
     label: 'Secure',
     className: 'bg-primary/20 text-primary border-primary/30',
   },
 };
 
 const sizeConfig = {
   sm: 'px-2 py-0.5 text-xs gap-1',
   md: 'px-3 py-1 text-sm gap-1.5',
   lg: 'px-4 py-1.5 text-base gap-2',
 };
 
 const iconSizeConfig = {
   sm: 'h-3 w-3',
   md: 'h-4 w-4',
   lg: 'h-5 w-5',
 };
 
 export function SecurityBadge({
   status,
   size = 'md',
   showIcon = true,
   label,
   className,
   pulse = false,
 }: SecurityBadgeProps) {
   const config = statusConfig[status];
   const Icon = config.icon;
 
   return (
     <span
       className={cn(
         'inline-flex items-center font-medium rounded-full border',
         config.className,
         sizeConfig[size],
         pulse && 'animate-pulse',
         className
       )}
     >
       {showIcon && <Icon className={iconSizeConfig[size]} />}
       {label || config.label}
     </span>
   );
 }