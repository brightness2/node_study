/*
 * @Author: Brightness
 * @Date: 2021-04-02 16:53:35
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 08:39:18
 * @Description:服务启动
 */

const http = require("http");
// const url = require("url");
// let pathname = url.parse(request.url).pathname;
// console.log(pathname);//jj
// url.parse 将废弃，用 WHATWG 接口  URL
const baseUrl = "http://localhost:8888";
function start(route) {
  function onRequest(request, response) {
    // console.log(request.url); // jj
    let link = new URL(request.url, baseUrl);
    let pathname = link.pathname;
    console.log(`request for ${pathname} received.`);

    route(pathname);

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World!");
    response.end();
  }

  let server = http.createServer(onRequest).listen(8888);

  server.on("request", function (req, res) {
    //去掉/favicon.ico请求
    if (req.url !== "/favicon.ico") {
      res.end();
    }
  });
  console.log("Server has started.");
}

exports.start = start;
