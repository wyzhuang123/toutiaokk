<template>
  <div class="search-container">
    <form action="/">
    <van-search 
    v-model="searchText" 
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="$router.back()"
    @focus="isResultShow=false"
     />
    </form>
    <!-- 联想建议 -->
   <!-- 搜索结果 -->
  <search-result 
  v-if="isResultShow"
  :search-test="searchText"
  >
  </search-result>
    <!-- 历史记录 -->
  <search-suggestion
  v-else-if="searchText!=''"
  :search-test="searchText"
  @search="onSearch"
  >
   </search-suggestion>
   <search-history
   v-else
   :searchHistories="searchHistories"
  >
  </search-history>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue';
import SearchHistory from './components/search-history.vue';
import SearchResult from './components/search-result.vue';
import {setItem,getItem} from '@/utils/storage'
import {getSearchHistory} from '@/api/search'
import {mapState} from 'vuex'
export default {
  name:'SearchIndex',
  data() {
    return {
      searchText: '',
      isResultShow:false,
      //能读到数据则取前一个值，如果不能读到，则存新的数组
      searchHistories:getItem('search-histories') || []
    }
  },
  methods: {
    onSearch(searchText){
      this.searchText=searchText;
    //  查看数组是否有重复搜索内容
      const index=this.searchHistories.indexOf(searchText)
      //将重复的删除掉
      if(index!==-1){
        this.searchHistories.splice(index,1)
      }
       this.searchHistories.push(searchText);
      console.log(this.searchHistories);
      setItem('search-histories',this.searchHistories);
      this.isResultShow=true;
    },
   async loadSearchHistories(){
      let searchHistories=getItem('search-histories') ||[];
      if(this.user){
        const {data}=await getSearchHistory()
        /**
         * ES6数组去重
         */
     searchHistories=new Set([...searchHistories,...data.data.keywords])
      }
      this.searchHistories=searchHistories;
    }
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult 
  },
  computed:{
    ...mapState(['user'])
  },
  watch:{
  },
  created(){
      this.loadSearchHistories()
  },
  mounted(){
  },
  props:{
  }
}
</script>

<style scoped >

</style>
