import { ConsoleCombobox } from '@/components/console/ConsoleCombobox'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { consoleGroupingOptions } from '@/lib/consoleData'
import { useConsoleStore } from '@/stores/consoleStore'

export function ConsoleField() {
  const grouping = useConsoleStore((state) => state.grouping)
  const setGrouping = useConsoleStore((state) => state.setGrouping)
  const integerScaling = useConsoleStore((state) => state.integerScaling)
  const setIntegerScaling = useConsoleStore((state) => state.setIntegerScaling)
  const cropOverscan = useConsoleStore((state) => state.cropOverscan)
  const setCropOverscan = useConsoleStore((state) => state.setCropOverscan)

  return (
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          <div className="flex flex-col items-end gap-4 sm:flex-row">
            <Field>
              <FieldLabel htmlFor="console">Consoles</FieldLabel>

              <ConsoleCombobox />
            </Field>
            <Field className="sm:w-fit">
              <FieldLabel htmlFor="console-group">Group by</FieldLabel>
              <Select defaultValue={grouping} onValueChange={setGrouping}>
                <SelectTrigger id="console-group">
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>

                <SelectContent>
                  {consoleGroupingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="flex flex-row gap-8">
            <Field orientation={'horizontal'} className="w-fit">
              <FieldLabel htmlFor="integer-scaling">Integer scaling</FieldLabel>
              <Checkbox
                id="integer-scaling"
                name="integer-scaling"
                checked={integerScaling}
                onCheckedChange={setIntegerScaling}
              />
            </Field>
            <Field orientation={'horizontal'} className="w-fit">
              <FieldLabel htmlFor="crop-oversan">Crop overscan</FieldLabel>
              <Checkbox
                id="crop-oversan"
                name="crop-oversan"
                checked={cropOverscan}
                onCheckedChange={setCropOverscan}
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
