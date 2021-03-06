---
title: 计算机网络笔记
categories: 计算机网络
tags:
  - notes
  - 计网
  - HTTP
  - DNS
---

## HTTP

- HTTP 是建立在 TCP/IP 基础上（通常）的应用层协议，它被设计用于 Web 浏览器和 Web 服务器之间的通信。基于**请求/响应模型**。HTTP 是**无状态**协议，由此产生了鉴权相关的技术。

### 报文格式

- 分为报文首部（必备）和报文主体，中间用空行分隔。

- 报文首部可以分为起始行和头部

  - 起始行：请求报文：`<method> <request-URL> <version>`；响应报文：`<version> <status> <reason-phrase>`这些字段都使用空格分隔。

  - 头部：

    ![首部总结](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/15/16363db6e0576c28~tplv-t2oaga2asx-watermark.awebp)

### 请求方法

| 方法   | 描述                                                                                                             |
| :----- | ---------------------------------------------------------------------------------------------------------------- |
| Get    | 通常用于请求资源，仅仅只能请求资源                                                                               |
| Post   | 通常用于向服务端发送资源，表单提交常常用 Post                                                                    |
| Delete | 通常用于删除资源                                                                                                 |
| Put    | 通常用于资源的更新，若资源不存在则新建一个                                                                       |
| Option | 通常用于 CORS 的请求预检                                                                                         |
| Head   | 只请求资源的头部，该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源 |

- GET/POST 方法的区别
  - Get 请求的参数放在 URL 里（更不安全），Post 请求的参数放在实体（报文内容）里。
  - Get 使用的 URL 有长度限制，Post 则不受限制

### 状态码

[HTTP 响应代码 - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

- 1XX：信息响应，代表服务器收到请求，需要请求者继续执行操作
- 2XX：成功响应
  - 200：请求成功，成功含义取决于请求方法，一般用于 GET。Post
- 3XX：重定向
  - 301：永久性重定向
  - 302：临时重定向
  - 304：协商缓存
- 4XX：客户端错误，请求包含语法错误或无法完成请求
- 5XX：服务器错误

### HTTP 协议版本对比

- 0.9->1.0->1.1->2
- 0.9
  - 只支持 GET 方法
- 1.0
  - 引入请求头、响应头
  - 引入缓存机制，通过状态码与`If-Modified-Since`、`Expires`等控制更新或使用本地缓存。
  - 增加 POST、HEAD
  - 满足传输多种类型文件的需求，引入了`Content-Type`头
  - 不足：长连接支持不足、缓存机制不完善等
- 1.1
  - 默认开启持久化连接（keep-alive），在一个`TCP`连接上可以传输多个`HTTP`请求和响应，减少了建立和关闭连接的消耗和延迟。
  - 新增了`24`个错误状态码。
  - 增加`Host`请求头，能够使不同域名配置在同一个`IP`地址的服务器上（虚拟主机）。
  - 改进缓存机制：使用`Cache-control`、`Etag`、`If-None-Match`等更多可供选择的缓存头来控制缓存策略。
  - 支持管线化技术：允许在第一个应答被完全发送之前就发送第二个请求，以改善 HTTP 队头阻塞问题，但响应的顺序还是会按照请求的顺序返回，**队头阻塞问题**依旧存在。
  - 不足：性能不足，高延迟、并发连接有限，队头阻塞问题、http 头部冗余、不支持服务器推送
- 2.0
  - 采用二进制格式传输，提高效率
  - 多路复用：多路 Stream 复用一条 TCP 连接，解决队头阻塞
  - 头部压缩（HPACK），对报文的头部进行压缩（哈夫曼编码），在客户端和服务端都维护着一份字典记录着头部对应的索引。
  - 支持服务端推送：服务端可以预测客户端需要的资源，并主动推送给客户端。
  - 不足：TCP 队头阻塞

### HTTPS

- http 协议是明文传输（未加密）的，存在安全风险，在传输层 TCP 协议和应用层 HTTP 协议之间加入 SSL/TLS 安全协议，即 HTTPS
- 在 TCP 三握后还需进行 SSL/TLS 握手

## TCP

- 面向连接的、可靠的、基于字节流的传输层通信协议

### 三次握手

- TCP 的连接建立通过**三次**握手来实现
- ![三次握手示意图](https://github.com/MogoMec/blog/blob/master/docs/docs/note/image-20210913162050408.png?raw=true)
  1. 客户端给服务器发送报文（SYN，seq=x），服务端明确自己能收到客户端报文
  2. 服务器给客户端发送报文（SYN，ACK，seq=y，ack=x+1），客户端明确自己能收到服务端报文，且对方能收到己方报文
  3. 客户端给服务端发送报文（ACK，ack=y+1）,服务端明确客户端能收到己方报文
- 为什么要三次握手：
  - 避免历史连接：为了防止已经失效的连接请求报文突然又传送到了服务器，从而产生错误。三次握手的情况下才有足够的上下文判断是否是历史连接。
  - 同步双方初始序列号和应答序列号

### 四次挥手

- TCP 断开连接需要**四次**挥手，TCP 是全双工的
- ![四次挥手示意图](https://github.com/MogoMec/blog/blob/master/docs/docs/note/image-20210913163427098.png?raw=true)

1. 客户端打算关闭连接，向服务端发送报文（FIN），之后进入 FIN_WAIT_1 状态
2. 服务端收到该报文后，发送应答报文（ACK），并告知应用层要释放 TCP 连接了，进入 CLOSE_WAIT 状态，该状态下，服务端若还有数据没有发送给客户端，可以继续发送
3. 服务端所有数据发送完毕后，也需要发送报文释放连接（FIN），随后进入 LAST_ACK 状态
4. 客户端收到报文后，发送应答报文（ACK），进入 TIME_WAIT 状态，持续 2MSL，这段时间内服务器没有重发请求，就进入 CLOSED 状态，服务器在收到应答报文后会立即进入 CLOSE 状态。如果没有**TIME-WAIT**状态，若报文因为网络问题没有送达，则服务端不会正常关闭。

- 为什么要四挥？

  二挥和三挥之间可能会有服务器剩余数据需要传输，所以不能合并。

### TCP 与 UDP

- TCP 和 UDP 都是传输层协议

- TCP：面向连接的（一对一的）、可靠的、基于字节流的。应用：FTP、HTTp

- UDP：无连接的，不保证可靠的，支持一对多、多对多的。应用：DNS、SNMP、HTTP3（为了解决 TCP 队头阻塞）
