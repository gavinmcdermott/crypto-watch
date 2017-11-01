import robot from 'robotjs'
import { globalShortcut, ipcMain } from 'electron'
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
  'CmdOrCtrl',
  'Shift',
  'Alt',
  'Shift+Alt',
  'Shift+CmdOrCtrl',
]

// Do not lock these key commands
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

    const LOCKED = KEYS_TO_BE_LOCKED[Symbol.iterator]()

    for (let key of LOCKED) {
      let commandString = key

      if (keyModifier !== EMPTY_STR) {
        commandString = `${keyModifier}+${key}`
      }

      if (!shouldLockCommand(commandString)) {
        log('> LOCKING: ', commandString)
        let foo = globalShortcut.register(commandString, () => {
          log(`PREVENTED ${commandString} at: ${Math.random().toFixed(4)}`)
        })
        if (!foo) logError('could not register: ', commandString)
      } else {
        log('> NOT LOCKING: ', commandString)
      }
    }

    console.log('=========================\n')
  })
}




// Testing keyboard locking
export default registerShortcuts





// globalShortcut.register('CmdOrCtrl+V', () => {
//   console.log('captured the paste')

//   // robot.keyToggle('command', 'down')

//   // robot.keyToggle('shift', 'down')
//   globalShortcut.unregisterAll()
//   setTimeout(() => {
//     console.log('should have pasted:', clipboard.readText())
//     robot.keyTap('v', 'command')

//     // const text = clipboard.readText()
//     // console.log('passed the copy of: ', text)
//   }, 500)
// })

