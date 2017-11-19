<template>
  <div class="body">
    <div class="container body--container">

      <div class="row">
        <div class="col-12">
          <h2>Address in Clipboard</h2>
        </div>
      </div>

      <!-- Address clipboard -->
      <div class="section">
        <div class="row">
          <div class="col-12">
            <address-callout></address-callout>
            <etherscam-badge></etherscam-badge>
          </div>
        </div>
      </div>

      <div v-show="addressInClipboard" class="section">

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
              <transaction-tile v-bind:transaction="tx" v-for="tx in address.transactions.data"></transaction-tile>
            </ul>
          </div>
        </div>

      </div>









      <!-- Recent transactions -->
<!--       <div class="section">

        <div class="row">
          <div class="col-12">
            <h3>Recent Transactions</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-12">

            <div v-show="!address.transactions.fetched">
              <p>-</p>
            </div>
            <div v-show="validAddress">
              <p v-show="address.transactions.fetched && !address.transactions.data">
                No transaction history
              </p>
              <p v-show="address.transactions.fetched && address.transactions.data">
                {{latestTxDate}}
              </p>
            </div>

          </div>
        </div>

      </div>
 -->















    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import { addressType, ethereum } from '../../common/crypto'
  import { ETHERSCAN } from '../../constants/urls'
  import AddressCallout from './address-utils/AddressCallout'
  import BalanceCallout from './address-utils/BalanceCallout'
  import TransactionTile from './address-utils/TransactionTile'
  import EtherscamBadge from './badges/EtherscamBadge'

  export default {
    components: {
      EtherscamBadge,
      BalanceCallout,
      AddressCallout,
      TransactionTile,
    },
    methods: {
      // fetches in here with error handling too :)
    },
    computed: {
      clipboardValue () {
        return this.$store.getters.copy.lastEvent.value
      },
      addressInClipboard () {
        const lastCopy = this.$store.getters.copy.lastEvent.value
        return addressType(lastCopy)
      },
      // latestTxDate () {
      //   // TODO: Clean this up
      //   if (!this.address.transactions.fetched) return
      //   return moment(Number(this.address.transactions.data.timeStamp)*1000).format('MMMM Do YYYY, h:mm A')
      // },
      address () {
        return this.$store.getters.address
      },
    },
  }
</script>














