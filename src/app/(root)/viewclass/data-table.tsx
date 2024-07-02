"use client";
import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  skeletonRowCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  skeletonRowCount = 3,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-md border border-gray-300 shadow-lg overflow-hidden">
        <div className="flex items-center py-4 mx-4">
            <Skeleton className="h-10 w-96" />
          
        </div>
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-200 border-b border-gray-300 h-14">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-2 font-semibold text-gray-700"
                >
                  <Skeleton className="h-5 w-36" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="px-6 py-3 border-b border-gray-200 h-16"
                  >
                    <Skeleton className="h-5 w-[230px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 mx-5">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md w-full border border-gray-300 shadow-lg overflow-hidden">
      <div className="flex items-center py-4 mx-4 relative">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm pl-10"
        />
        <Search className="absolute left-3" size={20}/>
      </div>
      <Table className="w-full text-left border-collapse">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-gray-200 border-b border-gray-300"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 font-semibold text-gray-700"
                  >
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
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-2 border-b border-gray-200 h-16"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center border-b border-gray-200"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 mx-5">
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
