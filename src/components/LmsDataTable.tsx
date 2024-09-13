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
import { Button } from "@/components/ui/newButton";
import { Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  skeletonRowCount?: number;
  buttonComponent?: React.ReactNode;
  headingText?: string;
  searchColumn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  skeletonRowCount = 3,
  headingText,
  buttonComponent,
  searchColumn,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: { pageSize: 10 },
    },
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
      <div className="px-16">
        <div className="flex items-center justify-between py-4 px-4 ">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-80" />
        </div>
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="h-14">
              {columns.map((_, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-2 font-semibold text-gray-700 text-left "
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
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                {columns.map((_, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="px-6 py-3 border border-gray-200 h-16 text-left"
                  >
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 px-5 border border-t-0">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-16">
      <div className="flex flex-row-reverse justify-between items-center mb-6 mt-2">
        <div className="flex items-center">
          <div className="flex items-center py-4 px-4 relative w-80 h-10">
            <Input
              placeholder="Filter by student name..."
              value={
                (table.getColumn(searchColumn!)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(searchColumn!)
                  ?.setFilterValue(event.target.value)
              }
              className="pl-10 rounded border-lms-200 placeholder:text-lms-500"
              style={{ paddingTop: 0, paddingBottom: 0 }}
            />
            <Search className="absolute left-7 text-lmgSecondary" size={20} />
          </div>
          {buttonComponent}
        </div>

        <h5 className="py-4 font-bold text-xl text-lmsPrimary">
          {headingText}
        </h5>
      </div>

      <div>
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-white text-3xl"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className=" px-5 py-0  text-left border-lms-100"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-lms-50"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={` px-5 py-0 	border-b border-lms-100 text-sm h-12 text-left border-r  border-l font-medium text-lmsPrimary ${
                        cell.column.id === "name"
                          ? "text-lmsAccent font-semibold"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 px-5 py-0 text-center border-b border-lms-100 font-medium text-lmsPrimary"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end py-6">
          <span className="text-lms-600 font-medium mr-10">
            <Button
              variant={"lmsOutline"}
              // value={`Page ${
              // 	table.getState().pagination.pageIndex + 1
              // } of ${table.getPageCount()}`}
              className="w-28 disabled:text-lmsAccent disabled:border-lmsAccent rounded h-10 disabled:cursor-default disabled:border-1.5"
              disabled
            >
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </Button>
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="lmsOutline"
              size="lg"
              iconName="arrowLeft"
              className="flex items-center mr-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            <Button
              variant="lms"
              size="lg"
              iconName="arrowRight"
              iconPosition="end"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center"
            >
              Next{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
