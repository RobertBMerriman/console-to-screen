import { create } from 'zustand'

import type { ScreenTag } from '@/lib/screenData'

interface State {
  screen: ScreenTag
}

interface Action {
  setScreen: (screen: State['screen']) => void
}

export const useScreenStore = create<State & Action>()((set) => ({
  screen: 'trimui-brick',
  setScreen: (screen) => set(() => ({ screen })),
}))
