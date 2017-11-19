<template>
  <div class="callout">
    <span class="callout--text u--text__center"v-show="!address.balance.fetched">
      -
    </span>
    <!-- TODO: Make a directive for Eth conversion -->
    <span class="callout--text"v-show="address.balance.fetched">
      {{address.balance.data}}
    </span>
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

  export default {
    computed: {
      address () {
        return this.$store.getters.address
      },
    }
  }
</script>
