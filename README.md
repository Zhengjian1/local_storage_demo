# 项目说明
- 项目线上地址(https://zhengjian1.github.io/)
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
- 用indexdb做本地数据库，手动配置列表做成可视化操作





