var arr = [0, 11, 20, 5, 20, 0, 0, 11, 20, 5];

function unique(arr) {
  const result = [];

  arr.forEach((item) => {
    if (result.indexOf(item) == -1) {
      result.push(item);
    }
  });
  return result;
}

function unique2(arr) {
  const result = [];
  const obj = {};

  arr.forEach((item) => {
    if (obj[item] === undefined) {
      obj[item] = true;
      result.push(item);
    }
  });

  return result
}

function unique3(arr){
    let set=new Set(arr)
    
    return [...set]
}
console.log(unique3(arr))