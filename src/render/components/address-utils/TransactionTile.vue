<template>
  <div class="callout">
    Date: {{transaction.timeStamp}} <br>
    Eth Value: {{transaction.value}} <br>
    <span v-show="txWasSend">Sent</span>
    <span v-show="!txWasSend">Received</span>
    <!-- <span class="callout--text"></span> -->
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

  // Date formatting for unix - work with this later
  // latestTxDate () {
  //   // TODO: Clean this up
  //   if (!this.address.transactions.fetched) return
  //   return moment(Number(this.address.transactions.data.timeStamp)*1000).format('MMMM Do YYYY, h:mm A')
  // },

  export default {
    props: {
      transaction: {
        type: Object,
        required: true,
      }
    },
    computed: {
      txWasSend () {
        return this.$store.getters.address.address === this.transaction.from
      },
    }
  }
</script>
