module.exports = {
  plugins: {
    // 自动添加浏览器相关的声明前缀
    // 'autoprefixer':{
    //   browsers:['Android>=4.0','iOS>=8']
    // },
    //可以将px转换为rem
    'postcss-pxtorem': {
      /*
       根据设计稿在定义rootValue，
      如果移动端设计稿定义是750宽，那就得设置rootValue为750/10=75
      */
      rootValue: 37.5,
      //所有元素都转换
      propList: ['*'],
    },
  },
};