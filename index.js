const Koa = require('koa');
const mongoose = require('mongoose')
const parameter = require('koa-parameter')
// 参数校验
const koaBody = require('koa-body');
// 获取post请求的body
const path = require('path')
const app = new Koa();
const routing = require('./routes')
const { connectionStr } = require('./config')

// 跨域问题
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set('Access-Control-Allow-Methods', '*');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});


mongoose.connect(connectionStr,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log('MongoDB 连接成功')
  })
mongoose.connection.on('error', console.error)


// 放在router前面
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    // 上传目录
    keepExtensions: true,
  }
}));


app.use(parameter(app))
routing(app)

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
});