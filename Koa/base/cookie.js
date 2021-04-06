/*
 * @Author: Brightness
 * @Date: 2021-04-06 13:44:05
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 14:00:20
 * @Description:cookie的使用
 */
const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.url === "/index") {
    ctx.cookies.set("name", "Brightness", {
      //   domain: "127.0.0.1:8888", // 写cookie所在的域名
      //   path: "/", // 写cookie所在的路径
      //   maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
      //   expires: new Date("2021-4-6"), // cookie失效时间
      //   httpOnly: false, // 是否只用于http请求中获取
      //   overwrite: false, // 是否允许重写
    });
    ctx.body = "cookie is setted";
  } else {
    let cookie = ctx.cookies.get("name");
    ctx.body = `cookie is ${cookie}`;
  }
});

app.listen(8888, () => {
  console.log("server is starting at port 8888");
});
