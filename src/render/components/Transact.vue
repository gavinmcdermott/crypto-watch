<template>
  <div>

    <h4>CoPilot: Transaction Support Page</h4>
    <button v-on:click="goToHome">Home</button>
    <hr>

    <div v-show="hasError">
      <p>Error: {{transaction.error}}</p>
      <button @click="reset">Reset CoPilot</button>
    </div>

    <div v-show="isTransacting">
      <h3>Use the checklist below to support your transaction</h3>
      <button @click="stopTransacting">Disable CoPilot</button>

      <eth-tiles></eth-tiles>
    </div>

    <div v-show="!isTransacting">
      <div v-if="!validAddress">
        <h3>Copy a valid Ethereum address to start a new transaction</h3>
      </div>
      <div v-else>
        <h3>A valid Ethereum address is in your clipboard.</h3>
        <button @click="startTransacting">Enable CoPilot</button>
      </div>
    </div>

    <div v-show="wasValidPaste">
      <button @click="stopTransacting">Transaction Successfully Sent</button>
    </div>

  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import EthTiles from './tiles/EthTiles'
  import AppHeader from './AppHeader'
  import AppFooter from './AppFooter'
  import { EVENT_TYPES } from '../../constants/events'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'
  import { ethereum } from '../../common/crypto'

  export default {
    name: 'app-body',
    components: {
      EthTiles,
    },
    mounted () {
      if (this.validAddress) {
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, { inProgress: true })
      }
    },
    computed: {
      isTransacting () {
        return this.$store.getters.transaction.inProgress
      },
      hasError () {
        return this.$store.getters.transaction.error !== null
      },
      transaction () {
        return this.$store.getters.transaction
      },
      validAddress () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return ethereum.isAddress(lastCopy)
      },
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      wasValidPaste () {
        const lastPasteValue = this.$store.getters.paste.lastEvent.value
        return ethereum.isAddress(lastPasteValue)
      },
    },
    methods: {
      goToHome () {
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, { inProgress: false })
        this.$router.push('/')
      },
      reset () {
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, {
          inProgress: false,
          error: null
        })
      },
      startTransacting () {
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, { inProgress: true })
      },
      stopTransacting () {
        this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, { inProgress: false })
      },
    },
  }
</script>

<style scoped>

</style>
