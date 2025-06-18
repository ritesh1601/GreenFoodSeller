"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  ShoppingCart, 
  Store, 
  BarChart3, 
  Package, 
  Search,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useCurrentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMerchant = pathname.startsWith("/merchant");
  const isConsumer = pathname.startsWith("/consumer");

  const handleLogout = async () => {
    const { logout } = await import("@/lib/auth");
    await logout();
    window.location.href = "/login";
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-bold text-xl bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent hover:from-green-700 hover:to-green-600 transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">GF</span>
            </div>
            GreenFood
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {!loading && (
              <>
                {isMerchant && (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <Link 
                          href="/merchant/dashboard" 
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            pathname === "/merchant/dashboard" ? "bg-green-100 text-green-700" : "text-gray-700"
                          }`}
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link 
                          href="/merchant/products" 
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            pathname === "/merchant/products" ? "bg-green-100 text-green-700" : "text-gray-700"
                          }`}
                        >
                          <Package className="w-4 h-4 mr-2" />
                          Products
                        </Link>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                )}

                {isConsumer && (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <Link 
                          href="/consumer/explore" 
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            pathname === "/consumer/explore" ? "bg-green-100 text-green-700" : "text-gray-700"
                          }`}
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Explore
                        </Link>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <Link 
                          href="/consumer/cart" 
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-green-50 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            pathname === "/consumer/cart" ? "bg-green-100 text-green-700" : "text-gray-700"
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Cart
                        </Link>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                )}
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {loading && (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            )}

            {!loading && !user && (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-green-700 hover:bg-green-50">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-green-50">
                    <Avatar className="h-9 w-9 border-2 border-green-100">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white text-sm font-medium">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.name && <p className="font-medium text-sm">{user.name}</p>}
                      {user.email && (
                        <p className="w-[200px] truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                      {isMerchant && (
                        <Badge variant="secondary" className="w-fit text-xs">
                          <Store className="w-3 h-3 mr-1" />
                          Merchant
                        </Badge>
                      )}
                      {isConsumer && (
                        <Badge variant="secondary" className="w-fit text-xs">
                          <User className="w-3 h-3 mr-1" />
                          Consumer
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!loading && (
                <>
                  {isMerchant && (
                    <>
                      <Link
                        href="/merchant/dashboard"
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pathname === "/merchant/dashboard"
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BarChart3 className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link
                        href="/merchant/products"
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pathname === "/merchant/products"
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Package className="w-4 h-4 mr-3" />
                        Products
                      </Link>
                    </>
                  )}

                  {isConsumer && (
                    <>
                      <Link
                        href="/consumer/explore"
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pathname === "/consumer/explore"
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Search className="w-4 h-4 mr-3" />
                        Explore
                      </Link>
                      <Link
                        href="/consumer/cart"
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          pathname === "/consumer/cart"
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-3" />
                        Cart
                      </Link>
                    </>
                  )}

                  {!user && (
                    <div className="pt-2 space-y-2">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}