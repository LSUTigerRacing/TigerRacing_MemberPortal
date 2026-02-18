import type {
    OrderStatus,
    ProjectPriority,
    Role,
    ShirtSize,
    Subsystem,
    System
} from "../config/enums.js";

interface Pagination {
    /**
     * The number of entries to limit a page to.
     * May or may not be respected by the API.
     */
    limit?: number
    /**
     * The page number.
     */
    page: number
}

/**
 * Typings for the internal member portal API.
 * These should be kept in sync whenever either the API is updated.
 */
export namespace TRAPI {
    interface User {
        /**
         * Internal UUID.
         */
        id: string
        /**
         * The user's full name.
         */
        name: string
        /**
         * The user's institutional email.
         */
        email: string
        /**
         * The user's permission level.
         */
        role: Role
        /**
         * The student's instution-issued ID number (89 #).
         */
        sid: integer
        /**
         * The system of which the {@link subsystem} belongs to.
         */
        system: System
        /**
         * The primary subsystem the user is a part of.
         */
        subsystem: Subsystem
        /**
         * The user's expected graduation date.
         */
        gradYear: number
        /**
         * The user's shirt size.
         */
        shirtSize: ShirtSize
        /**
         * Whether the user has submitted a hazing prevention
         * proof-of-completion certificate to club administration.
         */
        hazingStatus: boolean
        /**
         * Whether the user has paid their membership fees.
         */
        feeStatus: boolean
        /**
         * Timestamp at which the user was created.
         */
        createdAt: string
        /**
         * Timestamp at which the user was last updated.
         */
        updatedAt: string
    }

    interface Order {
        /**
         * Internal UUID.
         */
        id: string
        /**
         * The ID of the order. Follows the format `TR{year}-{serial ID}`.
         */
        orderId: string
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
        /**
         * A list of parts in the order.
         */
        items: OrderItem[]
        /**
         * Optional notes added to the order.
         */
        notes?: string
        /**
         * The order's reviews
         */
        reviews: OrderReview[]
        /**
         * Timestamp at which the order was created.
         */
        createdAt: string
        /**
         * Timestamp at which the order was last updated.
         */
        updatedAt: string
    }

    interface OrderItem {
        /**
         * Internal UUID.
         */
        id: string
        /**
         * The name of the part.
         */
        name: string
        /**
         * The manufacturer part number.
         */
        partNumber: string
        /**
         * The supplier for the item.
         */
        supplier: string
        /**
         * The product URL of the item.
         */
        url: string
        /**
         * The quantity of the item.
         */
        quantity: number
        /**
         * The individual price of the item.
         */
        price: number
    }

    interface OrderReview {
        /**
         * The user reviewing the order.
         */
        user: string
        /**
         * Whether the user approved or denied the order.
         */
        value: boolean
        /**
         * The date at which the review was made.
         */
        createdAt: string
    }

    interface Project {
        id: string
        author: string
        title: string
        description?: string
        subsystem: Subsystem
        priority: ProjectPriority
        status: ProjectStatus

        startDate: string
        deadline: string

        tasks: ProjectTask[]
        users: ProjectUser[]

        createdAt: string
        updatedAt: string
    }

    interface ProjectTask {
        id: string
        author: string
        assignees?: string[]

        title: string
        description?: string
        status: boolean
        deadline?: string

        createdAt: string
        updatedAt: string
    }

    // eslint-disable-next-line @stylistic/type-generic-spacing
    type ProjectUser = Pick<User, "id" | "name" | "email" /* | "avatar" */>;

    interface DashboardInfo {
        /**
         * The name of the currently logged-in user.
         */
        name: User["name"]
        /**
         * The avatar of the currently logged-in user.
         * @todo Ignore this for now. This will be implemented in the future.
         */
        avatar: User["avatar"]
        /**
         * A sample of the user's currently assigned tasks.
         */
        tasks: Array<Pick<ProjectTask, "name" | "deadline">>
        /**
         * Recent announcements.
         * @todo Ignore this for now. This will be implemented in the future.
         */
        announcements: Array<Record<"content" | "timestamp", string>>
        /**
         * Recent events.
         * @todo Ignore this for now. This will be implemented in the future.
         */
        events: Array<Record<"title" | "timestamp", string>>
    }
};
