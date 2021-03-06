export const NOTIFICATION_CLICKED = 'NOTIFICATION_CLICKED'

// Copy
export const START_COPY_WATCH = 'START_COPY_WATCH'
export const COPY_WATCH_STARTED = 'COPY_WATCH_STARTED'
export const CLIPBOARD_CHANGED = 'CLIPBOARD_CHANGED'
export const CLEAR_CLIPBOARD = 'CLEAR_CLIPBOARD'
export const STOP_COPY_WATCH = 'STOP_COPY_WATCH'
export const COPY_WATCH_STOPPED = 'COPY_WATCH_STOPPED'

// Paste
export const START_PASTE_WATCH = 'START_PASTE_WATCH'
export const PASTE_WATCH_STARTED = 'PASTE_WATCH_STARTED'

// IS_PASTING?
export const PASTE_STARTED = 'PASTE_STARTED'
export const PASTE_FINISHED = 'PASTE_FINISHED'


export const CHANGE_PASTE_VALUE = 'CHANGE_PASTE_VALUE'
export const STOP_PASTE_WATCH = 'STOP_PASTE_WATCH'
export const PASTE_WATCH_STOPPED = 'PASTE_WATCH_STOPPED'

// Keyboard
export const LOCK_KEYBOARD = 'LOCK_KEYBOARD'
export const KEYBOARD_LOCKED = 'KEYBOARD_LOCKED'
export const UNLOCK_KEYBOARD = 'UNLOCK_KEYBOARD'
export const KEYBOARD_UNLOCKED = 'KEYBOARD_UNLOCKED'

export const EVENT_TYPES = {
  [NOTIFICATION_CLICKED]: NOTIFICATION_CLICKED,

  [START_COPY_WATCH]: START_COPY_WATCH,
  [COPY_WATCH_STARTED]: COPY_WATCH_STARTED,
  [CLIPBOARD_CHANGED]: CLIPBOARD_CHANGED,
  [CLEAR_CLIPBOARD]: CLEAR_CLIPBOARD,
  [STOP_COPY_WATCH]: STOP_COPY_WATCH,
  [COPY_WATCH_STOPPED]: COPY_WATCH_STOPPED,

  [START_PASTE_WATCH]: START_PASTE_WATCH,
  [PASTE_WATCH_STARTED]: PASTE_WATCH_STARTED,
  [PASTE_STARTED]: PASTE_STARTED,
  [PASTE_FINISHED]: PASTE_FINISHED,
  [CHANGE_PASTE_VALUE]: CHANGE_PASTE_VALUE,
  [STOP_PASTE_WATCH]: STOP_PASTE_WATCH,
  [PASTE_WATCH_STOPPED]: PASTE_WATCH_STOPPED,

  [LOCK_KEYBOARD]: LOCK_KEYBOARD,
  [KEYBOARD_LOCKED]: KEYBOARD_LOCKED,
  [UNLOCK_KEYBOARD]: UNLOCK_KEYBOARD,
  [KEYBOARD_UNLOCKED]: KEYBOARD_UNLOCKED,
}
