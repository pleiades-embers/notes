//声明一个字符串
let str = '<a href="http://www.atguigu.com">xxx</a>'

const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/

const result = reg.exec(str)

console.log(result)
console.log(result.groups.url)