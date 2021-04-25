/*
 * @Author: Brightness
 * @Date: 2021-04-24 15:43:01
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-24 16:53:00
 * @Description:bookshelf 基础使用
 */

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "demo",
    charset: "utf8",
  },
});
const bookshelf = require("bookshelf")(knex);

//声明model
const Model = bookshelf.model(
  "User", //model 标识
  {
    tableName: "user", //表名
    hidden: ["password"], //查询时隐藏的字段，即不会查询的字段
    defaults: { memo: "无备注" }, //字段默认值，新增，更新时写入默认值
  }
);

let modelObj = new Model();

/**
 * 增加
 */
//方法一
// Model.forge({ name: "test1" })
//   .save()
//   .then((rs) => {
//     console.log(rs.toJSON());
//     //{ name: 'test1', memo: '无备注', id: 4, locked: 0 }
//   });

//方法二 推荐
// modelObj.save({ name: "test2", password: "00000" }).then((rs) => {
//   console.log(rs.toJSON());
//   //{ name: 'test2', memo: '无备注', id: 5, locked: 0 }
//    console.log(rs.id);//5
// });

/**
 * 更新
 */
//方法一
// Model.forge({ id: 4 })
//   .save({ password: "77777" })
//   .then((rs) => {
//     console.log(rs.toJSON());
//     //{ id: 4, name: 'test1', locked: 0, memo: '无备注' }
//   });

//方法二 推荐
// modelObj
//   .where("name", "test2")
//   .save({ name: "demo1" }, { patch: true })
//   .then((rs) => {
//     console.log(rs.toJSON());
//     //{ name: 'demo1', id: 5, locked: 0, memo: '无备注' }
//   });

/**
 * 删除
 */
// modelObj
//   .where("name", "test2")
//   .destroy()
//   .then((rs) => {
//     console.log(rs.toJSON()); //{}
//   });

/**
 * 简单查询
 */
//方法一
// Model.where("id", ">", 2)
//   .fetchAll()
//   .then((rs) => {
//     console.log(rs.toJSON());
//     //[
//     //   { id: 4, name: 'test1', locked: 0, memo: '无备注' },
//     //   { id: 5, name: 'demo1', locked: 0, memo: '无备注' }
//     // ]
//   });
//方法二
// modelObj
//   .where("id", ">", 2)
//   .fetchAll()
//   .then((rs) => {
//     console.log(rs.toJSON());
//     // [
//     //     { id: 4, name: 'test1', locked: 0, memo: '无备注' },
//     //     { id: 5, name: 'demo1', locked: 0, memo: '无备注' }
//     //   ]
//   });

/**
 * 判断是不是新数据
 */
// let bool = modelObj.isNew();
// console.log(bool); //true
