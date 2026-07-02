import { p240, p480, type ResAndRatio } from '@/lib/commonData'

export const consoleTags = [
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
  '3ds-top',
  '3ds-bottom',
  '3ds-horizontal',
  '3ds-vertical',
  'psp',
  'psv',
  'nes',
  'mega-drive',
  'snes',
  'saturn',
  'psx',
  'n64',
  'dc',
  'pico-8',
  'tic-80',
  'vb',
] as const
export type ConsoleTag = (typeof consoleTags)[number]

export const consoleManufacturers = [
  'Nintendo',
  'Sega',
  'Sony',
  'Atari',
  'SNK',
  'Bandai',
  'Other',
] as const
export type ConsoleManufacturer = (typeof consoleManufacturers)[number]

export const consoleTypes = ['Handheld', 'Home console', 'Fantasy console', 'Other'] as const
export type ConsoleType = (typeof consoleTypes)[number]

export type ConsolesByTag = Record<ConsoleTag, Console>
export interface Console extends ResAndRatio {
  tag: ConsoleTag
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
    name: 'DS ⊟',
    type: 'Handheld',
    resX: 256,
    resY: 384,
    ratioX: 2,
    ratioY: 3,
  },
  '3ds-top': {
    tag: '3ds-top',
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
    manufacturer: 'Nintendo',
    name: '3DS (bottom)',
    type: 'Handheld',
    ...p240,
  },
  '3ds-horizontal': {
    tag: '3ds-horizontal',
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
    manufacturer: 'Nintendo',
    name: '3DS ⊟',
    type: 'Handheld',
    resX: 400,
    resY: 480,
    ratioX: 5,
    ratioY: 6,
  },
  psp: {
    tag: 'psp',
    manufacturer: 'Sony',
    name: 'PSP',
    type: 'Handheld',
    resX: 480,
    resY: 272,
    ratioX: 16,
    ratioY: 9,
  },
  psv: {
    tag: 'psv',
    manufacturer: 'Sony',
    name: 'PS Vita',
    type: 'Handheld',
    resX: 960,
    resY: 544,
    ratioX: 16,
    ratioY: 9,
  },
  nes: {
    tag: 'nes',
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
    name: 'Saturn',
    type: 'Home console',
    ...p240,
  },
  psx: {
    tag: 'psx',
    manufacturer: 'Sony',
    name: 'PlayStation',
    type: 'Home console',
    ...p240,
  },
  n64: {
    tag: 'n64',
    manufacturer: 'Nintendo',
    name: 'Nintendo 64',
    type: 'Home console',
    ...p240,
  },
  dc: {
    tag: 'dc',
    manufacturer: 'Sega',
    name: 'Dreamcast',
    type: 'Home console',
    ...p480,
  },
  'pico-8': {
    tag: 'pico-8',
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
  vb: {
    tag: 'vb',
    manufacturer: 'Nintendo',
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
