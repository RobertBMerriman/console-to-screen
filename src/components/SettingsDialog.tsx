import { SettingsIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { useSettingsStore } from '@/stores/settingsStore'

export function SettingsDialog() {
  // const screensMaxDisplayWidth = useSettingsStore((s) => s.screensMaxDisplayWidth)
  // const setScreensMaxDisplayWidth = useSettingsStore((s) => s.setScreensMaxDisplayWidth)
  const minimumComfortableScreenSize = useSettingsStore((s) => s.minimumComfortableScreenSize)
  const setMinimumComfortableScreenSize = useSettingsStore((s) => s.setMinimumComfortableScreenSize)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* <div className="flex flex-row justify-between">
            Ensure screens are never wider than display width?
            <Checkbox
              checked={screensMaxDisplayWidth}
              onCheckedChange={setScreensMaxDisplayWidth}
            />
          </div> */}

          <div className="flex flex-row justify-between">
            What is the smallest screen size you can see comfortably?
            <InputGroup className="w-fit">
              <InputGroupInput
                value={minimumComfortableScreenSize || ''}
                onChange={(e) =>
                  setMinimumComfortableScreenSize(
                    isNaN(e.target.valueAsNumber) ? 0 : Math.abs(e.target.valueAsNumber),
                  )
                }
                type="number"
                step={0.1}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>inches</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
