<template lang="pug">
  .mallHomeContainer
    .mallHome
      el-row.categoryNameContainer(type="flex", justify="center", v-show="showSwiper")
        el-col(:span="20")  {{ showSwiper }}
      .swiperContainer(v-show="!showSwiper")
        swiper(:options="swiperOption", ref="mySwiper")
          swiper-slide
            img(src="../../../static/image/AD0IhaGCBRACGAAgjeOxywUouPr_6wIwgA847AQ.jpg")
          swiper-slide
            img(src="../../../static/image/AD0IhaGCBRAEGAAgz_OxywUoso7SzgIwgA847AQ.png")
          .swiper-pagination.swiper-pagination-white(slot="pagination")
          .swiper-button-prev.swiper-button-white(slot="button-prev")
          .swiper-button-next.swiper-button-white(slot="button-next")
      mall-item-block(:itemArray="itemArray")
</template>

<script>
import MallItemBlock from '@/components/MallItemBlock/MallItemBlock'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
import { formatMallHome } from '@/common/js/utils'
export default {
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        autoplay: 5000
      }
    }
  },
  computed: {
    itemArray() {
      if (!this.mallInfo.items) return []
      else {
        setTimeout(() => {
          this.$emit('setFooter')
        }, 20)
        return formatMallHome(this.mallInfo.items)
      }
    },
    ...mapGetters([
      'mallInfo',
      'showSwiper'
    ])
  },
  components: {
    swiper,
    swiperSlide,
    MallItemBlock
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/variables.less";
.mallHomeContainer {
  padding-bottom: 20px;
  .mallHome {
    background: url('../../../static/image/bgimg.jpg') left top no-repeat;
    background-size: cover;
    .categoryNameContainer {
      margin-top: 20px;
      font-size: @font-size-large-x;
      color: @color-text-deep-brand;
    }
  }
}
</style>
