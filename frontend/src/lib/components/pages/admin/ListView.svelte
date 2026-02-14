<script lang="ts">

    import {
        ChevronFirstIcon,
        ChevronLastIcon,
        ChevronLeftIcon,
        ChevronRightIcon
    } from "@lucide/svelte";
    import {
        getCoreRowModel,
        getFilteredRowModel,
        getPaginationRowModel,
        getSortedRowModel,
        type ColumnDef,
        type ColumnFiltersState,
        type PaginationState,
        type SortingState,
        type VisibilityState
    } from "@tanstack/table-core";
    import { createRawSnippet } from "svelte";

    import {
        FlexRender,
        createSvelteTable,
        renderComponent,
        renderSnippet
    } from "$lib/components/ui/data-table";
    import {
        Pagination,
        PaginationContent,
        PaginationItem,
        PaginationLink
    } from "$lib/components/ui/pagination";
    import {
        Select,
        SelectTrigger,
        SelectContent,
        SelectItem
    } from "$lib/components/ui/select";
    import {
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow
    } from "$lib/components/ui/table";
    import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";

    import type { Unpacked } from "$lib/utils";

    import UserDropdown from "./UserDropdown.svelte";
    import { type AdminProps } from "./types";

    let { activeUser = $bindable(), users }: Pick<AdminProps, "activeUser" | "users"> = $props();

    let sorting = $state<SortingState>([]);
    let columnFilters = $state<ColumnFiltersState>([]);
    let columnVisibility = $state<VisibilityState>({});
    let rowSelection = $state({});
    let pagination = $state<PaginationState>({
        pageIndex: 0,
        pageSize: 8
    });

    const columns: ColumnDef<Unpacked<typeof users>>[] = [
        {
            accessorKey: "name",
            header: () => renderSnippet(createRawSnippet(() => ({ render: () => "<div class=\"text-center text-xl\">Name</div>" }))),
            cell: ({ row }) => renderSnippet(createRawSnippet(() => ({ render: () => `<div class="capitalize">${row.getValue("name")}</div>` })))
        },
        {
            accessorKey: "email",
            header: () => renderSnippet(createRawSnippet(() => ({ render: () => "<div class=\"text-center text-xl\">Email</div>" }))),
            cell: ({ row }) => renderSnippet(createRawSnippet(() => ({ render: () => `<div>${row.getValue("email")}</div>` })))
        },
        {
            accessorKey: "grad",
            header: () => renderSnippet(createRawSnippet(() => ({ render: () => "<div class=\"text-center text-xl\">Grad Year</div>" }))),
            cell: ({ row }) => renderSnippet(createRawSnippet(() => ({ render: () => `<div>${row.getValue("grad")}</div>` })))
        },
        {
            accessorKey: "subsystem",
            header: () => renderSnippet(createRawSnippet(() => ({ render: () => "<div class=\"text-center text-xl\">Subsystem</div>" }))),
            cell: ({ row }) => renderSnippet(createRawSnippet(() => ({ render: () => `<div class="caption-bottom">${row.getValue("subsystem")}</div>` })))
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => renderComponent(UserDropdown, { user: row.original })
        }
    ];

    const table = createSvelteTable({
        get data () {
            return users;
        },
        columns,
        state: {
            get pagination () {
                return pagination;
            },
            get sorting () {
                return sorting;
            },
            get columnVisibility () {
                return columnVisibility;
            },
            get rowSelection () {
                return rowSelection;
            },
            get columnFilters () {
                return columnFilters;
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: updater => {
            if (typeof updater === "function") {
                pagination = updater(pagination);
            } else {
                pagination = updater;
            }
        },
        onSortingChange: updater => {
            if (typeof updater === "function") {
                sorting = updater(sorting);
            } else {
                sorting = updater;
            }
        },
        onColumnFiltersChange: updater => {
            if (typeof updater === "function") {
                columnFilters = updater(columnFilters);
            } else {
                columnFilters = updater;
            }
        },
        onColumnVisibilityChange: updater => {
            if (typeof updater === "function") {
                columnVisibility = updater(columnVisibility);
            } else {
                columnVisibility = updater;
            }
        },
        onRowSelectionChange: updater => {
            if (typeof updater === "function") {
                rowSelection = updater(rowSelection);
            } else {
                rowSelection = updater;
            }
        }
    });
</script>

<div class="bg-background w-full my-4 py-4 rounded-sm">
    <div class="overflow-hidden">
        <Table>
            <TableHeader>
                {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                    <TableRow class="hover:bg-transparent!">
                        {#each headerGroup.headers as header (header.id)}
                            {#if header.id === "actions"}
                                <TableHead />
                            {:else}
                                <TableHead class="px-3 text-center text-xl">
                                    {#if !header.isPlaceholder}
                                        <div class="inline-block rounded-full text-primary px-4 py-1.5 font-manrope font-semibold text-lg">
                                            <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                                        </div>
                                    {/if}
                                </TableHead>
                            {/if}
                        {/each}
                    </TableRow>
                {/each}
            </TableHeader>
            <TableBody>
                {#if table.getRowModel().rows.length}
                    {#each table.getRowModel().rows as row (row.id)}
                        <TableRow
                            data-state={row.getIsSelected() && "selected"}
                            class="border-b border-primary/10 hover:bg-accent hover:text-accent-foreground"
                            onclick={() => activeUser = row.id}
                        >
                            {#each row.getVisibleCells() as cell (cell.id)}
                                <TableCell class="py-4 text-center text-lg">
                                    <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                                </TableCell>
                            {/each}
                        </TableRow>
                    {/each}
                {:else}
                    <TableRow class="hover:bg-background">
                        <TableCell colspan={columns.length} class="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                {/if}
            </TableBody>
        </Table>
    </div>

    <!-- Pagination -->
    {#if table.getPageCount() > 0}
        <hr class="mb-4" />
        <Pagination count={table.getRowModel().rows.length}>
            <PaginationContent>
                <PaginationItem>
                    <Tooltip>
                        <TooltipTrigger>
                            <PaginationLink
                                page={{ type: "page", value: 0 }}
                                isActive={table.getCanPreviousPage()}
                                onclick={() => table.firstPage()}
                                class={!table.getCanPreviousPage() ? "pointer-events-none text-muted-foreground" : ""}
                            >
                                <ChevronFirstIcon class="w-4 h-4" />
                            </PaginationLink>
                        </TooltipTrigger>
                        <TooltipContent class={!table.getCanPreviousPage() ? "hidden" : ""}>First</TooltipContent>
                    </Tooltip>
                </PaginationItem>
                <PaginationItem>
                    <Tooltip>
                        <TooltipTrigger>
                            <PaginationLink
                                page={{ type: "page", value: table.getState().pagination.pageIndex - 1 }}
                                isActive={table.getCanPreviousPage()}
                                onclick={() => table.previousPage()}
                                class={!table.getCanPreviousPage() ? "pointer-events-none text-muted-foreground" : ""}
                            >
                                <ChevronLeftIcon class="w-4 h-4" />
                            </PaginationLink>
                        </TooltipTrigger>
                        <TooltipContent class={!table.getCanPreviousPage() ? "hidden" : ""}>Previous</TooltipContent>
                    </Tooltip>
                </PaginationItem>
                <PaginationItem>
                    <Select type="single" value={table.getState().pagination.pageIndex.toString()} onValueChange={i => table.setPageIndex(parseInt(i))}>
                        <SelectTrigger id="select-page" class="w-fit whitespace-nowrap cursor-pointer" aria-label="Select page">
                            {table.getState().pagination.pageIndex}
                        </SelectTrigger>
                        <SelectContent>
                            {#each { length: table.getPageCount() } as _, i (i)}
                                <SelectItem value={i.toString()}>
                                    Page {i + 1}
                                </SelectItem>
                            {/each}
                        </SelectContent>
                    </Select>
                </PaginationItem>
                <PaginationItem>
                    <Tooltip>
                        <TooltipTrigger>
                            <PaginationLink
                                page={{ type: "page", value: table.getState().pagination.pageIndex + 1 }}
                                isActive={table.getCanNextPage()}
                                onclick={() => table.nextPage()}
                                class={!table.getCanNextPage() ? "pointer-events-none text-muted-foreground" : ""}
                            >
                                <ChevronRightIcon class="w-4 h-4" />
                            </PaginationLink>
                        </TooltipTrigger>
                        <TooltipContent class={!table.getCanNextPage() ? "hidden" : ""}>Next</TooltipContent>
                    </Tooltip>
                </PaginationItem>
                <PaginationItem>
                    <Tooltip>
                        <TooltipTrigger>
                            <PaginationLink
                                page={{ type: "page", value: table.getPageCount() }}
                                isActive={table.getCanNextPage()}
                                onclick={() => table.lastPage()}
                                class={!table.getCanNextPage() ? "pointer-events-none text-muted-foreground" : ""}
                            >
                                <ChevronLastIcon class="w-4 h-4" />
                            </PaginationLink>
                        </TooltipTrigger>
                        <TooltipContent class={!table.getCanNextPage() ? "hidden" : ""}>Last</TooltipContent>
                    </Tooltip>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    {/if}
</div>
