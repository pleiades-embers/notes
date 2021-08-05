import {argv,execPath} from 'process';

// 打印 process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

/*
以如下方式启动 Node.js 进程：
$ node process-args.js one two=three four

将生成输出：
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four 
*/

//看看 help 正则匹配结果
// let help=argv.slice(2)[0]?.match(/^(-+|\/)(h(elp)?|\?)$/)
// console.log(help)

// console.log(!!'看看输出')



//execPath   属性返回启动 Node.js 进程的可执行文件的绝对路径名。 符号链接（如果有）会被解析。
// console.log(execPath)



