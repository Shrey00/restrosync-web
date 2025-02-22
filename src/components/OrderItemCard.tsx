import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectContent,
} from "@/components/ui/select";
import { UserContext } from "@/context/context";
import { useState, useEffect, useContext } from "react";
const OrderItemCard = ({ orderItem }: { orderItem: any }) => {
  const [orderItemStatus, setOrderItemStatus] = useState<{
    orderItemId: string;
    status: "Pending" | "Ready" | "Cancelled";
  }>();
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      if (orderItemStatus) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/order-item/set-status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify(orderItemStatus),
          }
        );
      }
    })();
  }, [orderItemStatus]);

  return (
    <div>
      <div className="flex items-center justify-between w-[50%] gap-4">
        <Carousel className="w-32 h-24 ml-8">
          <CarouselContent>
            {orderItem?.images.map((image: string, index: number) => (
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
        <div className="ml-6 text-md font-semibold">{orderItem.name}</div>
        <div>
          <span className="font-semibold">₹{orderItem.amount}</span>
          {orderItem?.addOns?.length > 0 && (
            <span className="text-sm"> (including add-ons)</span>
          )}
        </div>
        <div className="flex gap-8">
          <Select
            onValueChange={(value: "Pending" | "Ready" | "Cancelled") =>
              setOrderItemStatus({ orderItemId: orderItem.id, status: value })
            }
            defaultValue={orderItem.status}
          >
            <SelectTrigger className="min-w-32">
              <SelectValue placeholder="Set Status" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectGroup>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {orderItem?.addOns?.length > 0 && (
        <div className="pl-6">
          <p className="font-semibold text-md">Add-ons</p>
          <div>
            {orderItem?.addOns.map((item: any, index: number) => (
              <ul className="list-none" key={index}>
                <li className="flex gap-4">
                  <div className="font-medium">{item.name}</div>
                  <div>₹{item.sellingPrice}</div>
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItemCard;
