import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Plus, Circle, Ellipsis, Trash } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const buttonColors = [
    "bg-[#59636E]",
    "bg-[#DDF4FF]",
    "bg-[#DAFBE1]",
    "bg-[#FFF8C5]",
    "bg-[#FFF1E5]",
    "bg-[#FFEBE9]",
    "bg-[#FFEFF7]",
    "bg-[#FBEFFF]"
];

const strokeColors = [
    "stroke-[#25292E]",
    "stroke-[#1D76DD]",
    "stroke-[#1A7F37]",
    "stroke-[#9A6700]",
    "stroke-[#BC4C00]",
    "stroke-[#DA4E57]",
    "stroke-[#BF3989]",
    "stroke-[#8250DF]"
];

export function ColumnCreation () {
    const [userTitle, setUserTitle] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const [columnColor, setColumnColor] = useState<string | null>(null);
    const [columns, setColumns] = useState<{
        id: number
        color: string
        colorIndex: number
        title: string
        description: string
    }[]>([]);

    /* Creates a new column onClick with necessary information
      Resets all useState everytime a new column is created */
    const handleCreate = () => {
        if (columnColor === null || isSelected === null) {
            alert("Please select a color");
            return;
        }
        const newColumn = {
            id: Date.now(),
            color: columnColor,
            colorIndex: isSelected,
            title: userTitle,
            description: userDescription
        };
        setIsSelected(null);
        setColumnColor(null);
        setColumns([...columns, newColumn]);
        setUserTitle("");
        setUserDescription("");
    };

    // Helper for outputing the selected color for the column creation
    const selectedButton = (color: string, index: number) => {
        setIsSelected(index);
        setColumnColor(color);
    };

    // Updates the useState of the columns for onClick deletion
    const deleteColumn = (columnsToDelete: {
        id: number
        color: string
        colorIndex: number
        title: string
        description: string
    }) => {
        const updatedColumn = columns.filter(col => col !== columnsToDelete);
        setColumns(updatedColumn);
    };

    return (
        <div>
            <Dialog>
                {/* Display created columns */}
                <div className="flex mt-4 gap-2">
                    {columns.map(column => (
                        <Card key={column.id} className="h-161 w-100 p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-2">
                                    <div className={`${column.color} rounded-full mt-3`}>
                                        <Circle className={strokeColors[column.colorIndex]} />
                                    </div>
                                    <h1 className="font-semibold">{column.title}</h1>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="ghost" className=" w-10 ">
                                            <Ellipsis />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white" align="start">
                                        <DropdownMenuLabel>Column</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => deleteColumn(column)}>
                                            <Trash />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p>{column.description}</p>
                        </Card>
                    ))}
                    <div>
                        <DialogTrigger asChild>
                            {columns.length === 0
                                ? (
                                    // Initial button
                                    <Button variant="outline" className="h-161 w-100 p-4">
                                        <Plus className="mr-2" />
                                        Create Column
                                    </Button>
                                )
                                : (
                                    // After first column
                                    <Button variant="outline" size="icon">
                                        <Plus />
                                    </Button>
                                )}
                        </DialogTrigger>
                    </div>
                </div>
                {/* Column creation display */}
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
                                onChange={e => setUserTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label>Color</Label>
                            <div className="flex gap-2">
                                {buttonColors.map((color, i) => (
                                    <Button key={i} variant="outline" onClick={() => selectedButton(color, i)} className={`h-10 w-10 ${color} ${isSelected === i ? "ring-2 ring-blue-500" : ""}`}>
                                        <Circle className={strokeColors[i]} />
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Type your message here."
                                value={userDescription}
                                onChange={e => setUserDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleCreate}>Create</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
