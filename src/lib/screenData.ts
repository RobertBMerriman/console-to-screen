export const screenTags = ['trimui-brick'] as const
export type ScreenTag = (typeof screenTags)[number]

export const screenRatioTypes = ['1:1', '3:2', '4:3', '3:5', '5:3', '16:9', 'Other'] as const
export type ScreenRatioType = (typeof screenRatioTypes)[number]

export interface Screen {
  tag: ScreenTag
  name: string
  resX: number
  resY: number
  sizeInches: number
  ratioType: ScreenRatioType
  ratioX: number
  ratioY: number
}
export const screens: Screen[] = [
  {
    tag: 'trimui-brick',
    name: 'TrimUI Brick',
    resX: 1024,
    resY: 768,
    sizeInches: 3.2,
    ratioType: '4:3',
    ratioX: 4,
    ratioY: 3,
  },
]

export type ScreensByTag = Record<ScreenTag, Screen>
export let screensByTag: ScreensByTag = {} as ScreensByTag

export type ScreensByRatio = Record<ScreenRatioType, Screen[]>
export const screensByRatio: ScreensByRatio = screenRatioTypes.reduce(
  (screensBy, ratio) => ({ ...screensBy, [ratio]: [] }),
  {} as ScreensByRatio
)
screens.forEach((screen) => {
  screensByTag[screen.tag] = screen
  screensByRatio[screen.ratioType].push(screen)
})
