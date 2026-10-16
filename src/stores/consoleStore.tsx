import { create } from 'zustand'

import {
  xboxWiiUSwitch,
  beyond,
  consoleGroupingOptions,
  consolesByTag,
  consoleTags,
  ndsPspDcN64,
  ps2NgcSaturn,
  upToPs1NoProblem,
  type Console,
  type ConsoleGroupingOption,
  type ConsoleTag,
} from '@/lib/consoleData'
import {
  carryForward,
  sanitiseByDefaults,
  sanitiseOneOf,
  sanitiseTags,
} from '@/stores/persistUtils'
import { storageKeys } from '@/stores/storageKeys'
import { persist } from 'zustand/middleware'

export type PerfBracket =
  'upToPs1NoProblem' | 'ndsPspDcN64' | 'ps2NgcSaturn' | 'xboxWiiUSwitch' | 'beyond'
const perfBrackets: Record<PerfBracket, ConsoleTag[]> = {
  upToPs1NoProblem: upToPs1NoProblem,
  ndsPspDcN64: ndsPspDcN64,
  ps2NgcSaturn: ps2NgcSaturn,
  xboxWiiUSwitch: xboxWiiUSwitch,
  beyond: beyond,
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
  filterByPerformance: (bracket: PerfBracket) => void

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
      selectByPerformance: (bracket: PerfBracket) =>
        set(() => ({ tags: [...perfBrackets[bracket]] })),
      addByPerformance: (bracket: PerfBracket) =>
        set(({ tags }) => ({ tags: Array.from(new Set([...tags, ...perfBrackets[bracket]])) })),
      filterByPerformance: (bracket: PerfBracket) =>
        set(({ tags }) => {
          const bracketTags = new Set<ConsoleTag>(perfBrackets[bracket])

          return { tags: tags.filter((tag) => bracketTags.has(tag)) }
        }),

      setGrouping: (grouping) => set(() => ({ grouping })),

      setIntegerScaling: (integerScaling) => set(() => ({ integerScaling })),

      setCropOverscan: (cropOverscan) => set(() => ({ cropOverscan })),
    }),

    {
      name: storageKeys.console,
      version: 1,
      migrate: carryForward,
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
