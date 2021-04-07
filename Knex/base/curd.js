/*
 * @Author: Brightness
 * @Date: 2021-04-07 10:09:23
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-07 11:53:57
 * @Description:knex CURD 操作
 */
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "test",
  },
});
let sql = "";
/**  查询*/
//方式一
sql = knex.column(["*"]).select().from("demo").where("id", 1).toString();
console.log(sql); //select * from `demo` where `id` = 1

//方式二
sql = knex.column(["*"]).select().from("demo").where("id", ">", 1).toString();
console.log(sql); //select * from `demo` where `id` > 1

//方式三 对象做条件
sql = knex
  .column(["*"])
  .select()
  .from("demo")
  .where({
    id: 1,
    name: "Brightness",
  })
  .toString();
console.log(sql); //select * from `demo` where `id` = 1 and `name` = 'Brightness'

//方式四 回调，构建复杂查询
sql = knex
  .column(["*"])
  .select()
  .from("demo")
  .where((builder) => {
    builder.where("id", 1).andWhere("name", "Brightness");
  })
  .toString();
console.log(sql); //select * from `demo` where (`id` = 1 and `name` = 'Brightness')

//方式五，链式
sql = knex
  .column(["*"])
  .select()
  .from("demo")
  .where((builder) => {
    builder.where("id", 1).andWhere("name", "Brightness");
  })
  .orWhere({ name: "test" })
  .toString();
console.log(sql); //select * from `demo` where (`id` = 1 and `name` = 'Brightness') or (`name` = 'test')
/**插入 */
//插入一条
sql = knex("demo").insert({ name: "demo2", age: 18 }).toString();
console.log(sql); //insert into `demo` (`age`, `name`) values (18, 'demo2')
//批量插入
// let rows = [
//   { name: "demo9", age: 31 },
//   { name: "demo10", age: 24 },
// ];
// knex
//   .batchInsert("demo", rows)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
//结合事务
// knex
//   .transaction((tr) => {
//     return knex.batchInsert("demo", rows).transacting(tr);
//   })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

/**更新 */
sql = knex("demo")
  .where("id", 1)
  .update({
    age: 33,
  })
  .toString();
console.log(sql); //update `demo` set `age` = 33 where `id` = 1

/**删除 */
sql = knex("demo").where("id", 2).del().toString();
console.log(sql); //delete from `demo` where `id` = 2
