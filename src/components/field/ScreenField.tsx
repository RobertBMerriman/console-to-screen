import { ScreenCombobox } from '@/components/screen/ScreenCombobox'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { screenGroupingOptions } from '@/lib/screenData'
import { useScreenStore } from '@/stores/screenStore'

export function ScreenField() {
  const grouping = useScreenStore((state) => state.grouping)
  const setGrouping = useScreenStore((state) => state.setGrouping)

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup className="flex flex-row gap-4">
          <Field>
            <FieldLabel htmlFor="screen">Screen</FieldLabel>
            <ScreenCombobox />
          </Field>

          <Field className="w-fit">
            <FieldLabel htmlFor="screen-group">Group by</FieldLabel>
            <Select defaultValue={grouping} onValueChange={setGrouping}>
              <SelectTrigger id="screen-group">
                <SelectValue placeholder="Select grouping" />
              </SelectTrigger>

              <SelectContent>
                {screenGroupingOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
