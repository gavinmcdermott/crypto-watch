import { startCopyWatch, stopCopyWatch } from './copy'
import { lockKeys, unlockKeys } from './lock'

export default {
  copy: {
    startWatch: startCopyWatch,
    stopWatch: stopCopyWatch,
  },
  lock: lockKeys,
  unlock: unlockKeys,
}
