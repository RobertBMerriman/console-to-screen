import { useConsoleStore } from '@/stores/consoleStore'
import { useCustomScreenStore } from '@/stores/customScreenStore'
import { useScreenStore } from '@/stores/screenStore'
import { clearStoredState } from '@/stores/storageKeys'

export function resetSelections() {
  useConsoleStore.getState().clearAll()
  useScreenStore.getState().setScreensByTags([])
  useCustomScreenStore.getState().setSelectedTags([])

  location.reload()
}

export function resetEverything() {
  clearStoredState()

  location.reload()
}
