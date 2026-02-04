import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { Order, OrderReview } from "./Order.js";
import { ProjectTask, ProjectUser } from "./Project.js";

import { roles, shirtSizes, subsystems, systems } from "./enums.js";

import { Role } from "../../../shared/config/enums.js";

export const User = pgTable("user", t => ({
    id: t.uuid().primaryKey().defaultRandom(),
    name: t.text().notNull(),
    email: t.text().unique().notNull(),
    role: roles().notNull().default(Role.Member),

    /**
     * This is the student's 89 number.
     */
    sid: t.integer().notNull(),
    system: systems().notNull(),
    subsystem: subsystems().notNull(),

    shirtSize: shirtSizes(),
    hazingStatus: t.boolean().notNull().default(false),
    feeStatus: t.boolean().notNull().default(false),
    gradYear: t.integer().notNull(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
}));

export const UserRelations = relations(User, ({ many }) => ({
    orders: many(Order),
    orderReviews: many(OrderReview),
    projects: many(ProjectUser),
    projectTasks: many(ProjectTask)
}));
