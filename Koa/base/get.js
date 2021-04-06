/*
 * @Author: Brightness
 * @Date: 2021-04-06 11:21:13
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 11:24:13
 * @Description:接收get请求参数
 */

const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  console.log(ctx.request.query); // { name: 'a', age: '11' }
  console.log(ctx.request.querystring); //name=a&age=11
  console.log(ctx.query); //{ name: 'a', age: '11' }
  console.log(ctx.querystring); //name=a&age=11
});

app.listen(8888);
console.log("[demo] start-quick is starting at port 8888");
