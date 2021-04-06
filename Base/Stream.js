/*
 * @Author: Brightness
 * @Date: 2021-04-02 15:10:24
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 09:00:46
 * @Description:Stream 
 * Stream 是一个抽象接口，Node 中有很多对象实现了这个接口
 * Stream 有四种流类型：

    Readable - 可读操作。

    Writable - 可写操作。

    Duplex - 可读可写操作.

    Transform - 操作被写入数据，然后读出结果。


 *  所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

    data - 当有数据可读时触发。

    end - 没有更多的数据可读时触发。

    error - 在接收和写入过程中发生错误时触发。

    finish - 所有数据已被写入到底层系统时触发。
 */

const fs = require("fs");
let readFile = "./public/test.json";
let writeFile = "./public/output.json";
let data = "";

let readerStream = fs.createReadStream(readFile);

readerStream.setEncoding("utf-8");

readerStream.on("data", (chunk) => {
  data += chunk;
});

readerStream.on("end", () => {
  console.log(data);
});

readerStream.on("error", (err) => {
  console.log(err.stack);
});

console.log("读程序执行完毕");

let writerStream = fs.createWriteStream(readFile);

writerStream.write(JSON.stringify({ age: "age" }), "utf-8"); //覆盖写入

writerStream.end();

writerStream.on("finish", () => {
  console.log("写入完成");
});

writerStream.on("error", (err) => {
  console.log(err.stack);
});

console.log("写程序执行完毕");

//管道流

let reader = fs.createReadStream(readFile);
console.log(fs.existsSync(writeFile));
if (!fs.existsSync(writeFile)) {
  fs.open(writeFile, "w+", (err, fd) => {
    if (err) {
      console.error(err);
    }
    console.log("文件创建完成");
  });
}

let writer = fs.createWriteStream(writeFile);

reader.pipe(writer); //输出的文件不存在时必须先用 fs 创建，否则无法写入内容，只创建空文件

console.log("管道读写操作");
