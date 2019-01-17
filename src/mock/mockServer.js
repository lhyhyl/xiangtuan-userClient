/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data01.json'

// 返回自选goods的接口
Mock.mock('/self_goods', {code:0, data: data.self_goods})
// 返回套餐goods的接口
Mock.mock('/combo', {code:0, data: data.combo})
// 返回ratings的接口
Mock.mock('/ratings', {code:0, data: data.ratings})
// 返回info的接口
Mock.mock('/info', {code:0, data: data.info})

// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
