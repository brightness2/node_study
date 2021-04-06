/*
 * @Author: Brightness
 * @Date: 2021-04-06 14:48:05
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 14:59:17
 * @Description:静态资源的加载，css、js、img
 */
const Koa = require("koa");
const path = require("path");
const koaStatic = require("koa-static");

const app = new Koa();

const staticPath = "./image";

app.use(koaStatic(path.join(__dirname, staticPath)));
let html = `
静态资源的引用，访问路径：
http://localhost:8888/test.jpg
`;
app.use(async (ctx) => {
  ctx.body = html;
});

app.listen(8888);
console.log("[demo] start-quick is starting at port 8888");
