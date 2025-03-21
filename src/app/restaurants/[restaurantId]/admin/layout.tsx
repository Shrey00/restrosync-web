"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import {
  LayoutDashboard,
  Menu,
  ShoppingBag,
  // Truck,
  // Star,
  // Users,
  // CreditCard,
  PartyPopper
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
const SidebarButton = ({
  href,
  icon,
  text,
  isExpanded,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  isExpanded: boolean;
}) => {
  const route = useRouter();
  const handleRoute = () => {
    route.push(`${href}`);
  }
  return (
    <Button onClick={handleRoute} variant="ghost" className="w-full justify-start px-2">
      <span
        className={cn(
          "transition-all duration-300",
          isExpanded ? "mr-2" : "mr-0"
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "transition-all duration-300",
          isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
        )}
      >
        {text}
      </span>
    </Button>
  );
};

export default function AdminPanelRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const params = useParams();
  return (
    <div className="relative h-[90.9vh] overflow-hidden">
      <aside
        className={cn(
          "absolute top-0 left-0 h-full text-secondary-foreground border-r-[1px]",
          "transition-all duration-300 ease-in-out z-10",
          isExpanded ? "w-56 bg-secondary" : "w-10"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <nav className="py-4">
          <SidebarButton
            href={`/restaurants/${params.restaurantId}/admin`}
            icon={<LayoutDashboard className="h-5 w-5" />}
            text="Dashboard"
            isExpanded={isExpanded}
          />
          <SidebarButton
            href={`/restaurants/${params.restaurantId}/admin/menu`}
            icon={<Menu className="h-5 w-5" />}
            text="Menu"
            isExpanded={isExpanded}
          />
          <SidebarButton
            href={`/restaurants/${params.restaurantId}/admin/orders`}
            icon={<ShoppingBag className="h-5 w-5" />}
            text="Orders"
            isExpanded={isExpanded}
          />
          <SidebarButton
            href={`/restaurants/${params.restaurantId}/admin/offers`}
            icon={<PartyPopper className="h-5 w-5" />}
            text="Offers"
            isExpanded={isExpanded}
          />
          {/* <SidebarButton
            href="#"
            icon={<Truck className="h-5 w-5" />}
            text="Deliveries"
            isExpanded={isExpanded}
          /> */}
          {/* <SidebarButton
            href="#"
            icon={<Star className="h-5 w-5" />}
            text="Reviews"
            isExpanded={isExpanded}
          /> */}
          {/* <SidebarButton
            href="#"
            icon={<Users className="h-5 w-5" />}
            text="Customers"
            isExpanded={isExpanded}
          /> */}
          {/* <SidebarButton
            href="#"
            icon={<CreditCard className="h-5 w-5" />}
            text="Billing"
            isExpanded={isExpanded}
          /> */}
        </nav>
      </aside>
      <main
        className={cn(
          "h-full p-8 text-foreground overflow-auto",
          "transition-all duration-300 ease-in-out",
          "ml-12"
        )}
      >
        {children}
      </main>
      <Toaster />
    </div>
  );
}
