<template>
  <div class="home_container">
   <van-nav-bar class="app-nav-bar">
     <van-button 
     slot="title"
     class="search_btn"
     icon="search"
     type="info"
     round
     size="small"
     to="/search"
     >
     搜索
     </van-button>
   </van-nav-bar>
   <van-tabs   class="channel-tabs" v-model="active">
     <van-tab
     border=true
     v-for="channel in channels"
     :key="channel.id"
     :title="channel.name"   
     >
    <article-list
    :channel="channel"
    >
    </article-list>     
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder">
      </div>
    <div class="wap-nav-wrap" slot="nav-right">
      <van-icon name="wap-nav" @click="isShowEditClick"/>
    </div>
   </van-tabs>
    <van-popup 
       v-model="isChannelEditShow"
       position="top"
       closeable
       close-icon-position="top-left"
       get-container="body"
       class="channel-edit-popup"
    >
   <channel-edit :channels="channels"></channel-edit>
   </van-popup>
  </div>
</template>

<script>
import {getChannels} from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name:'HomeIndex',
  data () {
    return {
      active: 0,
      channels:[],
      isChannelEditShow:false
    }
  },
  components:{
    ArticleList,
    ChannelEdit
  },
  created(){
    ChannelEdit
      this.loadChannels()
  },
  methods: {
     async loadChannels(){
         const {data}=await getChannels()
         this.channels=data.data.channels
      },
    isShowEditClick(){
      this.isChannelEditShow=!this.isChannelEditShow;
    }
  }
}
</script>

<style scoped lang="less">
.home_container{
  .app-nav-bar{
    .search_btn{
      background-color: #5babfb;
        height: 32px;
        width: 227px;
        .van-icon-search{
          color:#fff;
        }
    }
  }
    /deep/  .van-ellipsis{
          max-width: unset;
        }
        .channel-tabs{
          /deep/ .van-tab{
            // width: 102px;
            // text-align: center;
            border-right: 0.5px solid #edeff3;
            border-bottom: 0.5px solid #edeff3;
          }
          /deep/.van-tabs__line{
              background: #3296fa;
              width: 15px !important;
              height: 3px;
              bottom:20px;
            }
          .wap-nav-wrap{
              position: fixed;
              right: 0;
              width: 33px;
              height: 43px;
              line-height: 44px;
              background-color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: .9;
              color: black;
              
              .van-icon{
                font-size: 25px;
              }
              &:before{
                content: '';
                width: 1px;
                height: 29px;
                background: url("./border.png") no-repeat;
                background-size: cover;
              }
          }
          .wap-nav-placeholder{
            width: 34px;
            flex-shrink: 0;
          }  
                }
                
  
}
.channel-edit-popup{
   height: 100%;
   color: #222222;
}
</style>
