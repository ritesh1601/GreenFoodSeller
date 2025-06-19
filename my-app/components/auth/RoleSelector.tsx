import { Button } from "@/components/ui/button";
import React from "react";

interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
  isLoading: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ role, setRole, isLoading }) => (
  <div className="flex gap-2">
    <Button
      type="button"
      variant={role === "consumer" ? "default" : "outline"}
      onClick={() => setRole("consumer")}
      disabled={isLoading}
      className="flex-1"
    >
      Consumer
    </Button>
    <Button
      type="button"
      variant={role === "merchant" ? "default" : "outline"}
      onClick={() => setRole("merchant")}
      disabled={isLoading}
      className="flex-1"
    >
      Merchant
    </Button>
  </div>
);

export default RoleSelector; 