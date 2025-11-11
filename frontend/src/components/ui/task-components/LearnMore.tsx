import { Button } from '@/components/ui/shadcn-components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn-components/dialog"
import { Separator } from "@/components/ui/shadcn-components/separator"

const dummyText = "Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem"

export function LearnMore() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="">
            Learn More
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Learn More</DialogTitle>
            <div className="pt-2">
                <Separator />
            </div>
          </DialogHeader>
          <div className="grid gap-4">
            {dummyText}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}