<template lang="pug">
  #app
    .homeContainer
      router-view(v-wechat-title="$route.meta.title")
      //- top-header
      //- nav-bar
      //- router-view(v-wechat-title="$route.meta.title")
</template>

<script>
// import TopHeader from '@/components/TopHeader/TopHeader'
// import NavBar from '@/components/NavBar/NavBar'
// // import { mapGetters } from 'vuex'
// export default {
//   name: 'app',
//   data() {
//     return {
//       mallHide: false
//     }
//   },
//   // computed: {
//   //   ...mapGetters([
//   //     'fullScreenLoading'
//   //   ])
//   // },
//   components: {
//     TopHeader,
//     NavBar
//   },
//   watch: {
//     $route(newVal) {
//       console.log(newVal)
//       if (newVal.fullPath.match('/mall')) this.mallHide = false
//       else this.mallHide = true
//     }
//   }
// }
</script>

<style lang="less">
</style>
