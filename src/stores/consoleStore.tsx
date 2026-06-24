import { create } from 'zustand'

interface State {
  console: string
}

interface Action {
  setConsole: (selectedConsole: State['console']) => void
}

export const useConsoleStore = create<State & Action>()((set) => ({
  console: 'gba',
  setConsole: (console) => set(() => ({ console: console })),
}))
