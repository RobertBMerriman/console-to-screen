import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
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
  consolesByTag,
  consolesByType,
  type ConsoleTag,
} from '@/lib/consoleData'
import { useConsoleStore } from '@/stores/consoleStore'

export function ConsoleField() {
  const tags = useConsoleStore((state) => state.tags)
  const setConsolesByTags = useConsoleStore((state) => state.setConsolesByTags)
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
          <div className="flex flex-row items-end gap-4">
            <Field>
              <FieldLabel htmlFor="console">Console</FieldLabel>

              <div className="flex flex-row flex-wrap gap-1">
                {tags.toReversed().map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setConsolesByTags(tags.filter((t) => t !== tag))}
                  >
                    {consolesByTag[tag].name}
                    <X data-icon="inline-end" />
                  </Badge>
                ))}
              </div>

              <Select
                value={tags[tags.length - 1]}
                onValueChange={(value) => setConsolesByTags([...tags, value as ConsoleTag])}
              >
                <SelectTrigger id="console">
                  <SelectValue placeholder="Select a console" />
                </SelectTrigger>

                <SelectContent>
                  {grouping === 'Type' &&
                    consoleTypes.map((type) => (
                      <SelectGroup key={type}>
                        <SelectLabel>{type}</SelectLabel>
                        {consolesByType[type].map(({ tag, name, resX, resY, ratioX, ratioY }) => (
                          <SelectItem key={tag} value={tag}>
                            {name}
                            {/* [{ratioX}:{ratioY} - {resX}x{resY}] */}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  {grouping === 'Manufacturer' &&
                    consoleManufacturers.map((manufacturer) => (
                      <SelectGroup key={manufacturer}>
                        <SelectLabel>{manufacturer}</SelectLabel>
                        {consolesByManufacturer[manufacturer].map(
                          ({ tag, name, resX, resY, ratioX, ratioY }) => (
                            <SelectItem key={tag} value={tag}>
                              {name}
                              {/* [{ratioX}:{ratioY} - {resX}x{resY}] */}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    ))}
                </SelectContent>
              </Select>
            </Field>
            <Field className="w-fit">
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
