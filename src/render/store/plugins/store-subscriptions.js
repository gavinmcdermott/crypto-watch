import { ipcRenderer } from 'electron'
import { EVENT_TYPES } from '../../../constants/events'
import { MUTATION_TYPES } from '../../../constants/vue/mutations'

export default (store) => {

  // store.subscribe((mutation, state) => {
  //   switch (mutation.type) {
  //     // When the clipboard value changes, cancel the transaction in
  //     // progress and clear any settings / values / keyboard locks
  //     case MUTATION_TYPES.CHANGE_COPY_VALUE:
  //       // ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
  //       // ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
  //       // ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)
  //       // store.commit(MUTATION_TYPES.CHANGE_APP_IS_TRANSACTING, false)
  //       break
  //   }
  // })

}
