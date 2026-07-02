import { p1080, p240, p480, p720, type ResAndRatio } from '@/lib/commonData'

export const consoleTags = [
  // Handhelds
  'gb',
  'lynx',
  'game-gear',
  'ngp',
  'ws',
  'gba',
  'poke-mini',
  'nds-single',
  'nds-horizontal',
  'nds-vertical',
  'psp',
  '3ds-top',
  '3ds-bottom',
  '3ds-horizontal',
  '3ds-vertical',
  'psv',
  // Hybrids
  'switch-handheld',
  'switch-docked',
  // Home coneoles
  'nes',
  'mega-drive',
  'snes',
  'saturn',
  'psx',
  'n64',
  'dc',
  'ps2',
  'ngc',
  'xbox',
  // Fantasy consoles
  'pico-8',
  'tic-80',
  // Others
  'vb',
] as const
export type ConsoleTag = (typeof consoleTags)[number]

export const consoleManufacturers = [
  'Nintendo',
  'Sega',
  'Sony',
  'Microsoft',
  'Atari',
  'SNK',
  'Bandai',
  'Other',
] as const
export type ConsoleManufacturer = (typeof consoleManufacturers)[number]

export const consoleTypes = [
  'Handheld',
  'Hybrid',
  'Home console',
  'Fantasy console',
  'Other',
] as const
export type ConsoleType = (typeof consoleTypes)[number]

export type ConsolesByTag = Record<ConsoleTag, Console>
export interface Console extends ResAndRatio {
  tag: ConsoleTag
  gen: number | 'Fantasy'
  manufacturer: ConsoleManufacturer
  name: string
  type: ConsoleType
  closestRatioX?: number
  closestRatioY?: number
}
export const consolesByTag: Record<ConsoleTag, Console> = {
  lynx: {
    tag: 'lynx',
    manufacturer: 'Atari',
    gen: 4,
    name: 'Lynx',
    type: 'Handheld',
    resX: 160,
    resY: 102,
    ratioX: 80,
    ratioY: 51,
    closestRatioX: 3,
    closestRatioY: 2,
  },
  gb: {
    tag: 'gb',
    manufacturer: 'Nintendo',
    gen: 4,
    name: 'Game Boy (Color)',
    type: 'Handheld',
    resX: 160,
    resY: 144,
    ratioX: 10,
    ratioY: 9,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  'game-gear': {
    tag: 'game-gear',
    manufacturer: 'Sega',
    gen: 4,
    name: 'Game Gear',
    type: 'Handheld',
    resX: 160,
    resY: 144,
    ratioX: 10,
    ratioY: 9,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  ngp: {
    tag: 'ngp',
    manufacturer: 'SNK',
    gen: 5,
    name: 'Neo Geo Pocket (Color)',
    type: 'Handheld',
    resX: 160,
    resY: 152,
    ratioX: 20,
    ratioY: 19,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  ws: {
    tag: 'ws',
    manufacturer: 'Bandai',
    gen: 5,
    name: 'WonderSwan (Color)',
    type: 'Handheld',
    resX: 224,
    resY: 144,
    ratioX: 14,
    ratioY: 9,
    closestRatioX: 3,
    closestRatioY: 2,
  },
  gba: {
    tag: 'gba',
    manufacturer: 'Nintendo',
    gen: 6,
    name: 'Game Boy Advance',
    type: 'Handheld',
    resX: 240,
    resY: 160,
    ratioX: 3,
    ratioY: 2,
  },
  'poke-mini': {
    tag: 'poke-mini',
    manufacturer: 'Nintendo',
    gen: 6,
    name: 'Pokémon mini',
    type: 'Handheld',
    resX: 96,
    resY: 64,
    ratioX: 3,
    ratioY: 2,
  },
  'nds-single': {
    tag: 'nds-single',
    manufacturer: 'Nintendo',
    gen: 7,
    name: 'DS □',
    type: 'Handheld',
    resX: 256,
    resY: 192,
    ratioX: 4,
    ratioY: 3,
  },
  'nds-horizontal': {
    tag: 'nds-horizontal',
    manufacturer: 'Nintendo',
    gen: 7,
    name: 'DS ◫',
    type: 'Handheld',
    resX: 512,
    resY: 192,
    ratioX: 8,
    ratioY: 3,
  },
  'nds-vertical': {
    tag: 'nds-vertical',
    manufacturer: 'Nintendo',
    gen: 7,
    name: 'DS ⊟',
    type: 'Handheld',
    resX: 256,
    resY: 384,
    ratioX: 2,
    ratioY: 3,
  },
  psp: {
    tag: 'psp',
    manufacturer: 'Sony',
    gen: 7,
    name: 'PSP',
    type: 'Handheld',
    resX: 480,
    resY: 272,
    ratioX: 16,
    ratioY: 9,
  },
  '3ds-top': {
    tag: '3ds-top',
    manufacturer: 'Nintendo',
    gen: 8,
    name: '3DS (top)',
    type: 'Handheld',
    resX: 400,
    resY: 240,
    ratioX: 5,
    ratioY: 3,
  },
  '3ds-bottom': {
    tag: '3ds-bottom',
    manufacturer: 'Nintendo',
    gen: 8,
    name: '3DS (bottom)',
    type: 'Handheld',
    ...p240,
  },
  '3ds-horizontal': {
    tag: '3ds-horizontal',
    manufacturer: 'Nintendo',
    gen: 8,
    name: '3DS ◫',
    type: 'Handheld',
    resX: 720,
    resY: 240,
    ratioX: 3,
    ratioY: 1,
  },
  '3ds-vertical': {
    tag: '3ds-vertical',
    manufacturer: 'Nintendo',
    gen: 8,
    name: '3DS ⊟',
    type: 'Handheld',
    resX: 400,
    resY: 480,
    ratioX: 5,
    ratioY: 6,
  },
  psv: {
    tag: 'psv',
    manufacturer: 'Sony',
    gen: 8,
    name: 'PS Vita',
    type: 'Handheld',
    resX: 960,
    resY: 544,
    ratioX: 16,
    ratioY: 9,
  },

  // Hybrids
  'switch-handheld': {
    tag: 'switch-handheld',
    manufacturer: 'Nintendo',
    gen: 8.5,
    name: 'Switch (handheld)',
    type: 'Hybrid',
    ...p720,
  },
  'switch-docked': {
    tag: 'switch-docked',
    manufacturer: 'Nintendo',
    gen: 8.5,
    name: 'Switch (docked)',
    type: 'Hybrid',
    ...p1080,
  },

  // Home consoles
  nes: {
    tag: 'nes',
    manufacturer: 'Nintendo',
    gen: 3,
    name: 'NES',
    type: 'Home console',
    resX: 256,
    resY: 240,
    ratioX: 16,
    ratioY: 15,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  'mega-drive': {
    tag: 'mega-drive',
    gen: 4,
    manufacturer: 'Sega',
    name: 'Mega Drive/Genesis',
    type: 'Home console',
    resX: 320,
    resY: 224,
    ratioX: 10,
    ratioY: 7,
  },
  snes: {
    tag: 'snes',
    manufacturer: 'Nintendo',
    gen: 4,
    name: 'SNES',
    type: 'Home console',
    resX: 256,
    resY: 224,
    ratioX: 8,
    ratioY: 7,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  saturn: {
    tag: 'saturn',
    manufacturer: 'Sega',
    gen: 5,
    name: 'Saturn (NTSC)',
    type: 'Home console',
    ...p240,
  },
  psx: {
    tag: 'psx',
    manufacturer: 'Sony',
    gen: 5,
    name: 'PlayStation (NTSC)',
    type: 'Home console',
    ...p240,
  },
  n64: {
    tag: 'n64',
    manufacturer: 'Nintendo',
    gen: 5,
    name: 'Nintendo 64 (NTSC)',
    type: 'Home console',
    ...p240,
  },
  dc: {
    tag: 'dc',
    manufacturer: 'Sega',
    gen: 6,
    name: 'Dreamcast (NTSC)',
    type: 'Home console',
    ...p480,
  },
  ps2: {
    tag: 'ps2',
    manufacturer: 'Sony',
    gen: 6,
    name: 'PlayStation 2 (NTSC)',
    type: 'Home console',
    ...p480,
  },
  ngc: {
    tag: 'ngc',
    manufacturer: 'Nintendo',
    gen: 6,
    name: 'Gamecube (NTSC)',
    type: 'Home console',
    ...p480,
  },
  xbox: {
    tag: 'xbox',
    manufacturer: 'Microsoft',
    gen: 6,
    name: 'Xbox (NTSC)',
    type: 'Home console',
    ...p480,
  },

  // Fantasy consoles
  'pico-8': {
    tag: 'pico-8',
    manufacturer: 'Other',
    gen: 'Fantasy',
    name: 'PICO-8',
    type: 'Fantasy console',
    resX: 128,
    resY: 128,
    ratioX: 1,
    ratioY: 1,
  },
  'tic-80': {
    tag: 'tic-80',
    manufacturer: 'Other',
    gen: 'Fantasy',
    name: 'TIC-80',
    type: 'Fantasy console',
    resX: 240,
    resY: 136,
    ratioX: 30,
    ratioY: 17,
    closestRatioX: 16,
    closestRatioY: 9,
  },

  // Others
  vb: {
    tag: 'vb',
    manufacturer: 'Nintendo',
    gen: 5,
    name: 'Virtual Boy',
    type: 'Other',
    resX: 384,
    resY: 224,
    ratioX: 12,
    ratioY: 7,
  },
}

export const consoleGroupingOptions = ['Type', 'Manufacturer'] as const
export type ConsoleGroupingOption = (typeof consoleGroupingOptions)[number]

export type ConsolesByManufacturer = Record<ConsoleManufacturer, Console[]>
export const consolesByManufacturer: ConsolesByManufacturer = consoleManufacturers.reduce(
  (consolesBy, manufacturer) => ({ ...consolesBy, [manufacturer]: [] }),
  {} as ConsolesByManufacturer,
)

export type ConsolesByType = Record<ConsoleType, Console[]>
export const consolesByType: ConsolesByType = {
  Handheld: [],
  Hybrid: [],
  'Home console': [],
  'Fantasy console': [],
  Other: [],
}

//
;(Object.keys(consolesByTag) as ConsoleTag[]).forEach((tag) => {
  const console = consolesByTag[tag]
  consolesByManufacturer[console.manufacturer].push(console)
  consolesByType[console.type].push(console)
})
