import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  screenGroupingOptions,
  screenManufacturers,
  screenRatioTypes,
  screensByManufacturer,
  screensByRatio,
  screensByRes,
} from '@/lib/screenData'
import { useScreenStore } from '@/stores/screenStore'

export function ScreenSelect() {
  const tag = useScreenStore((state) => state.tag)
  const setScreen = useScreenStore((state) => state.setScreenByTag)
  const grouping = useScreenStore((state) => state.grouping)

  return (
    <Select defaultValue={tag} onValueChange={setScreen}>
      <SelectTrigger>
        <SelectValue placeholder="Select a screen" />
      </SelectTrigger>

      <SelectContent>
        {grouping === 'Aspect ratio' &&
          screenRatioTypes.map((ratio) => (
            <SelectGroup key={ratio}>
              <SelectLabel>{ratio}</SelectLabel>
              {screensByRatio[ratio].map(
                ({ tag, manufacturer, name, resX, resY, sizeInches, ratioX, ratioY }) => (
                  <SelectItem value={tag} key={tag}>
                    {ratio === 'Other' && `[${ratioX}:${ratioY}]`} {manufacturer} {name}
                    {/* [{resX}x{resY} - {sizeInches}"] */}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          ))}
        {grouping === 'Manufacturer' &&
          screenManufacturers.map((manufacturer) => (
            <SelectGroup key={manufacturer}>
              <SelectLabel>{manufacturer}</SelectLabel>
              {screensByManufacturer[manufacturer].map(
                ({ tag, manufacturer, name, resX, resY, sizeInches, ratioX, ratioY }) => (
                  <SelectItem value={tag} key={tag}>
                    {manufacturer} {name}
                    {/* [{ratioX}:{ratioY} - {resX}x{resY} - {sizeInches}"] */}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          ))}
        {grouping === 'Resolution' &&
          Object.keys(screensByRes).map((res) => (
            <SelectGroup key={res}>
              <SelectLabel>
                {res} - {screensByRes[res][0]?.ratioX}:{screensByRes[res][0]?.ratioY}
              </SelectLabel>
              {screensByRes[res].map(({ tag, manufacturer, name, sizeInches }) => (
                <SelectItem value={tag} key={tag}>
                  {manufacturer} {name}
                  {/* [{sizeInches}"] */}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
      </SelectContent>
    </Select>
  )
}
