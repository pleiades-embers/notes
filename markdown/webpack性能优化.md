## 开发层面的构建优化

###   html  HMR 

- 专题页的 html 没有 HMR 功能

```javascript
    entry: { //入口
        //html 文件;:默认不能使用 HMR 功能，同时会导致问题: html文件不能热更新了~
        // 解决: 修改entry 入口 ,将html文件引入
        index: ['./src/index.js', './src/index.pug']
    },
```

### gzip 压缩  

```javascript
    devServer: {
        hot: true,
        host: 'localhost',
        port: 80,
        compress: true, //开启gzip 压缩
        open: true,
    },
```

### source-map 方便调试

```javascript
devtool: 'eval-source-map', 
    //由于代码会经过压缩等操作 所以需要source-map 映射
    // 此模式为调试最优模式
```

### oneOf   loader 加速   及

### loader执行缓存  第二次loader 会缓存

1. 有些loader 只需要执行一次就行 无需执行多次

2. js的loader  比如有 eslint 和 babel时 需要执行多次loader

```javascript
  oneOf: [{
                    test: /\.pug$/,
                    exclude: /node_modules/,
                    use: ["pug-loader"]
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: {
                                        version: 3
                                    },
                                    targets: {
                                        chrome: '60',
                                        firefox: '50'
                                    }
                                }
                            ]
                        ],
                        cacheDirectory: true //开启babel 缓存 第二次构建时会读取之前的babel缓存
                    }
                },
```



##    构建层面的构建优化

###    离线缓存 PWA   serviceworker

```javascript
const WorkboxWebpackPlugin=require('workbox-webpack-plugin')

    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({   //PWA
            clientsClaim:true,
            skipWaiting:true
        })
    ],
```



```javascript
//index.js 中的代码
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorkerW
        .register('/service-worker.js')
        .then(()=>{
            console.log('service-worker注册成功了')
        })
        .catch(()=>{
            console.log('service-worker注册失败了')
        })
    })
}
```

###    构建代码JS分割  及 CSS分割

#### 代码会集中在 js中 导致js过大引起页面阻塞

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")


    //可以将 node_modules 中代码单独打包一个chunk
    //自动分析多入口 chunk 中,有没有公共的文件.如果有会打包成单独一个chunk
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    
    
     {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        // {
                        //     loader:'thread-loader',
                        //     options:{
                        //         workers: 2   //进程2个
                        //     }
                        // },
                        {
                            // loader: 'style-loader', //创建style 标签,将js中的样式资源插入进行,添加到head中生效
                            //这个 loader 取代style-loader >作用:提取js中的css 成单独文件
                            loader: MiniCssExtractPlugin.loader,
                        }, {
                            loader: 'css-loader', //将css文件编程commonjs模块加载js中，里面内容是样式字符串
                            options: {
                                "sourceMap": true
                            }
                        },

                        /*
                        css 兼容性处理: postcss--> postcss-loader postcss-preset-env
                        帮 postcss 找到package.json 中browserslist 里面的配置,通过配置加载指定的css兼容性样式
                        */
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => {
                                    require('postcss-preset-env')()
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ],
                    exclude: resolve('node_modules'),
                },
```

> 代码中 针对postcss 进行了优化  无需在写 .posscssrc 文件
>
> package-json 中 postcss 优化如下

```json
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      "> 1%",
      "last 2 versions",
      "not dead",
      "not op_mini all"
    ]
  },
```

### 打包时移除空格注释

```javascript
        new HtmlWebpackPlugin({ //复制 './src/index.html' 文件，并自动引入打包输出的所有资源(JS/CSS)
            template: './src/index.pug',
            minify: { //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true
            }
        }),
```

### 静态资源构建缓存及 devtools

```javascript
    output: { //出口
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].bundle.[contenthash:10].js",
    },
    devtool: 'nosources-source-map',
```

>   devtool: 'nosources-source-map',     保护源码 方便构建
>
>  contenthash 打包静态资源缓存   没有改动过的代码有缓存 第二次构建更快

 

### tree shaking

> *tree shaking:去除无用代码*
>
> *前提: 1.必须使用 ES6 模块化 2.开启production 环境*
>
> *作用: 减少代码体积*
>
> *在package.json 中配置*
>
> *"SideEffects":false 所有代码都没有副作用 (都可以进行tree shaking)*
>
> *问题: 可能会把 css/@babel/ polyfill (副作用文件干掉)*
>
> "sideEffects":["\*.css"]*

```javascript
  "sideEffects": [
    "*.css"
  ],
```

### 多进程打包 HappyPack

```javascript
 const HappyPack =require('happypack')

//创建线程池  根据cpu数量创建进程
const happyThreadPool=HappyPack.ThreadPool({size:OscillatorNode.cpus().length})

new HappyPack({
    id:'jsx',
    threads:happyThreadPool,
    //url-loader file-loader 都不支持happyThreadPool
    loaders:['babel-loader']
})
```



## webpack 打包源码解析

### 大体结构:

```javascript
(function (modules){
 var installedModules={}
	function __webpack_require__(moduleId){
    	/*code*/
	}
	return __webpack_require__(0);    //entry file
 })({/* modules array */})
```

### 核心方法:

```javascript
function __webpack_require__(moduleId){
    //去以加载模块中查找这个id, 如果这个模块确实已经被加载过,为了节省时间就不做二次加载了,直接把结果返回出来
    if(installedModules[moduleId]){
        return installedModules[moduleId].exports
    }
    //如果这个模块没有加载,则添加
    var module=installedModules[moduleId]={
        i:moduleId,
        l:false,
        exports:{}
    }
    
}
```

### 核心打包原理

1. 读取入口文件里面的内容

```javascript
const fs=require('fs')
const getModuleInfo=(file)=>{
    const body=fs.readFileSync(file,'utf-8')
    console.log(body)
}

getModuleInfo('./index.js')
```

2. 分析入口文件,递归的去读取模块所依赖的文件内容,生成AST语法树

```javascript
//分析模块内容  安装@babel/parser 包(转AST)
const fs=require('fs')
const parser=require('@babel/parser')  
const getModuleInfo=(file)=>{
    const body=fs.readFileSync(file,'utf-8')
    const ast=parser.parse(body,{
        sourceType:'module'  //表示要解析的是es6 模块
    })
}

getModuleInfo('./index.js')
```

输出结果

```shell
Node {
  type: 'File',
  start: 0,
  end: 148,
  loc: SourceLocation {
    start: Position { line: 1, column: 0 },
    end: Position { line: 10, column: 21 }
  },
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 148,
    loc: SourceLocation { start: [Position], end: [Position] },
    sourceType: 'module',
    interpreter: null,
    body: [ [Node], [Node], [Node], [Node], [Node], [Node] ],
    directives: []
  },
  comments: []
}
```

 ast.program.body 输出结果 

```shell
// 通过 ast 语法树拿到所有模块依赖
[
  Node {
    type: 'ImportDeclaration',
    start: 0,
    end: 23,
    loc: SourceLocation { start: [Position], end: [Position] },
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 16,
      end: 23,
      loc: [SourceLocation],
      extra: [Object],
      value: './add'         //这个就是依赖
    }
  },
  Node {
    type: 'ImportDeclaration',
    start: 27,
    end: 54,
    loc: SourceLocation { start: [Position], end: [Position] },
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 45,
      end: 54,
      loc: [SourceLocation],
      extra: [Object],
      value: './minus'
    }
  },
  Node {
    type: 'VariableDeclaration',
    start: 60,
    end: 78,
    loc: SourceLocation { start: [Position], end: [Position] },
    declarations: [ [Node] ],
    kind: 'const'
  },
  Node {
    type: 'VariableDeclaration',
    start: 80,
    end: 105,
    loc: SourceLocation { start: [Position], end: [Position] },
    declarations: [ [Node] ],
    kind: 'const'
  },
  Node {
    type: 'ExpressionStatement',
    start: 109,
    end: 125,
    loc: SourceLocation { start: [Position], end: [Position] },
    expression: Node {
      type: 'CallExpression',
      start: 109,
      end: 125,
      loc: [SourceLocation],
      callee: [Node],
      arguments: [Array]
    }
  },
  Node {
    type: 'ExpressionStatement',
    start: 127,
    end: 148,
    loc: SourceLocation { start: [Position], end: [Position] },
    expression: Node {
      type: 'CallExpression',
      start: 127,
      end: 148,
      loc: [SourceLocation],
      callee: [Node],
      arguments: [Array]
    }
  }
]
```

通过 @babel/traverse 遍历ast 拿到所有依赖

```javascript
const fs=require('fs')
const path=require('path')
const parser=require('@babel/parser')
const traverse=require('@babel/traverse').default    
const getModuleInfo=(file)=>{
    const body=fs.readFileSync(file,'utf-8')
    const ast=parser.parse(body,{
        sourceType:'module'  //表示要解析的是es6 模块
    })
    
    const deps={}
    traverse(ast,{         //遍历ast 语法树 并拿到所有依赖的绝对路径
        ImportDeclaration({node}){
            const dirname=path.dirname(file)
            const abspath="./"+path.join(dirname,node.source.value)
            deps[node.source.value]=abspath
        }
    })

    console.log(deps)
}

getModuleInfo('./index.js')
```

输出结果

```shell
{ './add': './add', './minus': './minus' }
```

通过 @babel/core        @babel/preset-env 将es6 转为es5

```javascript
const fs=require('fs')
const path=require('path')
const parser=require('@babel/parser')
const traverse=require('@babel/traverse').default    
const babel=require('@babel/core')
const getModuleInfo=(file)=>{
    const body=fs.readFileSync(file,'utf-8')
    const ast=parser.parse(body,{
        sourceType:'module'  //表示要解析的是es6 模块
    })
    
    const deps={}
    traverse(ast,{         //遍历ast 语法树 并拿到所有依赖的绝对路径
        ImportDeclaration({node}){
            const dirname=path.dirname(file)
            const abspath="./"+path.join(dirname,node.source.value)
            deps[node.source.value]=abspath
        }
    })

    const {code}=babel.transformFromAst(ast,null,{  //ES6 转ES5 的代码
        presets:["@babel/preset-env"]
    })

    const modelInfo={file,deps,code}
    console.log(modelInfo)
    return modelInfo
}

getModuleInfo('./index.js')
```

输出结果

```shell
{
  file: './index.js',
  deps: { './add': './add', './minus': './minus' },
  code: '"use strict";\n' +
    '\n' +
    'var _add = _interopRequireDefault(require("./add"));\n' +
    '\n' +
    'var _minus = _interopRequireDefault(require("./minus"));\n' +
    '\n' +
    'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
    '\n' +
    'var sum = (0, _add["default"])(1, 2);\n' +
    'var division = (0, _minus["default"])(2, 1);\n' +
    'console.log(sum);\n' +
    'console.log(division);'
}
```



