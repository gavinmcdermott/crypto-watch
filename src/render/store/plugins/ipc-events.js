import { ipcRenderer } from 'electron'
import { EVENT_TYPES } from '../../../constants/events'
import { MUTATION_TYPES } from '../../../constants/vue/mutations'

// Register all incoming IPC-Renderer events for the app
export default (store) => {

  // Keyboard Locked
  ipcRenderer.on(EVENT_TYPES.KEYBOARD_LOCKED, () => {
    const data = { isLocked: true }
    store.commit(MUTATION_TYPES.CHANGE_KEYBOARD_LOCK, data)
  })

  // Keyboard Unlocked
  ipcRenderer.on(EVENT_TYPES.KEYBOARD_UNLOCKED, () => {
    const data = { isLocked: false }
    store.commit(MUTATION_TYPES.CHANGE_KEYBOARD_LOCK, data)
  })

  // COPY
  // Copy watch started
  ipcRenderer.on(EVENT_TYPES.COPY_WATCH_STARTED, () => {
    const data = { isWatching: true }
    store.commit(MUTATION_TYPES.CHANGE_COPY_WATCHER, data)
  })

  // Copy watch stopped
  ipcRenderer.on(EVENT_TYPES.COPY_WATCH_STOPPED, () => {
    const data = { isWatching: false }
    store.commit(MUTATION_TYPES.CHANGE_COPY_WATCHER, data)
  })

  // Copy value changes
  ipcRenderer.on(EVENT_TYPES.CLIPBOARD_CHANGED, (event, data) => {
    store.commit(MUTATION_TYPES.CHANGE_COPY_VALUE, data)
  })

  // PASTE
  // Paste watch started
  ipcRenderer.on(EVENT_TYPES.PASTE_WATCH_STARTED, () => {
    const data = { isWatching: true }
    store.commit(MUTATION_TYPES.CHANGE_PASTE_WATCHER, data)
  })

  // Paste watch stopped
  ipcRenderer.on(EVENT_TYPES.PASTE_WATCH_STOPPED, () => {
    const data = { isWatching: false }
    store.commit(MUTATION_TYPES.CHANGE_PASTE_WATCHER, data)
  })

  // Paste started
  ipcRenderer.on(EVENT_TYPES.PASTE_STARTED, () => {
    const data = { inProgress: true }
    store.commit(MUTATION_TYPES.CHANGE_PASTE_PROGRESS, data)
  })

  // Paste finished
  ipcRenderer.on(EVENT_TYPES.PASTE_FINISHED, () => {
    const data = { inProgress: false }
    store.commit(MUTATION_TYPES.CHANGE_PASTE_PROGRESS, data)
  })

  // Paste value changes
  ipcRenderer.on(EVENT_TYPES.CHANGE_PASTE_VALUE, (event, data) => {
    store.commit(MUTATION_TYPES.CHANGE_PASTE_VALUE, data)
  })

}
