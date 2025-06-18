import { useToast as useToastOriginal } from "@/components/ui/use-toast";

export const useToast = () => {
  const { toast, ...rest } = useToastOriginal();

  return {
    toast: ({
      title,
      description,
      duration = 3000,
      variant = "default",
    }: {
      title?: string;
      description?: string;
      duration?: number;
      variant?: "default" | "destructive";
    }) => {
      toast({
        title,
        description,
        duration,
        variant,
      });
    },
    ...rest,
  };
};
