import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Combobox } from "./ui/combo-box";
import { useParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/context";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@radix-ui/react-popover";
import { MenuItem } from "@/types";

const CreateOfferModal = () => {
  const params = useParams();
  const [offerOn, setOfferOn] = useState(0);
  const [freeItem, setFreeItem] = useState(1);
  const [image, setImage] = useState<File | null>(null);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>({});
  const [selectedFreeItem, setSelectedFreeItem] = useState<any>({});
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<any>({});
  const { user } = useContext(UserContext);
  const offerFormSchema = z.object({
    offerName: z.string(),
    discount: z.coerce.number(),
    freeItem: z.string().nullable().optional(),
    customerId: z.string().uuid().nullable().optional(),
    startTime: z.date(),
    endTime: z.date(),
    maxDiscountAmount: z.coerce.number(),
    minOrderValue: z.coerce.number(),
    maxUsage: z.coerce.number(),  
    couponCode: z.string().max(16),
    category: z.coerce.number().nullable().optional(),
    item: z.string().nullable().optional(),
    restaurantId: z.string().uuid(),
  });
  const offerForm = useForm<z.infer<typeof offerFormSchema>>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      offerName: "",
      discount: 0,
      freeItem: null,
      startTime: new Date(0),
      endTime: new Date(0),
      maxDiscountAmount: 0,
      minOrderValue: 0,
      maxUsage: 0,
      couponCode: "",
      category: null,
      item: null,
      restaurantId: params.restaurantId as string,
    },
  });
  async function onSubmit(values: { [key: string]: any }) {
    console.log(values)
    const formData : any = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append("image",  image);
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurants/offers/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      }
    );
  }
  const watchCouponCode = offerForm.watch("couponCode");
  const watchStartTime = offerForm.watch("startTime");
  const watchEndTime = offerForm.watch("endTime");
  useEffect(() => {
    offerForm.setValue(
      "freeItem",
      selectedFreeItem.id ? selectedFreeItem.id : null
    );
  }, [selectedFreeItem]);
  useEffect(() => {
    offerForm.setValue(
      "item",
      selectedMenuItem.id ? selectedMenuItem.id : null
    );
    offerForm.setValue(
      "category",
      selectedCategoryItem.id ? selectedCategoryItem.id : null
    );
  }, [selectedMenuItem, selectedCategoryItem]);
  useEffect(() => {
    offerForm.setValue("couponCode", watchCouponCode.toUpperCase());
  }, [watchCouponCode]);
  useEffect(() => {
    (async () => {
      if (offerOn === 0 || freeItem === 1) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/menu/items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ restaurantId: params.restaurantId }),
          }
        );
        const data = await response.json();
        setMenuData(data.data);
      }
      if (offerOn === 1) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/menu/get-menu-categories`
        );
        const data = await response.json();
        let categoriesData: any[] = [];
        data.data.forEach((item: any) => {
          categoriesData = [...categoriesData, ...item.categories];
        });
        setCategoryData(categoriesData);
      }
    })();
  }, [offerOn, freeItem]);
  return (
    <DialogContent className="max-w-3xl h-[80vh] overflow-auto content-between">
      <DialogHeader>
        <DialogTitle>Create an Offer</DialogTitle>
      </DialogHeader>
      <div>
        <Form {...offerForm}>
          <form
            onSubmit={offerForm.handleSubmit(onSubmit)}
            className="flex flex-col justify-between gap-8"
          >
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <FormField
                  name="offerName"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Offer Name</FormLabel>
                      <Input {...field}></Input>
                    </FormItem>
                  )}
                />
                <FormField
                  name="discount"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Discount</FormLabel>
                      <Input type="number" {...field} />
                    </FormItem>
                  )}
                />

                <FormItem className="w-full">
                  <FormLabel>Image (used in banner)</FormLabel>
                  <Input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setImage(e.target.files ? e.target.files[0] : null)}/>
                </FormItem>
              </div>
              <div className="flex gap-4">
                <FormField
                  name="startTime"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Popover>
                        <div className="flex flex-col space-y-2">
                          <FormLabel>Start Date</FormLabel>{" "}
                          <PopoverTrigger asChild>
                            <Button variant={"outline"} className="text-center">
                              {watchStartTime
                                ? watchStartTime.toLocaleDateString()
                                : "Pick Start Date"}
                            </Button>
                          </PopoverTrigger>
                        </div>
                        <PopoverContent className="w-auto p-0 bg-background">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  name="endTime"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Popover>
                        <div className="flex flex-col space-y-2">
                          <FormLabel>End Date</FormLabel>{" "}
                          <PopoverTrigger asChild>
                            <Button variant={"outline"}>
                              {watchEndTime
                                ? watchEndTime.toLocaleDateString()
                                : "Pick End Date"}
                            </Button>
                          </PopoverTrigger>
                        </div>
                        <PopoverContent className="w-auto p-0 bg-background">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  name="maxDiscountAmount"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Max Discount Amount (in INR)</FormLabel>
                      <Input type="number" {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  name="minOrderValue"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Minimum Order Value (in INR)</FormLabel>
                      <Input type="number" {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  name="maxUsage"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Max number of usage</FormLabel>
                      <Input type="number" {...field} />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  name="couponCode"
                  control={offerForm.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Coupon Code (Max 16 characters)</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <Label>Offer Applied On</Label>
                  <div className="flex gap-8 mt-2">
                    <div className="flex flex-col gap-3 w-24">
                      <div className="flex justify-between">
                        <Label>Item</Label>
                        <Input
                          id="item"
                          className="w-4 h-4"
                          name="offer_on"
                          type="radio"
                          value={offerOn}
                          checked={offerOn === 0}
                          onChange={() => setOfferOn(0)}
                        />
                      </div>
                      <div className="flex justify-between">
                        <Label>Category</Label>
                        <Input
                          className="w-4 h-4"
                          name="offer_on"
                          type="radio"
                          value={offerOn}
                          checked={offerOn === 1}
                          onChange={() => setOfferOn(1)}
                        />
                      </div>
                    </div>
                    <div>
                      {offerOn === 0 && (
                        <Combobox
                          value={selectedMenuItem}
                          setValue={setSelectedMenuItem}
                          data={menuData}
                        />
                      )}
                      {offerOn === 1 && (
                        <Combobox
                          value={selectedCategoryItem}
                          setValue={setSelectedCategoryItem}
                          data={categoryData}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Add Free Item</Label>
                  <div className="flex gap-8 mt-2">
                    <div className="flex flex-col gap-3 w-24">
                      <div className="flex justify-between">
                        <Label>Yes</Label>
                        <Input
                          id="item"
                          className="w-4 h-4"
                          name="free_item"
                          type="radio"
                          value={freeItem}
                          checked={freeItem === 0}
                          onChange={() => setFreeItem(0)}
                        />
                      </div>
                      <div className="flex justify-between">
                        <Label>No</Label>
                        <Input
                          className="w-4 h-4"
                          name="free_item"
                          type="radio"
                          value={freeItem}
                          checked={freeItem === 1}
                          onChange={() => setFreeItem(1)}
                        />
                      </div>
                    </div>
                    <div>
                      {freeItem === 0 && (
                        <Combobox
                          value={selectedFreeItem}
                          setValue={setSelectedFreeItem}
                          data={menuData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full" type="submit">
              Create Offer
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default CreateOfferModal;
