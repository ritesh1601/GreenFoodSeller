import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

interface SignupFormProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  error: string;
  setError: (msg: string) => void;
  RoleSelector: React.ComponentType<any>;
  ErrorAlert: React.ComponentType<{ error: string }>;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  setFormData,
  isLoading,
  onSubmit,
  error,
  setError,
  RoleSelector,
  ErrorAlert,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <RoleSelector
        role={formData.role}
        setRole={(role: string) => setFormData((prev: any) => ({ ...prev, role }))}
        isLoading={isLoading}
      />
      {error && <ErrorAlert error={error} />}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm; 