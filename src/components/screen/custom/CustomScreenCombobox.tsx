import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'

import { cn } from '@/lib/utils'
import {
  useCustomScreens,
  useCustomScreenStore,
  type CustomScreen,
} from '@/stores/customScreenStore'

export function CustomScreenCombobox() {
  const customScreensArray = useCustomScreens()
  const customScreens = useCustomScreenStore((state) => state.customScreens)
  const selectedTags = useCustomScreenStore((state) => state.selectedTags)
  const setSelectedTags = useCustomScreenStore((state) => state.setSelectedTags)

  const anchor = useComboboxAnchor()

  return (
    <Combobox
      items={customScreensArray}
      multiple
      value={selectedTags}
      onValueChange={setSelectedTags}
      autoHighlight
    >
      <ComboboxChips ref={anchor} className="flex-col">
        <div className={cn('flex flex-wrap gap-1', { hidden: selectedTags.length === 0 })}>
          <ComboboxValue>
            {selectedTags.map((tag) => {
              const screen = customScreens[tag]
              return <ComboboxChip key={tag}>{screen.name}</ComboboxChip>
            })}
          </ComboboxValue>
          {selectedTags.length > 0 && (
            <Button variant={'ghost'} size={'chip'} onClick={() => setSelectedTags([])}>
              Clear all
            </Button>
          )}
        </div>
        <ComboboxChipsInput id="custom-screen" placeholder="Select a device or search" />
      </ComboboxChips>

      <ComboboxContent anchor={anchor} className={'h-full'}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList<CustomScreen>>
          {(screen) => (
            <ComboboxItem key={screen.tag} value={screen.tag}>
              {screen.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
