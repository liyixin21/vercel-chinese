# Vercel 汉化

将 [Vercel](https://vercel.com) 网站界面翻译为简体中文的浏览器用户脚本。

## 安装

### 前置条件

需要先安装用户脚本管理器扩展：

- [Tampermonkey](https://www.tampermonkey.net/)（推荐，支持 Chrome、Edge、Firefox、Safari）
- [Violentmonkey](https://violentmonkey.github.io/)

### 一键安装

> 安装前请确保已安装上方的扩展。

| 版本 | 说明 | 安装链接 |
|------|------|----------|
| **引擎版**（推荐） | 引擎与词典分离，词典自动从 CDN 拉取最新版 | [点击安装](https://ghproxy.liyixin.vip/https://raw.githubusercontent.com/liyixin21/vercel-chinese/main/dist/main.user.js) |
| **合并版** | 词典内置，单文件，无需联网更新 | [点击安装](https://ghproxy.liyixin.vip/https://raw.githubusercontent.com/liyixin21/vercel-chinese/main/dist/vercel-chinese.user.js) |


点击链接后，Tampermonkey 会弹出安装确认页面，点击「安装」即可。

## 使用

安装后**无需任何配置**，访问 vercel.com 即自动生效，界面会自动翻译为简体中文。

支持的页面：

- 首页、登录、注册
- 仪表盘、项目列表
- 项目概览、部署记录、域名、日志、分析
- 项目设置
- 定价页、文档页、企业页

## 更新

**合并版**：在 Tampermonkey 管理面板中手动点击「检查更新」，或重新安装最新版。

**引擎版**：词典部分会在每次安装时从远程自动拉取最新版，引擎部分同合并版需手动更新。

## 卸载

在 Tampermonkey 管理面板中找到「Vercel 汉化」，点击删除即可。

## 常见问题

**Q：页面没有翻译？**

检查 Tampermonkey 是否已启用，脚本状态是否为「开启」。部分页面使用 SPA 路由，刷新页面后再试。

**Q：只有部分内容翻译了？**

词典会持续更新，未翻译的内容说明词条尚未收录。欢迎提 [Issue](https://github.com/liyixin21/vercel-chinese/issues) 反馈缺失词条。

**Q：翻译有误？**

请提 [Issue](https://github.com/liyixin21/vercel-chinese/issues) 并附上原文和建议译文。

## 贡献

### 添加/修正翻译

翻译词典位于 `locals.js`，按页面类型分组，结构如下：

```js
I18N["zh-CN"]["页面类型"] = {
    static: {
        "English text": "中文翻译",
    },
    regexp: [
        [/正则pattern/, "替换结果"],
    ],
};
```

修改后运行 `npm run build` 重新生成 `dist/` 下的发布文件，提交 PR 即可。

### 本地开发

```bash
# 克隆项目
git clone https://github.com/liyixin21/vercel-chinese.git
cd vercel-chinese

# 启动本地开发服务器（自动构建 + 启动 HTTP 服务）
npm run dev
```

服务启动后：

1. 浏览器打开 `http://localhost:3000`
2. 点击「安装本地测试版」
3. 访问 vercel.com 查看效果，修改 `locals.js` 后刷新页面即时生效（无需重启服务）

### 项目结构

```
vercel-chinese/
├── src/               # 翻译引擎模块
│   ├── engine.js      # 主入口
│   ├── translator.js  # 翻译逻辑与缓存
│   ├── page-detector.js  # 页面类型检测
│   ├── mutation-handler.js  # DOM 动态变化监听
│   └── ...
├── locals.js          # 简体中文词典（主要编辑此文件）
├── dist/              # 构建产物（勿手动修改）
└── scripts/           # 构建脚本
```

## License

[GPL-3.0](LICENSE)
