export interface OrderProps {
  id: string;
  orderId: string;
  paymentMethod: "COD" | "UPI" | "Debit Card" | "Credit Card" | "Net Banking";
  paymentStatus: "Created" | "Authorised" | "Captured" | "Refunded" | "Failed";
  scheduledOrder: boolean;
  scheduledAt: string;
  totalAmount: number;
  taxes: number;
  deliveryCharges: number;
  deliveryStatus: string;
  address: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    postalCode: string;
    location: [string, string];
  };
  customerFirstName: string;
  customerLastName: string;
  customerContact: string;
  customerCountryCode: string;
  customerEmail: string;
}

export interface OrderItem {
  status: "Pending" | "Ready" | "Cancelled";
  orderItem: {
    name: string;
    images: string[];
    available: boolean;
    cuisineType: "veg" | "non-veg";
    sellingPrice: number;
    addOns?: [
      {
        name: string;
        sellingPrice: number;
      }
    ];
  };
}
