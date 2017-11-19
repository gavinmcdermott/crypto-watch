<template>
  <div class="callout">
    <span class="callout--text" v-show="addrIsValid">
      {{addrString}}
    </span>
    <span class="callout--text u--text__center" v-show="!addrIsValid">
      -<br>-
    </span>
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

  export default {
    computed: {
      addrString () {
        return this.$store.getters.address.address
      },
      addrIsValid () {
        return addressType(this.$store.getters.address.address)
      },
    }
  }
</script>
