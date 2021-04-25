/*
 * @Author: Brightness
 * @Date: 2021-04-24 16:53:16
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-25 10:32:19
 * @Description: boolshelf 的复杂查询
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

//用户表
const UserModel = bookshelf.model(
  "User", //model 标识
  {
    tableName: "user", //表名
    hidden: ["password"], //查询时隐藏的字段，即不会查询的字段
    defaults: { memo: "无备注" }, //字段默认值，新增，更新时写入默认值
  }
);

let debug = { debug: true };

/**
 * 查询一条
 *
 */
//开启调试
// new UserModel().fetch({ debug: true }).then((rs) => {
//   //   console.log(rs.toJSON());
//   //{ id: 1, name: 'Brightness', locked: 0, memo: null }
//   //   console.log(rs.get("name"));//Brightness
// });

//sql: 'select `user`.* from `user` where `id` = ? and `locked` = ? limit ?'
new UserModel()
  .where("id", 1)
  .where("locked", 0)
  .fetch()
  .then((rs) => {
    // console.log(rs.toJSON());
    //{ id: 1, name: 'Brightness', locked: 0, memo: null }
  });

// sql: 'select `user`.* from `user` where `id` = ? or `name` = ? limit ?'
new UserModel()
  .query((k) => {
    k.where("id", 1).orWhere("name", "Brightness"); //具体参考knex 官网
  })
  .fetch()
  .then((rs) => {
    // console.log(rs.toJSON());
    // { id: 1, name: 'Brightness', locked: 0, memo: null }
  });

/**
 * 查询多条
 */
//sql: 'select `user`.* from `user` where `id` = ? or `id` > ?'
new UserModel()
  .query((k) => {
    k.where("id", 0).orWhere("id", ">", 2);
  })
  .fetchAll()
  .then((rs) => {
    // console.log(rs.toJSON());
    // [
    //     { id: 4, name: 'test1', locked: 0, memo: '无备注' },
    //     { id: 5, name: 'demo1', locked: 0, memo: '无备注' }
    //   ]
  });

//分页查询
new UserModel()
  //   .orderBy("id", "desc")
  .fetchPage({
    pageSize: 2,
    page: 2,
  })
  .then((rs) => {
    // console.log(rs.toJSON());
    // [
    //     { id: 4, name: 'test1', locked: 0, memo: '无备注' },
    //     { id: 5, name: 'demo1', locked: 0, memo: '无备注' }
    //   ]
  });

//排序
//  sql: 'select `user`.* from `user` order by `user`.`id` desc'
new UserModel()
  .orderBy("id", "desc")
  .fetchAll()
  .then((rs) => {
    // console.log(rs.toJSON());
    // [
    //     { id: 5, name: 'demo1', locked: 0, memo: '无备注' },
    //     { id: 4, name: 'test1', locked: 0, memo: '无备注' },
    //     { id: 2, name: 'test', locked: 0, memo: null },
    //     { id: 1, name: 'Brightness', locked: 0, memo: null }
    //   ]
  });

//分组
// sql: 'select `user`.* from `user` group by `memo`'
new UserModel()
  .query((k) => {
    k.groupBy("memo");
  })
  .fetchAll()
  .then((rs) => {
    // console.log(rs.toJSON());
    // [
    //   { id: 1, name: "Brightness", locked: 0, memo: null },
    //   { id: 4, name: "test1", locked: 0, memo: "无备注" },
    // ];
  });

//分页 排序 分组 推荐使用以下方式
// sql: 'select `user`.* from `user` order by `id` desc limit ? offset ?'
new UserModel()
  .query((k) => {
    k.orderBy("id", "desc");
    // .groupBy('memo')
    //   .having('id','>',2)
  })
  .fetchPage({
    pageSize: 2,
    page: 2,
  })
  .then((rs) => {
    // console.log(rs.toJSON());
    // [
    //     { id: 2, name: 'test', locked: 0, memo: null },
    //     { id: 1, name: 'Brightness', locked: 0, memo: null }
    //   ]
  });

/**left join
 *
 */

//sql: 'select `user`.* from `user` left join `user_role` on `user_role`.`user_id` = `user`.`id`'
new UserModel()
  .query((k) => {
    k.leftJoin("user_role", "user_role.user_id", "user.id");
  })
  .fetchAll({
    columns: ["user.*", "user_role.role_id"],
  })
  .then((rs) => {
    // console.log(rs.toJSON());
    // [
    //     { id: 1, name: 'Brightness', locked: 0, memo: null, role_id: 4 },
    //     { id: 2, name: 'test', locked: 0, memo: null, role_id: 4 },
    //     { id: 4, name: 'test1', locked: 0, memo: '无备注', role_id: null },
    //     { id: 5, name: 'demo1', locked: 0, memo: '无备注', role_id: null }
    //   ]
  });

//执行原始SQL语句，推荐
knex.raw("select 1+1 as result").then((rs) => {
  //   console.log(rs[0][0].result);//2
});

/**
 * 一对一
 */
// user 表 -> user_info 表 ,一个user 对应一个user_info，user表有一个user_info_id 的外键
const UserModel2 = bookshelf.model(
  "User2", //model 标识
  {
    tableName: "user", //表名
    userInfo: function () {
      return this.belongsTo(UserInfoModel, "user_info_id", "id");
      //当前表有另一个表的外键,使用belongsTo
      //user_info_id:(user.user_info_id) 当前表外键,user.user_info_id
      //id :(user_info.id) 另一个表对应的字段,user.user_info_id = user_info.id
    },
  }
);
const UserInfoModel = bookshelf.model(
  "UserInfo", //model 标识
  {
    tableName: "user_info", //表名
    user: function () {
      //select distinct `user`.* from `user` where `user`.`user_info_id` in (?)
      return this.hasOne(UserModel2, "user_info_id", "id");
      //另一个表有当前表的外键,使用hasOne
      //user_info_id:(user.user_info_id) 另一个表的外键 user.user_info_id
      //id:(user_info.id) 当前表与外键user_info_id对应 user_info.id = user.user_info_id
    },
  }
);

new UserModel2()
  .fetch({
    withRelated: ["userInfo"],
  })
  .then((rs) => {
    // console.log(rs.toJSON());
    // {
    //     id: 1,
    //     name: 'Brightness',
    //     password: '122333',
    //     locked: 0,
    //     memo: null,
    //     user_info_id: 1,
    //     userInfo: { id: 1, photo: 'a' }
    //   }
  });

new UserInfoModel()
  .fetch({
    withRelated: ["user"],
  })
  .then((rs) => {
    // console.log(rs.toJSON());
    // {
    //     id: 1,
    //     photo: 'a',
    //     user: {
    //       id: 1,
    //       name: 'Brightness',
    //       password: '122333',
    //       locked: 0,
    //       memo: null,
    //       user_info_id: 1
    //     }
    //   }
  });

/**
 * 一对多
 */
// role 表 -> role_permission 表,一个 role 对应多个role_permission,role_permission 有一个role_id 外键
const RoleModel = bookshelf.model(
  "Role", //model 标识
  {
    tableName: "role", //表名
    rolePermission: function () {
      return this.hasMany(RolePermissionModel, "role_id", "id").query((k) => {
        // sql: 'select `role_permission`.*, `permission`.`action` from `role_permission` left join `permission` on `role_permission`.`permission_id` = `permission`.`id` where `role_permission`.`role_id` in (?)'
        k.columns(["role_permission.*", "permission.action"]).leftJoin(
          "permission",
          "role_permission.permission_id",
          "permission.id"
        );
      });
      //还可以补充查询条件
      //例如  where `permission_id` > ?
      // sql: 'select distinct `role_permission`.* from `role_permission` where `permission_id` > ? and `role_permission`.`role_id` in (?)'
      //   .query((k) => {
      //     k.where("permission_id", ">", 5);
      //   });
      //role_id:(role_permission.role_id) 另一个表的外键 role_permission.role_id
      //id:(role.id) 当前表与外键role_id对应 role.id = role_permission.role_id
    },
  }
);

const RolePermissionModel = bookshelf.model("RolePermission", {
  tableName: "role_permission",
});

new RoleModel()
  .fetch({
    debug: true,
    withRelated: ["rolePermission"],
  })
  .then((rs) => {
    // console.log(rs.toJSON());
    // {
    //     id: 3,
    //     name: '管理员',
    //     rolePermission: [
    //       { id: 1, role_id: 3, permission_id: 5, action: 'rbac/testRbac' },
    //       { id: 3, role_id: 3, permission_id: 6, action: 'rbac/guestRbac' }
    //     ]
    //   }
  });

/**
 * 多对多
 */
// const Account = bookshelf.model("Account", {
//   tableName: "accounts",
// });

// const User = bookshelf.model("User", {
//   tableName: "users",
//   allAccounts() {
//     return this.belongsToMany("Account");
//   },
//   adminAccounts() {
//     return this.belongsToMany("Account").query({ where: { access: "admin" } });
//   },
//   viewAccounts() {
//     return this.belongsToMany("Account").query({
//       where: { access: "readonly" },
//     });
//   },
// });
