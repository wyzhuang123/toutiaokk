<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
  </div>
</template>

<script>
import {getArticleComment} from '@/api/article'
export default {
   name:'CommentIndex',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset:null
    }
  },
  methods: {
   async  onLoad () {
     const {data}= await getArticleComment({
       type:'a',
       source:this.articleId,
       offset:this.offset,  //获取下一页数据的页码
       limit:10   //每页数据量    
     });
    console.log(data);

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
   
    },
  
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
    articleId:{
      type:[String,Number,Object],
      required:true
    }
  }
}
</script>

<style scoped >

</style>
