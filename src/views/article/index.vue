<template>
  <div class="article-container">
    <van-nav-bar
      title="文章详情"
      class="app-nav-bar"
      left-arrow
      @click-left="this.$route.back()"
   />
   <div class="article-wrap">
        <h1 class="title">{{Content.title}}</h1>
   <van-cell center class="user-info">
     <van-image
     class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="this.Content.aut_photo"
      />
       <div slot="title" class="title-name">{{Content.aut_name}}</div>
       <div slot="label" class="title-label">{{Content.pubdate|relativeTime}}</div>
    <van-button 
    round 
    :type="Content.is_followed ? 'info':'warning'" 
    class="follow-btn"
    slot="right-icon"
    :icon="Content.is_followed ? '':'plus'"
    size="mini"
    @click="onFollowClick"
    >{{Content.is_followed ? '已关注':'关注'}}</van-button>
   </van-cell>
   <div class="markdown-body" v-html="Content.content" ref="article-content" >
   </div>
   <comment-list :articleId="articleId"></comment-list>
   </div>

<div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        color="#777"
        name="star-o"
      />
      <van-icon
        color="#777"
        :name="Content.attitude===1? 'good-job':'good-job-o'"
        @click="onlike"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>

<script>
import './github-markdown.css';
import {getArticleContent,liking,Unliking} from '@/api/article'
import {ImagePreview} from 'vant'
import {Following,DeleteFollowing} from '@/api/user'
import CommentList from './components/comment-list.vue';
export default {
   name:'ArticleConetneIndex',            
  data () {
    return {
      Content: {}, 
    }
  },
  methods: {
    async loadArticleContent(){
      const {data}=await getArticleContent(this.articleId)
      this.Content=data.data;

      const articleContent =this.$refs['article-content'];
      // console.log(articleContent);
      /**
       * 如果需要在修改数据之后马上操作该被数据影响的DOM，需要把这个代码放到$nextTick中
       */
      this.$nextTick(()=>{
        const imgs= articleContent.querySelectorAll('img');
        const imgPaths=[]
        // console.log(imgs);
         /**
         * 绑定事件
         */
         for(let i=0;i<imgs.length;i++){
            imgPaths.push(imgs[i].src)
             imgs[i].addEventListener('click',function(){
                 ImagePreview({
                    images:imgPaths,
                    startPosition:i
                 });
             })
      }
      })
     
    },
    async loadArticleComment(){
      // const {data}=await getArticleComment(
      //   {
      //     type:a,
      //     source:this.articleId,
      //     // offset:,
      //     limit:10
      //   }
      // )
      // console.log(data);
    },
    async onFollowClick(){
        if(this.Content.is_followed){
            await  DeleteFollowing(this.Content.aut_id);
            console.log(1);
            console.log(this.Content.aut_id);
        }
        else{
            await  Following(this.Content.aut_id);
            console.log(2);
        }
        this.Content.is_followed=!this.Content.is_followed
    },
   async onlike(){
        if(this.Content.attitude===1){
          await Unliking(this.articleId)
          this.Content.attitude=-1;
        }
        else{
          await liking(this.articleId)
          this.Content.attitude=1;
        }
       
    }
  },
  computed:{
  },
  watch:{
  },
  created(){
      this.loadArticleContent()
      // this.loadArticleComment()
  },
  mounted(){
  },
  props:{
    articleId:{
      type:[String,Number,Object],
      required:true
    }
  },
  components:{
    CommentList
  }
}
</script>

<style scoped lang="less">
    .article-container{
      .article-wrap{
        position:fixed;
        top:46px;
        bottom:44px;
        left: 0;
        right: 0;
        overflow-y: auto;
      }
     /deep/ .van-nav-bar__content{
        border:unset;
      }
      .title{
        font-size: 20px;
        color:#3a3a3a;
        padding: 14px;
        background-color: #fff;
        margin: 0;
      }
      .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }

      
    }
    .user-info{
      .title-name{
        font-size: 12px; 
    
      }
      .title-label{
        font-size: 12px;
        color:#b4b4b4;
      }
      .avatar{
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
       .follow-btn{
        width: 85px;
        height: 29px;
        
     
      }
     /deep/ .van-button__content{
        text-align: center;
      }
    }
    // ul{
    //    list-style: unset;
    // }
    .markdown-body{
      padding:14px;
      background-color: #fff;
    }
</style>
