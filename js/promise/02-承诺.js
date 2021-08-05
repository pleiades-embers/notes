//promise 承诺

//实现承诺  承诺石沉大海  承诺等待结果中.....
//resolve  reject
//解决问题   拒绝考虑     pending   苦苦等待....

//解决异步流程化的一种手段   promise

//Promise 构造函数 需要new
//promise 参数  excutor 执行器
//excutor --> resolve reject  函数
//excutor new Promise 调用

// excutor是同步执行的
let promise =new Promise((resolve,reject)=>{
    // resolve('承诺实现')
    reject('承诺石沉大海')
  
})

promise.then((res)=>{
    console.log(1)
    return new Promise((resolve,reject)=>resolve('成功xxx'))
}).then((res)=>{
    console.log(res)
},(err)=>{
    console.log(err)
}).catch((err)=>{
    // console.log(err)
})

console.log('Global')


// 状态顺序
// resolve reject  pending
// pending --> resolve
// pending --> reject
// 反过来不行