var arr = [0, 11, [20, 5, [20, 0], 0, 11], 20, 5];

function flatten1(arr){
    let reuslt=[]

    arr.forEach(item=>{
        if(Array.isArray(item)){
            reuslt=reuslt.concat(flatten1(item)) 
        }else{
            reuslt=reuslt.concat(item)
        }
    })
    return reuslt
}


function flatten2(arr){
    let result=[...arr]

    while(result.some(item=>Array.isArray(item))){
        result=[].concat(...result)
    }
    return result
}

console.log(flatten2(arr))