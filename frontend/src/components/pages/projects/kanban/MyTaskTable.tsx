// Task Table that contains all of the information displayed in the Kanban Board
// With the integration of the MyTaskContent, allows for specific filtering of the Task and Columns in the form of a table

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Column, Id, Task } from "./KanbanBoard.js";
import { TaskSheet } from "./TaskSheet.js";
import { availableTags, priorityStyles } from "@/lib/dummyData/dummyTasks";

interface Props {
    columns: Column[]
    tasks: Task[]
    selectedColumnId?: Id | null
    selectedAssignee?: string | null
    selectedPriority?: "High" | "Medium" | "Low" | null
    selectedStartDate?: string | null
    selectedEndDate?: string | null
    selectedLabel?: string | null
}

export function TaskTable ({
    columns,
    tasks,
    selectedColumnId,
    selectedAssignee,
    selectedPriority,
    selectedStartDate,
    selectedEndDate,
    selectedLabel
}: Props) {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        columns.forEach(col => {
            initial[col.id.toString()] = true;
        });
        return initial;
    });

    const formatDateForComparison = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        });
    };

    const visibleColumns = useMemo(() => {
        if (selectedColumnId) {
            return columns.filter(col => col.id === selectedColumnId);
        }

        if (selectedAssignee) {
            return columns.filter(column => {
                return tasks.some(
                    task => task.columnId === column.id && task.assignees?.includes(selectedAssignee)
                );
            });
        }

        if (selectedPriority) {
            return columns.filter(column => {
                return tasks.some(
                    task => task.columnId === column.id && task.priority === selectedPriority
                );
            });
        }

        if (selectedStartDate) {
            return columns.filter(column => {
                return tasks.some(
                    task =>
                        task.columnId === column.id
                        && task.startDate
                        && formatDateForComparison(task.startDate) === selectedStartDate
                );
            });
        }

        if (selectedEndDate) {
            return columns.filter(column => {
                return tasks.some(
                    task =>
                        task.columnId === column.id
                        && task.endDate
                        && formatDateForComparison(task.endDate) === selectedEndDate
                );
            });
        }

        if (selectedLabel) {
            return columns.filter(column => {
                return tasks.some(
                    task => task.columnId === column.id && task.tags?.includes(selectedLabel)
                );
            });
        }
        return columns;
    }, [
        columns,
        selectedColumnId,
        selectedAssignee,
        selectedPriority,
        selectedStartDate,
        selectedEndDate,
        selectedLabel,
        tasks
    ]);

    const groupedTasks = useMemo(() => {
        const grouped: Record<string, Task[]> = {};

        visibleColumns.forEach(column => {
            let columnTasks = tasks.filter(task => task.columnId === column.id);

            if (selectedAssignee) {
                columnTasks = columnTasks.filter(task => task.assignees?.includes(selectedAssignee));
            }

            if (selectedPriority) {
                columnTasks = columnTasks.filter(task => task.priority === selectedPriority);
            }

            if (selectedStartDate) {
                columnTasks = columnTasks.filter(
                    task => task.startDate && formatDateForComparison(task.startDate) === selectedStartDate
                );
            }

            if (selectedEndDate) {
                columnTasks = columnTasks.filter(
                    task => task.endDate && formatDateForComparison(task.endDate) === selectedEndDate
                );
            }

            if (selectedLabel) {
                columnTasks = columnTasks.filter(task => task.tags?.includes(selectedLabel));
            }

            grouped[column.id.toString()] = columnTasks;
        });

        return grouped;
    }, [
        tasks,
        visibleColumns,
        selectedAssignee,
        selectedPriority,
        selectedStartDate,
        selectedEndDate,
        selectedLabel
    ]);

    const toggleGroup = (columnId: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [columnId]: !prev[columnId]
        }));
    };

    const formatDate = (date?: Date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        });
    };

    return (
        <div className="w-full space-y-4 pt-4 pb-10">
            {visibleColumns.length === 0 && (
                <div className="text-center text-gray-500 py-8 border rounded-lg bg-gray-50">
                    No columns with tasks for the selected filter
                </div>
            )}
            {visibleColumns.map(column => {
                const columnTasks = groupedTasks[column.id.toString()] || [];
                const isExpanded = expandedGroups[column.id.toString()];
                return (
                    <div key={column.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                        <div
                            className="flex items-center gap-3 bg-gray-100 p-3 cursor-pointer hover:bg-gray-200 transition-colors"
                            onClick={() => toggleGroup(column.id.toString())}
                        >
                            {isExpanded
                                ? (
                                    <ChevronDown className="h-4 w-4 text-gray-600" />
                                )
                                : (
                                    <ChevronRight className="h-4 w-4 text-gray-600" />
                                )}
                            <div className={`${column.color} rounded-full`}>
                                <div className="w-3 h-3 rounded-full" />
                            </div>
                            <span className="font-semibold text-lg">{column.title}</span>
                            <div className="border-1 bg-gray-300 rounded-full w-5 justify-center flex">
                                <span className="text-sm text-gray-600 font-medium pt-1">{columnTasks.length}</span>
                            </div>
                        </div>
                        {isExpanded && (
                            <Table className="table-fixed w-full">
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                                        <TableHead className="w-12 text-center font-semibold">#</TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">Title</div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">Priority</div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">Label</div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">Start date</div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">Due date</div>
                                        </TableHead>
                                        <TableHead>
                                            <div className="flex items-center gap-2">Status</div>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {columnTasks.length > 0
                                        ? (
                                            <>
                                                {columnTasks.map((task, index) => (
                                                    <TableRow key={task.id} className="hover:bg-gray-50 cursor-pointer">
                                                        <TableCell className="text-center text-gray-500 font-medium">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            <TaskSheet task={task} column={column} truncate />
                                                        </TableCell>
                                                        <TableCell>
                                                            {task.priority && (
                                                                <Badge className={priorityStyles[task.priority]}>
                                                                    {task.priority}
                                                                </Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {task.tags && task.tags.length > 0
                                                                ? (
                                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                                        {task.tags.slice(0, 3).map(tagValue => {
                                                                            const tag = availableTags.find(tag => tag.value === tagValue);
                                                                            if (!tag) return null;
                                                                            return (
                                                                                <Badge
                                                                                    key={tagValue}
                                                                                    className={`${tag.color} text-white text-xs`}
                                                                                >
                                                                                    {tag.label}
                                                                                </Badge>
                                                                            );
                                                                        })}
                                                                        {task.tags.length > 3 && (
                                                                            <Badge variant="outline" className="text-xs">
                                                                                +{task.tags.length - 3}
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                )
                                                                : (
                                                                    <p className="text-sm">To Be Determined</p>
                                                                )}
                                                        </TableCell>
                                                        <TableCell>{formatDate(task.startDate)}</TableCell>
                                                        <TableCell>{formatDate(task.endDate)}</TableCell>
                                                        <TableCell>
                                                            <Badge className={`${column.color} text-white`}>{column.title}</Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        )
                                        : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                                                    No tasks in this column
                                                </TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
