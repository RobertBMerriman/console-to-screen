import { MonitorCogIcon } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

import { AddCustomScreenDialog } from '@/components/screen/custom/AddCustomScreenDialog'
import { DeleteCustomScreenConfirmation } from '@/components/screen/custom/DeleteCustomScreenConfirmation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCustomScreens } from '@/stores/customScreenStore'

export function ManageCustomScreensDialog() {
  const customScreens = useCustomScreens()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'} size={'icon-lg'} className="w-9!">
          <MonitorCogIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage custom screens</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end">
          <AddCustomScreenDialog />
        </div>
        <div
          className="grid items-center gap-x-2 gap-y-1"
          style={{ gridTemplateColumns: 'auto auto min-content min-content' }}
        >
          {customScreens.map(({ tag, name, sizeInches, resX, resY, ratioX, ratioY }) => (
            <Fragment key={tag}>
              <span>{name}</span>
              <span>
                {resX}x{resY} ({ratioX}:{ratioY})
              </span>
              <span>{sizeInches}"</span>
              <DeleteCustomScreenConfirmation tag={tag} name={name} />
            </Fragment>
          ))}
        </div>
        // Better buttons here pls
      </DialogContent>
    </Dialog>
  )
}
