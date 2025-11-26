import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { User } from "./User.js";

import { orderStatus, subsystems } from "./enums.js";

export const Order = pgTable("order", t => ({
    id: t.uuid().primaryKey().defaultRandom(),
    requesterId: t.uuid().notNull().references(() => User.id),

    name: t.text().notNull(),
    subsystem: subsystems().notNull(),
    status: orderStatus().notNull(),
    deadline: t.timestamp({ withTimezone: true }).notNull(),
    notes: t.text(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
}));

export const OrderItem = pgTable("order_item", t => ({
    id: t.uuid().primaryKey().defaultRandom(),
    orderId: t.uuid().notNull().references(() => Order.id, { onDelete: "cascade" }),

    name: t.text().notNull(),
    partNumber: t.text().notNull(),
    supplier: t.text().notNull(),
    url: t.text().notNull(),
    quantity: t.integer().notNull(),
    price: t.numeric().notNull()
}));

export const OrderReview = pgTable("order_review", t => ({
    userId: t.uuid().notNull().references(() => User.id, { onDelete: "cascade" }),
    orderId: t.uuid().notNull().references(() => Order.id, { onDelete: "cascade" }),
    value: t.boolean().notNull()
}), t => [
    primaryKey({ columns: [t.userId, t.orderId] })
]);

export const OrderRelations = relations(Order, ({ one, many }) => ({
    requester: one(User, {
        fields: [Order.requesterId],
        references: [User.id]
    }),
    items: many(OrderItem),
    reviews: many(OrderReview)
}));

export const OrderItemRelations = relations(OrderItem, ({ one }) => ({
    order: one(Order, {
        fields: [OrderItem.orderId],
        references: [Order.id]
    })
}));

export const OrderReviewRelations = relations(OrderReview, ({ one }) => ({
    order: one(Order, {
        fields: [OrderReview.orderId],
        references: [Order.id]
    }),
    user: one(User, {
        fields: [OrderReview.userId],
        references: [User.id]
    })
}));
