<template>
  <div>

    <div class="header">
      <h3>Transact</h3>
    </div>



    <div class="body">
      <div class="container body--container">


        <div class="row">
          <div class="col-12">
            <h2>Address in Clipboard</h2>
            <div class="address-callout">
              0x7dDEcE90E00785c97da<br>
              Fe08dF75f61786Fa4d47A
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <h3>Information</h3>
            <h4>Validity</h4>
            <p>
              <svg viewBox="0 0 32 32" class="icon">
                <use xlink:href="render/static/icon-checkmark.svg#icon" />
              </svg>
              This is a valid Ethereum address
            </p>

          </div>
        </div>

      </div>
    </div>



    <div class="footer">
      <ul class="tabs">

        <li>
          <div class="tab--container">
            <div class="tab tab__active">
              <div>
                Tx
              </div>
            </div>
          </div>
        </li>

        <li>
          <div class="tab--container">
            <div class="tab">
              <div>
                In
              </div>
            </div>
          </div>
        </li>

      </ul>
    </div>

  </div>
</template>

<script>
  // import { shell } from 'electron'
  // import { addressType } from '../../common/crypto'
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    mounted () {
      // this.$store.commit(MUTATION_TYPES.CHANGE_TRANSACTION, false)
    },
    methods: {
      openExternal () {
        // console.log('GOINGTO', `http://www.etherscan.io/address/${this.clipboardValue}`)
        // shell.openExternal(`http://www.etherscan.io/address/${this.clipboardValue}`, { activate: true })
      },
    },
    computed: {
      // clipboardValue () {
      //   return this.$store.getters.copy.lastEvent.value
      // },
      // validAddress () {
      //   const clipboardValue = this.$store.getters.copy.lastEvent.value
      //   return addressType(clipboardValue)
      // },
    }
  }
</script>
