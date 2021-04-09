/*
 * @Author: Brightness
 * @Date: 2021-04-07 09:28:03
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-07 15:38:39
 * @Description:初始化连接
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

//测试
knex
  .raw("select 1+1 as result")
  .then((res) => {
    console.log(res[0][0].result);
  })
  .catch((err) => {
    console.error(err);
  });
