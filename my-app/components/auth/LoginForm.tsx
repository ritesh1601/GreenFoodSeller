// components/auth/LoginForm.tsx
import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/lib/user";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginForm({ onError, onSuccess }: {
  onError: (msg: string) => void,
  onSuccess: (role: string | null) => void
}) {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onError("");

    try {
      const user = await login(email, password);
      const role = await getUserRole(user.uid);
      onSuccess(role);
    } catch (err: any) {
      onError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email input */}
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        disabled={isLoading}
        icon={<Mail className="text-gray-400" />}
      />

      {/* Password input */}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={isLoading}
          icon={<Lock className="text-gray-400" />}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {/* Submit button */}
      <Button className="w-full" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
}
