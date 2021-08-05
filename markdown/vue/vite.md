# vite

## 知识储备

-  掌握ES Modules 特性
- 了解 HTTP2标准

## 相关介绍

### vite的定义

面向现代浏览器的一个更轻、更快的Web应用开发工具

基于ECMAScript标准原生模块系统 (ES Modules) 实现

### vite的由来

如果应用比较复杂,使用Webpack 的开发过程相对没有那么丝滑

-  Webpack Dev Server 冷启动时间会比较长
- Webpack HMR 热更新的反应速度比较慢

## 快速上手

Vite官方目前提供了一个比较简单的脚手架: create-vite-app 可以使用这个脚手架快速创建一个使用Vite 构建的Vue.js 应用

```powershell
npm init vite <project-name>
cd <project-name>
npm install
npm run dev
```

如果使用 yarn 

```powershell
yarn create vite-app <project-name>
cd <project-name>
yarn 
yarn dev
```

>  npm init 或者 yarn create 是这两个包管理工具的新功能
>
> 其内部就是自动去安装一个create-<xxx> 的模块(临时), 然后自动执行这个模块中的bin.
>
> 例如: yarn create react-app my-react-app 就相当于先 yarn -g add create-react-app, 然后自动执行create-react-app my-react-app

#### 对比差异点

打开生成的项目过后,你会发现就是一个很普通的Vue.js应用,没有太多特殊的地方

不过相对于之前vue-cli 创建的项目基于webpack 搭建的vue.js项目,这里的开发依赖非常简单, 只有vite和@vue/compiler-sfc

