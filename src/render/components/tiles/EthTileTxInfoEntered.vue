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
          <h2 v-show="!transaction.inProgress">Enter tx details</h2>

          <!-- Transaction started -->
          <span v-show="transaction.inProgress">
            <!-- Base state -->
            <h2 v-show="keyboard.isWatchingPaste">Enter tx details</h2>

            <!-- Completion state -->
            <span v-show="!keyboard.isWatchingPaste">

              <h2 v-show="paste.inProgress">Paste in progress...</h2>

              <span v-show="!paste.inProgress">
                <h2 v-if="wasValidPaste">Tx details entered</h2>
                <h2 v-else>Pasted address does not match!</h2>
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
