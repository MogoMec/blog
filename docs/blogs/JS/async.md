---
title: async/await行为探索
categories: JavaScript
tags:
- Promise 
- 异步
- Event Loop
---

有一天，我遇到这样一道读代码写输出的题目：

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2 start');
  return new Promise((resolve, reject) => {
    resolve();
    console.log('async2 promise');
  })
}

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
}).then(function() {
  console.log('promise3');
});

console.log('script end');
```

来做做看，在文章末尾我会给出答案，或者你也可以自行测试。

在自以为搞清楚JavaScript的运行机制后，我依然没做对这道题。主要原因在于我对`async/await`这两个ES8新增的异步编程关键字了解不够深入。为了更准确地了解这两个关键字的作用与影响，我做了一些输出测试，本文对这些测试结果进行总结。在继续读下去之前，我假设你已经掌握了[JavaScript的运行机制](https://mogomec.github.io/blog/blogs/JS/JS_Event_Loop.html)和[async/await](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Async_await)的基本使用。

## async：它返回了啥

`async`修饰的函数称为异步函数，它有一个重要特性：必定返回一个`Promsie`实例。红宝书上提及这是通过调用[`Promise.resolve()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)包装原返回值实现的。现在让我们来看看它都会返回写啥：

```js
async function async1() {
    return 'async1'
}
console.log(async1());
//Promise {<fulfilled>: "async1"}
//隐式返回一个已解决的Promise，其值为"async1"

async function async1() {
    return Promise.resolve('async1')
}
console.log(async1());
//Promise {<pending>}
//注意，如果在异步函数中显式地返回一个Promise实例，返回的Promsie是pending状态
//针对这个现象，我猜想是resolve()方法包装导致的，所以做了进一步测试

function sync1() {
    return Promise.resolve(Promise.resolve(Promise.resolve('async1')))
}
console.log(sync1());
console.log('sync');
//Promise {<fulfilled>: "sync1"}
//sync
//事实证明我错了，同步函数中，嵌套的resolve()方法永远是立即落定的，它会将嵌套展平，最终返回最深层的Promise对象，这个对象可能是pending状态
//为什么在异步函数中显式地返回Promise对象一定是pending状态呢？这个Promise是我显式返回的那个吗？

async function async1() {
    let a = Promise.resolve('async1')
    console.log(a);
    return a
}
console.log(async1());
//Promise {<fulfilled>: "async1"}   
//Promise {<pending>}
//这次的测试它不是原来那个Promise了，它起码又被封装了一次，毕竟Promise的状态不能从fulfilled变回pending
```

经过以上测试，得出的结论有：

- 异步函数始终会返回一个`Promise`对象。
- 隐式返回（原返回值是常规值）时，必定返回**已解决**的`Promise`，其结果值即为原返回值
- 显式返回（原返回值即为`Promise`）时，无论原`Promise`对象是否已经落定，必定返回一个在**`pending`状态**的`Promsie`对象。

让我们读一读红宝书对这个机制的阐释：

> 异步函数的返回值期待（但实际上并不要求）一个实现 thenable 接口的对象，但常规的值也可以。如果返回的是实现 thenable 接口的对象，则这个对象可以由提供给 then()的处理程序“解包”。如果不是，则返回值就被当作已经解决的期约。

我们可以这么理解，如果异步函数的返回值是一个实现了`thenable`接口的对象（如`Promise`对象），则它会实际返回一个待“解包”的（处于`pending`状态的）`Promise`。并且这个特性是不能通过简单地嵌套`resolve()`方法获得的。

## await：在等什么

`await`只允许在异步函数中使用，用法和一元操作符一样，主要功能有两个：

- 解包对象的值
- 控制异步函数启停

还是上代码：
```js
async function async1() {
    console.log('async1 start');
    console.log(await 'await');
    console.log('async1 end');
}
async1()
console.log('sync');
//async1 start
//sync
//await
//async1 end
```
在遇到`await`之前，异步函数中的代码会像普通函数代码那样同步执行，在遇到`await`后一定会阻塞后续后续异步函数代码，JS主线程会执行接下来的同步代码，解析出值后，异步函数恢复执行。
```js
async function async1() {
    console.log(await 'await');
    console.log('async1 end');
}
Promise.resolve()
    .then(() => { console.log('promise1'); })
    .then(() => { console.log('promise2'); })
async1()
console.log('sync');
//sync
//promise1
//await
//async1 end
//promise2
```
从上面的输出可以看出，`await`是将恢复执行作为微任务放入微任务队列，`await`作用的是常规值的情况下，只入队一个微任务。将`await`后作用的对象换成已解决的Promise，输出一致。TC39对后面作用对象是已解决`Promise`的处理做过修改，以往会生成两个微任务。让我们来看看`Promise`是`pending`状态的情况，还记得之前说的，异步函数在显式返回时一定会返回一个`pending`状态的`Promise`，让我们利用这个特性。

```js
async function async1() {
    console.log(await async2());
    console.log('async1 end');
}
async function async2() {
    console.log('async2 start');
    return Promise.resolve('async2 promise')
}
Promise.resolve()
    .then(() => { console.log('promise1'); })
    .then(() => { console.log('promise2'); })
    .then(() => { console.log('promise3'); })
    .then(() => { console.log('promise4'); })
async1()
console.log('sync');
//async2 start
//sync
//promise1
//promise2
//async2 promise
//async1 end
//promise3
```

为了继续异步函数的执行，需要入队了三个微任务（在上一个微任务执行后入队新的微任务），异步函数返回的`pending`状态`Promise`对象，至少需要两个微任务才能解决。

## callback

现在让我们来看看开头提到的题目的输出。

```
//script start
//async1 start
//async2 start
//async2 promise
//promise1
//script end
//promise2
//promise3
//async1 end
//setTimeout
```

从`'script start'`到`'script end'`都是同步输出，包括异步函数在遇到`await`之前的执行以及两个`Promise`对象的初始化。异步函数`async1`的`await`解决任务最先进入微任务队列，然后是全局`Promise`的第一个`then()`，异步函数的恢复执行的微任务链（3个微任务）和全局`Promise`的链式调用任务链交替入队，恢复执行任务在第二个`then`之后执行。

