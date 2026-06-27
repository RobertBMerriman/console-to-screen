import { create } from 'zustand'

import {
  screensByTag,
  type Screen,
  type ScreenGroupingOption,
  type ScreenTag,
} from '@/lib/screenData'
import { persist } from 'zustand/middleware'

interface State {
  tag: ScreenTag
  grouping: ScreenGroupingOption
}

interface Action {
  setScreenByTag: (tag: ScreenTag) => void
  setGrouping: (grouping: State['grouping']) => void
}

export const useScreenStore = create<State & Action>()(
  persist(
    (set) => ({
      tag: 'trimui-brick',
      setScreenByTag: (tag) => set(() => ({ tag })),
      grouping: 'Aspect ratio',
      setGrouping: (grouping) => set(() => ({ grouping })),
    }),
    { name: 'screen-storage' },
  ),
)

export const useScreen = (): Screen => {
  return screensByTag[useScreenStore((state) => state.tag)]
}
