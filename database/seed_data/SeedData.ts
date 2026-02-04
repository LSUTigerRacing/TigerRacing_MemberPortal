import { drizzle } from "drizzle-orm/postgres-js";
import { seed, reset } from "drizzle-seed";
import postgres from "postgres";

import { User } from "../src/models/User.ts";
import { Project, ProjectTask, ProjectUser } from "../src/models/Project.ts";

async function seedData (db: ReturnType<typeof drizzle>) {
    // Reset the database so primary keys start from scratch
    await reset(db, { schema: { User, Project, ProjectTask, ProjectUser } });

    // Seed Users and Projects first for foreign keys
    const schemaOne = { User, Project };

    await seed(db, schemaOne, { seed: 1 }).refine(f => ({
        User: {
            count: 5,
            columns: {
                role: f.valuesFromArray({
                    values: ["Superadmin", "Admin", "System Lead", "Subsystem Lead", "Member"],
                    isUnique: true
                })
            }
        },
        Project: {
            count: 2,
            columns: {
                name: f.companyName({}),
                priority: f.valuesFromArray({
                    values: ["High", "Low"],
                    isUnique: true
                })
            }
        }
    }));

    // get arrays of userIds and projectIds for foreign key references
    const userId = await db
        .select({
            id: User.id
        })
        .from(User);
    const userIdArray = userId.map(u => u.id);

    const projectId = await db
        .select({
            id: Project.id
        })
        .from(Project);
    const projectIdArray = projectId.map(u => u.id);

    // Seed ProjectTasks and ProjectUsers
    await seed(db, { ProjectTask }, { seed: 1 }).refine(f => ({
        ProjectTask: {
            count: 10,
            columns: {
                name: f.city({ isUnique: true }),
                projectId: f.valuesFromArray({
                    values: projectIdArray
                }),
                authorId: f.valuesFromArray({
                    values: userIdArray
                }),
                assigneeId: f.valuesFromArray({
                    values: userIdArray
                })
            }
        }
    }));

    // Manually seed ProjectUser many-to-many relationships to ensure users
    // working on the tasks and projects are seeded users
    const projectUserPairs = [];
    for (const projId of projectIdArray) {
        for (const usrId of userIdArray) {
            projectUserPairs.push({ projectId: projId, userId: usrId });
        }
    }

    await db.insert(ProjectUser).values(projectUserPairs).execute();
}

// Load connection string from .env file
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
}

const client = postgres(connectionString);
const db = drizzle(client);

await seedData(db);
await client.end();
