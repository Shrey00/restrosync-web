import { ColumnDef } from "@tanstack/react-table";
import { Offers } from "@/types";

export const columns: ColumnDef<Offers>[] = [
  {
    accessorKey: "offerName",
    header: "Name",
  },
  {
    accessorKey: "couponCode",
    header: "Coupon Code",
  },
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => {
      const item = row.getValue("item");
      return item ? item : "None";
    },
  },
  {
    accessorKey: "category",
    header: "Category Valid",
    cell: ({ row }) => {
      const category = row.getValue("category");
      return category ? category : "None";
    },
  },
  {
    accessorKey: "freeItem",
    header: "Free Item",
    cell: ({ row }) => {
      const freeItem = row.getValue("freeItem");
      return freeItem ? freeItem : "None";
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.getValue("discount");
      return `${discount}%`;
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  {
    accessorKey: "maxDiscountAmount",
    header: "Max Discount",
    cell: ({ row }) => {
      const discount = row.getValue("maxDiscountAmount");
      return `Upto  ₹${discount}`;
    },
  },
  {
    accessorKey: "minOrderValue",
    header: "Minimum Order Value",
    cell: ({ row }) => {
      const minOrderValue = row.getValue("minOrderValue");
      return `₹${minOrderValue}`;
    },
  },
  {
    accessorKey: "usage",
    header: "Usage",
  },
];
