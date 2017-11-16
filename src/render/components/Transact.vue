<template>
  <div>

    <div class="container">
      <div class="row header">
        <div class="col-12">
          <h2>Address in Clipboard</h2>
          <p v-show="validAddress">{{clipboardValue}}</p>
          <p v-show="!validAddress">Copy an Ethereum address to get started</p>
        </div>
      </div>
    </div>

    <eth-tiles></eth-tiles>












        <!-- <button v-show="!wasValidPaste" @click="disableTxSupport">Reset CoPilot</button>
        <button v-show="wasValidPaste" @click="disableTxSupport">My Transaction Was Sent</button> -->

        <!-- <p>
          Keyboard Status:
          <span v-if="keyboard.isLocked">LOCKED</span>
          <span v-if="!keyboard.isLocked">UNLOCKED</span>
        </p> -->





      <!-- <div v-show="isTransacting">
        <button v-show="!wasValidPaste" @click="disableTxSupport">Reset CoPilot</button>
        <button v-show="wasValidPaste" @click="disableTxSupport">My Transaction Was Sent</button>

        <p>
          Keyboard Status:
          <span v-if="keyboard.isLocked">LOCKED</span>
          <span v-if="!keyboard.isLocked">UNLOCKED</span>
        </p>

        <eth-tiles></eth-tiles>
      </div> -->


  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import EthTiles from './tiles/EthTiles'
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'
  import { addressType } from '../../common/crypto'

  let killClipboardChangeWatch = null

  export default {
    components: {
      EthTiles,
    },
    computed: {
      isTransacting () {
        return this.$store.getters.transaction.inProgress
      },
      keyboard () {
        return this.$store.getters.keyboard
      },
      validAddress () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return addressType(lastCopy)
      },
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      wasValidPaste () {
        const lastPasteValue = this.$store.getters.paste.lastEvent.value
        return addressType(lastPasteValue)
      },
    },
    methods: {
      enableTxSupport () {
        // Vue
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, true)
        this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error: null })
        // IPC
        ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
      },
      disableTxSupport () {
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
        this.enableTxSupport()
      }

      killClipboardChangeWatch = this.$store.watch(
        () => this.$store.getters.copy.lastEvent.value,
        (newValue) => {
          const txInProgress = this.$store.getters.transaction.inProgress
          const validAddress = addressType(newValue)

          if (txInProgress) {
            const error = new Error(`Clipboard value unexpectedly changed!`)
            this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error })
            this.disableTxSupport()
          }
          if (validAddress && !txInProgress) {
            this.enableTxSupport()
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
