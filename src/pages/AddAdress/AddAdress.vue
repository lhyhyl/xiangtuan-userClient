<template>
  <div class="add-bg">
    <div class="top" @click="$router.back()"><img src="./img/S90115-194352.png"><h3>添加地址</h3></div>
    <div class="add-cont">
      <ul>
        <li>
          <p class="oneandthree">联系人</p>
          <input class="add-username  wid66" type="text" v-model="name">
        </li>
        <li >
          <div class="add-danxuan" >
            <label><input  name="sex" type="radio" value="1"  v-model="sex"/>先生 </label>
            <label><input  name="sex" type="radio" value="0" style="margin-left: 10px"  v-model="sex"/>女士 </label>
          </div>
        </li>
        <li>
          <p class="two">手机号码</p>
          <input class="add-username wid66" type="text" v-model="phone">
        </li>
        <li class="add-you">
          <span class="oneandthree changePos">省市区</span>
          <v-distpicker style="position: absolute; right: 0;top:10px;width: 74%;"
                        @selected="onSelected"></v-distpicker>
        </li>
        <li class="add-you detailedAddress">
          <span class="oneandthree ">详细地址</span>
          <input class="add-username wid66" type="text" v-model="address">
        </li>
      </ul>
      <div class="add-queren " @click="submitAddress" ><a href="#">确认</a></div>
    </div>
  </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import VDistpicker from 'v-distpicker'
    export default {
      data(){
        return{
          name:"",//联系人
          sex:"",//性别
          phone:"",//手机号码
          area:"",//省市区
          address:"",//地址
        }
      },
      methods:{
        submitAddress(){
          const addressData = {name:this.name,sex:this.sex,phone:this.phone,address:this.address,area:this.area}
          if(this.name && this.sex && this.phone && this.address && this.area){
            this.$store.dispatch('reciveUserAddress',{addressData})
            this.$router.push("/payment")
          }else{
            MessageBox('信息不完整！', '请完善所有信息');

          }
        },
        onSelected(data) {
          this.area = data.province.value + '  ' + data.city.value + '  ' + data.area.value
        },

      },
      components: { VDistpicker }


    }
</script>

<style >
  input{
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .add-bg{
    background-color: #f0f0f0;
    height: 1000px;
  }
  .top{
    position: relative;
    height: 66px;
    background-color: #fff;

  }
  h3{
    line-height: 66px;
    text-align: center;
    font-size: 1.2rem;
  }
  .top img {
    position: absolute;
    left: 15px;
    top: 18px;
    width: 20px;
  }
  .add-cont{
    margin-top: 20px;
    height: 400px;
    background-color: #fff;
  }

  .add-cont ul{
    margin-left: 20px;
  }
  .add-cont ul li {
    height: 50px;
    font-size: 1.17rem;
    font-family: 微软雅黑;
    /*border-bottom: 1px solid #ccc;*/
    line-height: 50px;
  }
  .changePos{
    position: absolute;
    left:0;
    top:10px;
  }
  .oneandthree,.two{
    height: 55px;
    width: 95px;
    display: inline-block;
    background-color: #fff;
    padding-top: 2px;

  }
  .add-username{
    padding-left: 5px;
    font-size: 1.1rem;
    font-family: 微软雅黑;
    line-height: 35px;

  }
  .add-you {
    position: relative;
  }
  .add-you img{
    position: absolute;
    right: 12px;
    top: 12px;
    width: 20px;
    height: 20px;
  }
  .add-queren {
    margin: 95px auto;
    height: 50px;
    width:90%;
    border-radius: 5px;
    background-color: #E98758;
    text-align: center;
  }
  .add-queren:hover{
    background-color: #fff;
  }
  .add-queren a{
    color: #fff;
    line-height: 50px;
    font-size: 18px;
  }
  .add-danxuan {
    margin-left: 102px;
  }
  .wid66{
    width: 66%;
  }
  li{
    margin-top: 10px;
  }
  .detailedAddress{
    margin-top: 113px;
  }
</style>
