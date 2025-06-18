"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConsumerDashboard() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email);
    } else {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Welcome, {userName || "User"} 🛒</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            You can explore fresh and local products, add them to your cart, and place orders easily.
          </p>

          <div className="flex gap-4">
            <Button onClick={() => router.push("/consumer/explore")}>Explore Products</Button>
            <Button variant="outline" onClick={() => router.push("/consumer/cart")}>
              View Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
