export interface User {
    uid: string;
    email: string;
    fullName: string;
    role: 'consumer' | 'merchant' | 'string' ; 
    photoURL?: string | null;  
    phoneNumber?: string;  
    createdAt?: string; 
  }
  