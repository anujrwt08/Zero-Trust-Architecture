 import { cn } from '@/lib/utils';
 import { ReactNode } from 'react';
 
 interface GlassCardProps {
   children: ReactNode;
   className?: string;
   hover?: boolean;
   glow?: 'primary' | 'accent' | 'warning' | 'success' | 'none';
   onClick?: () => void;
 }
 
 const glowClasses = {
   primary: 'hover:glow-primary',
   accent: 'hover:glow-accent',
   warning: 'hover:glow-warning',
   success: 'hover:glow-success',
   none: '',
 };
 
 export function GlassCard({
   children,
   className,
   hover = false,
   glow = 'none',
   onClick,
 }: GlassCardProps) {
   return (
     <div
       onClick={onClick}
       className={cn(
         'glass-card rounded-xl p-6 transition-all duration-300',
         hover && 'cursor-pointer hover:border-primary/30 hover:scale-[1.02]',
         glowClasses[glow],
         className
       )}
     >
       {children}
     </div>
   );
 }