"use client";

import { login, resendVerificationEmail, loginWithGoogle, AuthError } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setShowResendVerification(false);

    try {
      const user = await login(formData.email, formData.password);
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.data()?.role;
      
      // Show success toast
      toast({
        title: "Login Successful! 🎉",
        description: "Welcome back to GreenFood",
        duration: 2000,
      });

      // Small delay to show the toast before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
      
    } catch (error: unknown) {
      const authError = error as AuthError;
      const errorMessage = authError.message || "An error occurred during login";
      setError(errorMessage);
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
        duration: 4000,
      });
      
      // Show resend verification button if email is not verified
      if (authError.message?.includes("verify your email")) {
        setShowResendVerification(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const user = await loginWithGoogle();
      
      // Show success toast
      toast({
        title: "Google Login Successful! 🎉",
        description: "Welcome to GreenFood",
        duration: 2000,
      });

      // Small delay to show the toast before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
      
    } catch (error: unknown) {
      const authError = error as AuthError;
      const errorMessage = authError.message || "Google login failed";
      setError(errorMessage);
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Google Login Failed",
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail();
      setShowResendVerification(false);
      
      // Show success toast for verification email
      toast({
        title: "Verification Email Sent! 📧",
        description: "Please check your inbox and spam folder",
        duration: 4000,
      });
      
    } catch (error: unknown) {
      const authError = error as AuthError;
      const errorMessage = authError.message || "Failed to resend verification email";
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Failed to Send Email",
        description: errorMessage,
        duration: 4000,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-4 py-8">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">GF</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to your GreenFood account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            aria-label="Sign in with Google"
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative" role="separator" aria-label="Or continue with email">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
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
                  disabled={isLoading || isGoogleLoading}
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
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                  disabled={isLoading || isGoogleLoading}
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
                  disabled={isLoading || isGoogleLoading}
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

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50" role="alert" id="error-message">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                <AlertDescription className="text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {showResendVerification && (
              <Alert className="border-blue-200 bg-blue-50" role="alert">
                <CheckCircle2 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <AlertDescription className="text-sm text-blue-800">
                  Need to verify your email?
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendVerification}
                    className="p-0 ml-1 h-auto text-blue-600 underline"
                    aria-label="Resend verification email"
                  >
                    Resend verification email
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading || isGoogleLoading}
              aria-label="Sign in"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-green-600 hover:text-green-700 hover:underline transition-colors"
              aria-label="Sign up for a new account"
            >
              Sign up
            </Link>
          </div>

          <div className="text-center">
            <Link 
              href="/forgot-password" 
              className="text-sm text-gray-600 hover:text-green-600 hover:underline transition-colors"
              aria-label="Forgot your password?"
            >
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}