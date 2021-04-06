/*
 * @Author: Brightness
 * @Date: 2021-04-02 15:50:42
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-02 16:36:26
 * @Description:把一个对象封装到模块中
 */
function Test() {
  let name = "test";
  this.say = () => {
    console.log(name);
  };
}

module.exports = Test;
