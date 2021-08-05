

# 前置知识
## lerna 

### lerna是什么
Lerna是一个用于管理具有多个包的JavaScript项目的工具，它采用monorepo(单代码仓库)的管理方式。

将所有相关module都放到一个repo里，每个module独立发布，（例如Babel、React和jest等），issue和PR都集中到该repo中。

你不需要手动去维护每个包的依赖关系，当发布时，会自动更新相关包的版本号，并自动发布。

Lerna项目文件结构：
```
├── lerna.json
├── package.json
└── packages
    ├── package-a
    │   ├── index.js
    │   └── package.json
    └── package-b
        ├── index.js
        └── package.json
```

### 至关重要的命令
| 命令            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| lerna bootstrap | 在当前 Lerna 仓库中执行引导流程（bootstrap）。安装所有 依赖项并链接任何交叉依赖。 |
| lerna clean     | 删除各个包下的node_modules                                   |
| lerna init      | 常见一个新的 lerna 仓库（repo）或将现有的仓库升级为适配当前 版本的 Lerna。 |
| lerna list      | 显示package列表                                              |
| lerna changed   | 显示自上次relase tag以来有修改的包， 选项通 list             |
| lerna diff      | 显示自上次relase tag以来有修改的包的差异， 执行 git diff     |
| lerna exec      | 在每个包目录下执行任意命令                                   |
| lerna run       | 执行每个包package.json中的脚本命令                           |
| lerna add       | 添加一个包的版本为各个包的依赖                               |
| lerna import    | 将本地路径 <pathToRepo> 中的软件包导入（import） packages/<directory-name> 中并提交 commit。 |
| lerna link      | 链接互相引用的库                                             |
| lerna create    | 新建package                                                  |
| lerna publish   | 发布                                                         |

lerna有两种管理项目的模式：固定模式或独立模式

>固定模式
固定模式是默认的模式，版本号使用lerna.json文件中的version属性。执行lerna publish时，如果代码有更新，会自动更新此版本号的值。

>独立模式
独立模式，允许维护人员独立的增加修改每个包的版本，每次发布，所有更改的包都会提示输入指定版本号。

使用方式：

lerna init --independent
修改lerna.json中的version值为independent，可将固定模式改为独立模式运行。


### 共用devDependencies
开发过程中，很多模块都会依赖babel、eslint等模块，这些大多都是可以共用的，

我们可以通过lerna link convert命令，将它们自动放到根目录的package.json文件中去。

这样做即可以保证每个依赖的版本统一，也可以减少存储空间，减少依赖安装的速度。

注意： 一些npm可执行的包，仍然需要安装到使用模块的包中，才能正常执行，例如jest。


### 使用yarn Workspaces
工作区是设置软件包体系结构的一种新方式，只需要运行一次 yarn install 便可将指定工作区中所有依赖包全部安装。

优势
依赖包可以链接在一起，这意味着你的工作区可以相互依赖，同时始终使用最新的可用代码。 这也是一个比 yarn link 更好的机制，因为它只影响你工作区的依赖树，而不会影响整个系统。
所有的项目依赖将被安装在一起，这样可以让 Yarn 来更好地优化它们。
Yarn 将使用一个单一的 lock 文件，而不是每个包都有一个，这意味着拥有更少的冲突和更容易的进行代码检查。


### 添加依赖
将模块package-a添加到package-b模块依赖中

larna add package-a --scope=package-b
添加完成后会在package-b的package.json中增加以下依赖项

{
  "dependencies": {
    "package-a": "file:../package-a"
  }
}
包依赖使用file:来指定本地路径文件



### Lerna Changelog
lerna自带生成Changelog的功能，只需要通过简单的配置就可以生成CHANGELOG.md文件。

配置如下：

{
  "command": {
    "publish": {
      "allowBranch": "master", // 只在master分支执行publish
      "conventionalCommits": true, // 生成changelog文件
      "exact": true // 准确的依赖项
    }
  }
}
配置后，当我们执行lerna publish后会在项目根目录以及每个packages包下，生成CHANGELOG.md。

注意: 只有符合约定的commit提交才能正确生成CHANGELOG.md文件。

如果提交的commit为fix会自动升级版本的修订号;

如果为feat则自动更新次版本号;

如果有破坏性的更改，则会修改主版本号。

### Lerna与Jest集成
在包发布之前，为了保证代码的质量，都需要来编写单元测试，为了提高效率并方便测试运行，我们想要做到以下功能：

所有包只维护一份公共的jest配置文件
可以整体运行所有单元测试
可以只对某个包执行单元测试
jest配置
在项目根目录配置jest.config.js文件如下：

```js
const path = require('path')
module.exports = {
  collectCoverage: true, // 收集测试时的覆盖率信息
  coverageDirectory: path.resolve(__dirname, './coverage'), // 指定输出覆盖信息文件的目录
  collectCoverageFrom: [ // 指定收集覆盖率的目录文件，只收集每个包的lib目录，不收集打包后的dist目录
    '**/lib/**',
    '!**/dist/**'
  ],
  testURL: 'https://www.shuidichou.com/jd', // 设置jsdom环境的URL
  testMatch: [ // 测试文件匹配规则
    '**/__tests__/**/*.test.js'
  ],
  testPathIgnorePatterns: [ // 忽略测试路径
    '/node_modules/'
  ],
  coverageThreshold: { // 配置测试最低阈值
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}
```
## npm-run-all

并行或顺序运行多个npm脚本的CLI工具。 执行windows上没有的命令不报错

这个“npm-run-all”命令以并行或顺序的方式运行多个脚本。
```json
{
    "scripts": {
        "clean": "rimraf dist",
        "lint":  "eslint src",
        "build": "babel src -o lib",
        "bootstrap":"npm-run-all clean lint build"
    }
}
```

```
$ npm-run-all clean lint build
等同于
$ npm run clean && npm run lint && npm run build
```

**Note1:** 如果脚本以非零代码退出，其他脚本和那些后代进程将被' SIGTERM '杀死(在Windows上，使用' taskkill.exe /F /T ')。如果给出了'——continue-on-error '选项，该行为将被禁用.

**Note2:** 设置这个——continue-on-error，即使一个任务抛出错误，也要继续执行其他/后续任务。如果一个或多个任务抛出错误，'npm-run-all'本身将以非零代码退出

**Note3** ' & '操作符在Windows' ' cmd.exe '上不起作用。但是“npm-run-all -parallel”在这里很好用。

### 混合运行顺序和并行脚本

```
$ npm-run-all clean lint --parallel watch:html watch:js
```
1. First, this runs `clean` and `lint` sequentially(依次)/serially(串行).
2. Next, runs `watch:html` and `watch:js` in parallel(并行).


```
$ npm-run-all a b --parallel c d --sequential e f --parallel g h i
```
or

```
$ npm-run-all a b --parallel c d --serial e f --parallel g h i
```
1. First, runs `a` and `b` sequentially / serially.
2. Second, runs `c` and `d` in parallel.
3. Third, runs `e` and `f` sequentially / serially.
4. Lastly, runs `g`, `h`, and `i` in parallel.

### 正则匹配占位符运行脚本

```
$ npm-run-all --parallel watch:*
```
* 正则匹配所有 并行运行 `watch:html`, `watch:js`


```
$ npm-run-all build "start-server -- --port {1}" -- 8080
```
{} 占位符 -- xxxx


### taro里得并行脚本

```
"build:parallel": "npm run build:shared && lerna run build --parallel --ignore @tarojs/shared --ignore @tarojs/runtime",
```

### 元组占位符及命令行输出着色
There are the following placeholders:

- `{1}`, `{2}`, ... -- An argument. `{1}` is the 1st argument. `{2}` is the 2nd.
- `{@}` -- All arguments.
- `{*}` -- All arguments as combined.

Those are similar to [Shell Parameters](http://www.gnu.org/software/bash/manual/bashref.html#Shell-Parameters). But please note arguments are enclosed by double quotes automatically (similar to npm).

If `--print-label` option is given, some tools in scripts might stop coloring their output.
Because some coloring library (e.g. [chalk]) will stop coloring if `process.stdout` is not a TTY.
`npm-run-all` changes the `process.stdout` of child processes to a pipe in order to add labels to the head of each line if `--print-label` option is given.<br>
For example, [eslint] stops coloring under `npm-run-all --print-label`. But [eslint] has `--color` option to force coloring, we can use it. For anything [chalk] based you can set the environment variable `FORCE_COLOR=1` to produce colored output anyway.

[glob]: https://www.npmjs.com/package/glob#glob-primer
[chalk]: https://www.npmjs.com/package/chalk
[eslint]: https://www.npmjs.com/package/eslint



## 字符串重复最多的及次数

```typescript
const str = "abcdaabaaaaabbbbbbbbbbbbaaaaa";

const obj = {};
for (let i = 0; i < str.length; i++) {
  const s = str[i];
  if (obj[s]) {
    obj[s]++;
  } else {
    obj[s] = 1;
  }
}

var max = Math.max.apply(
  null,
  Object.keys(obj).map((item) => obj[item])
);
let arr = [];
for (const key in obj) {
  arr.push({
    key: key,
    value: obj[key],
  });
}

let result = (arr as any).find((item) => item.value === max);

console.log(result);

```

```typescript  
const str = "abcdaabaaaaabbbbbbbbbbbbaaaaa";

let i = 0;
let j = 1;
let maxRepeatCount = 0;
let maxRepeatchar = "";
while (i < str.length - 1) {
  if (str[i] !== str[j]) {
    if (j - i > maxRepeatCount) {
      maxRepeatCount = j - i;
      maxRepeatchar = str[i];
    }
    i = j;
  }
  j++;
}

console.log(maxRepeatCount, maxRepeatchar);

```

## 递归深入

1.缓存数据

```typescript
const cache={}
function fib(n){
    if(cache.hasOwnProperty(n)){
        return cache[n]
    }
    var v=n==0||n==1?1:fib(n-1)+fib(n-2)
    cache[n]=v
    return v
}

for(let i=0;i<9;i++){
    console.log(fib(i))
    console.log(cache)
}
```


2.数组转换
```typescript

let arr =[1,2,3,[2,3,4,[5,6]]]

function convert(arr){
    let result=[]
    for(let i=0;i<arr.length;i++){
        if(typeof arr[i]=="number"){
            result.push({
                value:arr[i]
            })
        }else if(Array.isArray(arr[i])){
            result.push({
                children:convert(arr[i]) 
            })
        }
    }
    return result
}
console.log(JSON.stringify(convert(arr)))
```

```typescript
let arr = [1, 2, 3, [2, 3, 4, [5, 6]]];

function convert(item) {
  if (typeof item == "number") {
    return {
      value: item,
    };
  } else if (Array.isArray(item)) {
    return {
      children: item.map((_item) => convert(_item)),
    };
  }
}
console.log(convert(arr));
```

### 栈
```typescript
/**
 * 试编写“智能重复”smartRepeat函数，实现：
 * 将 3[abc] 变为abcabcabc
 * 将 3[2[a]2[b]] 变为 aabbaabbaabb
 * 将 2[1[a]3[b]2[3[c]4[d]]] 变为abbbcccddddcccddddabbbcccddddcccdddd
 * 不用考虑输入字符串是非法的情况，比如：
 * 2[a3[b]]是错误的，应该补一个1，即2[1[a]3[b]]
 * [abc]是错误的，应该补一个1，即1[abc]
 */

var str = '2[1[a]3[b]2[3[c]4[d]]]';

function smartRepeat(templateStr) {
  //指针
  let index = 0;
  //栈1 存放数字
  var stack1 = [];
  //栈2 存放空字符串
  var stack2 = [];
  // 剩余部分
  var rest = templateStr;

  while (index < templateStr.length - 1) {
    rest = templateStr.substring(index);

    if (/^\d+\[/.test(rest)) {
      let times = Number(rest.match(/^(\d+)\[/)[1]);
      stack1.push(times);
      stack2.push('');
      /**
       * 数字是多少位33 长度指针就往后移动多少位 +1 是[
       */
      index+=times.toString().length+1
    }else if(/^\w+\]/.test(rest)){
      let word=rest.match(/^(\w+)\]/)[1]
      stack2[stack2.length-1]=word
      index+=word.length
    }else if(rest[0]=="]"){
      let times=stack1.pop()
      let word=stack2.pop()
      stack2[stack2.length-1]+= word.repeat(times)
      index++
    }
    console.log(index,stack1,stack2)
  }

  return stack2[0].repeat(stack1[0])
}
console.log(smartRepeat(str));
```

### AST 结构在线解析

https://astexplorer.net/

https://resources.jointjs.com/demos/rappid/apps/Ast/index.html



### 常用的 AST 解析库

Babel: https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md

Esprima: https://esprima.org/

Acorn: https://github.com/acornjs/acorn

UglifyJS: http://lisperator.net/uglifyjs/


### 相关教程

[AST 还原 obfuscator 混淆](https://blog.csdn.net/zhao_5352269/article/details/106492177)

[操作AST还原混淆代码基础系列课程三:十六进制字符串还原](https://mp.weixin.qq.com/s/bB3lF5mg1wJEYEBfBPjG3g)

[操作AST还原混淆代码:让代码分析变得如此简单](https://mp.weixin.qq.com/s/Iy4gaUCfb76Km7ZdOFNS9w)

[AST实战:全自动解密经obfuscator混淆的加密字符串](https://mp.weixin.qq.com/s/L4FOxc7fwKB7bq0eQb2r9g)

[操作AST还原混淆代码课程九:还原简单的CallExpression 类型](https://mp.weixin.qq.com/s/CI9I4D3aJUoGUvud1uFj7w)


### AST 节点类型对照表

| 序号 | 类型原名称           | 中文名称      | 描述                                                  |
| ---- | -------------------- | ------------- | ----------------------------------------------------- |
| 1    | Program              | 程序主体      | 整段代码的主体                                        |
| 2    | VariableDeclaration  | 变量声明      | 声明一个变量，例如 var let const                      |
| 3    | FunctionDeclaration  | 函数声明      | 声明一个函数，例如 function                           |
| 4    | ExpressionStatement  | 表达式语句    | 通常是调用一个函数，例如 console.log()                |
| 5    | BlockStatement       | 块语句        | 包裹在 {} 块内的代码，例如 if (condition){var a = 1;} |
| 6    | BreakStatement       | 中断语句      | 通常指 break                                          |
| 7    | ContinueStatement    | 持续语句      | 通常指 continue                                       |
| 8    | ReturnStatement      | 返回语句      | 通常指 return                                         |
| 9    | SwitchStatement      | Switch 语句   | 通常指 Switch Case 语句中的 Switch                    |
| 10   | IfStatement          | If 控制流语句 | 控制流语句，通常指 if(condition){}else{}              |
| 11   | Identifier           | 标识符        | 标识，例如声明变量时 var identi = 5 中的 identi       |
| 12   | CallExpression       | 调用表达式    | 通常指调用一个函数，例如 console.log()                |
| 13   | BinaryExpression     | 二进制表达式  | 通常指运算，例如 1+2                                  |
| 14   | MemberExpression     | 成员表达式    | 通常指调用对象的成员，例如 console 对象的 log 成员    |
| 15   | ArrayExpression      | 数组表达式    | 通常指一个数组，例如 [1, 3, 5]                        |
| 16   | NewExpression        | New 表达式    | 通常指使用 New 关键词                                 |
| 17   | AssignmentExpression | 赋值表达式    | 通常指将函数的返回值赋值给变量                        |
| 18   | UpdateExpression     | 更新表达式    | 通常指更新成员值，例如 i++                            |
| 19   | Literal              | 字面量        | 字面量                                |
| 20   | BooleanLiteral       | 布尔型字面量  | 布尔值，例如 true false                               |
| 21   | NumericLiteral       | 数字型字面量  | 数字，例如 100                                        |
| 22   | StringLiteral        | 字符型字面量  | 字符串，例如 vansenb                                  |
| 23   | SwitchCase           | Case 语句     | 通常指 Switch 语句中的 Case                           |



# Taro 源码分析

> 在一个优秀且严格的规范限制下，从更高抽象的视角（语法树）来看，每个人写的代码都差不多。

也就是说，对于微信小程序这样不开放不开源的端，我们可以先把 React 代码分析成一颗抽象语法树，根据这颗树生成小程序支持的模板代码，再做一个小程序运行时框架处理事件和生命周期与小程序框架兼容，然后把业务代码跑在运行时框架就完成了小程序端的适配。

对于 React 已经支持的端，例如 Web、React Native 甚至未来的 React VR，我们只要包一层组件库再做些许样式支持即可。鉴于时下小程序的热度和我们团队本身的业务侧重程度，组件库的 API 是以小程序为标准，其他端的组件库的 API 都会和小程序端的组件保持一致。



![img](https://pic2.zhimg.com/80/v2-c56ffe56f3f61a479ba27b5a6b22d789_720w.jpg)





## taro-weapp

### rollup 打包

```javascript
const base = {
  external: ['@tarojs/shared', '@tarojs/service'],
  plugins: [typescript({
    useTsconfigDeclarationDir: true
  })]
}
```

 @tarojs/shared   <没找到>

> Taro 内部使用的 utils。包含了常用的类型判断、错误断言、组件类型/声明/参数等。`@tarojs/shared` 会跨 node/浏览器/小程序/React Native 使用，不得使用平台特有特性。
>
> 引入此包的必须采用 ES6 引用单个模块语法，且打包配置 external 不得包括此包。

@tarojs/service  在taro 项目目录下有

external   Peer dependencies 对等依赖   调整那些导入的包是捆绑的，那些被视为外部的



useTsconfigDeclarationDir

如果为真，声明文件将在 tsconfig 中给出的目录中发出。如果为 false，声明文件将放在 Rollup 配置中给出的目标目录中。



### tsconfig

```json
{
  "compilerOptions": {
    "target": "es2017",   // 指定 ECMAScript 目标版本: 'ES3' (default), 		'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "ES2015",   // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015' 
    "rootDir": "./src",     // 用来控制输出目录结构 --outDir.
    "outDir": "dist",       // 指定输出目录
    "sourceMap": true,      // 生成相应的 '.map' 文件
    "baseUrl": ".",  		 // 用于解析非相对模块名称的基目录 
    "noImplicitAny": false,    // 在表达式和声明上有隐含的 any类型时报错
    "noUnusedLocals": true,   // 有未使用的变量时，抛出错误
    "removeComments": false,  // 删除编译后的所有的注释
    "strictNullChecks": true,    // 启用严格的 null 检查
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。
    "experimentalDecorators": true,   // 启用装饰器
    "moduleResolution": "node",    // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "declaration": true,      // 生成相应的 '.d.ts' 文件
    "declarationDir": "types"  
  },
  "include": [
    "./src"
  ],
  "exclude": [
    "**/*.test.ts",
    "**/*.spec.ts"
  ],
  "compileOnSave": false
}

```



> 
