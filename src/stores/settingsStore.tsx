import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  screensMaxDisplayWidth: boolean
  minimumComfortableScreenSize: number
  compactMode: boolean
}

interface Action {
  setScreensMaxDisplayWidth: (screensMaxDisplayWidth: State['screensMaxDisplayWidth']) => void
  setMinimumComfortableScreenSize: (
    minimumScreenSize: State['minimumComfortableScreenSize'],
  ) => void
  setCompactMode: (compactMode: State['compactMode']) => void
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

      compactMode: false,
      setCompactMode: (compactMode) => set(() => ({ compactMode })),
    }),

    { name: 'settings-storage' },
  ),
)
