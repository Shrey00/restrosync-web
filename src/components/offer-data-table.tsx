"use client";
import { columns } from "@/components/offer-columns";
import { UserContext } from "@/context/context";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ExpandedState,
  useReactTable,
  getPaginationRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

import { useState, useContext } from "react";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
const OffersDataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  //define the expanded state
  const [expanded, setExpanded] = useState<ExpandedState>({});
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
  return (
    <div>
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
          {table.getRowModel().rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.getVisibleCells().map((cell, cellIndex) => {
                return (
                  <TableHead key={cellIndex} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
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
};

export default OffersDataTable;
