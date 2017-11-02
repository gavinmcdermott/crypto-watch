import { ETHEREUM } from '../../currency'
import ITEM_STATES from './item-states'

const DEFAULT_STATE = ITEM_STATES.INITIAL

const CHECKLIST_ITEMS = {
  ADDR_COPIED: 'ADDR_COPIED',
  ADDR_VERIFIED: 'ADDR_VERIFIED',
  TX_INFO_ENTERED: 'TX_INFO_ENTERED',
  ADD_PASTED: 'ADD_PASTED',
}

export default {
  name: ETHEREUM.name,
  items: [
    {
      title: CHECKLIST_ITEMS.ADDR_COPIED,
      state: DEFAULT_STATE,
      states: {
        [ITEM_STATES.INITIAL]: {
          title: 'INITIAL title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.SUCCESS]: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.ERROR]: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.DETAIL]: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      },
    },
    {
      title: CHECKLIST_ITEMS.ADDR_VERIFIED,
      state: DEFAULT_STATE,
      states: {
        [ITEM_STATES.INITIAL]: {
          title: 'INITIAL title text here too',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.SUCCESS]: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.ERROR]: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.DETAIL]: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      }
    },
    {
      title: CHECKLIST_ITEMS.TX_INFO_ENTERED,
      state: DEFAULT_STATE,
      states: {
        [ITEM_STATES.INITIAL]: {
          title: 'INITIAL title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.SUCCESS]: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.ERROR]: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.DETAIL]: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      }
    },
    {
      title: CHECKLIST_ITEMS.ADD_PASTED,
      state: DEFAULT_STATE,
      states: {
        [ITEM_STATES.INITIAL]: {
          title: 'INITIAL title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.SUCCESS]: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.ERROR]: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        [ITEM_STATES.DETAIL]: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      },
    }
  ]
}
