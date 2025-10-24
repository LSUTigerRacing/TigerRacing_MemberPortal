import { FilterDropDown } from "@/components/ui/task-components/MyTaskDropdown";

export function MyTask() {
  return (
    // This creates the sidebar area
    <div className="w-64 h-screen shrink-0 border-r bg-background pl-1"> 
        <FilterDropDown />
    </div>
  );
}
