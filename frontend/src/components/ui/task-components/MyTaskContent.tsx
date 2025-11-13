import { FilterDropDown } from "@/components/ui/task-components/MyTaskDropdown";
import { Card } from "@/components/ui/shadcn-components/card";
import type { Column, Task } from "./KanbanBoard";
import { useState } from "react";

interface Props {
  columns: Column[];
  tasks: Task[];
}

export function MyTask(props: Props) {
  const { 
    columns, 
    tasks
    } = props;
    
  const [selectedFilter, setSelectedFilter] = useState<string>("Overall");

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <div className="w-[20vw] h-full shrink-0 border-r bg-background pl-1 flex flex-col items-start"> 
      <FilterDropDown 
        onValueChange={handleFilterChange}
        selectedValue={selectedFilter}
      />
      {selectedFilter === "Overall" && (
      <div className="flex-grow w-full mt-2 overflow-y-auto">
        <div className="flex flex-col gap-3 p-2">
          {columns.map((column) => {
            const columnTasks = tasks.filter(task => task.columnId === column.id);
            return (
              <Card key={column.id} className="p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <h3 className="font-medium">{column.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {columnTasks.length} {columnTasks.length === 1 ? 'task' : 'tasks'}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}