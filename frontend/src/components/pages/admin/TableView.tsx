"use client";

import {
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "lucide-react";
import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
    type VisibilityState
} from "@tanstack/react-table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink
} from "@/components/ui/pagination";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

import UserDropdown from "@/components/pages/admin/UserDropdown";

import type { API } from "@/lib/API";

import type { TRAPI } from "../../../../../shared/typings/api";

interface FilterMemberTableProps {
    users: Awaited<ReturnType<API["fetchUsers"]>>["data"]
    deleteUser: (userId: string) => void
    onRowClick?: (rowId: string) => void
}

export default function TableView ({
    users,
    deleteUser,
    onRowClick
}: FilterMemberTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 8
    });

    const columns: ColumnDef<TRAPI.User>[] = [
        {
            accessorKey: "name",
            header: () => <div className="text-center text-xl">Name</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>
        },
        {
            accessorKey: "email",
            header: () => <div className="text-center text-xl">Email</div>,
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>
        },
        {
            accessorKey: "year",
            header: () => <div className="text-center text-xl">Class</div>,
            cell: ({ row }) => <div className="capitalize">{row.getValue("year")}</div>
        },
        {
            accessorKey: "grad",
            header: () => <div className="text-center text-xl">Grad Year</div>,
            cell: ({ row }) => <div className="uppercase">{row.getValue("grad")}</div>
        },
        {
            accessorKey: "system",
            header: () => <div className="text-center text-xl">System</div>,
            cell: ({ row }) => <div className="caption-bottom">{row.getValue("system")}</div>
        },
        {
            id: "actions",
            enableHiding: false,
            header: () => null,
            cell: ({ row }) => (
                <UserDropdown user={row.original} deleteUser={deleteUser} />
            )
        }
    ];

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: users,
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
        manualPagination: false
    });

    return (
        <div className="bg-background w-full my-4 py-4 rounded-xl">
            <div className="overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent!">
                                {headerGroup.headers.map(header => {
                                    const headerContent = flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    );

                                    if (header.id === "actions") return <TableHead key={header.id}></TableHead>;

                                    return (
                                        <TableHead key={header.id} className="px-3 text-center text-xl">
                                            {header.isPlaceholder || !headerContent
                                                ? null
                                                : (
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
                        {table.getRowModel().rows.length
                            ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="border-b border-primary/10 hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => onRowClick?.(row.id)}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} className="py-4 text-center text-lg">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )
                            : (
                                <TableRow className="hover:bg-background">
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>

            {/* Navigation of Pages Buttons */}
            {table.getRowModel().rows.length > 0 && (
                <>
                    <hr className="mb-4" />
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <PaginationLink onClick={() => table.firstPage()} className={!table.getCanPreviousPage() ? "pointer-events-none text-muted-foreground" : ""}>
                                            <ChevronFirstIcon className="w-4 h-4" />
                                        </PaginationLink>
                                    </TooltipTrigger>
                                    <TooltipContent className={!table.getCanPreviousPage() ? "hidden" : ""}>First</TooltipContent>
                                </Tooltip>
                            </PaginationItem>
                            <PaginationItem>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <PaginationLink onClick={() => table.previousPage()} className={!table.getCanPreviousPage() ? "pointer-events-none text-muted-foreground" : ""}>
                                            <ChevronLeftIcon className="w-4 h-4" />
                                        </PaginationLink>
                                    </TooltipTrigger>
                                    <TooltipContent className={!table.getCanPreviousPage() ? "hidden" : ""}>Previous</TooltipContent>
                                </Tooltip>
                            </PaginationItem>
                            <PaginationItem>
                                <Select defaultValue={String(0)} aria-label="Select page" value={table.getState().pagination.pageIndex.toString()} onValueChange={i => table.setPageIndex(parseInt(i))}>
                                    <SelectTrigger id="select-page" className="w-fit whitespace-nowrap cursor-pointer" aria-label="Select page">
                                        <SelectValue placeholder="Select page" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: table.getPageCount() }).map((_, i) => (
                                            <SelectItem key={i} value={i.toString()}>
                                                Page {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </PaginationItem>
                            <PaginationItem>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <PaginationLink onClick={() => table.nextPage()} className={!table.getCanNextPage() ? "pointer-events-none text-muted-foreground" : ""}>
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </PaginationLink>
                                    </TooltipTrigger>
                                    <TooltipContent className={!table.getCanNextPage() ? "hidden" : ""}>Next</TooltipContent>
                                </Tooltip>
                            </PaginationItem>
                            <PaginationItem>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <PaginationLink onClick={() => table.lastPage()} className={!table.getCanNextPage() ? "pointer-events-none text-muted-foreground" : ""}>
                                            <ChevronLastIcon className="w-4 h-4" />
                                        </PaginationLink>
                                    </TooltipTrigger>
                                    <TooltipContent className={!table.getCanNextPage() ? "hidden" : ""}>Last</TooltipContent>
                                </Tooltip>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </div>
    );
}
