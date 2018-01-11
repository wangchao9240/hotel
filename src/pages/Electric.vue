<template lang="pug">
  el-row.ElectricContainer
    el-col.imgContainer
    el-col.container
      .title 山东大厦《电子版》
    el-col.infoContainer
      el-row(type="flex", justify="center")
        el-col(:span="18")
          .info_po(style="min-height:400px;")
            p
              a(href="pdf/sdds.pdf" target='_BLANK') 《山东大厦》电子版2015.5第二期
            p
              a(href="pdf/sdds1.pdf" target='_BLANK') 《山东大厦》电子版2015.5第三期
            p
              a(href="pdf/sdds2.pdf" target='_BLANK') 《山东大厦》电子版2015.7第四期
            p
              a(href="pdf/sdds3.pdf" target='_BLANK') 《山东大厦》电子版2016.1第四十八期
            p
              a(href="pdf/sdds4.pdf" target='_BLANK') 《山东大厦》电子版2016.3第四十九期
            p
              a(href="pdf/sdds5.pdf" target='_BLANK') 《山东大厦》电子版2016.5第五十期
            p
              a(href="pdf/sdds7.pdf" target='_BLANK') 《山东大厦》电子版2016.7第五十一期
            p
              a(href="pdf/sdds9.pdf" target='_BLANK') 《山东大厦》电子版2016.9第五十二期
    .footerWrapper
      btm-footer(ref="footer")
</template>

<script>
import BtmFooter from '@/components/BtmFooter/BtmFooter'
export default {
  mounted() {
    console.log('ele')
    this.$refs.footer.setFooter()
  },
  components: {
    BtmFooter
  }
}
</script>

<style lang="less" scoped>
@import "../common/less/variables.less";
.ElectricContainer {
  padding-bottom: 120px;
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
  .infoContainer {
    .subTitle {
      margin: 20px 0;
      font-size: @font-size-large;
      font-weight: bold;
    }
    .info_po a {
      color: #960;
      text-decoration: none;
      line-height: 30px;
      font-size: 14px;
    }
  }
}
</style>
