<template lang="pug">
  .reserveWrapper
    el-row.reserveRow(type="flex", justify="center")
      el-date-picker(
        v-model="start",
        type="date",
        placeholder="入住日期",
        :picker-options="pickerOptions0",
        :editable="false",
        :clearable="true",
        :class="{'glassIpt': glass}"
      )
      el-date-picker(
        v-model="end",
        type="date",
        placeholder="结束日期"
        :picker-options="pickerOptions1",
        :editable="false",
        :clearable="true",
        :class="{'glassIpt': glass}"
      )
      el-select.selectIpt(v-model="count", placeholder="预定间数", :class="{'glassIpt': glass}")
        el-option(
        v-for="item in options",
        :key="item.value",
        :label="item.label",
        :value="item.value"
        )
      el-select.selectIpt(v-model="people", placeholder="预定人数", :class="{'glassIpt': glass}")
        el-option(
        v-for="item in options",
        :key="item.value",
        :label="item.label",
        :value="item.value"
        )
      el-button(type="warning", @click="search", :class="{'glassBtn': glass}") 搜索
      el-button(type="warning", @click="orderSearch", :class="{'glassBtn': glass}") 订单查询
</template>

<script>
import moment from 'moment'
export default {
  props: {
    comOptions: {
      type: Object,
      default() {
        return {
          Start: '',
          End: '',
          People: '',
          Count: ''
        }
      }
    },
    glass: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      start: '',
      end: '',
      people: '',
      count: '',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      options: [
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 3,
          label: 3
        },
        {
          value: 4,
          label: 4
        },
        {
          value: 5,
          label: 5
        }
      ]
    }
  },
  methods: {
    search() {
      if (!this.start || !this.end || !this.people || !this.count) {
        this.$message.error('请将查询信息填写完整')
        return
      } else if (moment(this.start).unix() > moment(this.end).unix()) {
        this.$message.error('请填写正确的入住和离店日期')
        return
      }
      this.$emit('search', {
        start: moment(this.start).format('YYYY-MM-DD'),
        end: moment(this.end).format('YYYY-MM-DD'),
        people: this.people,
        count: this.count
      })
    },
    orderSearch() {
      this.$router.push('/pc/ordersearch')
    }
  },
  created() {
    this.start = this.comOptions.Start
    this.end = this.comOptions.End
    this.people = this.comOptions.People
    this.count = this.comOptions.Count
  },
  watch: {
    start(newVal) {
      this.pickerOptions1 = {
        disabledDate(time) {
          return time.getTime() < (new Date(newVal)).getTime() + 1000 * 60 * 60 * 24
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/mixin.less";
.reserveWrapper {
  width: 100%;
  height: 100%;
  .reserveRow {
    height: 100%;
    align-items: center;
    &>div {
      margin-right: 7px;
      &:last-child {
        margin: 0;
      }
    }
    .selectIpt {
      width: 140px;
    }
  }
}
</style>
