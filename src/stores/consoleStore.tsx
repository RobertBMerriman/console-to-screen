import { create } from 'zustand'

import {
  aboveNgc,
  consoleGroupingOptions,
  consolesByTag,
  consoleTags,
  upToDcN64Psp,
  upToNgcPs2,
  upToPs1NoProblem,
  type Console,
  type ConsoleGroupingOption,
  type ConsoleTag,
} from '@/lib/consoleData'
import { sanitiseByDefaults, sanitiseOneOf, sanitiseTags } from '@/stores/persistUtils'
import { storageKeys } from '@/stores/storageKeys'
import { persist } from 'zustand/middleware'

export type PerfBracket = 'upToPs1NoProblem' | 'upToDcN64Psp' | 'upToNgcPs2' | 'aboveNgc'
const perfBrackets: Record<PerfBracket, ConsoleTag[]> = {
  upToPs1NoProblem: upToPs1NoProblem,
  upToDcN64Psp: upToDcN64Psp,
  upToNgcPs2: upToNgcPs2,
  aboveNgc: aboveNgc,
}

interface State {
  tags: ConsoleTag[]
  grouping: ConsoleGroupingOption
  integerScaling: boolean
  cropOverscan: boolean
}

interface Action {
  setConsolesByTags: (tags: State['tags']) => void
  clearAll: () => void
  selectAll: () => void
  selectByPerformance: (bracket: PerfBracket) => void
  addByPerformance: (bracket: PerfBracket) => void

  setGrouping: (grouping: State['grouping']) => void

  setIntegerScaling: (integerScaling: State['integerScaling']) => void

  setCropOverscan: (cropOverscan: State['cropOverscan']) => void
}

const defaultState: State = {
  tags: ['gba'],
  grouping: consoleGroupingOptions[0],
  integerScaling: false,
  cropOverscan: false,
}

export const useConsoleStore = create<State & Action>()(
  persist(
    (set) => ({
      ...defaultState,

      setConsolesByTags: (tags) => set(() => ({ tags })),
      clearAll: () => set(() => ({ tags: [] })),
      selectAll: () => set(() => ({ tags: consoleTags.toReversed() })),
      selectByPerformance: (bracket: PerfBracket) => set(() => ({ tags: [...perfBrackets[bracket]] })),
      addByPerformance: (bracket: PerfBracket) =>
        set(({ tags }) => ({ tags: Array.from(new Set([...tags, ...perfBrackets[bracket]])) })),

      setGrouping: (grouping) => set(() => ({ grouping })),

      setIntegerScaling: (integerScaling) => set(() => ({ integerScaling })),

      setCropOverscan: (cropOverscan) => set(() => ({ cropOverscan })),
    }),

    {
      name: storageKeys.console,
      version: 1,
      merge: (persisted, current) => ({
        ...current,
        ...sanitiseByDefaults(persisted, defaultState),
        tags: sanitiseTags((persisted as State | undefined)?.tags, consolesByTag) ?? current.tags,
        grouping:
          sanitiseOneOf((persisted as State | undefined)?.grouping, consoleGroupingOptions) ??
          current.grouping,
      }),
    },
  ),
)

export const useConsoles = (): Console[] => {
  return useConsoleStore((state) => state.tags).map((tag) => consolesByTag[tag])
}
