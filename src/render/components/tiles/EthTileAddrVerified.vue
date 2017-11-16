<template>
  <div class="tile outer-tile" v-bind:class="outerTileStates">
    <div class="inner-tile">

      <div class="row">
        <div class="col-12">

          <svg class="tile-icon" v-bind:class="iconStates">
            <use xlink:href="render/static/icon-checkmark.svg#icon" />
          </svg>

          <span v-show="isTransacting">
            <span v-show="validAddress">The address not a known scam address</span>
            <span v-show="possibleScamAddress">The address a known scam address!</span>
          </span>

          <span v-show="!isTransacting">...avoid known scams</span>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { addressType } from '../../../common/crypto'
  import { ETHERSCAM_ADDR_LIST_URL } from '../../../constants/urls'

  export default {
    data () {
      return {
        scamAddressList: [],
      }
    },
    mounted () {
      axios.get(ETHERSCAM_ADDR_LIST_URL)
        .then(response => this.scamAddressList = Object.keys(response.data))
        .catch(e => console.log('HANDLE CLIENT ERRORS GRACEFULLY:', e))
    },
    computed: {
      validAddress () {
        const clipboardVal = this.$store.getters.copy.lastEvent.value
        return addressType(clipboardVal)
      },
      possibleScamAddress () {
        const clipboardVal = this.$store.getters.copy.lastEvent.value
        return this.scamAddressList.includes(clipboardVal)
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
