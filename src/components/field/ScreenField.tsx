import { Field, FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { screenRatioTypes, screensByRatio } from '@/lib/screenData'
import { useScreenStore } from '@/stores/screenStore'

export function ScreenField() {
  const screen = useScreenStore((state) => state.screen)
  const setScreen = useScreenStore((state) => state.setScreenByTag)

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Screen</FieldLegend>
        <FieldGroup>
          <Field className="w-fit">
            <Select defaultValue={screen.tag} onValueChange={setScreen}>
              <SelectTrigger>
                <SelectValue placeholder="Select a screen" />
              </SelectTrigger>

              <SelectContent>
                {screenRatioTypes.map((ratio) => (
                  <SelectGroup key={ratio}>
                    <SelectLabel>{ratio}</SelectLabel>
                    {screensByRatio[ratio].map(
                      ({ tag, manufacturer, name, resX, resY, sizeInches, ratioX, ratioY }) => (
                        <SelectItem value={tag} key={tag}>
                          {ratio === 'Other' && `[${ratioX}:${ratioY}]`} {manufacturer} {name} -{' '}
                          {resX}x{resY} - {sizeInches}"
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
