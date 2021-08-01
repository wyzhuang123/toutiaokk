import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//ui组件库
import Vant from 'vant';
import 'vant/lib/index.css';
//全局样式文件放在vant样式的后面，覆盖第三方样式，则不用加！imporatant
import './styles/index.less'
//自动设置rem基准值，html标签字体大小
import 'amfe-flexible';
//时间处理
import dayjs from '@/utils/dayjs.js'
Vue.use(Vant);
new Vue({
  router,
  store,
  dayjs,
  render: h => h(App)
}).$mount('#app')
