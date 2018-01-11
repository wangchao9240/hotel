<template lang="pug">
  .pcHomeContainer
    top-header
    nav-bar
    router-view(v-wechat-title="$route.meta.title")
</template>

<script>
import TopHeader from '@/components/TopHeader/TopHeader'
import NavBar from '@/components/NavBar/NavBar'
// import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      mallHide: false
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'fullScreenLoading'
  //   ])
  // },
  components: {
    TopHeader,
    NavBar
  }
}
</script>

<style lang="less" scoped>
  
</style>