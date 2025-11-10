import { ChevronDownIcon, Calendar } from "lucide-react";
import { type ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/lib/config/config";

export default function OrderForm (): ReactElement {
    return (
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
                                        {Object.entries(config.systems).map(([system, subsystems], i) => (
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
    );
}
