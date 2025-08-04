"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth, googleProvider } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, User, Store, Mail, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { User as AppUser } from '@/app/constants';
import { signInWithPopup } from 'firebase/auth';

const SignupForm = () => {
  const [step, setStep] = useState(1);

  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [verification, setVerification] = useState({
    emailCode: '',
    phoneCode: '',
    emailVerified: false,
    phoneVerified: false
  });
  const [googleUser, setGoogleUser] = useState<AppUser | null>(null);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- Google Signup Flow ---
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!user) {
        toast.error('Please try with valid Google account');
        setGoogleLoading(false);
        return;
      }
      const response = await fetch('http://localhost:3000/api/signup/WithGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          uid: user.uid, 
          fullName: user.displayName, 
          email: user.email, 
          phone: "1234567890", 
          role: `consumer`
        }),
      });
      const userData = await response.json();
      setGoogleUser(userData);
      toast.success('Successfully signed in with Google!');
      setStep(3);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Google signup failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };
  
  const handleGoogleRoleSet = async () => {
    if (!googleUser || !userType) {
      toast.error('Please select an account type.');
      return;
    }
    setLoading(true);
    try {
      console.log(`user uid : ${googleUser.uid} and user role : ${userType}`);
      const response = await fetch('http://localhost:3000/api/signup/setRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: googleUser.uid, role: userType }),
      });
      if (response.ok) {
        toast.success('Account created successfully!');
        setStep(4);
      } else {
        toast.error('Failed to set role. Please try again.');
      }
      toast.success('Account created successfully!');
      setStep(4);
    } catch (error) {
      console.error('[SetRole] Exception caught:', error);
      toast.error('Failed to set role. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  // --- Email/Password Signup Flow ---
  const handleBasicInfoSubmit = async () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      // Simulate a backend call to check if the email exists
      await new Promise(resolve => setTimeout(resolve, 500));
      const emailExists = false; 
      if (emailExists) {
        toast.error('An account with this email already exists.');
        return;
      }
      toast.success('Basic information saved. Now, verify your account.');
      setStep(2);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async (type: 'email' | 'phone') => {
    setLoading(true);
    try {
      // Simulate API call to send a code (e.g., via email service or SMS provider)
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Verification code sent to your ${type}.`);
    } catch {
      toast.error(`Failed to send ${type} verification.`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = (type: 'email' | 'phone') => {
    const code = type === 'email' ? verification.emailCode : verification.phoneCode;
    const correctCode = type === 'email' ? '123456' : '654321';

    if (code === correctCode) {
      setVerification(prev => ({ ...prev, [`${type}Verified`]: true }));
      toast.success(`${type} verified successfully!`);
    } else {
      toast.error(`Invalid verification code for ${type}. Try: ${correctCode}`);
    }
  };

  const handleVerificationComplete = () => {
    if (verification.emailVerified && verification.phoneVerified) {
      setStep(3);
    } else {
      toast.error('Please verify both your email and phone number.');
    }
  };

  const handleSignupComplete = async () => {
    if (!userType) {
      toast.error('Please select an account type.');
      return;
    }
    setLoading(true);
    try {
      // Simulate final signup API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Account created successfully!');
      setStep(4);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Create Your Account';
      case 2: return 'Verify Your Information';
      case 3: return 'Choose Your Account Type';
      case 4: return 'Welcome!';
      default: return 'Sign Up';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'Join our platform to start your journey';
      case 2: return 'Secure your account with verification';
      case 3: return 'Tell us more about yourself';
      case 4: return 'You\'re all set to begin';
      default: return '';
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CardContent className="space-y-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {googleLoading ? 'Creating account...' : 'Continue with Google'}
                </span>
              </div>
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a password"
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <Button onClick={handleBasicInfoSubmit} className="w-full h-11" disabled={loading || googleLoading}>
                Continue
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button className="font-medium text-blue-600 hover:text-blue-500" onClick={() => router.push('/login')}>
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        );

      case 2:
        return (
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Email Verification</span>
                  {verification.emailVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <Button variant="outline" size="sm" onClick={() => handleSendCode('email')} disabled={loading || verification.emailVerified}>
                  {verification.emailVerified ? 'Verified' : 'Resend Code'}
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter 6-digit code" 
                  value={verification.emailVerified ? '123456' : verification.emailCode} 
                  onChange={(e) => setVerification(prev => ({ ...prev, emailCode: e.target.value }))} 
                  disabled={verification.emailVerified} 
                  className="flex-1" 
                />
                <Button onClick={() => handleVerifyCode('email')} disabled={verification.emailVerified || !verification.emailCode} size="sm">
                  Verify
                </Button>
              </div>
              <p className="text-xs text-gray-500">Demo code: 123456</p>
            </div>
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Phone Verification</span>
                  {verification.phoneVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <Button variant="outline" size="sm" onClick={() => handleSendCode('phone')} disabled={loading || verification.phoneVerified}>
                  {verification.phoneVerified ? 'Verified' : 'Resend Code'}
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter 6-digit code" 
                  value={verification.phoneVerified ? '654321' : verification.phoneCode} 
                  onChange={(e) => setVerification(prev => ({ ...prev, phoneCode: e.target.value }))} 
                  disabled={verification.phoneVerified} 
                  className="flex-1" 
                />
                <Button onClick={() => handleVerifyCode('phone')} disabled={verification.phoneVerified || !verification.phoneCode} size="sm">
                  Verify
                </Button>
              </div>
              <p className="text-xs text-gray-500">Demo code: 654321</p>
            </div>
            <Button onClick={handleVerificationComplete} className="w-full h-11" disabled={!verification.emailVerified || !verification.phoneVerified}>
              Continue to Account Setup
            </Button>
          </CardContent>
        );

      case 3:
        return (
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  userType === 'consumer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setUserType('consumer')}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${userType === 'consumer' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <User className={`h-6 w-6 ${userType === 'consumer' ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Consumer</h4>
                    <p className="text-sm text-gray-600">I&apos;m looking to purchase products and services</p>
                  </div>
                </div>
              </div>
              <div
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  userType === 'merchant' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setUserType('merchant')}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${userType === 'merchant' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Store className={`h-6 w-6 ${userType === 'merchant' ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Merchant</h4>
                    <p className="text-sm text-gray-600">I want to sell products and manage my business</p>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={googleUser ? handleGoogleRoleSet : handleSignupComplete} 
              className="w-full h-11" 
              disabled={!userType || loading || googleLoading}
            >
              {loading || googleLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </CardContent>
        );

      case 4:
        return (
          <CardContent className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h3>
              <p className="text-gray-600">Your account has been created successfully.</p>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              {googleUser ? (
                <>
                  <p><span className="font-medium">Name:</span> {googleUser.fullName}</p>
                  <p><span className="font-medium">Email:</span> {googleUser.email}</p>
                </>
              ) : (
                <>
                  <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                </>
              )}
              {userType && <p><span className="font-medium">Account Type:</span> {userType.charAt(0).toUpperCase() + userType.slice(1)}</p>}
            </div>
            <Button
              onClick={() => {
                if (userType === 'merchant') {
                  router.push('/merchant');
                } else if (userType === 'consumer') {
                  router.push('/consumer');
                } else {
                  toast.error('Please select an account type.');
                }
              }}
              className="w-full h-11"
            >
              Get Started
            </Button>
          </CardContent>
        );

      default:
        return null;
    }
  };

  const hasBackNavigation = step > 1 && step < 4;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      <Toaster />
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2 relative">
          {hasBackNavigation && (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          <CardTitle className="text-2xl font-bold text-gray-900">
            {getStepTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {getStepDescription()}
          </CardDescription>
          {step < 4 && (
            <div className="flex justify-center space-x-2 mt-4">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-2 h-2 rounded-full ${
                    stepNum <= step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </CardHeader>
        {renderStep()}
      </Card>
    </div>
  );
};

export default SignupForm;
