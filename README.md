# jianshu_server
简书服务端

```
// 开发模式
npm run dev
```

线上部署
```
git clone git@github.com:cemcoe/jianshu_server.git
cd jianshu_server
pm2 index.js
```


数据库配置信息存放在 config 文件中，需要修改
格式如下：
```js
// config.js
module.exports = {
  connectionStr: 'mongodb://localhost:27017/jianshu_api',
  secret: 'jianshu_api_cemcoe',
}
```

