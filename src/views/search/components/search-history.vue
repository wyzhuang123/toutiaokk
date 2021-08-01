<template>
  <div class="search-history">
      <van-cell
      title="搜索历史"
      >
      <div v-if="isDeleteShow">
       <span>全部删除</span>
       &nbsp;&nbsp;
       <span @click="showDelete">完成</span>
      </div>
      <van-icon 
      v-else 
      name="delete"
      @click="showDelete"
      />  
      </van-cell>
      <van-cell 
      v-for="(result,index) in searchHistories"
      :key="index"
      :title="result"
      >
      <van-icon 
      v-if="isDeleteShow"
      name="close"
      @click="deleteClick(index)"
      />
      </van-cell>
  </div>
</template>

<script>
// import {deleteSearchHistory} from '@/api/search'
export default {
   name:'SearchHistory',
  data () {
    return {
      isDeleteShow: false,
     
    }
  },
  methods: {
    showDelete(){
      this.isDeleteShow=!this.isDeleteShow;
    },
   deleteClick(index){
     this.searchHistories.splice(index,1)
    }
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
    searchHistories:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped >

</style>
