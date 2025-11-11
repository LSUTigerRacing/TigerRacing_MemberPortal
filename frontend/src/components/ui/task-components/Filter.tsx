import { Input } from "@/components/ui/shadcn-components/input"

export function FilterSelection() {
  return (
    <div className="flex w-full gap-4">
        <Input type="Filter" placeholder="Filter by keyword" />
    </div>
  );
}