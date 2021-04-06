/*
 * @Author: Brightness
 * @Date: 2021-04-02 17:11:13
 * @LastEditors: Brightness
 * @LastEditTime: 2021-04-02 17:56:33
 * @Description:
 */
const server = require("./server");
const router = require("./router");
server.start(router.route);

// let link = new URL("http://localhost:8888/jj");
// console.log(link.pathname);
/**
URL {
  href: 'http://localhost:8888/jj',
  origin: 'http://localhost:8888', 
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:8888',
  hostname: 'localhost',
  port: '8888',
  pathname: '/jj',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
} 
*/
