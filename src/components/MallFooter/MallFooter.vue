<template lang="pug">
  .mallFooter(:class="{'setBtm': !heightEnough}")
    el-row.flexRow(type="flex")
      //- ul.topLine
      //-   li.footerLi(v-for="item in footerList", @click="selectItem(item)") {{ item.name }}
      ul.middleLine
        li 地址：{{ contactObj.address }}
        li 电话：{{ contactObj.contactPhone }}
        li 传真：{{ contactObj.contactPhone }}
        li 地图及路线指南
      ul
        li 山东大厦版权所有 网站ICP：鲁ICP备14037993号 
</template>

<script>
import { getFooterMenu, contactUs } from '@/api/navBar'
import { regObj } from '@/common/js/utils'
export default {
  data() {
    return {
      heightEnough: false,
      footerList: [],
      contactObj: {}
    }
  },
  methods: {
    setFooter(height) {
      if (!height) height = document.body.clientHeight
      if (height > document.documentElement.clientHeight) this.heightEnough = true
      else this.heightEnough = false
    },
    async _getFooter() {
      try {
        const { data } = await getFooterMenu()
        if (data.error) {
          this.$notify.warning({
            title: '警告',
            message: data.error.message
          })
        }
        this.footerList = data.result.items
      } catch (err) {
        console.log(err)
      }
    },
    selectItem(item) {
      if (item.url && item.url.match(regObj.http)) {
        window.open(item.url)
      } else if (item.url) {
        this.$router.push(item.url)
      }
    },
    async _getContact() {
      try {
        const { data } = await contactUs()
        if (data.error) {
          this.$notify.warning({
            title: '警告',
            message: data.error.message
          })
          return
        }
        this.contactObj = data.result.items[0]
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    this._getFooter()
    this._getContact()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/variables.less';
.mallFooter {
  padding-top: 10px;
  width: 100%;
  height: 70px;
  background-color: #333;
  &.setBtm {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .flexRow {
    align-items: center;
    flex-direction: column;
  }
  ul {
    display: flex;
    color: #fff;
    font-size: @font-size-medium;
    li {
      padding: 3px 8px;
      border-right: 1px solid @color-text-deep-brand;
      &:last-child {
        border: none;
      }
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    &.topLine {
      margin-bottom: 15px;
      font-weight: bold;
    }
    &.middleLine {
      margin-bottom: 10px;
    }
  }
}
</style>