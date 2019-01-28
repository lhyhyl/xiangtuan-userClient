/*
状态对象
 */
export default {
  latitude: 30.003889, // 纬度
  longitude: 105.00894300000004, // 经度
  address: {}, //地址相关信息对象
  categorys: [], // 食品分类数组
  shops: [], // 商家数组
  userInfo: {}, // 用户信息
  self_goods: [], // 自选商品列表
  combo_goods:{},//套餐商品对象
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [], // 购物车中食物的列表
  searchShops: [], // 搜索得到的商家列表
  reserveData:{},//预定日期
  addressData:{},//客户地址信息
  selfFirstLoad:true,//判断自选商品首次加载
  comboFirstLoad:true,//判断套餐商品首次加载
  deskNum:"",//桌数
  undatable:[],//不可订日期
}
