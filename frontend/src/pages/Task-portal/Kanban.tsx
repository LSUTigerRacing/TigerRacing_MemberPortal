import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { FilterSelection } from "@/components/ui/task-components/Filter";
import { ColumnCreation } from "@/components/ui/task-components/KanbanColumns";
import { Navbar } from "@/components/ui/NavBar/shadcn-io/navbar-06";
import { LearnMore } from "@/components/ui/task-components/LearnMore";
import { MyTask } from "@/components/ui/task-components/MyTaskContent";

export function MemberTabs () {
    return (
        <>
            <Navbar />
            <div>
                <div className="w-full">
                    <div className="flex bg-gray-100 px-4 pt-3 pb-1">
                        <h1 className="text-2xl font-semibold tracking-tight mb-3">Project Title</h1>
                        <div className="ml-auto flex items-center pr-10">
                            <LearnMore />
                        </div>
                    </div>
                </div>
                <Tabs defaultValue="my-task" className="bg-gray-100">
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

                    <TabsContent value="my-task" className="mt-0 bg-white p-0">
                        <div className="p-5 gap-10 justify-center flex text-gray-500">
                            <MyTask />
                            <FilterSelection />
                        </div>
                    </TabsContent>

                    <TabsContent value="overall" className="mt-0 bg-white p-0">
                        <div className="p-5 justify-center text-gray-500">
                            <FilterSelection />
                            <div className="">
                                <ColumnCreation />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
