export interface MenuItem {
  id: string;
  name: string;
  restaurantId: string;
  category: string;
  type: string;
  cuisineType: string;
  images: File[] | string[];
  orders?: number;
  available: boolean;
  description: string;
  rating?: number;
  reviewSummary: string;
  markedPrice: number;
  sellingPrice: number;
  discount: number;
  calories: number;
  healthScore: number;
  showHealthScore: boolean;
  variant: "parent" | "child" | "none" | "add-ons";
}
export interface MenuItemFormData extends MenuItem {
  autoCalculatePrice?: boolean;
}
export interface Offers {
  id: string;
  customerId: string;
  offerName: string;
  discount: number;
  freeItem: null | string;
  startTime: string;
  endTime: string;
  maxDiscountAmount: number;
  maxUsage: number;
  usage: number;
  couponCode: string;
  category: number;
}
