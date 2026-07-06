import { MonitorCogIcon } from 'lucide-react'

import { AddCustomScreenDialog } from '@/components/screen/custom/AddCustomScreenDialog'
import { DeleteCustomScreenConfirmation } from '@/components/screen/custom/DeleteCustomScreenConfirmation'
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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item'
import { Muted } from '@/components/ui/typography/Muted'
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

      <DialogContent className="max-sm:max-h-screen">
        <DialogHeader>
          <DialogTitle>Manage custom screens</DialogTitle>
        </DialogHeader>

        <div className="-mx-6 max-h-[70vh] overflow-y-auto px-6 sm:max-h-[50vh]">
          <ItemGroup>
            {customScreens.length === 0 && (
              <Muted className="text-center">No custom screens added</Muted>
            )}
            {customScreens.map(({ tag, name, sizeInches, resX, resY, ratioX, ratioY }) => (
              <Item key={tag} variant={'outline'}>
                <ItemContent className="gap-1">
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>
                    <span>
                      {resX}x{resY} ({ratioX}:{ratioY})
                    </span>{' '}
                    - <span>{sizeInches}"</span>
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <DeleteCustomScreenConfirmation tag={tag} name={name} />
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <AddCustomScreenDialog />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
