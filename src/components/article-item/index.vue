<template>
  <div>
   <van-cell class="article-item" 
   :to="{
     name:'article',
     //动态路由传参
     params:{
       articleId: article.art_id
     }
   }"
   
   >
     <div slot="title" class="article_title van-multi-ellipsis--l3">{{article.title}}</div>
     <div slot="label">
       <div class="cover-wrap" v-if="article.cover.type===3">
         <div class="cover-wrap-item"  v-for="(item,index) in article.cover.images" :key="index"> 
          <van-image    
            fit="contain"
            class="cover-item"
           :src="item"
          />
         </div>
       </div>
       <div class="label_wrap">
        <span v-if="article.is_top===1" class="IsTop">置顶</span>
        <span class="label_name">{{article.aut_name}}</span>
        <span class="label_comment">{{article.comm_count}}评论</span>
        <span>{{article.pubdate|relativeTime}}</span>
       </div>
     </div>
    <van-image
     class="right_cover"
     v-if="article.cover.type===1"
     fit="contain"
     :src="article.cover.images[0]"
/>
   </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
   
    }
  },
  methods: {
  },
  computed:{
  },
  watch:{
  },
  created(){
  },
  mounted(){
  },
  props:{
    article:{
      type:Object,
      required:true
    }
  }
}
</script>

<style scoped lang="less">
.article-item{
  .article_title{
    font-size: 16px;
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right_cover{
      width: 116px;
      height: 73px;
  }
  .cover-wrap{
    padding: 15px 0;
    display: flex;
    .cover-wrap-item{
      flex: 1;
      height: 73px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item{
        width: 100%;
        height: 73px;
      }
    }
  }
  .label_wrap{
    font-size: 11px;
    .IsTop{
      color:red;
      margin-right: 12px;
    }
    .label_name{

    }
    .label_comment{
      margin-right: 12px;
      margin-left: 12px;
    }
  }
}
  
</style>
