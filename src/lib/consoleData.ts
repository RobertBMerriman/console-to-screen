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
  'xbox-360',
  'ps3',
  'wii',
  'wii-u',
  'wii-u-gamepad',
  'wii-u-stacked',
  'ps4',
  'xbox-one',
  // Fantasy consoles
  'pico-8',
  'tic-80',
  // Others
  'vb',
] as const
export type ConsoleTag = (typeof consoleTags)[number]

export const consoleGens = [3, 4, 5, 6, 7, 8, 8.5, 'Fantasy'] as const
export type ConsoleGen = (typeof consoleGens)[number]

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
  gen: ConsoleGen
  manufacturer: ConsoleManufacturer
  name: string
  type: ConsoleType
  closestRatioX?: number
  closestRatioY?: number
}
export const consolesByTag: Record<ConsoleTag, Console> = {
  // Handhelds
  gb: {
    tag: 'gb',
    gen: 4,
    manufacturer: 'Nintendo',
    name: 'Game Boy (Color)',
    type: 'Handheld',
    resX: 160,
    resY: 144,
    ratioX: 10,
    ratioY: 9,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  lynx: {
    tag: 'lynx',
    gen: 4,
    manufacturer: 'Atari',
    name: 'Lynx',
    type: 'Handheld',
    resX: 160,
    resY: 102,
    ratioX: 80,
    ratioY: 51,
    closestRatioX: 3,
    closestRatioY: 2,
  },
  'game-gear': {
    tag: 'game-gear',
    gen: 4,
    manufacturer: 'Sega',
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
    gen: 5,
    manufacturer: 'SNK',
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
    gen: 5,
    manufacturer: 'Bandai',
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
    gen: 6,
    manufacturer: 'Nintendo',
    name: 'Game Boy Advance',
    type: 'Handheld',
    resX: 240,
    resY: 160,
    ratioX: 3,
    ratioY: 2,
  },
  'poke-mini': {
    tag: 'poke-mini',
    gen: 6,
    manufacturer: 'Nintendo',
    name: 'Pokémon mini',
    type: 'Handheld',
    resX: 96,
    resY: 64,
    ratioX: 3,
    ratioY: 2,
  },

  'nds-single': {
    tag: 'nds-single',
    gen: 7,
    manufacturer: 'Nintendo',
    name: 'DS □',
    type: 'Handheld',
    resX: 256,
    resY: 192,
    ratioX: 4,
    ratioY: 3,
  },
  'nds-horizontal': {
    tag: 'nds-horizontal',
    gen: 7,
    manufacturer: 'Nintendo',
    name: 'DS ◫',
    type: 'Handheld',
    resX: 512,
    resY: 192,
    ratioX: 8,
    ratioY: 3,
  },
  'nds-vertical': {
    tag: 'nds-vertical',
    gen: 7,
    manufacturer: 'Nintendo',
    name: 'DS ⊟',
    type: 'Handheld',
    resX: 256,
    resY: 384,
    ratioX: 2,
    ratioY: 3,
  },
  psp: {
    tag: 'psp',
    gen: 7,
    manufacturer: 'Sony',
    name: 'PSP',
    type: 'Handheld',
    resX: 480,
    resY: 272,
    ratioX: 16,
    ratioY: 9,
  },

  '3ds-top': {
    tag: '3ds-top',
    gen: 8,
    manufacturer: 'Nintendo',
    name: '3DS (top)',
    type: 'Handheld',
    resX: 400,
    resY: 240,
    ratioX: 5,
    ratioY: 3,
  },
  '3ds-bottom': {
    tag: '3ds-bottom',
    gen: 8,
    manufacturer: 'Nintendo',
    name: '3DS (bottom)',
    type: 'Handheld',
    ...p240,
  },
  '3ds-horizontal': {
    tag: '3ds-horizontal',
    gen: 8,
    manufacturer: 'Nintendo',
    name: '3DS ◫',
    type: 'Handheld',
    resX: 720,
    resY: 240,
    ratioX: 3,
    ratioY: 1,
  },
  '3ds-vertical': {
    tag: '3ds-vertical',
    gen: 8,
    manufacturer: 'Nintendo',
    name: '3DS ⊟',
    type: 'Handheld',
    resX: 400,
    resY: 480,
    ratioX: 5,
    ratioY: 6,
  },
  psv: {
    tag: 'psv',
    gen: 8,
    manufacturer: 'Sony',
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
    gen: 8.5,
    manufacturer: 'Nintendo',
    name: 'Switch (handheld & Lite)',
    type: 'Hybrid',
    ...p720,
  },
  'switch-docked': {
    tag: 'switch-docked',
    gen: 8.5,
    manufacturer: 'Nintendo',
    name: 'Switch (docked)',
    type: 'Hybrid',
    ...p1080,
  },

  // Home consoles
  nes: {
    tag: 'nes',
    gen: 3,
    manufacturer: 'Nintendo',
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
    gen: 4,
    manufacturer: 'Nintendo',
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
    gen: 5,
    manufacturer: 'Sega',
    name: 'Saturn (NTSC)',
    type: 'Home console',
    ...p240,
  },
  psx: {
    tag: 'psx',
    gen: 5,
    manufacturer: 'Sony',
    name: 'PlayStation (NTSC)',
    type: 'Home console',
    ...p240,
  },
  n64: {
    tag: 'n64',
    gen: 5,
    manufacturer: 'Nintendo',
    name: 'Nintendo 64 (NTSC)',
    type: 'Home console',
    ...p240,
  },

  dc: {
    tag: 'dc',
    gen: 6,
    manufacturer: 'Sega',
    name: 'Dreamcast (NTSC)',
    type: 'Home console',
    ...p480,
  },
  ps2: {
    tag: 'ps2',
    gen: 6,
    manufacturer: 'Sony',
    name: 'PlayStation 2 (NTSC)',
    type: 'Home console',
    ...p480,
  },
  ngc: {
    tag: 'ngc',
    gen: 6,
    manufacturer: 'Nintendo',
    name: 'Gamecube (NTSC)',
    type: 'Home console',
    ...p480,
  },
  xbox: {
    tag: 'xbox',
    gen: 6,
    manufacturer: 'Microsoft',
    name: 'Xbox (NTSC)',
    type: 'Home console',
    ...p480,
  },

  'xbox-360': {
    tag: 'xbox-360',
    gen: 7,
    manufacturer: 'Microsoft',
    name: 'Xbox 360',
    type: 'Home console',
    ...p720,
  },
  ps3: {
    tag: 'ps3',
    gen: 7,
    manufacturer: 'Sony',
    name: 'PlayStation 3',
    type: 'Home console',
    ...p720,
  },
  wii: {
    tag: 'wii',
    gen: 7,
    manufacturer: 'Nintendo',
    name: 'Wii (NTSC)',
    type: 'Home console',
    ...p480,
  },

  'wii-u': {
    tag: 'wii-u',
    gen: 8,
    manufacturer: 'Nintendo',
    name: 'Wii U',
    type: 'Home console',
    ...p720,
  },
  'wii-u-gamepad': {
    tag: 'wii-u-gamepad',
    gen: 8,
    manufacturer: 'Nintendo',
    name: 'Wii U Gamepad',
    type: 'Home console',
    resX: 854,
    resY: 480,
    ratioX: 427,
    ratioY: 240,
    closestRatioX: 16,
    closestRatioY: 9,
  },
  'wii-u-stacked': {
    tag: 'wii-u-stacked',
    gen: 8,
    manufacturer: 'Nintendo',
    name: 'Wii U ⊟',
    type: 'Home console',
    resX: 1280,
    resY: 1200,
    ratioX: 16,
    ratioY: 15,
    closestRatioX: 1,
    closestRatioY: 1,
  },
  ps4: {
    tag: 'ps4',
    gen: 8,
    manufacturer: 'Sony',
    name: 'PlayStation 4',
    type: 'Home console',
    ...p1080,
  },
  'xbox-one': {
    tag: 'xbox-one',
    gen: 8,
    manufacturer: 'Microsoft',
    name: 'Xbox One',
    type: 'Home console',
    ...p1080,
  },

  // Fantasy consoles
  'pico-8': {
    tag: 'pico-8',
    gen: 'Fantasy',
    manufacturer: 'Other',
    name: 'PICO-8',
    type: 'Fantasy console',
    resX: 128,
    resY: 128,
    ratioX: 1,
    ratioY: 1,
  },
  'tic-80': {
    tag: 'tic-80',
    gen: 'Fantasy',
    manufacturer: 'Other',
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
    gen: 5,
    manufacturer: 'Nintendo',
    name: 'Virtual Boy',
    type: 'Other',
    resX: 384,
    resY: 224,
    ratioX: 12,
    ratioY: 7,
  },
}

export const consoleGroupingOptions = [
  'Type',
  'Manufacturer',
  'Generation',
  'Aspect ratio',
] as const
export type ConsoleGroupingOption = (typeof consoleGroupingOptions)[number]

export type ConsolesByGen = Record<ConsoleGen, Console[]>
export const consolesByGen: ConsolesByGen = {
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  8.5: [],
  Fantasy: [],
}

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

export type ConsolesByRatio = Record<string, Console[]>
export const consolesByRatio: ConsolesByRatio = { '4:3': [], '16:9': [], '3:2': [], '1:1': [] } // Seed for ordering purposes

//
;(Object.keys(consolesByTag) as ConsoleTag[]).forEach((tag) => {
  const console = consolesByTag[tag]
  consolesByGen[console.gen].push(console)
  consolesByManufacturer[console.manufacturer].push(console)
  consolesByType[console.type].push(console)

  const ratio = console.ratioX + ':' + console.ratioY
  if (consolesByRatio.hasOwnProperty(ratio)) {
    consolesByRatio[ratio].push(console)
  } else {
    consolesByRatio[ratio] = [console]
  }
})
