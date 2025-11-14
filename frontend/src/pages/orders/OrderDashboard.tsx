import { Badge, Filter, Pencil, Ellipsis } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrderEntry } from "./OrderCard";
import { useLayoutEffect, useRef, useState, type ReactElement } from "react";
import { OrderAction, type DetailedOrder, type Order } from "./orders";

const TABS: Array<{ name: string, value: "self" | "others" }> = [
    {
        name: "My Orders",
        value: "self"
    },
    {
        name: "Other Orders",
        value: "others"
    }
];

export default function OrderDashboard (): ReactElement {
    // Tabs
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const [activeTab, setActiveTab] = useState("self");
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

    const [currentOrder, setCurrentOrder] = useState<DetailedOrder | undefined>(undefined);
    const [editingOrder, setEditingOrder] = useState(false);

    const [orderFilter, setOrderFilter] = useState("");
    const [page, setPage] = useState(0);

    const [isAdmin, setIsAdmin] = useState(false);
    const [orders, setOrders] = useState<Record<"self" | "others", Order[]>>({
        self: [],
        others: []
    });

    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    function orderTask<T extends Order> (order: T, action: OrderAction) {
        switch (action) {
            case OrderAction.View:
                setCurrentOrder(Object.assign({
                    supplier: "Amazon",
                    subsystem: "Controls",
                    quantity: 2,
                    unitPrice: 15.99,
                    deadline: new Date().toLocaleDateString(),
                    notes: ""
                }, order));

                setDeadlineDate(new Date());

                setOrderDetailsOpen(true);
                setEditingOrder(false);

                // void getOrderDetails(order.id).then(res => {
                //     if (res === undefined) return;
                //     setCurrentOrder(res);

                //     setOrderDetailsOpen(true);
                //     setEditingOrder(false);
                // });
                break;
            case OrderAction.Edit:
                break;
            case OrderAction.Approve:
                break;
            case OrderAction.Deny:
                break;
        }
    }

    useEffect(() => {
        (async function () {
            const res = await getOrders();
            if (!res) return;

            setIsAdmin(res.admin);
            setOrders({
                self: res.selfOrders,
                others: res.otherOrders
            });
        })();
    }, []);

    useLayoutEffect(() => {
        const activeIndex = TABS.findIndex(x => x.value === activeTab);
        const activeTabElement = tabRefs.current[activeIndex];

        if (activeTabElement) {
            const { offsetLeft, offsetWidth } = activeTabElement;

            setUnderlineStyle({
                left: offsetLeft,
                width: offsetWidth
            });
        }
    }, [activeTab]);

    return (

        <div className="xl:mt-16.75 p-8">
            <h1 className="font-manrope font-semibold text-4xl text-center mb-10">Orders</h1>
            <div>
                <Tabs defaultValue="self" value={activeTab} onValueChange={e => (setActiveTab(e), setOrderFilter(""))} className="gap-0">
                    <TabsList className="relative rounded-none border-b p-0">
                        {TABS.map((x, i) => (
                            <TabsTrigger
                                key={i}
                                value={x.value}
                                ref={el => { tabRefs.current[i] = el; }}
                                className="bg-background dark:data-[state=active]:bg-background relative z-10 rounded-none border-0 px-5 py-4 data-[state=active]:shadow-none"
                            >
                                {x.name}
                                <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums">
                                    {orders[x.value]?.length ?? <Spinner className="size-fit" />}
                                </Badge>

                            </TabsTrigger>
                        ))}

                        <motion.div
                            className="bg-primary absolute bottom-0 z-20 h-0.5"
                            layoutId="underline"
                            style={{
                                left: underlineStyle.left,
                                width: underlineStyle.width
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 40
                            }}
                        />
                    </TabsList>

                    <Card className="rounded-t-none border-0 px-6 py-8 shadow-lg">
                        <div className="flex gap-2">
                            <InputGroup>
                                <InputGroupInput placeholder="Filter by name, identifier, or requester" onChange={e => setOrderFilter(e.target.value)} value={orderFilter} />
                                <InputGroupAddon align="inline-end">
                                    <div className="flex size-4 items-center justify-center rounded-full">
                                        <Filter className="size-3" />
                                    </div>
                                </InputGroupAddon>
                            </InputGroup>
                            <Button onClick={() => setRequestFormOpen(true)}>
                                Create
                                <Pencil />
                            </Button>
                        </div>

                        <div className={filteredOrders.length ? "flex flex-col gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : ""}>
                            {filteredOrders.length
                                ? (filteredOrders.length > 40
                                    ? filteredOrders.slice(page * 40, Math.min(filteredOrders.length, 40 + page * 40))
                                    : filteredOrders
                                ).map((x, i) => <OrderEntry key={i} order={x} isAdmin={isAdmin} orderTask={orderTask} />)
                                : (
                                    <Empty className="bg-primary">
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon" className="bg-secondary">
                                                <Ellipsis />
                                            </EmptyMedia>
                                            <EmptyTitle className="text-secondary">{orderFilter ? "No Orders Found" : "No Orders"}</EmptyTitle>
                                        </EmptyHeader>
                                    </Empty>
                                )
                            }
                        </div>
                        {(filteredOrders.length > 40) && (
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => setPage(page === 0 ? 0 : page - 1)} />
                                    </PaginationItem>
                                    {Array.from({ length: Math.floor(filteredOrders.length / 40) }).map((_, i) => (
                                        <PaginationItem>
                                            <PaginationLink onClick={() => setPage(i)} isActive={page === i}>{i + 1}</PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext onClick={() => setPage(Math.min(page + 1, Math.floor(filteredOrders.length / 40) - 1))} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </Card>
                </Tabs>
            </div>
        </div>
    );
}
