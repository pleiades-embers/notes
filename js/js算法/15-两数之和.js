// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

// 示例:
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]



// 暴力
// var towSum=function(nums,target){
//     for(let i=0;i<nums.length;i++){
//         for(let j=i+1;j<nums.length;j++){
//             if(nums[i]===target-nums[j]){
//                 return [i,j]
//             }
//         }
//     }
// }

// let result=towSum([4,2,3],7)


//哈希表
var twoSum=function(nums,target){
    let map=new Map()
    for(let i=0;i<nums.length;i++){
        map.set(nums[i],i)
    }
    for(let i=0;i<nums.length;i++){
        ans=target-nums[i]
        if(map.has(ans)&&map.get(ans)!=i){
            return [i,map.get(ans)]
        }
    }
}


//哈希表解法2
var twoSum = function(nums, target){
    const map = new Map();
    for(let i=0; i<nums.length; i++){
        if (map.has(nums[i])){
            return [map.get(nums[i]),i];
        }else{
            map.set(target-nums[i],i);
        }
    }
}
let result=twoSum([2,7,11,15],9)
console.log(result)