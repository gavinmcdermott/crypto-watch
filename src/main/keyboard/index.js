import { startCopyWatch, stopCopyWatch } from './copy'
import { lockKeys, unlockKeys } from './lock'
import { registerPasteHandler, deregisterPasteHandler } from './paste'

export default {
  copy: {
    startWatch: startCopyWatch,
    stopWatch: stopCopyWatch,
  },
  paste: {
    registerHandler: registerPasteHandler,
    deregisterHandler: deregisterPasteHandler,
  },
  lock: lockKeys,
  unlock: unlockKeys,
}
