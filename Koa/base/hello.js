/*
 * @Author: Brightness
 * @Date: 2021-04-06 11:17:37
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 11:19:10
 * @Description:
 */
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(8888);
console.log("[demo] start-quick is starting at port 8888");
