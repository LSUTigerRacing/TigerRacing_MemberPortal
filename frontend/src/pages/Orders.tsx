import axios from "axios";
import Fuse from "fuse.js";
import {
    Check,
    ChevronDownIcon,
    CircleSmall,
    Ellipsis,
    Filter,
    Link,
    Pencil,
    X
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
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import {
    Tabs,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
    partName: string
    partNumber: string
    url: string
    status: OrderStatus
    approvals: [boolean | null, boolean | null, boolean | null]
}

interface OrderDetails extends Order {
    subsystem: string
    supplier: string
    quantity: number
    unitPrice: number
    deadline: string
    notes: string
}

/**
 * Circle colors.
 */
enum Colors {
    RED = "oklch(63.7% 0.237 25.331)", // text-red-500
    GREEN = "oklch(72.3% 0.219 149.579)", // text-green-500
    GRAY = "oklch(55.1% 0.027 264.364)" // text-gray-500
}

enum OrderAction {
    View,
    Edit,
    Approve,
    Deny
}

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

/**
 * @todo Export to common file.
 */
const SYSTEMS: Record<string, string[]> = {
    Chassis: [
        "Frame",
        "Aerodynamics",
        "Ergonomics",
        "Brakes",
        "Suspension"
    ],
    Powertrain: [
        "Battery",
        "Electronics",
        "Low Voltage",
        "Controls",
        "Tractive System"
    ],
    Business: ["Public Relations"]
};

/**
 * Fetch simple details of all orders.
 */
async function getOrders<T = { admin: boolean, selfOrders: Order[], otherOrders: Order[] }> (): Promise<T | undefined> {
    return {
        admin: true,
        selfOrders: [
            {
                id: "TR26-001",
                requester: "Damien Vesper",
                partName: "ESP32",
                partNumber: "8261853",
                url: "https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B08D5ZD528",
                status: OrderStatus.Denied,
                approvals: [true, false, null]
            },
            {
                id: "TR26-002",
                requester: "Ricky Liang",
                partName: "Teensy",
                partNumber: "435397",
                status: OrderStatus.Pending,
                approvals: [true, null, null]
            }
        ],
        otherOrders: [
            {
                id: "TR26-003",
                requester: "Alex Bui",
                partName: "Raspberry Pi 3B+",
                partNumber: "9308564",
                status: OrderStatus.Approved,
                approvals: [true, true, true]
            },
            {
                id: "TR26-004",
                requester: "Cardin Tran",
                partName: "RFID Scanner",
                partNumber: "045927",
                status: OrderStatus.Completed,
                approvals: [true, true, true]
            }
        ]
    } as T;

    // const res = await axios.get<T>("/api/orders/list", { withCredentials: true }).catch(err => console.error(err));
    // return res?.data ?? undefined;
}

// TEMP
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getOrderDetails (id: Order["id"]): Promise<OrderDetails | undefined> {
    const res = await axios.get<OrderDetails>(`/api/orders/info?id=${id}`, { withCredentials: true }).catch(err => console.error(err));
    return res?.data ?? undefined;
}

function OrderBadge (props: { order: Order | undefined }): ReactElement<{ order: Order }> {
    if (!props.order) return (<></>);
    return (
        <Badge className={`uppercase ms-2 ${props.order.status === OrderStatus.Approved || props.order.status === OrderStatus.Completed ? "bg-green-500" : props.order.status === OrderStatus.Denied ? "bg-red-500" : "bg-gray-500"}`}>
            {
                // In the name of reducing payload size...
                props.order.status === OrderStatus.Completed
                    ? "Completed"
                    : props.order.status === OrderStatus.Approved
                        ? "Approved"
                        : props.order.status === OrderStatus.Denied
                            ? "Denied"
                            : "Pending"
            }
        </Badge>
    );
}

/**
 * Fetch specific details of a given order
 * @param id The order ID.
 */
// async function getOrderDetails (): OrderDetails {};

function OrderEntry (props: { order: Order, isAdmin: boolean, orderTask: (order: Order, action: OrderAction) => void }): ReactElement<{ order: Order, isAdmin: boolean, orderTask: (order: Order, action: OrderAction) => void }> {
    const viewDetails = useRef<HTMLButtonElement>(null);
    return (
        <Card className="gap-0 cursor-pointer transition-shadow hover:shadow-2xl" onClick={() => viewDetails.current?.click()}>
            <CardHeader>
                <div className="flex">
                    <CardTitle className="leading-[1.5rem]">{props.order.id}</CardTitle>
                    <OrderBadge order={props.order} />
                    <div className="flex flex-row ms-auto">
                        {props.order.approvals.map((x, i) => <CircleSmall key={i} fill={x ? Colors.GREEN : x === false ? Colors.RED : Colors.GRAY} className={`${x ? "text-green-500" : x === false ? "text-red-500" : "text-gray-500"}`} />)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="relative">
                <p className="text-sm">{props.order.partName} ({props.order.partNumber})</p>
                <p className="text-xs">{props.order.requester}</p>
            </CardContent>
            <CardFooter className="mt-2 gap-1">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button ref={viewDetails} variant="default" size="icon-sm" className="hover:bg-black" onClick={e => (e.stopPropagation(), props.orderTask(props.order, OrderAction.View))}><Ellipsis /></Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">View Details</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild><Button variant="default" size="icon-sm" className="bg-gray-500 hover:bg-black hover:text-white" onClick={e => (e.stopPropagation(), window.open(props.order.url, "_blank"))}><Link /></Button></TooltipTrigger>
                    <TooltipContent side="bottom">Store Page</TooltipContent>
                </Tooltip>
                {props.isAdmin && (
                    <>
                        <Tooltip>
                            <TooltipTrigger asChild><Button variant="default" size="icon-sm" className="bg-green-500 hover:bg-black hover:text-white" onClick={e => (e.stopPropagation(), props.orderTask(props.order, OrderAction.Approve))} disabled={props.order.status !== OrderStatus.Pending}><Check /></Button></TooltipTrigger>
                            <TooltipContent side="bottom">Approve</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild><Button variant="default" size="icon-sm" className="bg-red-500 hover:bg-black hover:text-white" onClick={e => (e.stopPropagation(), props.orderTask(props.order, OrderAction.Deny))} disabled={props.order.status !== OrderStatus.Pending}><X /></Button></TooltipTrigger>
                            <TooltipContent side="bottom">Deny</TooltipContent>
                        </Tooltip>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}

export default function Orders (): ReactElement {
    // Tabs
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const [activeTab, setActiveTab] = useState("self");
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

    // Dialog & Sheet
    const [requestFormOpen, setRequestFormOpen] = useState<boolean>(false);
    const [orderDetailsOpen, setOrderDetailsOpen] = useState<boolean>(false);

    // Date Picker (Deadline)
    const [deadlineOpen, setDeadlineOpen] = useState(false);
    const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(undefined);

    const [currentOrder, setCurrentOrder] = useState<OrderDetails | undefined>(undefined);
    const [editingOrder, setEditingOrder] = useState(false);

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
        <Dialog open={requestFormOpen} onOpenChange={setRequestFormOpen}>
            <Sheet open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
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
                <SheetContent className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle className="flex">
                            <span>{currentOrder?.id}</span>
                            <OrderBadge order={currentOrder!} />
                        </SheetTitle>
                        <SheetDescription className="mt-2">
                            <span>
                                {editingOrder
                                    ? "You are currently editing this order."
                                    : "Press \"Edit\" to modify this order."
                                }
                            </span>
                        </SheetDescription>
                    </SheetHeader>
                    {editingOrder
                        ? (
                            <>
                                <form id="order-edit-form">
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid grid-cols-3 w-full max-w-sm gap-4">
                                            <div className="grid col-span-2 gap-3">
                                                <Label htmlFor="order-part-name">Part Name</Label>
                                                <Input id="order-part-name" placeholder="ESP32" defaultValue={currentOrder?.partName} required />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="order-part-number">Part Number</Label>
                                                <Input id="order-part-number" placeholder="435397" defaultValue={currentOrder?.partNumber} required />
                                            </div>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="order-requester">Requester</Label>
                                            <Input id="order-requester" placeholder="Enter someone's name" defaultValue={currentOrder?.requester} required />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="order-subsystem">Subsystem</Label>
                                            <Select required>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue id="order-subsystem" placeholder="Select a subsystem" defaultValue={currentOrder?.subsystem} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Object.entries(SYSTEMS).map(([system, subsystems], i) => (
                                                            <>
                                                                <SelectLabel key={i}>{system}</SelectLabel>
                                                                {subsystems.map((x, i) => <SelectItem key={i} value={x.toLowerCase()}>{x}</SelectItem>)}
                                                            </>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="order-deadline">Needed By</Label>
                                            <Popover open={deadlineOpen} onOpenChange={setDeadlineOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-48 justify-between font-normal"
                                                    >
                                                        {deadlineDate?.toLocaleDateString() ?? "Select date"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        id="order-deadline"
                                                        mode="single"
                                                        selected={deadlineDate}
                                                        captionLayout="dropdown"
                                                        onSelect={date => {
                                                            setDeadlineDate(date);
                                                            setDeadlineOpen(false);
                                                        }}
                                                        required
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="order-supplier">Supplier</Label>
                                            <Input id="order-supplier" placeholder="Amazon" defaultValue={currentOrder?.supplier} required />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="order-supplier">Product URL</Label>
                                            <Input id="order-supplier" type="url" placeholder="https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B08D5ZD528" defaultValue={currentOrder?.url} required />
                                        </div>
                                        <div className="grid grid-cols-2 w-full max-w-sm gap-4">
                                            <ButtonGroup>
                                                <ButtonGroupText asChild>
                                                    <Label htmlFor="order-quantity">Quantity</Label>
                                                </ButtonGroupText>
                                                <InputGroup>
                                                    <InputGroupInput id="order-quantity" type="number" placeholder="1" min={1} defaultValue={currentOrder?.quantity} required />
                                                </InputGroup>
                                            </ButtonGroup>
                                            <ButtonGroup>
                                                <ButtonGroupText asChild>
                                                    <Label htmlFor="order-unit-price">$</Label>
                                                </ButtonGroupText>
                                                <InputGroup>
                                                    <InputGroupInput id="order-unit-price" type="number" placeholder="0.01" min={0.01} defaultValue={currentOrder?.unitPrice} required />
                                                </InputGroup>
                                            </ButtonGroup>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="order-notes">Notes</Label>
                                            <Textarea id="order-notes" className="resize-none" placeholder="Enter any additional notes here" />
                                        </div>
                                    </div>
                                </form>
                                <SheetFooter>
                                    <Button type="submit" form="order-edit-form">Save</Button>
                                    <Button variant="outline" onClick={() => setEditingOrder(false)}>Cancel</Button>
                                </SheetFooter>
                            </>
                        )
                        : (
                            <>
                                <div className="px-4">
                                    <div className="flex items-center text-lg mb-2">
                                        <span>Approvals</span>
                                        {isAdmin && (
                                            <div className="flex ms-auto gap-1">
                                                <Tooltip>
                                                    <TooltipTrigger asChild><Button variant="default" size="icon-sm" className="bg-green-500 hover:bg-black hover:text-white" onClick={() => orderTask(currentOrder!, OrderAction.Approve)} disabled={currentOrder?.status !== OrderStatus.Pending}><Check /></Button></TooltipTrigger>
                                                    <TooltipContent side="bottom">Approve</TooltipContent>
                                                </Tooltip>
                                                <Tooltip>
                                                    <TooltipTrigger asChild><Button variant="default" size="icon-sm" className="bg-red-500 hover:bg-black hover:text-white" onClick={() => orderTask(currentOrder!, OrderAction.Deny)} disabled={currentOrder?.status !== OrderStatus.Pending}><X /></Button></TooltipTrigger>
                                                    <TooltipContent side="bottom">Deny</TooltipContent>
                                                </Tooltip>
                                            </div>
                                        )}
                                    </div>
                                    <Separator className="px-4 mb-2" />
                                    <div className="flex flex-row">
                                        {currentOrder?.approvals.map((x, i) => <CircleSmall key={i} fill={x ? Colors.GREEN : x === false ? Colors.RED : Colors.GRAY} className={`${x ? "text-green-500" : x === false ? "text-red-500" : "text-gray-500"}`} />)}
                                    </div>

                                    <p className="text-lg mt-4 mb-2">Requester</p>
                                    <Separator className="px-4 mb-2" />
                                    <p className="text-sm">Name: {currentOrder?.requester}</p>
                                    <p className="text-sm">Subsystem: {currentOrder?.subsystem}</p>
                                    <p className="text-sm">Needed By: {new Date(currentOrder?.deadline ?? 0).toLocaleDateString()}</p>

                                    <div className="flex items-center text-lg mt-8 mb-2">
                                        <span>Part Details</span>
                                        <Tooltip>
                                            <TooltipTrigger asChild className="ms-auto"><Button variant="default" size="icon-sm" className="bg-gray-500 hover:bg-black hover:text-white" onClick={() => window.open(currentOrder?.url, "_blank")}><Link /></Button></TooltipTrigger>
                                            <TooltipContent side="bottom">Store Page</TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <Separator className="px-4 mb-2" />
                                    <p className="text-sm">Part Name: {currentOrder?.partName}</p>
                                    <p className="text-sm">Part #: {currentOrder?.partNumber}</p>
                                    <p className="text-sm">Supplier: {currentOrder?.supplier}</p>
                                    <br />
                                    <p className="text-sm">Quantity: {currentOrder?.quantity}</p>
                                    <p className="text-sm">Unit Price: ${(currentOrder?.unitPrice ?? 0).toFixed(2)}</p>
                                    <p className="text-sm">Subtotal: ${((currentOrder?.quantity ?? 0) * (currentOrder?.unitPrice ?? 0)).toFixed(2)}</p>

                                    <p className="text-lg mt-8 mb-2">Notes</p>
                                    <Separator className="px-4 mb-2" />
                                    <p className="text-sm">{currentOrder?.notes || "No additional notes."}</p>
                                </div>
                                <SheetFooter>
                                    <Button variant="default" onClick={() => setEditingOrder(true)}>
                                        Edit
                                    </Button>
                                    <SheetClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </>
                        )
                    }
                </SheetContent>
            </Sheet>
            <form>
                <DialogContent className="xl:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Create Order Request</DialogTitle>
                        <DialogDescription>
                            Request a part for your subsystem.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col xl:grid xl:grid-cols-2 gap-6">
                        <div className="grid gap-6">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="grid col-span-2 gap-3">
                                    <Label htmlFor="order-part-name">Part Name</Label>
                                    <Input id="order-part-name" placeholder="ESP32" required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="order-part-number">Part Number</Label>
                                    <Input id="order-part-number" placeholder="435397" required />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="order-requester">Requester</Label>
                                <Input id="order-requester" placeholder="Enter your name" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="order-subsystem">Subsystem</Label>
                                <Select required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue id="order-subsystem" placeholder="Select a subsystem" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Object.entries(SYSTEMS).map(([system, subsystems], i) => (
                                                <>
                                                    <SelectLabel key={i}>{system}</SelectLabel>
                                                    {subsystems.map((x, i) => <SelectItem key={i} value={x.toLowerCase()}>{x}</SelectItem>)}
                                                </>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-3 gap-3 col-span-3">
                                <div className="grid gap-3 col-span-2">
                                    <Label htmlFor="order-supplier">Supplier</Label>
                                    <Input id="order-supplier" placeholder="Amazon" required />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="order-deadline">Needed By</Label>
                                    <Popover open={deadlineOpen} onOpenChange={setDeadlineOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="justify-between font-normal"
                                            >
                                                {deadlineDate?.toLocaleDateString() ?? "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="overflow-hidden p-0 w-full" align="start">
                                            <Calendar
                                                id="order-deadline"
                                                mode="single"
                                                selected={deadlineDate}
                                                captionLayout="dropdown"
                                                onSelect={date => {
                                                    setDeadlineDate(date);
                                                    setDeadlineOpen(false);
                                                }}
                                                required
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="grid gap-3 col-span-3">
                                <Label htmlFor="order-supplier">Product URL</Label>
                                <Input id="order-supplier" type="url" placeholder="https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B08D5ZD528" required />
                            </div>
                            <div className="grid grid-cols-3 gap-3 col-span-3">
                                <div className="grid gap-3">
                                    <Label htmlFor="order-supplier">Quantity</Label>
                                    <ButtonGroup>
                                        <ButtonGroupText asChild>
                                            <Label htmlFor="order-quantity">#</Label>
                                        </ButtonGroupText>
                                        <InputGroup>
                                            <InputGroupInput id="order-quantity" type="number" placeholder="1" min={1} required />
                                        </InputGroup>
                                    </ButtonGroup>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="order-supplier">Unit Price</Label>
                                    <ButtonGroup>
                                        <ButtonGroupText asChild>
                                            <Label htmlFor="order-unit-price">$</Label>
                                        </ButtonGroupText>
                                        <InputGroup>
                                            <InputGroupInput id="order-unit-price" type="number" placeholder="0.01" min={0.01} required />
                                        </InputGroup>
                                    </ButtonGroup>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="order-supplier">Subtotal</Label>
                                    <ButtonGroup>
                                        <ButtonGroupText asChild>
                                            <Label htmlFor="order-unit-price">$</Label>
                                        </ButtonGroupText>
                                        <InputGroup>
                                            <InputGroupInput id="order-unit-price" type="number" placeholder="0.01" min={0.01} disabled />
                                        </InputGroup>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-3 col-span-2">
                            <Label htmlFor="order-notes">Notes</Label>
                            <Textarea id="order-notes" className="resize-none" placeholder="Enter any additional notes here" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create Request</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
