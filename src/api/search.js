/**
 * 搜索请求模块
 */
import request from "@/utils/request"

/**
 * 联系建议
 */
export const getSearchSuggestion= q =>{
  return request({
    method:'GET',
    url:'/app/v1_0/suggestion',
    params:{
      q
    }
  })
}

/**
 * 搜索历史
 */
export const getSearchHistory=()=>{
  return request({
    method:'GET',
    url:'/app/v1_0/search/histories',
  })
}

/**
 * 搜索结果
 */
export const getSearchResult=params=>{
  return request({
    method:'GET',
    url:'/app/v1_0/search',
    params
  })
}

/**
 * 删除搜索历史
 */
export const deleteSearchHistory=()=>{
  return request({
    method:'DELETE',
    url:'/app/v1_0/search/histories',
  })
}
