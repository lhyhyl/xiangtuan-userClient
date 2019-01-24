<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    created(){
      if(sessionStorage.getItem('store')){
        this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem('store'))))
      }
      window.addEventListener('beforeunload',()=>{
        sessionStorage.setItem('store',JSON.stringify(this.$store.state))
      })
    },
    mounted () {
      this.getAddress()
      this.getUserInfo()

    },

    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    },

    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
