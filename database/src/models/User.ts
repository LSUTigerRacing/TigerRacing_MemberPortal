import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { Order, OrderReview } from "./Order.js";
import { ProjectTask, ProjectUser } from "./Project.js";

import { shirtSizes, subsystems } from "../enums.js";

export const User = pgTable("user", t => ({
    id: t.uuid().primaryKey().defaultRandom(),
    name: t.text().notNull(),
    email: t.text().unique().notNull(),

    /**
     * This is the student's 89 number.
     */
    studentId: t.integer().notNull(),
    subsystem: subsystems(),
    shirtSize: shirtSizes(),
    completedHazingForm: t.boolean().notNull().default(false),
    paidMemberFee: t.boolean().notNull().default(false),
    gradDate: t.integer().notNull(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
}));

export const UserRelations = relations(User, ({ many }) => ({
    orders: many(Order),
    orderReviews: many(OrderReview),
    projects: many(ProjectUser),
    projectTasks: many(ProjectTask)
}));
