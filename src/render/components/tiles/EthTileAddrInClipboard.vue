<template>
  <div>
    <!-- <h4>Valid Address</h4> -->

    <div id="success" v-if="validAddress">
      Valid Ethereum address in your clipboard
    </div>
    <div id="error" v-else>
      Invalid Ethereum address in your clipboard (valid)
    </div>

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
    mounted () {

    },
    destroy () {

    },
    methods: {},
    computed: {
      validAddress () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return ethereum.isAddress(lastCopy)
      },
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
    }
  }
</script>

<style scoped>
  #success {
    background-color: #aeecae;
    height: 50px;
    text-align: center;
    display: block;
    padding-top: 40px;
    margin-bottom: 15px;
  }
  #error {
    background-color: #ff3b63;
    height: 50px;
    text-align: center;
    display: block;
    padding-top: 40px;
    margin-bottom: 15px;
  }
</style>
