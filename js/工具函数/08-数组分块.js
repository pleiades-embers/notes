function chunk(arr,size=1){

    if(arr.length===0){
        return []
    }

    let result=[]
    let tmp=[]
    arr.forEach(item => {
        if(tmp.length===0){
            result.push(tmp)
        }

        tmp.push(item)

        if(tmp.length===size){
            tmp=[]
        }
    });

    return result
}

console.log(chunk([1,2,3,4,5,6,7],3))