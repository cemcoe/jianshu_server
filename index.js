const Koa = require('koa');
const mongoose = require('mongoose')
const app = new Koa();
const routing = require('./routes')
const { connectionStr } = require('./config')


mongoose.connect(connectionStr,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log('MongoDB 连接成功')
  })
mongoose.connection.on('error', console.error)


routing(app)

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
});