import { create } from 'zustand'

import {
  consoleGroupingOptions,
  consolesByTag,
  type Console,
  type ConsoleTag,
} from '@/lib/consoleData'
import { persist } from 'zustand/middleware'

interface State {
  tag: ConsoleTag
  grouping: keyof Console
  integerScaling: boolean
  cropOverscan: boolean
}

interface Action {
  setConsoleByTag: (tag: ConsoleTag) => void
  setGrouping: (grouping: State['grouping']) => void
  setIntegerScaling: (integerScaling: State['integerScaling']) => void
  setCropOverscan: (cropOverscan: State['cropOverscan']) => void
}

export const useConsoleStore = create<State & Action>()(
  persist(
    (set) => ({
      tag: 'nds-vertical',
      setConsoleByTag: (tag) => set(() => ({ tag })),
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

export const useConsole = (): Console => {
  return consolesByTag[useConsoleStore((state) => state.tag)]
}
