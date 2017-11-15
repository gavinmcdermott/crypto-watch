import { ipcRenderer } from 'electron'
import { EVENT_TYPES } from '../../../constants/events'
import { MUTATION_TYPES } from '../../../constants/vue/mutations'
import { ethereum } from '../../../common/crypto'

export default (store) => {

  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case MUTATION_TYPES.CHANGE_TRANSACTION:
        if (mutation.payload.inProgress) {
          ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
          return
        }
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
        ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)
        break

      case MUTATION_TYPES.CHANGE_COPY_VALUE:
        let inProgress = store.getters.transaction.inProgress
        let newValue = mutation.payload.newValue
        let validAddress = ethereum.isAddress(newValue)

        if (inProgress) {
          store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, {
            inProgress: false,
            error: `The value in the clipboard unexpectedly changed to "${newValue}"`,
          })
          return
        }

        if (!inProgress && validAddress) {
          store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, {
            inProgress: true,
            error: null,
          })
          return
        }

        break
    }
  })

}
