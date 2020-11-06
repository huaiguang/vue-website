
function add(x, y) {
  return x + y
}

console.group()
console.log('module', module)
console.log('exports', exports)
// exports 是 module.exports 的一个引用
console.log(exports === module.exports)
console.groupEnd()
// if (typeof module === 'object') {
//   console.log(module)
// } else if (typeof define === 'function' && define.amd) {
//   console.log('defind.amd')
// } else if (typeof exports === 'object') {
//   console.log('exports')
// } else {
//   console.log('t')
// }

// exports
// 可以通过 require 引用
// exports = {
//   add
// }
// 因为exports是module.exports的一个引用，给exports重新赋值，就指向另一个对象了，丢失了引用关系。最后return module.exports，而不是return exports。
exports.add = add
// module.exports.add = add

// module.exports
// 可直接应用于ES6语法
// module.exports = {
//   add
// }

// export default add

