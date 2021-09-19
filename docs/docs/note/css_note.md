---
title: CSS笔记
categories: CSS
tags: 
- notes
- CSS
---

## 基础

### 选择器

| 选择器         | 作用                       | 格式                     | 优先级权重 |
| -------------- | -------------------------- | ------------------------ | ---------- |
| id选择器       | 通过id选择元素             | #id                      | 100        |
| 类选择器       | 通过类名选择元素           | .classname               | 10         |
| 属性选择器     | 通过属性键值选择元素       | [attribute]              | 10         |
| 伪类选择器     | 通过元素状态选择元素       | eg. a:link               | 10         |
| 标签选择器     | 通过标签名选择元素         | eg .  div                | 1          |
| 伪元素选择器   | 设置元素指定部分的样式     | selector::pseudo-element | 1          |
| 相邻兄弟选择器 | 选择紧邻其后的同父同级元素 | eg. h1+p                 | 0          |
| 子选择器       | 选择父子关系的元素         | eg. div>p                | 0          |
| 后代选择器     | 后代即可                   | eg. div p                | 0          |

- 优先级规则

  !important > 内联样式 > ID选择器 > class选择器 > 标签选择器 > 通配符（*） > 浏览器默认样式 > 继承样式

### 可继承属性

- 字体系列：font-weight、font-size、font-style……
- 文本属性：text-indent、text-align、line-height、color、word-space……

- 元素可见性：visibility
- 列表属性：list-style

### display

- block：显示为块级元素，独占一行，可以设置width、height、margin和padding属性，不设置宽度则根据**父元素**自动计算
- inline：显示为行内元素，不独占一行，不会自动换行，设置width、height属性无效。但可以设置**水平方向**的margin和padding属性，不能设置垂直方向的padding和margin
- inline-block ：将对象设置为inline对象，但对象的内容作为block对象呈现，之后的内联对象会被排列在同一行内。可以设置宽高，但是不独占一行。不设置宽度，则其宽度由**子元素**决定。
- img元素比较特殊，其display为inline，但是表现更贴近inline-block。

### 元素隐藏

- `display:none`：该元素不会在页面中占据位置，也不会响应绑定的监听事件。是非继承属性，但是子孙节点会同父节点一起从渲染树中移除，所以子孙节点重设属性也无效。`v-show`的底层实现。
- `visibility: hidden`：元素在页面中仍占据空间，但是不会响应绑定的监听事件。继承属性，子孙节点可以通过修改属性来显示。
- `opacity: 0`：css3，将元素透明度设置为0，元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。

### 盒模型

- 从外到内：margin->border->padding->content
- 可以通过修改box-sizing属性来改变元素的盒模型，默认为标准盒模型
- 标准盒模型（content-box）：宽高都是content的宽高
- 怪异盒模型（border-box）：宽高包含了padding和border

### 转换（transform）

- 包含平移（translate）、旋转（rotate）、缩放（scale）功能，常用于改变元素位置。
- translate 是 transform 属性的⼀个值。改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。

### 引入

- `link`：属于html标签，除了引入css还可以用于其他事务，
- `@import`：只能用于加载CSS，引入的样式在页面加载完毕后加载

### transition

- 强调过渡，需要触发一个事件才执行动画，经常搭配伪类（:hover）使用，设置一个开始关键帧，一个结束关键帧。

### animation

- 不需要触发事件，可以设置多个关键帧，更为强大。

### 预处理器与后处理器

- 预处理器：如sass、less，用于预编译css，增加一些编程特性，如层级、mixin、变量等，增加开发便捷度。
  - 预处理器支持我们写类CSS语言（一般更强大），之后再编译为css，即类css->预处理器->css其好处有：
  - 嵌套代码，通过嵌套来反映元素层级
  - 支持变量，统一管理
  - 允许对代码片段进行`mixin`和`extend`
- 后处理器：如postCss，通常是在完成的样式表中根据`css`规范处理`css`，让其更加有效。目前最常做的是给`css`属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。
  - 后处理器处理的就是css代码，其工作类似于JS中的Babel，它可以编译尚未被浏览器广泛支持的先进的 CSS 语法，还可以自动为一些需要额外兼容的语法增加前缀。

## 定位与浮动

### position（定位）

- relative（相对定位）：相对于其原来的位置进行定位。元素的位置通过left、top、right、bottom属性进行规定。不脱标。
- absolute（绝对定位）：相对于static定位以外的一个父元素进行定位。元素的位置通过left、top、right、bottom属性进行规定。脱标。
- fixed（固定定位）：指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，⽐如回到顶部的按钮⼀般都是⽤此定位⽅式。
- 

## 页面布局

### 布局单位（px、%、em、rem……）

- px（像素）：绝对长度单位
  - 逻辑像素：为web开发者提供，在CSS中使用的一个抽象单位；
  - 物理像素：只与设备的硬件屏幕有关，任何设备的物理像素都是固定的。

- %（百分比）：根据父元素设置百分比
- em：文本相对长度，即以当前元素的文本字体大小为单位
- rem：以根元素（html元素）的字体大小为单位
-  vm/vh：根据视图窗口定义的相对单位

### flex布局

- flex布局是CSS3新增的一种布局方式，可以通过将一个元素的display属性值设置为flex从而使它成为一个flex容器，它的所有子元素都会成为它的项目。

- 容器属性

  ```css
  .flex-container {
      display: flex;
      flex-direction: row;
      /* 主轴的方向，默认row，从左往右 */
      flex-wrap: nowrap;
      /* 是否换行，默认不换行*/
      justify-content: center;
      /* 主轴上的对齐，默认flex-start */
      align-items: center;
      /* 交叉轴上的对齐，默认值flex-start */
      align-content: center;
      /* 多条轴线的布局 */
  }
  ```

- 项目属性

  ```css
  .flex-items {
      order: 2;
      /* 项目的order， 越大的越后面*/
      flex-grow: 1;
      /* 扩张比例，默认0，不占剩余空间 */
      flex-shrink: 0;
      /* 缩小比例，默认1，自动缩小*/
      flex-basis: 200px;
      /* 主轴上的宽度 */
      flex: 1 0 200px;
      /* 上面三条的缩写 */
      align-self: flex-end;
      /* 修改项目的交叉轴布局*/
  }
  ```

  

### 水平居中

- 块元素设置margin

  ```css
  margin: 0 auto;
  /* 需要设置宽度，行内元素无法设置宽高 */
  ```

- 行内元素：父元素中设置text-align

  ```css
  text-align: center;
  /* 在父元素中设置 */
  ```

### 水平垂直居中

- 绝对定位+负边距（盒子宽高已知）

  ```css
  .outer {
      position: relative
  }
  .inner {
      width: 200px;
      height: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -100px; 
  }
  ```

- 绝对定位+`margin:auto`（盒子有宽高都是不确定）

  ```css
  .parent {
      position: relative;
  }
  .child {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
  }
  ```

- 绝对定位+` transform: translate(-50%, -50%)`（宽高不确定）

  ```css
  .outer {
      position: relative
  }
  
  .inner {
      width: 200px;
      height: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  ```

- flex+`margin:auto`

  ```css
   .outer {
       display: flex;
       height: 200px;
       width: 100px;
       background-color: pink;
   }
   .inner {
       background-color: purple;
       margin: auto;
   }
  ```

- 纯flex

  ```css
  .outer {
      display: flex;
      /* 主轴对齐 */
      justify-content: center;
      /* 副轴对齐 */
      align-items: center;
  }
  ```

### 两栏布局

左侧宽度固定、右侧自适应

- 浮动+`margin-left`

- 浮动+`overflow:hidden/auto`触发BFC

  ```css
  .outer {
    height: 100px;
  }
  .left {
    float: left;
    width: 200px;
    background: tomato;
  }
  .right {
    margin-left: 200px;
      /* 或者设置overflow: hidden;触发BFC */
    background: gold;
  }
  ```

- flex（利用flex-grow占用剩余空间的特点）

  ```css
  .outer {
    display: flex;
    height: 100px;
  }
  .left {
    width: 200px;
    background: tomato;
  }
  .right {
    flex: 1;
    background: gold;
  }
  ```

### 三栏布局

左右两栏宽度固定，中间自适应

- 圣杯布局：浮动+负边距

  - 全员浮动

  - 父元素padding留空间

  - 通过负边距将左右列移回顶部

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body {
                min-width: 500px;
                margin: 0;
                padding: 0;
            }
    
            .container {
                padding: 0 200px 0 150px;
                overflow: hidden;
            }
    
            .center {
                background-color: blue;
                height: 800px;
                width: 100%;
            }
    
            .left {
                background-color: yellow;
                width: 150px;
                height: 200px;
                margin-left: -100%;
                position: relative;
                left: -150px;
            }
    
            .right {
                background-color: red;
                width: 200px;
                height: 200px;
                margin-right: -200px;
    
            }
    
            .container>div {
                float: left;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="center"></div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>
    
    </html>
    ```

- 双飞翼布局：与圣杯不同法是，中间列margin实现位置保留

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>双飞翼布局</title>
      <style>
        *{
          margin: 0;
          padding: 0;
        }
        body {
          min-width: 500px;
        }
        .left {
          background-color: red;
          width: 150px;
          height: 150px;
          margin-left: -100%;
        }
        .right {
          background-color: yellow;
          width: 200px;
          height: 150px;
          margin-left: -200px;
        }
        .container {
          width: 100%;
    
        }
        .center {
          margin-left: 150px;
          margin-right: 200px;
          height: 300px;
          background-color: blue;
        }
        .column {
          float: left;
        }
      </style>
    </head>
    <body>
      <div class="container column">
        <div class="center"></div>
      </div>
      <div class="left column"></div>
      <div class="right column"></div>
    </body>
    </html>
    ```

  

