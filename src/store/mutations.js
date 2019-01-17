/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_SELF_GOODS,
  RECEIVE_COMBO_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  INITIALIZE_FOOD_CONUT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
  UPDATE_RESERVE_DATA
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_SELF_GOODS](state, {self_goods}) {
    state.self_goods = self_goods
  },

  [RECEIVE_COMBO_GOODS](state, {combo_goods}) {
    state.combo_goods = combo_goods
  },

  [INCREMENT_FOOD_COUNT](state, {food,count}) {
    debugger
    if(!food.count || !count) { // 第一次增加
      // food.count = 1  // 新增属性(没有数据绑定)
      /*
      对象
      属性名
      属性值
       */
      Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food,count}) {

      food.count = count
      if(food.count===0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }

  },
  [INITIALIZE_FOOD_CONUT](state, {food,count}){
    if(count > 0){
      Vue.set(food, 'count', count) // 让新增的属性也有数据绑定
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    }

  },

  [CLEAR_CART](state) {

    // 清除food中的count
    state.cartFoods.forEach(food => food.count = 0)
    // 移除购物车中所有购物项
    state.cartFoods = []
  },

  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },


  [UPDATE_RESERVE_DATA](state,{reserveData}){
    state.reserveData = reserveData;
  }
}
