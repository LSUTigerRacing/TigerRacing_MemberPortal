// Board that contains all of the Tasks and Columns and their implementations
// Contains the dialog for column creation
// Contains functions for Dragging, Creation of Task and Columns, Moving of Columns, Updating and Editing Tasks and Columns

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Circle } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  type DragEndEvent,
  type DragStartEvent,
  PointerSensor,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import { dummyColumns, dummyTasks } from "@/lib/dummyData/dummyTasks";

const buttonColors = [
  "bg-gray-600",
  "bg-blue-400",
  "bg-green-500",
  "bg-yellow-500",
  "bg-orange-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-purple-500",
];

const strokeColors = [
  "stroke-gray-900",
  "stroke-blue-900",
  "stroke-green-900",
  "stroke-yellow-900",
  "stroke-orange-900",
  "stroke-red-900",
  "stroke-pink-900",
  "stroke-purple-900",
];

export type Id = string | number;

export type Column = {
  id: Id;
  color: string;
  colorIndex: number;
  title: string;
  description: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
  taskDescription: string;
  startDate?: Date;
  endDate?: Date;
  priority?: "High" | "Medium" | "Low";
  tags?: string[];
  assignees?: string[];
  attachments?: File[];
};

interface KanbanBoardProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function KanbanBoard({ columns, setColumns, tasks, setTasks }: KanbanBoardProps) {
  const [userTitle, setUserTitle] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [isSelected, setIsSelected] = useState<number>(0);
  const [columnColor, setColumnColor] = useState<string>(buttonColors[0]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);

  const resetToDefaultData = () => {
    setColumns(dummyColumns);
    setTasks(dummyTasks);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    if (editingColumn) {
      setUserTitle(editingColumn.title);
      setUserDescription(editingColumn.description);
      setColumnColor(editingColumn.color);
      setIsSelected(editingColumn.colorIndex);
      setColumnDialogOpen(true);
    }
  }, [editingColumn]);
  useEffect(() => {
    if (!columnDialogOpen) {
      setUserTitle("");
      setUserDescription("");
      setIsSelected(0);
      setColumnColor(buttonColors[0]);
      setColumnDialogOpen(false);
      setEditingColumn(null);
    }
  }, [columnDialogOpen]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="m-auto flex mt-2 h-full overflow-x-auto">
        <Dialog open={columnDialogOpen} onOpenChange={setColumnDialogOpen}>
          <SortableContext items={columnsId}>
            <div className="flex gap-4 h-full">
              {columns.map((col, index) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  editingTask={editingTask}
                  setEditingTask={setEditingTask}
                  setEditingColumn={setEditingColumn}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  moveColumnLeft={moveColumnLeft}
                  moveColumnRight={moveColumnRight}
                  columnIndex={index}
                  totalColumns={columns.length}
                />
              ))}
            </div>
          </SortableContext>
          <div className="flex">
            <DialogTrigger asChild>
              {columns.length === 0 ? (
                // Initial button
                <Button variant="outline" className="h-full w-[23vw] p-4 cursor-pointer">
                  <Plus />
                  Create Column
                </Button>
              ) : (
                // After first column
                <Button variant="outline" size="icon" className="ml-4 cursor-pointer">
                  <Plus />
                </Button>
              )}
            </DialogTrigger>
            <Button variant="outline" className="ml-4 cursor-pointer" onClick={resetToDefaultData}>
              Reset to Dummy Data
            </Button>
          </div>
          <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingColumn ? "Edit column" : "Create new column"}</DialogTitle>
              <div className="pt-2">
                <Separator />
              </div>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Status Text</Label>
                <Input value={userTitle} onChange={(e) => setUserTitle(e.target.value)} />
              </div>
              <div className="grid gap-3">
                <Label>Color</Label>
                <div className="flex gap-2">
                  {buttonColors.map((color, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => selectedButton(color, i)}
                      className={`h-10 w-10 cursor-pointer ${color} ${
                        isSelected === i ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <Circle className={strokeColors[i]} />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <Label>Description</Label>
                <Textarea
                  className="h-40"
                  placeholder="Type your message here."
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingColumn(null);
                    setUserTitle("");
                    setUserDescription("");
                    setIsSelected(0);
                    setColumnColor(buttonColors[0]);
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleColumnSubmit} className="cursor-pointer">
                  {editingColumn ? "Save" : "Create"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DragOverlay>
        {activeTask && (
          <TaskCard
            task={activeTask}
            column={columns.find((c) => c.id === activeTask.columnId) as Column}
            deleteTask={() => {}}
            setEditingTask={() => {}}
          />
        )}
      </DragOverlay>
    </DndContext>
  );

  function createTask(
    columnId: Id,
    title: string,
    description: string,
    startDate?: Date,
    endDate?: Date,
    priority?: "High" | "Medium" | "Low",
    tags?: string[],
    assignees?: string[],
    attachments?: File[]
  ) {
    const newTask: Task = {
      id: generatedId(),
      columnId,
      content: title,
      taskDescription: description,
      startDate,
      endDate,
      priority: priority || "Medium",
      tags: tags || [],
      assignees: assignees || [],
      attachments: attachments || [],
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generatedId(),
      color: columnColor,
      colorIndex: isSelected,
      title: userTitle,
      description: userDescription,
    };
    setIsSelected(0);
    setColumnColor(buttonColors[0]);
    setColumns([...columns, columnToAdd]);
    setUserTitle("");
    setUserDescription("");
  }

  function handleColumnSubmit() {
    if (editingColumn) {
      updateColumn(editingColumn.id, userTitle, userDescription, columnColor, isSelected);
      setEditingColumn(null);
    } else {
      createNewColumn();
    }
    setUserTitle("");
    setUserDescription("");
    setIsSelected(0);
    setColumnColor(buttonColors[0]);
    setColumnDialogOpen(false);
    setEditingColumn(null);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveAColumn && isOverAColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        if (activeColumnIndex === -1 || overColumnIndex === -1) return columns;

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      });
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeTaskId);
        const overIndex = tasks.findIndex((task) => task.id === overTaskId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeTaskId);

        tasks[activeIndex].columnId = overTaskId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  function selectedButton(color: string, index: number) {
    setIsSelected(index);
    setColumnColor(color);
  }

  function updateTask(
    taskId: Id,
    title: string,
    description: string,
    startDate?: Date,
    endDate?: Date,
    priority?: "High" | "Medium" | "Low",
    tags?: string[],
    assignees?: string[],
    attachments?: File[]
  ) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              content: title,
              taskDescription: description,
              startDate,
              endDate,
              priority,
              tags,
              assignees,
              attachments,
            }
          : task
      )
    );
  }

  function updateColumn(
    columnId: Id,
    title: string,
    description: string,
    color: string,
    colorIndex: number
  ) {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, title, description, color, colorIndex } : col
      )
    );
  }

  function moveColumnLeft(id: Id) {
    setColumns((prev) => {
      const index = prev.findIndex((col) => col.id === id);
      if (index <= 0) return prev;

      const newCols = [...prev];
      [newCols[index - 1], newCols[index]] = [newCols[index], newCols[index - 1]];
      return newCols;
    });
  }

  function moveColumnRight(id: Id) {
    setColumns((prev) => {
      const index = prev.findIndex((col) => col.id === id);
      if (index === -1 || index >= prev.length - 1) return prev;

      const newCols = [...prev];
      [newCols[index], newCols[index + 1]] = [newCols[index + 1], newCols[index]];
      return newCols;
    });
  }
}

function generatedId() {
  return Date.now();
}
