 // MedVault Zero - Type Definitions
 
 export type UserRole = 'patient' | 'doctor' | 'admin';
 
 export interface User {
   id: string;
   email: string;
   name: string;
   role: UserRole;
   createdAt: Date;
 }
 
 export interface EncryptedRecord {
   id: string;
   patientId: string;
   title: string;
   type: 'lab_result' | 'imaging' | 'prescription' | 'genomic' | 'consultation';
   encryptedData: string;
   createdAt: Date;
   updatedAt: Date;
   isHoneytoken?: boolean;
 }
 
 export interface ConsentPermission {
   id: string;
   patientId: string;
   doctorId: string;
   doctorName: string;
   grantedAt: Date;
   expiresAt: Date;
   isActive: boolean;
 }
 
 export interface AuditLog {
   id: string;
   userId: string;
   userName: string;
   userRole: UserRole;
   action: 'view' | 'grant_access' | 'revoke_access' | 'upload' | 'login' | 'logout' | 'honeytoken_trigger';
   targetId?: string;
   details: string;
   ipAddress: string;
   timestamp: Date;
   isSuspicious: boolean;
 }
 
 export interface SecurityAlert {
   id: string;
   severity: 'low' | 'medium' | 'high' | 'critical';
   type: 'honeytoken_access' | 'unusual_activity' | 'brute_force' | 'session_anomaly';
   message: string;
   userId?: string;
   ipAddress: string;
   timestamp: Date;
   isResolved: boolean;
 }
 
 export interface AuthState {
   user: User | null;
   isAuthenticated: boolean;
   isLoading: boolean;
 }