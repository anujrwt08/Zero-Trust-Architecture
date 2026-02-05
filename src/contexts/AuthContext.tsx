 import React, { createContext, useContext, useState, ReactNode } from 'react';
 import { User, UserRole, AuthState } from '@/lib/types';
 import { mockUsers } from '@/lib/mockData';
 
 interface AuthContextType extends AuthState {
   login: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
   signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
 }
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
 export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [authState, setAuthState] = useState<AuthState>({
     user: null,
     isAuthenticated: false,
     isLoading: false,
   });
 
   const login = async (email: string, password: string): Promise<boolean> => {
     setAuthState(prev => ({ ...prev, isLoading: true }));
     
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1000));
     
     // Mock authentication - check against mock users
     const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
     
     if (user && password.length >= 6) {
       setAuthState({
         user,
         isAuthenticated: true,
         isLoading: false,
       });
       return true;
     }
     
     setAuthState(prev => ({ ...prev, isLoading: false }));
     return false;
   };
 
   const logout = () => {
     setAuthState({
       user: null,
       isAuthenticated: false,
       isLoading: false,
     });
   };
 
   const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
     setAuthState(prev => ({ ...prev, isLoading: true }));
     
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1500));
     
     // Create new user
     const newUser: User = {
       id: `user-${Date.now()}`,
       email,
       name,
       role,
       createdAt: new Date(),
     };
     
     setAuthState({
       user: newUser,
       isAuthenticated: true,
       isLoading: false,
     });
     
     return true;
   };
 
   return (
     <AuthContext.Provider value={{ ...authState, login, logout, signup }}>
       {children}
     </AuthContext.Provider>
   );
 };
 
 export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
     throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
 };