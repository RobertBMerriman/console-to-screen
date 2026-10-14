export const storageKeys = {
  console: 'console-storage',
  screen: 'screen-storage',
  customScreen: 'custom-screen-storage',
  settings: 'settings-storage',
} as const

export function clearStoredState() {
  Object.values(storageKeys).forEach((key) => localStorage.removeItem(key))
}
