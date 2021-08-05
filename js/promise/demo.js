const fs=require('fs')

function readFile(path,isSetError){
    return new Promise((reslove,reject)=>{
        fs.readFile(path,'utf8',function(err,data){
           if(err||isSetError){
            reject('承诺石沉大海了')
           }

           const resData=JSON.parse(data)

           reslove(resData)
        })
    })
}

readFile('./json/user.json').then((res)=>{
    // console.log(res)
})
readFile('./json/userCourse.json').then((res)=>{
    // console.log(res)
})
readFile('./json/course.json').then((res)=>{
    // console.log(res)
})

//合并三个文件内部的数据为一个大数组 并且按照数据排列  
//如果一个读取失败，让这个数据集合返回 rejected
// interable 类型的数据

Promise.all([
    readFile('./json/user.json'),
    readFile('./json/userCourse.json'),
    readFile('./json/course.json')
]).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})
// 用多个异步任务并发运行，他的结果创建承诺之后使用,等待所有任务结果的完成
//iterable 内部元素传递的是promise 对象集合,如果不是promise,直接reslove Promise.resolve(0||'123'||true)
//iterable 内部没有元素 返回空数组