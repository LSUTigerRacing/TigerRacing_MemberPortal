import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";

import { OrderStatus, type Order } from "./orders";

export function OrderBadge (props: { order: Order }): ReactElement<{ order: Order }> {
    const color = props.order.status === OrderStatus.Denied
        ? "bg-red-500"
        : props.order.status === OrderStatus.Pending
            ? "bg-gray-500"
            : props.order.status === OrderStatus.Delivered
                ? "bg-green-500"
                : "bg-amber-500";

    return (
        <Badge className={`uppercase ms-2 ${color}`}>
            {
                // In the name of reducing payload size...
                props.order.status === OrderStatus.Denied
                    ? "Denied"
                    : props.order.status === OrderStatus.Approved
                        ? "Approved"
                        : "Pending"
            }
        </Badge>
    );
}
