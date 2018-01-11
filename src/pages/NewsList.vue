<template lang="pug">
  el-row.newsList(v-loading.fullscreen="loading")
    el-col.imgContainer
    el-col
      el-row.container(type="flex", justify="center")
        el-col(:span="16")
          .title {{ title }}
          ul.ulContainer
            li.liContainer(v-for="item in articleList", @click="hrefArticle(item)")
              span.newsTitle {{ item.title }}
              span.time {{ item.creationTime }}
    .footerWrapper
      btm-footer(ref="footer")
</template>

<script>
import moment from 'moment'
import BtmFooter from '@/components/BtmFooter/BtmFooter'
import { GetArticlePaged } from '@/api/navBar'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      articleList: [],
      title: '新闻中心'
    }
  },
  methods: {
    async _getArticle(id) {
      try {
        this.loading = true
        const params = {
          CategoryId: id
        }
        const { data } = await GetArticlePaged(params)
        console.log('jkdasj-->', data)
        data.result.items.forEach(function(item) {
          item.creationTime = moment(item.creationTime).format('YYYY-MM-DD')
        })
        this.articleList = data.result.items
        this.loading = false
        // if (data.result.items.length) {
        //   this.title = data.result.items[0].title
        //   this.body = data.result.items[0].body
        //   this._getImgs(data.result.items[0].id)
        // }
        setTimeout(() => {
          this.$refs.footer.setFooter()
        }, 50)
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    hrefArticle(item) {
      console.log(item)
      this.setArticle(item)
      this.$router.push({
        path: '/pc/article/0',
        query: {
          list: true
        }
      })
    },
    ...mapMutations({
      setArticle: 'SET_ARTICLE'
    })
  },
  mounted() {
    this.$refs.footer.setFooter()
    this._getArticle(this.$route.params.id)
  },
  watch: {
    $route(newVal) {
      this._getArticle(newVal.params.id)
      if (newVal.params.id - 0 === 29) this.title = '新闻中心'
      else this.title = '优惠酬宾'
    }
  },
  components: {
    BtmFooter
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.newsList {
  .imgContainer {
    width: 100%;
    height: 473px;
    background: url('../../static/image/1422698188560.jpg') center center no-repeat;
    background-size: cover;
  }
  .container {
    margin-top: 20px;
    margin-bottom: 150px;
    .title {
      padding-bottom: 10px;
      border-bottom: 1px solid @seperate-line-gray;
    }
    .ulContainer {
      margin: 30px 0;
      font-size: @font-size-small-x;
      .liContainer {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        border-bottom: 1px dashed @background-color-brand;
        cursor: pointer;
        &:hover {
          color: @color-text-deep-brand;
        }
      }
    }
  }
  .footerWrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
