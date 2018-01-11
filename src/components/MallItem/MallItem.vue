<template lang="pug">
  .mallItem(@click="hrefDetailHandler(mallItem, cateInfo)", :class="{'orangeBg': cateInfo.categoryId}")
    span(v-show="cateInfo.categoryId") 更多{{ cateInfo.categoryName }}
    img.topImg(:src="mallItem.pictureUrl", v-if="!cateInfo.categoryId")
    el-row.bottomInfo(type="flex", justify="space-between", v-if="!cateInfo.categoryId")
      el-col(:span="16").titleContainer
        .title {{ mallItem.name }}
      el-col(:span="8").price
        span.small(v-show="online === 'true'") ￥
        span(:class="{'smallPrice': online === 'false'}") {{ online === 'true' ? mallItem.barginPrice ? mallItem.barginPrice : mallItem.price : mallItem.integral + '积分' }}
</template>

<script>
import Cookies from 'js-cookie'
import { getSelectCategoryInfo } from '@/common/js/mixins'
export default {
  mixins: [getSelectCategoryInfo],
  props: {
    mallItem: {
      type: Object,
      default() {
        return {}
      }
    },
    cateInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      online: null
    }
  },
  methods: {
    hrefDetailHandler(item, categoryInfo) {
      if (categoryInfo.categoryId) {
        this._GetIntegralCommodityPaged(categoryInfo.categoryId, categoryInfo.categoryName)
      } else {
        this.$router.push({
          name: 'mallDetail',
          params: {
            id: item.id
          }
        })
      }
    }
  },
  created() {
    this.online = Cookies.get('online')
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/variables.less";
.mallItem {
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 350px;
  height: 350px;
  border: 1px solid @seperate-line-gray;
  padding: 4px;
  background-color: @color-text-white;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  &.orangeBg {
    align-items: center;
    justify-content: center;
    color: @color-text-white;
    font-size: @font-size-large;
    font-weight: bold;
    background: url('./orange_bg.png') center center no-repeat;
    background-color: @color-text-light-orange;
  }
  .topImg {
    width: 300px;
    height: 300px;
    flex: 1;
  }
  .bottomInfo {
    width: 100%;
    .titleContainer>div {
      display: flex;
      justify-content: center;
      color: @color-text-gray;
    }
    .price {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: @font-size-medium-x;
      color: red;
      font-weight: bold;
      .small {
        font-size: @font-size-small-s;
      }
      .smallPrice {
        font-size: @font-size-medium;
      }
    }
    .title {
      margin: 16px 0;
      // margin-top: 30px;
    }
    .description {
      font-size: @font-size-small-x;
    }
  }
}
</style>
