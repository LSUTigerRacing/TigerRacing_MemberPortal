import { useRef, type ReactElement } from "react";
import {
    Check,
    CircleSmall,
    Ellipsis,
    Pencil,
    X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

import OrderBadge from "./OrderBadge";

import {
    OrderColors,
    OrderStatus,
    type Order,
    OrderAction
} from "./orders";

export default function OrderEntry (props: { order: Order, admin: boolean, orderTask: (order: Order, action: OrderAction) => void }): ReactElement<{ order: Order, isAdmin: boolean, orderTask: (order: Order, action: OrderAction) => void }> | null {
    const viewDetails = useRef<HTMLButtonElement>(null);
    return (
        <Card className="gap-0 cursor-pointer transition-shadow hover:shadow-2xl" onClick={e => (e.stopPropagation(), props.orderTask(props.order, OrderAction.View))}>
            <CardHeader>
                <div className="flex">
                    <CardTitle className="leading-[1.5rem]">{props.order.id}</CardTitle>
                    <OrderBadge status={props.order.status} />
                    <div className="flex flex-row ms-auto">
                        {props.order.reviews.map((x, i) => <CircleSmall key={i} fill={x ? OrderColors.GREEN : x === false ? OrderColors.RED : OrderColors.GRAY} className={`${x ? "text-green-500" : x === false ? "text-red-500" : "text-gray-500"}`} />)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="relative">
                <Separator />
                <p className="text-sm mt-2"><strong>Subsystem</strong> - {props.order.requester.subsystem}</p>
                <p className="text-sm mb-2"><strong>Subtotal</strong> - ${props.order.price} ({props.order.length} {props.order.length === 1 ? "item" : "items"})</p>
                <Separator />
                <p className="text-xs mt-2"><strong>Requester</strong> - {props.order.requester.displayName}</p>
                <p className="text-xs mt-1"><strong>Deadline</strong> - {new Date(props.order.deadline).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter className="mt-2 gap-1">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button ref={viewDetails} variant="default" size="icon-sm" className="hover:bg-black" onClick={e => (e.stopPropagation(), props.orderTask(props.order, OrderAction.View))}><Ellipsis /></Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">View Details</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild><Button variant="default" size="icon-sm" className="bg-gray-500 hover:bg-black hover:text-white" onClick={e => (e.stopPropagation(), props.orderTask(props.order, OrderAction.Edit))}><Pencil /></Button></TooltipTrigger>
                    <TooltipContent side="bottom">Edit</TooltipContent>
                </Tooltip>
                {props.admin && (
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
