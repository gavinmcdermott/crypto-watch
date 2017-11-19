<template>
  <div>
    <!-- Page Title -->
    <div class="row">
      <div class="col-12">
        <h2>Address in Clipboard</h2>
      </div>
    </div>
    <!-- /Page Title -->

    <div class="section">
      <!-- Address clipboard -->
      <div class="row">
        <div class="col-12">
          <address-callout v-bind:address="clipboardValue"/>
        </div>
      </div>
      <!-- /Address clipboard -->

      <div class="row">
        <div class="col-6">
          <button v-show="!txInProgress" @click="toggleTxSupport" class="button--full-width">
            Test compare
          </button>
          <button v-show="txInProgress" @click="toggleTxSupport" class="button--full-width">
            Cancel
          </button>
        </div>
      </div>
    </div>

<!--     <div v-show="!txInProgress" class="section">
      <div class="row">
        <div class="col-12">
          <h4>About</h4>
          <p>Enable CoPilot transaction support to this is some blah blah blah copy to fit in this area.</p>
        </div>
      </div>
    </div>
 -->


    <div>
      <div class="row">
        <div class="col-12">
          <h4>Pasted Address</h4>
          <address-callout v-bind:address="clipboardValue" v-bind:class="{ 'callout--compare': txInProgress }" />
        </div>
      </div>
    </div>








    <!-- <label
      class="switch tile-switch"
      v-bind:class="{ 'active': txInProgress }"
      @click="toggleTxSupport">
      <div></div>
    </label>

    <h4 v-show="txInProgress">Disable Transaction Support</h4>
    <h4 v-show="!txInProgress">Enable Transaction Support</h4> -->











    <!-- Address paste -->
    <!-- <div class="row">
      <div class="col-12">
        <h4>Pasted Address</h4>
        <address-callout v-bind:address="paste.lastEvent.value"></address-callout>
      </div>
    </div> -->
    <!-- !Address paste -->





<!--     <div class="header">
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

        <div class="row">
          <div class="col-12">
            <label class="switch tile-switch" v-bind:class="{ 'active': keyboard.isLocked }">
              <div></div>
            </label>

            <h2 v-if="keyboard.isLocked">Keyboard Locked</h2>
            <h2 v-else class="u-font--gray">Keyboard Unlocked</h2>
          </div>
        </div>

      </div>
    </div> -->

    <!-- <eth-tile-addr-in-clipboard /> -->
    <!-- <eth-tile-addr-verified /> -->
    <!-- <eth-tile-tx-info-entered /> -->
    <!-- <eth-tile-addr-pasted /> -->
    <!-- <eth-tile-tx-state /> -->

  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'

  import AddressCallout from './address-utils/AddressCallout'
  import EtherscamBadge from './badges/EtherscamBadge'



  import EthTileAddrInClipboard from './tiles/EthTileAddrInClipboard'
  import EthTileAddrVerified from './tiles/EthTileAddrVerified'
  import EthTileTxInfoEntered from './tiles/EthTileTxInfoEntered'
  import EthTileAddrPasted from './tiles/EthTileAddrPasted'
  import EthTileTxState from './tiles/EthTileTxState'

  // import EthTiles from './tiles/EthTiles'
  // import AppHeader from './AppHeader'
  // import AppFooter from './AppFooter'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'
  import { addressType } from '../../common/crypto'

  let killClipboardChangeWatch


  export default {
    components: {
      AddressCallout,
      EtherscamBadge,


      EthTileAddrInClipboard,
      EthTileAddrVerified,
      EthTileTxInfoEntered,
      EthTileAddrPasted,
      EthTileTxState,
    },

    computed: {
      txInProgress () {
        return this.$store.getters.transaction.inProgress
      },



      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      paste () {
        return this.$store.getters.paste
      },
      wasValidPaste () {
        const lastPasteValue = this.$store.getters.paste.lastEvent.value
        return addressType(lastPasteValue)
      },


      transaction () {
        return this.$store.getters.transaction
      },
      keyboard () {
        return this.$store.getters.keyboard
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
      toggleTxSupport () {
        this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error: null })

        if (this.txInProgress) {
          this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
          return
        }

        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, true)
      },
      // startTxWatch () {
      //   // // Vue
      //   // this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, true)
      //   // this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error: null })
      //   // // IPC
      //   // ipcRenderer.send(EVENT_TYPES.START_PASTE_WATCH)
      // },
      // stopTxWatch () {
      //   // // Vue
      //   // this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
      //   // // IPC
      //   // ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
      //   // ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
      //   // ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)
      // },
    },
    // mounted () {
    //   if (this.validAddress) {
    //     this.startTxWatch()
    //   }

    //   killClipboardChangeWatch = this.$store.watch(
    //     () => this.$store.getters.copy.lastEvent.value,
    //     (newValue) => {
    //       const txInProgress = this.$store.getters.transaction.inProgress
    //       const validAddress = addressType(newValue)

    //       if (txInProgress) {
    //         const error = new Error(`Clipboard value unexpectedly changed!`)
    //         this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error })
    //         this.stopTxWatch()
    //       }
    //       if (validAddress && !txInProgress) {
    //         this.startTxWatch()
    //       }
    //     }
    //   )
    // },
    // beforeDestroy () {
    //   // clean up all store listeners
    //   if (killClipboardChangeWatch) killClipboardChangeWatch()
    // },
  }
</script>
