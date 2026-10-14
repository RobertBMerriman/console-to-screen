import { create } from 'zustand'

import {
  screenGroupingOptions,
  screensByTag,
  type Screen,
  type ScreenGroupingOption,
  type ScreenTag,
} from '@/lib/screenData'
import { sanitiseOneOf, sanitiseTags } from '@/stores/persistUtils'
import { storageKeys } from '@/stores/storageKeys'
import { persist } from 'zustand/middleware'

interface State {
  tags: ScreenTag[]
  grouping: ScreenGroupingOption
}

interface Action {
  setScreensByTags: (tags: State['tags']) => void
  setGrouping: (grouping: State['grouping']) => void
}

const defaultState: State = {
  tags: ['trimui-brick'],
  grouping: screenGroupingOptions[0],
}

export const useScreenStore = create<State & Action>()(
  persist(
    (set) => ({
      ...defaultState,

      setScreensByTags: (tags) => set(() => ({ tags })),

      setGrouping: (grouping) => set(() => ({ grouping })),
    }),

    {
      name: storageKeys.screen,
      version: 1,
      merge: (persisted, current) => ({
        ...current,
        tags: sanitiseTags((persisted as State | undefined)?.tags, screensByTag) ?? current.tags,
        grouping:
          sanitiseOneOf((persisted as State | undefined)?.grouping, screenGroupingOptions) ??
          current.grouping,
      }),
    },
  ),
)

export const useScreens = (): Screen[] => {
  return useScreenStore((state) => state.tags).map((tag) => screensByTag[tag])
}
