const Koa = require('koa');
const mongoose = require('mongoose')
const parameter = require('koa-parameter')
// 静态服务
const koaStatic = require('koa-static')
// 参数校验
const koaBody = require('koa-body');
// 获取post请求的body
const path = require('path')
const app = new Koa();
const routing = require('./routes')
const { connectionStr } = require('./config')

// 跨域问题
app.use(async (ctx, next) => {
  // log request URL:
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
  ctx.set("Access-Control-Max-Age", "3600");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with,Authorization,Content-Type,Accept");
  ctx.set("Access-Control-Allow-Credentials", "true");
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200
  }
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  try {
    await next();
    console.log('handler通过')
  } catch (err) {
    console.log('handler处理错误')
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
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

app.use(koaStatic(path.join(__dirname, 'public')))


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