/*
 * @Author: Brightness
 * @Date: 2021-04-06 11:43:24
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 12:50:00
 * @Description:路由使用
 * 需要安装 koa-router
 */
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
//必须 “/”开头
//多页
const router = new Router();

router
  .get("/", (ctx, next) => {
    //http://localhost:8888/
    ctx.body = "首页";
  })
  .get("/user", (ctx, next) => {
    //http://localhost:8888/user
    ctx.body = "用户中心";
  })
  .post("/login", (ctx, next) => {
    ctx.body = "登录中...";
  });
app.use(router.routes()).use(router.allowedMethods());

//层级
const router2 = new Router({
  prefix: "/main",
});

router2
  .get("/list", (ctx, next) => {
    //http://localhost:8888/main/list
    ctx.body = "列表页";
  })
  .get("/product", (ctx, next) => {
    // http://localhost:8888/main/product
    ctx.body = "产品详情";
  });
app.use(router2.routes()).use(router2.allowedMethods());

app.listen(8888);
console.log("[demo] start-quick is starting at port 8888");
