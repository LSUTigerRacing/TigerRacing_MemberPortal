import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@/components/ui/table";
import type { Column, Task } from "./KanbanBoard";

interface Props {
    columns: Column[]
    tasks: Task[]
}

export function TaskTable ({ columns, tasks }: Props) {
    return (
        <div className="">
            {columns.map(column => {
                const columnTasks = tasks.filter(task => task.columnId === column.id);

                return (
                    <div key={column.id} className="mt-4 border-1">
                        <div className="flex items-center gap-2 border-1">
                            <div className={`w-3 h-3 rounded-full ${column.color}`} />
                            <h3 className="font-medium">{column.title}</h3>
                        </div>
                        <Table>
                            <TableBody className="border-1">
                                <TableRow>
                                    <TableHead className="w-[100px]">Task Title</TableHead>
                                </TableRow>
                                {columnTasks.map(task => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.content}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                );
            })}
        </div>
    );
}
