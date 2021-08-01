/**
 * 用户频道增删改模块
 */
import request from '@/utils/request'

/**
  *用户频道添加 
  */

 export const AddChannel=target=>{
   return  request({
     method:'GET',
     url:`/app/v1_0/user/channels/${target}`
     
   })
 }