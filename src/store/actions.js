/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SELF_GOODS,
  RECEIVE_COMBO_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  INITIALIZE_FOOD_CONUT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
  UPDATE_RESERVE_DATA,
  RECEIVE_USER_ADDRESS,
  UPDATE_DESK_NUM,
  RECEIVE_UNDATABLE
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopRatings,
  reqSelfGoods,
  reqComboGoods,
  reqShopInfo,
  reqSearchShop,
  reqUndatable
} from '../api'

export default {
  // 异步获取地址
  async getAddress({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取食品分类列表
  async getCategorys({commit}) {
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 异步获取商家列表
  async getShops({commit, state}) {
    // 发送异步ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (!Array.prototype.isPrototypeOf(result)) {
      const shops = []
      shops.push(result)
      commit(RECEIVE_SHOPS, {shops})
    }else{
      commit(RECEIVE_SHOPS, {result})
    }

  },

  // 同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  // 异步登出
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 异步获取商家自选商品列表
  async getSelfGoods({commit}, callback) {
    const result = await reqSelfGoods()
    if (result.code === 0) {
      const self_goods = result.data
      commit(RECEIVE_SELF_GOODS, {self_goods})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 异步获取商家套餐商品列表
  async getComboGoods({commit}, callback) {
    const result = await reqComboGoods()
    if (result.code === 0) {
      const combo_goods = result.data
      commit(RECEIVE_COMBO_GOODS, {combo_goods})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  //根据cartFood更新商品列表
  updateFood({commit}){
     let obj = this.state.cartFoods.find(f => {
     return f.id == food.id
    })
  },
  // 同步更新food中的count值
  updateFoodCount({commit}, {isAdd, food,count}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food,count})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food,count})
    }
  },

  //同步初始化food中的count值
  initializeFoodCount({commit},{food,count}){
    commit(INITIALIZE_FOOD_CONUT,{food,count})
  },
  // 同步清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },

  // 异步获取商家商品列表
  async searchShops({commit, state}, keyword) {

    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
  // 异步获取商家不可订日期
  async getUndatable({commit}, callback) {
    const result = await reqUndatable()
    if (result.code === 0) {
      const undatable = result.data
      commit(RECEIVE_UNDATABLE,{undatable})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },


  //同步更新预定日期
  updateReserveData({commit},{reserveData}){
      commit(UPDATE_RESERVE_DATA,{reserveData})
  },

  //同步接收用户地址信息
  reciveUserAddress({commit},{addressData}){
    commit(RECEIVE_USER_ADDRESS,{addressData})
  },

  //同步更新桌数信息
  updateDeskNum({commit},{deskNum}){
    commit(UPDATE_DESK_NUM,{deskNum})
  },

}

