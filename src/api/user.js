/**
 * 用户相关请求模块
 */
import request from "@/utils/request"

/**
 * 登录/注册
 */
export const login= data =>{
  return request({
    method:'POST',
    url:'/app/v1_0/authorizations',
    data
  })
}

/**
 * 获取验证码
 */
export const sendCode= mobile =>{
  return request({
    method:'GET',
    url:`/app/v1_0/sms/codes/${mobile}`
   
  })
}

/**
 * 用户基本信息
 */
export const getCurrentUser=()=>{
  return request({
    method:'GET',
    url:'/app/v1_0/user'
    // headers:{
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户频道列表
 */
export const getChannels= () =>{
  return request({
    method:'GET',
    url:'/app/v1_0/user/channels'   
  })
}

/**
 * 获取所有频道列表
 */
export const getAllChannels= () =>{
  return request({
    method:'GET',
    url:'/app/v1_0/channels'   
  })
}

/**
 * 关注用户
 */
export const Following= aut_id =>{
  return request({
    method:'POST',
    url:'/app/v1_0/user/followings',
    data:{
      target:aut_id
    }   
  })
}

/**
 * 取消关注用户
 */
export const DeleteFollowing= aut_id =>{
  return request({
    method:'DELETE',
    url:`/app/v1_0/user/followings/${aut_id}`   
  })
}