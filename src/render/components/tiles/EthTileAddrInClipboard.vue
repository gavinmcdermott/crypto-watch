<template>
  <div class="tile outer-tile" v-bind:class="outerTileStates">
    <div class="inner-tile">

      <div class="row">
        <div class="col-12">

          <svg class="tile-icon" v-bind:class="iconStates">
            <use xlink:href="render/static/icon-clipboard.svg#icon" />
          </svg>

          <h2 v-show="!isTransacting">Validate address</h2>

          <span v-show="isTransacting">
            <h2 v-if="validAddress">Address validated</h2>
            <h2 v-else>Invalid address!</h2>
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
      validAddress () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return addressType(lastCopy)
      },
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      isTransacting () {
        return this.$store.getters.transaction.inProgress
      },
      outerTileStates () {
        return {
          'outer-tile__success': this.isTransacting && this.validAddress,
          'outer-tile__error': this.isTransacting && !this.validAddress,
        }
      },
      iconStates () {
        return {
          'tile-icon__active': this.isTransacting,
          'tile-icon__inactive': !this.isTransacting,
        }
      },
    }
  }
</script>
