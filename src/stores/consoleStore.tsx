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
  integerScaling: boolean
  grouping: keyof Console
}

interface Action {
  setConsoleByTag: (tag: ConsoleTag) => void
  setIntegerScaling: (integerScaling: State['integerScaling']) => void
  setGrouping: (grouping: State['grouping']) => void
}

export const useConsoleStore = create<State & Action>()(
  persist(
    (set) => ({
      tag: 'nds-vertical',
      setConsoleByTag: (tag) => set(() => ({ tag })),
      integerScaling: true,
      setIntegerScaling: (integerScaling) => set(() => ({ integerScaling })),
      grouping: consoleGroupingOptions[0],
      setGrouping: (grouping) => set(() => ({ grouping })),
    }),
    { name: 'console-storage' },
  ),
)

export const useConsole = () => {
  return consolesByTag[useConsoleStore((state) => state.tag)]
}
