"use client";

import { signup, loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { getDatabase, ref, set } from "firebase/database";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // either "consumer" or "merchant"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
        throw new Error("Please fill in all fields");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const user = await signup(formData.email, formData.password, formData.role);

      if (user) {
        toast({
          title: `Congratulations ${user.email}! 🎉`,
          description: "Please check your email to verify your account.",
          duration: 3000,
        });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.message || "An error occurred during signup";
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

  const handleGoogleSignup = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      if (!formData.role) {
        throw new Error("Please select a user type before signing up with Google");
      }

      const resultGoogleLogin = await loginWithGoogle(); // This should return { user }

      const user = resultGoogleLogin.user; // ✅ Get the user object safely

      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        userType: formData.role,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Account Created! 🎉",
        description: "Welcome to GreenFood",
        duration: 2000,
      });

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      const errorMessage = error.message || "Google signup failed";
      setError(errorMessage);

      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md border">
          <CardHeader className="text-center">
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                  "Continue with Google"
              )}
            </Button>

            <hr className="border-gray-200" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading || isGoogleLoading}
              />

              <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading || isGoogleLoading}
              />

              <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading || isGoogleLoading}
              />

              <div className="flex gap-2">
                <Button
                    type="button"
                    variant={formData.role === "consumer" ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, role: "consumer" }))}
                    disabled={isLoading || isGoogleLoading}
                    className="flex-1"
                >
                  Consumer
                </Button>
                <Button
                    type="button"
                    variant={formData.role === "merchant" ? "default" : "outline"}
                    onClick={() => setFormData(prev => ({ ...prev, role: "merchant" }))}
                    disabled={isLoading || isGoogleLoading}
                    className="flex-1"
                >
                  Merchant
                </Button>
              </div>

              {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
              )}

              <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                ) : (
                    "Create Account"
                )}
              </Button>
            </form>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
  );
}
