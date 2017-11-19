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
            <address-callout v-bind:address="clipboardValue"></address-callout>

            <!-- Scam address info -->
            <span v-show="address.verification.fetched">
              <p v-show="address.verification.isVerified" class="u-color--gray">
                <svg viewBox="0 0 32 32" class="icon">
                  <use xlink:href="render/static/icon-checkmark.svg#icon" />
                </svg>
                Verified by EtherScam DB
              </p>
              <p v-show="!address.verification.isVerified" class="u-color--gray">
                <svg viewBox="0 0 32 32" class="icon"><use xlink:href="render/static/icon-checkmark.svg#icon" /></svg>
                This is a recognized scam address!
              </p>
            </span>
          </div>
        </div>

      </div>

      <div v-show="addressInClipboard" class="section">

        <div class="row">
          <div class="col-12">

            <h4>Ether Balance</h4>
            <div class="address-callout">
              <span class="address-callout--text u--text__center"v-show="!address.balance.fetched">
                -
              </span>
              <!-- TODO: Make a directive for Eth conversion -->
              <span class="address-callout--text"v-show="address.balance.fetched">
                {{address.balance.data}}
              </span>
            </div>

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

  export default {
    components: {
      AddressCallout,
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














