/*
 * @Author: Brightness
 * @Date: 2021-04-07 15:34:10
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-09 12:46:05
 * @Description:ZDbobj demo
 */

const ZDbobj = require("./ZDbobj");
class T extends ZDbobj {
  constructor(tableName) {
    super(tableName);
  }

  /**
   * 添加查询条件
   *
   * @param {*} [params=[]]
   * @memberof T
   */
  addParams(params = []) {
    this._filterParams(params);
    if (params["id"]) {
      this._where("id", ">", params["id"]);
    }
  }
}

let obj = new T("demo");

//插入一条数据
// obj.insert({ name: "test1", age: 10 }).then((id) => {
//   console.log("insert", id);
// });

//批量插入
// obj
//   .batchInsert([
//     { name: "demo2", age: 11 },
//     { name: "demo3", age: 12 },
//   ])
//   .then(() => {
//     console.log("插入成功");
//   });

//修改
// obj.update(56, { age: 20 }).then((res) => {
//   if (res) {
//     console.log("修改成功");
//   } else {
//     console.log("修改失败");//修改失败 0
//   }
// });

//根据条件修改
// obj._where("name", "demo2");
// obj.updateByParams({ age: 19 }).then((res) => {
//   if (res) {
//     console.log("修改成功", res);
//   } else {
//     console.log("修改失败", res);//修改失败 0
//   }
// });

//删除
// obj.delete(54).then((res) => {
//   if (res) {
//     console.log("删除成功", res);
//   } else {
//     console.log("删除失败", res);删除失败 0
//   }
// });

//根据条件删除数据
// obj._where("age", "=", 19);
// obj.deleteByParams().then((res) => {
//   if (res) {
//     console.log("删除成功", res);
//   } else {
//     console.log("删除失败", res);//删除失败 0
//   }
// });

//根据主键获取一条数据
obj.get(55).then((row) => {
  if (row) {
    console.log("查询成功", row);
  } else {
    console.log("没有数据", row); //没有数据 undefined
  }
});

//根据条件获取一条数据
obj._where("age", 20);
obj.getByParams().then((row) => {
  if (row) {
    console.log("查询成功", row);
  } else {
    console.log("没有数据", row); //没有数据 undefined
  }
});

//查询多条数据
obj._where("age", 21);
obj.setQuery().then((rows) => {
  if (rows.length == 0) {
    console.log("没有数据", rows);
  } else {
    console.log("查询成功", rows); //没有数据 []
  }
});

//count
obj._where("age", 20);
obj.count("id", "countId").then((num) => {
  console.log("数量", num); // TextRow { countId: 2 }
});

//min
obj._where("name", "demo3");
obj.min("age").then((val) => {
  console.log(val); // TextRow { 'min(`age`)': 18 }
});

//max
obj._where("name", "demo3");
obj.max("age as a").then((val) => {
  console.log(val); //TextRow { a: 18 }
});

//sum
obj._where("id", ">", 56);
obj.sum("age as a").then((val) => {
  console.log(val); //TextRow { a: '40' }
});

//avg
obj._where("id", ">", 56);
obj.avg("age as a").then((val) => {
  console.log(val); //TextRow { a: '20.0000' }
});

//left join
obj._where("demo.id", 56);
obj._leftJoin("test", "demo.id", "test.did");
obj.setQuery(["demo.*", "test.ddesc"]).then((rows) => {
  console.log(rows);
});
