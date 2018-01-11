<template lang="pug">
  .navBarContainer
    ul(ref="navUl")
      li(v-for="(liItem, idx) in lis", ref="liItem", @click="selectItem(liItem)", :class="{'active': liItem.checked}")
        a(@click="hrefHandler(liItem)", :class="{'fst': idx === 0}") {{ liItem.name }}
    transition(name="el-zoom-in-top")
      .subMenuContainer(v-show="showSubMenu")
        ul.subMenuUl
          li(v-for="item in subMenuList", @click="hrefHandler(item)") {{ item.name }}
</template>

<script>
import { getNavBar } from '@/api/navBar'
export default {
  data() {
    return {
      lis: [
        {
          name: '客房预订',
          url: '/',
          checked: true
        }
      ],
      subMenuList: [],
      showSubMenu: false
    }
  },
  methods: {
    async _getNavBar() {
      try {
        const { data } = await getNavBar()
        if (data.error) {
          this.$notify.error({
            title: '错误',
            message: data.error.message
          })
          return
        }
        data.result.items.forEach(item => {
          item.checked = false
          this.lis.push(item)
        })
        setTimeout(() => {
          this.$refs.navUl.style.width = this.computedUlWidth() + 'px'
        }, 20)
      } catch (err) {
        console.log(err)
      }
    },
    computedUlWidth(type) {
      let width = 0
      this.$refs.liItem.forEach((item) => {
        width += item.clientWidth
      })
      console.log(width)
      return width
    },
    selectItem(item) {
      this.lis.forEach((item) => {
        item.checked = false
      })
      this.hoverHandler(item)
      item.checked = true
    },
    hrefHandler(item) {
      if (!item.url) return
      if (item.list && item.list.length) {
        this.$router.push(item.list[0].url)
        return
      }
      this.$router.push(item.url)
    },
    hoverHandler(item) {
      if (item.list && item.list.length) {
        this.subMenuList = item.list
        this.showSubMenu = true
      } else {
        this.showSubMenu = false
      }
    },
    mouseleaveHandler() {
      this.showSubMenu = false
      console.log('enter')
    }
  },
  created() {
    this._getNavBar()
  }
}
</script>

<style lang="less" scoped>
  @import '../../common/less/variables.less';
  .navBarContainer {
    position: relative;
    width: 100%;
    height: 35px;
    background-color: @background-color-brand;
    ul {
      margin: 0 auto;
      li {
        display: inline-block;
        padding: 0 13px;
        line-height: 35px;
        font-size: @font-size-medium-x;
        font-family: "黑体";
        color: @color-text-white;
        font-weight: 500;
        cursor: pointer;
        &.active {
          background: url('./indx_d.png') left top no-repeat;
          background-size: 100% 100%;
        }
        .fst {
          color: @color-text-yellow;
          font-size: @font-size-medium-x;
        }
      }
    }
    .subMenuContainer {
      position: absolute;
      bottom: -45px;
      z-index: 100;
      width: 100%;
      height: 45px;
      background-color: @background-color-brand-glass;
      li {
        line-height: 45px;
      }
      .subMenuUl {
        display: flex;
        justify-content: center;
        li:hover {
          color: @color-text;
        }
      }
    }
  }
</style>
