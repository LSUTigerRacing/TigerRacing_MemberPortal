import Fuse from "fuse.js";
import {
    Ellipsis,
    Filter,
    Pencil
} from "lucide-react";
import { motion } from "motion/react";
import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type ReactElement
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Sheet } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import {
    Tabs,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import OrderCard from "@/components/pages/orders/OrderCard";
import OrderForm from "@/components/pages/orders/OrderForm";
import OrderDetails from "@/components/pages/orders/OrderDetails";
import { type DetailedOrder, getAllOrders, getOrder, type Order, OrderAction } from "@/components/pages/orders/orders";

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

export default function Orders (): ReactElement | null {
    // Tabs
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const [activeTab, setActiveTab] = useState("self");
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

    // Dialog & Sheet
    const [orderFormOpen, setOrderFormOpen] = useState<boolean>(false);
    const [orderDetailsOpen, setOrderDetailsOpen] = useState<boolean>(false);

    // Date Picker (Deadline)
    const [deadlineOpen, setDeadlineOpen] = useState(false);
    const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);

    const [currentOrder, setCurrentOrder] = useState<DetailedOrder | undefined>(undefined);

    const [orderFilter, setOrderFilter] = useState("");
    const [page, setPage] = useState(0);

    const [isAdmin, setIsAdmin] = useState(false);
    const [orders, setOrders] = useState<Record<"self" | "others", Order[]>>({
        self: [],
        others: []
    });

    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    const fuse = new Fuse(orders.self, {
        keys: [
            { name: "id", weight: 1.0 },
            { name: "partName", weight: 0.5 },
            { name: "partNumber", weight: 0.75 },
            { name: "requester", weight: 0.1 }
        ],
        ignoreDiacritics: true,
        threshold: 0.001
    });

    function orderTask<T extends Order> (order: T, action: OrderAction) {
        switch (action) {
            case OrderAction.View:
                if (currentOrder?.id === order.id) {
                    setOrderDetailsOpen(true);
                    setOrderFormOpen(false);
                } else {
                    void getOrder(order.id).then(res => {
                        if (res === undefined) return;
                        setCurrentOrder(res);

                        setOrderDetailsOpen(true);
                        setOrderFormOpen(false);
                    });
                }
                break;
            case OrderAction.Edit:
                if (currentOrder?.id === order.id) {
                    setOrderDetailsOpen(true);
                    setOrderFormOpen(true);
                } else {
                    void getOrder(order.id).then(res => {
                        if (res === undefined) return;
                        setCurrentOrder(res);

                        setOrderDetailsOpen(false);
                        setOrderFormOpen(true);
                    });
                }
                break;
            case OrderAction.Approve:
                break;
            case OrderAction.Deny:
                break;
        }
    }

    useEffect(() => {
        (async function () {
            const res = await getAllOrders();
            if (!res) return;

            setIsAdmin(res.admin);
            setOrders({
                self: res.self,
                others: res.others
            });
        })();
    }, []);

    useEffect(() => {
        const curOrders = activeTab === "self" ? orders.self : orders.others;

        if (curOrders.length === 0) return setFilteredOrders([]);
        if (!orderFilter) return setFilteredOrders(curOrders);

        fuse.setCollection(activeTab === "self" ? orders.self : orders.others);
        setFilteredOrders(fuse.search(orderFilter).map(x => x.item));
    // ESLint autofix rule here would cause infinite useEffect loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, orders, orderFilter]);

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
        <Sheet open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
            <Dialog open={orderFormOpen} onOpenChange={setOrderFormOpen}>
                <OrderForm
                    deadlineDate={deadlineDate}
                    deadlineOpen={deadlineOpen}
                    order={currentOrder}
                    setDeadlineDate={setDeadlineDate}
                    setDeadlineOpen={setDeadlineOpen}
                />

                <OrderDetails order={currentOrder} />

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
                                    <Button onClick={() => setOrderFormOpen(true)}>
                                        Create
                                        <Pencil />
                                    </Button>
                                </div>

                                <div className={filteredOrders.length ? "flex flex-col gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : ""}>
                                    {filteredOrders.length
                                        ? (filteredOrders.length > 40
                                            ? filteredOrders.slice(page * 40, Math.min(filteredOrders.length, 40 + page * 40))
                                            : filteredOrders
                                        ).map((x, i) => <OrderCard key={i} order={x} admin={isAdmin} orderTask={orderTask} />)
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
            </Dialog>
        </Sheet>
    );
}
