/*
 * @Author: Brightness
 * @Date: 2021-04-07 13:36:30
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-07 14:51:42
 * @Description:复杂查询
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
//链式
sql = knex
  .column(["*"])
  .from("demo")
  .where("id", 1)
  .where("name", "test")
  .toString();
console.log(sql); //select * from `demo` where `id` = 1 and `name` = 'test'

/**whereNot */
sql = knex
  .column(["*"])
  .from("demo")
  .where("id", 1)
  .whereNot("id", 2)
  .toString();
console.log(sql); //select * from `demo` where `id` = 1 and not `id` = 2

/**whereIn */
sql = knex
  .column(["*"])
  .from("demo")
  .whereIn("id", [1, 3])
  .orWhereIn("id", [6, 8])
  .toString();
console.log(sql); //select * from `demo` where `id` = 1 and not `id` = 2

/**whereNotIn */
sql = knex
  .column(["*"])
  .from("demo")
  .whereNotIn("id", [1, 3])
  .whereNotIn("id", [4, 6])
  .toString();
console.log(sql); //select * from `demo` where `id` not in (1, 3) and `id` not in (4, 6)

/**whereNull */
sql = knex.column(["*"]).from("demo").whereNull("name").toString();
console.log(sql); //select * from `demo` where `name` is null

/**whereNotNull */
sql = knex.column(["*"]).from("demo").whereNotNull("name").toString();
console.log(sql); //select * from `demo` where `name` is not null

/**whereExists */
sql = knex
  .column(["*"])
  .from("demo")
  .whereExists(function () {
    this.select("*").from("demo2").whereRaw("demo2.id = demo2.id");
  })
  .toString();
console.log(sql); //select * from `demo` where exists (select * from `demo2` where demo2.id = demo2.id)

/**whereNotExists */
sql = knex
  .column(["*"])
  .from("demo")
  .whereNotExists(function () {
    this.select("*").from("demo2").whereRaw("demo2.id = demo2.id");
  })
  .toString();
console.log(sql); //select * from `demo` where not exists (select * from `demo2` where demo2.id = demo2.id)

/**join */
sql = knex
  .column(["demo.*", "test.ddesc"])
  .from("demo")
  .join("test", "demo.id", "=", "test.did")
  .toString();
console.log(sql); //select `demo`.*, `test`.`ddesc` from `demo` inner join `test` on `demo`.`id` = `test`.`did`

/**leftJoin */
sql = knex
  .column(["demo.*", "test.ddesc"])
  .from("demo")
  .leftJoin("test", "demo.id", "=", "test.did")
  .toString();
console.log(sql); //select `demo`.*, `test`.`ddesc` from `demo` left join `test` on `demo`.`id` = `test`.`did`

/**onIn */
sql = knex
  .column(["demo.*", "test.ddesc"])
  .from("demo")
  .leftJoin("test", function () {
    this.on("demo.id", "=", "test.did").onIn("test.ddesc", ["3", "fdsaa"]);
  })
  .toString();
console.log(sql); //select `demo`.*, `test`.`ddesc` from `demo` left join `test` on `demo`.`id` = `test`.`did` and `test`.`ddesc` in ('3', 'fdsaa')

/**orderBy */
sql = knex.column(["*"]).from("demo").orderBy("id", "desc").toString();
console.log(sql); //select * from `demo` order by `id` desc

sql = knex
  .column(["*"])
  .from("demo")
  .orderBy(["name", { column: "age", order: "desc" }])
  .toString();
console.log(sql); //select * from `demo` order by `name` asc, `age` desc

/**groupBy */
sql = knex.column(["*"]).from("demo").groupBy("age").toString();
console.log(sql); //select * from `demo` group by `age`

/**having */
sql = knex
  .column(["*"])
  .from("demo")
  .groupBy("age")
  .orderBy("name", "desc")
  .having("age", ">", 25)
  .toString();
console.log(sql); //select * from `demo` group by `age` having `age` > 25 order by `name` desc

/**count */
sql = knex.count("id", { as: "count_id" }).from("demo").toString();
console.log(sql); //select count(`id`) as `count_id` from `demo`
