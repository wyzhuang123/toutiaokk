/**
 * 本地存储封装模块
 */

 export const getItem = name =>{
    const data=window.localStorage.getItem(name)
    try {
      //JSON转换
      return JSON.parse(data)
    } catch (error) {
      //不是JSON就直接返回
      return data
    }
 }
 export const setItem=(name,value)=>{
   //如果value是对象，就把value转为JSON
   if(typeof value ==='object'){
     value=JSON.stringify(value)
     window.localStorage.setItem(name,value)
   }else{
      window.localStorage.setItem(name,JSON.stringify(value))
   }
  
 }
 export const deleteItem=name=>{
    window.localStorage.removeItem(name)
 }
