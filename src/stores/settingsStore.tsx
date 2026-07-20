import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  screensMaxDisplayWidth: boolean
  minimumComfortableScreenSize: number
}

interface Action {
  setScreensMaxDisplayWidth: (screensMaxDisplayWidth: State['screensMaxDisplayWidth']) => void
  setMinimumComfortableScreenSize: (
    minimumScreenSize: State['minimumComfortableScreenSize'],
  ) => void
}

export const useSettingsStore = create<State & Action>()(
  persist(
    (set) => ({
      screensMaxDisplayWidth: true,
      setScreensMaxDisplayWidth: (screensMaxDisplayWidth) =>
        set(() => ({ screensMaxDisplayWidth })),

      minimumComfortableScreenSize: 2.8,
      setMinimumComfortableScreenSize: (minimumScreenSize) =>
        set(() => ({ minimumComfortableScreenSize: minimumScreenSize })),
    }),

    { name: 'settings-storage' },
  ),
)
