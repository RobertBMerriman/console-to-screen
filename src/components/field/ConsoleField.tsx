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
import {
  consoleGroupingOptions,
  consoleManufacturers,
  consoleTypes,
  consolesByManufacturer,
  consolesByType,
} from '@/lib/consoleData'
import { useConsoleStore } from '@/stores/consoleStore'

export function ConsoleField() {
  const consoleTag = useConsoleStore((state) => state.tag)
  const setConsoleByTag = useConsoleStore((state) => state.setConsoleByTag)
  const grouping = useConsoleStore((state) => state.grouping)
  const setGrouping = useConsoleStore((state) => state.setGrouping)
  const integerScaling = useConsoleStore((state) => state.integerScaling)
  const setIntegerScaling = useConsoleStore((state) => state.setIntegerScaling)
  const cropOverscan = useConsoleStore((state) => state.cropOverscan)
  const setCropOverscan = useConsoleStore((state) => state.setCropOverscan)

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Console</FieldLegend>
        <FieldGroup>
          <Field className="w-fit">
            <Select defaultValue={consoleTag} onValueChange={setConsoleByTag}>
              <SelectTrigger>
                <SelectValue placeholder="Select a console" />
              </SelectTrigger>

              <SelectContent>
                {grouping === 'type' &&
                  consoleTypes.map((type) => (
                    <SelectGroup key={type}>
                      <SelectLabel>{type}</SelectLabel>
                      {consolesByType[type].map(({ tag, name, resX, resY }) => (
                        <SelectItem key={tag} value={tag}>
                          {name} ({resX}x{resY})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                {grouping === 'manufacturer' &&
                  consoleManufacturers.map((manufacturer) => (
                    <SelectGroup key={manufacturer}>
                      <SelectLabel>{manufacturer}</SelectLabel>
                      {consolesByManufacturer[manufacturer].map(({ tag, name, resX, resY }) => (
                        <SelectItem key={tag} value={tag}>
                          {name} ({resX}x{resY})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <Select defaultValue={grouping} onValueChange={setGrouping}>
              <SelectTrigger>
                <SelectValue placeholder="Select grouping" />
              </SelectTrigger>

              <SelectContent>
                {consoleGroupingOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.toLocaleUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="flex flex-row gap-8">
            <Field orientation={'horizontal'} className="w-fit">
              <FieldLabel htmlFor="integer-scaling">Integer scaling</FieldLabel>
              <Checkbox
                name="integer-scaling"
                checked={integerScaling}
                onCheckedChange={setIntegerScaling}
              />
            </Field>
            <Field orientation={'horizontal'} className="w-fit">
              <FieldLabel htmlFor="crop-oversan">Crop overscan</FieldLabel>
              <Checkbox
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
