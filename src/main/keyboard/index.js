import { startCopyWatch, stopCopyWatch } from './copy'
import { startPasteWatch, stopPasteWatch } from './paste'
import { lockKeys, unlockKeys } from './lock'

export default {
  copy: {
    startWatch: startCopyWatch,
    stopWatch: stopCopyWatch,
  },
  paste: {
    startWatch: startPasteWatch,
    stopWatch: stopPasteWatch,
  },
  lock: lockKeys,
  unlock: unlockKeys,
}
