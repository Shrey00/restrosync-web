import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import AddMenuItemModal from "@/components/add-menu-modal";
import { MenuItemFormData } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
const Action = ({ row }: { row: any }) => {
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
  const handleEditModal = () => {
    setFormData(row.original);
    setOpenEditModal(true);
  };
  const handleDeleteDialog = () => {
    setOpenWarningModal(true);
  };
  return (
    <div className="flex items-center">
      <DropdownMenu modal={false}>
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
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
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
            <AlertDialogCancel onClick={() => setOpenWarningModal(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Action;
