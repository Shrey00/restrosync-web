"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ColumnDef,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { MoreVertical, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { MenuItem, MenuItemFormData } from "@/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddMenuItemModal from "@/components/add-menu-modal";
import { Button } from "./ui/button";
import { useState } from "react";
import { Star } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
//images, name, cuisineType,discount,Price before discountl,Price after discount,Orders,Available, Calories, Health Score, Rating

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
      const [formData, setFormData] = useState<Partial<MenuItemFormData>>({
        id: "",
        images: [],
        name: "",
        category: "",
        type: "",
        cuisineType: "",
        orders: 0,
        available: false,
        description: "",
        reviewSummary: "",
        markedPrice: 0,
        sellingPrice: 0,
        discount: 0,
        calories: 0,
        healthScore: 0,
        showHealthScore: false,
      });
      const [openEditModal, setOpenEditModal] = useState(false);
      const [openWarningModal, setOpenWarningModal] = useState(false);
      const handleEditModal = (e: React.MouseEvent<HTMLDivElement>) => {
        setFormData(row.original);
        setOpenEditModal(true);
      };
      const handleDeleteDialog = (e: React.MouseEvent<HTMLDivElement>) => {
        setOpenWarningModal(true);
      };
      return (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleEditModal}
                className="cursor-pointer"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Show Reviews
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteDialog}
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={openEditModal}>
            <AddMenuItemModal selectedElt={formData} />
          </Dialog>
          <AlertDialog open={openWarningModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  menu item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setOpenWarningModal(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
