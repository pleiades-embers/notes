### axios 并发请求

```javascript
    this.$http.all([this.$http.get("aaa"), this.$http.get("bbb")]).then(     //发送并发请求
      this.$http.spread((res1, res2) => {   //将获取到的数组展开
        console.log(res1);
        console.log(res2);
      })
    )
```

### 事件总线

任意两个组件之间传值常用事件总线 或 vuex得方式

```javascript
// Bus: 事件派发、监听和回调管理
class Bus{
    constructor(){
        this.callbacks={}
    }
    $on(name,fn){
		this.callbacks[name]=this.callbacks[name]||[]
        this.callbacks[name].push(fn)
    }
    $emit(name,args){
		if(this.callbacks[name]){
            this.callbacks[name].forEach(cb=cb(args))
        }
    }
}

//main.js
Vue.prototype.$bus=new Bus()

//child1
this.$bus.$on('foo',handle)

//child2
this.$bus.$emit('foo')
```

### $parent/$root

兄弟组件之间通信可通过共同祖辈搭桥,$parent或$root

```vue
//brother1
this,$parent.$on('foo',handle)

//brother2
this.$parent.$emit('foo')
```

### $children

父组件可以通过$children访问子组件实现父子通信

```
//parent
this.$children[0].xx='xxx'
```

### $attrs/$listeners

包含了父作用域种不作为prop被识别(且获取)得特性绑定(class 和 style 除外).当一个组件没有声明任何prop时,这里会包含所有父作用域得绑定(class 和 style 除外),并且可以通过v-bind="$attrs" 传入内部组件——在创建高级别得组件时非常有用

```javascript
//child:并未在props种声明 foo
<p>{{$attrs.foo}}</p>

//parent
<Helloword foo="foo"/ >
```

##  实现弹窗组件

弹窗这类组件得特点是他们在当前vue实例之外独立存在,通常挂载于body:它们是通过js动态创建得,补需要在任何组件中声明.常见使用姿势

```javascript
this.$create(Notice,{
	title:'搬砖',
	message:'提示信息',
	duration:1000
}).show()
```

create.js

```javascript
import Vue from 'vue'
//传入一个组件配置
//创建它得实例,并且将它挂载到body上
export default function create(Component,props){
    //实例创建
    //作业:使用extend方式创建组件实例并挂载
    //Vue.extend()
   	Vue.extend()
    //方式二:借鸡生蛋
	new Vue({
        render(h){
            return h(Component,{props})
        }
    }).$mount()  //$mount() 本质上将vdom=>dom
    
    //通过vm.$el 获取生成得dom
    document.body.appendChild(vm.$el)
    
    //删除函数
    //获取组件实例
    const comp=vm.$children[0]
    
    comp.remove=()=>{
        documnet.body.removeChild(vm.$el)
        vm.$destory()
    }
    
    return comp
}
```

解决 this.$parent.$emit('validate') 得低耦合问题

```javascript
//广播:自上而下派发事件
function broadcast(componentName,evenName,params){
    //遍历所有子元素
	this.$children.forEach(child=>{
        var name=child.$options.componentName
        
        if(name==componentName){
			child.$emit.apply(child,[eventName].concat(params))
        }else {
            broadcast.apply(child,[componentName,eventName].concat(params))
        }
    })
}


//冒泡查找componentName 相同得组件并派发事件
dispatch(componentName,eventName,params){
    var parent=this.$parent||this.$root
    var name=parent.$options.componentName
    
    //向上查早知道找到相同名称得组件
    while(parent &&(!name||name !==componentName)){
        parent=parent.$parent
        
        if(parent){
            name=parent.$options.componentName
        }
        
	}
}

```

