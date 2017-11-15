<template>
  <div>

    <h4>CoPilot: Home Page</h4>
    <hr>

    <div v-show="validAddress">
      <h3>A valid Ethereum address is in your clipboard.</h3>
      <button v-on:click="goToTransact">Enable CoPilot for a new Transaction</button>
    </div>

    <div v-show="!validAddress">
      <h3>Get started by copying a valid Ethereum address</h3>
    </div>

    <p>Current value in clipboard: <b>{{clipboardValue}}</b></p>

  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import EthTiles from './tiles/EthTiles'
  import { ethereum } from '../../common/crypto'
  import { EVENT_TYPES } from '../../constants/events'
  import { CURRENCIES } from '../../constants/currencies'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  console.log('\n\n============================================')
  console.log('ADDRESSES TO TEST WITH')
  console.log('0x0A860fbdbb2A9acB0fE1d7C7da1b35C2cF1bE751')
  console.log('0xaa355cd4e9d5e476730c1cd619c4ecaf75fb8bda')
  console.log('============================================\n\n\n')

  export default {
    name: 'home',
    components: {
      EthTiles,
    },
    mounted () {
      // ipcRenderer.on(EVENT_TYPES.CLIPBOARD_CHANGED, (event, data) => {
      //   this.$store.commit(MUTATION_TYPES.SET_CLIPBOARD, data)
      // })
    },
    methods: {
      goToTransact () {
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, {
          inProgress: true
        })
        this.$router.push('/transact')
      },
    },
    computed: {
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      validAddress () {
        const clipboardValue = this.$store.getters.copy.lastEvent.value
        return ethereum.isAddress(clipboardValue)
      },
      currency () {
        return this.$store.getters.currency
      },
    }
  }
</script>

<style scoped>

</style>
