<template>
  <section class="payment" >
    <HeaderTop title="确认订单"/>
    <a class="back" @click="$router.push('/shop/combo_goods')">
      <i class="iconfont icon-arrow_left"></i>
    </a>
    <section class="common adress">
      <router-link to="/select-adress" class="adress-link">
        <div class="adress_image">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
        <div style="line-height: 0px" v-if="this.addressData.phone">
          <span>{{this.addressData.name}}{{this.addressData.sex === 0 ? "女士" : "先生"}}</span>
          <span>{{this.addressData.phone}}</span>
          <span>桌数:{{this.deskNum}}</span>

          <div class="hideFont" :title=[this.addressData.area,this.addressData.address] ><nobr>{{this.addressData.area + this.addressData.address}}</nobr></div>
          <div class="reserveData">办席日期:{{this.reserveData.year }}年{{this.reserveData.month}}月{{this.reserveData.day}}日</div>
        </div>

        <p class="user-info-top" v-else>请添加办席地点</p>
      </div>

        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="common selectedProduct">
      <div class="standardWidth">
        <div class="shopName">
          <span >郑双全餐饮服务</span>
        </div>
        <div class="order_container">
          <ul class="order_list">
            <li class="order_li border-1px" v-for="(cartFood,index) in cartFoods" :key="index">
            <a>
              <div class="order_left">
                <img class="order_img" src="./images/1.jpg" width=80>
              </div>
              <div class="order_center">

                <span class="order_title ">{{cartFood.name}}</span>&nbsp;&nbsp;
                <span>x{{cartFood.count}}</span>

              </div>
              <div class="order_right">
                <h4 class="order_price ">￥{{cartFood.price}}</h4>
              </div>

            </a>
          </li>

          </ul>
          <div style="display: flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;">
            <span>桌数{{this.deskNum}}</span>
            <span>{{totalPrice}}元 * {{deskNum}}</span>
            <span >共计:<a style="color: red;">{{this.sum()}}</a>元</span>
          </div>


        </div>
      </div>


    </section>

    <button class="login_submit"
            @click="$router.push('/shop/goods')"
            >订单确认无误，点击提交</button>

  </section>


</template>
<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {mapState,mapGetters} from 'vuex'
  export default {

    computed:{
      ...mapState(['cartFoods',"addressData",'deskNum','reserveData']),
      ...mapGetters([ 'totalPrice']),
    },
    components: {
      HeaderTop
    },
    methods:{
      sum(){
        let desks = this.deskNum.substring(0,1)*1
        return this.totalPrice * desks
      },

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  body
    background-color #f0f0f0
    .payment
      width:100%
      .back
        position: fixed
        top: 10px
        left: 0
        z-index 1000000
        .icon-arrow_left
            display: block
            padding: 5px
            font-size: 20px
            color: #777575
      .login_submit
        display: block;
        width :100%;
        height :42px;
        margin-top :30px;
        border-radius: 4px;
        background :#FE970A;
        color :#fff;
        text-align :center;
        font-size :16px;
        line-height: 42px;
        border :0;
      .common
          margin auto
          margin-bottom 20px
          width 90%
          border-radius 15px
          background-color #fff

      .adress
          margin-top 60px
          height 100px

        .adress-link
              clearFix()
              position relative
              display block
              padding 20px 10px
              .adress_image
                float left
                width 60px
                height 60px
                border-radius 50%
                overflow hidden
                vertical-align top
                .icon-person
                  background #e4e4e4
                  font-size 62px
              .user-info
                float left
                margin-top 15px
                margin-left 11px
                span
                  color #000
                .hideFont
                  margin-top: 22px;
                  font-size: 12px;
                  width:252px;
                  height:12px;
                  line-height 12px
                  overflow hidden
                  text-overflow ellipsis
                .reserveData
                  margin-top 15px
                  font-size 12px
                p
                  font-weight: 700
                  font-size 25px
                  color #ff642e
                  &.user-info-top
                    padding-bottom 8px
                  .user-icon
                    display inline-block
                    margin-left -15px
                    margin-right 5px
                    width 20px
                    height 20px
                    .icon-mobile
                      font-size 30px
                      vertical-align text-top
                  .icon-mobile-number
                    font-size 14px
                    color #fff
              .arrow
                width 12px
                height 12px
                position absolute
                right 15px
                top 40%
                .icon-jiantou1
                  color #b7b7b7
                  font-size 5px
        .selectedProduct

              .standardWidth
                  width 90%
                  margin 0 auto
                .shopName
                  height 80px
                  border-bottom 1px solid #e1e1e1
                  span
                    color: #4b4b4b
                    line-height 80px
                .order_container
                    padding 50px 0 50px 0
                    .order_list
                      .order_li
                        position: relative;
                        width: 100%;
                        display inline-block
                        margin-bottom 20px
                        .order_left
                          float: left
                          margin-right 20px

                        .order_center
                          color #000
                          float: left
                          display: block
                          width:54%
                          .order_title
                            margin-bottom 31px
                        .order_right
                          color #000
                          float: right
                          font-weight:bolder
</style>

