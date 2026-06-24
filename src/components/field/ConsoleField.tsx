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

export function ConsoleField() {
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Console</FieldLegend>
        <FieldGroup>
          <Select defaultValue="gba">
            <SelectTrigger>
              <SelectValue placeholder="Select a console" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Handhelds</SelectLabel>
                <SelectItem value="poke-mini">Pokémon mini (96x64)</SelectItem>
                <SelectItem value="lynx">Lynx (160x102)</SelectItem>
                <SelectItem value="gb">Game Boy/Game Gear (160x144)</SelectItem>
                <SelectItem value="ngp">Neo Geo Pocket (160x152)</SelectItem>
                <SelectItem value="ws">WonderSwan (224x144)</SelectItem>
                <SelectItem value="gba">Game Boy Advance (240x160)</SelectItem>
                <SelectItem value="nds-single">Nintendo DS □ (256x192)</SelectItem>
                <SelectItem value="nds-horizontal">Nintendo DS ◫ (512x192)</SelectItem>
                <SelectItem value="nds-vertical">Nintendo DS ⊟ (256x384)</SelectItem>
                <SelectItem value="psp">PSP (480x272)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Home consoles</SelectLabel>
                <SelectItem value="nes">Nintendo (256x240)</SelectItem>
                <SelectItem value="genesis">Genesis (320x224)</SelectItem>
                <SelectItem value="snes">Super Nintendo (256x224)</SelectItem>
                <SelectItem value="psx">PlayStation (320x240)</SelectItem>
                <SelectItem value="n64">Nintendo 64 (320x240)</SelectItem>
                <SelectItem value="dc">Dreamcast (640x480)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Others</SelectLabel>
                <SelectItem value="pico-8">PICO-8 (128x128)</SelectItem>
                <SelectItem value="vb">Virtual Boy (384x224)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
