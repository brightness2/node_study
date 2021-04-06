/*
 * @Author: Brightness
 * @Date: 2021-04-02 15:47:25
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-02 16:49:05
 * @Description:模块导入
 */
const hello = require("./hello");
hello.world();
const Test = require("./object");
let obj = new Test();
obj.say();

const { A, B } = require("./class");
let a = new A();
a.getName();

let b = new B();
b.getName();
