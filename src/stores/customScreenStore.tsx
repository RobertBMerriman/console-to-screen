import { create } from 'zustand'

import { type Screen } from '@/lib/screenData'
import { sanitiseTags } from '@/stores/persistUtils'
import { storageKeys } from '@/stores/storageKeys'
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

const defaultState: State = {
  selectedTags: [],
  customScreens: {},
}

/** Custom screens come from user input, so a persisted one can be any shape. */
function isCustomScreen(value: unknown): value is CustomScreen {
  if (!value || typeof value !== 'object') return false

  const screen = value as Record<string, unknown>
  const numbers = ['sizeInches', 'resX', 'resY', 'ratioX', 'ratioY'] as const

  if (typeof screen.tag !== 'string' || typeof screen.name !== 'string') return false

  return numbers.every((key) => typeof screen[key] === 'number' && Number.isFinite(screen[key]))
}

function sanitiseCustomScreens(value: unknown): State['customScreens'] | undefined {
  if (!value || typeof value !== 'object') return undefined

  return Object.fromEntries(
    Object.entries(value).filter(([tag, screen]) => isCustomScreen(screen) && screen.tag === tag),
  ) as State['customScreens']
}

export const useCustomScreenStore = create<State & Action>()(
  persist(
    (set) => ({
      ...defaultState,

      selectTag: (tag) => set(({ selectedTags }) => ({ selectedTags: [...selectedTags, tag] })),
      setSelectedTags: (selectedTags) => set(() => ({ selectedTags })),
      unSelectTag: (tag) =>
        set(({ selectedTags }) => ({ selectedTags: selectedTags.filter((s) => s !== tag) })),

      setCustomScreens: (customScreens) => set(() => ({ customScreens })),
      addCustomScreen: (customScreen) =>
        set(({ customScreens }) => ({
          customScreens: { ...customScreens, [customScreen.tag]: customScreen },
        })),
      deleteScreen: (tag) =>
        set(({ customScreens, selectedTags }) => {
          const { [tag]: _, ...remaining } = customScreens

          return {
            customScreens: remaining,
            selectedTags: selectedTags.filter((s) => s !== tag),
          }
        }),
    }),

    {
      name: storageKeys.customScreen,
      version: 1,
      merge: (persisted, current) => {
        const customScreens =
          sanitiseCustomScreens((persisted as State | undefined)?.customScreens) ??
          current.customScreens

        return {
          ...current,
          customScreens,
          // A selected tag with no surviving screen would render as undefined
          selectedTags:
            sanitiseTags((persisted as State | undefined)?.selectedTags, customScreens) ??
            current.selectedTags,
        }
      },
    },
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
