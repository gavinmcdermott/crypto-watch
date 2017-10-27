import { ETHEREUM } from '../currency'

const DEFAULT_STATE = 'INITIAL'

const STEP_STATES = {
  INITIAL: 'INITIAL',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  DETAIL: 'DETAIL',
}

const STEPS = {
  ADDR_COPIED: 'ADDR_COPIED',
  ADDR_VERIFIED: 'ADDR_VERIFIED',
  TX_INFO_ENTERED: 'TX_INFO_ENTERED',
  ADD_PASTED: 'ADD_PASTED',
}

export default {
  name: ETHEREUM.name,
  steps: [
    {
      title: STEPS.ADDR_COPIED,
      currentState: DEFAULT_STATE,
      states: {
        INITIAL: {
          title: 'INITIAL title text',
          icon: '//some_path_to_icon'
        },
        SUCCESS: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        ERROR: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        DETAIL: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      },
    },
    {
      title: STEPS.ADDR_VERIFIED,
      currentState: DEFAULT_STATE,
      states: {
        INITIAL: {
          title: 'INITIAL title text',
          icon: '//some_path_to_icon'
        },
        SUCCESS: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        ERROR: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        DETAIL: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      }
    },
    {
      title: STEPS.TX_INFO_ENTERED,
      currentState: DEFAULT_STATE,
      states: {
        INITIAL: {
          title: 'INITIAL title text',
          icon: '//some_path_to_icon'
        },
        SUCCESS: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        ERROR: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        DETAIL: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      }
    },
    {
      title: STEPS.ADD_PASTED,
      currentState: DEFAULT_STATE,
      states: {
        INITIAL: {
          title: 'INITIAL title text',
          icon: '//some_path_to_icon'
        },
        SUCCESS: {
          title: 'SUCCESS title text',
          icon: '//some_path_to_icon'
        },
        ERROR: {
          title: 'ERROR title text',
          icon: '//some_path_to_icon'
        },
        DETAIL: {
          title: 'DETAIL title text',
          icon: '//some_path_to_icon'
        },
      },
    }
  ]
}
