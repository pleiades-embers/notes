### vue和React对比
#### 相同点

- 都有组件化思想
- 都支持服务器端渲染
- 都有Virtual DOM（虚拟dom）
- 数据驱动视图
- 都有支持native的方案：`Vue`的`weex`、`React`的`React native`
- 都有自己的构建工具：`Vue`的`vue-cli`、`React`的`Create React App`

#####  区别

- 数据流向的不同。`react`从诞生开始就推崇单向数据流，而`Vue`是双向数据流
- 数据变化的实现原理不同。`react`使用的是不可变数据，而`Vue`使用的是可变的数据
- 组件化通信的不同。`react`中我们通过使用回调函数来进行通信的，而`Vue`中子组件向父组件传递消息有两种方式：事件和回调函数
- diff算法不同。`react`主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。`Vue` 使用双向指针，边对比，边更新DOM



### vue的生命周期有哪些，分别有哪些作用

-  beforeCreate  创建前的状态，初始化事件和生命周期。
-  created 创建完毕状态
-  beforeMount 挂载前状态， 是否有元素el，是否有模板，是否渲染到了函数内，是否作为模板进行了outerHTML渲染到了页 
-  mounted 挂载结束状态，渲染到真正的DOM。
-  beforeUpdate 可以拿到实例化改变前的状态
-  Updated拿到变动完成的状态
-  beforeDestory 消亡前的状态
-  destoryed 实例化或组件被摧毁消亡

### 简述v-if 和v-show的作用

- 都能实现指定内容的显示和隐藏效果
- v-if是通过 创建和销毁dom节点显示隐藏
- v-show 是通过 display:none 来实现显示隐藏



### 什么是跨域？什么是同源策略？项目中你是如何解决跨域的

- 同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同

- 一个域的页面去请求另一个域的资源 （协议，端口，主域名，子域名）不同会造成跨域

- jsonp跨域 动态添加一个`<script>`标签 这个标签的src是没有跨域限制的

- cors跨域资源共享 在请求服务器的时候,服务器给一个响应头，告诉客户段，这些数据可以访问


###  vue循环中为什么要加上key?

- 加上key（具有唯一性） 后 vue中的diff算法就会找到这个节点插入新的节点
- key的作用主要是为了高效的更新虚拟DOM


###	mvvm是什么？你所了解的mvvm框架有哪些

Model：模型层，负责处理业务逻辑以及和服务器端进行交互
View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁

另一方面它实现了DOM Listener,当DOM发生一些事件时,可以监听到,并在需要的情况先改变对应的Data

vue  react angular  ember drop


### Vue的钩子函数中created和mounted的区别？
1）created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
2）mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
3）其实两者比较好理解，通常created使用的次数多，而mounted通常是在一些插件的使用或者组件的使用中进行操作。


### watch、computed和methods之间的对比

1. `computed` 属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用
2. `methods`方法表示一个具体的操作，主要书写业务逻辑
3. `watch` 一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定的数据变换，从而惊醒某些具体的业务逻辑操作

### vue路由传递参数的方式

- params 的类型

  - 配置路由格式 ：/router/:id
  - 传递的方式:在path后面跟上对应的值
  - 传递后形成的路径 ：/router/123  ,/router/abc

- query 类型

  - 配置路由格式 ：/router ,也就是普通配置
  - 传递的方式:对象中使用query的key作为传递方式
  - 传递后形成的路径:/router?id=123,/router?id=abc


### vue程序运行过程

1. 当吧模板传给vue时 vue会将模板保存在`vm.options.tmplate`
2. 解析成 ast(抽象语法树 abstract syntax tree) 
3. compile   成render函数 
4. render 成虚拟dom树
5. 最后把虚拟dom树渲染成真正的dom

> runtime-compiler

> template=>ast=>render=>vdom=>UI

> runtime-only

> render=>vdom=>UI



### Vuex的五大核心属性是什么？
VueX 是一个专门为 Vue.js 应用设计的状态管理架构，统一管理和维护各个vue组件的可变化状态(你可以理解成 vue 组件里的某些 data )。
Vue有五个核心概念，state, getters, mutations, actions, modules。
state => 基本数据 
getters => 从基本数据派生的数据 
mutations => 提交更改数据的方法，同步！ 
actions => 像一个装饰器，包裹mutations，使之可以异步。 
modules => 模块化Vuex



### v-if和v-for哪个优先级更高？如果两个同时出现，应该怎么优化得到更好的性能？

由于`web components` 出现此方法出现了问题
源码中找答案compiler/codegen/index.js

```text
<p v-for="item in items" v-if="condition">
```

做个测试如下

```html
<!DOCTYPE html>
<html>

<head>
    <title>Vue事件处理</title>
</head>

<body>
    <div id="demo">
        <h1>v-for和v-if谁的优先级高？应该如何正确使用避免性能问题？</h1>
        <!-- <p v-for="child in children" v-if="isFolder">{{child.title}}</p> -->
        <template v-if="isFolder">
            <p v-for="child in children">{{child.title}}</p>
        </template>
    </div>
    <script src="../../dist/vue.js"></script>
    <script>
        // 创建实例
        const app = new Vue({
            el: '#demo',
            data() {
                return {
                    children: [
                        {title:'foo'},
                        {title:'bar'},
                    ]
                }
            },
            computed: {
                isFolder() {
                    return this.children && this.children.length > 0 
                }
            },
        });
        console.log(app.$options.render);
    </script>
</body>
</html>
```

两者同级时，渲染函数如下：

```text
(function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"demo"}},[_c('h1',[_v("v-for和v-if谁的优先级高？应该如何正确使用避免性能问题？")]),_v(" "),
_l((children),function(child){return (isFolder)?_c('p',[_v(_s(child.title))]):_e()})],2)}
})
```

> _l包含了isFolder的条件判断

两者不同级时，渲染函数如下

```text
(function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"demo"}},[_c('h1',[_v("v-for和v-if谁的优先级高？应该如何正确使用避免性能问题？")]),_v(" "),
(isFolder)?_l((children),function(child){return _c('p',[_v(_s(child.title))])}):_e()],2)}
})
```

> 先判断了条件再看是否执行_l

**结论：**

1. 显然v-for优先于v-if被解析（把你是怎么知道的告诉面试官）
2. 如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能
3. 要避免出现这种情况，则在外层嵌套template，在这一层进行v-if判断，然后在内部进行v-for循环
4. 如果条件出现在循环内部，可通过计算属性提前过滤掉那些不需要显示的项

### Vue组件data为什么必须是个函数而Vue的根实例则没有此限制？

源码中找答案：src\core\instance\state.js - initData()

> 函数每次执行都会返回全新data对象实例

测试代码如下

```html
<!DOCTYPE html>
<html>

<head>
    <title>Vue事件处理</title>
</head>

<body>
    <div id="demo">
        <h1>vue组件data为什么必须是个函数? </h1>
        <comp></comp>
        <comp></comp>
    </div>
    <script src="../../dist/vue.js"></script>
    <script>
        Vue.component('comp', {
            template:'<div @click="counter++">{{counter}}</div>',
            data: {counter: 0}
        })
        // 创建实例
        const app = new Vue({
            el: '#demo',
        });
    </script>
</body>
</html>
```

![img](https://pic4.zhimg.com/80/v2-74717ccc271a343cf7713370e23e7e5f_720w.jpg)

> 程序甚至无法通过vue检测

**结论**

Vue组件可能存在多个实例，如果使用对象形式定义data，则会导致它们共用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的；采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染问题。而在Vue根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况。



# vue2 的 响应式

```javascript
class Emvue {
    constructor(options){
        //保存选项
        this.$options=options

        //传入data选项
        this.$data=options.data

        //响应化
        this.observe(this.$data)
    }

    observe(value){
        //如果 值为空 或者不是对象  

        if(!value||typeof value!=='object'){
            return
        }
        //遍历数据响应式
        Object.keys(value).forEach(key=>{
            this.defineReactive(value,key,value[key])

            //代理转发  简化使用调用的$data 对象
            this.proxyData(key)
        })
    }


    defineReactive(obj,key,val){
        //递归遍历 
        this.observe(val)

        Object.defineProperty(obj,key,{
            get(){
                return val
            },
            set(NewVal){
                if(NewVal!==val){
                    val=NewVal
                    console.log(key+'属性更新了')
                }
            }
        })
    }

    proxyData(key){      //代理转发
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(NewVal){
                this.$data[key]=NewVal
            }
        })
    }

}
```

