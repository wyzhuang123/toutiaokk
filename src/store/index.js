import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'


Vue.use(Vuex)

//定义常量
const USER_KEY='user'

export default new Vuex.Store({
  state: {
    user:getItem(USER_KEY)
  },
  mutations: {
    setUser(state,data){
        state.user=data;
        //将数据存储到本地，这里仅仅是为了持久化数据
        /*
        Token：
        1、Token的引入：Token是在客户端频繁向服务端请求数据，服务端频繁的去数据库查询用户名和密码并进行对比，
        判断用户名和密码正确与否，并作出相应提示，在这样的背景下，Token便应运而生。
        2、Token的定义：Token是服务端生成的一串字符串，
        以作客户端进行请求的一个令牌，当第一次登录后，服务器生成一个Token便将此Token返回给客户端，
        以后客户端只需带上这个Token前来请求数据即可，无需再次带上用户名和密码。
        3、使用Token的目的：Token的目的是为了减轻服务器的压力，减少频繁的查询数据库，使服务器更加健壮。


        登录成功有两个token：(后端决定，不是绝对 )
        refresh_token:刷新令牌，有效期14天，用于访问令牌过期之后重新获取新的访问令牌
        token:访问令牌，有效期2小时
        */
       setItem(USER_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
