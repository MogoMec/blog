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

JavaScript是一门单线程语言，这是JS运行机制的基础知识点。单线程意味着JavaScript同一时间只能做一件事，这件事做完了再做另一件。一开始我对JS的这个特性感到费解，毕竟在我以前接触的编程语言（Java、Python），都对多线程编程有着完善支持，多线程意味着更高的效率。

然而，JS的单线程特性也很容易理解。在Node.js出世之前，JavaScript就只是作为浏览器脚本语言存在的，其主要用途就是与用户互动，操作DOM，目标功能决定了单线程这一灵魂设计。为了避免复杂的同步问题和潜在的并发错误（多个线程同时操作DOM是难以想象的），将JavaScript设计为单线程是十分合情合理的。阮一峰前辈在[博客](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)中这样断言：

> 为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

## 二、任务队列

在理解了JavaScript的单线程特性后，你可能感到更疑惑了，既然是单线程，输出顺序这一问题又是怎么产生的呢？是的，我们都知道JavaScript是能够进行**异步操作**的，但是这些异步操作却不是依赖多线程来实现的，而是借助**任务队列**。

JavaScript的异步操作需求是为了更佳的性能和更好的用户体验。对于那些耗时性的任务（定时器、Ajax网络请求等），JavaScript会将这些任务交给那些擅长处理对应任务的其他线程（浏览器的渲染进程本身是多线程的），然后忙自己的。这些异步任务在有了运行结果后就会被放入任务队列中，等到JS主线程的后续处理。尽管到这我们尚未厘清具体的处理顺序，但是借助任务队列，JavaScript确实能实现异步操作了。

## 三、事件循环

为了搞清楚JavaScript对同步任务和异步任务具体的处理逻辑，我们需要完善对JavaScript引擎的认识，为了便于理解，可以简单地将JavaScript看做两部分：

- 内存堆：分配内存的地方，对象等引用数据类型存储在堆中
- 执行栈：执行任务的地方，用于管理任务执行的顺序







