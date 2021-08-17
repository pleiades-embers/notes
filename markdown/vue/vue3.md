### Vue3.0 里为什么要用 Proxy API 替代 defineProperty API？—— 响应式优化
a. defineProperty API 的局限性最大原因是它只能针对单例属性做监听。

Vue2.x中的响应式实现正是基于defineProperty中的descriptor，对 data 中的属性做了遍历 + 递归，为每个属性设置了 getter、setter。
这也就是为什么 Vue 只能对 data 中预定义过的属性做出响应的原因，在Vue中使用下标的方式直接修改属性的值或者添加一个预先不存在的对象属性是无法做到setter监听的，这是defineProperty的局限性。
b. Proxy API的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作， 这就完全可以代理所有属性，将会带来很大的性能提升和更优的代码。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
c. 响应式是惰性的

在 Vue.js 2.x 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的，这无疑会有很大的性能消耗。
在 Vue.js 3.0 中，使用 Proxy API 并不能监听到对象内部深层次的属性变化，因此它的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，简单的可以说是按需实现响应式，减少性能消耗。
```javascript
    let datas = {
        num: 0
    }
    let proxy = new Proxy(datas, {
        get(target, property) {
            return target[property]
        },
        set(target, property, value) {
            target[property] += value
        }
    })
```

### 生成 Block tree
Vue.js 2.x 的数据更新并触发重新渲染的粒度是组件级的，单个组件内部 需要遍历该组件的整个 vnode 树。
在2.0里，渲染效率的快慢与组件大小成正相关：组件越大，渲染效率越慢。并且，对于一些静态节点，又无数据更新，这些遍历都是性能浪费。
Vue.js 3.0 做到了通过编译阶段对静态模板的分析，编译生成了 Block tree。 
Block tree 是一个将模版基于动态节点指令切割的嵌套区块，每个 区块内部的节点结构是固定的，每个区块只需要追踪自身包含的动态节点。
所以，在3.0里，渲染效率不再与模板大小成正相关，而是与模板中动态节点的数量成正相关。


### slot 编译优化
Vue.js 2.x 中，如果有一个组件传入了slot，那么每次父组件更新的时候，会强制使子组件update，造成性能的浪费。
Vue.js 3.0 优化了slot的生成，使得非动态slot中属性的更新只会触发子组件的更新。
动态slot指的是在slot上面使用v-if，v-for，动态slot名字等会导致slot产生运行时动态变化但是又无法被子组件track的操作。


### Vue3.0新特性 —— Composition API 与 React.js 中 Hooks的异同点

a. React.js 中的 Hooks 基本使用

React Hooks 允许你 "勾入" 诸如组件状态和副作用处理等 React 功能中。Hooks 只能用在函数组件中，并允许我们在不需要创建类的情况下将状态、副作用处理和更多东西带入组件中。
React 核心团队奉上的采纳策略是不反对类组件，所以你可以升级 React 版本、在新组件中开始尝试 Hooks，并保持既有组件不做任何更改。
```javascript
import React, { useState, useEffect } from "react";
 
 
const NoteForm = ({ onNoteSent }) => {
  const [currentNote, setCurrentNote] = useState("");
  useEffect(() => {
    console.log(`Current note: ${currentNote}`);
  });
  return (
    <form
      onSubmit={e => {
        onNoteSent(currentNote);
        setCurrentNote("");
        e.preventDefault();
      }}
    >
      <label>
        <span>Note: </span>
        <input
          value={currentNote}
          onChange={e => {
            const val = e.target.value && e.target.value.toUpperCase()[0];
            const validNotes = ["A", "B", "C", "D", "E", "F", "G"];
            setCurrentNote(validNotes.includes(val) ? val : "");
          }}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};
```
useState 和 useEffect 是 React Hooks 中的一些例子，使得函数组件中也能增加状态和运行副作用。
我们也可以自定义一个Hooks，它打开了代码复用性和扩展性的新大门。
b. Vue Composition API 基本使用

Vue Composition API 围绕一个新的组件选项 setup 而创建。setup() 为 Vue 组件提供了状态、计算值、watcher 和生命周期钩子。
并没有让原来的 API（Options-based API）消失。允许开发者 结合使用新旧两种 API（向下兼容）。
```javascript
<template>
  <form @submit="handleSubmit">
    <label>
      <span>Note:</span>
      <input v-model="currentNote" @input="handleNoteInput">
    </label>
    <button type="submit">Send</button>
  </form>
</template>
 
 
<script>
import { ref, watch } from "vue";
export default {
  props: ["divRef"],
  setup(props, context) {
    const currentNote = ref("");
    const handleNoteInput = e => {
      const val = e.target.value && e.target.value.toUpperCase()[0];
      const validNotes = ["A", "B", "C", "D", "E", "F", "G"];
      currentNote.value = validNotes.includes(val) ? val : "";
    };
    const handleSubmit = e => {
      context.emit("note-sent", currentNote.value);
      currentNote.value = "";
      e.preventDefault();
    };
 
 
    return {
      currentNote,
      handleNoteInput,
      handleSubmit,
    };
  }
};
</script>
```
c. 原理

React hook 底层是基于链表实现，调用的条件是每次组件被render的时候都会顺序执行所有的hooks。
vue hook 只会被注册调用一次，vue 能避开这些麻烦的问题，原因在于它对数据的响应是基于proxy的，对数据直接代理观察。
（这种场景下，只要任何一个更改data的地方，相关的function或者template都会被重新计算，因此避开了react可能遇到的性能上的问题）。
react 中，数据更改的时候，会导致重新render，重新render又会重新把hooks重新注册一次，所以react复杂程度会高一些。
