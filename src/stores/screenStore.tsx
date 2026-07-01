import { create } from 'zustand'

import {
  screenGroupingOptions,
  screensByTag,
  type Screen,
  type ScreenGroupingOption,
  type ScreenTag,
} from '@/lib/screenData'
import { persist } from 'zustand/middleware'

interface State {
  tags: ScreenTag[]
  grouping: ScreenGroupingOption
}

interface Action {
  setScreensByTags: (tags: State['tags']) => void
  setGrouping: (grouping: State['grouping']) => void
}

export const useScreenStore = create<State & Action>()(
  persist(
    (set) => ({
      tags: ['trimui-brick'],
      setScreensByTags: (tags) => set(() => ({ tags })),

      grouping: screenGroupingOptions[0],
      setGrouping: (grouping) => set(() => ({ grouping })),
    }),

    { name: 'screen-storage' },
  ),
)

export const useScreens = (): Screen[] => {
  return useScreenStore((state) => state.tags).map((tag) => screensByTag[tag])
}
