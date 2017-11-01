import robot from 'robotjs'
import { globalShortcut } from 'electron'
import { log, logError } from '../common/debug'

const EMPTY_STR = ''

// All keys
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
const NAMED_KEYS = ['Plus','Space','Tab','Backspace','Delete','Insert','Return']
const KEYS_TO_BE_LOCKED = LETTERS.concat(NUMBERS, PUNCTUATIONS, FUNCS, NAMED_KEYS)

// Key modifiers (needed to register in addition to keys)
const KEY_MODIFIERS = [
  EMPTY_STR, // needed in order to register all individual keys too
  'Alt+',
  'Shift+',
  'CmdOrCtrl+',
  'Shift+Alt+',
  'Shift+CmdOrCtrl+',
]

// Do not lock these key commands when protecting the user
const ACTIVE_COMMANDS_WHEN_LOCKED = [
  'CmdOrCtrl+Tab',  // allow switching between apps
  'CmdOrCtrl+C',    // allow copy
  'CmdOrCtrl+V',    // allow paste
  'CmdOrCtrl+Q',    // allow quitting the app
]

const shouldLockCommand = (keyCommand) => {
  let leaveActive = false
  ACTIVE_COMMANDS_WHEN_LOCKED.forEach((cmd) => {
    if (cmd === keyCommand) leaveActive = true
  })
  return leaveActive
}

const registerShortcuts = () => {
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
          log(`Keypress prevented (${commandString}) at ${new Date().getTime()}`)
        })
        if (locked) {
          log(`Keyboard locking ${commandString}`)
        } else {
          logError(`Keyboard failed to lock ${commandString}`)
        }
      } else {
        log(`Keyboard leaving ${commandString} active`)
      }
    }
  })
}

// TODO: better error handling
export default {
  lock: () => {
    registerShortcuts()
  },
  unlock: () => {
    globalShortcut.unregisterAll()
  },
}
