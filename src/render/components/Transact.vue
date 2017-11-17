<template>
  <div>

    <div class="header">
      <div class="container">

        <div class="row">
          <div class="col-12">
            <h1>Address in Clipboard</h1>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="header-callout">
              <span v-show="!validAddress">
                Copy an Ethereum address to get started
              </span>
              <span v-show="validAddress">
                <p>{{splitCopyValue[0]}}</p>
                <p>{{splitCopyValue[1]}}</p>
              </span>
            </div>
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-12">
            <label class="switch tile-switch" v-bind:class="{ 'active': keyboard.isLocked }">
              <div></div>
            </label>

            <h2 v-if="keyboard.isLocked">Keyboard Locked</h2>
            <h2 v-else class="u-font--gray">Keyboard Unlocked</h2>
          </div>
        </div> -->

      </div>
    </div>

    <eth-tile-addr-in-clipboard />
    <eth-tile-addr-verified />
    <eth-tile-tx-info-entered />
    <eth-tile-addr-pasted />
    <eth-tile-tx-state />

  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'

  import EthTileAddrInClipboard from './tiles/EthTileAddrInClipboard'
  import EthTileAddrVerified from './tiles/EthTileAddrVerified'
  import EthTileTxInfoEntered from './tiles/EthTileTxInfoEntered'
  import EthTileAddrPasted from './tiles/EthTileAddrPasted'
  import EthTileTxState from './tiles/EthTileTxState'

  // import EthTiles from './tiles/EthTiles'
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'
  import { addressType } from '../../common/crypto'

  let killClipboardChangeWatch = null

  const splitValue = (value) => {
    const val = value || ""
    const index = Math.floor(val.length / 2)
    return [ val.substr(0, index), val.substr(index) ]
  }

  export default {
    components: {
      // EthTiles,
      EthTileAddrInClipboard,
      EthTileAddrVerified,
      EthTileTxInfoEntered,
      EthTileAddrPasted,
      EthTileTxState,
    },
    computed: {
      transaction () {
        return this.$store.getters.transaction
      },
      keyboard () {
        return this.$store.getters.keyboard
      },
      splitCopyValue () {
        return splitValue(this.$store.getters.copy.lastEvent.value)
      },
      validAddress () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return addressType(lastCopy)
      },
      // wasValidPaste () {
      //   const lastPasteValue = this.$store.getters.paste.lastEvent.value
      //   return addressType(lastPasteValue)
      // },
    },
    methods: {
      startTxWatch () {
        // Vue
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, true)
        this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error: null })
        // IPC
        ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
      },
      stopTxWatch () {
        // Vue
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
        // IPC
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
        ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)
      },
    },
    mounted () {
      if (this.validAddress) {
        this.startTxWatch()
      }

      killClipboardChangeWatch = this.$store.watch(
        () => this.$store.getters.copy.lastEvent.value,
        (newValue) => {
          const txInProgress = this.$store.getters.transaction.inProgress
          const validAddress = addressType(newValue)

          if (txInProgress) {
            const error = new Error(`Clipboard value unexpectedly changed!`)
            this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error })
            this.stopTxWatch()
          }
          if (validAddress && !txInProgress) {
            this.startTxWatch()
          }
        }
      )
    },
    beforeDestroy () {
      // clean up all store listeners
      if (killClipboardChangeWatch) killClipboardChangeWatch()
    },
  }
</script>
