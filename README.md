# jianshu_server
简书服务端

```
// 开发模式
npm run dev
```


数据库配置信息存放在 config 文件中，需要修改
格式如下：
```js
// config.js
module.exports = {
  connectionStr: 'mongodb://localhost:27017/jianshu_api',
  
}
```

