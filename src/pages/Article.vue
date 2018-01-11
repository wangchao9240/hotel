<template lang="pug">
  el-row.article(v-loading.fullscreen="loading")
    el-col.imgContainer
    el-col.container
      .title {{ title }}
    el-row(v-show="imgList.length")
      el-col.swiperContainer
        swiper(:options="swiperOption")
          swiper-slide(v-for="(item, index) in imgList", :key="index")
            img(:src="item.imageUrl")
            span.tip {{ item.imageName }}
    el-col
      p.html(v-html="body")
    .footerWrapper
      btm-footer(ref="footer")
</template>

<script>
import BtmFooter from '@/components/BtmFooter/BtmFooter'
import { GetArticlePaged, GetArticleImages } from '@/api/navBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: '',
      body: '',
      loading: false,
      swiperOption: {
        effect: 'fade',
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: false
      },
      imgList: []
    }
  },
  computed: {
    ...mapGetters([
      'article'
    ])
  },
  methods: {
    async _getArticle(id) {
      try {
        this.loading = true
        const params = {
          CategoryId: id
        }
        const { data } = await GetArticlePaged(params)
        this.loading = false
        if (data.result.items.length) {
          this.title = data.result.items[0].title
          this.body = data.result.items[0].body
          this._getImgs(data.result.items[0].id)
        }
        setTimeout(() => {
          this.$refs.footer.setFooter()
        }, 50)
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    async _getImgs(id) {
      try {
        const { data } = await GetArticleImages({ id })
        this.imgList = data.result.items
        console.log('images-->', this.imgList)
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (this.$route.query.list) {
      console.log('article-->', this.article)
      this.title = this.article.title
      this.body = this.article.body
      this._getImgs(this.article.id)
      setTimeout(() => {
        this.$refs.footer.setFooter()
      }, 50)
      return
    }
    const id = this.$route.params.id
    this._getArticle(id)
  },
  watch: {
    $route(newVal) {
      this._getArticle(newVal.params.id)
    }
  },
  components: {
    BtmFooter,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less" scoped>
@import "../common/less/variables.less";
.article {
  .container {
    margin-top: 20px;
  }
  .swiperContainer {
    display: flex;
    justify-content: center;
    .swiper-container {
      position: relative;
      width: 900px;
      height: 600px;
      img {
        width: 100%;
        height: 100%;
      }
      .tip {
        position: absolute;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
        padding-right: 10px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: right;
        color: @color-text-white;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: @font-size-large;
    font-weight: bold;
  }
  .html {
    padding: 0 15%;
    margin-bottom: 150px;
  }
  .imgContainer {
    width: 100%;
    height: 473px;
    background: url('../../static/image/1422698188560.jpg') center center no-repeat;
    background-size: cover;
  }
  .footerWrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
