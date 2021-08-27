let str = "请08月27日提货至08月30日提货";
console.log(
  new Date().getFullYear() +
    str.match(/请(.*)提货至/)[1].replace(/[\u4e00-\u9fa5]/g, "-")
);

console.log(new Date().getFullYear())