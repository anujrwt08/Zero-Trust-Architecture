 import { User, EncryptedRecord, ConsentPermission, AuditLog, SecurityAlert } from './types';
 
 // Mock Users
 export const mockUsers: User[] = [
   {
     id: 'patient-1',
     email: 'sarah.johnson@email.com',
     name: 'Sarah Johnson',
     role: 'patient',
     createdAt: new Date('2024-01-15'),
   },
   {
     id: 'doctor-1',
     email: 'dr.chen@hospital.com',
     name: 'Dr. Michael Chen',
     role: 'doctor',
     createdAt: new Date('2023-06-10'),
   },
   {
     id: 'admin-1',
     email: 'admin@medvault.com',
     name: 'Alex Thompson',
     role: 'admin',
     createdAt: new Date('2023-01-01'),
   },
 ];
 
 // Mock Encrypted Records
 export const mockRecords: EncryptedRecord[] = [
   {
     id: 'rec-1',
     patientId: 'patient-1',
     title: 'Complete Blood Count (CBC)',
     type: 'lab_result',
     encryptedData: 'AES-256-GCM:v1:xK9mN2pL...[ENCRYPTED]',
     createdAt: new Date('2024-12-01'),
     updatedAt: new Date('2024-12-01'),
   },
   {
     id: 'rec-2',
     patientId: 'patient-1',
     title: 'Chest X-Ray Results',
     type: 'imaging',
     encryptedData: 'AES-256-GCM:v1:pQ7rT4sW...[ENCRYPTED]',
     createdAt: new Date('2024-11-15'),
     updatedAt: new Date('2024-11-15'),
   },
   {
     id: 'rec-3',
     patientId: 'patient-1',
     title: 'Metformin 500mg Prescription',
     type: 'prescription',
     encryptedData: 'AES-256-GCM:v1:hJ3kL8mN...[ENCRYPTED]',
     createdAt: new Date('2024-10-20'),
     updatedAt: new Date('2024-10-20'),
   },
   {
     id: 'rec-4',
     patientId: 'patient-1',
     title: 'Genetic Risk Assessment',
     type: 'genomic',
     encryptedData: 'AES-256-GCM:v1:zX9cV2bN...[ENCRYPTED]',
     createdAt: new Date('2024-09-05'),
     updatedAt: new Date('2024-09-05'),
   },
   {
     id: 'honey-1',
     patientId: 'patient-1',
     title: 'Insurance Payment Records',
     type: 'consultation',
     encryptedData: 'HONEYTOKEN:FLAG:v1:tR4pD3t3ct...[TRAP]',
     createdAt: new Date('2024-08-01'),
     updatedAt: new Date('2024-08-01'),
     isHoneytoken: true,
   },
 ];
 
 // Mock Consent Permissions
 export const mockConsents: ConsentPermission[] = [
   {
     id: 'consent-1',
     patientId: 'patient-1',
     doctorId: 'doctor-1',
     doctorName: 'Dr. Michael Chen',
     grantedAt: new Date(),
     expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
     isActive: true,
   },
 ];
 
 // Mock Audit Logs
 export const mockAuditLogs: AuditLog[] = [
   {
     id: 'log-1',
     userId: 'doctor-1',
     userName: 'Dr. Michael Chen',
     userRole: 'doctor',
     action: 'view',
     targetId: 'rec-1',
     details: 'Viewed Complete Blood Count (CBC)',
     ipAddress: '192.168.1.45',
     timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
     isSuspicious: false,
   },
   {
     id: 'log-2',
     userId: 'patient-1',
     userName: 'Sarah Johnson',
     userRole: 'patient',
     action: 'grant_access',
     targetId: 'doctor-1',
     details: 'Granted access to Dr. Michael Chen for 24 hours',
     ipAddress: '192.168.1.100',
     timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
     isSuspicious: false,
   },
   {
     id: 'log-3',
     userId: 'patient-1',
     userName: 'Sarah Johnson',
     userRole: 'patient',
     action: 'upload',
     targetId: 'rec-1',
     details: 'Uploaded encrypted medical record',
     ipAddress: '192.168.1.100',
     timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
     isSuspicious: false,
   },
   {
     id: 'log-4',
     userId: 'unknown',
     userName: 'Unknown Actor',
     userRole: 'patient',
     action: 'honeytoken_trigger',
     targetId: 'honey-1',
     details: 'ALERT: Attempted access to honeytoken record',
     ipAddress: '45.33.32.156',
     timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
     isSuspicious: true,
   },
 ];
 
 // Mock Security Alerts
 export const mockAlerts: SecurityAlert[] = [
   {
     id: 'alert-1',
     severity: 'critical',
     type: 'honeytoken_access',
     message: 'Honeytoken record accessed by unauthorized entity',
     userId: 'unknown',
     ipAddress: '45.33.32.156',
     timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
     isResolved: false,
   },
   {
     id: 'alert-2',
     severity: 'high',
     type: 'brute_force',
     message: 'Multiple failed login attempts detected',
     ipAddress: '103.21.244.0',
     timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
     isResolved: true,
   },
   {
     id: 'alert-3',
     severity: 'medium',
     type: 'session_anomaly',
     message: 'Unusual session behavior detected',
     userId: 'doctor-1',
     ipAddress: '192.168.1.45',
     timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
     isResolved: true,
   },
 ];