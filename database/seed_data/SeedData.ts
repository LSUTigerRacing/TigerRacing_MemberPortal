import { drizzle } from 'drizzle-orm/node-postgres';
import { seed } from 'drizzle-seed';
import postgres from 'postgres';

import { User } from '../src/models/User.ts';
import { Project, ProjectTask, ProjectUser } from '../src/models/Project.ts';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
}

const db = drizzle(connectionString);
await seedData(db);

async function seedData(db: ReturnType<typeof drizzle>) {

    await db.delete(ProjectUser).execute();
    await db.delete(ProjectTask).execute();
    await db.delete(Project).execute();
    await db.delete(User).execute();
    
    const schema = { User, Project };

    await seed(db, schema, { seed: 1 }).refine((f) => ({
        User: {
            count: 5,
            columns: {
                role: f.valuesFromArray({
                    values: ["Superadmin", "Admin", "System Lead", "Subsystem Lead", "Member"],
                    isUnique: true
                }),
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

    const userId = await db
    .select({
      id: User.id,
    })
    .from(User);
    const userIdArray = userId.map(u => u.id)

    const projectId = await db
    .select({
      id: Project.id,
    })
    .from(Project);
    const projectIdArray = projectId.map(u => u.id)

    await seed(db, { ProjectTask }, { seed: 1 }).refine((f) => ({
        ProjectTask: {
            count: 10,
            columns: {
                name: f.city({ isUnique: true}),
                projectId: f.valuesFromArray({
                    values: projectIdArray,
                }),
                authorId: f.valuesFromArray({
                    values: userIdArray,
                }),
                assigneeId: f.valuesFromArray({
                    values: userIdArray,
                }),
            }
        }
    }));

    const projectUserPairs = [];
    for (const projId of projectIdArray) {
        for (const usrId of userIdArray) {
            projectUserPairs.push({ projectId: projId, userId: usrId });
        }
    }

    await db.insert(ProjectUser).values(projectUserPairs).execute();
}
