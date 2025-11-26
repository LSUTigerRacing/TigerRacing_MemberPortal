import { pgEnum } from "drizzle-orm/pg-core";

import {
    OrderStatus,
    ProjectPriority,
    Role,
    ShirtSize,
    Subsystem,
    System
} from "../../../shared/config/enums.js";

export const systems = pgEnum("system", System);
export const subsystems = pgEnum("subsystems", Subsystem);
export const shirtSizes = pgEnum("shirt_sizes", ShirtSize);
export const roles = pgEnum("roles", Role);

// Projects
export const projectPriority = pgEnum("project_priority", ProjectPriority);

// Orders
export const orderStatus = pgEnum("order_status", OrderStatus);
