import { clipboard, globalShortcut, ipcMain } from 'electron'
import robot from 'robotjs'
import _ from 'lodash'
import { log, logError } from '../../common/debug'
import { EVENT_TYPES } from '../../constants/events'

// TODO:
// - better error handling
// - have ui reflect paste capture delay
// - security checks on the pasted value (from memory, hashes, etc.)


const THROTTLE_DELAY_MS = 4000
const PASTE_CAPTURE_DELAY_MS = 500

let pasteHandler = null

// EXPORT THESE LOCKS TO THE LOCK FILE
const PASTE_COMMAND = 'CmdOrCtrl+V'

const lockPaste = () => globalShortcut.register(PASTE_COMMAND, () => {})
const unlockPaste = () => globalShortcut.unregister(PASTE_COMMAND)

const capturePaste = () => {
  const value = clipboard.readText()

  ipcMain.emit(EVENT_TYPES.PASTE_STARTED, { value })
  log(`paste started ${value}`)

  // Immediately deregister the paste handler so we don't trigger
  // an infinite loop when we use robotjs to paste the value
  stopPasteWatch()
  // lock paste so the user can't paste multiple values quickly
  lockPaste()

  setTimeout(() => {
    unlockPaste()
    robot.keyTap('v', 'command')
    // lock the paste command until the keyboard is unlocked
    lockPaste()

    ipcMain.emit(EVENT_TYPES.PASTE_FINISHED, { value })
    log(`paste triggered ${clipboard.readText()}`)
  }, PASTE_CAPTURE_DELAY_MS)
}

// throttle the paste capture command to prevent
// multiple pastes in quick succession
const onPaste = _.throttle(capturePaste, THROTTLE_DELAY_MS, { leading: true })

export const startPasteWatch = () => {
  if (pasteHandler) {
    log(`paste handler already registered`)
    return
  }

  pasteHandler = globalShortcut.register(PASTE_COMMAND, onPaste)

  if (!pasteHandler) {
    logError(`Unable to register ${PASTE_COMMAND}`)
    // ERROR HANDLING: NOTIFY THE RENDER PROCESS / USER
  }

  log(`paste handler registered`)
  ipcMain.emit(EVENT_TYPES.PASTE_WATCH_STARTED)
}

export const stopPasteWatch = () => {
  pasteHandler = null
  unlockPaste()
  ipcMain.emit(EVENT_TYPES.PASTE_WATCH_STOPPED)
  log(`paste handler deregistered`)
}
