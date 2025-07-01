"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, User, Store, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { signupWithFirebase } from '@/lib/signupWithFirebase';
import { useRouter } from 'next/navigation';
import { googleLogin, SetRole } from '@/lib/googleLogin';
import { toast } from 'react-hot-toast';
import type { User as FirebaseUser } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { db } from '@/lib/firebase';

const SignupForm = () => {
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Verification, 3: Complete
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
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const result = await googleLogin();
      if (!result.user.email) {
        toast.error('Google account does not have an email address associated. Please use a different account.');
        return;
      }
      // Check if user with this email already exists in the database
      const snapshot = await get(ref(db, `users/${result.user.uid}`));
      if (snapshot.exists()) {
        toast.success(`Welcome back! You are already a registered ${snapshot.val().role}`);
        router.push('/');
        return;
      }
      setGoogleUser(result.user);
      setStep(3);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Google signup failed. Please try again.');
      console.log(error);
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
      await SetRole({ user: googleUser, role: userType });
      setStep(4);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to set role.');
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulate sending verification codes
      setStep(2);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendEmailVerification = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Verification code sent to ${formData.email}`);
    } catch (error) {
      toast.error('Failed to send email verification');
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneVerification = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Verification code sent to ${formData.phone}`);
    } catch (error) {
      toast.error('Failed to send phone verification');
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    if (verification.emailCode === '123456') {
      setVerification(prev => ({ ...prev, emailVerified: true }));
      toast.success('Email verified successfully!');
    } else {
      toast.error('Invalid verification code. Try: 123456');
    }
  };

  const verifyPhone = async () => {
    if (verification.phoneCode === '654321') {
      setVerification(prev => ({ ...prev, phoneVerified: true }));
      toast.success('Phone verified successfully!');
    } else {
      toast.error('Invalid verification code. Try: 654321');
    }
  };

  const handleVerificationComplete = () => {
    if (verification.emailVerified && verification.phoneVerified) {
      setStep(3);
    } else {
      toast.error('Please verify both email and phone number');
    }
  };

  const handleSignupComplete = async () => {
    if (!userType) {
      toast.error('Please select account type');
      return;
    }
  
    setLoading(true);
    try {
      await signupWithFirebase(
        formData.fullName,
        formData.email,
        formData.phone,
        formData.password,
        userType as 'merchant' | 'consumer'
      );
  
      setStep(4); // Go to success screen
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Signup failed. Please try again.');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <CardContent className="space-y-6">
      {/* Google Signup Button */}
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

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
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
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
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
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
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
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
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
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
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

        <Button
          onClick={handleBasicInfoSubmit}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
          disabled={loading || googleLoading}
        >
          {loading ? 'Creating Account...' : 'Continue'}
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </button>
        </p>
      </div>
    </CardContent>
  );

  const renderStep2 = () => (
    <CardContent className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Information</h3>
        <p className="text-sm text-gray-600">
          We've sent verification codes to your email and phone number
        </p>
      </div>

      {/* Email Verification */}
      <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Email Verification</span>
            {verification.emailVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={sendEmailVerification}
            disabled={loading || verification.emailVerified}
          >
            {verification.emailVerified ? 'Verified' : 'Resend Code'}
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Enter 6-digit code"
            value={verification.emailCode}
            onChange={(e) => setVerification(prev => ({ ...prev, emailCode: e.target.value }))}
            disabled={verification.emailVerified}
            className="flex-1"
          />
          <Button
            onClick={verifyEmail}
            disabled={verification.emailVerified || !verification.emailCode}
            size="sm"
          >
            Verify
          </Button>
        </div>
        <p className="text-xs text-gray-500">Demo code: 123456</p>
      </div>

      {/* Phone Verification */}
      <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Phone Verification</span>
            {verification.phoneVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={sendPhoneVerification}
            disabled={loading || verification.phoneVerified}
          >
            {verification.phoneVerified ? 'Verified' : 'Resend Code'}
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Enter 6-digit code"
            value={verification.phoneCode}
            onChange={(e) => setVerification(prev => ({ ...prev, phoneCode: e.target.value }))}
            disabled={verification.phoneVerified}
            className="flex-1"
          />
          <Button
            onClick={verifyPhone}
            disabled={verification.phoneVerified || !verification.phoneCode}
            size="sm"
          >
            Verify
          </Button>
        </div>
        <p className="text-xs text-gray-500">Demo code: 654321</p>
      </div>

      <Button
        onClick={handleVerificationComplete}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
        disabled={!verification.emailVerified || !verification.phoneVerified}
      >
        Continue to Account Setup
      </Button>
    </CardContent>
  );

  const renderStep3 = () => (
    <CardContent className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Account Type</h3>
        <p className="text-sm text-gray-600">
          Select the type of account that best describes you
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Consumer Option */}
        <div
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            userType === 'consumer'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setUserType('consumer')}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${userType === 'consumer' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <User className={`h-6 w-6 ${userType === 'consumer' ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Consumer</h4>
              <p className="text-sm text-gray-600">
                I&apos;m looking to purchase products and services
              </p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              userType === 'consumer' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            }`}>
              {userType === 'consumer' && (
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
              )}
            </div>
          </div>
        </div>

        {/* Merchant Option */}
        <div
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            userType === 'merchant'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setUserType('merchant')}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${userType === 'merchant' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <Store className={`h-6 w-6 ${userType === 'merchant' ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Merchant</h4>
              <p className="text-sm text-gray-600">
                I want to sell products and manage my business
              </p>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 ${
              userType === 'merchant' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            }`}>
              {userType === 'merchant' && (
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={googleUser ? handleGoogleRoleSet : handleSignupComplete}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
        disabled={!userType || loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </CardContent>
  );

  const renderStep4 = () => (
    <CardContent className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Our Platform!</h3>
        <p className="text-gray-600">
          Your {userType || 'Google'} account has been created successfully.
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {formData.fullName && <p><span className="font-medium">Name:</span> {formData.fullName}</p>}
        {formData.email && <p><span className="font-medium">Email:</span> {formData.email}</p>}
        {userType && <p><span className="font-medium">Account Type:</span> {userType.charAt(0).toUpperCase() + userType.slice(1)}</p>}
      </div>

      <Button
        onClick={() => {
          if (userType === 'merchant') {
            router.push('/merchant');
          } else if (userType === 'consumer') {
            router.push('/consumer');
          } else {
            alert('Please select an account type.');
          }
        }}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Get Started
      </Button>
    </CardContent>
  );

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Create Your Account';
      case 2: return 'Verify Your Information';
      case 3: return 'Account Setup';
      case 4: return 'Welcome!';
      default: return 'Sign Up';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'Join our platform to start your journey';
      case 2: return 'Secure your account with verification';
      case 3: return 'Tell us more about yourself';
      case 4: return 'You&apos;re all set to begin';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {getStepTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {getStepDescription()}
          </CardDescription>
          
          {/* Progress Steps */}
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

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </Card>
    </div>
  );
};

export default SignupForm;