import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { screenRatios, screensByRatio } from '@/lib/screenData'
import { useScreenStore } from '@/stores/screenStore'

export function ScreenField() {
  const screen = useScreenStore((state) => state.screen)
  const setScreen = useScreenStore((state) => state.setScreen)

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Screen</FieldLegend>
        <FieldGroup>
          <Select defaultValue={screen} onValueChange={setScreen}>
            <SelectTrigger>
              <SelectValue placeholder="Select a screen" />
            </SelectTrigger>

            <SelectContent>
              {screenRatios.map((ratio) => (
                <SelectGroup key={ratio}>
                  <SelectLabel>{ratio}</SelectLabel>
                  {screensByRatio[ratio].map(({ tag, name, resX, resY, sizeInches }) => (
                    <SelectItem value={tag} key={tag}>
                      {name} ({resX}x{resY} {sizeInches}")
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
