import { create } from 'zustand'

import {
  consoleGroupingOptions,
  consolesByTag,
  type Console,
  type ConsoleGroupingOption,
  type ConsoleTag,
} from '@/lib/consoleData'
import { persist } from 'zustand/middleware'

interface State {
  tags: ConsoleTag[]
  grouping: ConsoleGroupingOption
  integerScaling: boolean
  cropOverscan: boolean
}

interface Action {
  setConsolesByTags: (tags: State['tags']) => void
  setGrouping: (grouping: State['grouping']) => void
  setIntegerScaling: (integerScaling: State['integerScaling']) => void
  setCropOverscan: (cropOverscan: State['cropOverscan']) => void
}

export const useConsoleStore = create<State & Action>()(
  persist(
    (set) => ({
      tags: ['nds-vertical'],
      setConsolesByTags: (tags) => set(() => ({ tags })),

      grouping: consoleGroupingOptions[0],
      setGrouping: (grouping) => set(() => ({ grouping })),

      integerScaling: false,
      setIntegerScaling: (integerScaling) => set(() => ({ integerScaling })),

      cropOverscan: false,
      setCropOverscan: (cropOverscan) => set(() => ({ cropOverscan })),
    }),

    { name: 'console-storage' },
  ),
)

export const useConsoles = (): Console[] => {
  return useConsoleStore((state) => state.tags).map((tag) => consolesByTag[tag])
}
