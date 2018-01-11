<template lang="pug">
  el-row.contactUsContainer
    el-col.imgContainer
    el-col.container
      .title 联系我们
    el-col.infoContainer
      el-row(type="flex", justify="center")
        el-col(:span="18")
          p.subTitle 电子地图
          #allMap
          ul 
            li.info_body_pp
              p 地址：中国山东济南马鞍山路2-1号
              p 邮编：250002
              p E-mail: hotel@shandonghotel.cn
              p 订房邮箱：sdhotelydb@shandonghotel.cn
              p 总机：（86-531）82958888/82508888
              p 传真：（86-531）82958886
              br
              div(style="margin-left:30px;")
              p(align="left" style="text-indent:0px;")
                strong 从济南遥墙国际机场至酒店
                br
                span 乘坐出租车40分钟
                br
                span 或乘坐机场巴士至济南火车站（50分钟）再转乘出租车15分钟即可到达酒店。
              p(align="left" style="text-indent:0px;")
                strong 从济南火车站至酒店
                br
                span 乘坐出租车15分钟
                br
                span 或步行至天桥南站乘坐85路公交线路至泉城公园站下车（18分钟），2分钟即可步行至酒店。
              p(align="left" style="text-indent:0px;")
                strong 驾车指南
                strong 
              p(align="left" style="text-indent:0px;")
                strong 北京至济南
                br
                span ○ 京沪高速向南行驶
                br
                span ○ 至济南西出口延经十西路向东行驶
                br
                span ○ 在玉函立交桥转至玉函路向南行驶
                br
                span ○ 在马鞍山路向东行驶。酒店在路右侧
                br
              p(align="left" style="text-indent:0px;")
                strong 上海至济南
                br
                span ○ 京沪高速向北行驶&nbsp;
                br
                span ○ 至济南西出口延经十西路向东行驶
                br
                span ○ 在玉函立交桥转至玉函路向南行驶
                br
                span ○ 在马鞍山路向东行驶。酒店在路右侧
              p(align="left" style="text-indent:0px;")
                strong 酒店至以下地点距离
                br
                span ○ 济南遥墙国际机场–40 公里
                br
                span ○ 济南火车站–6公里
                br
                span ○ 济南火车西站–19.6公里
                br
                span ○ 济南舜耕会展中心–1.6公里
                br
                span ○ 济南国际会展中心–13.1公里
                br
                span ○ 趵突泉–3.8公里
                br
                span ○ 大明湖–4.3公里
                br
                span ○ 千佛山–1.1公里
                br
                span ○ 泰山–85.5公里
                br
                span ○ 曲阜–148.9公里
    .footerWrapper
      btm-footer(ref="footer")
</template>

<script>
import BMap from 'BMap'
import BtmFooter from '@/components/BtmFooter/BtmFooter'
export default {
  created() {
    console.log(BMap)
  },
  mounted() {
    var map = new BMap.Map('allMap')
    map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 18)
    map.enableScrollWheelZoom(true)
    map.clearOverlays()
    var newPoint = new BMap.Point(117.028803, 36.647466)
    var marker = new BMap.Marker(newPoint)  // 创建标注
    map.addOverlay(marker)              // 将标注添加到地图中
    map.panTo(newPoint)
    var licontent = '<b style="color: ;">山东大厦</b><br>'
    licontent += '<span><strong>地址：</strong>中国山东济南马鞍山路2-1号</span><br>'
    licontent += '<span><strong>电话：</strong>(86-531)82958888/82508888</span><br>'
    var opts1 = { width: 300 }
    var infoWindow = new BMap.InfoWindow(licontent, opts1)
    marker.openInfoWindow(infoWindow)
    this.$refs.footer.setFooter()
  },
  components: {
    BtmFooter
  }
}
</script>

<style lang="less" scoped>
@import "../common/less/variables.less";
.contactUsContainer {
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
    #allMap {
      width: 100%;
      height: 600px;
    }
    .info_body_pp {
      margin-top: 10px;
      padding-left: 2em;
      font-size: @font-size-medium;
      p {
        // text-indent: 2em;
        line-height: 2em;
        margin-bottom: 8px;
        color: #595654;
        font-family: "宋体";
      }
    }
  }
}
</style>
