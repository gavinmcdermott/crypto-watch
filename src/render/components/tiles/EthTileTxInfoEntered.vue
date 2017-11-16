<template>
  <div class="tile outer-tile" v-bind:class="outerTileStates">
    <div class="inner-tile">

      <div class="row">
        <div class="col-12">

          <svg class="tile-icon" v-bind:class="iconStates">
            <use xlink:href="render/static/icon-currency.svg#icon" />
          </svg>

          <span v-show="isTransacting">
            <span v-show="isWatchingPaste">
              Enter tx details before pasting the recipient address
            </span>

            <span v-show="!isWatchingPaste">
              <span v-if="wasValidPaste">Transaction details successfully entered</span>
              <span v-else>The address pasted does not match!</span>
            </span>
          </span>

          <span v-show="!isTransacting">...use best practices</span>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

  export default {
    computed: {
      isWatchingPaste () {
        return this.$store.getters.keyboard.isWatchingPaste
      },
      wasValidPaste () {
        const lastPasteValue = this.$store.getters.paste.lastEvent.value
        return addressType(lastPasteValue)
      },
      isTransacting () {
        return this.$store.getters.transaction.inProgress
      },
      outerTileStates () {
        return {
          'outer-tile__success': this.isTransacting
            && !this.isWatchingPaste
            && this.wasValidPaste,
          'outer-tile__error': this.isTransacting
            && !this.isWatchingPaste
            && !this.wasValidPaste,
        }
      },
      iconStates () {
        return {
          'tile-icon__active': this.isTransacting,
          'tile-icon__inactive': !this.isTransacting
            || (this.isTransacting && this.isWatchingPaste),
        }
      },
    }
  }
</script>
