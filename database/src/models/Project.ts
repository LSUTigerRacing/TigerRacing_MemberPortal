import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { User } from "./User.js";

import { projectPriority, subsystems } from "../enums.js";

export const Project = pgTable("project", t => ({
    id: t.uuid().primaryKey().defaultRandom(),
    authorId: t.uuid().notNull().references(() => User.id, { onDelete: "cascade" }),

    name: t.text().notNull(),
    description: t.text(),
    subsystem: subsystems().notNull(),
    priority: projectPriority().notNull(),

    startDate: t.timestamp({ withTimezone: true }).notNull(),
    deadline: t.timestamp({ withTimezone: true }).notNull(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
}));

export const ProjectTask = pgTable("project_task", t => ({
    id: t.uuid().primaryKey().defaultRandom(),
    projectId: t.uuid().notNull().references(() => Project.id, { onDelete: "cascade" }),
    authorId: t.uuid().notNull().references(() => User.id, { onDelete: "cascade" }),
    assigneeId: t.uuid().references(() => User.id, { onDelete: "set null" }),

    name: t.text().notNull(),
    description: t.text(),
    status: t.boolean().notNull().default(false),
    deadline: t.timestamp({ withTimezone: true }).notNull(),

    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: t.timestamp({ withTimezone: true }).notNull().defaultNow()
}));

export const ProjectUser = pgTable("project_user", t => ({
    projectId: t.uuid().notNull().references(() => Project.id, { onDelete: "cascade" }),
    userId: t.uuid().notNull().references(() => User.id, { onDelete: "cascade" })
}), t => [
    primaryKey({ columns: [t.projectId, t.userId] })
]);

export const ProjectRelations = relations(Project, ({ one, many }) => ({
    author: one(User, {
        fields: [Project.authorId],
        references: [User.id]
    }),
    tasks: many(ProjectTask),
    members: many(ProjectUser)
}));

export const ProjectUserRelations = relations(ProjectUser, ({ one }) => ({
    project: one(Project, {
        fields: [ProjectUser.projectId],
        references: [Project.id]
    }),
    user: one(User, {
        fields: [ProjectUser.userId],
        references: [User.id]
    })
}));
