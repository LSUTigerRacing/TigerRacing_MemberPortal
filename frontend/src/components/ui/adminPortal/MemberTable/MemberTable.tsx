"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { SortingState, VisibilityState } from "@tanstack/react-table";

import DropdownMenuDemo from "@/components/ui/adminPortal/dropdownMenu/dropdownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Member } from "@/components/dummyData/members";

interface FilterMemberTableProps {
  members: Member[];
  onDeleteMember: (memberId: string) => void;
  onRowClick?: (rowId: string) => void;
}

export default function MemberTable({
  members,
  onDeleteMember,
  onRowClick,
}: FilterMemberTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const columns: ColumnDef<Member>[] = [
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
      cell: ({ row }) => <div className="caption-bottom">{row.getValue("system")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => null,
      cell: ({ row }) => (
        <DropdownMenuDemo member={row.original} onDeleteMember={onDeleteMember} />
      ),
    },
  ];

  const table = useReactTable({
    data: members,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
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

                  if (header.id === "actions") return <TableHead key={header.id}></TableHead>;

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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-primary/10 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => onRowClick?.(row.original.id)}
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Navigation of Pages Buttons */}
      <div className="mt-4 px-4 flex justify-center text-xl space-x-2">
        <div className="flex justify-between gap-2">
          <button
            className="border rounded p-1 hover:bg-accent hover:text-accent-foreground"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1 hover:bg-accent hover:text-accent-foreground"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <span className="flex gap-1">
              <div className="font-sora text-sm">Page</div>
              <strong className="font-sora text-sm">
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="flex items-center font-sora text-sm gap-1">
              | Go to page:
              <input
                type="number"
                min={1}
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-10"
              />
            </span>
          </div>

          <div className="text-gray-400 font-sora text-sm">
            Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
            {table.getRowCount().toLocaleString()} Rows
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="border rounded p-1 hover:bg-accent hover:text-accent-foreground"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1 hover:bg-accent hover:text-accent-foreground"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
