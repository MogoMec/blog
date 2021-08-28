---
title: JavaScript笔记
categories: JavaScript
tags： 
- notes
---

## 基础

### 数据类型

```js
typeof undefined === 'undefined'
typeof null === 'object'
typeof 123 === 'number'
typeof NaN === 'number'
typeof '123' === 'string'
typeof true === 'boolean'
typeof Symbol() === 'symbol'
typeof 123n === 'bigint' 
// 一共七种基本（原始）类型，ES6增加Symbol类型，用于解决可能出现的变量冲突问题。最后一种bigint为新增基本类型
//基本类型直接保存在栈中
typeof {} === 'object'
typeof [] === 'object' //数组是内置对象
typeof function() {} === 'function'
//引用(合成)类型的实际值保存在堆中，在栈中保存了该实体的起始地址
//堆、栈概念简述：
//堆和栈的概念存在于数据结构中和操作系统内存中。
//在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全
//二叉树是堆的一种实现方式。
//在操作系统中，内存被分为栈区和堆区。
//栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
//堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。
```

### 内置对象

- 值属性

  Infinity、NaN、null（不该有值）、undefined（应该有值但是未定义）、

- 函数属性

  eval()、parseInt()、parseFloat()等

- 基本对象

  Object、Function

### 判断相等

- `==`会自动进行类型转换
- `===`不会进行类型转换，`NaN`不等于自身
- [Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
  - NaN自身相等
  - +0、-0不相等
### 类型转换



## 对象
### 原型

- 原型是JS用以实现继承等面向对象特性的基础（原型类比父类）,ES6的`calss`只是原型机制的语法糖。

- **原型**：在js中使用构造函数新建对象时，构造函数内部都会有一个`prototype`属性，该属性指向一个对象，即所有调用该构造函数创建的对象的原型。

  - 原型对象定义了所有对象实例共享的属性和方法。

    ```js
    //在Vue原型上全局挂载axios库的方法，方便后续发起网络请求
    Vue.prototype.$http = axios
    ```

  - 对象实例内部有[[Prototype]]特性指向自己构造函数的原型对象，大部分浏览器会将其以`__proto__`属性暴露

    - 实例与构造函数原型之间有直接关系
    - 构造函数则与原型对象相互联系
    - `Object.getPrototypeOf(obj)`获取实例对象[[Prototype]]特性
    - `Object.setPrototypeOf()`写入实例对象[[Prototype]]特性，改写继承关系，危险行为

  - 访问对象属性时，会按照实例对象本身、对象原型、原型的原型……的顺序逐级查找该属性。

    - 如果原型和实例上存在同名属性，实例对象的属性会覆盖原型属性。
    - `hasOwnProperty()`方法用于确定某个属性是在实例上还是在原型对象上
    - `in`操作符可用于判断属性是否存在于实例对象的原型链中
    
  - 获取原型方法总结：
  
    - `p.__proto__`
    - `p.constructor.prototype`：实际上是先找到原型上的`constructor`属性
    - `Object.getPrototypeOf(p)`
  
- `new`操作符做了什么？

  - 创建新的空对象
  - 设置原型，将该对象内置属性[[Prototype]]指向构造函数原型对象
  - 让函数的`this`指向该对象
  - 如果构造函数返回一个非基本类型的值，则返回这个值，否则返回上面创建的对象

- `new`模拟

  ```javascript
  function _new(fn, ...arg) {
      const obj = Object.create(fn.prototype);//新建对象，该对象原型为构造函数的原型对象
      const ret = fn.apply(obj, arg);//执行函数
      return ret instanceof Object ? ret : obj;//判断并返回结果
  }
  ```

### **原型链**

- 原型链是ECMAScript的主要继承方式。

- 如果原型对象也是另一个类型的实例，那么原型对象也有了自己的原型，这样就构成了一条原型链。

- 原型链的尽头是`Object`

- `instanceof`操作符：判断原型与实例关系。

  - 语法：`object instancof constructor`

  - 实现一个`instanceof`

    ```js
    function myInstanceof(a, b) {
        if (typeof a !== 'object' || a === null) return false
        let proto = Object.getPrototypeOf(a)//获取实例的原型对象
        while(true) {
            if (proto === null) return false
            if (proto === b.prototype) return true
            proto = Object.getPrototypeOf(proto)//原型链上溯
        }
    }
    ```

- 原型链的问题

  - 包含引用值各个实例之间共享
  - 子类型实例化时无法给父类型传参 

- 盗用构造函数

  - 利用`apply()`和`call()`方法指定`this`在子类构造函数中调用父类构造函数，实现在继承时在新实例对象上创建实例属性

  - ```js
    function SuperType() { 
     this.colors = ["red", "blue", "green"]; 
    } 
    function SubType() { 
     // 继承 SuperType 
     SuperType.call(this); 
    } 
    ```

  - 子类型实例化时可以向父类型传参了

### 继承

- 原型链继承
  - 无法多继承
  - 所有新实例会共享父类属性

- 组合继承

  - 基本原理：使用原型链继承原型上的属性与方法，用**盗用构造函数继承实例属性**（在新对象上创建了属性遮蔽原型属性）

  - ```js
    function SuperType(name){ 
     this.name = name; 
     this.colors = ["red", "blue", "green"]; 
    } 
    SuperType.prototype.sayName = function() { 
     console.log(this.name); 
    }; 
    function SubType(name, age){ 
     // 继承属性
     SuperType.call(this, name); //盗用构造函数
     this.age = age; 
    } 
    // 继承方法
    SubType.prototype = new SuperType(); //实例化父类作为子类原型
    SubType.prototype.sayAge = function() { 
     console.log(this.age); 
    };
    ```

  - 问题：需要调用两次父类构造函数，容易在原型链上产生了冗余的属性

- 寄生式继承

  - 原理：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象

  - [`Object.create() `](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

  - ```js
    function createAnother(original){ 
     let clone = Object.craeat(original); // 通过调用函数创建一个新对象
     clone.sayHi = function() { // 以某种方式增强这个对象
     console.log("hi"); 
     }; 
     return clone; // 返回这个对象
    } 
    ```

  - 缺点：这样添加的函数难以重用

- 寄生式组合继承

  -  基本思路：不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个**副本**（寄生模式）

  - ```js
    function inheritPrototype(subType, superType) { 
     let prototype = Object.creat(superType.prototype); // 创建对象,其原型为父类原型
     prototype.constructor = subType; // 增强对象 
     subType.prototype = prototype; // 赋值对象
    } 
    ```
  
  - ```javascript
    function Cat(name) {
        Animal.call(this)
    }
    Cat.prototype = Object.create(Animal.prototype)
    Cat.prototype.constructor = Cat
    ```

  - 解决了组合继承两次调用父类构造函数的问题，是除了ES6 `extends`继承外的最优方法。

## 函数

### This

- this 是**执行上下文**中的一个属性，它指向最后一次调用这个方法的对象。
- 全局函数：一个函数不是某个对象的属性时，`this`指向全局对象
- 方法调用：`this`指向调用的这个方法的对象
- 构造函数调用：`new`调用构造函数，`this`指向`new`新建出来的对象
- apply、call、bind：这三种函数可以显示指定`this`指向
  - apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。
  - call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。
  - bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。

## AJAX

- 无封装使用

  ```javascript
  let xhr = new XMLHttpRequest();
  
  // 创建 Http 请求
  xhr.open("GET", SERVER_URL, true);
  
  // 设置状态监听函数
  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
  
    // 当请求成功时
    if (this.status === 200) {
      handle(this.response);
    } else {
      console.error(this.statusText);
    }
  };
  
  // 设置请求失败时的监听函数
  xhr.onerror = function() {
    console.error(this.statusText);
  };
  
  // 设置请求头信息
  xhr.responseType = "json";
  xhr.setRequestHeader("Accept", "application/json");
  
  // 发送 Http 请求
  xhr.send(null);
  ```

- `Promise`封装

  ```javascript
  const Ajax = ({
      method = 'get',
      url = '/',
      data,
      async = true
  }) => {
      return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest()
          xhr.onreadystatechange = () => {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  let res = JSON.parse(xhr.responseText)
                  resolve(res)
              }
          }
          xhr.open(method, url, async)
          if (method === 'get') {
              xhr.send()
          }
          if (method === 'post') {
              let type = typeof data
              let header
              if (type === 'string') {
                  header = 'application/x-www-form-urlencoded'
              }
              else {
                  header = 'application/json'
                  data = JSON.stringify(data)
              }
              xhr.setRequestHeader('Content-type', header)
              xhr.send(data)
          }
      })
  }
  
  Ajax.get = (url) => {
      return Ajax({
          url
      })
  }
  
  
  
  Ajax.get('http://localhost:3000/getData')
      .then((data) => {
          console.log(data)
      })
  ```

p56