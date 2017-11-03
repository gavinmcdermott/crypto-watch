<template>
  <div>
    <div v-for="(item, index) in checklist.items">
      <checklist-item
        :index="index"
        :type="item.type"
        :validator="item.validator"
        :state="item.state"
        :state-data="item.stateData">
      </checklist-item>
    </div>
    <hr>
  </div>
</template>

<script>
  import axios from 'axios'
  import ChecklistItem from './ChecklistItem'
  import { ethereum } from '../../common/crypto'
  import { ETHEREUM_CHECKLIST_TYPES } from '../../constants/vue/checklists/ethereum'
  import { ETHERSCAM_ADDR_LIST_URL } from '../../constants/urls'

  export default {
    name: 'App',
    components: {
      ChecklistItem,
    },
    mounted () {
      // Fetch scam addrs from etherscam
      axios.get(ETHERSCAM_ADDR_LIST_URL)
        .then(response => this.scamAddressList = Object.keys(response.data))
        .catch(e => console.log('HANDLE CLIENT ERRORS GRACEFULLY:', e))
    },
    data () {
      return {
         text: 'CryptoWatch™',
         scamAddressList: [],
      }
    },
    computed: {
      checklist () {
        const checklist = this.$store.getters.checklist

        checklist.items.forEach((item) => {
          switch (item.type) {
            case ETHEREUM_CHECKLIST_TYPES.ADDR_COPIED:
              item.validator = () => {
                return ethereum.isAddress(this.$store.getters.clipboardNewValue)
              }
              break
            case ETHEREUM_CHECKLIST_TYPES.ADDR_VERIFIED:
              item.validator = () => {
                const isScam = this.scamAddressList.includes(this.$store.getters.clipboardNewValue)
                return !isScam
              }
              break
            case ETHEREUM_CHECKLIST_TYPES.TX_INFO_ENTERED:
              item.validator = () => console.log('TX_INFO_ENTERED')
              break
            case ETHEREUM_CHECKLIST_TYPES.ADDR_PASTED:
              item.validator = () => console.log('ADDR_PASTED')
              break
          }
        })

        return checklist
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
