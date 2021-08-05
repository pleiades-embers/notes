function difference(arr1,arr2){
    if(arr1.length===0){
        return []
    }
    if(arr2.length===0){
        return arr1.slice()
    }
    const result=arr1.filter(item=>!arr2.includes(item))
    return result
}

console.log(difference([1,3,5,7],[5,8]))