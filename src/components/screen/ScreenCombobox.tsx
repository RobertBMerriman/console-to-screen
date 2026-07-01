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
  screenManufacturers,
  screenRatioTypes,
  screensByManufacturer,
  screensByRatio,
  screensByRes,
  screensByTag,
  type ScreenGroupingOption,
} from '@/lib/screenData'
import { useScreenStore } from '@/stores/screenStore'
import type { Group } from '@base-ui/react/internals/resolveValueLabel'

function group(grouping: ScreenGroupingOption) {
  const groups: Group[] = []

  if (grouping === 'Aspect ratio') {
    screenRatioTypes.forEach((ratio) => {
      groups.push({
        label: ratio,
        items: screensByRatio[ratio],
      })
    })
  }
  if (grouping === 'Manufacturer') {
    screenManufacturers.forEach((manufacturer) => {
      groups.push({
        label: manufacturer,
        items: screensByManufacturer[manufacturer],
      })
    })
  }
  if (grouping === 'Resolution') {
    Object.keys(screensByRes).forEach((res) => {
      groups.push({
        label: res,
        items: screensByRes[res],
      })
    })
  }

  return groups
}

export function ScreenCombobox() {
  const tags = useScreenStore((state) => state.tags)
  const setScreensByTags = useScreenStore((state) => state.setScreensByTags)
  const grouping = useScreenStore((state) => state.grouping)

  const groups = group(grouping)

  // const [value, setValue] = useState('')

  const anchor = useComboboxAnchor()
  return (
    <Combobox items={groups} multiple value={tags} onValueChange={setScreensByTags} autoHighlight>
      <ComboboxChips ref={anchor} className="flex-col">
        <div className="flex flex-wrap gap-1">
          <ComboboxValue>
            {tags.map((tag) => {
              const screen = screensByTag[tag]
              return (
                <ComboboxChip key={tag}>
                  {screen.manufacturer} {screen.name}
                </ComboboxChip>
              )
            })}
          </ComboboxValue>
        </div>
        <ComboboxChipsInput id="screen" placeholder="Select a device" />
      </ComboboxChips>
      {/* <ComboboxInput
        placeholder="Select a device"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setValue('')}
        onBlur={() =>
          setValue(
            tags.length +
              ': ' +
              tags
                .toReversed()
                .map((tag) => screensByTag[tag])
                .map((screen) => screen.manufacturer + ' ' + screen.name)
                .join(', '),
          )
        }
      /> */}
      <ComboboxContent anchor={anchor} className={'h-full'}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(group, index) => (
            <ComboboxGroup key={group.label} items={group.items}>
              <ComboboxLabel>{group.label}</ComboboxLabel>
              <ComboboxCollection>
                {(screen) => (
                  <ComboboxItem key={screen.tag} value={screen.tag}>
                    {screen.manufacturer} {screen.name}
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
