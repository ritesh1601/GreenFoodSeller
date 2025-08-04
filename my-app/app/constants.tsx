
import { Shield, Zap, Users } from 'lucide-react';
export interface User {
    uid: string;
    email: string;
    fullName: string;
    role: 'consumer' | 'merchant' | 'string' ; 
    photoURL?: string | null;  
    phoneNumber?: string;  
    createdAt?: string; 
  }

// Account types and their properties for the signup form
export const ACCOUNT_TYPES = [
  {
    type: 'personal',
    icon: Users, // Using a different icon here for variety as User is already imported in the original file
    title: 'Personal Account',
    description: 'Perfect for individual users and personal projects',
    features: [
      { icon: Shield, text: 'Basic Security' },
      { icon: Zap, text: 'Quick Setup' }
    ]
  },
  {
    type: 'business',
    icon: Users,
    title: 'Business Account',
    description: 'Advanced features for teams and organizations',
    features: [
      { icon: Users, text: 'Team Management' },
      { icon: Shield, text: 'Enterprise Security' }
    ]
  }
];

// Password validation requirements
export const PASSWORD_REQUIREMENTS = [
  { text: "At least 8 characters", check: (password: string) => password.length >= 8 },
  { text: "One uppercase letter", check: (password: string) => /[A-Z]/.test(password) },
  { text: "One number", check: (password: string) => /[0-9]/.test(password) },
];

// Other constants you might want to extract
export const TOTAL_STEPS = 4;