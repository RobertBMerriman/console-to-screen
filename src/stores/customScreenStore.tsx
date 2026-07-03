import { create } from 'zustand'

import { type Screen } from '@/lib/screenData'
import { persist } from 'zustand/middleware'

export interface CustomScreen extends Pick<
  Screen,
  'name' | 'sizeInches' | 'resX' | 'resY' | 'ratioX' | 'ratioY'
> {
  tag: string
}

interface State {
  // Not a single source of truth 🤔 But does allow easy ordering of selected screens
  selectedTags: string[]
  customScreens: Record<CustomScreen['tag'], CustomScreen>
}

interface Action {
  setSelectedTags: (selectedTags: State['selectedTags']) => void
  setCustomScreens: (customScreens: State['customScreens']) => void
}

export const useCustomScreenStore = create<State & Action>()(
  persist(
    (set) => ({
      selectedTags: [],
      setSelectedTags: (selectedTags) => set(() => ({ selectedTags })),

      customScreens: {},
      setCustomScreens: (customScreens) => set(() => ({ customScreens })),
    }),

    { name: 'custom-screen-storage' },
  ),
)

export const useCustomScreens = (): CustomScreen[] => {
  const selectedTags = useCustomScreenStore((state) => state.selectedTags)
  const customScreens = useCustomScreenStore((state) => state.customScreens)
  return selectedTags.map((tag) => customScreens[tag])
}
