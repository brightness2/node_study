/*
 * @Author: Brightness
 * @Date: 2021-04-22 11:52:40
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-22 14:03:50
 * @Description:
 */
const Koa = require("koa");
var app = require("xtpl/lib/koa2")(new Koa(), {
  views: "./views",
});
app.use(async function (ctx) {
  await ctx.render("test", { user: { username: "Brightness", arr: [1, 2] } });
});

app.listen(8888);
