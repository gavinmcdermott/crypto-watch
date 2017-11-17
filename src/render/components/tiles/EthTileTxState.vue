<template>
  <div class="tile outer-tile">
    <div class="inner-tile borderless">

      <div class="row">
        <div class="col-7">
          <!-- <label class="switch tile-switch" v-bind:class="{ 'active': keyboard.isLocked }">
            <div></div>
          </label>

          <h2 v-if="keyboard.isLocked">Keyboard Locked</h2>
          <h2 v-else class="u-font--gray">Keyboard Unlocked</h2> -->
          <h2 v-bind:class="{ 'u-font--gray': !keyboard.isLocked }">Keyboard Locked</h2>
        </div>

        <div class="col-5">
          <span class="u-float--right">
            <button @click="disableTxSupport" v-bind:class="{ 'disabled': !transaction.inProgress }">Reset</button>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import { addressType } from '../../../common/crypto'
  import { MUTATION_TYPES } from '../../../constants/vue/mutations'
  import { EVENT_TYPES } from '../../../constants/events'

  export default {
    computed: {
      keyboard () {
        return this.$store.getters.keyboard
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
    },
    methods: {
      disableTxSupport () {
        // Vue
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
        // IPC
        ipcRenderer.send(EVENT_TYPES.STOP_PASTE_WATCH)
        ipcRenderer.send(EVENT_TYPES.CLEAR_CLIPBOARD)
        ipcRenderer.send(EVENT_TYPES.UNLOCK_KEYBOARD)
      },
    }
  }
</script>
