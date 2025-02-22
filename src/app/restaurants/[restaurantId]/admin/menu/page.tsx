"use client";

import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { MenuItem } from "@/types";
import { columns } from "@/components/menu-columns";
import { DataTable } from "@/components/data-table";
import AddMenuItemModal from "@/components/add-menu-modal";
import { UserContext } from "@/context/context";
export default function MenuItemsTable() {
  const params = useParams();
  const { user } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // const handleUpdate = (id: string, updates: Partial<MenuItem>): void => {
  //   setMenuItems(
  //     menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
  //   );
  // };
  useEffect(() => {
    (async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/items`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ restaurantId: params.restaurantId }),
      });
      const parsedResponse = await response.json();
      setMenuItems(parsedResponse.data);
    })();
  }, []);

  return (
    <Card>
      <CardContent className="overflow-x-auto">
        <div className="py-6 flex items-center justify-between">
          <h2 className="text-foreground font-bold text-2xl">Menu Items</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <PlusIcon size={18} />
                Add Item
              </Button>
            </DialogTrigger>
            <AddMenuItemModal
              selectedElt={null}
              setMenuItems={setMenuItems}
              menuItems={menuItems}
            />
          </Dialog>
        </div>
        <DataTable columns={columns} data={menuItems} />
      </CardContent>
    </Card>
  );
}
