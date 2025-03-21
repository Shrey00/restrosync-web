"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/context";
import { Clock, Star, MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
const Page = () => {
  type RestaurantListItem = {
    id: string;
    name: string;
    rating: number;
    logo: string;
    opensAt: string;
    cuisineType: string;
    closesAt: string;
    acceptingOrders: boolean;
  };
  type Restaurantlist = RestaurantListItem[];
  const [restaurants, setRestaurants] = useState<Restaurantlist>([]);
  const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/restaurants/list/241b8620-6804-4f38-92dd-8914f7853682`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const parsedResponse = await response.json();
        setRestaurants(parsedResponse);
        // setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  if (!user) {
    router.push("/admin-signin");
  }
  return (
    <div className="container mx-auto py-8 px-[24px]">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Your Restaurants</h1>
        <Button>New Restaurant</Button>
      </div>
      <div className="space-y-4">
        {restaurants?.map((restaurant) => (
          <Card
            key={restaurant.id}
            className="hover:shadow-lg transition-shadow w-[480px] h-[180px] flex flex-col justify-between"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={restaurant.logo}
                alt={`${restaurant.name} logo`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                </div>
                <div className="flex items-center mt-1 space-x-2">
                  <Badge variant="secondary">{restaurant.cuisineType}</Badge>
                  <Badge variant="secondary">
                    {restaurant.acceptingOrders
                      ? "Accepting Orders"
                      : "Not Accepting Orders"}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Update Details</DropdownMenuItem>
                  <DropdownMenuItem>Team Members</DropdownMenuItem>
                  <DropdownMenuItem>Generate Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm text-muted-foreground justify-between">
                {/* <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {restaurant.location}
                </div> */}
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {restaurant.opensAt}-{restaurant.closesAt}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-medium">
                      {restaurant?.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>
                <Link href={`/restaurants/${restaurant.id}/${user?.role}`}>
                  <Button>Manage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Page;
