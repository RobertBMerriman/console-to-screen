export const consoleTags = [
  'poke-mini',
  'lynx',
  'gb',
  'ngp',
  'ws',
  'gba',
  'nds-single',
  'nds-horizontal',
  'nds-vertical',
  'psp',
  'nes',
  'genesis',
  'snes',
  'psx',
  'n64',
  'dc',
  'pico-8',
  'vb',
] as const
export type ConsoleTag = (typeof consoleTags)[number]

export const consoleTypes = ['Handheld', 'Home console', 'Other'] as const
export type ConsoleType = (typeof consoleTypes)[number]

export interface Console {
  tag: ConsoleTag
  name: string
  resX: number
  resY: number
  type: ConsoleType
}
export const consoles: Console[] = [
  {
    tag: 'poke-mini',
    name: 'Pokémon mini',
    resX: 96,
    resY: 64,
    type: 'Handheld',
  },
  {
    tag: 'lynx',
    name: 'Lynx',
    resX: 160,
    resY: 102,
    type: 'Handheld',
  },
  {
    tag: 'gb',
    name: 'Game Boy/Game Gear',
    resX: 160,
    resY: 144,
    type: 'Handheld',
  },
  {
    tag: 'ngp',
    name: 'Neo Geo Pocket',
    resX: 160,
    resY: 152,
    type: 'Handheld',
  },
  {
    tag: 'ws',
    name: 'WonderSwan',
    resX: 224,
    resY: 144,
    // ratioX: 14,
    // ratioY: 9,
    type: 'Handheld',
  },
  {
    tag: 'gba',
    name: 'Game Boy Advance',
    resX: 240,
    resY: 160,
    type: 'Handheld',
  },
  {
    tag: 'nds-single',
    name: 'Nintendo DS □',
    resX: 256,
    resY: 192,
    type: 'Handheld',
  },
  {
    tag: 'nds-horizontal',
    name: 'Nintendo DS ◫',
    resX: 512,
    resY: 192,
    type: 'Handheld',
  },
  {
    tag: 'nds-vertical',
    name: 'Nintendo DS ⊟',
    resX: 256,
    resY: 384,
    type: 'Handheld',
  },
  {
    tag: 'psp',
    name: 'PSP',
    resX: 480,
    resY: 272,
    type: 'Handheld',
  },
  {
    tag: 'nes',
    name: 'Nintendo',
    resX: 256,
    resY: 240,
    type: 'Home console',
  },
  {
    tag: 'genesis',
    name: 'Genesis',
    resX: 320,
    resY: 224,
    type: 'Home console',
  },
  {
    tag: 'snes',
    name: 'Super Nintendo',
    resX: 256,
    resY: 224,
    type: 'Home console',
  },
  {
    tag: 'psx',
    name: 'PlayStation',
    resX: 320,
    resY: 240,
    type: 'Home console',
  },
  {
    tag: 'n64',
    name: 'Nintendo 64',
    resX: 320,
    resY: 240,
    type: 'Home console',
  },
  {
    tag: 'dc',
    name: 'Dreamcast',
    resX: 640,
    resY: 480,
    type: 'Home console',
  },
  {
    tag: 'pico-8',
    name: 'PICO-8',
    resX: 128,
    resY: 128,
    type: 'Other',
  },
  {
    tag: 'vb',
    name: 'Virtual Boy',
    resX: 384,
    resY: 224,
    type: 'Other',
  },
]

export type ConsolesByTag = Record<ConsoleTag, Console>
export let consolesByTag: ConsolesByTag = {} as ConsolesByTag

export type ConsolesByType = Record<ConsoleType, Omit<Console, 'type'>[]>
export const consolesByType: ConsolesByType = { Handheld: [], 'Home console': [], Other: [] }

consoles.forEach((console) => {
  consolesByTag[console.tag] = console
  consolesByType[console.type].push(console)
})
