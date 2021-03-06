---
title: 浏览器相关知识
categories: JavaScript
tags: 
- notes
- 性能优化
---

## HTTP缓存机制

- 缓存即服务器资源的客户端本地副本。
- 缓存一般只适用于不更新服务端数据的操作，一般`GET`请求（通常为查找操作）不改变服务端数据，所以可以使用缓存，而`POST`请求往往用于操作数据增删改，不会使用缓存。
- 优点：
  - 提高网页打开速度，优化用户体验
  - 减少服务器压力
  - 减少带宽损耗
- 缺点：
  - 处理不当会导致页面与服务端数据不匹配（滞后）

### 具体机制

浏览器请求的资源都会根据缓存规则进行存储，浏览器进行资源请求时：

1. 查看是否有该资源缓存，若不存在，则向服务器发起资源请求
2. 缓存存在，根据控制字段**`Expires`**（http1.0，绝对时间）或**`Cache-Control`**（http1.1，高优先级，相对时间）判断缓存是否过期。
   1. **强制缓存**：缓存未过期，读取缓存资源使用。资源状态码显示为`200`。
   2. **协商缓存**：若缓存已过期，浏览器携带缓存标识向浏览器发起请求，服务器判断资源是否修改
      1. 资源未修改，返回`304`，协商缓存生效，具体判断方法见协商缓存控制字段
      2. 资源修改，返回新的资源，浏览器更新页面及缓存

- 强制缓存控制字段：
  - `Expires`：http1.0时使用，值为一个绝对时间（就像保质期）
  - `Cache-Control`：http1.1新增，优先级高于`Expires`，主要取值有：
    - public：所有内容都将被缓存（客户端和代理服务器（中间人）都可缓存）
    - private：所有内容只有客户端可以缓存，Cache-Control的默认取值
    - no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
    - no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
    - max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效
- 协商缓存控制字段：
  - `Last-Modified / If-Modified-Since `：
    - `Last-Modified `（响应头）：服务器响应请求时，返回该资源文件在服务器最后被修改的时间，秒级精确度，可能会导致缓存命中不准确
    - `If-Modified-Since `（请求头）：客户端发起请求时，若被请求资源响应头部有`Last-Modified `字段，则将其作为`If-Modified-Since `字段发送，服务器根据该字段值判断资源缓存与现存资源是否匹配
  - `Etag / If-None-Match`（高优先级）
    - `Etag`（响应头）：服务器返回的资源的唯一标识（由服务器生成，资源若修改就会生成新的`Etag`）
    - `If-None-Match`（请求头）：客户端发起请求时，若被请求资源响应头部有`Etag `字段，则将其作为`If-None-Match `字段发送，服务器根据该字段值判断资源缓存与现存资源是否匹配。

### 强制缓存后端实现

```js
const Koa = require("koa")
const app = new Koa()
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))
app.use(async ctx => {
    if (ctx.url === '/') {
        console.log(111);
        const file = await fs.readFileAsync('./dist/index.html')
        ctx.type = 'text/html'
        ctx.body = file
    }
    if (ctx.url === '/image.png') {
        console.log(222);
        const file = await fs.readFileAsync('./dist/image.png')
        ctx.set('Cache-Control', 'max-age=10')
        ctx.type = 'image/png'
        ctx.body = file
    }
})
app.listen(3000)
```

### 协商缓存后端实现

```js
const getEtag = require('etag')
app.use(async ctx => {
    if (ctx.url === '/') {
        const file = await fs.readFileAsync('./dist/index.html')
        ctx.type = 'text/html'
        ctx.body = file
    }
    if (ctx.url === '/image.png') {
        const file = await fs.readFileAsync('./dist/image.png')
        const hash = getEtag(file)
        const etag = ctx.get('If-None-Match')
        if (etag && etag == hash) {
            ctx.status = 304
            ctx.body = ''
        } else {
            if (!etag) ctx.set('ETag', hash)
            ctx.type = 'image/png'
            ctx.body = file
        }
    }
})
```

## 跨域

### 同源

如果两个 URL 的 [protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)、[port (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Port) (如果有指定的话)和 [host](https://developer.mozilla.org/zh-CN/docs/Glossary/Host) 都相同的话，则这两个 URL 是**同源**。

**同源策略**，即指在**没有授权的情况下**，不同的源无法读写对方的资源，发送请求会失败。主要是出于安全考量，针对JS的限制。该限制具体体现在：
- 当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。
- 当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。
- 第三个是当前域下 `ajax `无法发送跨域请求。


有时需要突破同源策略的限制，实现不同源资源的交互，称为**跨域**。

跨域的主要实现方式如下。

### 跨域资源共享（CORS）

- 原理：W3C制定的标准，主要在**服务端实现**的跨域。设置响应头部字段`access-control-allow-origin`即可实现。

```js
ctx.set('Access-Control-Allow-Origin', '*') // *代表任意源
ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000') // 指定源
```

在使用CORS时，浏览器把请求分为简单请求和非简单请求。

- 简单请求需满足以下条件：

  - 请求方法为 `HEAD`或`GET`或`POST`
- 头部限制：`Content-Type`只限：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`，只能有像`Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`这类的请求头部
- 不满足简单请求条件的均视为非简单请求
  - 针对非简单请求，在实际通信之前会增加一次HTTP通信，称为**预检请求**，方法为`OPTIONS`

### jsonp

- 原理：**前后端配合**实现，利用了使用`<script>`标签加载资源时不受同源策略限制。通过动态构建`<script>`标签请实现跨域。通过在请求的 url 后指定一个**回调函数**，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，因为请求的是脚本文件，所以会直接执行，这样我们先前定义好的回调函数就可以被调用。

  ```html
  <script>
  	function doSomething(json) {
      	//do something
  	}
  </script>
  
  <script src="http://api.example.com/data?callback=doSomething&parma=a"></script>
  ```

  ```js
  ctx.body = `doSomething(${myJson})` // 包装json
  ```

- 限制：只能用于`GET`请求

### 代理服务器

- 原理：**前端可独立完成**，同源策略是针对浏览器的，服务器之间通信不受该策略制约。可以设置一个代理服务器，这个代理服务器（伪后端）是由前端程序员实现，可执自行设置`CORS`等，故可建立`浏览器<-->代理服务器<-->真服务器`的通信

- 注意：一般在后端无法配合时使用，真正发布产品一般不会使用（脱裤子放屁，增加冗余依赖）

### document.domain

- 一般用于子域名之间跨域，例如共享`cookie`，将 `document.domain `设置为主域名。

### window.name

- 用于父窗口和iframe窗口的通信。该属性的特点是：无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。实际上也是一种代理机制。
- 优点：可以传输大量数据

### location.hash

- 同样用于父窗口和iframe窗口的通信。利用只是改变片段标识符(fragment/hash)，页面不会重新刷新的特点。父窗口改变iframe的`src`属性，iframe窗口监听`hash`变化

### postMeassge

- `h5`新增api[`window.postMessage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)，跨文档通信，实现多窗口数据通信，简单直接。

## 浏览器存储&前端鉴权

### LocalStorage

- 持久化的本地存储，除非主动删除否则数据一直存在。一般最大存储量在5MB。

- ```js
  localStorage.setItem('my_key', 'my_value')
  localStorage.getItem('my_key')
  localStorage.removeItem('my_key')
  localStorage.clear()
  ```

### SessionStorage

会话级的本地存储，页面被关闭，数据就会清除，大小限制一般为5MB。

### Cookie-鉴权基石

[前端鉴权必须了解的 5 个兄弟：cookie、session、token、jwt、单点登录 ](https://mp.weixin.qq.com/s?__biz=MzUxODc0ODQ1NA==&mid=2247490028&idx=1&sn=26ac243ad0923dac22e860216ffdfcdd&chksm=f98579a5cef2f0b34d18c1fdefae98b0c9dd06d4aaaaa94c356dd34ab387601c83a23d8b8cb5&mpshare=1&scene=23&srcid=0913aESwBLg0511tAIRgFJvA&sharer_sharetime=1631507442661&sharer_shareid=69d300a0e9a6766d9dcf9aa183cf777d#rd)

- 概述：服务器提供的一种用于维护会话状态信息的**标记数据**，通过服务器发送到浏览器，浏览器**保存在本地**，当下一次有同源的请求时，将保存的 cookie 值添加到请求头部，发送给服务端。这可以用来实现记录用户登录状态等功能。（可以做到前端无感）

- 服务器一般使用`Set-Cookie` 的响应头部来配置 cookie 信息，cookie存放的数据不能大于4KB。

- cookie属性

  - `expires`：cookie的过期时间，在http1.1中由`max-age`代替
  - `domain`：只能访问该域名时才会带上cookie
  - `path`：表明只有访问该路径时才会带上cookie，与`domain`配合使用
  - `httpOnly`：为`true`时，浏览器不能通过代码读取cookie，即不能被浏览器上的js脚本访问
  - `secure`: 为`true`时，只有发送HTTPS请求时才会带上cookie
  - `SameSite`：用于防止CSRF攻击，默认为`lax`，不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。详参：[Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)

- Cookie与Storage对比

  - 存储大小限制：Storage5MB，cookie4KB
  - Cookie可以设置过期时间
  - Cookie一般由后端操作，前端无感，主要用于鉴权标记

- 简易cookie操作封装（前端操作）

  ```js
  const cookieUtil = {
      setItem(name, value, days) {
          let date = new Date()
          date.setDate(date.getDate() + days)
          document.cookie = `${name}=${value};expires=${date}`
      },
  
      getItem(name) {
          let arr = document.cookie.split(';')
          let ret 
          arr.forEach(item => {
              let tempArr = item.split('=')
              if (tempArr[0] === name) {
                  ret = tempArr[1]
              }
          })
          return ret
      },
  
      removeItem(name) {
          this.setItem(name, null, -1)
      }
  }
  ```

### Session-会话状态管理方案

- 使用`Session`时一般要搭配`Cookie`，在**服务端存储**维护`Seesion`数据（比如存储在redis数据库），而`Cookie`中只存储一个`Session_id`这样的键（标记）。
- Session和Cookie搭配使用鉴权的大致流程
  - 浏览器发出登录请求，服务端比对成功后，创建Session对象。将对应的Session_id通过Set-Cookie的方式发送给浏览器
  - 浏览器根据响应头种下`Cookie`
  - 在登录状态下请求个人数据，浏览器发起请求时自动携带`Cookie`信息，其中包含`Session_id`
  - 服务端在维护的Session数据库中可以找到该id，就能返回对应的个人数据
- 缺陷
  - Cookie：针对跨域场景无力
  - Session：分布式（服务器集群）场景下必须共享会话数据，后端维护较为麻烦

### JWT-成熟的token编码方案

- `token`方案：把会话数据都存放在客户端，解决后端维护Session的问题
- `token`是由服务器生成的包含用户数据信息的字符串，JWT是用于生成安全可靠的token的一种规范。
- JWT下的token字符串由三部分组成，各部分之间以`.`来分割。
  - Header：一个用于声明类型与加密算法的JSON对象经过`Base64`编码生成
  - PayLoad：会话数据经过`Base64`编码后生成，这一部分信息就是原来Session的内容
  - Signature：对前两部分内容的加密签名，用于防止假冒。服务端通过前两部分的值（原信息）、签名算法、服务端私有密钥生成。
- JWT一般存储在`localstorage`或者`cookie`中（必定在客户端），在这之后发请求时会将`token`提取出来，或是放在`Authorization: Bearer ${token}`请求头部中，又或是直接作为请求的参数字段发送给后端，以供后端解析鉴权。



