<template>
  <div class="article-list">
    <van-pull-refresh 
    v-model="isRefreshLoading" 
    @refresh="onRefresh"
    :success-text="RefreshSuccessText"
    >
    <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     @load="onLoad"
    >
    <article-item 
    v-for="(item,index) in list" 
    :key="index"
    :article="item"
    @click="showArticleClick"
    >

    </article-item>
    </van-list>
    </van-pull-refresh>
    
  </div>
</template>

<script>
import {getArticles} from '@/api/article'
import ArticleItem from '@/components/article-item/'
export default {
  name:'ArticleList',
  data () {
    return {
      list: [],//数据列表
      loading: false,
      finished: false,
      timestamp:null,//获取下一页数据的时间戳
      isRefreshLoading:false, //下拉刷新的loading状态
      RefreshSuccessText:''
    }
  },
  props:{
    // 父组件传值频道数据给子组件
    channel:{
      type:Object,
      required:true
    }
  },
  components:{
    ArticleItem
  },
  methods: {
    /**
     * 用户加载数据，当页面数据不能填满整个页面屏幕时，会再次加载onload事件
     */
    async onLoad() {
      /**
       * 1.请求获取数据
       */
       const {data}= await getArticles({
         //网络请求传的参数
         channel_id:this.channel.id,
         timestamp:this.timestamp || Date.now(),
         //是否包含置顶文章
         with_top:1
       })
      //  console.log(data);
        
        /**
         * 2.将数据push到list数组中
         */
        let base_data=data.data.results
        for(let i=0;i<base_data.length;i++){
          this.list.push(base_data[i])
        }
        // console.log(this.list); 
       
       /**
         *3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
            加载状态结束,为true时会加载数据，false不会加载
         */
        this.loading = false;

        /**
         * 4.数据全部加载结束了，不会加载更多
         * 数据全部加载完成
         */

        //判断是否还有数据
        if(base_data.length){
            //有就更新新的时间戳
          this.timestamp=data.data.pre_timestamp;
        }else{
          //没有新的数据就将finished改为true，不再加载新的数据
          this.finished=true;
        } 
     
    },
    async onRefresh(){
      const {data}= await getArticles({
         //网络请求传的参数
         channel_id:this.channel.id,
         timestamp:Date.now(),
         //是否包含置顶文章
         with_top:1
       })
       this.list.unshift(...data.data.results)
       this.isRefreshLoading=false;
       //刷新的提示语
       this.RefreshSuccessText='刷新成功！'
    },
    showArticleClick(){
      this.$router.push('')
    }
  },
  
}
</script>

<style scoped lang="less">
  .article-list{
    // 让列表定位
    position:fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow: auto;
  }

</style>
