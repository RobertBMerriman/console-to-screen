import { create } from 'zustand'

import {
  screensByTag,
  type Screen,
  type ScreenGroupingOption,
  type ScreenTag,
} from '@/lib/screenData'
import { persist } from 'zustand/middleware'

interface State {
  screen: Screen
  grouping: ScreenGroupingOption
}

interface Action {
  setScreenByTag: (tag: ScreenTag) => void
  setGrouping: (grouping: State['grouping']) => void
}

export const useScreenStore = create<State & Action>()(
  persist(
    (set) => ({
      screen: screensByTag['trimui-brick'],
      setScreenByTag: (tag) => set(() => ({ screen: screensByTag[tag] })),
      grouping: 'ratioType',
      setGrouping: (grouping) => set(() => ({ grouping })),
    }),
    { name: 'screen-storage' },
  ),
)
