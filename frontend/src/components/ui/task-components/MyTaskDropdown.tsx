import { useState } from 'react';

import { Button } from "@/components/ui/shadcn-components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui//shadcn-components/dropdown-menu"
import{ LucideChevronDown } from "lucide-react"


export function FilterDropDown() {
  const [selection, setSelection] = useState("Status");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button variant="ghost">
          {selection}
          <LucideChevronDown />
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-45" align="start">
        <DropdownMenuLabel>Slice by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={selection} onValueChange={setSelection}>
          <DropdownMenuRadioItem value="Overall">Overall</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Assignee">Assignee</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Status">Status</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Priority">Priority</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="StartDate">Start Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="EndDate">End Date</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
