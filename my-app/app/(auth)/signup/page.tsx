"use client";

import { signup, loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle,
  Store,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/lib/validation";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: "merchant" | "consumer";
}

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "merchant",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUser, setGoogleUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email
      if (!validateEmail(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate password
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await signup(formData.email, formData.password);
      
      // Show success toast
      toast({
        title: "Account Created! 🎉",
        description: "Please check your email to verify your account",
        duration: 4000,
      });

      // Small delay to show the toast before redirect
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      
    } catch (error) {
      const errorMessage = error instanceof FirebaseError 
        ? error.message 
        : "An error occurred during signup";
      setError(errorMessage);
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await loginWithGoogle();
      setGoogleUser(user);
      setShowRoleModal(true);
    } catch (error) {
      const errorMessage = error instanceof FirebaseError 
        ? error.message 
        : "An error occurred during Google signup";
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async (role: "merchant" | "consumer") => {
    setIsLoading(true);
    try {
      if (!googleUser) {
        throw new Error("No user found. Please try signing up again.");
      }

      // Here you would typically update the user's role in your database
      // For example:
      // await updateUserRole(googleUser.uid, role);
      
      toast({
        title: "Account Created! 🎉",
        description: `Welcome to GreenFood as a ${role}`,
        duration: 4000,
      });

      // Small delay to show the toast before redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      const errorMessage = error instanceof FirebaseError 
        ? error.message 
        : "An error occurred while setting up your account";
      
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
      setShowRoleModal(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-4 py-8">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">GF</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Create an Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Join GreenFood and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-gray-200 hover:bg-gray-50"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
                    disabled={isLoading}
                    aria-label="Email address"
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "error-message" : undefined}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
                    disabled={isLoading}
                    aria-label="Password"
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "error-message" : undefined}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium">Password Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li className={formData.password.length >= 8 ? "text-green-600" : "text-gray-500"}>
                      At least 8 characters long
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                      Contains uppercase letter
                    </li>
                    <li className={/[a-z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                      Contains lowercase letter
                    </li>
                    <li className={/[0-9]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                      Contains number
                    </li>
                    <li className={/[!@#$%^&*]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                      Contains special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
                    disabled={isLoading}
                    aria-label="Confirm password"
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? "error-message" : undefined}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  I want to join as
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={formData.role === "merchant" ? "default" : "outline"}
                    className={`h-11 ${
                      formData.role === "merchant"
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, role: "merchant" }))}
                    disabled={isLoading}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    Merchant
                  </Button>
                  <Button
                    type="button"
                    variant={formData.role === "consumer" ? "default" : "outline"}
                    className={`h-11 ${
                      formData.role === "consumer"
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, role: "consumer" }))}
                    disabled={isLoading}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Consumer
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50" role="alert" id="error-message">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
                aria-label="Create account"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="font-medium text-green-600 hover:text-green-700 hover:underline transition-colors"
                aria-label="Sign in to your account"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Your Role</DialogTitle>
            <DialogDescription>
              Please select how you want to use GreenFood
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              type="button"
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center gap-2 ${
                formData.role === "merchant"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => handleRoleSelection("merchant")}
              disabled={isLoading}
            >
              <Store className="h-6 w-6" />
              <span className="font-medium">Merchant</span>
              <span className="text-xs text-gray-500">Sell your products</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center gap-2 ${
                formData.role === "consumer"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => handleRoleSelection("consumer")}
              disabled={isLoading}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="font-medium">Consumer</span>
              <span className="text-xs text-gray-500">Shop for products</span>
            </Button>
          </div>
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              <span className="ml-2 text-sm text-gray-500">Setting up your account...</span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
