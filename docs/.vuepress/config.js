module.exports = {
  theme: "reco",
  base: "/blog/",
  title: "Mogo的小站",
  description: "Mogo的小站",
  logo: "/logo.jpg",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
    ["meta", { name: "keywords", content: "Mogo,前端,博客" }],
    ["meta", { name: "author", content: "Mogo" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    sidebar: {
      "/docs/note/": [
        "write_in_front",
        "css_note",
        "",
        "JavaScript_note",
        "computer_network",
        "browser",
        "FrontEnd_engineering"
      ],
      "/docs/algorithm/": ["", "jz04", "jz30", "jz31"]
    },
    subSidebar: "auto",
    type: "blog",
    mode: "light",
    author: "Mogo", //版权信息，与昵称为同一数据
    startYear: "2020", //开始年份
    logo: "/logo.jpg",
    nav: [
      { text: "主页", link: "/", icon: "reco-home" },
      { text: "笔记", link: "/docs/note/", icon: "reco-document" },
      { text: "算法", link: "/docs/algorithm/", icon: "reco-document" },
      {
        text: "GitHub",
        link: "https://github.com/MogoMec",
        icon: "reco-github"
      }
    ]
  }
};
