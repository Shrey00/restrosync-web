"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import OrderCard from "@/components/OrderCard";
import { OrderProps } from "@/types";
import { UserContext } from "@/context/context";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectGroup,
  SelectContent,
} from "@/components/ui/select";
const Orders = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const searchRef = useRef(null);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  async function getOrderData(search: string) {
    setOrdersLoading(true);
    let query = "";
    if (search.length) {
      if (query.length) query += "&";
      query += `search=${search}`;
    }
    if (orderStatusFilter.length) {
      if (query.length) query += "&";
      query += `orderStatus=${orderStatusFilter}`;
    }
    if (paymentStatusFilter.length) {
      if (query.length) query += "&";
      query += `paymentStatus=${paymentStatusFilter}`;
    }
    if (paymentMethodFilter.length) {
      if (query.length) query += "&";
      query += `paymentMethod=${paymentMethodFilter}`;
    }
    console.log(query)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/restaurant-orders?${query}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ restaurantId: params.restaurantId }),
      }
    );
    const data = await response.json();
    setOrders(data);
    setOrdersLoading(false);
  }
  useEffect(() => {
    getOrderData("");
  }, [orderStatusFilter, paymentMethodFilter, paymentStatusFilter]);
  const debounce = useDebounce(getOrderData, 300);
  return (
    <div>
      {/* <Card>
        <CardContent className="overflow-x-auto"> */}
      <div className="py-6 flex items-center justify-between">
        <h2 className="text-foreground font-bold text-2xl">Orders</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <PlusIcon size={18} />
              Create Order
            </Button>
          </DialogTrigger>
          {/* // <AddMenuItemModal selectedElt={null} /> */}
        </Dialog>
      </div>
      <div className="flex gap-4 mb-6">
        <Input
          ref={searchRef}
          className="w-80"
          placeholder="Search by Name or Order Id"
          onChange={(e) => debounce(e.target.value)}
        />
        <Select
          onValueChange={(value: string) => setOrderStatusFilter(value)}
          value={orderStatusFilter}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Order Status" />
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
        <Select
          onValueChange={(value: string) => setPaymentStatusFilter(value)}
          value={paymentStatusFilter}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Created">Created</SelectItem>
              <SelectItem value="Authorised">Authorised</SelectItem>
              <SelectItem value="Captured">Captured</SelectItem>
              <SelectItem value="Captured">Refunded</SelectItem>
              <SelectItem value="Captured">Failed</SelectItem>
              <SelectItem value="Captured">Pending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) => setPaymentMethodFilter(value)}
          value={paymentMethodFilter}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="COD">COD</SelectItem>
              <SelectItem value="Debit Card">Debit Card</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Net Banking">Net Banking</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="secondary"
          onClick={() => {
            setOrderStatusFilter("");
            setPaymentMethodFilter("");
            setPaymentStatusFilter("");
          }}
        >
          Clear
        </Button>
      </div>
      {ordersLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-[190px] rounded-[8px]" />
          <Skeleton className="h-[190px] rounded-[8px]" />
          <Skeleton className="h-[190px] rounded-[8px]" />
        </div>
      ) : (
        <div>
          {orders?.map((item: any, index) => (
            <OrderCard key={index} orderInfo={item} />
          ))}
        </div>
      )}
      {/* </CardContent>
      </Card> */}
    </div>
  );
};
export default Orders;
