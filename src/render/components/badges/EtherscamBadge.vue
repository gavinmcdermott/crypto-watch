<template>
  <!-- TODO: PASS ADDRESS IN TO THIS COMPONENT -->
  <span v-show="address.verification.fetched">

    <p v-show="address.verification.isVerified" class="u-color--gray">
      <svg viewBox="0 0 32 32" class="icon">
        <use xlink:href="render/static/icon-checkmark.svg#icon" />
      </svg>
      Verified on EtherScam DB
    </p>

    <!-- TODO: ERROR ICON / STYLING -->
    <p v-show="!address.verification.isVerified" class="u-color--gray">
      <svg viewBox="0 0 32 32" class="icon"><use xlink:href="render/static/icon-checkmark.svg#icon" /></svg>
      This is a recognized scam address!
    </p>

  </span>
</template>

<script>
  export default {
    computed: {
      address () {
        return this.$store.getters.address
      },
    }
  }
</script>
