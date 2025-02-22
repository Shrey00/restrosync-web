"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/context";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ExpandedState,
  useReactTable,
  getPaginationRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MenuItem } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });
  //define the expanded state
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [subRowData, setSubRowData] = useState<any>({});
  const [subRowDataLoading, setSubRowDataLoading] = useState<any>({});
  const { user } = useContext(UserContext);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: { id: false },
      pagination,
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onExpandedChange: (newExpandedState) => {
      setExpanded(newExpandedState);
    },
    getExpandedRowModel: getExpandedRowModel(),
  });

  useEffect(() => {
    async function fetchSubRowData(key: string) {
      console.log(subRowData[key]);
      const rowData: MenuItem = table.getRowModel().rowsById[key]
        .original as MenuItem;
      setSubRowDataLoading({ ...subRowDataLoading, [key]: true });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/item/variants`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ menuItemId: rowData.id }),
      });
      const responseData = await response.json();
      if (responseData.data) {
        let addOnsLength = 0;
        let variantsLength = 0;
        responseData.data.forEach((item: MenuItem) => {
          if (item.variant === "child") ++variantsLength;
          if (item.variant === "add-ons") ++addOnsLength;
        });
        setSubRowData({
          ...subRowData,
          [key]: {
            data: responseData.data,
            variantMessage:
              variantsLength === 0
                ? "There is no variants of this menu item."
                : null,
            addOnsMessage:
              addOnsLength === 0
                ? "There is no add-ons for this menu item."
                : null,
          },
        });
      }
      //counting add-ons and variants and setting message if they aren't present.

      // Object.keys(subRowData).forEach((item, index) => {
      //   if (item === key) {
      //     if (subRowData[item]?.variant === "child") ++variantsLength;
      //     else if (subRowData[item]?.variant === "add-ons") ++addOnsLength;
      //   }
      // });
      // if (variantsLength === 0) {
      //   setSubRowData({
      //     ...subRowData,
      //     [key]: {
      //       ...subRowData[key],
      //       variantMessage: "There is no variants of this menu item.",
      //     },
      //   });
      // }

      // if (addOnsLength === 0) {
      //   setSubRowData({
      //     ...subRowData,
      //     [key]: {
      //       ...subRowData[key],
      //       addOnsMessage: "There is no add-ons for this menu item.",
      //     },
      //   });
      // }
      // setSubRowDataLoading({ ...subRowDataLoading, [key]: false });
    }
    Object.entries(expanded).map((entry) => {
      const key = entry[0];
      const value = entry[1];
      if (value) {
        let subRowLoaded = false;
        Object.keys(subRowData).forEach((item) => {
          if (item === key) {
            subRowLoaded = true;
          }
        });
        if (!subRowLoaded) fetchSubRowData(key);
      }
    });
  }, [expanded]);

  function returnRowData(key: string) {
    const rowData = table.getRowModel().rowsById[key].original;
    return rowData as MenuItem;
  }

  return (
    <div className="rounded-lg border">
      <Table className="rounded-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="p-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`${
                          cell.id === rowIndex + "_images"
                            ? "min-w-32 pl-6 pr-8"
                            : cell.id === rowIndex + "_Actions"
                            ? "min-w-22"
                            : "min-w-28 max-w-80"
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {
                  <TableRow
                    className={`transition-all ${
                      row.getIsExpanded() ? "" : "border-0"
                    }`}
                  >
                    <TableCell colSpan={columns.length} className="p-0">
                      <div
                        className={`transition-all duration-75 bg-secondary ${
                          row.getIsExpanded()
                            ? "h-100 overflow-auto px-[24px] py-[16px]"
                            : "h-0 p-0 overflow-hidden"
                        }`}
                      >
                        <div className="font-bold text-md">
                          Variants of {returnRowData(row.id).name}
                        </div>
                        {subRowDataLoading[row.id] &&
                        subRowData[row.id]?.variantMessage ? (
                          <div className="text-gray-500">
                            {subRowData[row.id]?.variantMessage}
                          </div>
                        ) : (
                          <>
                            {subRowData[row.id]?.data?.map(
                              (item: any, index: number) => {
                                if (item.variant === "child") {
                                  return (
                                    <div
                                      key={index}
                                      className="flex justify-between w-[220px] font-semibold"
                                    >
                                      <div>{item.name}</div>
                                      <div>₹{item.sellingPrice}</div>
                                    </div>
                                  );
                                }
                              }
                            )}
                          </>
                        )}
                        <div className="font-bold text-md">
                          Add-ons of {returnRowData(row.id).name}
                        </div>
                        {subRowData[row.id]?.addOnsMessage ? (
                          <div className="text-gray-500">
                            {subRowData[row.id]?.addOnsMessage}
                          </div>
                        ) : (
                          <>
                            {subRowData[row.id]?.length &&
                              subRowData[row.id]?.map(
                                (item: any, index: number) => {
                                  if (item.variant === "add-ons") {
                                    return (
                                      <div
                                        key={index}
                                        className="flex justify-between w-[220px] font-semibold"
                                      >
                                        <div>{item.name}</div>
                                        <div>₹{item.sellingPrice}</div>
                                      </div>
                                    );
                                  }
                                }
                              )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                }
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
