import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import {
  consoleGens,
  consoleManufacturers,
  consolesByGen,
  consolesByManufacturer,
  consolesByTag,
  consolesByType,
  consoleTypes,
  type Console,
  type ConsoleGroupingOption,
} from '@/lib/consoleData'
import { cn } from '@/lib/utils'
import { useConsoleStore } from '@/stores/consoleStore'

interface ConsoleGroup {
  label: string
  items: ReadonlyArray<Console>
}
// Replace with map lookup?
function group(grouping: ConsoleGroupingOption) {
  const groups: ConsoleGroup[] = []

  if (grouping === 'Type') {
    consoleTypes.forEach((type) => {
      groups.push({
        label: type,
        items: consolesByType[type],
      })
    })
  }
  if (grouping === 'Manufacturer') {
    consoleManufacturers.forEach((manufacturer) => {
      groups.push({
        label: manufacturer,
        items: consolesByManufacturer[manufacturer],
      })
    })
  }
  if (grouping === 'Generation') {
    consoleGens.forEach((gen) => {
      groups.push({
        label: String(gen),
        items: consolesByGen[gen],
      })
    })
  }

  return groups
}

export function ConsoleCombobox() {
  const tags = useConsoleStore((state) => state.tags)
  const setConsolesByTags = useConsoleStore((state) => state.setConsolesByTags)
  const grouping = useConsoleStore((state) => state.grouping)

  const groups = group(grouping)

  const anchor = useComboboxAnchor()

  return (
    <Combobox items={groups} multiple value={tags} onValueChange={setConsolesByTags} autoHighlight>
      <ComboboxChips ref={anchor} className="flex-col">
        <div className={cn('flex flex-wrap gap-1', { hidden: tags.length === 0 })}>
          <ComboboxValue>
            {tags.map((tag) => {
              const console = consolesByTag[tag]
              return <ComboboxChip key={tag}>{console.name}</ComboboxChip>
            })}
          </ComboboxValue>
        </div>
        <ComboboxChipsInput id="console" placeholder="Select a console or search" />
      </ComboboxChips>

      <ComboboxContent anchor={anchor} className={'h-full'}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList<ConsoleGroup>>
          {(group, index) => (
            <ComboboxGroup key={group.label} items={group.items}>
              <ComboboxLabel>{group.label}</ComboboxLabel>
              <ComboboxCollection<Console>>
                {(console) => (
                  <ComboboxItem key={console.tag} value={console.tag}>
                    {console.name}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < groups.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
