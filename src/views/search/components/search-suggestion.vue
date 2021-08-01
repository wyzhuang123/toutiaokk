<template>
  <div class="search-suggestion">
    <van-cell
    v-for="option in options"
    :key="option"
    icon="search"
    @click="$emit('search',option)"
    >
    <div slot="title" v-html="highlight(option)">{{option}}</div>
    </van-cell>
  </div>
</template>

<script>
import {debounce} from 'loadsh';
import {getSearchSuggestion} from '@/api/search';
export default {
   name:'searchSuggestion',
  data () {
    return {
      options: []
    }
  },
  methods: {
     SearchClick(){
      
    },
   async SearchTestChange(){
      let flag=true;
      if(flag){
          const {data}=await getSearchSuggestion(this.searchTest);
          this.options=data.data.options;
      }else{
          flag=false;
      }

    },
    highlight(str){
      /**
       * RefExp是正则表达式的构造函数
       * 参数1：字符串
       * 参数2：匹配模式
       * 返回值：正则对象
       */
    return   str.replace(new RegExp(this.searchTest,'gi'),
        `,<span style="color:red">${this.searchTest}</span>`)
    }
    
  },
  computed:{
  },
  watch:{
    //监视的完整写法
  searchTest:{      
     handler:debounce(async function(){
       const {data} =await getSearchSuggestion(this.searchTest)
       this.options=data.data.options
     },500),
     immediate:true
  },
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

<style scoped >

</style>
