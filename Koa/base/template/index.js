/*
 * @Author: Brightness
 * @Date: 2021-04-06 14:08:40
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 14:37:25
 * @Description: 模板的使用，ejs引擎
 */
const Koa = require("koa");
const views = require("koa-views");
const path = require("path");

const app = new Koa();

app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);

app.use(async (ctx) => {
  let title = "hello koa2";
  await ctx.render("index", { title });
});

app.listen(8888);
console.log("[demo] start-quick is starting at port 8888");
