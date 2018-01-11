<template lang="pug">
  transition(name="el-fade-in")
    el-row(type="flex", justify="center")
      el-col.commentContainer(:span="18")
        .title 评价服务
        el-row.commentInfo
          el-form.demo-ruleForm(
          ref="ruleForm",
          label-width="150px"
          )
            el-form-item(label="评价级别")
              el-rate(
              v-model="rate",
              show-text,
              :disabled="commented"
              )
            el-form-item(label="备注")
              el-input.tipArea(
              type="textarea",
              :autosize="{ minRows: 10, maxRows: 4}",
              resize="none",
              v-model="commentText",
              v-show="!commented"
              )
              span(v-show="commented") {{ commentText }}
          el-row(type="flex", justify="center")
            el-button(type="warning", @click="commentBtn", v-show="!commented") 提交评论
            el-button(type="warning", @click="$router.back()", v-show="commented") 返回
</template>

<script>
import { mapGetters } from 'vuex'
import { CreateComment, GetEvaluateDetail } from '@/api/member'
export default {
  data() {
    return {
      rate: 0,
      commentText: '',
      commented: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    commentBtn() {
      if (!this.rate) {
        this.$message({
          message: '请先为我们打个分吧！',
          type: 'warning'
        })
        return
      }
      const params = {
        MemberId: this.userInfo.id,
        Content: this.commentText,
        TradingId: this.$route.params.id,
        ResultCategory: this.computedRate(this.rate)
      }
      this._CreateComment(params)
    },
    async _CreateComment(params) {
      try {
        const { data } = await CreateComment(params)
        console.log(data)
        if (data.success) {
          this.$notify.success({
            title: '成功',
            message: '留言成功'
          })
          setTimeout(() => {
            this.$router.push('/pc/personalcenter/myinfo')
          }, 1500)
        }
      } catch (err) {
        this.$notify.errow({
          title: '错误',
          message: '提交失败'
        })
      }
    },
    computedRate(rate) {
      switch (rate) {
        case 1:
          return 89
        case 2:
          return 88
        case 3:
          return 87
        case 4:
          return 86
        case 5:
          return 85
      }
    },
    reverseRate(resultCategory) {
      switch (resultCategory) {
        case 89:
          return 1
        case 88:
          return 2
        case 87:
          return 3
        case 86:
          return 4
        case 85:
          return 5
      }
    },
    async _GetEvaluateDetail() {
      try {
        const { data } = await GetEvaluateDetail({ id: this.$route.params.id })
        console.log('--->', data.result.content)
        if (data.result.content && data.result.resultCategory) {
          this.commented = true
          this.rate = this.reverseRate(data.result.resultCategory)
          this.commentText = data.result.content
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (!this.userInfo.memberId || !this.$route.params.id) this.$router.push('/pc/personalcenter/myinfo')
    // 暂时先这么用着
    if (this.$route.query.isComment) {
      this._GetEvaluateDetail()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variables.less';
.commentContainer {
  margin: 20px 0;
  padding: 30px;
  background-color: @background-extra-light-gray;
  border-radius: 4px;
  .title {
    padding-bottom: 15px;
    border-bottom: 1px solid @seperate-line-gray;
    font-size: @font-size-medium-x;
    font-weight: bold;
  }
  .commentInfo {
    padding: 15px 30px;
    .tipArea {
      width: 80%;
    }
    .el-rate {
      margin-top: 9px;
    }
  }
}
</style>
