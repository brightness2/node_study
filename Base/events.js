/*
 * @Author: Brightness
 * @Date: 2021-04-01 15:01:15
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-01 17:43:56
 * @Description:events 使用
 */
var events = require("events");

// 创建 eventEmitter 对象,监听器
let eventEmitter = new events.EventEmitter();

// 绑定事件及事件的处理程序
eventEmitter.on("eventName", eventHander);

eventEmitter.emit("eventName");

// 触发事件
function eventHander() {
  console.log("eventName triget!");
}

/**大多数时候 是继承 EventEmitter类*/

class TestEventEmitter extends events.EventEmitter {
  constructor() {
    super();
    this.listenName = "test";
  }

  add(call) {
    this.on(this.listenName, call);
  }

  trigetListeners() {
    let list = this.listeners(this.listenName);
    for (let listener of list) {
      listener();
    }
  }
}

let t = new TestEventEmitter();
t.add(() => {
  console.log("test1");
});
t.add(() => {
  console.log("test2");
});
t.trigetListeners();
