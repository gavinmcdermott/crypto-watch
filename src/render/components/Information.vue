<template>
  <div>
    <!-- Page Title -->
    <div class="row">
      <div class="col-12">
        <h2>Address in Clipboard</h2>
      </div>
    </div>
    <!-- /Page Title -->

    <!-- Address clipboard -->
    <div class="section">
      <div class="row">
        <div class="col-12">
          <address-callout v-bind:address="clipboardValue"></address-callout>
          <etherscam-badge></etherscam-badge>
        </div>
      </div>
    </div>
    <!-- /Address clipboard -->

    <div v-show="!hasAddressInClipboard" class="section">
      <div class="row">
        <div class="col-12">
          <h4>About</h4>
          <p>Copy any Ethereum address to see its important information at a glance.</p>
        </div>
      </div>
    </div>

    <!-- Address Balance and Tx List -->
    <div v-show="hasAddressInClipboard" class="section">
      <div class="row">
        <div class="col-12">
          <h4>Ether Balance</h4>
          <balance-callout></balance-callout>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h4>Recent Transactions</h4>
          <ul>
            <transaction-tile
              v-bind:transaction="tx"
              v-for="tx in address.transactions.data">
            </transaction-tile>
          </ul>
        </div>
      </div>
    </div>
    <!-- /Address Balance and Tx List -->

  </div>
</template>

<script>
  import { addressType } from '../../common/crypto'
  import AddressCallout from './address-utils/AddressCallout'
  import BalanceCallout from './address-utils/BalanceCallout'
  import EtherscamBadge from './badges/EtherscamBadge'
  import TransactionTile from './address-utils/TransactionTile'

  export default {
    components: {
      AddressCallout,
      BalanceCallout,
      EtherscamBadge,
      TransactionTile,
    },
    computed: {
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      hasAddressInClipboard () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return addressType(lastCopy)
      },
      address () {
        return this.$store.getters.address
      },
    },
  }
</script>
