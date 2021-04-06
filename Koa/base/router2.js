/*
 * @Author: Brightness
 * @Date: 2021-04-06 12:41:37
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 12:58:23
 * @Description:多层级路由
 */
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();

const childrenRouter = new Router();

childrenRouter
  .get("/main", (ctx, next) => {
    //http://localhost:8888/home/main
    ctx.body = "主页";
  })
  .get("/user", (ctx, next) => {
    //http://localhost:8888/home/user
    ctx.body = "用户中心";
  });

const childrenRouter2 = new Router();

childrenRouter2
  .get("/list", (ctx, next) => {
    //http://localhost:8888/page/list
    ctx.body = "列表页";
  })
  .get("/todo", (ctx, next) => {
    //http://localhost:8888/page/todo
    ctx.body = "todo";
  });

const mainRouter = new Router();

mainRouter.get("/", (ctx, next) => {
  ctx.body = "首页";
});

//装载子路由
mainRouter.use(
  "/home",
  childrenRouter.routes(),
  childrenRouter.allowedMethods()
);
mainRouter.use(
  "/page",
  childrenRouter2.routes(),
  childrenRouter2.allowedMethods()
);

//app使用路由
app.use(mainRouter.routes()).use(mainRouter.allowedMethods());

app.listen(8888);
console.log("[demo] start-quick is starting at port 8888");
