<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
  <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
      type="danger"
      plain
      round
      size="mini"
      style="width:50px"
      @click="isEdit=!isEdit"
      >{{isEdit? '完成':'编辑'}}</van-button>
  </van-cell>
  <van-grid :gutter="10">
      <van-grid-item 
      class="user-channel mychannel"
      icon="clear"
      v-for="item in channels" 
      :key="item.id"
     
       >{{item.name}}</van-grid-item>
  </van-grid>
  <!-- 频道推荐 -->
  <van-cell center :border="false">
      <div slot="title" class="channel-title channel-title-tuijian">频道推荐</div>
  </van-cell>
  <van-grid :gutter="10">
  <van-grid-item 
  class="user-channel"
  icon="clear"
  v-for="item in getRecommendChannels" 
  :key="item.id"
  @click="onAdd(item)"
   >{{item.name}}</van-grid-item>
  </van-grid>
  </div>
</template>

<script>
import {getAllChannels} from '@/api/user'
import {AddChannel} from '@/api/channel'
export default {
  data () {
    return {
     TheAllChannels:[],
     isEdit:false
    }
  },
  methods: {   
     async AllChannels(){
        const {data}=await getAllChannels();
        this.TheAllChannels=data.data.channels;
        console.log(this.TheAllChannels);
      },
     async onAdd(item){
       this.channels.push(item);
        await AddChannel(item)
      }
  },
  computed:{
    /**
     *  filter方法：过滤数据，根据方法返回的布尔值true来收集数据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
     */
    /**
     * 计算属性会观测内部数据的变化而变化
     */
    getRecommendChannels(){
      //filter方法查找满足条件的所有
      return this.TheAllChannels.filter(channel=>{
      //判断channel是否属于用户判断，find方法查找满足条件的单个元素(结果取反得到未添加的频道，然后展示)
        return !this.channels.find(userChannel=>{
          //找到满足该条件的元素
            return userChannel.id===channel.id
          })
      })
    }
  },
  watch:{
  },
  created(){
     this.AllChannels()
     console.log(this.RecommendChannels);
  },
  mounted(){
  },
  props:{
    channels:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333333;
    margin-bottom: 10px;
  }
  .channel-title-tuijian{
    margin-top: 18.5px;
  }
 /deep/ .van-grid-item__content{
    width: 80px;
    height: 43px;
    background: #f4f5f6 no-repeat;
    //  background-image: url(../border.png) ;
    .van-grid-item__text{
      font-size: 14px;
    }
  }
  
  .user-channel{
    font-size: 14px;
   
  }
 
}
</style>
