import axios from "axios";
import { Filter } from "lucide-react";
import {
    useDeferredValue,
    useEffect,
    useState,
    type ReactElement
} from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

enum OrderStatus {
    Pending,
    Denied,
    Approved,
    Completed
}

interface Order {
    id: string
    requester: string
    requesterId: string
    status: OrderStatus
    title: string
    approvals: [boolean, boolean, boolean]
}

interface OrderDetails extends Order {
    partName: string
    partNumber: string
    supplier: string
    quantity: number
    unitPrice: number
    deadline: Date
    notes: string
}

/**
 * Fetch simple details of all orders.
 */
async function getOrders<T = { requesterId: string, orders: Order[] }> (): Promise<T | undefined> {
    const res = await axios.get<T>("/api/orders/list", { withCredentials: true }).catch(err => console.error(err));
    return res?.data ?? undefined;
}

/**
 * Fetch specific details of a given order
 * @param id The order ID.
 */
// async function getOrderDetails (): OrderDetails {};

function OrderEntry (props: { order: Order }): ReactElement<{ order: Order }> {
    return (
        <Card>
            <CardContent>
                <div className="flex">

                </div>
            </CardContent>
        </Card>
    );
}

export function Orders (): ReactElement {
    const [currentUserId, setCurrentUserId] = useState<string | undefined>();
    const [currentOrder, setCurrentOrder] = useState<OrderDetails | undefined>();

    const [orders, setOrders] = useState<Order[]>([]);

    const myOrders = useDeferredValue<Order[] | undefined>(orders.filter(x => x.requesterId === currentUserId), undefined);
    const otherOrders = useDeferredValue<Order[] | undefined>(orders.filter(x => x.requesterId !== currentUserId), undefined);

    const [orderFilter, setOrderFilter] = useState("");

    useEffect(() => {
        getOrders().then(res => {
            if (!res?.orders || !res?.requesterId) return;

            setCurrentUserId(res.requesterId);
            setOrders(res.orders);
        });
    }, []);

    return (
        <div className="mt-16 p-8">
            <h1 className="font-manrope font-semibold text-4xl text-center mb-10">Orders</h1>
            <div>
                <Tabs defaultValue="my-orders" className="gap-0">
                    <TabsList className="bg-body justify-start rounded-none border-b p-0">
                        <TabsTrigger
                            value="my-orders"
                            className="bg-background border-b-border dark:data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:border-b-background h-full rounded-none rounded-t border border-transparent data-[state=active]:-mb-0.5 data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5"
                        >
                            My Orders
                            <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums">
                                {myOrders?.length ?? <Spinner />}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="all-orders"
                            className="bg-background border-b-border dark:data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:border-b-background h-full rounded-none rounded-t border border-transparent data-[state=active]:-mb-0.5 data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5"
                        >
                            Other Orders
                            <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums">
                                {otherOrders?.length ?? <Spinner className="size-fit" />}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>

                    <Card className="rounded-t-none border-t-0 px-6 py-8">
                        <TabsContent value="my-orders">
                            <InputGroup>
                                <InputGroupInput placeholder="Filter by title" />
                                <InputGroupAddon align="inline-end">
                                    <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                                        <Filter className="size-3" />
                                    </div>
                                </InputGroupAddon>
                            </InputGroup>

                            {myOrders?.map(x => <OrderEntry order={x} />)}
                        </TabsContent>
                        <TabsContent value="all-orders">
                            <p className="text-muted-foreground text-sm"></p>
                        </TabsContent>
                    </Card>
                </Tabs>
            </div>
        </div>
    );
}
