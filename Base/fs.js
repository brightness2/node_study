/*
 * @Author: Brightness
 * @Date: 2021-04-06 08:45:55
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 08:50:19
 * @Description:fs模块使用
 */
const fs = require("fs");

/**异步读取 不会阻塞*/
fs.readFile("./public/test.json", (err, data) => {
  if (err) {
    return console.error(err);
  }
  console.log("异步读取" + data.toString());
});

/**同步读取 会阻塞*/
let data = fs.readFileSync("./public/test.json");
console.log("同步读取" + data.toString());

console.log("程序执行完毕。");
