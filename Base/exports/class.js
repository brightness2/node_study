/*
 * @Author: Brightness
 * @Date: 2021-04-02 16:39:59
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-02 16:48:30
 * @Description:class 模块
 */
class A {
  constructor() {
    this.name = "name";
  }
  getName() {
    console.log(this.name);
  }
}

class B {
  constructor() {
    this.name = "Bname";
  }
  getName() {
    console.log(this.name);
  }
}
module.exports = { A, B };
