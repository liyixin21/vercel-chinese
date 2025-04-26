# Vercel 汉化 (Vercel Chinese)

Vercel用户界面汉化脚本，支持自动将Vercel网站界面翻译为中文。

## 功能特性

- 实时翻译Vercel界面上的英文文本为中文
- 支持部署页面、仪表盘、设置、团队管理等所有主要界面
- 自动监听DOM变化，对动态加载的内容进行翻译
- 轻量级实现，不影响网站原有功能

## 安装方法

1. 首先需要安装用户脚本管理器扩展：
   - Chrome/Edge: 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
   - Firefox: 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
   - Safari: 安装 [Tampermonkey](https://www.tampermonkey.net/)

2. 点击下方链接安装脚本：
   - [安装 Vercel 汉化脚本](https://github.com/liyixin21/vercel-chinese/raw/main/vercel-chinese.js)

3. 脚本会自动在Vercel网站界面启用，刷新页面即可看到汉化效果

## 自定义设置

如果您想自定义或添加更多翻译词条，可以编辑脚本中的 `i18n` Map对象：

```javascript
const i18n = new Map([
    ['English Term', '中文翻译'],
    // 添加更多词条...
]);
```

## 已知问题

- 某些动态生成的内容可能不会被立即翻译，刷新页面即可解决
- 少量专业术语或特殊文本可能未被翻译，欢迎提交PR补充

## 贡献指南

欢迎通过以下方式参与改进这个项目：

1. 提交未翻译词条
2. 提出优化建议
3. 帮助改进翻译质量
4. 修复可能的Bug

## 许可证

[GPL-3.0](LICENSE)

## 致谢

- 感谢[GitHub中文化项目](https://github.com/maboloshi/github-chinese)提供的参考
- 感谢所有贡献者的支持

## 免责声明

本项目不隶属于Vercel，仅为方便中文用户使用而创建。