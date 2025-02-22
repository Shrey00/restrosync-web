export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    contact: string,
    email: string,
    password?: string,
    role:
      | "customer"
      | "admin"
      | "delivery-agent"
      | "delivery"
      | "sales"
      | "packaging",
    countryCode?: string,
    address?: unknown,
    loyaltyPoints?: number,
    createdAt?: Date,
    updatedAt?: Date,
    token?:string
  };