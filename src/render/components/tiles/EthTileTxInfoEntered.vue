<template>
  <div class="tile outer-tile" v-bind:class="outerTileStates">
    <div class="inner-tile">

      <div class="row">
        <div class="col-12">

          <!-- Icon -->
          <svg class="tile-icon" v-bind:class="iconStates">
            <use xlink:href="render/static/icon-currency.svg#icon" />
          </svg>

          <!-- Transaction not started -->
          <span v-show="!transaction.inProgress">...shares best practices</span>

          <!-- Transaction started -->
          <span v-show="transaction.inProgress">
            <!-- Base state -->
            <span v-show="keyboard.isWatchingPaste">
              Enter transaction details
            </span>

            <!-- Completion state -->
            <span v-show="!keyboard.isWatchingPaste">

              <span v-show="paste.inProgress">
                <span>Paste in progress...</span>
              </span>
              <span v-show="!paste.inProgress">
                <span v-if="wasValidPaste">Transaction details successfully entered</span>
                <span v-else>The pasted address does not match the copied address!</span>
              </span>

            </span>
          </span>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

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
      showTileSuccess () {
        if (this.$store.getters.paste.inProgress) {
          return false
        }
        if (!this.transaction.inProgress) {
          return false
        }
        return this.keyboard.isLocked && this.wasValidPaste
      },
      showTileError () {
        if (this.$store.getters.paste.inProgress) {
          return false
        }
        if (!this.transaction.inProgress) {
          return false
        }
        return this.keyboard.isLocked && !this.wasValidPaste
      },
      showIconActive () {
        return this.keyboard.isLocked
      },
      showIconInactive () {
        return !this.keyboard.isLocked
      },
      outerTileStates () {
        return {
          'outer-tile__success': this.showTileSuccess,
          'outer-tile__error': this.showTileError,
        }
      },
      iconStates () {
        return {
          'tile-icon__active': this.showIconActive,
          'tile-icon__inactive': this.showIconInactive,
        }
      },
    }
  }
</script>
