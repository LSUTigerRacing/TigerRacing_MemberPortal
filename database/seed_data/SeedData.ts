import { drizzle } from "drizzle-orm/postgres-js";
import { seed, reset } from "drizzle-seed";
import postgres from "postgres";

import { User } from "../src/models/User.ts";
import { Project, ProjectTask, ProjectUser } from "../src/models/Project.ts";

async function seedData (db: ReturnType<typeof drizzle>) {
    // Reset the database 
    await reset(db, { User, Project, ProjectTask, ProjectUser });

    // Seed Users and Projects first for foreign keys
    await seed(db, { User, Project }).refine((functions) => ({
        User: {
            count: 5,
            columns: {
                role: functions.valuesFromArray({
                    values: ["Superadmin", "Admin", "System Lead", "Subsystem Lead", "Member"],
                    isUnique: true
                })
            }
        },
        Project: {
            count: 2,
            columns: {
                priority: functions.valuesFromArray({
                    values: ["High", "Low"],
                    isUnique: true
                })
            }
        }
    }));

    // get user and project ids and turn them into arrays of values instead of objects
    const userId = await db.select({
        id: User.id
    }).from(User);
    const userIdArray = userId.map(u => u.id);

    const projectId = await db.select({
        id: Project.id
    }).from(Project);
    const projectIdArray = projectId.map(p => p.id);

    // Seed ProjectTasks and ProjectUsers with foreign keys
    await seed(db, { ProjectTask }).refine((functions) => ({
        ProjectTask: {
            count: 10,
            columns: {
                projectId: functions.valuesFromArray({
                    values: projectIdArray
                }),
                authorId: functions.valuesFromArray({
                    values: userIdArray
                }),
                assigneeId: functions.valuesFromArray({
                    values: userIdArray
                })
            }
        }
    }));

    // 5 users choose 2 creates 10 pairs to hook up to tasks and projects
    // to make sure ProjectUser table is seeded with real users and projects instead of random ids that don't exist
    const projectUserPairs = [];
    for (const projId of projectIdArray) {
        for (const usrId of userIdArray) {
            projectUserPairs.push({ projectId: projId, userId: usrId });
        }
    }

    await db.insert(ProjectUser).values(projectUserPairs).execute();
}

// run the seed function
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
}

const client = postgres(connectionString);
const db = drizzle(client);

await seedData(db);
await client.end();
