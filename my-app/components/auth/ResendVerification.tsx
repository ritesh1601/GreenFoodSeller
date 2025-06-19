// components/auth/ResendVerification.tsx
import { resendVerificationEmail } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ResendVerification() {
  const toast = useToast();

  const handleResend = async () => {
    try {
      await resendVerificationEmail();
      toast({
        title: "Verification Email Sent",
        description: "Please check your inbox.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Resend Failed",
        description: err.message || "Could not send email.",
      });
    }
  };

  return (
    <Button variant="link" className="text-blue-600 underline text-sm" onClick={handleResend}>
      Resend verification email
    </Button>
  );
}
