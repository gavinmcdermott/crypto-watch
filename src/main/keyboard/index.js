import { startCopyWatch, stopCopyWatch } from './copy'
import { startPasteWatch, stopPasteWatch } from './paste'
import { lockKeyboard, unlockKeyboard } from './lock'

export default {
  copy: {
    startWatch: startCopyWatch,
    stopWatch: stopCopyWatch,
  },
  paste: {
    startWatch: startPasteWatch,
    stopWatch: stopPasteWatch,
  },
  lock: lockKeyboard,
  unlock: unlockKeyboard,
}
