import axios from "axios";

import type { Subsystem } from "../../../../../shared/config/enums";

export enum OrderStatus {
    Pending,
    Denied,
    Approved,

    // Not implemented in backend as of right now. Should be done so in the future.
    Delivering,
    Delivered,
    Claimed
}

export enum OrderAction {
    View,
    Edit,
    Approve,
    Deny
}

/**
 * Circle colors.
 */
export enum OrderColors {
    RED = "oklch(63.7% 0.237 25.331)", // text-red-500
    GREEN = "oklch(72.3% 0.219 149.579)", // text-green-500
    GRAY = "oklch(55.1% 0.027 264.364)" // text-gray-500
}

export interface Part {
    /**
     * The name of the part.
     */
    name: string
    /**
     * The manufacturer part number.
     */
    number: string
    /**
     * The supplier for the order.
     */
    supplier: string
    /**
     * The product URL of the part.
     */
    url: string
    /**
     * The quantity of the item.
     */
    quantity: number
    /**
     * The individual price of the part.
     */
    price: number
}

export interface Order {
    /**
     * The ID of the order. Follows the format `TR{year}-{serial ID}`.
     */
    id: string
    /**
     * Details regarding the individual who created the order request.
     * Note: This is **not** the person who placed the order itself on a vendor website!
     */
    requester: {
        /**
         * The full name of the user who requested the order.
         */
        displayName: string
        /**
         * The subsystem the requester belongs to.
         */
        subsystem: Subsystem
    }
    /**
     * The current status of the order.
     * Tracks anything from pending review to delivered.
     */
    status: OrderStatus
    /**
     * The reviews that the order has received.
     * For an order to be approved, it must receive 3 accepted approvals.
     * There can only be a maximum of three reviews per order.
     *
     * If any individual denies the order, the requester will need to create
     * a new order and go through the review process once again.
     */
    reviews: Array<boolean | null>
    /**
     * The date by which the order should be placed.
     */
    deadline: string
    /**
     * The total value of the order.
     */
    price: number
    /**
     * The total number of parts in the order.
     */
    length: number
}

export interface DetailedOrder extends Order {
    /**
     * A list of parts in the order.
     */
    parts: Part[]
    /**
     * Optional notes added to the order.
     */
    notes: string
    /**
     * Whether the user viewing the resource has reviewed the order.
     */
    reviewed: boolean
}

/**
 * Fetch simple details of all orders.
 */
export async function getAllOrders (): Promise<(Record<"self" | "others", Order[]> & { admin: boolean }) | undefined> {
    return {
        admin: true,
        self: [{
            id: "TR26-001",
            requester: {
                displayName: "Damien Vesper",
                subsystem: Subsystem.Embedded
            },
            length: 1,
            price: 15.99,
            status: OrderStatus.Denied,
            reviews: [true, false, null],
            deadline: new Date().toISOString()
        }],
        others: []
    };

    // const res = await axios.get<T>("/api/orders/list", { withCredentials: true }).catch(err => console.error(err));
    // return res?.data ?? undefined;
}

/**
 *
 * @param id The ID of the order.
 * @returns
 */
export async function getOrder (id: Order["id"]): Promise<DetailedOrder | undefined> {
    const res = await axios.get<DetailedOrder>(`/api/orders/info?id=${id}`, { withCredentials: true }).catch(err => console.error(err));

    return {
        id: "TR26-001",
        requester: {
            displayName: "Damien Vesper",
            subsystem: Subsystem.Embedded
        },
        length: 1,
        price: 15.99,
        status: OrderStatus.Denied,
        reviews: [true, false, null],
        deadline: new Date().toISOString(),
        parts: [{
            name: "AITRIP ESP-WROOM-32",
            number: "B08D5ZD528",
            supplier: "Amazon",
            url: "https://www.amazon.com/ESP-WROOM-32-Development-Microcontroller-Integrated-Compatible/dp/B08D5ZD528",
            quantity: 1,
            price: 15.99
        }],
        notes: "",
        reviewed: false
    };

    return res?.data ?? undefined;
}
