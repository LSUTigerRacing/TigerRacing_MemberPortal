import type { ReactElement } from "react";

import type { DetailedOrder } from "./orders";

export default function OrderDetails (props: { order: DetailedOrder | undefined }): ReactElement<{ order: DetailedOrder | undefined }> | null {
    return props.order
        ? (
            <div></div>
        )
        : null;
};
