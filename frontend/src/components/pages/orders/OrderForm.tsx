import {
    AlertCircleIcon,
    ChevronDownIcon,
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "lucide-react";
import {
    Fragment,
    useState,
    type Dispatch,
    type ReactElement,
    type SetStateAction
} from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { config } from "@/lib/config/config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OrderFormProps {
    deadlineDate: Date | undefined
    deadlineOpen: boolean
    setDeadlineDate: Dispatch<SetStateAction<OrderFormProps["deadlineDate"]>>
    setDeadlineOpen: Dispatch<SetStateAction<OrderFormProps["deadlineOpen"]>>
}

enum OrderFormState {
    BasicInformation,
    Parts,
    Notes
}

export default function OrderForm (props: OrderFormProps): ReactElement<OrderFormProps> | null {
    const { deadlineDate, deadlineOpen, setDeadlineDate, setDeadlineOpen } = props;

    const [requester, setRequester] = useState("");
    const [tab, setTab] = useState(OrderFormState.BasicInformation);

    const [partIndex, setPartIndex] = useState(0);

    return (
        <form>
            <DialogContent className="xl:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Order Request Form</DialogTitle>
                    <DialogDescription>
                        Request parts for your subsystem.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <Alert variant="destructive" className="bg-muted!">
                    <AlertCircleIcon />
                    <AlertTitle><strong>There was an error processing your order request.</strong></AlertTitle>
                    <AlertDescription>
                        <p>Ricky, you've been playing near the server again!</p>
                    </AlertDescription>
                </Alert>
                <Breadcrumb className="w-full flex justify-center">
                    <BreadcrumbList className="border-2 rounded-lg gap-1! sm:gap-1.5! px-2 py-1.5">
                        <BreadcrumbItem><BreadcrumbPage><Button size="sm" variant="ghost" className={tab === OrderFormState.BasicInformation ? "bg-primary! text-background!" : ""} onClick={() => setTab(OrderFormState.BasicInformation)}>Basic Info</Button></BreadcrumbPage></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage><Button size="sm" variant="ghost" className={tab === OrderFormState.Parts ? "bg-primary! text-background!" : ""} onClick={() => setTab(OrderFormState.Parts)}>Parts</Button></BreadcrumbPage></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage><Button size="sm" variant="ghost" className={tab === OrderFormState.Notes ? "bg-primary! text-background!" : ""} onClick={() => setTab(OrderFormState.Notes)}>Notes</Button></BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Separator />
                {tab === OrderFormState.BasicInformation && (
                    <div className="flex flex-col xl:grid xl:grid-cols-6 gap-6">
                        <div className="grid gap-3 col-span-4">
                            <Label htmlFor="order-requester">Requester</Label>
                            <Input id="order-requester" placeholder="Enter a name" value={requester} onChange={e => setRequester(e.target.value)} required />
                        </div>
                        <div className="grid gap-3 col-span-2">
                            <Label htmlFor="order-subsystem">Subsystem</Label>
                            <Select required>
                                <SelectTrigger className="w-full">
                                    <SelectValue id="order-subsystem" placeholder="Select a subsystem" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.entries(config.systems).map(([system, subsystems], i) => (
                                            <Fragment key={i}>
                                                <SelectLabel>{system}</SelectLabel>
                                                {subsystems.map((x, j) => <SelectItem key={j} value={x.toLowerCase()}>{x}</SelectItem>)}
                                            </Fragment>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3 col-span-2">
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
                        <div className="grid col-span-2">
                            <div className="grid gap-3 col-span-2">
                                <Label htmlFor="order-supplier">Supplier</Label>
                                <Input id="order-supplier" placeholder="Amazon" required />
                            </div>
                        </div>
                    </div>
                )}
                {tab === OrderFormState.Parts && (
                    <div className="flex flex-col xl:grid xl:grid-cols-6 gap-6">
                        <div className="grid gap-3 col-span-3">
                            <Label htmlFor="order-part-name">Part Name</Label>
                            <Input id="order-part-name" placeholder="ESP32" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="order-part-number">Part #</Label>
                            <Input id="order-part-number" placeholder="435397" required />
                        </div>
                        <div className="grid gap-3 col-span-2">
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
                        <div className="grid gap-3 col-span-3">
                            <Label htmlFor="order-supplier">Product URL</Label>
                            <Input id="order-supplier" type="url" placeholder="https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B08D5ZD528" required />
                        </div>
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
                        <div className="grid gap-3 col-span-2">
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
                )}
                {tab === OrderFormState.Notes && (
                    <div className="flex flex-col xl:grid xl:grid-cols-6 gap-6">
                        <div className="grid gap-3 col-span-6">
                            <Label htmlFor="order-notes">Notes</Label>
                            <Textarea id="order-notes" className="resize-none" placeholder="Enter any additional notes here" />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    {tab === OrderFormState.Parts && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <PaginationLink onClick={() => setPartIndex(0)} className={!table.getCanPreviousPage() ? "pointer-events-none text-muted-foreground" : ""}>
                                                <ChevronFirstIcon className="w-4 h-4" />
                                            </PaginationLink>
                                        </TooltipTrigger>
                                        <TooltipContent className={!table.getCanPreviousPage() ? "hidden" : ""}>First</TooltipContent>
                                    </Tooltip>
                                </PaginationItem>
                                <PaginationItem>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <PaginationLink onClick={() => setPartIndex(partIndex - 1)} className={!table.getCanPreviousPage() ? "pointer-events-none text-muted-foreground" : ""}>
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
                                            <PaginationLink onClick={() => setPartIndex(partIndex + 1)} className={!table.getCanNextPage() ? "pointer-events-none text-muted-foreground" : ""}>
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </PaginationLink>
                                        </TooltipTrigger>
                                        <TooltipContent className={!table.getCanNextPage() ? "hidden" : ""}>Next</TooltipContent>
                                    </Tooltip>
                                </PaginationItem>
                                <PaginationItem>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <PaginationLink onClick={() => setPartIndex(partIndex + 1)} className={!table.getCanNextPage() ? "pointer-events-none text-muted-foreground" : ""}>
                                                <ChevronLastIcon className="w-4 h-4" />
                                            </PaginationLink>
                                        </TooltipTrigger>
                                        <TooltipContent className={!table.getCanNextPage() ? "hidden" : ""}>Last</TooltipContent>
                                    </Tooltip>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                    {tab === OrderFormState.BasicInformation && (
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    )}
                    {tab !== OrderFormState.BasicInformation && <Button variant="outline" onClick={() => setTab(tab - 1)}>Previous</Button>}
                    {tab !== OrderFormState.Notes && <Button onClick={() => setTab(tab + 1)}>Next</Button>}
                    {tab === OrderFormState.Notes && <Button type="submit">Create Request</Button>}
                </DialogFooter>
            </DialogContent>
        </form>
    );
}
