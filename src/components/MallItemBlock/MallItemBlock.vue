<template lang="pug">
  el-row.itemContainer
    el-row.cateList(v-if="item.categoryInfo && item.categoryInfo.length", v-for="(item, index) in blockArr", :key="index")
      el-col.itemBlock(:span="8")
        mall-item(:cateInfo="item")
      el-col.itemBlock(:span="8", v-for="(subItem, index) in item.categoryInfo", :key="index")
        mall-item(:mallItem="subItem")
    el-col.itemBlock(:span="8", v-for="(item, index) in blockArr", :key="index", v-if="!item.categoryInfo || !item.categoryInfo.length")
      mall-item(:mallItem="item")
</template>

<script>
import MallItem from '@/components/MallItem/MallItem'
export default {
  props: {
    itemArray: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      blockArr: []
    }
  },
  watch: {
    itemArray(newVal) {
      if (!newVal.length) return
      let copyArr = this.itemArray.slice()
      copyArr.forEach(item => {
        if (item.categoryInfo && item.categoryInfo.length) {
          item.categoryInfo = item.categoryInfo.slice(0, 5)
        }
      })
      this.blockArr = copyArr
    }
  },
  components: {
    MallItem
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/variables.less";
.itemContainer {
  margin-top: 10px;
  .cateList {
    padding: 0 10%;
    margin-top: 20px;
  }
  .itemBlock {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    &.orangeBg {
      background-color: @color-text-orange;
    }
  }
}
</style>
