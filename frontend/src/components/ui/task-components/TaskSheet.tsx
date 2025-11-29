// Task Sheet component that allows for the display of task information

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Column, Task } from "./KanbanBoard";
import { Badge } from "../badge";
import { Avatar, AvatarFallback } from "../avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { teamMembers, availableTags } from "@/lib/dummyData/dummyTasks";
import { PaperclipIcon } from "lucide-react";

interface Props {
  task: Task;
  column: Column;
  truncate?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TaskSheet({ task, column, truncate, onOpenChange }: Props) {
  return (
    <div className=" min-w-0 pl-2 justify-start">
      <Sheet modal={false} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <span style={{ cursor: "pointer" }}>
            <p
              className={
                "font-semibold text-black hover:text-blue-700 hover:underline " +
                (truncate
                  ? "truncate whitespace-nowrap overflow-hidden text-ellipsis"
                  : "whitespace-normal break-words")
              }
            >
              {task.content}
            </p>
          </span>
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          className="min-w-[67vw] top-16 h-auto rounded-l-3xl border-1"
        >
          <SheetHeader className="">
            <SheetTitle className="">
              <p className="font-semibold text-black whitespace-normal break-words">
                {task.content}
              </p>
            </SheetTitle>
          </SheetHeader>
          <Separator className="-mt-4" />
          <div className="flex gap-4 min-h-0">
            <div className="flex flex-col mb-5 ml-3 w-full">
              <div className="flex min-h-[50vh] p-3 border-1 overflow-y-auto">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{task.taskDescription}</ReactMarkdown>
                </div>
              </div>
              <div className="pt-4">
                <Label className="text-sm font-semibold">Attachments</Label>
                {task.attachments && task.attachments.length > 0 ? (
                  <div className="flex flex-col gap-2 mt-2">
                    {task.attachments.map((file, index) => {
                      if (!(file instanceof File)) {
                        return (
                          <div key={index} className="text-sm text-gray-500 italic">
                            <PaperclipIcon className="h-3 w-3" /> Invalid file
                          </div>
                        );
                      }
                      return (
                        <a
                          key={index}
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 underline truncate flex gap-2 items-center"
                        >
                          <PaperclipIcon className="h-3 w-3" />
                          {file.name}
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 italic">No attachments</p>
                )}
              </div>
            </div>
            <div className="min-w-[18vw] pl-5 flex flex-col gap-5">
              <div>
                <Label className="text-sm font-semibold">Assignee</Label>
                {task.assignees && task.assignees.length > 0 ? (
                  <div className="flex -space-x-2 mt-2">
                    {task.assignees.slice(0, 3).map((assigneeValue) => {
                      const member = teamMembers.find((member) => member.value === assigneeValue);
                      if (!member) return null;
                      return (
                        <Avatar key={assigneeValue} className="h-6 w-6 border-2 border-white">
                          <AvatarFallback className={`${member.color} text-white text-xs`}>
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      );
                    })}
                    {task.assignees.length > 3 && (
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="bg-gray-300 text-gray-700 text-xs">
                          +{task.assignees.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ) : (
                  <p className="text-sm">To Be Determined</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-semibold">Label</Label>
                {task.tags && task.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {task.tags.slice(0, 3).map((tagValue) => {
                      const tag = availableTags.find((tag) => tag.value === tagValue);
                      if (!tag) return null;
                      return (
                        <Badge key={tagValue} className={`${tag.color} text-white text-xs`}>
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
                ) : (
                  <p className="text-sm">To Be Determined</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-semibold">Status</Label>
                <Badge className={`${column.color} text-white`}>{column.title}</Badge>
              </div>
              <div className="">
                <Label className="text-sm font-semibold">Start Date</Label>
                {task.startDate ? (
                  <div>
                    <p className="text-sm">{new Date(task.startDate).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <p className="text-sm">To Be Determined</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-semibold">End Date</Label>
                {task.endDate ? (
                  <div>
                    <p className="text-sm">{new Date(task.endDate).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <p className="text-sm">To Be Determined</p>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
