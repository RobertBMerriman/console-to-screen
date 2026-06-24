import { create } from 'zustand'

import type { ConsoleTag } from '@/lib/consoleData'

interface State {
  console: ConsoleTag
}

interface Action {
  setConsole: (console: State['console']) => void
}

export const useConsoleStore = create<State & Action>()((set) => ({
  console: 'gba',
  setConsole: (console) => set(() => ({ console })),
}))
