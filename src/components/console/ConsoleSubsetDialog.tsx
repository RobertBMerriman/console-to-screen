import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SelectItems,
} from '@/components/ui/select'
import { useConsoleStore, type PerfBracket } from '@/stores/consoleStore'
import { useState } from 'react'

const items: SelectItems<string, PerfBracket>[] = [
  { label: 'Up to PS1', value: 'upToPs1NoProblem' },
  { label: 'Up to NS, PSP, DC, N64 etc', value: 'upToDcN64Psp' },
  { label: 'Up to PS2, Gamecube, Saturn etc', value: 'upToNgcPs2' },
  { label: 'Up to Switch, Wii U etc', value: 'aboveNgc' },
]

export function ConsoleSubsetDialog() {
  const tags = useConsoleStore((s) => s.tags)
  const selectByPerformance = useConsoleStore((s) => s.selectByPerformance)
  const addByPerformance = useConsoleStore((s) => s.addByPerformance)

  const [perf, setPerf] = useState<PerfBracket | undefined>()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>Select subset</Button>
      </DialogTrigger>

      <DialogContent className="max-sm:max-h-screen">
        <DialogHeader>
          <DialogTitle>Select a subset of consoles</DialogTitle>
        </DialogHeader>

        <div className="-mx-6 overflow-y-auto px-6">
          {/* <FieldLabel>By performance</FieldLabel> */}
          <Field orientation={'horizontal'}>
            <Field>
              <Select value={perf} onValueChange={(value) => setPerf(value as PerfBracket)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a performance bracket" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field className="w-fit">
              <Button disabled={!perf} onClick={() => perf && addByPerformance(perf)}>
                Add
              </Button>
            </Field>
            <Field className="w-fit">
              <Button disabled={!perf} onClick={() => perf && selectByPerformance(perf)}>
                Set
              </Button>
            </Field>
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" disabled={tags.length === 0}>
            Clear all
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
