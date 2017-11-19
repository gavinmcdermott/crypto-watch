<template>
  <div class="callout">
    <span class="callout--text" v-show="addressIsValid">
      {{address}}
    </span>
    <span class="callout--text u--text__center" v-show="!addressIsValid">
      -<br>-
    </span>
  </div>
</template>

<script>
  import { addressType } from '../../../common/crypto'

  export default {
    props: {
      address: {
        required: true,
      }
    },
    computed: {
      addressIsValid () {
        return addressType(this.address)
      },
    }
  }
</script>
