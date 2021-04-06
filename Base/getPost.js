/*
 * @Author: Brightness
 * @Date: 2021-04-06 09:10:11
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 10:01:48
 * @Description:获取url 参数
 */
const http = require("http");
const url = require("url");
const querystring = require("querystring");

var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  "<body>" +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  "</form>" +
  "</body></html>";

http
  .createServer(function (req, res) {
    var body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });
    req.on("end", function () {
      // 解析参数,post 参数
      body = querystring.parse(body);
      // 设置响应头部信息及编码
      res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });

      if (body.name && body.url) {
        // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
      } else {
        //接收get 参数
        let params = url.parse(req.url).query;
        console.log(params); //name=jj&age=11
        let params2 = url.parse(req.url, true).query;
        console.log(params2); // { name: 'jj', age: '11' }
        // 输出表单
        res.write(postHTML);
      }
      res.end();
    });
  })
  .listen(8888);
