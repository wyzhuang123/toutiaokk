<template>
  <div>
    <van-nav-bar
  class="app-nav-bar"
  title="登录/注册"
  color="#fff"
  left-arrow
  @click-left="$router.back()"
/>
<!-- 使用field的rules属性定义校验规则-->
  <van-form 
  @submit="onLogin" 
  @failed="onFailed"
  :show-error="false"
  :show-error-message="false" 
   validate-first
   ref="login-form"
  >
  <van-field
  v-model="user.mobile"
    clearable
    icon-prefix="toutiao"
    left-icon="shouji"
    placeholder="请输入手机号码"
    name='phone'
    :rules="this.formRules.mobile"
  />
  <van-field
  v-model="user.code"
  clearable
  icon-prefix="toutiao"
  left-icon="yanzhengma"
  placeholder="请输入短信验证码"
  name='code'
    :rules="this.formRules.code"
>
  <template #button>
    <van-count-down 
    class="CountDown"
    :time="1000*60" 
    format="ss" 
    round
    v-if="isCountDownShow"
    @finish="CountFinish"
    />
    <van-button 
    class="getcodes-btn"
    size="mini" 
    @click.prevent="setcode"
    round
    v-else
    :loading="isLoading"
    >发送验证码
    </van-button>
  </template>
</van-field>

<div class="login-btn-wrap">
  <van-button 
  type="info" 
  block 
  class="app-register-button"
  >登录</van-button>
  </div>
</van-form>


  </div>
  
</template>

<script>
import { Toast } from 'vant';
import {login} from '@/api/user'
import {sendCode} from '@/api/user'
export default {
  name:'LoginIndex',
  data () {
    return {
      user:{
      mobile:'', //手机号
      code:'',    //验证码
      },
      //手机验证倒计时
      isCountDownShow:false,
      isLoading:false,
      formRules:{
        mobile:[
          { required: true, message: '请输入手机号' },
          {pattern:/\d{10}/,message:'手机号格式错误'}
          ],
        code:[
          { required: true, message: '验证码为空' },
          {pattern:/\d{6}/,message:'验证码格式错误'}
          ]
      }
    }
  },
  methods: {
     onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
      onSubmit(values) {
      console.log('submit', values);
    },
    onLogin(){
      /**
       * 1.找到数据接口
       * 2.封装请求方法
       * 3.请求调用登录
       * 4.处理响应结果
       */
        //加载效果
      Toast.loading({
        message: '登录中...',
        forbidClick: true,//登录中后面的背景不能被点击
        duration:0    //当获取值为0是，会一起转
});
      login(this.user).then((res)=>{
        //成功提示
        Toast.success('登录成功');
        
        //将后端返回的用户登录状态（token等数据）放到Vuex容器中
          this.$store.commit('setUser',res.data.data)
        
        //跳转到我的界面  
          this.$router.push('/home');
          
      }).catch((err)=>{
        //失败提示
        Toast.fail('登录失败，手机号或验证码错误');
        console.log('登录失败',err);
      })
     
     /**
      * 用trycatch
      */

    //  try {
    //    const s=await login(this.user);
    //    console.log(s);
    //  } catch (error) {
    //    console.log(error);
    //  }
    },
    onFailed(error){
        if(error.errors[0]){
          // console.log(error);
          //Toast提示
          Toast({
          message:error.errors[0].message,
          //提示消息位置
          position:'top'
          })
        }
    },
    CountFinish(){
      this.isCountDownShow=false;
    },
     async setcode(){
       try {
         //校验手机号码
        await this.$refs['login-form'].validate('phone')
          //loading状态，防止网络用户多次点击触发发送行为
        this.isLoading=true;
        //校验通过，请求发送验证码
        await sendCode(this.user.mobile)
        //倒计时,后定义倒计时的finish方法
        
        this.isCountDownShow=true;
         
       } catch (error) {
         //调整捕获异常的方式
         let message=''
         if(error &&error.response &&error.response.status===429){
           message='发送太频繁了，请稍后重试'
         }else if(error.name==='phone'){
            message=error.message;
         }else{
           message='发送失败，请稍后重试'
         }
        Toast({
          message,
          position:'top'
        })
       }  
        //无论成功还是失败都要关闭loading
       this.isLoading=false;
    }
  }
}
</script> 

<style>

</style>
