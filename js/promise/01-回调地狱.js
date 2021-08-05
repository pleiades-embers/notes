function doSth(t){
    return function(){
        if(--t===0){
            logSth(function(){
                logSth2(function(){
                    logSth3()
                })
            })
        }
    }
}

function logSth(cb){
    console.log('1111111')
    cb()
}

function logSth2(cb){
    console.log('2222222222222')
    cb()
}


function logSth3(cb){
    console.log('3333333333')
}
// let fn=doSth(4,logSth.bind(null,logSth2))
let fn=doSth(4,logSth)
fn()
fn()
fn()
fn()