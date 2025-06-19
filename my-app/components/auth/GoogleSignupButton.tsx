import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface GoogleSignupButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const GoogleSignupButton: React.FC<GoogleSignupButtonProps> = ({ isLoading, onClick }) => (
  <Button
    type="button"
    variant="outline"
    className="w-full"
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue with Google"}
  </Button>
);

export default GoogleSignupButton; 