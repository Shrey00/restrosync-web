"use client";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/context";
import { useParams } from "next/navigation";
import OffersDataTable from "@/components/offer-data-table";
import { columns } from "@/components/offer-columns";
import { Button } from "@/components/ui/button";
import CreateOfferModal from "@/components/create-offer-modal";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
const offers = () => {
  const params = useParams();
  const [offersData, setOffersData] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/offers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ id: params.restaurantId }),
        }
      );
      const data = await response.json();
      console.log(data);
      setOffersData(data);
    })();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-foreground font-bold text-2xl">
          Offers and Discounts
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Offer</Button>
          </DialogTrigger>
          <CreateOfferModal />
        </Dialog>
      </div>
      <h3 className="text-xl font-semibold mt-3">Active Offers</h3>
      <OffersDataTable columns={columns} data={offersData} />
    </div>
  );
};

export default offers;
