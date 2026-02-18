// Sidebar for MyTask Tab filtering

import { FilterDropDown } from "@/components/pages/projects/kanban/MyTaskDropdown";
import { Card } from "@/components/ui/card";
import type { Column, Id, Task } from "./KanbanBoard.js";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { priorityLevels, availableTags, teamMembers } from "@/lib/dummyData/dummyTasks";

interface Props {
    columns: Column[]
    tasks: Task[]
    onColumnSelect: (columnId: Id | null) => void
    onAssigneeSelect: (assignee: string | null) => void
    onPrioritySelect: (priority: "High" | "Medium" | "Low" | null) => void
    onStartDateSelect: (date: string | null) => void
    onEndDateSelect: (date: string | null) => void
    onLabelSelect: (tag: string | null) => void
    selectedColumnId: Id | null
    selectedAssignee: string | null
    selectedPriority: "High" | "Medium" | "Low" | null
    selectedStartDate: string | null
    selectedEndDate: string | null
    selectedLabel: string | null
}

export function MyTask (props: Props) {
    const {
        columns,
        tasks,
        onColumnSelect,
        onAssigneeSelect,
        onPrioritySelect,
        onStartDateSelect,
        onEndDateSelect,
        onLabelSelect,
        selectedColumnId,
        selectedAssignee,
        selectedPriority,
        selectedStartDate,
        selectedEndDate,
        selectedLabel
    } = props;

    const [selectedFilter, setSelectedFilter] = useState<string>("Status");

    const getAssigneeColor = useMemo(() => {
        return (assignee: string) => {
            const member = teamMembers.find(member => member.value === assignee);
            return member?.color || "from-gray-400 to-gray-600";
        };
    }, []);

    const uniqueAssignees = useMemo(() => {
        const assigneeSet = new Set<string>();
        tasks.forEach(task => {
            task.assignees?.forEach(assignee => assigneeSet.add(assignee));
        });
        return Array.from(assigneeSet).sort();
    }, [tasks]);

    const uniqueStartDates = useMemo(() => {
        const dateSet = new Set<string>();
        tasks.forEach(task => {
            if (task.startDate) {
                const dateString = new Date(task.startDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric"
                });
                dateSet.add(dateString);
            }
        });
        return Array.from(dateSet).sort();
    }, [tasks]);

    const uniqueEndDates = useMemo(() => {
        const dateSet = new Set<string>();
        tasks.forEach(task => {
            if (task.endDate) {
                const dateString = new Date(task.endDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric"
                });
                dateSet.add(dateString);
            }
        });
        return Array.from(dateSet).sort();
    }, [tasks]);

    const uniqueTags = useMemo(() => {
        const tagSet = new Set<string>();
        tasks.forEach(task => {
            task.tags?.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, [tasks]);

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
        onColumnSelect(null);
        onAssigneeSelect(null);
        onPrioritySelect(null);
        onStartDateSelect(null);
        onEndDateSelect(null);
        onLabelSelect(null);
    };

    const handleClearSelection = () => {
        onColumnSelect(null);
        onAssigneeSelect(null);
        onPrioritySelect(null);
        onStartDateSelect(null);
        onEndDateSelect(null);
        onLabelSelect(null);
    };

    return (
        <div className="w-[20vw] h-auto shrink-0 border-r bg-background pl-1 pr-5 flex flex-col items-start">
            <FilterDropDown onValueChange={handleFilterChange} selectedValue={selectedFilter} />
            {selectedFilter === "Status" && (
                <div className="w-full mt-2 overflow-y-auto">
                    <div className="flex flex-col gap-3 p-2">
                        {columns.map(column => {
                            const columnTasks = tasks.filter(task => task.columnId === column.id);
                            const isSelected = selectedColumnId === column.id;
                            return (
                                <Card
                                    key={column.id}
                                    className={`p-3 hover:bg-accent transition-colors cursor-pointer ${
                                        isSelected ? "ring-2 ring-primary bg-accent" : ""
                                    }`}
                                    onClick={() => onColumnSelect(isSelected ? null : column.id)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-3 h-3 rounded-full ${column.color}`} />
                                        <h3 className="font-medium">{column.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {columnTasks.length} {columnTasks.length === 1 ? "task" : "tasks"}
                                    </p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}
            {selectedFilter === "Assignee" && (
                <div className="w-full mt-2 overflow-y-auto">
                    <div className="flex flex-col gap-3 p-2">
                        {uniqueAssignees.map(assignee => {
                            const assigneeTasks = tasks.filter(task => task.assignees?.includes(assignee));
                            const isSelected = selectedAssignee === assignee;
                            return (
                                <Card
                                    key={assignee}
                                    className={`p-3 hover:bg-accent transition-colors cursor-pointer ${
                                        isSelected ? "ring-2 ring-primary bg-accent" : ""
                                    }`}
                                    onClick={() => onAssigneeSelect(isSelected ? null : assignee)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                                            {assignee.charAt(0).toUpperCase()}
                                        </div>
                                        <h3 className="font-medium">{assignee}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {assigneeTasks.length} {assigneeTasks.length === 1 ? "task" : "tasks"}
                                    </p>
                                </Card>
                            );
                        })}
                        {uniqueAssignees.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No assignees found</p>
                        )}
                    </div>
                </div>
            )}
            {selectedFilter === "Priority" && (
                <div className="w-full mt-2 overflow-y-auto">
                    <div className="flex flex-col gap-3 p-2">
                        {priorityLevels.map(priority => {
                            const priorityTasks = tasks.filter(task => task.priority === priority.value);
                            const isSelected = selectedPriority === priority.value;
                            return (
                                <Card
                                    key={priority.value}
                                    className={`p-3 hover:bg-accent transition-colors cursor-pointer ${
                                        isSelected ? "ring-2 ring-primary bg-accent" : ""
                                    }`}
                                    onClick={() =>
                                        onPrioritySelect(
                                            isSelected ? null : (priority.value as "High" | "Medium" | "Low")
                                        )
                                    }
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                                        <h3 className="font-medium">{priority.value}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {priorityTasks.length} {priorityTasks.length === 1 ? "task" : "tasks"}
                                    </p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}
            {selectedFilter === "Start Date" && (
                <div className="w-full mt-2 overflow-y-auto">
                    <div className="flex flex-col gap-3 p-2">
                        {uniqueStartDates.map(date => {
                            const dateTasks = tasks.filter(task => {
                                if (!task.startDate) return false;
                                const taskDateString = new Date(task.startDate).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric"
                                });
                                return taskDateString === date;
                            });
                            const isSelected = selectedStartDate === date;
                            return (
                                <Card
                                    key={date}
                                    className={`p-3 hover:bg-accent transition-colors cursor-pointer ${
                                        isSelected ? "ring-2 ring-primary bg-accent" : ""
                                    }`}
                                    onClick={() => onStartDateSelect(isSelected ? null : date)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-blue-500" />
                                        <h3 className="font-medium">{date}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {dateTasks.length} {dateTasks.length === 1 ? "task" : "tasks"}
                                    </p>
                                </Card>
                            );
                        })}
                        {uniqueStartDates.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No start dates found</p>
                        )}
                    </div>
                </div>
            )}
            {selectedFilter === "End Date" && (
                <div className="w-full mt-2 overflow-y-auto">
                    <div className="flex flex-col gap-3 p-2">
                        {uniqueEndDates.map(date => {
                            const dateTasks = tasks.filter(task => {
                                if (!task.endDate) return false;
                                const taskDateString = new Date(task.endDate).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric"
                                });
                                return taskDateString === date;
                            });
                            const isSelected = selectedEndDate === date;
                            return (
                                <Card
                                    key={date}
                                    className={`p-3 hover:bg-accent transition-colors cursor-pointer ${
                                        isSelected ? "ring-2 ring-primary bg-accent" : ""
                                    }`}
                                    onClick={() => onEndDateSelect(isSelected ? null : date)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-red-500" />
                                        <h3 className="font-medium">{date}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {dateTasks.length} {dateTasks.length === 1 ? "task" : "tasks"}
                                    </p>
                                </Card>
                            );
                        })}
                        {uniqueEndDates.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No end dates found</p>
                        )}
                    </div>
                </div>
            )}
            {selectedFilter === "Label" && (
                <div className="w-full mt-2 overflow-y-auto">
                    <div className="flex flex-col gap-3 p-2">
                        {uniqueTags.map(tagValue => {
                            const tag = availableTags.find(tag => tag.value === tagValue);
                            const tagTasks = tasks.filter(task => task.tags?.includes(tagValue));
                            const isSelected = selectedLabel === tagValue;
                            const tagLabel = tag?.label || tagValue;
                            const tagColor = tag?.color || "bg-gray-500";
                            return (
                                <div
                                    key={tagValue}
                                    className={`p-3 rounded-lg border bg-white hover:bg-accent transition-colors cursor-pointer ${
                                        isSelected ? "ring-2 ring-primary bg-accent" : ""
                                    }`}
                                    onClick={() => onLabelSelect(isSelected ? null : tagValue)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${tagColor}`} />
                                            <h3 className="font-medium">{tagLabel}</h3>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{tagTasks.length}</span>
                                    </div>
                                    {tagTasks.length > 0 && (
                                        <div className="flex items-center -space-x-2 mt-2">
                                            {Array.from(new Set(tagTasks.flatMap(tag => tag.assignees || [])))
                                                .slice(0, 5)
                                                .map(assignee => (
                                                    <div
                                                        key={assignee}
                                                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${getAssigneeColor(
                                                            assignee
                                                        )} flex items-center justify-center text-white font-semibold text-xs shadow-sm border-2 border-white`}
                                                        title={assignee}
                                                    >
                                                        {assignee.charAt(0).toUpperCase()}
                                                    </div>
                                                ))}
                                            {Array.from(new Set(tagTasks.flatMap(tag => tag.assignees || []))).length
                                                > 5 && (
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xs border-2 border-white shadow-sm">
                                                    +
                                                    {Array.from(new Set(tagTasks.flatMap(tag => tag.assignees || [])))
                                                        .length - 5}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {uniqueTags.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No tags found</p>
                        )}
                    </div>
                </div>
            )}
            <Button
                variant="ghost"
                onClick={handleClearSelection}
                className="bg-white transition-colors flex ml-auto mr-2 cursor-pointer"
            >
                Clear Selection
            </Button>
        </div>
    );
}
