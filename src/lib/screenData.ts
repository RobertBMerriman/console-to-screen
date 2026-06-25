export const screenTags = ['trimui-brick'] as const
export type ScreenTag = (typeof screenTags)[number]

export const screenRatios = ['1:1', '3:2', '4:3', '3:5', '5:3', '16:9', 'Other'] as const
export type ScreenRatio = (typeof screenRatios)[number]

export interface Screen {
  tag: ScreenTag
  name: string
  resX: number
  resY: number
  ratio: ScreenRatio
  sizeInches: number
}
export const screens: Screen[] = [
  {
    tag: 'trimui-brick',
    name: 'TrimUI Brick',
    resX: 1024,
    resY: 768,
    sizeInches: 3.2,
    ratio: '4:3',
  },
]

export type ScreensByTag = Record<ScreenTag, Screen>
export let screensByTag: ScreensByTag = {} as ScreensByTag

export type ScreensByRatio = Record<ScreenRatio, Screen[]>
export const screensByRatio: ScreensByRatio = screenRatios.reduce(
  (screensBy, ratio) => ({ ...screensBy, [ratio]: [] }),
  {} as ScreensByRatio
)
screens.forEach((screen) => {
  screensByTag[screen.tag] = screen
  screensByRatio[screen.ratio].push(screen)
})
