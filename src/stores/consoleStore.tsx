import { create } from 'zustand'

import { consolesByTag, type ConsoleTag, type Console } from '@/lib/consoleData'
import { persist } from 'zustand/middleware'

interface State {
  console: Console
  integerScaling: boolean
}

interface Action {
  setConsoleByTag: (tag: ConsoleTag) => void
  setIntegerScaling: (integerScaling: State['integerScaling']) => void
}

export const useConsoleStore = create<State & Action>()(
  persist(
    (set) => ({
      console: consolesByTag['nds-vertical'],
      setConsoleByTag: (tag) => set(() => ({ console: consolesByTag[tag] })),
      integerScaling: true,
      setIntegerScaling: (integerScaling) => set(() => ({ integerScaling })),
    }),
    { name: 'console-storage' }
  )
)
