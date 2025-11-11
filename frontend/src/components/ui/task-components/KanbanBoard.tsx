import { Button } from "@/components/ui/shadcn-components/button"
import { Label } from "@/components/ui/shadcn-components/label"
import { Input } from "@/components/ui/shadcn-components/input"
import { Separator } from "@/components/ui/shadcn-components/separator"
import { Textarea } from "@/components/ui/shadcn-components/textarea"
import { Plus, Circle } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { createPortal } from "react-dom"
import { ColumnContainer } from "./ColumnContainer";
import { 
    DndContext, 
    DragOverlay, 
    useSensors, useSensor, 
    type DragEndEvent, 
    type DragStartEvent, 
    PointerSensor, 
    type DragOverEvent
} from "@dnd-kit/core";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn-components/dialog"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { TaskCard } from "./TaskCard"

const buttonColors = [
    'bg-[#59636E]',
    'bg-[#DDF4FF]', 
    'bg-[#DAFBE1]',
    'bg-[#FFF8C5]',
    'bg-[#FFF1E5]',
    'bg-[#FFEBE9]',
    'bg-[#FFEFF7]',
    'bg-[#FBEFFF]'
  ];
  
  const strokeColors = [
    'stroke-[#25292E]',
    'stroke-[#1D76DD]', 
    'stroke-[#1A7F37]',
    'stroke-[#9A6700]',
    'stroke-[#BC4C00]',
    'stroke-[#DA4E57]',
    'stroke-[#BF3989]',
    'stroke-[#8250DF]'
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
    id: Id,
    columnId: Id,
    content: string;
    taskDescription: string;
};

interface KanbanBoardProps {
    columns: Column[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  }

export function KanbanBoard({ columns, setColumns, tasks, setTasks }: KanbanBoardProps) {
    const [userTitle, setUserTitle] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [isSelected, setIsSelected] = useState<number>(0);
    const [columnColor, setColumnColor] = useState<string>(buttonColors[0]);

    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null> (null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    )

    return (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
            <div className="m-auto flex mt-2 h-full overflow-x-auto">
                <Dialog>
                    <div className="flex gap-4 h-full overflor-x-auto">
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <ColumnContainer
                                key={col.id}
                                column={col}
                                deleteColumn={deleteColumn} 
                                createTask={createTask}
                                deleteTask={deleteTask}
                                tasks={tasks.filter(
                                    (task) => task.columnId === col.id)}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <div>
                    <DialogTrigger asChild>
                    {columns.length === 0 ? (
                    // Initial button
                    <Button variant="outline" className="h-full w-70 p-4">
                        <Plus />
                        Create Column
                    </Button>
                    ) : (
                    // After first column
                    <Button variant="outline" size="icon" className="ml-4">
                        <Plus />
                    </Button>
                    )}
                    </DialogTrigger>
                    </div>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new column</DialogTitle>
                    <div className="pt-2">
                        <Separator />
                    </div>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label>Status Text</Label>
                        <Input
                        value={userTitle}
                        onChange={(e) => setUserTitle(e.target.value)}
                        />
                    </div>
                <div className="grid gap-3">
                <Label>Color</Label>
                    <div className="flex gap-2">
                        {buttonColors.map((color, i) => (
                            <Button key={i} variant="outline" onClick={() => selectedButton(color, i)} className={`h-10 w-10 ${color} ${isSelected === i ? 'ring-2 ring-blue-500' : ''}`}>
                            <Circle className={strokeColors[i]} />
                            </Button>
                        ))}
                    </div>
                </div>
                    <div className="grid gap-3">
                        <Label>Description</Label>
                        <Textarea className="h-40" placeholder="Type your message here."
                        value={userDescription}
                        onChange={(e) => setUserDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={createNewColumn}>Create</Button>
                    </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
            
            {createPortal(
                <DragOverlay>
                    {activeColumn && (
                        <ColumnContainer 
                            column={activeColumn}
                            deleteColumn={deleteColumn} 
                            createTask={createTask}
                            deleteTask={deleteTask}
                            tasks={tasks.filter(
                                (task) => task.columnId === activeColumn.id)}
                             />
                    )}
                    {activeTask && (
                        <TaskCard 
                            task={activeTask} 
                            deleteTask={deleteTask}
                        />
                    )}
                </DragOverlay>, 
                document.body
            )}
        </DndContext>
    );

    function createTask(columnId: Id, title: string, description: string) {
        const newTask: Task = {
            id: generatedId(),
            columnId,
            content: title,
            taskDescription: description,
        };
        console.log('Creating task:', newTask);
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
        setUserTitle('');
        setUserDescription('');
    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter(col => col.id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((t) => t.columnId !== id);
        setTasks(newTasks);
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column"){
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task"){
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent){
        setActiveTask(null);
        setActiveColumn(null);

        const { active, over } = event;
        if (!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeColumnId);

            const overColumnIndex = columns.findIndex(
                (col) => col.id === overColumnId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
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
                const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);
                const overIndex = tasks.findIndex((t) => t.id === overTaskId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => 
                    t.id === activeTaskId);

                tasks[activeIndex].columnId = overTaskId;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
    
    function selectedButton(color: string, index: number) {
        setIsSelected(index);
        setColumnColor(color);
    }
}

function generatedId() {
    return Date.now();
}