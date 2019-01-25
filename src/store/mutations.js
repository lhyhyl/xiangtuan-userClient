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
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
  UPDATE_RESERVE_DATA,
  RECEIVE_USER_ADDRESS,
  UPDATE_DESK_NUM
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
    if(state.selfFirstLoad){
      state.self_goods = self_goods
        //更新sessionStorage
      sessionStorage.setItem('store',JSON.stringify(state))
      state.selfFirstLoad = false
    }else{
      state.self_goods.forEach((goods)=>{
        goods.foods.forEach((food)=>{
          if(food.count){
            Vue.set(food, 'count', food.count)
            let delFood = state.cartFoods.find(f => f.id == food.id)
            let index =  state.cartFoods.indexOf(delFood)
            state.cartFoods.splice(index,1)
            state.cartFoods.push(food)
          }

        })

      })
    }

  },

  [RECEIVE_COMBO_GOODS](state, {combo_goods}) {
    if(state.comboFirstLoad){
      state.combo_goods = combo_goods
      //更新sessionStorage
      sessionStorage.setItem('store',JSON.stringify(state))
      state.comboFirstLoad = false
    }else{
      state.combo_goods.foods.forEach((food)=>{
        if(food.count){
          Vue.set(food, 'count', food.count)
          let delFood = state.cartFoods.find(f => f.id == food.id)
          let index =  state.cartFoods.indexOf(delFood)
          state.cartFoods.splice(index,1)
          state.cartFoods.push(food)
        }
      })

    }

  },

  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(!food.count) { // 第一次增加
      Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count) {// 只有有值才去减
      food.count--
      if(food.count===0) {
        // 将food从cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    // 清除food中的count
    state.cartFoods.forEach(food => food.count = 0)

    // 移除购物车中所有购物项
    state.cartFoods = []

    //更新sessionStorage
    sessionStorage.setItem('store',JSON.stringify(state))
  },

  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },


  [UPDATE_RESERVE_DATA](state,{reserveData}){
    state.reserveData = reserveData;
  },

  //接收用户地址信息，修改state
  [RECEIVE_USER_ADDRESS](state,{addressData}){
    state.addressData = addressData;
  },

  //更新桌数信息
  [UPDATE_DESK_NUM](state,{deskNum}){
    state.deskNum = deskNum;
  },

}
