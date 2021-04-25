/*
 * @Author: Brightness
 * @Date: 2021-04-25 10:33:43
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-25 11:12:44
 * @Description:事务操作
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

let Model = bookshelf.model("modle", {
  tableName: "user_info",
});
let Model2 = bookshelf.model("model2", {
  tableName: "user",
});
bookshelf
  .transaction((t) => {
    return new Model2().save({ id: 7 }, { transaction: t }).then((rs) => {
      //不用显示调用   t.commit()  或  t.rollback(),因为如果事务块内没有错误，整个事务将被提交。
      new Model().save({ photo: rs.id }, { transaction: t });
    });
  })
  .then((model) => {
    console.log("success");
  })
  .catch((err) => {
    console.log("error");
  });
