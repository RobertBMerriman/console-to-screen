import { create } from 'zustand'
import { carryForward, sanitiseByDefaults } from '@/stores/persistUtils'
import { storageKeys } from '@/stores/storageKeys'
import { persist } from 'zustand/middleware'

interface State {
  minimumComfortableScreenSize: number
  compactMode: boolean
}

interface Action {
  setMinimumComfortableScreenSize: (
    minimumScreenSize: State['minimumComfortableScreenSize'],
  ) => void
  setCompactMode: (compactMode: State['compactMode']) => void
}

const defaultState: State = {
  minimumComfortableScreenSize: 2.8,
  compactMode: false,
}

export const useSettingsStore = create<State & Action>()(
  persist(
    (set) => ({
      ...defaultState,

      setMinimumComfortableScreenSize: (minimumScreenSize) =>
        set(() => ({ minimumComfortableScreenSize: minimumScreenSize })),

      setCompactMode: (compactMode) => set(() => ({ compactMode })),
    }),

    {
      name: storageKeys.settings,
      version: 1,
      migrate: carryForward,
      merge: (persisted, current) => ({
        ...current,
        ...sanitiseByDefaults(persisted, defaultState),
      }),
    },
  ),
)
