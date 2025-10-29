"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { SortingState, VisibilityState } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import DropdownMenuDemo from "@/components/ui/adminPortal/dropdownMenu/dropdownMenu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { data, type Member } from "@/components/dummyData/members";

interface FilterMemberTableProps {
  members: Member[];
}

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center text-xl">Name</div>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center text-xl">Email</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "year",
    header: () => <div className="text-center text-xl">Class</div>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("year")}</div>,
  },
  {
    accessorKey: "grad",
    header: () => <div className="text-center text-xl">Grad Year</div>,
    cell: ({ row }) => <div className="uppercase">{row.getValue("grad")}</div>,
  },
  {
    accessorKey: "system",
    header: () => <div className="text-center text-xl">System</div>,
    cell: ({ row }) => (
      <div className="caption-bottom">{row.getValue("system")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => null,
    cell: ({ row }) => {
      const members = row.original;

      return (
        <>
          {/* Dropdown Menu */}
            <DropdownMenuDemo 
              onModerate={() => navigator.clipboard.writeText(members.id)}/>
        </>
      );
    },
  },
];

function MemberTable( {members}: FilterMemberTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: members,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full py-4">
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const headerContent = flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );

                  if (header.id === "actions") {
                    return <TableHead key={header.id}></TableHead>;
                  }

                  return (
                    <TableHead key={header.id} className="px-3 text-center text-xl">
                      {header.isPlaceholder || !headerContent ? null : (
                        <div className="inline-block rounded-full text-primary px-4 py-1.5 font-manrope font-semibold text-lg">
                          {headerContent}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-primary/10 hover:bg-accent hover:text-accent-foreground"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-center text-lg">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 px-4 flex justify-between items-center text-xl space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <div className="text-muted-foreground flex text-center text-sm">
          1 of 10 row(s) shown.
        </div>

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

export default MemberTable;
