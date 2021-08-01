<template>
  <div class="mine_container">
    <!-- 登录了显示用户基本数据内容 -->
    <van-cell-group v-if="user" class="mine_info">
      <van-cell class="base_info"
      center
      :border="false"
      >
      <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="UserImformation.photo"
      />
    <div slot="title" class="mine_name">{{UserImformation.name}}</div>
    <van-button
      class="update_btn"
      size="small"
      round
    >编辑资料</van-button>
      </van-cell>
      <van-grid
      :border="false" 
      class="data_info"
      >
        <van-grid-item  text="头条" class="text_wrap">
          <div class="data_count">
              {{UserImformation.art_count}}
          </div>
          <div class="data_name">
            头条
          </div>
        </van-grid-item>
        <van-grid-item  text="关注" class="text_wrap">
          <div class="data_count">
            {{UserImformation.follow_count}}
          </div>
           <div class="data_name">
            关注
          </div>
        </van-grid-item>
        <van-grid-item  text="粉丝" class="text_wrap">
           <div class="data_count">
            {{UserImformation.fans_count}}
          </div>
           <div class="data_name">
            粉丝
          </div>
        </van-grid-item>
        <van-grid-item  text="获赞" class="text_wrap">
          <div class="data_count">
           {{UserImformation.like_count}}
          </div>
           <div class="data_name">
            获赞
          </div>
        </van-grid-item>
      </van-grid>
       </van-cell-group>
       <!-- 未登录就显示下面页面 -->
       <div  v-else class="not_login">
        <div @click="$router.push('/login')" class="header_login_btn">
          <img src="./header.png" alt="" class="not_avatar">
        <div class="not_text">
          登录/注册
        </div>
        </div>
        
       </div>
      <van-grid 
      class="nav_grid"
      clickable 
      :column-num="2" 
      :border="false"
      >
       <van-grid-item  
        class="nav_grid_item"
        icon-prefix="toutiao" 
        icon="shoucang" 
        text="收藏" 
        to="#" 
        />
       <van-grid-item  
        class="nav_grid_item"
        icon-prefix="toutiao" 
        icon="lishi" 
        text="历史" 
        url="#" />
      </van-grid>
   
    <van-cell title="消息通知" is-link  class="van_cell_shoucang"/>
      <van-cell title="小智同学" is-link />
    <van-button 
    v-if="user"
    class="quit_btn"
    type="default" 
    size="large"
    @click="QuitClick"
    >退出登录
    </van-button>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import{mapState} from 'vuex';
import{getCurrentUser} from '@/api/user';
// import{deleteItem} from '@/utils/storage.js';
export default {
  data () {
    return {
      UserImformation:{
      }
    }
  },
  methods: {
    QuitClick(){
     Dialog.confirm({
      title: '退出确认',
      message: '退出当前头条账号？'
      }).then(()=>{
        this.$store.commit('setUser',null)
        
      }).catch(()=>{
      })   
    },
    async loadCurrentUser(){
      const {data}=await getCurrentUser()
      this.UserImformation=data.data;
   }
  },
  created() {
    this.loadCurrentUser()
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
  .mine_container{
    background-color: #f5f7f9;
      .mine_info{
        background: url(./banner.png) no-repeat;
        background-size: cover;
        .base_info{
          box-sizing: border-box;
          height: 115px;
          background-color: unset;
          padding-top: 38px;
          padding-bottom: 11px;
          .avatar{
            box-sizing: border-box;
            width: 66px;
            height: 66px;
            border: 1px solid #fff;
            margin-right: 11px;
          }
          .mine_name{
            color: #fff;
            font-size: 15px;
          }
          .update_btn{
            height: 16px;
            // width: 58px;
            font-size: 10px;
            color: #666;
          }
        }
        .data_info{
              height: 65px;
        }
       /deep/ .van-grid-item__content{
            background-color: unset; 
        }
        /deep/ .van-grid-item__content--clickable{
          background-color: #fff;
        }
        // /deep/ .van-grid-item__content{
        //   padding: 0 0 ;
        // }
        .data_info{
          .van-grid-item__content{
            color: #fff;
            .text_wrap{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            } 
              .data_count{
              font-size: 18px;
              }
              .data_name{
              font-size: 11.5px;
              
            }
          }
        }
        
      }
      .nav_grid{ 
          .nav_grid_item{
            height: 70px;
              /deep/ .toutiao{
               font-size: 22px;
              }
              /deep/  .van-grid-item__text{
                color:#333333;
              }
             /deep/ .toutiao-shoucang{
                color: #eb5253;
              }            
             /deep/ .toutiao-lishi{
                color: #ff9d1d;
              }
          }    
        }
      .van_cell_shoucang{
          margin-top: 5px;
        }
      .quit_btn{
        margin-top: 5px;
        color:#d86262;
        font-size: 15px;
        border: unset;
      }
      .not_login{
        height: 180px;
        background: url(./banner.png) no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .header_login_btn{
         .not_avatar{
           height: 66px;
           width: 66px;
        }
        .not_text{
          font-size: 14px;
        }
          }
       
      }
  }
</style>
