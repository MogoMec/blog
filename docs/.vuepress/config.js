module.exports = {
  base: "/website/",
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
    ["meta", { name: "author", content: "Mogo" }]
  ],
  // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    logo: "/logo.jpg",
    nav: [
      { text: "主页", link: "/" },
      { text: "博客", link: "/blog/" },
      { text: "笔记", link: "/note/" },
      {
        text: "GitHub",
        link: "https://github.com/MogoMec"
      }
    ],
    sidebar: {
      "/note/": [["", "vue"], "vue学习笔记"]
    }
  }
};
