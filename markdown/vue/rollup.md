# Rollup.js 

### 创建第一个bundle(Creating your first bundle)

*开始前, 需要安装 [Node.js](https://nodejs.org/)， 这样才可以使用 [npm](https://npmjs.com/) ；还需要了解如何使用 [command line](https://www.codecademy.com/learn/learn-the-command-line)。*

使用 Rollup 最简单的方法是通过 Command Line Interface （或 CLI）。先全局安装 Rollup （之后会介绍如何在项目中进行安装，更便于打包，但现在不用担心这个问题）。在命令行中输入以下内容：

复制

```
npm install rollup --global # or `npm i rollup -g` for short
```

现在可以运行 `rollup` 命令了。试试吧~

复制

```
rollup
```

由于没有传递参数，所以 Rollup 打印出了使用说明。这和运行 `rollup --help` 或 `rollup -h` 的效果一样。

我们来创建一个简单的项目：

复制

```
mkdir -p my-rollup-project/src
cd my-rollup-project
```

首先，我们需要个 *入口*。将以下代码粘贴到新建的文件 `src/main.js` 中：

复制

```
// src/main.js
import foo from './foo.js';
export default function () {
  console.log(foo);
}
```

之后创建入口文件引用的 `foo.js` 模块：

复制

```
// src/foo.js
export default 'hello world!';
```

现在可以创建 bundle 了：

复制

```
rollup src/main.js -f cjs
```

`-f` 选项（`--output.format` 的缩写）指定了所创建 bundle 的类型——这里是 CommonJS（在 Node.js 中运行）。由于没有指定输出文件，所以会直接打印在 `stdout` 中：

也可以像下面一样将 bundle 保存为文件：

复制

```
rollup src/main.js -o bundle.js -f cjs
```

（你也可以用 `rollup src/main.js -f cjs > bundle.js`，但是我们之后会提到，这种方法在生成 sourcemap 时灵活性不高。）

试着运行下面的代码：

复制

```
node
> var myBundle = require('./bundle.js');
> myBundle();
'hello world!'
```

恭喜，你已经用 Rollup 完成了第一个 bundle。