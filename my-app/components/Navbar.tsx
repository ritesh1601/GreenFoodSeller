"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { get, ref } from 'firebase/database';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const snapshot = await get(ref(db, `/users/${firebaseUser.uid}`));
          const data = snapshot.val();
          if (data && data.role) {
            setUserRole(data.role);
          } else {
            setUserRole(null);
          }
        } catch {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Failed to log out.');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MerchantPortal
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Button asChild variant="outline">
                  <Link href={userRole ? `/${userRole}/Dashboard` : "#"}>Dashboard</Link>
                </Button>
                <Button onClick={handleLogout} variant="outline" className="ml-2 flex items-center">
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
              
              {user ? (
                <>
                  <Link href={userRole ? `/${userRole}/Dashboard` : "#"} className="text-blue-600">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-left text-gray-700">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/auth/signup" className="text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;