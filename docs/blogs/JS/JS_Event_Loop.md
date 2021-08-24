---
title: JavaScript的运行机制——到底什么是Event Loop?
---

在看面经的时候发现经常会有读代码给出打印结果的题目，就像下面这段代码：

```js
console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

Promise.resolve()
    .then(function () {
    console.log('promise1');
})
    .then(function () {
    console.log('promise2');
});

console.log('script end');
```

显然，这是在考察面试者对JS运行机制的理解。为了搞清楚这段代码究竟会按何种顺序打印出结果，我们需要知道JavaScript引擎的具体运行机制，理解JS的事件循环（Event Loop）这个核心概念。

## 一、单线程

JavaScript是一门单线程语言，这是JS运行机制的基础知识点。单线程意味着JavaScript同一时间只能做一件事，这件事做完了再做另一件。一开始我对JS的这个特性感到费解，毕竟在我以前接触的编程语言（Java、Python），都对多线程编程有着完善支持，“多线程意味着更高的效率”，我的脑子不自觉得形成这样的观点。

然而，JS的单线程特性也很容易理解。在Node.js出世之前，JavaScript就只是作为浏览器脚本语言存在的，其主要用途就是与用户互动，操作DOM，目标功能决定了单线程这一灵魂设计。为了避免复杂的同步问题和潜在的并发错误（多个线程同时操作DOM是难以想象的），将JavaScript设计为单线程是十分合情合理的。阮一峰前辈在[博客](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)中这样断言：

> 为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

## 二、任务队列

在理解了JavaScript的单线程特性后，你可能感到更疑惑了，既然是单线程，输出顺序这一问题又是怎么产生的呢？是的，我们都知道JavaScript是能够进行**异步操作**的，但是这些异步操作却不是依赖多线程来实现的，而是借助**任务队列**。

JavaScript的异步操作需求是为了更佳的性能和更好的用户体验。对于那些耗时性的任务（定时器、Ajax网络请求等），JavaScript会将这些任务交给那些擅长处理对应任务的其他线程（浏览器的渲染进程本身是多线程的），然后忙自己的。这些异步任务在有了运行结果后就会被放入任务队列中，等到JS主线程的后续处理。尽管到这我们尚未厘清具体的处理顺序，但是借助任务队列，JavaScript确实能实现异步操作了。

## 三、事件循环

为了搞清楚JavaScript对同步任务和异步任务具体的处理逻辑，我们需要完善对JavaScript引擎的认识，为了便于理解，可以简单地将JavaScript看做两部分：

- 内存堆：分配内存的地方，对象等引用数据类型存储在堆中
- 执行栈：执行任务的地方，用于管理任务执行的顺序，报错时能看到的层次结构的错误代码溯源定位就要归功于执行栈

所有需要被执行的任务，都会被压入执行栈中执行，在执行完毕后出栈。这些任务包括同步任务和异步任务。同步任务首先在主线程上排队执行。异步任务则在其他线程将其处理完毕后就会进入任务队列等待执行。

为了更加直观地理解这一过程，请看下图：

<img src="https://github.com/MogoMec/blog/blob/master/img/eventloop.jpg?raw=true" style="zoom:150%;" />

具体而言，JavaScript引擎的任务执行机制是这样的：

- 同步任务会被`push`进执行栈，执行完毕后会`pop`出栈
- 同时异步操作会被交给其他线程处理，处理完毕后，会将该异步操作（通常以回调函数形式）放入任务队列
- 所有同步任务执行完毕后（此时执行栈为空），从任务队列（先进先出）中取出任务进行执行
- JavaScript引擎会重复以上步骤（主要是执行栈为空后从任务队列中取出下一个任务），所以该机制被称为**事件循环**

需要注意的是，异步任务又被细分为了宏任务和微任务，对应着宏任务队列和微任务队列，微任务和宏任务的概念与`Promise`息息相关。当执行栈为空。从任务队列中选择下一个任务时，**微任务队列的优先级总是高于宏任务队列**的。让我们来看看都有典型的异步任务：

宏任务（由宿主发起）包括：

- `setTimeout`、`setInterval`等定时操作
- `script`：整体脚本代码本身被视为一个宏任务，所以你也可以认为，异步任务是先执行一个宏任务，再依次执行所有存在于微任务队列的微任务（注意：微任务执行过程中产生的新的微任务也会先于下一个宏任务执行）

微任务（由JS引擎自身发起）包括;

- `Promise`的回调（不包括创建Promise对象本身）
- [`requestAnimationFrame`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
- [`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
- [`queueMicrotask`](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask)

现在我们可以来分析开头给出的代码了：

1. `'script'`作为第一个宏任务最先被执行，输出同步语句`'script start'`。

2. `setTimeout`作为宏任务被放入宏任务队列（时延为0）。

3. 第一个`Promise.then`操作作为微任务被放入微任务队列，第二个`Promise.then`操作由于第一个`Promise`尚未`resolve`故没有处理。

4. 输出同步语句`’script end‘`，宏任务`'script'`执行完毕，出栈，执行栈为空。

5. 执行微任务队列中的所有微任务，执行第一个`Promise.then`，输出`'promise1'`，生成新的`Promise`对象，第二个`Promise.then`被加入微任务队列。

6. 执行第二个`Promise.then`，输出`'promise2'`，微任务队列清空。

7. 执行下一个宏任务`setTimeout`，输出`‘setTimeout’`

8. 所以，输出为：

   ```
   script start
   script end
   promise1
   promise2
   setTimeout
   ```

更直观的动画演示请见[Tasks, microtasks, queues and schedules - JakeArchibald.com](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)。动画中给出了更明确的执行栈、任务队列的状态演示，也有更丰富的例子。

## 四、微任务

或许你会奇怪为什么会有微任务概念的产生，在我的理解中，微任务是为了维护一份异步中的同步（连续性）。在没有微任务机制时，我们难以确定异步任务的出队时间也就难以保证异步操作的连续性和确定性。或许你可以使用层层嵌套的回调函数来解决这个问题，但是这会造成回调地狱。我们都知道`Promise`的诞生是为了成为更好更优雅更便于调试的异步编程方案，解决回调地狱的问题，所以它是和微任务机制高度绑定的。在微任务机制下，`Promise`的链式调用才不至于割裂，串行异步代码才得以优雅实现。





