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
  selectTag: (tag: string) => void
  unSelectTag: (tag: string) => void

  setCustomScreens: (customScreens: State['customScreens']) => void
  addCustomScreen: (customScreen: CustomScreen) => void
  deleteScreen: (tag: string) => void
}

export const useCustomScreenStore = create<State & Action>()(
  persist(
    (set, get) => ({
      selectedTags: [],
      selectTag: (tag) => set(({ selectedTags }) => ({ selectedTags: [...selectedTags, tag] })),
      setSelectedTags: (selectedTags) => set(() => ({ selectedTags })),
      unSelectTag: (tag) =>
        set(({ selectedTags }) => ({ selectedTags: selectedTags.filter((s) => s !== tag) })),

      customScreens: {},
      setCustomScreens: (customScreens) => set(() => ({ customScreens })),
      addCustomScreen: (customScreen) =>
        set(({ customScreens }) => ({
          customScreens: { ...customScreens, [customScreen.tag]: customScreen },
        })),
      deleteScreen: (tag) =>
        set(({ customScreens }) => {
          get().unSelectTag(tag)

          const { [tag]: _, ...filtered } = customScreens
          return {
            customScreens: filtered,
          }
        }),
    }),

    { name: 'custom-screen-storage' },
  ),
)

export const useSelectedCustomScreens = (): CustomScreen[] => {
  const selectedTags = useCustomScreenStore((state) => state.selectedTags)
  const customScreens = useCustomScreenStore((state) => state.customScreens)
  return selectedTags.map((tag) => customScreens[tag])
}

export const useCustomScreens = (): CustomScreen[] => {
  const customScreens = useCustomScreenStore((state) => state.customScreens)
  return Object.keys(customScreens).map((tag) => customScreens[tag])
}
