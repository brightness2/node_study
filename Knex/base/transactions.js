/*
 * @Author: Brightness
 * @Date: 2021-04-07 14:53:27
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-09 10:13:43
 * @Description:事务操作
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

// knex
//   .transaction(function (trx) {
//     knex("demo")
//       .transacting(trx)
//       .insert({ age: 1 })
//       .then((res) => {
//         let id = res[0];
//       })
//       .then(trx.commit)
//       .catch(trx.rollback);
//   })
//   .then((res) => {
//     console.log("Transaction complete");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

function test() {
  const trx = await knex.transaction();

  const books = [
    {title: 'Canterbury Tales'},
    {title: 'Moby Dick'},
    {title: 'Hamlet'}
  ];
  
  trx('catalogues')
    .insert({name: 'Old Books'}, 'id')
    .then(function(ids) {
      books.forEach((book) => book.catalogue_id = ids[0]);
      return trx('books').insert(books);
    })
    .then(trx.commit)
    .catch(trx.rollback);
}
test();
