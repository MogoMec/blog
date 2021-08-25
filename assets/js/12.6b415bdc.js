(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{518:function(t,s,a){"use strict";a.r(s);var n=a(7),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"异步操作的需求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#异步操作的需求"}},[t._v("#")]),t._v(" 异步操作的需求")]),t._v(" "),a("p",[t._v("首先我们应该知道，JavaScript引擎是单线程的。这意味着JS引擎一次只能执行一个任务，即所有任务都是同步执行的，这样的运行机制的弊端在遇到长耗时任务时便显露出来。在执行长耗时任务（如I/O操作）时后续任务只能等待，此时浏览器是无响应（假死）的，这样的缺陷对于网页应用来说是致命的。因此，JavaScript需要便于掌握且强大的异步编程方案。")]),t._v(" "),a("p",[t._v("JavaScript的异步是指JS引擎不必等待异步操作的结束，而是可以去执行其他同步代码，等到异步任务结束时再执行对应的回调函数，这样做的好处是不会阻塞后续任务，从而获得更好的执行效率。异步需求非常好理解，只要对效率有要求，每个人都希望自己是时间管理大师，都会有异步需求。如果你对此实在感知不强，可以尝试玩一下"),a("a",{attrs:{href:"https://store.steampowered.com/app/448510/Overcooked/",target:"_blank",rel:"noopener noreferrer"}},[t._v("胡闹厨房"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("p",[t._v("JavaScript实现异步编程的方案在不断发展，从最基础的回调函数到ES6引入的Promise方案，本文将回顾不同的JavaScript异步编程实现方式。本文包括以下内容：")]),t._v(" "),a("ul",[a("li",[t._v("回调函数")]),t._v(" "),a("li",[t._v("事件监听")]),t._v(" "),a("li",[t._v("发布-订阅模式")]),t._v(" "),a("li",[t._v("Promise")]),t._v(" "),a("li",[t._v("async/await")])]),t._v(" "),a("h2",{attrs:{id:"回调函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#回调函数"}},[t._v("#")]),t._v(" 回调函数")]),t._v(" "),a("p",[t._v("异步回调函数是异步编程的基础方法。在一个异步操作结束后调用的函数就是异步回调函数。它在其他线程负责执行的异步操作完成后按照JS运行机制被调用，即它提供了一个易于理解的异步操作后的后续操作入口。例如：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("f1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("callback")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Timer start'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Timer end'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("callback")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("f2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'callback'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("f1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("f2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'script end'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n输出：\nTimer start\nscript end\nTimer end\ncallback\n")])])]),a("p",[t._v("对于f1函数，输出语句"),a("code",[t._v("console.log('Timer start')")]),t._v("是同步执行的，随后的定时器则是异步执行的，此时JS引擎会继续执行下方代码"),a("code",[t._v("console.log('script end');")]),t._v("，直至异步操作完成，再执行异步回调函数。")]),t._v(" "),a("p",[t._v("异步回调简单直接，便于理解，然而当我们有串联异步操作（下一步异步操作依赖上一个异步操作）的需求，无可避免的，我们需要将回调函数进行层层嵌套，这会造成代码可维护性的大大降低（各部分高度耦合），也就是俗称的回调地狱。")]),t._v(" "),a("p",[t._v("另外，回调函数不仅仅只能应用于异步操作，很多同步操作中也有回调概念，例如JavaScript中数组的各种常用高阶函数（"),a("code",[t._v("forEach")]),t._v("、"),a("code",[t._v("some")]),t._v("、"),a("code",[t._v("map")]),t._v("等）。")]),t._v(" "),a("h2",{attrs:{id:"事件监听"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件监听"}},[t._v("#")]),t._v(" 事件监听")]),t._v(" "),a("p",[t._v("我们常常通过监听DOM事件来为页面提供交互功能。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" btn "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'btn'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nbtn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'click'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("f1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("f1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'btn clicked'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("这也是一种异步操作模式，当"),a("code",[t._v("click")]),t._v("事件发生时，就执行回调函数"),a("code",[t._v("f1")]),t._v("。它更好地抽象出了事件这个概念，使得代码符合事件驱动模型，更加语义化，更易于理解，我们也可以方便地为每个事件指定一个或多个回调函数。这样做的缺点是难以把握运行流程。")]),t._v(" "),a("p",[t._v("这里，我们再来认识一种设计模式——"),a("strong",[t._v("发布-订阅模式")]),t._v("。")]),t._v(" "),a("blockquote",[a("p",[t._v('我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。')])]),t._v(" "),a("p",[t._v("发布-订阅模式的实现及应用有很多，例如"),a("a",{attrs:{href:"https://vue-js.com/learn-vue/reactive/#_1-%E5%89%8D%E8%A8%80",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue的响应式原理"),a("OutboundLink")],1),t._v("。你可以将其理解为升级版的事件监听，最大的改进在于，它设计了一个信号中心，方便我们对所有的信号（事件）以及订阅者（回调函数的实际执行者）进行统一监测。")]),t._v(" "),a("h2",{attrs:{id:"promise"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#promise"}},[t._v("#")]),t._v(" Promise")]),t._v(" "),a("p",[t._v("ES6引入的"),a("code",[t._v("Promise")]),t._v("是解决回调地狱问题的利器，以及成为JavaScript中最主流的异步编程方案。让我们来回忆一下什么需求让我们写出了回调地狱？串联的异步操作，下一个异步操作依赖于上一个异步操作的结果。你会不会有这样的想法，要是有什么东西能够形式化持久化地表示异步操作的结果并提供语义化的操作接口就好了，它能让串联的异步操作写起来就如同同步语句那样串行，而不是回调地狱那样层层嵌套。这就是"),a("code",[t._v("Promise")]),t._v("。让我们来看看各种对"),a("code",[t._v("Promise")]),t._v("的解释。")]),t._v(" "),a("blockquote",[a("p",[t._v("Promise是对尚不存在结果的一个替身。")]),t._v(" "),a("p",[t._v("Promise 是一个对象，用于表示一个异步操作的最终完成 (或失败), 及其结果值。")]),t._v(" "),a("p",[t._v("Promise的含义就是"),a("strong",[t._v("承诺")]),t._v("：对于一个异步操作，Promise对象"),a("strong",[t._v("承诺")]),t._v("给出一个最终的结果，这个结果可能是异步操作成功（fulfilled），也可能是失败（rejected）。但无论是哪种结果，Promise都"),a("strong",[t._v("承诺")]),t._v("这个结果不会改变或者丢失，并且可以根据这个结果，调用对应的回调函数。")])]),t._v(" "),a("p",[a("code",[t._v("Promise")]),t._v("是一个对象，除了表示异步操作的最终结果，还有很多配套方法，具体的使用可以参考"),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises",target:"_blank",rel:"noopener noreferrer"}},[t._v("使用 Promise - JavaScript | MDN (mozilla.org)"),a("OutboundLink")],1),t._v("。下面以一个"),a("code",[t._v("AJAX")]),t._v("的"),a("code",[t._v("Promsie")]),t._v("封装为例说明"),a("code",[t._v("Promise")]),t._v("的使用。")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ajaxUsingPromise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("method"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" xhr "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("XMLHttpRequest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" method "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" method "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GET"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" data "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" data "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("method"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onreadystatechange")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("readyState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("responseText"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("statusText"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        xhr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ajaxUsingPromise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'someUrl'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("error")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("Promise是一个有三种状态的对象，分别为待定（pending）、兑现（fulfilled）、拒绝（rejected）。")]),t._v(" "),a("p",[t._v("上面的函数返回一个"),a("code",[t._v("Promise")]),t._v("实例，"),a("code",[t._v("Promise")]),t._v("的构造函数接受一个函数作为参数，该函数有两个函数形参，"),a("code",[t._v("resolve()")]),t._v("和"),a("code",[t._v("reject()")]),t._v("，这两个函数用于控制"),a("code",[t._v("Promsie")]),t._v("状态的转换，"),a("code",[t._v("resolve()")]),t._v("会将状态切换为兑现（fulfilled），"),a("code",[t._v("reject()")]),t._v("会将状态切换为拒绝（rejected）。对异步操作结果的处理则通过"),a("code",[t._v("Promsie")]),t._v("的实例方法来实现，最常见的就是"),a("code",[t._v(".then()")]),t._v("方法，它接受两个函数作为参数，两个函数分别会在Promsie状态变为兑现（fulfilled）和拒绝（rejected）时执行。这里有一个更加便于理解的说法：你可以将"),a("code",[t._v("resolve()")]),t._v("和"),a("code",[t._v("reject()")]),t._v("视为两条状态转变路径的回调函数，而回调函数的具体实现是在"),a("code",[t._v(".then() .catch()")]),t._v("中完成的，在初始化"),a("code",[t._v("Promsie")]),t._v("实例时不必关心回调函数的具体实现，实现解耦。")]),t._v(" "),a("p",[t._v("::: tips")]),t._v(" "),a("p",[a("code",[t._v("catch()")]),t._v("方法是一个语法糖，等价于"),a("code",[t._v("Promise.prototype.then(null, onRejected)")])]),t._v(" "),a("p",[t._v(":::")])])}),[],!1,null,null,null);s.default=e.exports}}]);