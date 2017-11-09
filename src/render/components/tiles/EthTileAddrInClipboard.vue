<template>
  <div>
    <h4>ADDR: 0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751</h4>
    <!-- <p><button @click="toggleInfo">show info for this tile</button></p> -->
    <div id="success" v-if="validAddress">
      Valid Ethereum address in your clipboard
      <br>=> {{clipboardValue}}
    </div>
    <div id="error" v-else>
      Invalid Ethereum address in your clipboard
      <br>=> {{clipboardValue}}
    </div>

    <div v-if="infoVisible">
      <p>This is some additional info about this tile.</p>
    </div>
    <hr>
  </div>
</template>

<script>
  import { log, logError } from '../../../common/debug'
  import { ethereum } from '../../../common/crypto'
  import { CURRENCIES } from '../../../constants/currencies'
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'

  let isTransacting

  export default {
    name: 'eth-tile-addr-in-clipboard',
    data () {
      return {
        infoVisible: false
      }
    },
    mounted () {

    },
    destroy () {

    },
    methods: {
      toggleInfo () {
        return this.infoVisible = !this.infoVisible
      }
    },
    computed: {
      validAddress () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return ethereum.isAddress(lastCopy) ? true : false
      },
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      // copilotIsActive () {
      //   return this.$store.getters.copilot.isActive
      // },
    }
  }
</script>

<style scoped>
  #success {
    background-color: #aeecae
  }
  #error {
    background-color: #ff3b63
  }
</style>
