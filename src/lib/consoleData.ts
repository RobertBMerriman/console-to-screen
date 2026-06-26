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

export const consoleTypes = ['Handheld', 'Home console', 'Fantasy console', 'Other'] as const
export type ConsoleType = (typeof consoleTypes)[number]

export interface Console {
  tag: ConsoleTag
  manufacturer: 'Nintendo' | 'Sega' | 'Sony' | 'Atari' | 'SNK' | 'Bandai' | 'Lexaloffle'
  name: string
  resX: number
  resY: number
  type: ConsoleType
  ratioX: number
  ratioY: number
  closestRatioX?: number
  closestRatioY?: number
}
export const consoles: Console[] = [
  {
    tag: 'poke-mini',
    manufacturer: 'Nintendo',
    name: 'Pokémon mini',
    resX: 96,
    resY: 64,
    type: 'Handheld',
    ratioX: 3,
    ratioY: 2,
  },
  {
    tag: 'lynx',
    manufacturer: 'Atari',
    name: 'Lynx',
    resX: 160,
    resY: 102,
    type: 'Handheld',
    ratioX: 80,
    ratioY: 51,
    closestRatioX: 3,
    closestRatioY: 2,
  },
  {
    tag: 'gb',
    manufacturer: 'Nintendo',
    name: 'Game Boy',
    resX: 160,
    resY: 144,
    type: 'Handheld',
    ratioX: 10,
    ratioY: 9,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  {
    tag: 'gb',
    manufacturer: 'Sega',
    name: 'Game Gear',
    resX: 160,
    resY: 144,
    type: 'Handheld',
    ratioX: 10,
    ratioY: 9,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  {
    tag: 'ngp',
    manufacturer: 'SNK',
    name: 'Neo Geo Pocket',
    resX: 160,
    resY: 152,
    type: 'Handheld',
    ratioX: 20,
    ratioY: 19,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  {
    tag: 'ws',
    manufacturer: 'Bandai',
    name: 'WonderSwan',
    resX: 224,
    resY: 144,
    type: 'Handheld',
    ratioX: 14,
    ratioY: 9,
    closestRatioX: 3,
    closestRatioY: 2,
  },
  {
    tag: 'gba',
    manufacturer: 'Nintendo',
    name: 'Game Boy Advance',
    resX: 240,
    resY: 160,
    type: 'Handheld',
    ratioX: 3,
    ratioY: 2,
  },
  {
    tag: 'nds-single',
    manufacturer: 'Nintendo',
    name: 'Nintendo DS □',
    resX: 256,
    resY: 192,
    type: 'Handheld',
    ratioX: 4,
    ratioY: 3,
  },
  {
    tag: 'nds-horizontal',
    manufacturer: 'Nintendo',
    name: 'Nintendo DS ◫',
    resX: 512,
    resY: 192,
    type: 'Handheld',
    ratioX: 8,
    ratioY: 3,
    closestRatioX: 22,
    closestRatioY: 9,
  },
  {
    tag: 'nds-vertical',
    manufacturer: 'Nintendo',
    name: 'Nintendo DS ⊟',
    resX: 256,
    resY: 384,
    type: 'Handheld',
    ratioX: 128,
    ratioY: 191,
    closestRatioX: 3,
    closestRatioY: 2,
  },
  {
    tag: 'psp',
    manufacturer: 'Sony',
    name: 'PSP',
    resX: 480,
    resY: 272,
    type: 'Handheld',
    ratioX: 16,
    ratioY: 9,
  },
  {
    tag: 'nes',
    manufacturer: 'Nintendo',
    name: 'NES',
    resX: 256,
    resY: 240,
    type: 'Home console',
    ratioX: 16,
    ratioY: 15,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  {
    tag: 'genesis',
    manufacturer: 'Sega',
    name: 'Genesis',
    resX: 320,
    resY: 224,
    type: 'Home console',
    ratioX: 10,
    ratioY: 7,
  },
  {
    tag: 'snes',
    manufacturer: 'Nintendo',
    name: 'SNES',
    resX: 256,
    resY: 224,
    type: 'Home console',
    ratioX: 8,
    ratioY: 7,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  {
    tag: 'psx',
    manufacturer: 'Sony',
    name: 'PlayStation',
    resX: 320,
    resY: 240,
    type: 'Home console',
    ratioX: 4,
    ratioY: 3,
  },
  {
    tag: 'n64',
    manufacturer: 'Nintendo',
    name: 'Nintendo 64',
    resX: 320,
    resY: 240,
    type: 'Home console',
    ratioX: 4,
    ratioY: 3,
  },
  {
    tag: 'dc',
    manufacturer: 'Sega',
    name: 'Dreamcast',
    resX: 640,
    resY: 480,
    type: 'Home console',
    ratioX: 4,
    ratioY: 3,
  },
  {
    tag: 'pico-8',
    manufacturer: 'Lexaloffle',
    name: 'PICO-8',
    resX: 128,
    resY: 128,
    type: 'Fantasy console',
    ratioX: 1,
    ratioY: 1,
  },
  {
    tag: 'vb',
    manufacturer: 'Nintendo',
    name: 'Virtual Boy',
    resX: 384,
    resY: 224,
    type: 'Other',
    ratioX: 12,
    ratioY: 7,
  },
]

export type ConsolesByTag = Record<ConsoleTag, Console>
export let consolesByTag: ConsolesByTag = {} as ConsolesByTag

export type ConsolesByType = Record<ConsoleType, Omit<Console, 'type'>[]>
export const consolesByType: ConsolesByType = {
  Handheld: [],
  'Home console': [],
  'Fantasy console': [],
  Other: [],
}

consoles.forEach((console) => {
  consolesByTag[console.tag] = console
  consolesByType[console.type].push(console)
})
