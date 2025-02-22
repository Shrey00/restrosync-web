"use client";
import {
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
  useContext,
  MouseEventHandler,
} from "react";
``;
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { ChevronsLeftRightEllipsis, Coins, PlusIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useParams } from "next/navigation";
import { UserContext } from "@/context/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { MenuItem, MenuItemFormData } from "@/types";
import SearchSelect from "./menu-type-search-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { features } from "process";
import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGES = 4;

function RestaurantForm({
  formData,
  editing,
}: {
  formData: Partial<MenuItemFormData>;
  editing?: boolean;
}) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [editItems, setEditItems] = useState<any | null>({ ...formData });
  const { user } = useContext(UserContext);
  const params = useParams();
  const [variantFormState, setVariantFormState] = useState<any>({});
  const menuItemFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    contact: z.string(),
    countryCode: z.string(),
    images: z.array(z.instanceof(File)),
    available: z.boolean(),
    description: z.string(),
    logo: z.string(),
    type: z.string(),
    acceptingOrders: z.coerce.number(),
    address: z.string(),
    autoCalculateSellingPrice: z.string(),
    rating: z.coerce.number(),
    nextOpeningTime: z.string(),
    nextClosingTime: z.string(),
  });

  // - ITEM 1 - MAIN
  // CHILD ITEMS - also menuItems
  // ITEM MASTER ITEM - in the back keep the copy
  // In the front of it
  // 1. Define your form.
  const menuItemForm = useForm<z.infer<typeof menuItemFormSchema>>({
    resolver: zodResolver(menuItemFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      countryCode: "",
      images: [],
      description: "",
      logo: "",
      type: "",
      acceptingOrders: 0,
      address: "",
      autoCalculateSellingPrice: "",
      rating: 0,
      nextOpeningTime: "",
      nextClosingTime: "",
    },
  });

  const watchTypeSelection = menuItemForm.watch("type");
  const watchShowHealthInfo = menuItemForm.watch("showHealthInfo");
  const watchVariants = menuItemForm.watch("variants");
  const watchMarkedPrice = menuItemForm.watch("markedPrice");
  const watchSellingPrice = menuItemForm.watch("sellingPrice");
  const watchDiscount = menuItemForm.watch("discount");
  const watchAutoCalculateSellingPrice = menuItemForm.watch(
    "autoCalculateSellingPrice"
  );
  const watchImages = menuItemForm.watch("images"); 
  const [menuItemTypeOptions, setMenuItemTypeOptions] = useState([]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [categoriesUnderSelectedType, setCategoriesUnderSelectedType] =
    useState([]);
  useEffect(() => {
    (async () => {
      const fetchTypesAndCategories = await fetch(
        "http://localhost:4000/menu/get-menu-categories",
        {
          method: "GET",
        }
      );
      const menuItemsTypeData = await fetchTypesAndCategories.json();
      const selectedCategories = menuItemsTypeData.data?.filter(
        (
          item: { id: any; type: string; categories: string[] },
          index: number
        ) => item.id == menuItemForm.getValues("type")
      );
      setCategoriesUnderSelectedType(selectedCategories);
    })();
  }, [watchTypeSelection]);
  console.log(variantFormState);
  useEffect(() => {
    if (
      watchAutoCalculateSellingPrice === "true" &&
      watchMarkedPrice &&
      watchDiscount
    ) {
      const discountedPrice =
        watchMarkedPrice - watchMarkedPrice * (watchDiscount / 100);
      menuItemForm.setValue("sellingPrice", Number(discountedPrice.toFixed(2)));
    }
  }, [watchDiscount, watchMarkedPrice]);

  async function onSubmit(values: { [key: string]: any }) {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key: string) => {
        if (key !== "images") {
          formData.append(key, values[key]);
        }
      });
      values.images.forEach((image: File, index: number) => {
        formData.append("images", image);
      });
      formData.append("restaurantId", params.restaurantId as string);
      const response = await fetch("http://localhost:4000/menu/add-item", {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });
      const responseMenuData = await response.json();

      if (watchVariants === "parent") {
        const variantFormData: any = [];
        const variants = [];
        for (const variantKey in variantFormState) {
          let createVariantFormData: any = {};
          formData.forEach((value, variantFormDataKey) => {
            if (variantFormDataKey === "name")
              createVariantFormData["name"] = variantFormState[variantKey];
            else if (variantFormDataKey === "variant")
              createVariantFormData["variant"] = "child";
            else createVariantFormData[variantFormDataKey] = value;
            console.log(createVariantFormData);
            console.log("THIS IS IT");
            console.log(responseMenuData);
            createVariantFormData["mainItemId"] = responseMenuData.data[0].id;
          });
          variantFormData.push(createVariantFormData);
        }
        const variantResponse = await fetch(
          "http://localhost:4000/menu/item/add-variants",
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify(variantFormData),
          }
        );
      }

      if (menuItems) setMenuItems([...menuItems, responseMenuData.data[0]]);
    } catch (e) {
      console.log(e);
    }
  }
  //DROPZONE FILE HANDLING
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) =>
          file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
      if (validFiles.length + previewImages.length > MAX_IMAGES) {
        toast({
          title: "Too many images",
          description: `You can only upload up to ${MAX_IMAGES} images.`,
          variant: "destructive",
        });
        return;
      }
      menuItemForm.setValue("images", [...(watchImages || []), ...validFiles]);
      setPreviewImages((prev) => [
        ...prev,
        ...validFiles.map((file) => URL.createObjectURL(file)),
      ]);
    },
    [previewImages, watchImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".png", ".webp"],
    },
    maxSize: MAX_FILE_SIZE,
  });

  function handleVariantDelete(e: any, key: string) {
    setVariantFormState((prev: any) => {
      // const copyPrev = [...prev];
      const copyPrev = { ...prev };
      delete copyPrev[key];
      return copyPrev;
    });
  }
  function handleVariantForm(e: any) {
    setVariantFormState({
      ...variantFormState,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Form {...menuItemForm}>
      <form
        onSubmit={menuItemForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <p className="font-bold text-sm p-1 border-b-[1px] border-border">
          Food Item Details
        </p>
        <FormField
          control={menuItemForm.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Card className="col-span-full">
                  <CardContent className="pt-6">
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                    >
                      <input onChange={field.onChange} {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        (Only *.jpeg, *.png, and *.webp images will be accepted,
                        up to 5MB each)
                      </p>
                    </div>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        previewImages.length && "mt-4"
                      }`}
                    >
                      {previewImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                              menuItemForm.setValue(
                                "images",
                                menuItemForm
                                  .watch("images")
                                  .filter((_, i) => i !== index)
                              );
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={menuItemForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name of menu item" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuItemForm.control}
            name="cuisineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisine Type</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Cuisine Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Veg</SelectItem>
                      <SelectItem value="non-veg">Non-veg</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuItemForm.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    // onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Appetizers</SelectItem>
                      <SelectItem value="2">Main Course</SelectItem>
                      <SelectItem value="3">Sides</SelectItem>
                      <SelectItem value="4">Desserts</SelectItem>
                      <SelectItem value="5">Beverages</SelectItem>
                      <SelectItem value="6">Salads</SelectItem>
                      <SelectItem value="7">Soups</SelectItem>
                      <SelectItem value="8">Breakfast</SelectItem>
                      <SelectItem value="9">Brunch</SelectItem>
                      <SelectItem value="10">Snacks</SelectItem>
                      <SelectItem value="11">Specials</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuItemForm.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <SearchSelect
                    selectedType={parseInt(menuItemForm.getValues("type"))}
                    options={categoriesUnderSelectedType}
                    FormControl={FormControl}
                    field={field}
                    menuItemForm={menuItemForm}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuItemForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <p className="font-bold p-1 text-sm border-b-[1px] border-border">
          Food Health Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={menuItemForm.control}
            name="showHealthInfo"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel>Show Health Info</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={"true"} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={"false"} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuItemForm.control}
            name="healthScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health Score</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={watchShowHealthInfo === "true" ? false : true}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Score between 1 to 100</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuItemForm.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={watchShowHealthInfo === "true" ? false : true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="font-bold p-1 text-sm border-b-[1px] border-border">
          Variants
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <FormField
              control={menuItemForm.control}
              name="variants"
              render={({ field }) => (
                <FormItem className="col-start-1 col-end-3">
                  <FormLabel>
                    Insert variants of this menu item?{" "}
                    <i className="text-gray-400-">(e.g small, medium, large)</i>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"parent"} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Yes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"none"} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchVariants === "parent" && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setVariantFormState({
                    ...variantFormState,
                    [`variantName${Object.keys(variantFormState).length}`]: "",
                  });
                }}
                className="pt-[4px] pb-[4px] pl-[6px] pr-[6px] text-xs"
              >
                <PlusIcon size={16} />
                Add Variant
              </Button>
            )}
          </div>
          <div>
            {watchVariants === "parent" &&
              Object.keys(variantFormState).map((item, index) => {
                return (
                  <div className="flex gap-4 items-start">
                    <Accordion
                      key={index}
                      type="single"
                      collapsible
                      className="w-full"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          Variant - {index + 1}
                        </AccordionTrigger>
                        <AccordionContent>
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                className="w-[60%]"
                                type="text"
                                name={`variantName${index}`}
                                value={variantFormState[`variantName${index}`]}
                                onChange={handleVariantForm}
                              />
                            </FormControl>
                            <FormDescription>
                              Please add full name of the variant{" "}
                              <i>(e.g Veg Pizza(large))</i>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Link
                      href="#"
                      className="text-red-600 font-semibold"
                      onClick={(e) => handleVariantDelete(e, item)}
                    >
                      Delete
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <p className="font-bold p-1 text-sm border-b-[1px] border-border">
          Pricing Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={menuItemForm.control}
            name="autoCalculateSellingPrice"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel>
                  Auto-Calculate Selling Price from Discount
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={"true"} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={"false"} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuItemForm.control}
            name="markedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marked Price</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={menuItemForm.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={menuItemForm.control}
            name="sellingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selling Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={
                      watchAutoCalculateSellingPrice === "true" ? true : false
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

const AddMenuItemModal = ({
  selectedElt,
  menuItems,
  setMenuItems,
}: {
  selectedElt?: any;
  menuItems?: MenuItem[];
  setMenuItems?: any;
}) => {
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
    markedPrice: 0,
    sellingPrice: 0,
    discount: 0,
    calories: 0,
    healthScore: 0,
    showHealthScore: false,
    variant: "none",
  });
  useEffect(() => {
    if (selectedElt) {
      setFormData(selectedElt);
    }
  }, [selectedElt]);

  const handleChange = (e: ChangeEvent) => {};
  return (
    <DialogContent className="h-[70vh] max-w-xl overflow-auto">
      <DialogHeader>
        <DialogTitle>
          {selectedElt ? "Edit restaurant details" : "Create a new restaurant"}
        </DialogTitle>
        <DialogDescription>
          {selectedElt
            ? "Edit a menu item by changing the values."
            : "Create a new restaurant"}
        </DialogDescription>
      </DialogHeader>
      <RestaurantForm
        formData={formData}
        editing={selectedElt ? true : false}
      />
    </DialogContent>
  );
};

export default AddMenuItemModal;
