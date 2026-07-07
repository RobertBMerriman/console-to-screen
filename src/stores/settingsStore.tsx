import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  screensMaxDisplayWidth: boolean
}

interface Action {
  setScreensMaxDisplayWidth: (screensMaxDisplayWidth: State['screensMaxDisplayWidth']) => void
}

export const useSettingsStore = create<State & Action>()(
  persist(
    (set) => ({
      screensMaxDisplayWidth: true,
      setScreensMaxDisplayWidth: (screensMaxDisplayWidth) =>
        set(() => ({ screensMaxDisplayWidth })),
    }),

    { name: 'settings-storage' },
  ),
)
