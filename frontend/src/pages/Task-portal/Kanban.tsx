import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { FilterSelection } from "@/components/ui/task-components/Filter";
import { Navbar06 } from "@/components/ui/NavBar/shadcn-io/navbar-06";
import { LearnMore } from "@/components/ui/task-components/LearnMore";
import { MyTask } from "@/components/ui/task-components/MyTaskContent";
import { KanbanBoard } from "@/components/ui/task-components/KanbanBoard";
import type { Task, Column } from "@/components/ui/task-components/KanbanBoard";
import { useState, useEffect } from "react";
import { TaskTable } from "@/components/ui/task-components/MyTaskTable";

export function MemberTabs () {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedData = localStorage.getItem("myTaskData");
        return savedData ? JSON.parse(savedData) : [];
    });
    const [columns, setColumns] = useState<Column[]>(() => {
        const savedData = localStorage.getItem("myColumnData");
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem("myTaskData", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("myColumnData", JSON.stringify(columns));
    }, [columns]);

    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="flex-shrink-0">
                    <Navbar06 />
                </div>
                <div className="w-full">
                    <div className="flex bg-gray-100 px-4 pt-3 pb-1">
                        <h1 className="text-2xl font-semibold tracking-tight mb-3">Project Title</h1>
                        <div className="ml-auto flex items-center pr-10">
                            <LearnMore />
                        </div>
                    </div>
                </div>
                <Tabs defaultValue="my-task" className="flex-1 bg-gray-100 flex flex-col min-h-0">
                    <TabsList className="justify-start grid grid-cols-2 gap-2 pl-5">
                        <TabsTrigger
                            value="my-task"
                            className="h-11 rounded-none px-4 text-sm font-medium
                data-[state=active]:bg-white
                data-[state=active]:shadow-none
                data-[state=inactive]:bg-gray-100
                "
                        >
                            My Task
                        </TabsTrigger>

                        <TabsTrigger
                            value="overall"
                            className="rounded-none px-4 text-sm font-medium border-0
                data-[state=active]:bg-white
                data-[state=active]:shadow-none
                data-[state=inactive]:bg-gray-100
                "
                        >
                            Overall
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="my-task" className="flex-1 mt-0 bg-white p-0 min-h-0">
                        <div className="p-5 gap-10 justify-center flex text-gray-500 h-full">
                            <MyTask columns={columns} tasks={tasks} />
                            <div className="flex flex-col w-full">
                                <FilterSelection />
                                <TaskTable columns={columns} tasks={tasks} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="overall" className="flex-1 mt-0 bg-white p-0 min-h-0">
                        <div className="p-5 justify-center text-gray-500 h-full">
                            <div className="h-full flex flex-col">
                                <FilterSelection />
                                <div className="flex-1 min-h-0">
                                    <KanbanBoard
                                        columns={columns}
                                        setColumns={setColumns}
                                        tasks={tasks}
                                        setTasks={setTasks}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
