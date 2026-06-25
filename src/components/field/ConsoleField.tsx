import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { consoleTypes, consolesByType } from '@/lib/consoleData'
import { useConsoleStore } from '@/stores/consoleStore'

export function ConsoleField() {
  const console = useConsoleStore((state) => state.console)
  const setConsoleByTag = useConsoleStore((state) => state.setConsoleByTag)
  const integerScaling = useConsoleStore((state) => state.integerScaling)
  const setIntegerScaling = useConsoleStore((state) => state.setIntegerScaling)

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Console</FieldLegend>
        <FieldGroup>
          <Field>
            <Select defaultValue={console.tag} onValueChange={setConsoleByTag}>
              <SelectTrigger>
                <SelectValue placeholder="Select a console" />
              </SelectTrigger>

              <SelectContent>
                {consoleTypes.map((type) => (
                  <SelectGroup key={type}>
                    <SelectLabel>{type}</SelectLabel>
                    {consolesByType[type].map(({ tag, name, resX, resY }) => (
                      <SelectItem value={tag} key={tag}>
                        {name} ({resX}x{resY})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field orientation={'horizontal'} className="w-fit">
            <FieldLabel htmlFor="integer-scaling">Integer scaling</FieldLabel>
            <Checkbox
              name="integer-scaling"
              checked={integerScaling}
              onCheckedChange={setIntegerScaling}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
