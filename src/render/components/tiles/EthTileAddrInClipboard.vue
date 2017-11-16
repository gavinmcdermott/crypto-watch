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
