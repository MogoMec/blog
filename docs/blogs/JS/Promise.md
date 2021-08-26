---
title: 更好的JavaScript异步编程方案——不只是Promise
categories: JavaScript
tags: 
- Promise 
- ES6 
- 异步
---

## 异步操作的需求

首先我们应该知道，JavaScript引擎是单线程的。这意味着JS引擎一次只能执行一个任务，即所有任务都是同步执行的，这样的运行机制的弊端在遇到长耗时任务时便显露出来。在执行长耗时任务（如I/O操作）时后续任务只能等待，此时浏览器是无响应（假死）的，这样的缺陷对于网页应用来说是致命的。因此，JavaScript需要便于掌握且强大的异步编程方案。

JavaScript的异步是指JS引擎不必等待异步操作的结束，而是可以去执行其他同步代码，等到异步任务结束时再执行对应的回调函数，这样做的好处是不会阻塞后续任务，从而获得更好的执行效率。异步需求非常好理解，只要对效率有要求，每个人都希望自己是时间管理大师，都会有异步需求。如果你对此实在感知不强，可以尝试玩一下[胡闹厨房](https://store.steampowered.com/app/448510/Overcooked/)。

JavaScript实现异步编程的方案在不断发展，从最基础的回调函数到ES6引入的Promise方案，本文将回顾不同的JavaScript异步编程实现方式。本文包括以下内容：

::: tip

- 回调函数
- 事件监听
- 发布-订阅模式
- Promise
- async/await

:::

## 回调函数

异步回调函数是异步编程的基础方法。在一个异步操作结束后调用的函数就是异步回调函数。它在其他线程负责执行的异步操作完成后按照JS运行机制被调用，即它提供了一个易于理解的异步操作后的后续操作入口。例如：

```js
function f1(callback) {
    console.log('Timer start');
    setTimeout(function () {
        console.log('Timer end');
        callback();
    }, 1000);
}
function f2() {
    console.log('callback');
}
f1(f2)
console.log('script end');
输出：
Timer start
script end
Timer end
callback
```

对于f1函数，输出语句`console.log('Timer start')`是同步执行的，随后的定时器则是异步执行的，此时JS引擎会继续执行下方代码`console.log('script end');`，直至异步操作完成，再执行异步回调函数。

异步回调简单直接，便于理解，然而当我们有串联异步操作（下一步异步操作依赖上一个异步操作）的需求，无可避免的，我们需要将回调函数进行层层嵌套，这会造成代码可维护性的大大降低（各部分高度耦合），也就是俗称的回调地狱。抽象出来就像这样：

```js
asyncFunc1(opt, (...args1) => {
    asyncFunc2(opt, (...args2) => {
        asyncFunc3(opt, (...args3) => {
            asyncFunc4(opt, (...args4) => {
                // some operation
            });
        });
    });
});
```

另外，回调函数不仅仅只能应用于异步操作，很多同步操作中也有回调概念，例如JavaScript中数组的各种常用高阶函数（`forEach`、`some`、`map`等）。

## 事件监听

我们常常通过监听DOM事件来为页面提供交互功能。

```js
var btn = document.getElementById('btn')
btn.addEventListener('click',f1)
function f1(){console.log('btn clicked')}
```

这也是一种异步操作模式，当`click`事件发生时，就执行回调函数`f1`。它更好地抽象出了事件这个概念，使得代码符合事件驱动模型，更加语义化，更易于理解，我们也可以方便地为每个事件指定一个或多个回调函数。这样做的缺点是难以把握运行流程。

这里，我们再来认识一种设计模式——**发布-订阅模式**。

> 我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。

发布-订阅模式的实现及应用有很多，例如[Vue的响应式原理](https://vue-js.com/learn-vue/reactive/#_1-前言)。你可以将其理解为升级版的事件监听，最大的改进在于，它设计了一个信号中心，方便我们对所有的信号（事件）以及订阅者（回调函数的实际执行者）进行统一监测。

## Promise

ES6引入的`Promise`是解决回调地狱问题的利器，以及成为JavaScript中最主流的异步编程方案。让我们来回忆一下什么需求让我们写出了回调地狱？串联的异步操作，下一个异步操作依赖于上一个异步操作的结果。你会不会有这样的想法，要是有什么东西能够形式化持久化地表示异步操作的结果并提供语义化的操作接口就好了，它能让串联的异步操作写起来就如同同步语句那样串行，而不是回调地狱那样层层嵌套。这就是`Promise`。让我们来看看各种对`Promise`的解释。

> Promise是对尚不存在结果的一个替身。
>
> Promise 是一个对象，用于表示一个异步操作的最终完成 (或失败), 及其结果值。
>
> Promise的含义就是**承诺**：对于一个异步操作，Promise对象**承诺**给出一个最终的结果，这个结果可能是异步操作成功（fulfilled），也可能是失败（rejected）。但无论是哪种结果，Promise都**承诺**这个结果不会改变或者丢失，并且可以根据这个结果，调用对应的回调函数。

`Promise`是一个对象，除了表示异步操作的最终结果，还有很多配套方法，具体的使用可以参考[使用 Promise - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)。下面以一个`AJAX`的`Promsie`封装为例说明`Promise`的使用。

```js
function ajaxUsingPromise(method, url, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var method = method || "GET";
        var data = data || null;
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.status);
            }
        }
        xhr.send(data);
    })
}
ajaxUsingPromise('someUrl')
    .then((response) => {
    console.log(response)
})
    .catch((error) => {
    console.log(error)
})
```

`Promise`是一个有三种状态的对象，分别为待定（pending）、兑现（fulfilled）、拒绝（rejected）。

上面的函数返回一个`Promise`实例，`Promise`的构造函数接受一个函数作为参数，该函数有两个函数形参，`resolve()`和`reject()`，这两个函数用于控制`Promsie`状态的转换，`resolve()`会将状态切换为兑现（fulfilled），`reject()`会将状态切换为拒绝（rejected）。对异步操作结果的处理则通过`Promsie`的实例方法来实现，最常见的就是`.then()`方法，它接受两个函数作为参数，两个函数分别会在`Promsie`状态变为兑现（fulfilled）和拒绝（rejected）时执行。这里有一个更加便于理解的说法：你可以将`resolve()`和`reject()`视为两条状态转变路径的回调函数，而回调函数的具体实现是在`.then() .catch()`中完成的，在初始化`Promsie`实例时不必关心回调函数的具体实现，实现解耦。

::: tip

`catch()`方法是一个语法糖，等价于`Promise.prototype.then(null, onRejected)`

:::

为了解决回调地狱，`.then`方法会返回一个新的`Promise`实例，如此一来，你就可以通过`Promise`的链式调用来代替回调地狱的写法了。

```js
asyncFunc1(opt)
    .then(args1=> asyncFunc2(args1))
    .then(args2=> asyncFunc3(args2))
    .then(args3=> asyncFunc4(args3))
```

除了链式调用，`Promise`类还提供了两个将多个`Promise`实例组合使用的静态方法：

- [`Promise.all()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)：一组`Promise`全部解决后（回调也执行完毕）再解决方法本身返回`Promise`。
- [`Promise.race()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)：返回一组`Promise`中最先解决或拒绝的实例的镜像。

## async/await

`async/await`是ES8新增的异步函数语法关键字。它简化了`Promise`的使用。前者使得函数能够使得`Promise`在函数中隐式地使用，后者用于控制异步函数内的运行启停以及`Promise`对象的值解析。

`async`关键字用于声明异步函数，对`Promise`的隐式使用体现在：

- 异步函数**一定会返回一个`Promise`实例**，它会通过[`Promise.resolve()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)包装原返回值（隐式返回）。
- 和`await`搭配使用，在碰到`Promise`对象时等待其状态落定然后进行值解析，等待时阻塞异步函数内的后续代码。

`await`关键字只能在`async`修饰的函数中使用。其具体作用如下：

- 

下面的代码演示`async/await`配合之前封装的`ajax`使用：

```js
async function getData(){
    var data = await ajaxUsingPromise(someurl)
    window.data = data
    return data
}
    console.log(getData())
    console.log('script')

//输出：
Promise{<pending>}
script
返回值
```

`getData()`被`async`修饰为异步函数，`await`阻塞异步函数体内后续语句的执行，等待`ajax`请求返回值，并解析值，此时data得到的值就是返回值（非`Promise`对象）。





