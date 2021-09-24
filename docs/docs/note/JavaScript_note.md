---
title: JavaScript笔记
categories: JavaScript
tags: 
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

- `==`会自动进行类型转换，`NaN`不等于自身
- `===`不会进行类型转换，`NaN`不等于自身
- [Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
  - NaN自身相等
  - +0、-0不相等
### 类型转换

#### 隐式转换

- -、*、/：非Number转换为Number

- +（加法特殊性）：

  - 有String，必转String
  - 有Number，另一边为原始类型，原始转为Number
  - 有Number，另一边为引用类型，都转为String再拼接
  - 以上三条规则优先级从高到低

- 逻辑判断

  - 单个变量：只有 `null` `undefined` `''` `NaN` `0` `false` 这几个是 `false`，其他的情况都是 `true`，比如 `{}` , `[]`。但是需要注意`[]==false`，该表达式值为`true`

  - `==`双等号判断：


      NaN和其他任何类型比较永远返回false


  - 

## 数组



### 判断数组

```javascript
var arr = []
arr instanceof Array
Array.prototype.isPrototypeOf(arr)
arr.constructor === Array
Object.prototype.toString.call(arr) === "[object Array]"
Array.isArray(arr)
```

### 数组扁平化

```js
var arr = [1, 2, [3, [4, 5]]]
//flat(Infinity)
arr.flat(Infinity)

//JSON.stringify + 正则分割 + JSON.parse
function flat(arr) {
    let str = JSON.stringify(arr).replace(/[\[|\]]/g, '')
    str = `[${str}]`
    return JSON.parse(str)
}

//递归
function flatter(arr) {
	let newArr = []
	arr.forEach(item => {
		if (Array.isArray(item)) {
			// newArr.push(...flatter(item))
			newArr = newArr.concat(flatter(item))
		}
		else {
			newArr.push(item)
		}
	})
	return newArr
}
```

### 类数组与数组

- 类数组对象：即任何**可迭代**的结构，或者有一个 `length` 属性 和**可索引元素**的结构。

- 典型类数组对象：字符串、`arguments`对象（包含函数调用时传入的所有参数）

- 区别：

  - 数组对象类型为`Array`，遍历数组可以用`for...in..`和`for`循环
  - 类数组对象类型为`Object`，遍历类数组只能用`for`循环

- 转化（类数组->数组）：

  ```js
  //arguments对象
  Array.prototype.slice.call(arguments)
  //通用
  Array.from(arrayLike)
  //将任意的元素组成数组，不是类数组
  Array.of(element0[, element1[, ...[, elementN]]])
  //扩展运算符
  arr1 = [...arr];
  ```

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
  - 让构造函数的`this`指向该对象
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

### class（ES6）

- class是ES6引入的用于定义类的关键字，它是一个语法糖，其背后原理仍然是原型和构造函数。它能帮助我们更好地组织代码。
- 使用class关键字可以定义一个类，类的**数据类型就是函数**，类是一种特殊函数，只能通过`new`调用，类中的`constructor()`方法是其默认方法
- 类受块作用域的限制，默认情况下，类定义中的代码都在严格模式下执行。
- **类的语法**可以方便定义应该存在于**实例上的**成员、应该存在于**原型上的**成员，以及应该存在 于**类本身的**成员。
  - 实例上的：通过`constructor()`方法定义，不会在原型上共享
  - 原型上的：在类块中定义的方法即原型上的方法
  - 类本身的：静态类方法使用`static`关键字作为前缀。静态成员中，`this`引用类自身。静态类方法适合作为实例工厂。
  - 类定义并不显式支持在原型或类上添加**成员数据**，但可以类定义外部手动添加
- 类的继承
  - 使用 `extends `关键字，就可以继承任何**拥有[[Construct]]和原型的对象**。

### 深拷贝与浅拷贝

- 浅拷贝：去除原型链，只为对象的第一层级创建了一个新对象

  - for…in…遍历（需要注意使用`hasOwnProperty(key)`排除原型链上的属性）

    ```js
    function clone(obj) {
        var cloneObj = {}
        // for in 遍历，会遍历原型链里面的属性，所以需要排除原型链
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                cloneObj[key] = obj[key]
            }
        }
        return cloneObj
    }
    ```

  - `Object.keys()`

    ```js
    function clone(obj) {
        var cloneObj = {}
        // Object.keys()不会遍历到原型链中的属性
        for(var key of Object.keys(obj)) {
            cloneObj[key] = obj[key]
        }
        return cloneObj
    }
    ```

  - `Object.entries()`

    ```js
    function clone(obj) {
        var cloneObj = {}
        for(var [key, value] of Object.entries(obj)) {
            cloneObj[key] = value
        }
        return cloneObj
    }
    ```

  - `Object.assign(target,...source)`

    ```js
    function clone(obj) {
        return Object.assign(obj, {})
    }
    ```

- 深拷贝

  - `JSON.stringfy()` 与 `JSON.parse()`

    ```js
    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
    ```

    - 存在问题：
      - 遇到`function`，`undefined`，`Symbol`，`Date`对象时会自动忽略，遇到正则时会返回空对象。这是由于JSON格式规定的限制。
      - 无法拷贝原型链

  - 递归

    ```js
    function deepClone(source) {
        let target = null
        if (typeof source === 'object' && source !== null) {
            target = Array.isArray(source) ? [] : {}
            for (let [key, value] of Object.entries(source)) {
                target[key] = deepClone(value)
            }
        } else {
            target = source
        }
        return target
    }
    ```

  - 第三方库lodash

## 函数

### This

- `this` 是**执行上下文**中的一个属性，是函数内部的特殊对象，它指向最后一次调用这个方法的对象。不同情况下的`this`指向

  - 全局函数：一个函数不是某个对象的属性时，`this`指向全局对象，严格模式下为`undefined`
  - 方法调用：`this`指向调用的这个方法的上下文对象
  - 构造函数调用：`new`调用构造函数，`this`指向`new`新建出来的对象
  - 箭头函数：定义箭头函数的上下文（箭头函数本身没有this属性）
- apply、call、bind：这三种函数可以显示指定函数的`this`指向，无法改变箭头函数的`this`
  - apply 方法接收两个参数：一个是` this `绑定的对象，一个是**参数数组**。用于**参数较多**的时候，可以将参数整理为数组再传入。
  
    ```js
    func.apply(thisArg, [argsArray])
    ```
  
  - call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数，即**参数列表**。也就是说，在使用 call() 方法时，传递给函数的参数必须**逐个列举出来**。参数不多的时候可以灵活使用。
  
    ```js
    func.call(thisArg, arg1, arg2, ...)
    ```
  
  - bind 方法通过传入一个对象，bind**不会立即调用**，**返回**一个 this 绑定了传入对象的**新函数**。这个函数的`this `指向除了使用 `new` 时会被改变，其他情况下都不会改变。场景：生成一个新的函数长期绑定某个函数给某个对象使用。
  
    ```js
    func.bind(thisArg[, arg1[, arg2[, ...]]])
    ```
  
  - 这三个方法不传参则将`this`绑定在全局对象上

### 箭头函数

- `this`指向：箭头函数不创建自己的`this`，而是从作用域的上一层继承`this`，且该`this`指向固定（静态继承固定）

  ```js
  var id = 'GLOBAL';
  var obj = {
    id: 'OBJ',
    a: function(){
      console.log(this.id);
    },
    b: () => {
      console.log(this.id);
    }
  };
  
  obj.a();    // 'OBJ'
  obj.b();    // 'GLOBAL'，对象定义时的执行环节仍然为全局环境
  ```

- 不能作为构造函数使用，它没有自己可变的`this`

- 没有自己的`arguments`对象

- 使用场景：简化回调函数（如高阶函数需要的回调函数）

- 小坑

  - 箭头函数返回{}对象需要用`()`包裹，不然{}会被识别为函数体

    ```js
    // 用小括号包裹要返回的对象，不报错
    let getTempItem = id => ({ id: id, name: "Temp" });
    
    // 但绝不能这样写，会报错。
    // 因为对象的大括号会被解释为函数体的大括号
    let getTempItem = id => { id: id, name: "Temp" };
    ```

### 防抖与节流

[函数防抖与函数节流 - 知乎 (zhihu.com)——司徒正美](https://zhuanlan.zhihu.com/p/38313717)

[JavaScript | Akara的前端笔记 (messiahhh.github.io)](https://messiahhh.github.io/blog/frontend/javascript.html#函数防抖)

- 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时，所以有可能一直不能成功执行。重点在于计时器的清除（预定回调的取消）

  ```js
  function debounce(fn, delay) {
      let timer = null;
      return function(...args) {
          timer && clearTimeout(timer);//短路运算，timer不为null（即在n秒内又触发了）就清除计时器，这次回调就不触发
          //设定下一个计时任务
          timer = setTimeout(() => {
              fn.apply(this,args);//取到的是debounce执行作用域的this
          }, delay);
      };
  }
  ```

  - 场景：连续触发只在最后一次执行
    - 窗口大小resize
    - 搜索框输入搜索，只需在用户最后一次输入完再发送请求

- 节流：一段时间内，无论触发多少次，只执行一次回调函数。（定时打开的阀门）

  ```js
  function throttle(fn, delay) {
      let timer = null;
      return function() {
          if(timer) return false
          timer = setTimeout(() => {
              fn()
              timer = null
          }, delay)
      }
  }
  ```

## 执行过程

### 执行上下文

- 执行上下文决定了变量或函数能够访问到的数据范围和行为。
- 全局上下文：根据JS引擎的宿主环境决定，浏览器中即window对象
- 函数执行上下文：每个函数都有自己的执行上下文。当一个函数被调用的时候, 都会创建一个新的上下文。
- JS引擎使用**执行上下文栈**来管理所有的执行上下文。
- 执行上下文包含三个属性：
  - 变量对象：用来存储执行上下文中定义的变量声明和函数声明。
  - 作用域链：决定了各级上下文中的代码在访问变量和函数时的**范围与顺序**。
  - this

### 作用域链

- 由多个执行上下文的**变量对象**构成的**链表**就叫做作用域链，它决定了各级上下文中的代码在访问变量和函数时的**范围与顺序**。这个链表的头部总是当前执行上下文的变量对象，尾部是全局上下文的变量对象。（这个链表是单向线性有序的）
- 作用域链是一个包含指针的列表，物理上并不真正包含变量对象
- 作用域链会保存在函数的内部属性[[Scope]]中
- 变量标识符查找从作用域链的头部开始一直持续到全局上下文，所以作用域链前面的同名标识符会覆盖后面的。

### 闭包

- 闭包就是一个函数以及该函数能够访问的变量对象（由作用域链决定）的总和。
- 闭包能够使得我们在函数外部访问函数内部的私有变量
- 闭包的本质是对**作用域链**的特殊应用。
- 闭包作用：
  - 避免全局变量的污染（读写外部函数的私有变量）
  - 实现变量常驻内存

## 正则表达式

- 创建

  ```js
  var re = new RegExp("\\w+");//使用构造函数时需要使用\转义
  var re = /\w+/;// /....../
  ```

- 字符描述

| 字符         | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| \            | 将下一个字符标记为一个特殊字符、或一个原义字符、或一个 向后引用、或一个八进制转义符。例如，'n' 匹配字符 "n"。'\n' 匹配一个换行符。序列 '\\' 匹配 "\" 而 "\(" 则匹配 "("。 |
| ^            | 匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 '\n' 或 '\r' 之后的位置。 |
| $            | 匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性，$ 也匹配 '\n' 或 '\r' 之前的位置。 |
| *            | 匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}。 |
| +            | 匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。 |
| ?            | 匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 或 "does" 。? 等价于 {0,1}。 |
| {n}          | n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。 |
| {n,}         | n 是一个非负整数。至少匹配n 次。例如，'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。 |
| {n,m}        | m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。例如，"o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。 |
| ?            | 当该字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串 "oooo"，'o+?' 将匹配单个 "o"，而 'o+' 将匹配所有 'o'。 |
| .            | 匹配除换行符（\n、\r）之外的任何单个字符。要匹配包括 '\n' 在内的任何字符，请使用像"**(.\|\n)**"的模式。 |
| (pattern)    | 匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到，在VBScript 中使用 SubMatches 集合，在JScript 中则使用 $0…$9 属性。要匹配圆括号字符，请使用 '\(' 或 '\)'。 |
| (?:pattern)  | 匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 "或" 字符 (\|) 来组合一个模式的各个部分是很有用。例如， 'industr(?:y\|ies) 就是一个比 'industry\|industries' 更简略的表达式。 |
| (?=pattern)  | **正向先行断言**（look ahead positive assert），在任何匹配pattern的字符串开始处匹配查找字符串。这是一个**非获取**匹配，也就是说，该匹配不需要获取供以后使用。例如，"Windows(?=95\|98\|NT\|2000)"能匹配"Windows2000"中的"Windows"，但不能匹配"Windows3.1"中的"Windows"。匹配的是一个**位置**。 |
| (?!pattern)  | **负向先行断言**(nnegative lookahead assertion)，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如"Windows(?!95\|98\|NT\|2000)"能匹配"Windows3.1"中的"Windows"，但不能匹配"Windows2000"中的"Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。 |
| (?<=pattern) | **正向后行断言**(positive lookbehind assertion)，与正向先行断言类似，只是方向相反。例如，"`(?<=95|98|NT|2000)Windows`"能匹配"`2000Windows`"中的"`Windows`"，但不能匹配"`3.1Windows`"中的"`Windows`"。 |
| (?<!pattern) | **负向后行断言**(negative lookbehind assertion)，与负向先行类似，只是方向相反。只是方向相反。例如"`(?<!95|98|NT|2000)Windows`"能匹配"`3.1Windows`"中的"`Windows`"，但不能匹配"`2000Windows`"中的"`Windows`"。 |
| x\|y         | 匹配 x 或 y。例如，'z\|food' 能匹配 "z" 或 "food"。'(z\|f)ood' 则匹配 "zood" 或 "food"。 |
| [xyz]        | 字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'。 |
| [^xyz]       | 负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 "plain" 中的'p'、'l'、'i'、'n'。 |
| [a-z]        | 字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。 |
| [^a-z]       | 负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。 |
| \b           | 匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。 |
| \B           | 匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。 |
| \cx          | 匹配由 x 指明的控制字符。例如， \cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。 |
| \d           | 匹配一个数字字符。等价于 [0-9]。                             |
| \D           | 匹配一个非数字字符。等价于 [^0-9]。                          |
| \f           | 匹配一个换页符。等价于 \x0c 和 \cL。                         |
| \n           | 匹配一个换行符。等价于 \x0a 和 \cJ。                         |
| \r           | 匹配一个回车符。等价于 \x0d 和 \cM。                         |
| \s           | 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。 |
| \S           | 匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。                  |
| \t           | 匹配一个制表符。等价于 \x09 和 \cI。                         |
| \v           | 匹配一个垂直制表符。等价于 \x0b 和 \cK。                     |
| \w           | 匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。               |
| \W           | 匹配非字母、数字、下划线。等价于 '[^A-Za-z0-9_]'。           |
| \xn          | 匹配 n，其中 n 为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，'\x41' 匹配 "A"。'\x041' 则等价于 '\x04' & "1"。正则表达式中可以使用 ASCII 编码。 |
| \num         | 匹配 num，其中 num 是一个正整数。对所获取的匹配的引用。例如，'(.)\1' 匹配两个连续的相同字符。 |
| \n           | 标识一个八进制转义值或一个向后引用。如果 \n 之前至少 n 个获取的子表达式，则 n 为向后引用。否则，如果 n 为八进制数字 (0-7)，则 n 为一个八进制转义值。 |
| \nm          | 标识一个八进制转义值或一个向后引用。如果 \nm 之前至少有 nm 个获得子表达式，则 nm 为向后引用。如果 \nm 之前至少有 n 个获取，则 n 为一个后跟文字 m 的向后引用。如果前面的条件都不满足，若 n 和 m 均为八进制数字 (0-7)，则 \nm 将匹配八进制转义值 nm。 |
| \nml         | 如果 n 为八进制数字 (0-3)，且 m 和 l 均为八进制数字 (0-7)，则匹配八进制转义值 nml。 |
| \un          | 匹配 n，其中 n 是一个用四个十六进制数字表示的 Unicode 字符。例如， \u00A9 匹配版权符号 (?)。 |

- [正则表达式的先行断言(lookahead)和后行断言(lookbehind) | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/reg-lookahead-lookbehind.html)

- 运算优先级

  - 从左到右运算

  - 运算符优先级从高到低排序：

    | 运算符                      | 描述                                                         |
    | :-------------------------- | :----------------------------------------------------------- |
    | \                           | 转义符                                                       |
    | (), (?:), (?=), []          | 圆括号和方括号                                               |
    | *, +, ?, {n}, {n,}, {n,m}   | 限定符                                                       |
    | ^, $, \任何元字符、任何字符 | 定位点和序列（即：位置和顺序）                               |
    | \|                          | 替换，"或"操作 字符具有高于替换运算符的优先级，使得"m\|food"匹配"m"或"food"。若要匹配"mood"或"food"，请使用括号创建子表达式，从而产生"(m\|f)ood"。 |

- 正则相关题目
  
  - [String.prototype.replace() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#使用字符串作为参数)
    
  - 千分位分割
  
    ```js
    // 正则，先行断言，负向后行断言，匹配出的是一个位置，可以直接替换（插入），
    function format(num) {
        return num.toString().replace(/(?=(?<!^)(\d{3})+$)/g, ',')
    }
    
    //正则，匹配出的是三位数字，$&是特殊变量名，意思为插入匹配到的字符串
     function format(num) {
        const reg = /\d{1,3}(?=(?:\d{3})+$)/g
        return num.toString().replace(reg, '$&,')
    }
    
    // toLocaleString实现
    function format(num) {
    	return num.toLocaleString()
    }
    ```
  

## Proxy

- [Proxy - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/proxy)

- Proxy（代理）可以理解为在目标对象之前架设一层拦截，外界对该对象的读写都需要经过这层拦截（类比中间件、axios拦截器），通过该机制，对对读写操作进行过滤与改写。

- 应用：Vue3数据劫持、数据校验

- 代理对象例子

  ```js
  //假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数
  //创建handler对象，实现拦截具体逻辑
  let validator = {
    //set拦截对象属性的设置，get拦截对象属性的读取
    set: function(obj, prop, value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
        if (value > 200) {
          throw new RangeError('The age seems invalid');
        }
      }
      // 对于满足条件的 age 属性以及其他属性，直接保存
      obj[prop] = value;
      return true;
    }
  };
  //创建Proxy实例
  let person = new Proxy({}, validator);
  
  person.age = 100;
  
  person.age // 100
  person.age = 'young' // 报错
  person.age = 300 // 报错
  ```

- 代理函数

  ```js
  handler = {
      get: function (target, propKey, receiver) {
          return target[propKey]
      },
  	// apply拦截Proxy实例作为函数调用的操作，包括call、apply调用
      apply: function (target, myThis, args) {
          console.log(target, myThis, args)
          target.apply(myThis, args)
      },
  	//construct拦截Proxy实例作为构造函数调用的操作
      construct(target, args) {
          return new target(...args)
      }
  }
  
  let proxy = new Proxy(function (a, b) {
      this.name = a
      this.age = b
  }, handler)
  ```

  

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

## DOM

### 事件委托

- 当有很多子元素需要绑定相同的事件的时候，会造成很大的内存消耗，可以用事件委托，即利用事件冒泡将事件绑定到父元素上
- 新增的子元素也能绑定事件
- 缺点：对于不冒泡的事件不支持（blur，focus，mouseleave，mouseenter，load，scroll，resize）（焦点事件，鼠标移动事件）

## REF

[JavaScript 常见知识总结_技术交流_牛客网 (nowcoder.com)](https://www.nowcoder.com/discuss/622767?channel=-1&source_id=profile_follow_post_nctrack)

[JavaScript | Akara的前端笔记 (messiahhh.github.io)](https://messiahhh.github.io/blog/frontend/javascript.html#浅拷贝)

