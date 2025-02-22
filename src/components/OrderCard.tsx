import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { OrderProps } from "@/types";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/context";
import OrderItemCard from "@/components/OrderItemCard";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectContent,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { MoreVertical } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OrderItems from "@/components/OrderItems";
import { Separator } from "./ui/separator";
const OrderCard = ({ orderInfo }: { orderInfo: OrderProps }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      if (orderStatus.length) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/update-order-status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
              orderId: orderInfo.id,
              orderStatus: orderStatus,
            }),
          }
        );
      }
    })();
  }, [orderStatus]);
  return (
    <Card className="mt-2">
      <CardContent className="p-4">
        <div className="flex justify-between w-full mr-3 items-center">
          <div className="text-left flex">
            <div>
              <div className="flex items-center gap-4">
                <p className="font-semibold text-lg">{orderInfo.orderId}</p>
                {(orderInfo.paymentStatus === "Failed" && (
                  <Badge className="bg-red-600 h-5">Failed</Badge>
                )) ||
                  (orderInfo.paymentStatus === "Failed" && (
                    <Badge className="bg-green-600 h-5">Successful</Badge>
                  )) ||
                  (orderInfo.paymentStatus === "Failed" && (
                    <Badge className="bg-yellow-500 h-5">Pending</Badge>
                  ))}
              </div>
              <p className="font-semibold text-md">
                Ordered by{" "}
                {orderInfo.customerFirstName + " " + orderInfo.customerLastName}
              </p>
              <div>{orderInfo.scheduledOrder && <Badge>Scheduled</Badge>}</div>
            </div>
            <div className="flex items-center">
              <Separator orientation="vertical" className="mx-4" />
              <Select
                onValueChange={(value) => setOrderStatus(value)}
                defaultValue={orderInfo.deliveryStatus}
              >
                <SelectTrigger className="min-w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Ready">Ready</SelectItem>
                    <SelectItem value="Picked">Picked</SelectItem>
                    <SelectItem value="Enroute">Enroute</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            {orderInfo.paymentStatus === "Failed" && (
              <Button
                variant="default"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-green-600 hover:bg-green-500"
              >
                Retry Order
              </Button>
            )}
            {(orderStatus === "Ready" ||
              orderStatus === "Preparing") && (
                <Button
                  variant="default"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-green-600 hover:bg-green-500"
                >
                  Assign Delivery Partner
                </Button>
              )}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <p>
              <span className="font-semibold text-sm">Contact : </span>{" "}
              {orderInfo.customerCountryCode + " " + orderInfo.customerContact}
            </p>
            <p>
              <span className="font-semibold text-sm">E-mail : </span>{" "}
              {orderInfo.customerEmail}
            </p>
            <p>
              <span className="font-semibold text-sm text-wrap">
                Address :{" "}
              </span>{" "}
              {orderInfo.address.address_line_1 +
                " " +
                orderInfo.address.address_line_2 +
                " " +
                orderInfo.address.city}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold text-sm">Payment Method : </span>{" "}
              {orderInfo.paymentMethod}
            </p>
            <p>
              <span className="font-semibold text-sm">Payment Status : </span>{" "}
              {orderInfo.paymentStatus}
            </p>
            <p>
              <span className="font-semibold text-sm">Total Amount : </span>{" "}
              {orderInfo.totalAmount}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold text-sm">Taxes : </span>{" "}
              {orderInfo.taxes}
            </p>
            <p>
              <span className="font-semibold text-sm">Delivery Charges : </span>{" "}
              {orderInfo.deliveryCharges}
            </p>
            <p>
              <span className="font-semibold text-sm">
                Amount (excluding other charges) :{" "}
              </span>{" "}
              {orderInfo.totalAmount -
                (orderInfo.taxes + orderInfo.deliveryCharges)}
            </p>
          </div>
        </div>
        <Accordion type="single" collapsible className="mt-3">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-primary">
              Show Order Items
            </AccordionTrigger>
            <AccordionContent>
              <OrderItems orderId={orderInfo.id} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
