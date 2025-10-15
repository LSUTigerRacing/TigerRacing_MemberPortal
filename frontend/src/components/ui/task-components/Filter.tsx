import { Input } from "@/components/ui/shadcn-components/input"
import { Button } from "@/components/ui/shadcn-components/button"

export function FilterSelection() {
  return (
  <div className="flex w-full gap-4">
      <Input type="Filter" placeholder="Filter by keyword" />
      <div className="flex gap-2">
          <Button variant="outline">Discard</Button>
          <Button variant="outline">Save</Button>
        </div>
  </div>
  );
}