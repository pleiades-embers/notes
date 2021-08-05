## 1. 课程简介

 本课程主题是“Vue高级特性实现方法”。课程有一定的难度，我假设你对Vue API有基本的了解。当然，如果你有其他框架使用经验，例如angular和react也是可以的，因为他们的概念都是相似的。课程主要给大家介绍Vue原理性内容，这些特性是如何从想法到最终实现的。

#### 1.1 课程大纲

1. 响应性
2. 插件编写
3. 渲染函数
4. 状态管理
5. 路由
6. 表单验证
7. 国际化

## 2. 响应性

响应性是 Vue的一个核心特性，用于监听视图中绑定的数据，当数据发生改变时视图自动更新。人们往往对响应性这个术语有一些误解或困惑，会认为响应性就是类似RX之类的响应性编程。但是在这里只要状态发生改变，系统依赖部分发生自动更新就可以称为响应性。在 web应用中，数据的变化如何响应到DOM中，就是Vue解决的问题。

####2.1 响应性问题

假设我们有个需求，b永远等于a的十倍，如果使用命令式编程，可以很简单实现，可以像下面这样实现，但是当我们把a设置成4时，b还是等于30

```js
let a = 3;
let b = a * 10；
console.log(b) // 30
a = 4
console.log(b) // 30 
```

为了让b等于a的10倍，那我们需要重新设置b的值，像下面代码

```js
let a = 3;
let b = a * 10；
console.log(b) // 30
a = 4;
b = a * 10; // 新增代码
console.log(b) // 40 
```

假设我们有一个神奇函数叫`onAchange`，它接收一个函数并且当a改变时自动被执行，这时候可以对b重新赋值，那上面的问题就解决了，那这个函数如何实现是问题的关键。

```js
onAchange(() => {
  b = a * 10
})
```

再举个更贴合web开发的例子，下面代码同样有一个神奇函数`onStateChange`，它会在`state`改变的时候自动运行，那我们只要在函数中编写dom操作的代码，就可以实现dom的自动更新了

```html
// DOM元素
<span class="cell b1"></span>

// 神奇函数，当state值改变会自动重新运行
onStateChange(() => {
  document.querySelector('.cell.b1').textContent = state.a * 10
})
```

我们再进一步抽象，把dom的操作使用渲染引擎替换，但是我们不去研究渲染引擎的实现，只是简单的认为它会自动解析模版代码与数据关联即可，那代码就会变成下面这样。

```html
// DOM元素
<span class="cell b1">
	{{ state.a * 10 }}
</span>

// 神奇函数，当state值改变会自动重新运行
onStateChange(() => {
  view = render(state)
})
```

现在解决问题的核心就是如何实现onStateChange这个方法了，看到下面代码就是它具体的实现，首先定一个外部`update`变量用于记录调用`onStateChanged`时传入的函数，如果需要改变state就必须调用`setState`方法，我们只需要在`setState`方法内部重新调用之前保存的`update`方法，即可达成自动更新。

```js
let update;
const onStateChanged = _update => {
  // 把传入的_update函数保存给外部变量
  update = _update;
}

// 用户更新数据必须调用setState函数,函数内把新的state更新并调用update方法
const setState = newState => {
  state = newState;
  update();
}
```

调用例子，如果你有react开发经验，会发现这和react修改数据调用方法是一样的

```js
onStateChanged(() => {
  view = render(state) // 这里抽象的视图渲染伪代码，可以简单的理解为在更新视图
})

setState({ a: 5 })
```

其实在angular中，我们是不需要调用setState方法来更新数据，可以直接`state.a = 5`对变量赋值，即可触发视图更新。angular使用脏值检测的方式，拦截你的事件然后判断值是否改变。

```js
onStateChanged(() => {
  view = render(state) // 这里抽象的视图渲染伪代码，可以简单的理解为在更新视图
})

state.a = 5 // 在angualr中，直接赋值即可触发视图更新
```

但是在Vue中实现方法不太一样，通过`Object.defineProperty`修改对象属性的`getter`和`setter`让对象具有响应性，这种基于依赖跟踪的方式其实就是vue.js、konckout.js等框架实现的原理。

#### 2.1 getter和setter

ES5的[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)提供监听属性变更的功能，下面将演示如何通过`covert`函数修改传入对象的`getter`和`setter`实现修改对象属性时打印日志的功能。

```js
const obj = { foo: 123 }
convert(obj) 
obj.foo // 需要打印: 'getting key "foo": 123'
obj.foo = 234 // 需要打印: 'setting key "foo" to 234'
obj.foo // 需要打印: 'getting key "foo": 234'
```

covert函数实现如下：

```js
function convert (obj) {
  // Object.keys获取对象的所有key值，通过forEach对每个属性进行修改
  Object.keys(obj).forEach(key => {
    // 保存属性初始值
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        console.log(`getting key "${key}": ${internalValue}`)
        return internalValue
      },
      set (newValue) {
        console.log(`setting key "${key}" to: ${newValue}`)
        internalValue = newValue
      }
    })
  })
}
```

#### 2.2 依赖跟踪（订阅发布模式）

需要实现一个依赖跟踪类`Dep`，类里有一个叫`depend`方法，该方法用于收集依赖项；另外还有一个`notify`方法，该方法用于触发依赖项的执行，也就是说只要在之前使用`dep`方法收集的依赖项，当调用`notfiy`方法时会被触发执行。

下面是`Dep`类期望达到的效果，调用`dep.depend`方法收集收集依赖，当调用`dep.notify`方法，控制台会再次输出`updated`语句

```js
const dep = new Dep()

autorun(() => {
  dep.depend()
  console.log('updated')
})
// 打印: "updated"

dep.notify()
// 打印: "updated"
```

`autorun`函数是接收一个函数，这个函数帮助我们创建一个响应区，当代码放在这个响应区内，就可以通过dep.depend方法注册依赖项

最终实现的Dep类代码如下：

```js
window.Dep = class Dep {
  constructor () {
    // 订阅任务队列，方式有相同的任务，用Set数据结构简单处理
    this.subscribers = new Set()
  }
	// 用于注册依赖项
  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }
	// 用于发布消息，触发依赖项重新执行
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

let activeUpdate = null

function autorun (update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}
```

#### [#](https://vue-course-doc.vercel.app/#_2-3-实现迷你观察者)2.3 实现迷你观察者

我们将2.1和2.2的两个练习整合到一起，实现一个小型的观察者，通过在getter和setter中调用`depend`方法和`notfiy`方法，就可以实现自动更新数据的目的了，这也是Vue实现自动更新的核心原理。

期望实现的调用效果：

```js
const state = {
  count: 0
}

observe(state)

autorun(() => {
  console.log(state.count)
})
// 打印"count is: 0"

state.count++
// 打印"count is: 1"
```

最终整合代码如下：

```js
class Dep {
  constructor () {
    this.subscribers = new Set()
  }

  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }

  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

function observe (obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]

    const dep = new Dep()
    Object.defineProperty(obj, key, {
      // 在getter收集依赖项，当触发notify时重新运行
      get () {
        dep.depend()
        return internalValue
      },

      // setter用于调用notify
      set (newVal) {
        const changed = internalValue !== newVal
        internalValue = newVal
        if (changed) {
          dep.notify()
        }
      }
    })
  })
  return obj
}

let activeUpdate = null

function autorun (update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}
```

## [#](https://vue-course-doc.vercel.app/#_3-插件编写)3. 插件编写

大家平时应该都有使用过插件，使用插件需要调用`Vue.use(plugin)`声明，接下来讲解如何编写自定义插件。

### [#](https://vue-course-doc.vercel.app/#_3-1-插件简介)3.1 插件简介

插件本质是一个普通函数，第一个参数是Vue，第二个参数是可选参数叫`options`

```js
function (Vue, options) {
  //...插件代码
}
```

插件往往结合`vue.mixin(options)`使用，`mixin`本质上是把重复的代码片段混入到Vue组件中，供组件复用逻辑。但是`vue.mixin`是一个全局api，它会应用到所有实例，所以不要在这个API做疯狂的事情。

使用`vue.mixin`更好的办法是使用插件包裹，因为插件会自动删除，而且就算多次调用`Vue.use`应用同一个插件，它会防止重复应用，但是`vue.mixin`就不行了。另外使用`Vue.use`会让代码更好理解，可以清楚知道应用使用了哪些插件。

### [#](https://vue-course-doc.vercel.app/#_3-2-options属性)3.2 $.options属性

很多人可能不太清楚`$.options`属性，其实每个组件都有`$.options`属性它表示实例组件的配置项，配置项可以是组件自身的配置也可以是继承过来的配置项或者是`vue.mixin`混入的。

### [#](https://vue-course-doc.vercel.app/#_3-3-编写一个插件)3.3 编写一个插件

**目标：**编写一个插件让Vue组件可接收一个自定义属性"rules"，该选项接收一些验证规则用于验证组件内data数据

**期望的使用方式：**

```js
const vm = new Vue({
  data: { foo: 10 },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than one'
    }
  }
})

vm.foo = 0 // should log: "foo must be greater than one"
```

**开发要点：**

1. 插件包含一个全局的mixin
2. 全局mixin包含一个"created"钩子
3. 在create函数中，验证`this.$options.rules`

**最终实现效果：**

```js
// 插件代码
const myPlugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        // 获取实例的rules配置项
        const rules = this.$options.rules;
        if (rules) {
          // rules支持多个规则，需要循环
          Object.keys(rules).forEach((key) => {
            const rule = rules[key];
            // 使用watch不断监听值的变化
            this.$watch(key, (newValue) => {
              const valid = rule.validate(newValue);
              if (!valid) {
                console.log(rule.message);
              }
            });
          });
        }
      }
    });
  }
};
Vue.use(myPlugin);
```

**Vue组件使用代码：**

```js
export default {
  name: "App",
  data() {
    return {
      name: "zgr"
    };
  },
  rules: {
    name: {
      validate: value => value.length > 3,
      message: "名字长度需要大于3"
    }
  }
};
```

[线上查看代码](https://codesandbox.io/s/nervous-worker-00ihy)

开发插件前，最好的办法是从API的使用方式开始设计，一开始考虑别人使用插件的时候怎么使用才方便去设计API，然后组合Vue底层语法实现一个高级插件。

## [#](https://vue-course-doc.vercel.app/#_4-渲染函数)4. 渲染函数

![image-20200829121317435](https://vue-course-doc.vercel.app/assets/img/image-20200829121317435.f7e0aad9.png)

**Vue编译第一阶段：**

在Vue中，渲染系统是组成响应系统的另外一半，Vue的templates实际上是通过渲染函数渲染出来的，如果你把模版直接传入Vue实例那Vue会执行完整的编译，把传入的template编译为浏览器可运行的DOM。

如果使用Vue CLI构建项目，会用到webpack和vue-loader，实际上vue-loader会在构建阶段实现预编译，把模版代码编译为浏览器可直接解析的DOM代码。另外，Vue还提供了用于编译的渲染函数，它类似angular的ALT编译模式，那应用就可以运行未编译版本。

两种编译模式，一种会把编译器打包进去，一个直接把代码预先编译，包含编译器版本经过gzip压缩大概30KB，不包含编译器版本大概20KB，所以预先编译会更好。

**Vue编译第二阶段：**

经过第一阶段编译为render函数后，render函数实际上是返回虚拟DOM，接着Vue基于虚拟DOM生成真实DOM。

**虚拟DOM更新机制**：

回顾之前讲的`autorun`函数，其实我们可以把生成虚拟DOM的代码放在`autorun`函数里面，因为渲染函数与所有data属性有依赖关系，当属性发生变化那就触发`autorun`函数然后重新生成新的虚拟DOM，新的虚拟DOM和旧的虚拟DOM进行比较，更新差异的节点再生成真实DOM完成视图更新。

### [#](https://vue-course-doc.vercel.app/#_4-1-虚拟dom)4.1 虚拟DOM

![Screenshot020-08-219.19.20](https://vue-course-doc.vercel.app/assets/img/Screenshot020-08-219.19.20-8699982.1b4fcb04.png)

**真实DOM：**大家都知道DOM API，例如调用`documnt.createElement`创建一个真实div节点插入到DOM文档流中，这个原生API实际上是通过使用C++编写的浏览器引擎实现的，我们不需要了解C++是如何实现的，只需要调用javascript api就可以创建真实DOM。你可以通过在浏览器打印DOM节点，会发现它包含很多属性。

**虚拟DOM：**在Vue中的虚拟DOM会在每个实例通过this.$createElement返回一个虚拟节点，这个虚拟节点也表示一个div但他是一个纯javascript对象，他和真实DOM差异是非常大的。看到上图虚拟DOM它除了包含当前节点名字和属性，还有children表示节点的子元素，这就构成了一个虚拟DOM树。

**虚拟DOM和真实的DOM的差异**：

1、 资源消耗问题

使用javascript操作真实DOM是非常消耗资源的，虽然很多浏览器做了优化但是效果不大。你看到虚拟DOM是一个纯javascript对象。假设你有1000个节点，那会相应创建1000个节点，那也是非常节省资源的，但是如果创建1000个DOM节点就不同了。

2、执行效率问题

如果你要修改一个真实DOM，一般调用`innerHTML`方法，那浏览器会把旧的节点移除再添加新的节点，但是在虚拟DOM中，只需要修改一个对象的属性，再把虚拟DOM渲染到真实DOM上。很多人会误解虚拟DOM比真实DOM速度快，其实虚拟DOM只是把DOM变更的逻辑提取出来，使用javascript计算差异，减少了操作真实DOM的次数，只在最后一次才操作真实DOM，所以如果你的应用有复杂的DOM变更操作，虚拟DOM会比较快。

3、虚拟DOM还有其他好处

其实虚拟DOM还可以应用在其他地方，因为他们只是抽象节点，可以把它编译成其他平台，例如android、ios。市面上利用形同架构模式的应用有React Native，Weeks，Native script，就是利用虚拟DOM的特点实现的。

### [#](https://vue-course-doc.vercel.app/#_4-2-虚拟dom在线查看)4.2 虚拟DOM在线查看

使用Vue Template Explorer可以查看Vue是如何转换虚拟DOM的。

[访问地址](https://template-explorer.vuejs.org/)

### [#](https://vue-course-doc.vercel.app/#_4-3-template和jsx对比)4.3 template和jsx对比

前端社区谈论关于JSX渲染与模板的问题，喜欢模板的人讨厌JSX，喜欢JSX的人讨厌模板；其实我认为他们并没有什么区别，他们的本质都是声明DOM与状态的关系。

**模版的优势**：模版是一种更静态更具有约束的表现形态，它可以避免发明新语法，任何可以解析HTML的引擎都可以使用它，迁移成本更低；另外最重要的是静态模版可以在编译进行比较多的优化，而动态语言就没法实现了。

**jsx的优势**：更灵活，任何的js代码都可以放在jsx中执行实现你想要的效果，但是也由于他的灵活性导致在编译阶段优化比较困难，只能通过开发者自己优化。

Vue吸收了两者的优点，提供了两种渲染模式，Vue把template作为默认的编译模式，如果你需要构建更灵活的应用，完全可以使用render function实现。

### [#](https://vue-course-doc.vercel.app/#_4-4-render-function-api)4.4 Render Function API

![Screenshot2020-08-3022.59.03](https://vue-course-doc.vercel.app/assets/img/Screenshot2020-08-3022.59.03.ad3ec34a.png)

上图是调用一个渲染函数例子，`render`函数接收一个参数`h`， `h`只是一种约定的简写表示超脚本（HyperScript），他没有什么特殊意义，只是就像超文本我们叫HTML一样，只是方便书写的表示形式而已。

`h`函数接受三个参数，第一个是元素类型；第二是参数对象例如表示元素的attr属性，DOM属性之类的；第三个属性表示一些子节点，你可以调用h函数生成更多子节点。

![30t23.06.38](https://vue-course-doc.vercel.app/assets/img/30t23.06.38.79df0758.png)

例如上图，第二个参数是可以省略的，第三参数很灵活可以是数组或者单纯的文本。

例一表示创建一个只包含`some text`文本的div；例二表示创建一个具有`class=foo`的div；例三表示包含一个子节点span。

![Screenshot2020-08-30 at23.12.39](./README.assets/Screenshot2020-08-30 at23.12.39.png)

其实你也可以把组件作为参数传入给`h`函数进行渲染。

### [#](https://vue-course-doc.vercel.app/#_4-5-动态渲染标签)4.5 动态渲染标签

我需要编写一个组件，组件根据`tags`属性在页面上输入相应的HTML标签，如果使用模板技术实现，会让代码变得臃肿，需要通过`if`语句判断不同标签。所以这里可以利用渲染函数来实现，下面是具体实现代码。

```html
<div id="demo_4_5">
    <example :tags="['h1', 'h2', 'h3']"></example>
</div>
Vue.component('example', {
    props: ['tags'],
    render(h) {
		// 第二参数是可选参数，可接受vnodes类型的数组，数组可以是数字和字符串
        return h('div', this.tags.map((tag, i) => h(tag, i)))
    }
})
new Vue({ el: '#demo_4_5' })
```

**运行效果**：

# 0

## 1

### 2



#### [#](https://vue-course-doc.vercel.app/#_4-5-1-函数组件和状态组件)4.5.1 函数组件和状态组件

函数组件就是不包含state和props的组件，就像它的名字一样，你可以理解为他就是一个函数，在Vue中声明一个函数组件代码如下：

```js
const foo = {
	functional: true,
    render: h => h('div', 'foo')
}
```

函数组件特点：

1. 组件不支持实例化。
2. 优化更优，因为在Vue中它的渲染函数比父级组件更早被调用，但是他并不会占用很多资源，因为它没有保存数据和属性，所以它常用于优化一个有很多节点的组件。
3. 容易扩展，如果你的组件只是用来接收 prop然后显示数据，或者一个没有状态的按钮，建议使用函数组件。
4. 函数组件没有this，获取prop可以通过render函数的第二参数得到`render(h, context)`

**使用函数组件改在4.5案例**：

```js
    Vue.component('example', {
        functional: true, // 声明是函数组件
        // 因为函数组件没有this,可以通过render第二参数获取相关信息
        render(h, { props: { tags } }) {
            // context.slots() 通过slots方法获取子节点
            // context.children 获取子组件
            // context.parent 父组件，因为函数组件实挂载到根节点上，也就是<div id="app"></div>
            // context.props 组件属性，这里得到tags属性
            // return h('div', this.tags.map((tag, i) => h(tag, i)))
            // 通过函数组件实现标签动态渲染
            return h('div', tags.map((tag, i) => h(tag, i)))
        }
    })
```

### [#](https://vue-course-doc.vercel.app/#_4-6-动态渲染组件)4.6 动态渲染组件

渲染函数除了可以渲染普通标签外，还可以渲染组件，下面代码有`Foo`和`Bar`组件，点击`toggle`按钮的时候，切换两组件的显示状态。

```html
<div id="demo_4_6">
    <example :ok="ok"></example>
    <button @click="ok = !ok">toggle</button>
</div>
const Foo = {
    render(h) {
        return h('div', 'foo')
    }
}

const Bar = {
    render(h) {
        return h('div', 'bar')
    }
}
Vue.component('example', {
    props: ['ok'],
    render(h) {
        return h(this.ok ? Foo : Bar)
    }
})
new Vue({ el: '#demo_4_6', data: { ok: true } })
```

**运行效果**：

foo

toggle



### [#](https://vue-course-doc.vercel.app/#_4-7-整合渲染函数和响应系统)4.7 整合渲染函数和响应系统

![Screenshot2020-08-2922.50.01](https://vue-course-doc.vercel.app/assets/img/Screenshot2020-08-2922.50.01.8443bb85.png)

上图是Vue的响应性系统和渲染系统的运行流程，可以看到每个组件有自己的渲染函数，这个渲染函数实际上是运行在我们之前封装的`autorun`函数中的，组件开始渲染时会把属性收集到依赖项中，当调用属性的setter方法，会触发`watcher`执行重新渲染，因为渲染函数放在`autorun`函数中，所以每当data数据发生变化，就会重新渲染。

每个组件都有自己独立的循环渲染系统，组件只负责自己的依赖项，这一特性对于你拥有大型组件树时是一个优势，你的数据可以在任何地方改变，因为系统知道数据与组件的对应关系，不会造成过度渲染问题，这一架构优势可以让我们摆脱一些优化工作。

## [#](https://vue-course-doc.vercel.app/#_5-高阶函数)5. 高阶函数

高阶函数在函数式编程中经常出现，就是你原本有一个函数，你可以通过另外一个函数进行包裹，这个新的函数既具有原来函数的功能，又可以添加自己的功能，这种方式成为高阶函数，听起来会比较抽象。

看看下面的案例：

我们希望在页面上显示用户头像，看到`Avatar`组件，它接收一个`src`属性并显示到`img`标签。这个组件非常简单，但是在使用的时候不是很方便，因为我们需要传递一个完整的图片地址给它。我们使用的时候，希望只传递用户的名字就可以显示头像图片，这种场景使用高阶组件实现是最合适的。

`withAvatarURL`函数接收一个内部组件，然后返回一个高阶函数，在这个例子中，内部组件就是`Avatar`，然后我们可以接收一个用户名，再通过用户名查询用户头像URL显示到页面上。

`this.$attrs`用于获取组件所有属性，这是2.4之后才支持的功能，下面代码我们把高阶组件设置的属性传递给原始组件。

```js
// 该函数只是用来模拟网络请求
function fetchURL (username, cb) {
  setTimeout(() => {
    // hard coded, bonus: exercise: make it fetch from gravatar!
    cb('https://avatars3.githubusercontent.com/u/6128107?v=4&s=200')
  }, 500)
}

// 基础组件，只负责把传入src属性显示到一个图片标签
const Avatar = {
  props: ['src'],
  template: `<img :src="src">`
}

function withAvatarURL (InnerComponent) {
  return {
    props: ['username'],
    inheritAttrs: false, // 2.4 only
    data () {
      return { url: null }
    },
    created () {
      fetchURL(this.username, url => {
        this.url = url
      })
    },
    render (h) {
      return h(InnerComponent, {
        attrs: this.$attrs, // 2.4 only
        props: {
          src: this.url || 'http://via.placeholder.com/200x200'
        }
      })
    }
  }
}

const SmartAvatar = withAvatarURL(Avatar)

new Vue({
  el: '#app',
  components: { SmartAvatar }
})
```

### [#](https://vue-course-doc.vercel.app/#_5-1-高阶函数和mixin的选择)5.1 高阶函数和mixin的选择

在上面案例的场景中，其实用minxin也是可以实现的，但是使用高阶组件有以下优势：

1. **重用性**。因为minxin对原组件具有侵入性，这会导致原来组件的可重用性降低，而高阶组件不会，高阶组件对原组件只是一个调用关系，并没有修改原来组件任何内容。
2. **可测试性**。因为高阶组件只是一个嵌套关系，在组件测试的时候，可以单独的测试原始组件和高阶组件。
3. **层级问题**。高阶组件也有他的弊端，如果你高阶组件嵌套层级太深，会导致出错的时候调试困难的问题，所以到底使用高阶组件和minxin需要看实际场景。

## [#](https://vue-course-doc.vercel.app/#_6-状态管理)6. 状态管理

前端以前是没有状态管理的，直到Fackbook提出一个叫Flux的概念，才有了状态管理。

以前前端是通过MVC模式管理代码，但后来我们使用例如Vue、React、Angular这类通过声明式开发的框架，发现状态很难管理，容易出现状态被任意修改。当应用越来越大，这种不确定性会导致系统不稳定，而且定位bug也变得困难。

Flux是一种关于单向数据流的思想。