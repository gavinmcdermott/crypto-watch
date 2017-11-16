<template>
  <div>
    <!-- <h4>Address Pasted</h4> -->

    <div v-show="!isTransacting">
      <div id="error">
        <p>Waiting for you to start a transaction (pasted)</p>
      </div>
    </div>

    <div v-show="isTransacting">
      <div id="success" v-if="wasValidPaste">
        You successfully pasted {{pasteValue}}
      </div>
      <div id="error" v-else>
        The pasted value does not match what you copied
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
    name: 'eth-tile-addr-pasted',
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
