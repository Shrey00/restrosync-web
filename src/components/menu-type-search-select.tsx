"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchSelect({
  options,
  FormControl,
  field,
  menuItemForm,
}: {
  options: {
    id: string;
    type: string;
    categories: { id: string; name: string }[];
  }[];
  FormControl: any;
  field: any;
  menuItemForm: any;
}) {
  const [open, setOpen] = React.useState(false);
  // async function handleAddNewCategory() {
  //   try {
  //     const response = await fetch("http://localhost:4000/menu/add-category", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //       body: JSON.stringify({ category: field.value, type: selectedType }),
  //     });
  //     const responseData = await response.json();
  //     if(responseData.id)
  //       setOptions([{...options[0], categories:[...options[0].categories, ]}])
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between font-normal"
            >
              {field.value
                ? options[0]?.categories.find(
                    (option) => option.id === field.value
                  )?.name
                : "Select Category"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              className="pointer-events-auto"
              placeholder="Search option..."
            />
            <CommandList>
              <CommandEmpty>Empty</CommandEmpty>
              <CommandGroup>
                {options[0]?.categories?.map((option, index) => (
                  <CommandItem
                    className="data-[disabled]:pointer-events-auto"
                    key={index}
                    value={option.name}
                    onSelect={() => {
                      // setValue(currentValue === value ? "" : currentValue);
                      menuItemForm.setValue("category", option.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === option.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              {/* <Button
                variant={"ghost"}
                onClick={handleAddNewCategory}
                className="w-full pointer-events-auto cursor-pointer"
              >
                <PlusIcon size={16} />
                Add a new Category
              </Button> */}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
