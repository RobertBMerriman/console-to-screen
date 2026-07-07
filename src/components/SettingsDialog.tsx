import { SettingsIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSettingsStore } from '@/stores/settingsStore'

export function SettingsDialog() {
  const screensMaxDisplayWidth = useSettingsStore((s) => s.screensMaxDisplayWidth)
  const setScreensMaxDisplayWidth = useSettingsStore((s) => s.setScreensMaxDisplayWidth)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Settings</DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            Ensure screens are never wider than display width?
            <Checkbox
              checked={screensMaxDisplayWidth}
              onCheckedChange={setScreensMaxDisplayWidth}
            />
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
