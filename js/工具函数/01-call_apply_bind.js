Function.prototype.call = function (obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = window;
  }

  obj.tempFn = this;

  const result = obj.tempFn(...args);

  delete obj.tempFn;

  return result;
};
Function.prototype.apply = function (obj, args) {
  return obj, [...args];
};
Function.prototype.bind = function (obj, ...args) {
  return (...args2) => {
    //箭头函数可以省略return
    //调用原来函数,指定this为obj,参数列表由args和args2组成
    this.call(obj, ...args, ...args2);
  };
};
/* 
        全局变量:window的属性
        全局函数:window的方法 
        */

function fn(a, b) {
  this.xxx = 3;
  console.log(a, b, this, arguments.length);
  return a + b;
}
// fn(1, 2)
// console.log(xxx)
const obj = {
  m: 0,
};
// fn.call(obj, 1, 2)
// fn.apply(obj, [1, 2]);
// fn.call(null, 1, 2)
fn.bind(obj)(3, 4);
// fn.bind(obj, 5)(3, 4);
// fn.bind(obj, 5, 6)(3, 4);

/*         
1.区别call()/apply()/bind()
  call(obj)/apply(obj):调用函数,指定函数中的this为第一个参数的值
  bind(obj):返回一个新的函数,新函数内部会调用原来的函数,且this为bind()指定的第一个参数的值
  注意:如果obj是null/undefined,this为window 
 */


