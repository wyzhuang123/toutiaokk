// 请求模块
import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
 const request=axios.create({
  //基础路径
  baseURL:'http://ttapi.research.itcast.cn/',
  transformResponse:[function(data){
    try {
      return JSONbig.parse(data)
    } catch (error) {
      console.log('转换失败',error);
      return data
    }
  }]

})
  
  //请求拦截器
  
  request.interceptors.request.use(function(config){
    //通过结构获取user
    const {user}=store.state;
    //判断是否存在
    if(user){
      config.headers.Authorization=`Bearer ${user.token}`
    }
    //return 不能去掉，不然就会被拦截在这里
    return config
  },function(error){
    return Promise.reject(error);
  });





  export default request