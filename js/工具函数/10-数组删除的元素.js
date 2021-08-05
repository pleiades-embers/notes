function pull(arr,...args){
    const result=[]

    for(let i=0;i<arr.length;i++){
        if(args.includes(arr[i])){
            result.push(arr[i])
            arr.splice(i,1)
            i--
        }
    }

    return result
}

console.log(pull([1,3,5,7],2,7,3,7))