import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";

import { OrderStatus } from "./orders";

export default function OrderBadge (props: { status: OrderStatus }): ReactElement<{ status: OrderStatus }> | null {
    const color = props.status === OrderStatus.Denied
        ? "bg-red-500"
        : props.status === OrderStatus.Pending
            ? "bg-gray-500"
            : props.status === OrderStatus.Delivered
                ? "bg-green-500"
                : "bg-amber-500";

    return (
        <Badge className={`uppercase ms-2 ${color}`}>
            {
                props.status === OrderStatus.Denied
                    ? "Denied"
                    : props.status === OrderStatus.Approved
                        ? "Approved"
                        : "Pending"
            }
        </Badge>
    );
}
