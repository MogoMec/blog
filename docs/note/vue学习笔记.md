# Vue学习笔记 

## Vue基础

- JS框架
- 简化DOM操作
- 响应式数据驱动
- 双向数据绑定

## MVVM（狭义）

- Model：数据源
- View：页面所渲染的DOM的结构
- ViewModel：vue实例，是MVVM的核心，负责监听事件、数据绑定

### 第一个Vue

1. 导入开发版本Vue.js

2. 创建Vue实例对象，设置el属性和data属性

3. 使用简洁的模板语法把数据渲染到页面上

   ```html
   <div id="app">
     {{ message }}
   </div>
   ```

   ```javascript
   var app = new Vue({
     el: '#app',
     data: {
       message: 'Hello Vue!'
     }
   })
   ```

- el：挂载点
  - 设置Vue实例挂载的元素，设置选择器（建议使用id选择器，语义化）。
  - el命中的元素的子元素也受到该vue实例控制。
  - 不允许挂载到html或者body标签上。
- data：数据对象
  - Vue使用的数据定义在data中
  - data中可以使用对象、数组等类型
  - 渲染复杂数据，遵守js语法即可

## Vue指令

- v-text：设置标签的文本值
  - 作为属性写入标签中，会替换所有内容
  - 使用插值表达式可以进行局部替换
  - 能使用内部表达式

- v-html：设置元素的innerHTML
  
- 写入的html结构会被解析为标签
  
- v-on：为元素绑定事件

  - ```vue
    v-on:事件 = ’方法‘
    @事件 = '方法'
    ```

  - 方法定义在Vue实例内部methods对象中

  - 使用Vue是将操作DOM转化为操作Vue实例中的数据，使用this获取数据

  - 可以传递自定义参数

  - 需要访问原始DOM事件，可以使用特殊变量 `$event` 获取

  - 使用事件修饰符[API — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/api/#v-on)

  - 使用事件修饰符以保证在方法中只有纯粹的数据逻辑，而没有处理DOM的细节。

- v-show：根据表达式的真假，切换元素的显示与隐藏（操作display属性）

  - ```
    v-show:逻辑表达式
    ```

  - 逻辑表达式可以使用Vue实例中的属性

  - 原理：动态添加和删除`display:none`属性

  - 数据改变后对应元素状态会实时更新

- v-if：根据表达值的真假,切换元素的显示和隐藏（操作dom元素）
  - 直接操作DOM性能消耗较大
  - 频繁切换使用v-show

- v-bind：用于设置元素的属性，通用性强

  - ```vue
    v-bind：属性名=“表达式”
    ：属性名=“表达式”
    ```

  - ```html
    <div id="app">
        {{message}}
    </div>
    <div id="app">
        <!-- 设置图片源属性 -->
        <img v-bind:src="imgSrc">
        <img v-bind:title="imgtitle+'!!!!">
        <!-- 使用三元表达式根据数据设置类 -->
        <img v-bind:class="isActive?'active':">
        <!-- 使用对象设置类 -->
        <img v-bind:class=" {active:isActive}">
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
        })
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

  - 双向：表单与Vue实例数据之间绑定，任意一方修改另一方都会同步修改
  - 修饰符
    - .lazy：input触发转为change触发
    - .number：自动将用户的输入值转为数值类型
    - .trim：自动过滤用户输入的首尾空白字符

### 自定义指令

- 描述：一般情况，Vue架构中不推荐直接对DOM进行操作，但是也允许自定义指令来对普通DOM元素进行底层操作

- [自定义指令 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/custom-directive.html#ad)

- 私有自定义指令

  - 在vue组件中的`directives`节点下声明

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

    

- 全局自定义指令

  - ```js
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    })
    ```

- 钩子函数

  - `bind`：只**调用一次**，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  - `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  - `update`：所在组件的 VNode 更新时调用，一般较常用。**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

  - `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
  - `unbind`：只调用一次，指令与元素解绑时调用。

- 钩子函数参数

  - `el`：指令所绑定的元素，可以用来直接操作 DOM。
  - `binding`：一个对象，包含以下 property：
    - `name`：指令名，不包括 `v-` 前缀。
    - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。

- 函数简写

  - 如果bind和update函数中的逻辑完全相同，则自定义指令可写成函数形式

    ```js
    Vue.directive('color-swatch', function (el, binding) {
      el.style.backgroundColor = binding.value
    })
    ```

    

## 计算属性

- computed
- 尽量以属性方式给其中函数取名
- 计算属性中的函数调用时不需要加小括号
- **计算属性是基于它们的响应式依赖进行缓存的**。适合例如需要遍历数组的操作。

## 过滤器（vue2）

- ```javascript
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
  ```

- ```html
  <p>{{message|capitalize}}</p>
  ```

- 本质是一个函数

- 常用于格式化文本

- 使用管道符`|`调用

## 侦听器

- 描述：watch侦听器允许开发者监视数据的变化，从而针对数据的变化做特定的操作。

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

  

## Vue的生命周期

- Vue组件生命周期即它从创建、运行到销毁的**时间段**
- 钩子函数[vue中的钩子函数（一） - 简书 (jianshu.com)](https://www.jianshu.com/p/1b629947480c)
  - ![lifecycle.png (1200×3039) (vuejs.org)](https://cn.vuejs.org/images/lifecycle.png)
- created()：此时组件的props、data、methods已经可用，但是**模板结构尚未生成**，一般在此时发起AJAX请求(methods)，进行数据获取。
- 

## 虚拟DOM

- 不希望标签被复用可以使用标签的key属性

## 组件化

### 基础

- 描述：组件是可复用的Vue实例，组件时Vue中代码复用和抽象的主要形式

- 官网示例

  ```vue
  Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })
  ```

  

- 组件的data属性必须是一个函数，以此保证每个实例可以维护一份被返回对象的独立拷贝。

- 组件以组件**树**的形式进行组织

### 使用（props等）

- 创建组件构造器： `Vue.extend(组件构造器对象)`

  - Vue组件的原型指向Vue
  - 分离` template`属性：使用 template标签进行模板定义，定义id属性，在定义组件对象时使用#id
  - `data`属性：组件的data属性必须是一个**函数**，函数返回值是一个组件所需数据的**对象**，以此保证每个实例可以维护一份被返回对象的独立拷贝，即组件自己维护自己独立的数据
  - **每个组件必须只有一个根元素**
- 注册组件：`Vue.component(组件名,组件构造器对象)`，Vue中的`components`属性
  - 组件命名推荐短横线命名
  - 全局注册
    - 使用`Vue.component`注册的是全局组件，全局组件可以在多个Vue实例下使用
    - 工程化时在main.js（即打包入口）导入并注册全局组件
  - 局部注册
    - 在Vue实例中的`components`属性下可以注册为局部组件
  - 注册组件的语法糖（实际使用）：不直接调用 `Vue.extend(组件构造器对象)`，将组件对象直接写入`Vue.component(组件名,组件构造器对象)`或者`components`属性
- 使用组件

  - 在html结构中把组件名作为标签名使用即可
  - 在组件中使用v-model进行双向绑定时变量应该设为data或计算属性
- 父组件和子组件（树结构）
  -  在父组件的构造对象中把子组件写入`components`属性进行注册
  -  完成注册的子组件可以使用在父组件的模板方法中
  -  可以办使用这些组件的Vue实例看做根组件
- 父子组件的通信

  - 在开发中，可能会由上层组件进行网络请求获得数据，需要使用子组件进行展示，就需要父子组件通信
  - **Props**（父传子）：在组件对象中`props `属性（数组、对象）中注册属性（声明需要从父级接受的数据），该属性由外部使用组件时作为标签自定义属性（一般用v-bind动态传入）传入，可以在定义组件模板时使用该属性
    - [Prop — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/components-props.html)
    - props是组件的**自定义属性**，在封装组件时，合理使用可以大幅提高组件的复用性
    - 定义`props `属性时可以使用数组也可以使用**对象**，使用对象时可以针对传入数据进行修饰，如限定数据类型、设置默认值（default属性）、设定是否必传
  - 标签自定义属性值不支持驼峰命名，使用-代替驼峰
    
  - **监听子组件事件**（子传父）：子组件调用`$emit()`发送事件，父组件使用`v-on`监听事件，就像监听原生DOM事件一样。
    - `$emit()`：第一个参数传入事件名，第二个参数传入附加信息
- 兄弟组件的数据共享
  - EventBus
  - Vuex
- 父子组件的访问（通过对象）

  - 父访子：
    - `$children`：返回子组件对象数组，通过索引确定子组件，不够灵活
    - `$refs`：返回一个对象，包括**注册过ref属性**的所有DOM元素和组件实例，通过ref值进行定位
  - 子访父：一般不使用
    - `$parent`：返回父实例
    - `$parent`：返回当前组件树的根实例

### slot插槽

- [插槽 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/components-slots.html)

- 描述：组件的插槽用于分发内容，让我们封装的组件更具拓展性，让使用者可以决定组件内部展示的具体内容，使用slot标签预留一个客制化接口。

#### 基本使用

  - 使用slot标签预留一个客制化接口（占位符）
  - 使用组件时在组件对应标签中写入具体替换插槽的标签结构（包括自定义组件）
  - 定义模板时在slot标签中写入子标签作为**默认值**
  - 模板中不包含slot标签，则在组件使用时在组件标签内部的所有内容都会被抛弃

#### 具名插槽

- 描述：在slot标签中有name属性的插槽，`name='插槽名'`
- 使用：
  - 在html结构中写入`slot='插槽名'`（已废弃）
  - 在`template`标签中使用`v-slot:插槽名`指令，再在其中加入html结构
  - 注意：v-slot指令只能应用在`template`标签上，简写：`#插槽名`

#### 作用域插槽

- 作用：让在父级渲染的插槽能够访问子组件中才有的数据（扩展作用域，便于数据共享

- 使用
  - 在slot标签中有使用`v-bind`指令绑定属性，`:属性名='子组件数据字段'`
  - 使用`slot-scope:插槽prop名`（已废弃）
  - 在`template`标签中使用`v-slot:插槽名=’插槽prop名‘`，插槽prop名自定义，一般使用scope，也可以使用解构赋值

### 动态组件

- 描述：动态切换组件的显示与隐藏
- 内置组件：`<component>`，专门用于动态组件的渲染，可以视为一个组件的占位符
- `<component>`组件中包含一个props属性：is，通过动态绑定该属性指定渲染的具体组件
- 使用`<keep-alive>`标签可以使得动态切换的组件被停用时（失活）能够进行缓存而不是直接被销毁 
  - keep-alive对应的组件生命周期
    - `activated()`：组件被激活时调用
    - `deactivated()`：组件被停用时调用
  - keep-alive属性
    - `include:"组件名称"`：指定缓存组件的范围
    - `exclude:"组件名称"`：指定不需要被缓存的组件，与include属性互斥，不要同时使用

### .vue

- template：组件的模板（HTML）解构
- script：组件的交互（JS）行为
- style：组件的样式（CSS） 
  - 设置`lang`属性可以启用css预处理语言，eg.`<style lang="less">`
  - 样式应用域：
    - `<style scoped>`，添加scoped属性解决样式冲突，使得单个组件文件的样式只应用于自己（不包含子组件），底层实现是通过给标签增加唯一属性，再使用属性选择器进行复合选择
    - `/deep/`：使用deep可以在父组件局部作用域的情况下修改子组件样式
- 组件使用
  - template中使用标签使用组件
  - import导入需要的组件
  - 在components节点下

## 全局API

### nextTick

- 将回调推迟到下一个 DOM 更新周期之后执行，用于在代码中获取更新后的DOM的值

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

- 前端路由的工作方式

  1. 用户点击了页面上的路由链接
  2. 导致了URL地址栏中的Hash值发生了变化
  3. 前端路由监听了到Hash地址的变化
  4. 前端路由把当前Hash地址对应的组件渲染都浏览器中

- vue-router的安装与配置（路由模块）

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
      ]
    ```

- 路由重定向

  - 通过路由规则（routes）中的`redict`属性，指定一个新的路由地址

  - ```js
      routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: Home }
      ]
    ```

- 嵌套路由

  - 通过路由实现组件的嵌套显示

  - `chilidren`属性声明子路由规则

  - 默认子路由：子路由规作中的path为空，则其就是默认子路由

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
      ]
    ```

### 动态路由

- 把Hash地址中的可变部分定义为动态路径参数项（使用`:参数项名称`定义），提高路由规则的复用性
- 组件可以通过`this.$route.param.参数项名称`获取路径参数项数据
- 使用`props:true`开启路由规则的props传参，来方便地拿到参数项的值

### 编程式（js）导航

- 使用标签的称为**声明式导航**

- 通过操作router实例调用API来导航称为**编程式导航**，API效仿window.history的API

- `this.$router.push(location)`

  - 跳转到指定的哈希地址，这个方法会向history 栈添加一个新的记录

  - ```js
    // 字符串
    router.push('home')
    // 对象
    router.push({ path: 'home' })
    // 命名的路由router.push({ name: 'user', params: { userId: '123' }})
    
    // 带查询参数，变成 /register?plan=private
    router.push({ path: 'register', query: { plan: 'private' }})
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
    - **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**。next方法的不同调用方式：
      - `next()`：即放行
      - `next(false)`：中断当前导航，返回from路由对应的地址
      - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

  - 使用导航守卫需要判断多个路由地址，一般采用把这些地址作为数组封装在单独模块中，使用`pathArr.indexof(to.apth)!==-1`判断路由地址是否在数组中

## vue-cli

- 描述：vue-cli是Vue.js开发的标准工具。它简化了程序员基于webpack创建工程化的Vue项目的过程。

### 项目创建

- 安装Vue CLI `npm install -g @vue/cli`
- 创建项目 `create hello-world`

### 运行流程

- 通过main.js把App.vue渲染到index.html的指定区域中。



## 实际使用

- 安装vue

  ```shell
  npm install vue -S
  ```

- 安装处理vue单文件组件的loader

  ```shell
  npm install vue-loader vue-template-compiler -D // 处理Vue单文件组件，-D表示开发时依赖
  ```


- axios库使用技巧

  - 把axios挂载到Vue原型（Main.js中）上并配置请求根路径

    - ```js
      axios.defaults.baseURL = 'https://way.jd.com/he/freeweather'
      Vue.prototype.axios = axios
      ```

    - 缺点：仍然不利于API复用
    
  - 作为模块单独抽离

## Vuex

- 描述：Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。

- 原理：把组件的共享状态抽取出来，以一个**全局单例模式**管理

- 基本使用：

  1. 在根实例（main.js）中注册`store`选项
  2. 子组件中通过`this.$store.state.属性名`获取状态变量，一般放在计算属性中
  3. 可以使用 `mapState` 辅助函数帮助我们生成计算属性，当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。使用对象展开运算符`...`展开 `mapState` 辅助函数生成的对象。
  4. 提交 `mutation`来改变`state`

- State

  - 存储表示状态的数据（数据驱动），Vuex中的`data`，**单一**状态树

- Getters

  - 可以看做Vuex中的计算属性，可以用于计算state中的派生状态或进行过滤，接受`state`作为其第一个参数 

- Mutations

  - 类似于事件，一般用于更改`state`中的属性，需要使用`commit`方法来提交该事件（方便devtool捕捉记录）

  - `mutation`必须是同步函数

  - 使用技巧：使用`[]`常量替代`mutation`事件类型（代码提示友好，不易出错），抽离到单独文件

  - 使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用

  - ```js
    import { mapMutations } from 'vuex'
    
    export default {
      // ...
      methods: {
        ...mapMutations([
          'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    
          // `mapMutations` 也支持载荷：
          'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
      }
    }
    ```

- Actions

  - 类似于`mutation`，用于提交`mutation`，而非直接变更状态
  - 可以包含**异步操作**
  - 通过`store.dispatch` 方法触发，返回`Promise`

-  Modules


## SPA

- 单页面应用程序
- 路由





