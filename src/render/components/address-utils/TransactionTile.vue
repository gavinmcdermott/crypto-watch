<template>
  <div class="callout">
    <p>Date: {{transaction.timeStamp}}</p>
    <p>Eth Value: {{transaction.value}}</p>
    <p v-show="wasSend">Sent</p>
    <p v-show="!wasSend">Received</p>
    <!-- <span class="callout--text"></span> -->
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

  export default {
    props: {
      transaction: {
        type: Object,
        required: true,
      }
    },
    computed: {
      wasSend () {
        return this.$store.getters.address.address === this.transaction.from
      },
    }
  }
</script>
