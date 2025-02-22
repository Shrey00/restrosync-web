import OrderItemCard from "@/components/OrderItemCard";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "@/context/context";
import { Skeleton } from "./ui/skeleton";
const OrderItems = ({ orderId }: { orderId: string }) => {
  const { user } = useContext(UserContext);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/order-items?orderId=${orderId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const responseData = await response.json();
      setOrderItems(responseData);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      {loading ? (
        <Skeleton className="h-[65px] w-[785px] mt-4" />
      ) : (
        <div>
          {orderItems?.map((item) => (
            <OrderItemCard orderItem={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderItems;
