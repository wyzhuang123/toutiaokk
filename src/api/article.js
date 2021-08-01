/**
 * 文章相关请求模块
 */
import request from "@/utils/request"

/**
 * 获取文章列表数据
 */
export const getArticles= params =>{
  return request({
    method:'GET',
    url:'/app/v1_1/articles',
    params   
  })
}

/**
 * 获取文章详情
 */
export const getArticleContent= articleId =>{
  return request({
    method:'GET',
    url:`/app/v1_0/articles/${articleId}`   
  })
}

/**
 * 获取评论或评论回复
 */
export const getArticleComment= params =>{
  return request({
    method:'GET',
    url:' /app/v1_0/comments',
    params
  })
}

/**
 * 点赞文章
 */
export const liking= art_id =>{
  return request({
    method:'POST',
    url:'/app/v1_0/article/likings',
    data:{
      target:art_id
    }
  })
}

/**
 * 取消点赞文章
 */
export const Unliking= art_id =>{
  return request({
    method:'DELETE',
    url:`/app/v1_0/article/likings/${art_id}`,
  })
}