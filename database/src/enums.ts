import { pgEnum } from "drizzle-orm/pg-core";

import {
    OrderStatus,
    ProjectPriority,
    Subsystem,
    System
} from "../../shared/config/enums.js";

export const systems = pgEnum("system", System);
export const subsystems = pgEnum("subsystems", Subsystem);

// Projects
export const projectPriority = pgEnum("project_priority", ProjectPriority);

// Orders
export const orderStatus = pgEnum("order_status", OrderStatus);
