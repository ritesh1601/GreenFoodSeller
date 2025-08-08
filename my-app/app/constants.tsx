import { RotateCcw, User, ShoppingBag } from 'lucide-react'
import {Shield, Zap, Users, Home, CreditCard, MessageSquare, Clock, FileText} from 'lucide-react';

// Export the User type properly
export interface User {
    uid: string;
    email: string;
    fullName: string;
    role: 'consumer' | 'merchant' | 'string' ; 
    photoURL?: string | null;  
    phoneNumber?: string;  
    createdAt?: string; 
}

// Add proper type definitions for all exported data
export interface SummaryCard {
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: string;
    subtext: string;
    availability?: string;
}

export interface OrderStat {
    label: string;
    value: string;
    action: string;
    rating?: string;
}

export interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    active: boolean;
}

export interface ProductItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    rating?: number;
    reviews?: number;
    category?: string;
    isFavorite?: boolean;
    originalPrice?: number;
    discount?: number;
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
export const products = [
    {
        id: 1,
        name: 'Fresh Green Apples',
        description: 'Crisp and sweet organic apples from local farms.',
        price: 3.99,
        originalPrice: 4.99,
        discount: 20,
        rating: 4.5,
        reviews: 128,
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1576179635662-9d1983e97e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: false
    },
    {
        id: 2,
        name: 'Baby Potatoes',
        description: 'Small, waxy potatoes perfect for roasting and salads.',
        price: 2.49,
        rating: 4.3,
        reviews: 89,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1518977956812-7f1309321f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: true
    },
    {
        id: 3,
        name: 'Premium Chicken Breast',
        description: 'Free-range, lean chicken breast, hormone-free.',
        price: 8.99,
        rating: 4.8,
        reviews: 256,
        category: 'Meat',
        image: 'https://images.unsplash.com/photo-1549428593-3b10b0f7e415?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: false
    },
    {
        id: 4,
        name: 'Artisan Sourdough',
        description: 'Freshly baked sourdough, crispy crust, soft inside.',
        price: 4.99,
        rating: 4.6,
        reviews: 145,
        category: 'Bakery',
        image: 'https://images.unsplash.com/photo-1583568772922-262194c5f949?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: false
    },
    {
        id: 5,
        name: 'Organic Bananas',
        description: 'Sweet and ripe bananas, perfect for smoothies or snacks.',
        price: 1.99,
        rating: 4.4,
        reviews: 203,
        category: 'Fruits',
        image: 'https://images.unsplash.com/photo-1543265328-568b6b1580f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: false
    },
    {
        id: 6,
        name: 'Mixed Lentils',
        description: 'A protein-rich organic mix of red and green lentils.',
        price: 3.49,
        rating: 4.2,
        reviews: 67,
        category: 'Pantry',
        image: 'https://images.unsplash.com/photo-1565551972825-9a848b594b28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: false
    },
    {
        id: 7,
        name: 'Fresh Broccoli',
        description: 'Crisp and vitamin-rich organic broccoli crowns.',
        price: 2.99,
        rating: 4.5,
        reviews: 112,
        category: 'Vegetables',
        image: 'https://images.unsplash.com/photo-1549487771-b6a9a7b0a7a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: true
    },
    {
        id: 8,
        name: 'Farm Fresh Eggs',
        description: 'A dozen free-range, organic eggs.',
        price: 5.99,
        rating: 4.7,
        reviews: 189,
        category: 'Dairy',
        image: 'https://images.unsplash.com/photo-1606558485233-a859b8a0e206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        isFavorite: false
    }
];
export const recommendedItems: ProductItem[] = [
    { id: 1, name: 'Fresh Spinach', price: 4.99, image: '/images/spinach.jpg' },
    { id: 2, name: 'Organic Lettuce', price: 3.49, image: '/images/lettuce.jpg' },
    { id: 3, name: 'Baby Kale', price: 5.99, image: '/images/kale.jpg' },
    { id: 4, name: 'Cucumber Pack', price: 2.89, image: '/images/cucumber.jpg' }
]

export const topSellers: ProductItem[] = [
    { id: 5, name: 'Green Beans', price: 4.29, image: '/images/green-beans.jpg' },
    { id: 6, name: 'Fresh Cabbage', price: 2.99, image: '/images/cabbage.jpg' },
    { id: 7, name: 'Organic Broccoli', price: 3.79, image: '/images/broccoli.jpg' }
]
export const navItems: NavItem[] = [
    { icon: Home, active: true },
    { icon: CreditCard, active: false },
    { icon: MessageSquare, active: false },
    { icon: Clock, active: false },
    { icon: FileText, active: false },
    { icon: Shield, active: false }
]

export const summaryCards: SummaryCard[] = [
    {
        icon: ShoppingBag,
        value: '$125.47',
        label: 'total spent',
        subtext: 'View insight data'
    },
    {
        icon: RotateCcw,
        value: '$89',
        label: 'average order value',
        subtext: 'Active order'
    },
    {
        icon: ShoppingBag,
        value: '18',
        label: 'Merchants info',
        subtext: 'Account'
    },
    {
        icon: User,
        value: 'Fresh Greens',
        label: 'into',
        subtext: '94% total',
        availability: '24/7 availability'
    }
]

export const orderStats: OrderStat[] = [
    { label: 'Order history', value: '156', action: 'View insight' },
    { label: 'Your wishlist', value: '28', action: '+ Add' },
    { label: 'Merchant info', value: '12', rating: '4.8', action: 'Contact seller' }
]
