# 项目说明
- 使用create-react-app起步
- node版本v12.18.4
- 入口根目录src/index

## 项目起步
- npm i 
- npm start
- 项目启动页面在localhost:3000
- 在启动页面最右边的localStorage操做去测试


## 功能

功能 | 描述
--|:--:
localStorage操作走配置检查 | localStorage的设置，获取，删除，清空，先走自定义的配置检查，检查不过，抛错，兼容window.localStorage这种直接写法|
增加npm run start:analyzer命令|webpack打包的大小分析|



## localStorage操作先走配置检查的具体配置
1、 npm i zj_local_storage

  - zj_local_storage这个包封装了localStorage操作
  - 每步操作都走传入的配置表检查

2、 项目根目录的src目录下新建constants文件，配置传入检查列表，参考本项目根目录src/constants的配置

3、使用

- 引包 import zj_local_storage from "zj_local_storage";
- zj_local_storage相当于window.localStorage,暴露的方法请参考zj_local_storage的README.md，使用demo可以参考本项目src/components/action/四个方法

4、兼容后来人或者咱们现有项目直接用window.localStorage设置的，案例(demo可以参考src/components/action/get/index，直接用window.localStorage.getItem),实现需要webpack如下配置

- webpack配置loader：string-replace-loader，用于把替换字符串，如window.localStorage.setItem替换成zj_local_storage.set
- webpack配置pulgins:增加
  ```
  new webpack.ProvidePlugin({
    zj_local_storage: 'zj_local_storage'    
  })
  ```
  用于打包输出文件前字符串替换后的引包，这两个具体配置在根目录config/customConfig里

## 问题
- 单页面监控storage事件不生效，demo咱没处理，用window.reload页面刷新
- 用window.reload刷新页面，会导致操作localStorage设置和移除成功不提示

## todo
- zj_local_storage这个包，下一步要加上webpack打包，把源码转成es5，压缩代码...
- 配置表只能手动去代码里配置，如果需要可以用node加个存储接口




