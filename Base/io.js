/*
 * @Author: Brightness
 * @Date: 2021-04-01 14:45:05
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-01 14:57:23
 * @Description:io 操作 ，
 */

var fs = require("fs");
/**阻塞 */
let data = fs.readFileSync("./public/test.json"); //返回的是 buffer ，<Buffer 7b 0d 0a 20 20 20 22 6e 61 6d 65 22 3a 22 6e 61 6d 65 22 20 0d 0a 7d>
console.log(data.toString()); //buffer 需要 toString
console.log("阻塞程序执行结束!");

/**非阻塞 */
fs.readFile("./public/test.json", (err, data) => {
  if (err) {
    return console.log(err);
  }

  console.log(data.toString());
});

console.log("非阻塞程序执行结束!");

/**运行结果 */
/* 
 {
    "name":"name"   
 }
 阻塞程序执行结束!  
 非阻塞程序执行结束!
 {
    "name":"name"
 }
 */
