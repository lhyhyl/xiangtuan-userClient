<template>
    <div>
      <div class="goods">
        <div class="menu-wrapper">
          <ul>
            <!--current-->
            <li class="menu-item" >
            <span class="text bottom-border-1px">
              <img class="icon" :src="this.combo_goods.icon" v-if="this.combo_goods.icon">
              {{this.combo_goods.name}}
            </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper">
          <ul ref="foodsUl">
            <li class="food-list-hook">
              <h1 class="title">{{this.combo_goods.name}}</h1>

              <ul>
                <li class="food-item bottom-border-1px" v-for="(food, index) in  this.combo_goods.foods"
                    :key="index" @click="showFood(food)">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price + '元/桌'}}</span>
                      <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <CartControl :food="food" />
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <ShopCart />
      </div>
      <Food :food="food" ref="food"/>
    </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import { MessageBox } from 'mint-ui';
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
    export default {
      data() {
        return {
          food: {}, // 需要显示的food
        }
      },
      mounted() {
        MessageBox('温馨提示', '您现在所在页面为套餐页面，您可以选择商家精心为您准备的套餐，套餐以桌计。' +
          '当然如果您觉得套餐菜品不足，您也可以选择套餐后移步单品页面进行添加，您所选的商品商家都将为您精心准备');
        this.$store.dispatch('getComboGoods')
      },
      computed: {
        ...mapState(['combo_goods']),
      },
      methods: {
        // 显示点击的food
        showFood (food) {
          // 设置food
          this.food = food
          // 显示food组件 (在父组件中调用子组件对象的方法)
          this.$refs.food.toggleShow()
        },

        //根据cartFood更新food
        updateFood(food){
          this.$store.dispatch('updateFood')
        }

      },

      components: {
        CartControl,
        Food,
        ShopCart
      }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
