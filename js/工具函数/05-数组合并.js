var arr = [0, 11, 20, 5, 20, 0, 0, 11, 20, 5];

function concat(arr,...args){
    const result=[...arr]

    args.forEach(item=>{
        if(Array.isArray(item)){
            result.push(...item)
        }else{
            result.push(item)
        }
    })
    return result
}


console.log(concat(arr,[4,5,6],7,8))