"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MerchantDashboard() {
  const [userName, setUserName] = useState<string | null>(null);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email);
    } else {
      router.push("/login"); // Redirect if not logged in
    }
  }, []);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Welcome, {userName || "Merchant"} 👋</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            This is your merchant dashboard. From here, you can manage your products, view orders, and track performance.
          </p>

          <div className="flex gap-4">
            <Button onClick={() => router.push("/merchant/products")}>Manage Products</Button>
            <Button variant="outline" onClick={() => router.push("/merchant/orders")}>
              View Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
