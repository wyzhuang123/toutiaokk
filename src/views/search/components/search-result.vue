<template>
  <div class="search-result">
    <van-list
       v-model="loading"
       :finished="finished"
       finished-text="没有更多了"
       @load="onLoad"
    >
  <van-cell 
  v-for="item in list" 
  :key="item.art_id" 
  :title="item.title"/>
</van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
   name:'SeacrhResult',
  data () {
    return {
     list: [],
      loading: false,
      finished: false,
      page:1,
      perPage:10
    }
  },
  methods: {
    async onLoad() {
        const {data}=await getSearchResult({
          //接口传参数
          page:this.page,
          per_page:this.perPage,
          q:this.searchTest
        })
        const {results}=data.data;
        this.list.push(...results)

        this.loading=false;
          //是否还有数据
        if(results.length){
          this.page++;
        }else{
          this.finished=true;
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
     searchTest:{
      type:String,
      required:true
    }
  }
}
</script>

<style scoped lang="less">
  .search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y:auto;
  }
</style>
