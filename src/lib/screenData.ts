import {
  p720_1by1,
  p1080,
  p240,
  p480,
  p560,
  p640_3by2,
  p720,
  p768,
  p960,
  ratio16by9,
  ratio1by1,
  ratio3by2,
  ratio4by3,
  whyThisRatio,
  type ResAndRatioWithType,
} from '@/lib/commonData'

const screenTags = [
  // Analogue
  'analogue-pocket',
  // Anbernic
  'rg-rotate',
  'rg477v',
  'rg-ds',
  'rg476h',
  'rg477m',
  'rg35xx',
  'rg34xx',
  'rg40xx',
  'rg28xx',
  'rg557',
  'rg351p',
  'rg405m',
  'rg406v',
  'rg-cube',
  'rg503',
  'rg556',
  'win600',
  'rg552',
  // Ayaneo
  'pocket-micro',
  'pocket-s',
  'pocket-evo',
  'pocket-dmg',
  // AYN
  'thor-top',
  'thor-bottom',
  'odin-3',
  'odin-2-portal',
  'odin-2',
  // FunKey
  'funkey-s',
  // FunnyPlaying
  'fp-rpp',
  // KT Pocket
  'kt-r1',
  // MagicX
  'magicx-one-35',
  'magicx-zero-40',
  // Miyoo
  'miyoo-mini',
  'miyoo-mini-v4',
  'miyoo-mini-flip',
  'miyoo-mini-plus',
  // PowKiddy
  'pk-rgb30',
  'pk-rgb10-max',
  // Retroid Pocket
  'rp-nova',
  'rp-6',
  'rp-flip-2',
  'rp-classic',
  'rp-5',
  'rp-4',
  'rp-mini',
  'rp-3',
  // SJGAM
  'sjgam-m17',
  // TrimUI
  'trimui-brick-pro',
  'trimui-brick',
  'trimui-smart-pro',
  'trimui-smart',
  // Valve
  'steam-deck',
] as const
export type ScreenTag = (typeof screenTags)[number]

export const screenManufacturers = [
  'Analogue',
  'Anbernic',
  'Ayaneo',
  'AYN',
  'FunKey',
  'FunnyPlaying',
  'KT Pocket',
  'MagicX',
  'Miyoo',
  'PowKiddy',
  'Retroid Pocket',
  'SJGAM',
  'TrimUI',
  'Valve',
] as const
export type ScreenManufacturer = (typeof screenManufacturers)[number]

export const screenRatioTypes = ['4:3', '16:9', '3:2', '1:1', 'Other'] as const
export type ScreenRatioType = (typeof screenRatioTypes)[number]

export type ScreensByTag = Record<ScreenTag, Screen>

export type Screen = ResAndRatioWithType & {
  tag: ScreenTag
  manufacturer: ScreenManufacturer
  name: string
  sizeInches: number
}
export const screensByTag: Record<ScreenTag, Screen> = {
  // Analogue
  'analogue-pocket': {
    tag: 'analogue-pocket',
    manufacturer: 'Analogue',
    name: 'Pocket',
    sizeInches: 3.5,
    resX: 1600,
    resY: 1440,
    ratioX: 10,
    ratioY: 9,
    ratioType: 'Other',
  },

  // Anbernic
  'rg-rotate': {
    tag: 'rg-rotate',
    manufacturer: 'Anbernic',
    name: 'RG Rotate',
    sizeInches: 3.5,
    ...p720_1by1,
  },
  'rg-ds': {
    tag: 'rg-ds',
    manufacturer: 'Anbernic',
    name: 'RG DS',
    sizeInches: 4,
    ...p480,
  },
  rg477v: {
    tag: 'rg477v',
    manufacturer: 'Anbernic',
    name: 'RG 477V',
    sizeInches: 4.7,
    ...p960,
  },
  rg476h: {
    tag: 'rg476h',
    manufacturer: 'Anbernic',
    name: 'RG 476H',
    sizeInches: 4.7,
    ...p960,
  },
  rg477m: {
    tag: 'rg477m',
    manufacturer: 'Anbernic',
    name: 'RG 477M',
    sizeInches: 4.7,
    ...p960,
  },
  rg35xx: {
    tag: 'rg35xx',
    manufacturer: 'Anbernic',
    name: 'RG 35XX (all models)',
    sizeInches: 3.5,
    ...p480,
  },
  rg34xx: {
    tag: 'rg34xx',
    manufacturer: 'Anbernic',
    name: 'RG 34XX (all models)',
    sizeInches: 3.4,
    resX: 720,
    resY: 480,
    ...ratio3by2,
  },
  rg40xx: {
    tag: 'rg40xx',
    manufacturer: 'Anbernic',
    name: 'RG 40XX (all models)',
    sizeInches: 4,
    ...p480,
  },
  rg28xx: {
    tag: 'rg28xx',
    manufacturer: 'Anbernic',
    name: 'RG 28XX',
    sizeInches: 2.8,
    ...p480,
  },
  rg557: {
    tag: 'rg557',
    manufacturer: 'Anbernic',
    name: 'RG 577',
    sizeInches: 5.48,
    ...p1080,
  },
  rg351p: {
    tag: 'rg351p',
    manufacturer: 'Anbernic',
    name: 'RG 351P',
    sizeInches: 3.5,
    resX: 480,
    resY: 320,
    ...ratio3by2,
  },
  rg406v: {
    tag: 'rg406v',
    manufacturer: 'Anbernic',
    name: 'RG 406V',
    sizeInches: 4,
    resX: 960,
    resY: 720,
    ...ratio4by3,
  },
  'rg-cube': {
    tag: 'rg-cube',
    manufacturer: 'Anbernic',
    name: 'RG Cube(XX)',
    sizeInches: 3.95,
    ...p720_1by1,
  },
  rg556: {
    tag: 'rg556',
    manufacturer: 'Anbernic',
    name: 'RG 556',
    sizeInches: 5.48,
    ...p1080,
  },
  rg405m: {
    tag: 'rg405m',
    manufacturer: 'Anbernic',
    name: 'RG 405(M & V)',
    sizeInches: 4,
    ...p480,
  },
  rg503: {
    tag: 'rg503',
    manufacturer: 'Anbernic',
    name: 'RG 503',
    sizeInches: 5,
    resX: 960,
    resY: 544,
    ...ratio16by9,
  },
  win600: {
    tag: 'win600',
    manufacturer: 'Anbernic',
    name: 'WIN600',
    sizeInches: 5.94,
    ...p720,
  },
  rg552: {
    tag: 'rg552',
    manufacturer: 'Anbernic',
    name: 'RG 552',
    sizeInches: 5.36,
    resX: 1920,
    resY: 1152,
    ratioX: 5,
    ratioY: 3,
    ratioType: 'Other',
  },

  // Ayaneo
  'pocket-micro': {
    tag: 'pocket-micro',
    manufacturer: 'Ayaneo',
    name: 'Pocket Micro',
    sizeInches: 3.5,
    ...p640_3by2,
  },
  'pocket-s': {
    tag: 'pocket-s',
    manufacturer: 'Ayaneo',
    name: 'Pocket S',
    sizeInches: 6,
    resX: 2560,
    resY: 1440,
    ...ratio16by9,
  },
  'pocket-evo': {
    tag: 'pocket-evo',
    manufacturer: 'Ayaneo',
    name: 'Pocket EVO',
    sizeInches: 7,
    ...p1080,
  },
  'pocket-dmg': {
    tag: 'pocket-dmg',
    manufacturer: 'Ayaneo',
    name: 'Pocket DMG',
    sizeInches: 3.92,
    ...whyThisRatio,
  },

  // AYN
  'thor-top': {
    tag: 'thor-top',
    manufacturer: 'AYN',
    name: 'Thor (top)',
    sizeInches: 6,
    ...p1080,
  },
  'thor-bottom': {
    tag: 'thor-bottom',
    manufacturer: 'AYN',
    name: 'Thor (bottom)',
    sizeInches: 3.92,
    ...whyThisRatio,
  },
  'odin-3': {
    tag: 'odin-3',
    manufacturer: 'AYN',
    name: 'Odin 3',
    sizeInches: 6,
    ...p1080,
  },
  'odin-2-portal': {
    tag: 'odin-2-portal',
    manufacturer: 'AYN',
    name: 'Odin 2 Portal',
    sizeInches: 7,
    ...p1080,
  },
  'odin-2': {
    tag: 'odin-2',
    manufacturer: 'AYN',
    name: 'Odin 2',
    sizeInches: 6,
    ...p1080,
  },

  // FunKey
  'funkey-s': {
    tag: 'funkey-s',
    manufacturer: 'FunKey',
    name: 'S',
    sizeInches: 1.54,
    resX: 240,
    resY: 240,
    ...ratio1by1,
  },

  // FunnyPlaying
  'fp-rpp': {
    tag: 'fp-rpp',
    manufacturer: 'FunnyPlaying',
    name: 'Retro Pixel Pocket',
    sizeInches: 3.1,
    ...p720_1by1,
  },

  // KT Pocket
  'kt-r1': {
    tag: 'kt-r1',
    manufacturer: 'KT Pocket',
    name: 'KT-R1',
    sizeInches: 4.5,
    resX: 1620,
    resY: 1080,
    ...ratio3by2,
  },

  // MagicX
  'magicx-one-35': {
    tag: 'magicx-one-35',
    manufacturer: 'MagicX',
    name: 'One 35',
    sizeInches: 3.5,
    ...p640_3by2,
  },
  'magicx-zero-40': {
    tag: 'magicx-zero-40',
    manufacturer: 'MagicX',
    name: 'Zero 40',
    sizeInches: 4,
    resX: 480,
    resY: 800,
    ratioX: 3,
    ratioY: 5,
    ratioType: 'Other',
  },

  // Miyoo
  'miyoo-mini': {
    tag: 'miyoo-mini',
    manufacturer: 'Miyoo',
    name: 'Mini',
    sizeInches: 2.8,
    ...p480,
  },
  'miyoo-mini-v4': {
    tag: 'miyoo-mini-v4',
    manufacturer: 'Miyoo',
    name: 'Mini (v4)',
    sizeInches: 2.8,
    ...p560,
  },
  'miyoo-mini-flip': {
    tag: 'miyoo-mini-flip',
    manufacturer: 'Miyoo',
    name: 'Mini Flip',
    sizeInches: 2.8,
    ...p560,
  },
  'miyoo-mini-plus': {
    tag: 'miyoo-mini-plus',
    manufacturer: 'Miyoo',
    name: 'Mini Plus',
    sizeInches: 3.5,
    ...p480,
  },

  // PowKiddy
  'pk-rgb30': {
    tag: 'pk-rgb30',
    manufacturer: 'PowKiddy',
    name: 'RGB30',
    sizeInches: 4,
    ...p720_1by1,
  },
  'pk-rgb10-max': {
    tag: 'pk-rgb10-max',
    manufacturer: 'PowKiddy',
    name: 'RGB10 Max',
    sizeInches: 5,
    resX: 854,
    resY: 480,
    ...ratio16by9,
  },

  // Retroid Pocket
  'rp-nova': {
    tag: 'rp-nova',
    manufacturer: 'Retroid Pocket',
    name: 'Nova',
    sizeInches: 4.5,
    ...p960,
  },
  'rp-6': {
    tag: 'rp-6',
    manufacturer: 'Retroid Pocket',
    name: '6',
    sizeInches: 5.5,
    ...p1080,
  },
  'rp-flip-2': {
    tag: 'rp-flip-2',
    manufacturer: 'Retroid Pocket',
    name: 'Flip 2',
    sizeInches: 5.5,
    ...p1080,
  },
  'rp-classic': {
    tag: 'rp-classic',
    manufacturer: 'Retroid Pocket',
    name: 'Classic',
    sizeInches: 3.92,
    ...whyThisRatio,
  },
  'rp-5': {
    tag: 'rp-5',
    manufacturer: 'Retroid Pocket',
    name: '5',
    sizeInches: 5.5,
    ...p1080,
  },
  'rp-4': {
    tag: 'rp-4',
    manufacturer: 'Retroid Pocket',
    name: '4/4 Pro',
    sizeInches: 4.7,
    resX: 1334,
    resY: 750,
    ratioX: 667,
    ratioY: 375,
    ratioType: 'Other',
  },
  'rp-mini': {
    tag: 'rp-mini',
    manufacturer: 'Retroid Pocket',
    name: 'Mini',
    sizeInches: 3.7,
    ...p960,
  },
  'rp-3': {
    tag: 'rp-3',
    manufacturer: 'Retroid Pocket',
    name: '3',
    sizeInches: 4.7,
    resX: 1334,
    resY: 750,
    ...ratio16by9,
  },

  // SJGAM
  'sjgam-m17': {
    tag: 'sjgam-m17',
    manufacturer: 'SJGAM',
    name: 'M17',
    sizeInches: 4.3,
    resX: 480,
    resY: 272,
    ...ratio16by9,
  },

  // TrimUI
  'trimui-brick-pro': {
    tag: 'trimui-brick-pro',
    manufacturer: 'TrimUI',
    name: 'Brick (Hammer) PRO (U)',
    sizeInches: 3.95,
    ...p768,
  },
  'trimui-brick': {
    tag: 'trimui-brick',
    manufacturer: 'TrimUI',
    name: 'Brick (Hammer)',
    sizeInches: 3.2,
    ...p768,
  },
  'trimui-smart-pro': {
    tag: 'trimui-smart-pro',
    manufacturer: 'TrimUI',
    name: 'Smart Pro (S)',
    sizeInches: 4.96,
    ...p720,
  },
  'trimui-smart': {
    tag: 'trimui-smart',
    manufacturer: 'TrimUI',
    name: 'Smart',
    sizeInches: 2.4,
    ...p240,
  },

  // Valve
  'steam-deck': {
    tag: 'steam-deck',
    manufacturer: 'Valve',
    name: 'Steam Deck',
    sizeInches: 7,
    resX: 1280,
    resY: 800,
    ratioX: 16,
    ratioY: 10,
    ratioType: 'Other',
  },
}

export const screenGroupingOptions = ['Aspect ratio', 'Manufacturer', 'Resolution'] as const
export type ScreenGroupingOption = (typeof screenGroupingOptions)[number]

export type ScreensByManufacturer = Record<ScreenManufacturer, Screen[]>
export const screensByManufacturer: ScreensByManufacturer = screenManufacturers.reduce(
  (screensBy, manufacturer) => ({ ...screensBy, [manufacturer]: [] }),
  {} as ScreensByManufacturer,
)

export type ScreensByRatio = Record<ScreenRatioType, Screen[]>
export const screensByRatio: ScreensByRatio = screenRatioTypes.reduce(
  (screensBy, ratio) => ({ ...screensBy, [ratio]: [] }),
  {} as ScreensByRatio,
)

export type ScreensByRes = Record<string, Screen[]>
export const screensByRes: ScreensByRes = {} as ScreensByRes

//
;(Object.keys(screensByTag) as ScreenTag[]).forEach((tag) => {
  const screen = screensByTag[tag]
  screensByManufacturer[screen.manufacturer].push(screen)
  screensByRatio[screen.ratioType].push(screen)

  // TODO: Order these somehow...
  const res = screen.resX + 'x' + screen.resY
  if (screensByRes.hasOwnProperty(res)) {
    screensByRes[res].push(screen)
  } else {
    screensByRes[res] = [screen]
  }
})
