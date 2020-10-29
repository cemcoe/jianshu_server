# jianshu_server
简书服务端

[接口文档](./api/Index.md)

```
// 开发模式
npm run dev
```

线上部署
注意创建上传文件存储文件夹，否则可能导致[405错误](https://github.com/cemcoe/jianshu_server/issues/1)

```
git clone git@github.com:cemcoe/jianshu_server.git
cd jianshu_server
npm i
mkdir public/uploads
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

