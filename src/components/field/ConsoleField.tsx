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
import { consoleTypes, consolesByType } from '@/lib/consoleData'
import { useConsoleStore } from '@/stores/consoleStore'

export function ConsoleField() {
  const console = useConsoleStore((state) => state.console)
  const setConsole = useConsoleStore((state) => state.setConsoleByTag)

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Console</FieldLegend>
        <FieldGroup>
          <Select defaultValue={console.tag} onValueChange={setConsole}>
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
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
