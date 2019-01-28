<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count > 0" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count > 0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true,food)"></div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  export default {
    props: {
      food: Object,
      foods:Array
    },
    methods: {
      updateFoodCount (isAdd,food) {

        if(isAdd && food.id.substr(0,5) == 'combo' && this.foods.find((f)=>{
            return f.count >= 1 && f.id !== food.id
          })){
            MessageBox('提示', '您已选择其他套餐，请取消后选择该套餐');
            return
        }
        if(isAdd && food.id.substr(0,5) == 'combo' && food.count >= 1){
          MessageBox('提示', '套餐以桌计,不可多选！');
          return
        }

        this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
