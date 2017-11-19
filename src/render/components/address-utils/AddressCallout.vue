<template>
  <div class="address-callout">
    <span class="address-callout--text" v-show="validAddress">
      {{address}}
    </span>
    <span class="address-callout--text u--text__center" v-show="!validAddress">
      -<br>-
    </span>
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

  export default {
    props: {
      address: {
        type: String,
      },
    },
    computed: {
      validAddress () {
        return addressType(this.address)
      },
    }
  }
</script>
