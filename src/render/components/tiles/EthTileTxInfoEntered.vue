<template>
  <div>
    <!-- <h4>Valid Tx Info</h4> -->

    <div v-show="!isTransacting">
      <div id="error">
        <p>Waiting for you to start a transaction (tx entered)</p>
      </div>
    </div>

    <div v-show="isTransacting">
      <div id="success" v-if="wasValidPaste">
        You successfully entered your transaction information
      </div>
      <div id="error" v-else>
        Ahh! Something mutated was pasted!
      </div>
    </div>

  </div>
</template>

<script>
  import { log, logError } from '../../../common/debug'
  import { ethereum } from '../../../common/crypto'
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'
  // import { ITEM_STATES } from '../../constants/vue/checklists/items'

  export default {
    name: 'eth-tile-tx-info-entered',
    methods: {},
    computed: {
      pasteValue () {
        return this.$store.getters.paste.lastEvent.value
      },
      wasValidPaste () {
        const lastPasteValue = this.$store.getters.paste.lastEvent.value
        return ethereum.isAddress(lastPasteValue)
      },
      isTransacting () {
        return this.$store.getters.transaction.inProgress
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
