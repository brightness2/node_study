/*
 * @Author: Brightness
 * @Date: 2021-04-06 11:24:41
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 11:42:08
 * @Description:接收post 参数
 * 需要安装 koa-bodyparser
 */
const Koa = require("koa");
const app = new Koa();
const bodyparser = require("koa-bodyparser");

app.use(bodyparser());

app.use(async (ctx) => {
  if (ctx.url === "/" && ctx.method === "GET") {
    //显示表单页面
    let html = `
            <h1> Koa2 request POST</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /><br/>
                <button type="submit">submit</button>
            </form>
        `;
    ctx.body = html;
  } else if (ctx.url === "/" && ctx.method === "POST") {
    let postData = ctx.request.body;
    console.log(postData);

    ctx.body = JSON.stringify(postData);
  } else {
    ctx.body = "<h1>404</h1>";
  }
});

app.listen(8888, () => {
  console.log("[demo] start-quick is starting at port 8888");
});
