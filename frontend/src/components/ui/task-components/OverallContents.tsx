import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/shadcn-components/card"
import { Plus, Circle, Ellipsis, Trash } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn-components/dialog"
import { Button } from "@/components/ui/shadcn-components/button"
import { Label } from "@/components/ui/shadcn-components/label"
import { Input } from "@/components/ui/shadcn-components/input"
import { Separator } from "@/components/ui/shadcn-components/separator"
import { Textarea } from "@/components/ui/shadcn-components/textarea"
import { UploadAttachments } from "@/components/ui/task-components/AttachmentsArea";

export function KanbanComponents() {
  return (
    <div>
        <Dialog>
        {/* Display created columns */}
            <div className="flex mt-4 gap-2">
                    <div className="">
                      <DialogTrigger asChild>
                        <Button variant="ghost">
                          <Plus />
                          Add task
                        </Button>
                      </DialogTrigger>
                    </div>
            </div>
            {/* Column creation display */}
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create new task</DialogTitle>
                <div className="pt-2">
                    <Separator />
                </div>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label>Create title</Label>
                  <Input placeholder="Title"/>
                </div>
                <div className="grid gap-3">
                  <Label>Description</Label>
                  <Textarea className="h-40" placeholder="Type your description here..."/>
                </div>
                <div className="grid gap-3">
                  <Label>Upload Attachments</Label>
                  <UploadAttachments />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="outline">Create</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}