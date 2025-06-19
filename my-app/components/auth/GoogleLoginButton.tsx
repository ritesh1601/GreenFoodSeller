// components/auth/GoogleLoginButton.tsx
import { loginWithGoogle } from "@/lib/auth";
import { getUserRole } from "@/lib/user";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton({ onError, onSuccess }: {
  onError: (msg: string) => void,
  onSuccess: (role: string | null) => void
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogle = async () => {
    setLoading(true);
    onError("");

    try {
      const result = await loginWithGoogle();
      const role = await getUserRole();
      console.log("Google login result:", JSON.stringify(result, null, 2));
      if (!role) {
        onError("No account found for this Google user. Please sign up first.");
        router.push("/signup");
        return;
      }
      onSuccess(role);
    } catch (err: any) {
      onError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue with Google"}
    </Button>
  );
}
