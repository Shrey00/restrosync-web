"use client";
import {
  ColumnDef,
} from "@tanstack/react-table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

import {  InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { MenuItem } from "@/types";
import { Star } from "lucide-react";
import { ChevronDown } from "lucide-react";
//images, name, cuisineType,discount,Price before discountl,Price after discount,Orders,Available, Calories, Health Score, Rating
import Action from "@/components/action";
export const columns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
  id: "expand",
    cell: ({ row }) => (
      <button onClick={() => row.toggleExpanded()}>
        {<ChevronDown className={`transition-all ${row.getIsExpanded() && "rotate-[-180deg]"}`}/>}
      </button>
    ),
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      return (
        <Carousel className="w-32 h-24 mr-8">
          <CarouselContent>
            {row
              .getValue<string[]>("images")
              .map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    height={200}
                    width="auto"
                    alt={`${index + 1}`}
                    className="w-full z-10 h-full object-cover rounded-md"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "cuisineType",
    header: "Cuisine Type",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "markedPrice",
    header: "Marked Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("markedPrice"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sellingPrice"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return formatted;
    },
  },
  {
    accessorKey: "orders",
    header: "Orders",
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => {
      const cellValue = row.getValue("available");
      return cellValue === true ? "Yes" : "No";
    },
  },
  {
    accessorKey: "showHealthInfo",
    header: "Show Health Info",
    cell: ({ row }) => {
      const cellValue = row.getValue("showHealthInfo");
      return cellValue === true ? "Yes" : "No";
    },
  },
  {
    accessorKey: "healthScore",
    header: "Health Score",
    cell: ({ row }) => {
      if (row.getValue("healthScore")) {
        const cellValue = parseFloat(row.getValue("healthScore")).toFixed(1);
        return `${cellValue}/100`;
      }
      return <span className="text-gray-400">NA</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const cellValue: string = row.getValue("description");
      return (
        <div className="flex items-center gap-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon size={16} className="flex-shrink-0" />
              </TooltipTrigger>
              <TooltipContent className="max-w-80">
                <p>{cellValue}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="truncate mb-1">{cellValue}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const cellValue: string = row.getValue("rating");
      return cellValue ? (
        <div className="flex gap-2">
          <Star strokeWidth={3} color="#FBE201" />
          <span>{cellValue}</span>
        </div>
      ) : (
        <span className="text-gray-400">NA</span>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return <Action row={row}/> 
    },
  },
];
