// Root file that handles all of the Tasks and Columns
// Includes states for information that needs to be passed between MyTask Tab components and Overall Tab components
// Filtering states that are also passed down

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearnMore } from "@/components/ui/task-components/LearnMore";
import { MyTask } from "@/components/ui/task-components/MyTaskContent";
import { KanbanBoard } from "@/components/ui/task-components/KanbanBoard";
import type { Task, Column, Id } from "@/components/ui/task-components/KanbanBoard";
import { useState, useEffect } from "react";
import { TaskTable } from "@/components/ui/task-components/MyTaskTable";
import { FilterCommandBar } from "@/components/ui/task-components/Filter";
import { dummyColumns, dummyTasks } from "@/lib/dummyData/dummyTasks";

export default function MemberTabs() {
  const [selectedColumnId, setSelectedColumnId] = useState<Id | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<"High" | "Medium" | "Low" | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [overallSelectedColumns, setOverallSelectedColumns] = useState<Id[]>([]);
  const [overallSelectedAssignees, setOverallSelectedAssignees] = useState<string[]>([]);
  const [overallSelectedPriority, setOverallSelectedPriority] = useState<string[]>([]);
  const [overallSelectedStartDates, setOverallSelectedStartDates] = useState<string[]>([]);
  const [overallSelectedEndDates, setOverallSelectedEndDates] = useState<string[]>([]);
  const [overallSelectedLabels, setOverallSelectedLabels] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("my-task");
  const [myTaskFilters, setMyTaskFilters] = useState({
    statuses: [] as string[],
    assignees: [] as string[],
    priorities: [] as string[],
    labels: [] as string[],
    startDates: [] as string[],
    endDates: [] as string[],
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedData = localStorage.getItem("myTaskData");
    return savedData ? JSON.parse(savedData) : dummyTasks;
  });

  const [columns, setColumns] = useState<Column[]>(() => {
    const savedData = localStorage.getItem("myColumnData");
    return savedData ? JSON.parse(savedData) : dummyColumns;
  });

  useEffect(() => {
    localStorage.setItem("myTaskData", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("myColumnData", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    if (activeTab === "my-task") {
      setSelectedColumnId(null);
      setSelectedAssignee(null);
      setSelectedPriority(null);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setSelectedLabel(null);
    } else {
      setOverallSelectedColumns([]);
      setOverallSelectedAssignees([]);
      setOverallSelectedPriority([]);
      setOverallSelectedStartDates([]);
      setOverallSelectedEndDates([]);
      setOverallSelectedLabels([]);
    }
  }, [activeTab]);

  const filteredTasks = tasks.filter((task) => {
    if (
      myTaskFilters.statuses.length > 0 &&
      !myTaskFilters.statuses.includes(String(task.columnId))
    )
      return false;

    if (
      myTaskFilters.assignees.length > 0 &&
      !task.assignees?.some((a) => myTaskFilters.assignees.includes(a))
    )
      return false;

    if (
      myTaskFilters.priorities.length > 0 &&
      !myTaskFilters.priorities.includes(task.priority ?? "")
    )
      return false;

    if (myTaskFilters.startDates.length > 0) {
      const formatted = task.startDate ? new Date(task.startDate).toLocaleDateString("en-US") : "";
      if (!myTaskFilters.startDates.includes(formatted)) return false;
    }

    if (myTaskFilters.endDates.length > 0) {
      const formatted = task.endDate ? new Date(task.endDate).toLocaleDateString("en-US") : "";
      if (!myTaskFilters.endDates.includes(formatted)) return false;
    }

    if (
      myTaskFilters.labels.length > 0 &&
      !task.tags?.some((tag) => myTaskFilters.labels.includes(tag))
    )
      return false;

    return true;
  });

  const overallFiltered = tasks.filter((task) => {
    if (overallSelectedColumns.length > 0 && !overallSelectedColumns.includes(task.columnId)) {
      return false;
    }

    if (
      overallSelectedAssignees.length > 0 &&
      !task.assignees?.some((assignee) => overallSelectedAssignees.includes(assignee))
    ) {
      return false;
    }

    if (
      overallSelectedPriority.length > 0 &&
      !overallSelectedPriority.includes(task.priority ?? "")
    ) {
      return false;
    }

    if (overallSelectedStartDates.length > 0) {
      const formatted = task.startDate ? new Date(task.startDate).toLocaleDateString("en-US") : "";
      if (!overallSelectedStartDates.includes(formatted)) return false;
    }

    if (overallSelectedEndDates.length > 0) {
      const formatted = task.endDate ? new Date(task.endDate).toLocaleDateString("en-US") : "";
      if (!overallSelectedEndDates.includes(formatted)) return false;
    }

    if (overallSelectedLabels.length > 0) {
      if (!task.tags?.some((tag) => overallSelectedLabels.includes(tag))) return false;
    }

    return true;
  });

  return (
    <div className="flex h-[calc(100dvh-67px)] xl:h-screen flex-col">
      <div className="w-full px-4 pt-3 pb-1 flex xl:mt-16.75">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">Project Title</h1>
        <div className="ml-auto flex items-center">
          <LearnMore />
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="justify-start grid grid-cols-2 sm:gap-2 sm:pl-5 bg-transparent">
          <TabsTrigger
            value="my-task"
            className="h-11 rounded-none px-4 text-sm font-medium cursor-pointer
              data-[state=active]:bg-white w-[50svw] sm:w-[10vw]"
          >
            My Task
          </TabsTrigger>
          <TabsTrigger
            value="overall"
            className="h-11 rounded-none px-4 text-sm font-medium cursor-pointer
              data-[state=active]:bg-white w-[50svw] sm:w-[10vw]"
          >
            Overall
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my-task" className="flex-1 mt-0 bg-white p-0 min-h-0">
          <div className="p-5 sm:gap-8 justify-center flex flex-col sm:flex-row text-gray-500 h-auto bg-white">
            <div className="sm:hidden">
              <FilterCommandBar
                columns={columns}
                tasks={tasks}
                filters={myTaskFilters}
                updateFilters={(key, next) => {
                  setMyTaskFilters((prev) => ({
                    ...prev,
                    [key]: next,
                  }));
                }}
              />
            </div>
            <div className="hidden sm:block">
              <MyTask
                columns={columns}
                tasks={tasks}
                onColumnSelect={setSelectedColumnId}
                onAssigneeSelect={setSelectedAssignee}
                onPrioritySelect={setSelectedPriority}
                onStartDateSelect={setSelectedStartDate}
                onEndDateSelect={setSelectedEndDate}
                onLabelSelect={setSelectedLabel}
                selectedColumnId={selectedColumnId}
                selectedAssignee={selectedAssignee}
                selectedPriority={selectedPriority}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                selectedLabel={selectedLabel}
              />
            </div>
            <div className="flex flex-col w-full">
              <TaskTable
                columns={columns}
                tasks={filteredTasks}
                selectedColumnId={selectedColumnId}
                selectedAssignee={selectedAssignee}
                selectedPriority={selectedPriority}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                selectedLabel={selectedLabel}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="overall" className="flex-1 mt-0 bg-white p-0 min-h-0">
          <div className="p-5 justify-center text-gray-500 h-full">
            <div className="h-full flex flex-col">
              <FilterCommandBar
                columns={columns}
                tasks={tasks}
                filters={{
                  statuses: overallSelectedColumns.map(String),
                  assignees: overallSelectedAssignees,
                  priorities: overallSelectedPriority,
                  labels: overallSelectedLabels,
                  startDates: overallSelectedStartDates,
                  endDates: overallSelectedEndDates,
                }}
                updateFilters={(key, next) => {
                  if (key === "statuses") setOverallSelectedColumns(next.map(Number));
                  if (key === "assignees") setOverallSelectedAssignees(next);
                  if (key === "priorities") setOverallSelectedPriority(next);
                  if (key === "labels") setOverallSelectedLabels(next);
                  if (key === "startDates") setOverallSelectedStartDates(next);
                  if (key === "endDates") setOverallSelectedEndDates(next);
                }}
              />
              <div className="flex-1 min-h-0">
                <KanbanBoard
                  columns={columns}
                  setColumns={setColumns}
                  tasks={overallFiltered}
                  setTasks={setTasks}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
