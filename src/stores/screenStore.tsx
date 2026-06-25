import { create } from 'zustand'

import { screensByTag, type Screen, type ScreenTag } from '@/lib/screenData'

interface State {
  screen: Screen
}

interface Action {
  setScreenByTag: (tag: ScreenTag) => void
}

export const useScreenStore = create<State & Action>()((set) => ({
  screen: screensByTag['trimui-brick'],
  setScreenByTag: (tag) => set(() => ({ screen: screensByTag[tag] })),
}))
