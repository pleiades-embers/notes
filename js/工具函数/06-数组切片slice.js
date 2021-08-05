var arr = [0, 11, 20, 5, 20, 0, 0, 11, 20, 5];

function slice(arr,begin,end){
    //若arr数组长度为0
    if(arr.length===0){
        return []
    }

    begin=begin||0
    if(begin>=arr.length){
        return []
    }

    end=end||arr.length
    if(end<begin){
        end=arr.length
    }

    const reuslt=[]

    for(let i=0;i<arr.length;i++){
        if(i>=begin&&i<end){
            reuslt.push(arr[i])
        }
    }

    return reuslt
}

console.log(slice(arr,1,5))