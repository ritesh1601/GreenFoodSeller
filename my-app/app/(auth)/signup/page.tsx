"use client";

import { signup, loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { getDatabase, ref, set } from "firebase/database";
import SignupForm from "@/components/auth/SignupForm";
import GoogleSignupButton from "@/components/auth/GoogleSignupButton";
import RoleSelector from "@/components/auth/RoleSelector";
import ErrorAlert from "@/components/auth/ErrorAlert";

type UserRole = "merchant" | "consumer";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "consumer",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { email, password, confirmPassword, role } = formData;

      if (!email || !password || !confirmPassword || !role) {
        throw new Error("Please fill in all fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const user = await signup(email, password, role);

      toast({
        title: `Congratulations ${user.email}! 🎉`,
        description: "Please check your email to verify your account.",
        duration: 3000,
      });

      setTimeout(() => {
        router.push(`/${role}`);
      }, 1000);
    } catch (error: any) {
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

      const result = await loginWithGoogle();
      const user = result?.user || result;

      const db = getDatabase();
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        userType: formData.role,
        name:user.displayName,
        phoneNumber:"",
        PhotoUrl:user.photoURL,
        uid:user.uid,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Account Created! 🎉",
        description: "Welcome to GreenFood",
        duration: 2000,
      });

      setTimeout(() => {
        router.push(`/${formData.role}`);
      }, 500);
    } catch (error: any) {
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md border">
        <CardHeader className="text-center">
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <GoogleSignupButton
            isLoading={isGoogleLoading}
            onClick={handleGoogleSignup}
          />

          <hr className="border-gray-200" />

          <SignupForm
            formData={formData}
            setFormData={setFormData}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            error={error}
            setError={setError}
            RoleSelector={RoleSelector}
            ErrorAlert={ErrorAlert}
          />

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
