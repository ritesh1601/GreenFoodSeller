"use client"
import LoginForm from "@/components/auth/LoginForm";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import ResendVerification from "@/components/auth/ResendVerification";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);

  const handleSuccess = (role: string | null) => {
    console.log(`role : ${role}`);
    router.push(role ? `/${role}` : "/");
  };

  const handleError = (msg: string) => {
    setError(msg);
    if (msg.includes("verify your email")) {
      setShowResend(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-12">
      <GoogleLoginButton onError={handleError} onSuccess={handleSuccess} />
      <LoginForm onError={handleError} onSuccess={handleSuccess} />

      {error && <Alert variant="destructive">{error}</Alert>}
      {showResend && <ResendVerification />}
    </div>
  );
}
