<template>
  <div>

    <div v-show="validAddress">
      <h3>An Ethereum address is in your clipboard</h3>
      <p><b>{{clipboardValue}}</b></p>
      <router-link :to="'/transact'">Start a Transaction</router-link>
      <p @click="openExternal">View on EtherScan</p>
    </div>

    <div v-show="!validAddress">
      <h3>Copy an Ethereum address to use CoPilot</h3>
    </div>

  </div>
</template>

<script>
  import { shell } from 'electron'
  import { addressType } from '../../common/crypto'
  import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    mounted () {
      this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
    },
    methods: {
      openExternal () {
        console.log('GOINGTO', `http://www.etherscan.io/address/${this.clipboardValue}`)
        // shell.openExternal(`http://www.etherscan.io/address/${this.clipboardValue}`, { activate: true })
      },
    },
    computed: {
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      validAddress () {
        const clipboardValue = this.$store.getters.copy.lastEvent.value
        return addressType(clipboardValue)
      },
    }
  }
</script>
