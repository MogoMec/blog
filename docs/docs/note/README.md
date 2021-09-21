---
title: Vue学习笔记
date: 2020-05-29
---

## Vue 基础

- JS 框架
- 简化 DOM 操作
- 响应式数据驱动
- 双向数据绑定
- 渐进式：分层设计，可以根据需求选择不同的层级（路由机制、状态管理等）

## MVVM（狭义）

- Model：数据源
- View：页面所渲染的 DOM 的结构
- ViewModel：vue 实例，是 MVVM 的核心，负责监听事件、数据绑定，实现了View和Model的自动同步更新（即双向绑定）

### 第一个 Vue

1. 导入开发版本 Vue.js

2. 创建 Vue 实例对象，设置 el 属性和 data 属性

3. 使用简洁的模板语法把数据渲染到页面上

   ```html
   <div id="app">
     {{ message }}
   </div>
   ```

   ```javascript
   var app = new Vue({
     el: "#app",
     data: {
       message: "Hello Vue!"
     }
   });
   ```

- el：挂载点
  - 设置 Vue 实例挂载的元素，设置选择器（建议使用 id 选择器，语义化）。
  - el 命中的元素的子元素也受到该 vue 实例控制。
  - 不允许挂载到 html 或者 body 标签上。
- data：数据对象
  - Vue 使用的数据定义在 data 中
  - data 中可以使用对象、数组等类型
  - 渲染复杂数据，遵守 js 语法即可

## Vue 指令

- v-text：设置标签的文本值

  - 作为属性写入标签中，会替换所有内容
  - 使用插值表达式可以进行局部替换
  - 能使用内部表达式

- v-html：设置元素的 innerHTML

  - 写入的 html 结构会被解析为标签

- v-on：为元素绑定事件，简写`@`

  - ```vue
    v-on:事件 = ’方法‘ @事件 = '方法'
    ```

  - 方法定义在 Vue 实例内部 methods 对象中

  - 使用 Vue 是将操作 DOM 转化为操作 Vue 实例中的数据，使用 this 获取数据

  - 可以传递自定义参数

  - 需要访问原始 DOM 事件，可以使用特殊变量 `$event` 获取

  - 使用事件修饰符[API — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/api/#v-on)

  - 使用事件修饰符以保证在方法中只有纯粹的数据逻辑，而没有处理 DOM 的细节。

- v-show：根据表达式的真假，切换元素的显示与隐藏（操作 display 属性）

  - ```
    v-show:逻辑表达式
    ```

  - 原理：动态添加和删除`display:none`属性

- v-if：根据表达值的真假,切换元素的显示和隐藏（操作 dom 元素）

  - 直接操作 DOM 性能消耗较大
  - 频繁或大数量切换使用 v-show

- v-bind：用于设置元素的属性，通用性强

  - ```vue
    v-bind：属性名=“表达式” ：属性名=“表达式”
    ```

  - ```html
    <div id="app">
      {{message}}
    </div>
    <div id="app">
      <!-- 设置图片源属性 -->
      <img v-bind:src="imgSrc" />
      <img v-bind:title="imgtitle+'!!!!" />
      <!-- 使用三元表达式根据数据设置类 -->
      <img v-bind:class="isActive?'active':" />
      <!-- 使用对象设置类 -->
      <img v-bind:class=" {active:isActive}" />
    </div>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script>
      var app = new Vue({
        el: "#app",
        data: {
          imgSrc: "图片地址",
          imgTitle: "黑马程序员",
          isActive: false
        }
      });
    </script>
    ```

- v-for：根据数据生成列表结构

  - ```
    v-for="(item,index) in 数据"
    ```

  - 经常和数组结合使用

  - `item`和`index`可以使用在其他指令中

  - 使用`v-for`指令时，需要绑定一个`key`属性，使用`id`作为`key`的值

- v-model：获取与设置表单元素的值（双向数据绑定）

  - 双向：表单与 Vue 实例数据之间绑定，任意一方修改另一方都会同步修改
  - 修饰符
    - .lazy：input 触发转为 change 触发
    - .number：自动将用户的输入值转为数值类型
    - .trim：自动过滤用户输入的首尾空白字符

### 自定义指令

- 描述：一般情况，Vue 架构中不推荐直接对 DOM 进行操作，但是也允许自定义指令来对普通 DOM 元素进行底层操作

- [自定义指令 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/custom-directive.html#ad)

- 私有自定义指令

  - 在 vue 组件中的`directives`节点下声明

  - ```js
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
    ```

* 全局自定义指令

  - ```js
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive("focus", {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function(el) {
        // 聚焦元素
        el.focus();
      }
    });
    ```

* 钩子函数

  - `bind`：只**调用一次**，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  - `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  - `update`：所在组件的 VNode 更新时调用，一般较常用。**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

  - `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
  - `unbind`：只调用一次，指令与元素解绑时调用。

* 钩子函数参数

  - `el`：指令所绑定的元素，可以用来直接操作 DOM。
  - `binding`：一个对象，包含以下 property：
    - `name`：指令名，不包括 `v-` 前缀。
    - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。

* 函数简写

  - 如果 bind 和 update 函数中的逻辑完全相同，则自定义指令可写成函数形式

    ```js
    Vue.directive("color-swatch", function(el, binding) {
      el.style.backgroundColor = binding.value;
    });
    ```

## 计算属性

- `computed`：依赖已有的变量来计算一个目标变量（多对一）。
- **计算属性是基于它们的响应式依赖进行缓存的**。依赖值不变的情况下会直接读取缓存值进行复用。适合例如需要遍历数组的操作。
- 不能进行异步操作。
- 尽量以属性方式给其中函数取名。

## 侦听器

- 描述：watch 侦听器允许开发者监视某个数据的变化，从而针对数据的变化做特定的操作（一对多）。

- 可以进行异步操作

- 监听引用数据类型时可以使用`deep`进行深度监听

- ```javascript
  const vm = new Vue({
      el:'#app
      data:{ username:
      watch:{
      //监听username值的变化
      // newVal是"变化后的新值",oldVal是"变化之前的旧值"
      username(newVal, oldVal) {
          console.log(newal, oldVal)
      }
  })
  ```

## Vue 的生命周期

- Vue 组件生命周期即它从创建、运行到销毁的**时间段**

  ![lifecycle.png (1200×3039) (vuejs.org)](https://cn.vuejs.org/images/lifecycle.png)

- ![image-20210921144225654](.\image-20210921144225654-16322065524811.png)

- created()：此时组件的 props、data、methods 已经可用，但是**模板结构尚未生成**，一般在此时发起 AJAX 请求(methods)，进行数据获取。

- 父子组件生命周期顺序

  父 before Create->created-> before Mount->子 beforeCreate>子created->子beforeMount-->子 mounted->父mounted

## 组件

### 组件传值

#### 父子组件的通信

- 在开发中，可能会由上层组件进行网络请求获得数据，需要使用子组件进行展示，就需要父子组件通信
- **Props**（父传子）：在组件对象中`props`属性（数组、对象）中注册属性（**声明**需要从父级接受的数据），该属性由外部使用组件时作为标签自定义属性（一般用 v-bind 动态传入）传入，可以在定义组件模板时使用该属性
  - [Prop — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/components-props.html)
  - props 是组件的**自定义属性**，在封装组件时，合理使用可以大幅提高组件的复用性
  - 定义`props`属性时可以使用数组也可以使用**对象**，使用对象时可以针对传入数据进行修饰，如限定数据类型、设置默认值（default 属性）、设定是否必传
- **监听子组件事件**（子传父）：子组件调用`$emit()`发送事件，父组件使用`v-on`监听事件，就像监听原生 DOM 事件一样。
  - `$emit()`：第一个参数传入事件名，第二个参数传入附加信息
- 父子组件的访问（通过对象）

  - 父访子：
    - `$children`：返回子组件对象数组，通过索引确定子组件，不够灵活
    - `$refs`：返回一个对象，包括**注册过 ref 属性**的所有 DOM 元素和组件实例，通过 ref 值进行定位
  - 子访父：一般不使用
    - `$parent`：返回父实例
    - `$root`：返回当前组件树的根实例

#### 兄弟组件的数据共享

- EventBus事件总线，跨组件触发事件，进而传递数据
- Vuex状态管理
- `$refs`组件实例获取
- 使用浏览器本地存储，如`localstorage`

### slot 插槽

- [插槽 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/components-slots.html)

- 描述：组件的插槽用于分发内容，让我们封装的组件更具拓展性，让使用者可以决定组件内部展示的具体内容，使用 slot 标签预留一个客制化接口。

#### 基本使用

- 使用 slot 标签预留一个客制化接口（占位符）
- 使用组件时在组件对应标签中写入具体替换插槽的标签结构（包括自定义组件）
- 定义模板时在 slot 标签中写入子标签作为**默认值**
- 模板中不包含 slot 标签，则在组件使用时在组件标签内部的所有内容都会被抛弃

#### 具名插槽

- 描述：在 slot 标签中有 name 属性的插槽，`name='插槽名'`
- 使用：
  - 在 html 结构中写入`slot='插槽名'`（已废弃）
  - 在`template`标签中使用`v-slot:插槽名`指令，再在其中加入 html 结构
  - 注意：v-slot 指令只能应用在`template`标签上，简写：`#插槽名`

#### 作用域插槽

- 作用：让在父级渲染的插槽能够访问子组件中才有的数据（扩展作用域，便于数据共享

- 使用
  - 在 slot 标签中有使用`v-bind`指令绑定属性，`:属性名='子组件数据字段'`
  - 使用`slot-scope:插槽prop名`（已废弃）
  - 在`template`标签中使用`v-slot:插槽名=’插槽prop名‘`，插槽 prop 名自定义，一般使用 scope，也可以使用解构赋值

### 动态组件

- 描述：动态切换组件的显示与隐藏
- 内置组件：`<component>`，专门用于动态组件的渲染，可以视为一个组件的占位符
- `<component>`组件中包含一个 props 属性：is，通过动态绑定该属性指定渲染的具体组件
- 使用`<keep-alive>`标签可以使得动态切换的组件被停用时（失活）能够进行缓存而不是直接被销毁
  - keep-alive 对应的组件生命周期
    - `activated()`：组件被激活时调用
    - `deactivated()`：组件被停用时调用
  - keep-alive 属性
    - `include:"组件名称"`：指定缓存组件的范围
    - `exclude:"组件名称"`：指定不需要被缓存的组件，与 include 属性互斥，不要同时使用

## 全局 API

### nextTick

- 将回调推迟到下一个 DOM 更新周期之后执行，用于在代码中获取更新后的 DOM 的值，vue是异步更新的

- `this.$nextTick`

- ```js
  <template>
  	<div>
          {{ count }}
      </div>
  </template>
  <script>
      export default {
          data() {
              return {
                  count: 0
              }
          },
          methods: {
              onClick() {
                  this.count++
                  this.count++
  
                  new Promise((resolve) => {
                    	resolve(100)
                  }).then(() => {
                    	this.count++
                    	this.count++
                    	this.$nextTick(() => {
                        	console.log(this.$el.textContent); // 4
                    	})
                  })
                  // 尝试获取DOM的值
                  console.log(this.$el.textContent) // 0
                  this.$nextTick(() => {
                      console.log(this.$el.textContent) // 2
                  })
              }
          },
          updated() {
              console.log('已更新') // 输出两次
          }
      }
  </script>
  ```

  ```
  0
  已更新
  2
  已更新
  4
  ```

## 路由（vue-router）

- 文档：[Vue Router (vuejs.org)](https://router.vuejs.org/zh/installation.html)

- 描述：路由就是一种映射关系（哈希地址与组件之间）

- 一般开发SPA（单页面应用），需要引入前端路由系统

- 两种路由模式

  - hash

    即地址栏中的#号后的内容，hash内容虽热在URL中，但是不会被包含在HTTP请求中，因此对后端没有影响

  - history

     利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法。history模式仍然需要后端配置支持来覆盖所有的合法url。

- vue-router 的安装与配置（路由模块）

  - ```js
    import Vue from "vue";
    import VueRouter from "vue-router";
    //安装插件
    Vue.use(VueRouter);
    
    const router = new VueRouter();
    
    export default router;
    ```

- 使用`<router-view>`占位，作为组件出口

- 使用`<router-link>`代替`<a>`标签

- `VueRouter`实例中的`routes`节点（数组）用于定义规则

  - ```js
    routes: [
      { path: "/home", component: Home },
      { path: "/movie", component: Movie },
      { path: "/about", component: About }
    ];
    ```

- 路由重定向

  - 通过路由规则（routes）中的`redict`属性，指定一个新的路由地址

  - ```js
    routes: [
      { path: "/", redirect: "/home" },
      { path: "/home", component: Home }
    ];
    ```

- 嵌套路由

  - 通过路由实现组件的嵌套显示

  - `chilidren`属性声明子路由规则

  - 默认子路由：子路由规作中的 path 为空，则其就是默认子路由

  - ```js
    routes: [
      {
        path: "/about",
        component: About,
        children: [
          //子路由path没有‘/’，path为空则为默认子路由
          { path: "", component: Tab1 },
          { path: "tab2", component: Tab2 }
        ]
      }
    ];
    ```

### 动态路由

- 把 Hash 地址中的可变部分定义为动态路径参数项（使用`:参数项名称`定义），提高路由规则的复用性
- 组件可以通过`this.$route.param.参数项名称`获取路径参数项数据
- 使用`props:true`开启路由规则的 props 传参，来方便地拿到参数项的值

### 编程式（js）导航

- 使用标签的称为**声明式导航**

- 通过操作 router 实例调用 API 来导航称为**编程式导航**，API 效仿 window.history 的 API

- `this.$router.push(location)`

  - 跳转到指定的哈希地址，这个方法会向 history 栈添加一个新的记录

  - ```js
    // 字符串
    router.push("home");
    // 对象
    router.push({ path: "home" });
    // 命名的路由router.push({ name: 'user', params: { userId: '123' }})
    
    // 带查询参数，变成 /register?plan=private
    router.push({ path: "register", query: { plan: "private" } });
    ```

- `this.$router.replace(location)`

  - 替换当前路由记录

- `this.$router.go(n)`

  - 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步
  - `$router.back()`：后退一步
  - `$router.forward()`：前进一步

### 导航守卫

- 描述：控制路由的访问权限（eg.未登录时跳转登录页面）

- 守卫是异步解析执行

- 全局前置守卫

  - 使用 `router.beforeEach` 注册一个全局前置守卫

  - ```js
    const router = new VueRouter({ ... })
    
    router.beforeEach((to, from, next) => {
      // ...
    })
    ```

  - 守卫方法的三个参数

    - `to: Route`: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)
    - `from: Route`: 当前导航正要离开的路由
    - **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**。next 方法的不同调用方式：
      - `next()`：即放行
      - `next(false)`：中断当前导航，返回 from 路由对应的地址
      - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

  - 使用导航守卫需要判断多个路由地址，一般采用把这些地址作为数组封装在单独模块中，使用`pathArr.indexof(to.apth)!==-1`判断路由地址是否在数组中

## vue-cli

- 描述：vue-cli 是 Vue.js 开发的标准工具。它简化了程序员基于 webpack 创建工程化的 Vue 项目的过程。

### 项目创建

- 安装 Vue CLI `npm install -g @vue/cli`
- 创建项目 `create hello-world`

### 运行流程

- 通过 main.js 把 App.vue 渲染到 index.html 的指定区域中。

## Vuex

- 描述：Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。

- 原理：把组件的共享状态抽取出来，以一个**全局单例模式**管理

- 基本使用：

  1. 在根实例（main.js）中注册`store`选项
  2. 子组件中通过`this.$store.state.属性名`获取状态变量，一般放在计算属性中
  3. 可以使用 `mapState` 辅助函数帮助我们生成计算属性，当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。使用对象展开运算符`...`展开 `mapState` 辅助函数生成的对象。
  4. 提交 `mutation`来改变`state`

- State

  - 存储表示状态的数据（数据驱动），Vuex 中的`data`，**单一**状态树

- Getters

  - 可以看做 Vuex 中的计算属性，可以用于计算 state 中的派生状态或进行过滤，接受`state`作为其第一个参数

- Mutations

  - 类似于事件，一般用于更改`state`中的属性，需要使用`commit`方法来提交该事件（方便 devtool 捕捉记录）

  - `mutation`必须是同步函数

  - 使用技巧：使用`[]`常量替代`mutation`事件类型（代码提示友好，不易出错），抽离到单独文件

  - 使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用

  - ```js
    import { mapMutations } from "vuex";
    
    export default {
      // ...
      methods: {
        ...mapMutations([
          "increment", // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    
          // `mapMutations` 也支持载荷：
          "incrementBy" // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
          add: "increment" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
      }
    };
    ```

- Actions

  - 类似于`mutation`，用于提交`mutation`，而非直接变更状态
  - 可以包含**异步操作**
  - 通过`store.dispatch` 方法触发，返回`Promise`

- Modules

## 实践优化

- 死数据：一些始终不会改变的数据（校验规则、写死的表格数据），可以不进行响应式处理，将其定义在`data`的return对象之外。

## 原理

### 双向数据绑定

- vue的双向数据绑定是依靠**数据劫持**（检测数据变化）和**发布-订阅模式**的结合。
- 计算属性实现传参：计算属性返回一个函数，该在该函数中定义并使用参数，配合使用计算属性时（）传参，实际上是对传回参数进行了一次调用。

#### 数据劫持

数据劫持有两种办法：

- [Object.defineProperty(obj,prop,descriptor)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)（vue2）

  - 使用descriptor中的setter和getter函数捕获prop的访问与更改

    ```js
    Object.defineProperty(car, 'price', {
      enumerable: true,
      configurable: true,
      get(){
        //收集依赖
        console.log('price属性被读取了')
        return val
      },
      set(newVal){
        //通知依赖更新
        console.log('price属性被修改了')
        val = newVal
      }
    })
    ```

- [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)（ES6，vue3）

#### 发布-订阅模式

- 依赖：即绑定了某个数据项的视图，使用`Watcher`实例代表依赖

- 监听器Observer，用来递归遍历data，劫持每一个数据

  ```js
  // 源码位置：src/core/observer/index.js
  
  /**
   * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
   */
  export class Observer {
    constructor (value) {
      this.value = value
      // 给value新增一个__ob__属性，值为该value的Observer实例
      // 相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作
      def(value,'__ob__',this)
      if (Array.isArray(value)) {
        // 当value为数组时的逻辑
        // ...
      } else {
        this.walk(value)
      }
    }
  
    walk (obj: Object) {
      const keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i])
      }
    }
  }
  /**
   * 使一个对象转化成可观测对象
   * @param { Object } obj 对象
   * @param { String } key 对象的key
   * @param { Any } val 对象的某个key的值
   */
  function defineReactive (obj,key,val) {
    // 如果只传了obj和key，那么val = obj[key]
    if (arguments.length === 2) {
      val = obj[key]
    }
    if(typeof val === 'object'){
        new Observer(val)
    }
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get(){
        dep.depend()    // 在getter中收集依赖
        return val;
      },
      set(newVal){
        if(val === newVal){
            return
        }
        val = newVal;
        dep.notify()   // 在setter中通知依赖更新
      }
    })
  }
  ```

  

- 消息中心Dependence（Dep），用来收集订阅者，即依赖收集，并在数据变化时，通知订阅者

  - 维护一个Watcher数组，Watcher实例在初始化时通过调用get（访问相关属性）来加入数组（依赖收集）

  ```js
  // 源码位置：src/core/observer/dep.js
  export default class Dep {
    constructor () {
      this.subs = []
    }
  
    addSub (sub) {
      this.subs.push(sub)
    }
    // 删除一个依赖
    removeSub (sub) {
      remove(this.subs, sub)
    }
    // 添加一个依赖
    depend () {
      if (window.target) {//全局变量：window.taget用于存放Watcher实例，会在Watcher实例初始化时被赋值和释放
        this.addSub(window.target)
      }
    }
    // 通知所有依赖更新
    notify () {
      const subs = this.subs.slice()
      for (let i = 0, l = subs.length; i < l; i++) {
        subs[i].update()
      }
    }
  }
  
  /**
   * Remove an item from an array
   */
  export function remove (arr, item) {
    if (arr.length) {
      const index = arr.indexOf(item)
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }
  ```

- 订阅者Watcher，代表依赖，接收数据变化，并进行最后的更新视图操作

  ```js
  export default class Watcher {
    constructor (vm,expOrFn,cb) {
      this.vm = vm;
      this.cb = cb;
      this.getter = parsePath(expOrFn)
      this.value = this.get()
    }
    get () {
      window.target = this;//全局变量window.target
      const vm = this.vm
      let value = this.getter.call(vm, vm)
      window.target = undefined;
      return value
    }
    update () {
      const oldValue = this.value
      this.value = this.get()
      this.cb.call(this.vm, this.value, oldValue)
    }
  }
  
  /**
   * Parse simple path.
   * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
   * 例如：
   * data = {a:{b:{c:2}}}
   * parsePath('a.b.c')(data)  // 2
   */
  const bailRE = /[^\w.$]/
  export function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    const segments = path.split('.')
    return function (obj) {
      for (let i = 0; i < segments.length; i++) {
        if (!obj) return
        obj = obj[segments[i]]
      }
      return obj
    }
  }
  ```

- 依赖收集流程：

  - 实例化`Watcher`实例时执行构造函数，其中调用了`this.get()`方法
  - `this.get()`方法中
    -  `window.target = this`将自身赋给全局变量`window.target`，方便`Dep`添加
    - `let value = this.getter.call(vm, vm)`获取被依赖的数据，触发`getter`，调用`dep.depend()`收集依赖，通过全局变量`window.target`传值
    - `window.target = undefined`，释放全局变量

#### vue2数据劫持的不足与解决

- 对象属性的添加或删除无法被检测，Vue 不能动态添加**根级别**的响应式属性。但是，可以使用 `Vue.set(object, key, value)` 方法向**嵌套对象**添加响应式属性。
- `Object.defineProperty`不支持数组，因此Vue重写了数组的很多方，使得这些方法也能触发视图更新，都仍然不能检测以下变动:

  - 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
  - 当你修改数组的长度时，例如：`vm.items.length = newLength`

### diff算法

 [15张图，20分钟吃透Diff算法核心原理，我说的！！！ - 掘金 (juejin.cn)](https://juejin.cn/post/6994959998283907102#heading-8)

- 虚拟DOM：用来表示真实DOM的JS对象，diff算法的基石（比较对象）

- diff算法，顾名思义是一种对比算法，通过对比虚拟DOM，找出更新真实DOM的最小操作（尽可能多地复用）。vue的diff算法是深度优先算法，事件复杂度O(n)

- 具体机制：

  - 同层比较：新旧虚拟DOM对比的时候，Diff算法比较只会在同层级进行, 不会跨层级比较。

  - 使用`sameVnode`方法对比当前同层的虚拟节点是否为同一种类型的标签，是则进行深层比较（`patchVnode`），不是就直接替换成新虚拟DOM。

    ```js
    function sameVnode(oldVnode, newVnode) {
      return (
        oldVnode.key === newVnode.key && // key值是否一样
        oldVnode.tagName === newVnode.tagName && // 标签名是否一样
        oldVnode.isComment === newVnode.isComment && // 是否都为注释节点
        isDef(oldVnode.data) === isDef(newVnode.data) && // 是否都定义了data
        sameInputType(oldVnode, newVnode) // 当标签为input时，type必须是否相同
      )
    }
    ```

  - `patchVnode`：确定需要进行深层比较

    - 找到对应的`真实DOM`，称为`el`
    - 判断`newVnode`和`oldVnode`是否指向同一个对象，如果是，那么直接`return`
    - 如果他们都有**文本节点**并且不相等，那么将`el`的文本节点设置为`newVnode`的文本节点。
    - 如果`oldVnode`有子节点而`newVnode`没有，则删除`el`的子节点
    - 如果`oldVnode`没有子节点而`newVnode`有，则将`newVnode`的子节点真实化之后添加到`el`
    - 如果两者都有子节点，则执行`updateChildren`函数比较子节点，这一步很重要

    ```js
    function patchVnode(oldVnode, newVnode) {
      const el = newVnode.el = oldVnode.el // 获取真实DOM对象
      // 获取新旧虚拟节点的子节点数组
      const oldCh = oldVnode.children, newCh = newVnode.children
      // 如果新旧虚拟节点是同一个对象，则终止
      if (oldVnode === newVnode) return
      // 如果新旧虚拟节点是文本节点，且文本不一样
      if (oldVnode.text !== null && newVnode.text !== null && oldVnode.text !== newVnode.text) {
        // 则直接将真实DOM中文本更新为新虚拟节点的文本
        api.setTextContent(el, newVnode.text)
      } else {
        // 否则
    
        if (oldCh && newCh && oldCh !== newCh) {
          // 新旧虚拟节点都有子节点，且子节点不一样
    
          // 对比子节点，并更新
          updateChildren(el, oldCh, newCh)
        } else if (newCh) {
          // 新虚拟节点有子节点，旧虚拟节点没有
    
          // 创建新虚拟节点的子节点，并更新到真实DOM上去
          createEle(newVnode)
        } else if (oldCh) {
          // 旧虚拟节点有子节点，新虚拟节点没有
    
          //直接删除真实DOM里对应的子节点
          api.removeChild(el)
        }
      }
    }
    ```

  - `updateChildren`：比较子节点，首尾指针法进行子节点顺序匹配。

    



