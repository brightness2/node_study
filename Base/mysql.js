/*
 * @Author: Brightness
 * @Date: 2021-04-06 10:07:17
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-06 10:11:53
 * @Description:连接数据库
 */
//1、npm install mysql
//2、
const mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});
connection.connect();
//测试连接
connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution); //The solution is:  2
});
