'use client';
import React, { useState, useEffect } from 'react';
import MenuIcon from './ui/MenuIcon';
import XIcon from './ui/XIcon';
import LogoutIcon from './ui/LogoutIcon';
import { useRouter } from 'next/navigation';
import { User as UserData } from "@/app/constants"
import Logo from "@/components/Logo";
const pulseSlow = `
  @keyframes pulse-slow {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const Navbar = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/GetUser');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          console.warn('User data not available or invalid');
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        // Don't set user to null here, let it remain undefined for loading state
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);
        setIsMenuOpen(false);
        router.push('/');
        router.refresh();
      } else {
        console.error('Logout failed:', await res.json());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/About' },
    { name: 'Contacts', href: '/Contact' },
  ];

  return (
      <>
        <style>{pulseSlow}</style>
        <nav className="bg-gradient-to-r from-green-50 to-green-100 shadow-lg sticky top-0 z-50 rounded-b-xl">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Logo/>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="relative text-gray-700 font-medium text-lg hover:text-green-600 transition-colors duration-300 transform hover:scale-110"
                    >
                      {item.name}
                    </a>
                ))}

                {user ? (
                    <div className="flex items-center gap-4 ml-8">
                      {user.role==='consumer'?
                      <>                        
                        <a href={`/${user.role || 'user'}/`}>
                          <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                            Order Now
                        </button>
                        </a>
                      </>:<></>}
                      <a href={`/${user.role || 'user'}/Dashboard`}>
                        <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                          Dashboard
                        </button>
                      </a>
                      <button
                          onClick={handleLogout}
                          className="flex items-center bg-transparent text-green-600 font-semibold py-2 px-4 rounded-full border border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                      >
                        <LogoutIcon /> Logout
                      </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 ml-8">
                      <a href="/auth/login">
                        <button className="bg-transparent text-green-600 font-semibold py-2 px-4 rounded-full border border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                          Login
                        </button>
                      </a>
                      <a href="/auth/signup">
                        <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                          Get Started ♻️
                        </button>
                      </a>
                    </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                  className="md:hidden p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div
              className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="flex flex-col space-y-4 px-4 border-t border-gray-200 pt-4">
              {navItems.map((item) => (
                  <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
                  >
                    {item.name}
                  </a>
              ))}

              <div className="border-t border-gray-200 my-4"></div>

              {user ? (
                  <>
                    <a
                        href={`/${user.role || 'user'}/Dashboard`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-left font-medium text-green-600"
                    >
                      Dashboard
                    </a>
                    <button
                        onClick={handleLogout}
                        className="text-left font-medium text-gray-700 hover:text-red-500 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
              ) : (
                  <>
                    <a
                        href="/auth/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-left font-medium text-gray-700"
                    >
                      Login
                    </a>
                    <a
                        href="/auth/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-left font-medium text-green-600"
                    >
                      Get Started
                    </a>
                  </>
              )}
            </div>
          </div>
        </nav>
      </>
  );
};

export default Navbar;
