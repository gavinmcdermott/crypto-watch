import robot from 'robotjs'
import { globalShortcut, ipcMain } from 'electron'
import { log, logError } from '../../common/debug'
import { EVENT_TYPES } from '../../constants/events'

// NEED TO FIGURE OUT THE BUG HERE...
// NEED TO FIGURE OUT THE BUG HERE...
// NEED TO FIGURE OUT THE BUG HERE...
console.log(globalShortcut)
// NEED TO FIGURE OUT THE BUG HERE...
// NEED TO FIGURE OUT THE BUG HERE...
// NEED TO FIGURE OUT THE BUG HERE...

const EMPTY_STR = ''

const LETTERS = [
  'Q','W','E','R','T','Y','U','I','O','P','A','S','D',
  'F','G','H','J','K','L','Z','X','C','V','B','N','M',
]
const NUMBERS = ['0','1','2','3','4','5','6','7','8','9',]
const PUNCTUATIONS = ['`','-','=','[',']','\\','\'',';',',','.','/',]
const FUNCS = [
  'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14',
  'F15','F16','F17','F18','F19','F20','F21','F22','F23','F24',
]
const NAMED_KEYS = [
  'Plus','Space','Tab','Backspace','Delete','Insert','Return',
  'Esc','PageUp','PageDown','Up','Down','Left','Right',
]

const KEYS_TO_BE_LOCKED = LETTERS.concat(NUMBERS, PUNCTUATIONS, FUNCS, NAMED_KEYS)


// TODO: figure out the option/ctrl issue!!!!!
// E.g.: control+H, control+U
const KEY_MODIFIERS = [
  EMPTY_STR, // register an empty string to register individual keys themselves
  'Alt+',
  'Shift+',
  'CmdOrCtrl+',
  'Shift+Alt+',
  'Shift+CmdOrCtrl+',
]

// Do not lock these key commands when locking the keyboard
const KEYS_TO_LEAVE_ACTIVE = [
  'CmdOrCtrl+Q',    // quitting the app
  'CmdOrCtrl+Tab',  // switching between apps
  'Esc',
  'PageUp',
  'PageDown',
  'Up',
  'Down',
  'Left',
  'Right',
]

const shouldLockCommand = (keyCommand) => {
  let leaveActive = false
  KEYS_TO_LEAVE_ACTIVE.forEach((cmd) => {
    if (cmd === keyCommand) leaveActive = true
  })
  return leaveActive
}

export const lockKeys = () => {
  KEY_MODIFIERS.forEach((keyModifier) => {
    // create a new iterator for each key modifier
    const keys = KEYS_TO_BE_LOCKED[Symbol.iterator]()

    for (let key of keys) {
      let commandString = key

      if (keyModifier !== EMPTY_STR) {
        commandString = `${keyModifier}${key}`
      }

      if (!shouldLockCommand(commandString)) {
        let locked = globalShortcut.register(commandString, () => {
          log(`Keypress prevented (${commandString}) at UTC:${new Date().getTime()}`)
        })
        if (!locked) logError(`Keyboard failed to lock ${commandString}`)
      }
    }
  })
  ipcMain.emit(EVENT_TYPES.KEYBOARD_LOCKED)
  log(`keyboard locked`)
}

export const unlockKeys = () => {
  globalShortcut.unregisterAll()
  ipcMain.emit(EVENT_TYPES.KEYBOARD_UNLOCKED)
  log(`keyboard unlocked`)
}
