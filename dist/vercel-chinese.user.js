// ==UserScript==
// @name         Vercel 汉化
// @namespace    https://github.com/liyixin21/vercel-chinese
// @description  汉化 Vercel 网站界面，集成词典的单文件版本。
// @version      1.0.0
// @author       liyixin21
// @license      GPL-3.0
// @icon         https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png
// @match        *://vercel.com/*
// @match        *://*.vercel.com/*
// @match        *://*.vercel.app/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var I18N = {};
  
  // =========================================================
  // 配置与规则
  // =========================================================
  I18N.conf = {
      characterDataPage: ['login', 'signup', 'homepage', 'dashboard', 'pricing', 'docs', 'enterprise'],
      ignoreMutationSelectorPage: {
          '*': ['code', 'pre', 'svg', 'canvas', '[contenteditable="true"]', 'textarea', '.cm-scroller'],
      },
      ignoreSelectorPage: {
          '*': ['SCRIPT', 'STYLE', 'CODE', 'PRE', 'KBD', 'SVG', 'PATH', 'IMG', 'CANVAS', 'META', 'LINK', 'NOSCRIPT', '[aria-hidden="true"]'],
      },
  };
  
  // =========================================================
  // 简体中文词库
  // =========================================================
  I18N["zh-CN"] = {};
  
  // --- 页面标题翻译 ---
  I18N["zh-CN"]["title"] = {
      static: {
          "Login – Vercel": "登录 – Vercel",
          "Sign Up – Vercel": "注册 – Vercel",
          "Vercel Pricing: Hobby, Pro, and Enterprise plans": "Vercel 定价：Hobby、Pro 和企业版方案",
          "Vercel Documentation": "Vercel 文档",
          "Enterprise": "企业版",
          "Agentic Infrastructure - Vercel": "Agentic 基础设施 - Vercel",
      },
      regexp: [
          [/^(.+) – Vercel$/, "$1 – Vercel"],
          [/(.+) on Vercel$/, "Vercel 上的 $1"],
      ],
  };
  
  // --- 公共区域 ---
  I18N["zh-CN"]["public"] = {
      static: {
          "Skip to content": "跳转到内容",
          "Products": "产品",
          "Resources": "资源",
          "Enterprise": "企业版",
          "Pricing": "定价",
          "Get a Demo": "预约演示",
          "Log In": "登录",
          "Sign Up": "注册",
          "Sign up": "注册",
          "Dashboard": "仪表盘",
          "Docs": "文档",
          "Help": "帮助",
          "Support": "支持",
          "Feedback": "反馈",
          "Settings": "设置",
          "Account": "账户",
          "Profile": "个人资料",
          "Log Out": "退出登录",
          "Back": "返回",
          "Cancel": "取消",
          "Save": "保存",
          "Delete": "删除",
          "Edit": "编辑",
          "Copy": "复制",
          "Search": "搜索",
          "Find": "查找",
          "Filter": "筛选",
          "Sort": "排序",
          "Next": "下一步",
          "Continue": "继续",
          "Submit": "提交",
          "Close": "关闭",
          "Dismiss": "关闭",
          "Confirm": "确认",
          "Clear": "清除",
          "Select all": "全选",
          "Load More": "加载更多",
          "Learn more": "了解更多",
          "Read more": "阅读更多",
          "View all": "查看全部",
          "Show more": "显示更多",
          "Show less": "显示更少",
          "Try it": "试一试",
          "Try it out": "试一试",
          "Get started": "开始使用",
          "Get Started": "开始使用",
          "Quick Start": "快速开始",
          "Quick start": "快速开始",
          "Get started for free": "免费开始使用",
          "Deploy now": "立即部署",
          "Talk to sales": "联系销售",
          "Contact Sales": "联系销售",
          "Contact sales": "联系销售",
          "Contact our sales team": "联系我们的销售团队",
          "Contact Support": "联系支持",
          "Visit": "访问",
          "Explore": "探索",
          "Browse": "浏览",
          "Import": "导入",
          "Export": "导出",
          "Download": "下载",
          "Upload": "上传",
          "Upgrade": "升级",
          "Downgrade": "降级",
          "Install": "安装",
          "Uninstall": "卸载",
          "Configure": "配置",
          "Enable": "启用",
          "Disable": "禁用",
          "Clone": "克隆",
          "Deploy": "部署",
          "Redeploy": "重新部署",
          "Promote": "发布到生产环境",
          "Rollback": "回滚",
          "Instant Rollback": "即时回滚",
          "Ready": "就绪",
          "Building": "构建中",
          "Error": "错误",
          "Queued": "排队中",
          "Canceled": "已取消",
          "Initializing": "初始化中",
          "Analyzing": "分析中",
          "Uploading": "上传中",
          "Archived": "已归档",
          "Active": "活跃",
          "Inactive": "非活跃",
          "Disabled": "已禁用",
          "Enabled": "已启用",
          "Last used": "上次使用",
          "Last Used": "上次使用",
          "Loading": "加载中",
          "Loading status…": "加载状态…",
          "No data": "暂无数据",
          "No results": "暂无结果",
          "Not found": "未找到",
          "Current": "当前",
          "Expired": "已过期",
          "Expiring": "即将过期",
          "Open": "开启",
          "Closed": "已关闭",
          "New": "新",
          "Beta": "测试版",
          "AI Gateway": "AI 网关",
          "AI SDK": "AI SDK",
          "AI Apps": "AI 应用",
          "Agent Skills": "Agent 技能",
          "Agent Stack": "Agent 技术栈",
          "Agents": "智能体",
          "Chat SDK": "Chat SDK",
          "Flags SDK": "Flags SDK",
          "Flags Explorer": "Flags 浏览器",
          "Observability": "可观测性",
          "Fluid Compute": "流动计算",
          "Fluid compute": "流动计算",
          "Cron Jobs": "定时任务",
          "Edge Config": "Edge 配置",
          "Edge Requests": "Edge 请求",
          "Edge Functions": "Edge 函数",
          "Edge Middleware": "Edge 中间件",
          "Serverless Functions": "Serverless 函数",
          "Microfrontends": "微前端",
          "Feature Flags": "功能开关",
          "Integrations": "集成",
          "Marketplace": "市场",
          "Templates": "模板",
          "Sandboxes": "沙盒",
          "Storage": "存储",
          "Blob": "Blob",
          "Domains": "域名",
          "Logs": "日志",
          "Analytics": "分析",
          "Speed Insights": "速度洞察",
          "Web Analytics": "Web 分析",
          "Firewall": "防火墙",
          "Security": "安全",
          "Deployments": "部署记录",
          "Environment Variables": "环境变量",
          "Webhooks": "Webhooks",
          "CLI": "CLI",
          "API": "API",
          "SDKs": "SDKs",
  
          // 项目侧边栏导航（所有项目页面共用）
          "Overview": "概览",
          "Logs": "日志",
          "Analytics": "分析",
          "Speed Insights": "速度洞察",
          "Observability": "可观测性",
          "Firewall": "防火墙",
          "CDN": "CDN",
          "Connect": "连接",
          "Integrations": "集成",
          "Storage": "存储",
          "Flags": "功能开关",
          "Agent": "智能体",
          "Workflows": "工作流",
          "Images": "镜像",
          "Usage": "用量",
          "Support": "支持",
          "Settings": "设置",
          "Domains": "域名",
          "Hobby": "Hobby",
          "Find": "搜索",
          "All projects": "全部项目",
          "All teams": "全部团队",
          "Production": "生产环境",
          "Preview": "预览环境",
          "Development": "开发环境",
          "system": "跟随系统",
          "light": "浅色",
          "dark": "深色",
          "Appearance": "外观",
          "Log in to Vercel": "登录 Vercel",
          "Continue with": "使用以下方式登录",
          "Continue with Email": "使用邮箱登录",
          "Continue with Email →": "使用邮箱登录",
          "Continue with GitHub": "使用 GitHub 登录",
          "Continue with Google": "使用 Google 登录",
          "Continue with Apple": "使用 Apple 登录",
          "Continue with SAML SSO": "使用 SAML SSO 登录",
          "Continue with Passkey": "使用 Passkey 登录",
          "Show other options": "显示其他选项",
          "Don't have an account? Sign Up": "没有账户？注册",
          "Sign Up": "注册",
          "Forgot password?": "忘记密码？",
          "Remember me": "记住我",
          "Two-factor authentication": "双因素认证",
          "Email Address": "邮箱地址",
          "Hide other options": "隐藏其他选项",
          "Vercel Logo": "Vercel",
          "Account Settings": "账户设置",
          "Create Team": "创建团队",
          "Theme": "主题",
          "Upgrade to Pro": "升级到 Pro",
          "Log Out": "退出登录",
          "Check your email": "查看您的邮箱",
          "Use a Different Email": "使用其他邮箱",
          "We are unable to complete your login. Complete": "无法完成登录。请填写",
          "the account recovery form": "账户恢复表单",
          "for further assistance.": "以获取进一步帮助",
          "Please try again or try a different sign up method. If you continue to have issues, please complete": "请重试或尝试其他注册方式。如问题持续，请填写",
          "try a different sign up method": "尝试其他注册方式",
          "If you continue to have issues, please complete": "如问题持续，请填写",
          "Please try again or try": "请重试或尝试",
          "Login with Passkey took too long or was cancelled. Please try again.": "Passkey 登录超时或已取消，请重试",
          "Login with Passkey took too long or was cancelled": "Passkey 登录超时或已取消",
          "Please try again.": "请重试",
          "Code must be 6 digits.": "验证码必须为 6 位数字",
          "Code must be 6 digits": "验证码必须为 6 位数字",
          "Enter a recovery code to sign in.": "输入恢复码以登录",
          "Enter a recovery code to sign in": "输入恢复码以登录",
          "Use an authenticator app or passkey instead": "改用认证器应用或 Passkey",
          "Enter recovery code": "输入恢复码",
          "Home": "首页",
          "Academy": "学院",
          "Knowledge Base": "知识库",
          "Blog": "博客",
          "Changelog": "更新日志",
          "Community": "社区",
          "Careers": "招聘",
          "Legal": "法律",
          "Privacy Policy": "隐私政策",
          "Terms": "条款",
          "Cookie Policy": "Cookie 策略",
          "Cookie Preferences": "Cookie 偏好设置",
          "Acceptable Use Policy": "可接受使用政策",
          "DPA": "数据处理协议",
          "Brand Guidelines": "品牌指南",
          "Compliance": "合规",
          "Status": "状态",
          "Service Status": "服务状态",
          "Enterprise Performance": "企业版性能",
          "Enterprise Governance": "企业版治理",
          "Enterprise Support": "企业版支持",
          "Enterprise-grade compliance": "企业级合规",
          "Advanced Deployment Protection": "高级部署保护",
          "Audit Logs": "审计日志",
          "Directory Sync (SCIM)": "目录同步 (SCIM)",
          "Custom Security Questionnaire": "自定义安全问卷",
          "99.99% SLA": "99.99% SLA",
          "24/7/365 SLA response times": "全天候 SLA 响应时间",
          "99.99% uptime SLA": "99.99% 正常运行时间 SLA",
          "Bring Your Own Cloud (BYOC)": "自带云 (BYOC)",
          "CDN": "CDN",
          "Content Delivery": "内容分发",
          "Global Delivery": "全球分发",
          "DDoS Mitigation": "DDoS 防护",
          "Automated DDoS Mitigation": "自动 DDoS 防护",
          "Automatic Region Failover": "自动区域故障转移",
          "Configurable WAF": "可配置 WAF",
          "Web Application Firewall": "Web 应用防火墙",
          "Firewall Rules": "防火墙规则",
          "Custom Firewall Rules": "自定义防火墙规则",
          "Bot Management": "机器人管理",
          "Bot Protection": "机器人防护",
          "Attack Challenge Mode": "攻击挑战模式",
          "Draft Mode": "草稿模式",
          "Bulk Redirects": "批量重定向",
          "Redirects": "重定向",
          "Name": "名称",
          "Description": "描述",
          "Project Name": "项目名称",
          "Status": "状态",
          "Type": "类型",
          "Date": "日期",
          "Time": "时间",
          "Duration": "耗时",
          "Action": "操作",
          "Actions": "操作",
          "Source": "来源",
          "Branch": "分支",
          "Commit": "提交",
          "Author": "作者",
          "Collaborators": "协作者",
          "Members": "成员",
          "Teams": "团队",
          "Team": "团队",
          "Projects": "项目",
          "Repository": "仓库",
          "Git": "Git",
          "GitHub": "GitHub",
          "GitLab": "GitLab",
          "Bitbucket": "Bitbucket",
          "Framework": "框架",
          "Frameworks": "框架",
          "All frameworks": "所有框架",
          "Next.js": "Next.js",
          "Nuxt": "Nuxt",
          "FastAPI": "FastAPI",
          "Nitro": "Nitro",
          "Documentation": "文档",
          "Guides": "指南",
          "Tutorials": "教程",
          "Reference": "参考",
          "Examples": "示例",
          "FAQ": "常见问题",
          "Frequently asked questions": "常见问题",
          "Build": "构建",
          "Builds": "构建",
          "Build Logs": "构建日志",
          "Build & Deploy": "构建与部署",
          "CI/CD": "CI/CD",
          "Automatic CI/CD": "自动 CI/CD",
          "Deployment": "部署",
          "Deployment Settings": "部署设置",
          "Deployment Protection": "部署保护",
          "Runtime Settings": "运行时设置",
          "Networking": "网络",
          "mo.": "/月",
          "per month": "/月",
          "per minute": "/分钟",
          "per GB": "/GB",
          "included": "已包含",
          "Pro": "Pro",
          "Pro plan": "Pro 方案",
          "Contact us": "联系我们",
          "Can't decide?": "无法决定？",
          "Can I buy additional usage?": "可以购买额外用量吗？",
          "Do you offer custom invoicing?": "提供自定义发票吗？",
          "Do cached responses affect usage?": "缓存响应是否影响用量？",
      },
      regexp: [
          [/^Created\s+(.+)\s+ago$/, "创建于 $1 前"],
          [/^Updated\s+(.+)\s+ago$/, "更新于 $1 前"],
          [/^([\d.]+)\s*per month$/, "$1 / 月"],
          [/^([\d,]+)\s*(.+)\s*included$/, "包含 $1 $2"],
          [/\$\s*([\d.]+)\s*\/\s*month$/, "$$1 / 月"],
          [/\$\s*([\d.]+)\s*\/\s*(mo|month)$/, "$$1 / 月"],
          [/^on\s+(.+)$/, "在 $1 分支"],
          [/^Continue with (.+) →$/, "使用 $1 登录"],
          [/^If you have a Vercel account, we sent a code to (.+?)\.$/, "如果您有 Vercel 账户，我们已发送验证码至 $1"],
          [/^Your account email is (.+)$/, "您的账户邮箱是 $1"],
          [/^(.+)'s projects$/, "$1 的项目"],
          [/^(.+)'s teams$/, "$1 的团队"],
          [/^(全部|所有)\s*项目s?$/i, "$1项目"],
          [/^(全部|所有)\s*团队s?$/i, "$1团队"],
      ],
      selector: [],
  };
  
  // --- 首页 ---
  I18N["zh-CN"]["homepage"] = {
      static: {
          // 品牌与顶栏
          "Copy Logo as SVG": "复制 Logo 为 SVG",
          "Copy Wordmark as SVG": "复制文字标识为 SVG",
          "Brand Guidelines": "品牌指南",
          "Ask AI": "询问 AI",
          "Drop to deploy": "拖放以部署",
  
          // 产品菜单
          "Agent Stack": "Agent 技术栈",
          "Sandbox": "沙盒",
          "Workflows": "工作流",
          "Core Platform": "核心平台",
          "Content Delivery": "内容分发",
          "CI/CD": "CI/CD",
          "Tools": "工具",
          "Vercel Plugin": "Vercel 插件",
  
          // 资源菜单
          "Learn": "学习",
          "About": "关于",
          "Blog": "博客",
          "Changelog": "更新日志",
          "Knowledge Base": "知识库",
  
          // 构建场景
          "Build": "构建",
          "Web Apps": "Web 应用",
          "Marketing Sites": "营销网站",
          "Platforms": "平台",
          "Commerce": "电商",
  
          // 探索
          "Customers": "客户案例",
          "Partner Finder": "合作伙伴查找",
          "Community": "社区",
  
          // 主标题区
          "Agentic Infrastructure": "Agentic 基础设施",
          "Platform capabilities": "平台能力",
          "To ship apps and agents": "用于发布应用和智能体",
          "For coding agents": "面向编程智能体",
          "For coding agents to ship apps and agents automated by agents.": "让编程智能体发布由智能体自动化的应用和智能体",
          "to deploy in their native language, with Vercel's API, CLI, MCP, and Skills.": "通过 Vercel 的 API、CLI、MCP 和 Skills，以其原生语言进行部署",
          "in Sandboxed VMs, with durable backends, powered by hundreds of models.": "在沙盒虚拟机中运行，配备持久化后端，由数百种模型驱动",
          "Automated by agents": "由智能体自动化",
          "who autonomously investigate errors, plan fixes, and open PRs.": "它们自主排查错误、制定修复方案并提交 PR",
  
          // Notion / 特性区
          "Build agents on infrastructure that thinks like them": "在与智能体同频思考的基础设施上构建智能体",
          "Notion powers millions": "Notion 每天在 Vercel 上驱动数百万",
          "of agent conversations daily on Vercel.": "次智能体对话",
          "Features": "功能特性",
          "Durable Orchestration": "持久化编排",
          "Sandboxed Environments": "沙盒环境",
          "AI Model Gateway": "AI 模型网关",
  
          // Zapier / 扩展区
          "Ship apps that scale from zero to millions instantly": "发布从零到百万级别即时扩展的应用",
          "Zapier serves over 100 million": "Zapier 每月在 Vercel 上服务超过 1 亿",
          "monthly website visits on Vercel.": "次网站访问",
          "Global Delivery": "全球分发",
          "Deployment Environments": "部署环境",
          "Serverless Functions": "Serverless 函数",
          "Web Application Firewall": "Web 应用防火墙",
  
          // Mintlify / 托管区
          "Host platforms that serve every customer": "托管服务每一位客户的平台",
          "Mintlify powers documentation for over 20,000": "Mintlify 在 Vercel 上为超过 20,000 家",
          "companies on Vercel.": "公司提供文档服务",
          "Tenant Isolation": "租户隔离",
          "Domain Management": "域名管理",
          "Custom SSL Certificates": "自定义 SSL 证书",
          "Preview URLs": "预览 URL",
  
          // 最近发布区
          "Recently shipped": "最近发布",
          "A framework for building durable agents.": "用于构建持久化智能体的框架",
          "Secure every internal agent, app, and deployment with your identity provider.": "使用您的身份提供商保护每一个内部智能体、应用和部署",
          "Building image from Dockerfile.vercel": "正在从 Dockerfile.vercel 构建镜像",
          "Stored image in your project's registry": "镜像已存入您项目的镜像仓库",
          "Deployed to Fluid compute": "已部署至 Fluid 计算",
          "Production:": "生产环境：",
          "Containers": "容器",
          "Run production workloads in isolated containers on Vercel.": "在 Vercel 的隔离容器中运行生产工作负载",
          "Built by you, or your agents": "由您或您的智能体构建",
          "Plugin": "插件",
          "Connect": "连接",
          "Platform Security": "平台安全",
          "Bot Management": "机器人管理",
          "Agent Skills": "Agent 技能",
  
          // 框架区
          "Frameworks": "框架",
          "All frameworks": "所有框架",
  
          // SDK 区
  
          // 页脚
          "Platform Engineers": "平台工程师",
          "Design Engineers": "设计工程师",
          "Academy": "学院",
          "Articles": "文章",
          "Company": "公司",
          "Careers": "招聘",
          "Press": "媒体报道",
          "Events": "活动",
          "Startups": "初创企业",
          "Shipped on Vercel": "在 Vercel 上发布",
          "Open Source Program": "开源计划",
          "Legal & Trust": "法律与信任",
          "Privacy Policy": "隐私政策",
          "Terms of Service": "服务条款",
          "Cookie Policy": "Cookie 政策",
          "Acceptable Use Policy": "可接受使用政策",
          "Legal (all documents)": "法律文件（全部）",
          "Trust Center": "信任中心",
          "Status": "运行状态",
          "Cookie Preferences": "Cookie 偏好",
          "Social": "社交媒体",
          "Select a display theme:": "选择显示主题：",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 仪表盘 ---
  I18N["zh-CN"]["dashboard"] = {
      static: {
          "Overview": "概览",
          "Activity": "动态",
          "Recents": "最近访问",
          "Favorites": "收藏",
          "Alerts": "告警",
          "Notifications": "通知",
          "Account Settings": "账户设置",
          "My Notifications": "我的通知",
          "Quick Navigation": "快速导航",
          "New Project": "新建项目",
          "Add New": "新增",
          "Add New...": "新增...",
          "Import Project": "导入项目",
          "Create Database": "创建数据库",
          "Connect Project": "连接项目",
          "Get Started with Sandboxes": "开始使用沙盒",
          "Create feature flags and experiments": "创建功能开关和实验",
          "Search Projects...": "搜索项目...",
          "Filter by": "筛选条件",
          "Sort by": "排序方式",
          "All Time": "全部时间",
          "Last Day": "过去 1 天",
          "Last 3 Days": "过去 3 天",
          "Last 7 Days": "过去 7 天",
          "Last 14 Days": "过去 14 天",
          "Last 30 Days": "过去 30 天",
          "Last 3 Months": "过去 3 个月",
          "Last 12 Months": "过去 12 个月",
          "Last hour": "过去 1 小时",
          "Last 6 hours": "过去 6 小时",
          "Last 12 hours": "过去 12 小时",
          "Last 24 hours": "最近 24 小时",
          "Last 30 days": "最近 30 天",
          "Select Date Range": "选择日期范围",
          "No cases yet": "暂无工单",
          "Create a new case to get started": "创建新工单以开始",
          "View Build Logs": "查看构建日志",
          "Runtime Logs": "运行时日志",
          "View Logs": "查看日志",
          "Manage Domains": "管理域名",
          "Visit with Toolbar": "使用工具栏访问",
          "Add Favorite": "添加收藏",
          "Transfer Project": "转移项目",
  
          // Add New 下拉菜单
          "Domain": "域名",
          "Store": "数据库",
          "Integration": "集成",
          "Team Member": "团队成员",
  
          // 左侧导航
          "Deployments": "部署记录",
          "Logs": "日志",
          "Analytics": "分析",
          "Speed Insights": "速度洞察",
          "Observability": "可观测性",
          "Firewall": "防火墙",
          "CDN": "CDN",
          "Environment Variables": "环境变量",
          "Domains": "域名",
          "Integrations": "集成",
          "Storage": "存储",
          "Flags": "功能开关",
          "Agent": "智能体",
          "Workflows": "工作流",
          "Images": "镜像",
          "Usage": "用量",
          "Support": "支持",
          "Settings": "设置",
  
          // 顶部/用户菜单
          "Home Page": "主页",
          "Upgrade to Pro": "升级到 Pro",
          "Upgrade": "升级",
          "All systems normal.": "所有系统运行正常",
  
          // 概览标签
          "Overview": "概览",
          "grid": "网格视图",
          "list": "列表视图",
          "Recents": "最近访问",
  
          // 用量区块
          "Last 30 days": "最近 30 天",
          "Edge Requests": "Edge 请求",
          "Fluid Active CPU": "Fluid 活跃 CPU",
          "Function Duration": "函数执行时长",
          "Fast Origin Transfer": "快速源站传输",
          "Function Invocations": "函数调用次数",
          "Fast Data Transfer": "快速数据传输",
          "Fluid Provisioned Memory": "Fluid 已分配内存",
          "Edge Request CPU Duration": "Edge 请求 CPU 时长",
          "Private Data Transfer": "私有数据传输",
          "Microfrontends Routing": "微前端路由",
          "Get alerted for anomalies": "异常告警通知",
          "Automatically monitor your projects for anomalies and get notified.": "自动监控您的项目异常并发送通知",
  
          // 近期预览区块
          "Recent Previews": "近期预览",
          "Preview deployments that you have recently visited or created will appear here.": "您最近访问或创建的预览部署将显示在此",
  
          "Find": "搜索",
          "All": "全部",
          "project": "项目",
          "Hobby": "Hobby",
          "Connect": "连接",
          "Sandboxes": "沙盒",
          "AI Gateway": "AI 网关",
          "Feedback": "反馈",
          "Home Page": "主页",
          "All systems normal.": "所有系统运行正常",
          "Overview": "概览",
          "grid": "网格视图",
          "list": "列表视图",
          "Recents": "最近访问",
          "Alerts": "告警",
          "Initial commit": "初始提交",
      },
      regexp: [
          [/^(\d+)d ago$/, "$1 天前"],
          [/^(\d+)h ago$/, "$1 小时前"],
          [/^(\d+)m ago$/, "$1 分钟前"],
          [/^(\d+)s ago$/, "$1 秒前"],
          [/^(.+)'s projects$/, "$1 的项目"],
          [/^(.+)'s teams$/, "$1 的团队"],
      ],
      selector: [],
  };
  
  // --- 项目概览 ---
  I18N["zh-CN"]["project-overview"] = {
      static: {
          // 生产部署区块
          "Production Deployment": "生产部署",
          "Production Deployments": "生产部署",
          "Pre-Production Deployments": "预生产部署",
          "No Screenshot Available": "暂无截图",
          "Instant Rollback": "即时回滚",
          "Rollback": "回滚",
          "Visit": "访问",
          "Status": "状态",
          "Ready": "就绪",
          "Created": "创建时间",
          "Source": "来源",
          "Deployment Settings": "部署设置",
  
          // 推荐与操作
          "Recommendation": "推荐",
          "Recommendations": "推荐",
          "Learn More": "了解更多",
          "Production Checklist": "生产清单",
          "Connect Git Repository": "连接 Git 仓库",
          "Add Custom Domain": "添加自定义域名",
          "Preview Deployment": "预览部署",
          "Enable Web Analytics": "启用 Web 分析",
          "Enable Speed Insights": "启用速度洞察",
  
          // 分析区块
          "Error Rate": "错误率",
          "Track Visitors and Page Views": "追踪访客与页面浏览量",
          "See real-time traffic, top pages, and audience trends.": "查看实时流量、热门页面和受众趋势",
          "Enable Analytics": "启用分析",
          "Track visitors and page views": "追踪访客和页面浏览量",
          "Real-time insights into your traffic": "实时洞察您的流量",
          "Deeper insights with custom events": "通过自定义事件获得更深入的洞察",
          "Respects visitor privacy": "尊重访客隐私",
          "First-party, at the edge": "边缘第一方数据",
          "Easy integration": "轻松集成",
          "Your site stays fast": "您的网站保持快速",
  
          // 分支区块
          "Active Branches": "活跃分支",
          "No Active Branches": "无活跃分支",
          "Automatically created": "自动创建",
          "for pushes to": "用于推送到",
          "Commit using our Git connections.": "使用 Git 连接进行提交",
          "View Git Repository": "查看 Git 仓库",
  
          // 数据库/AI
          "Connect to a Database": "连接到数据库",
          "Start using AI Gateway": "开始使用 AI 网关",
  
          // 其他推荐卡片
          "Faster functions at a lower cost": "以更低成本获得更快的函数性能",
          "Switch to a bigger build machine.": "切换到更强大的构建机器",
          "Never wait for a queued build.": "无需等待排队构建",
          "Prioritize Production Builds": "优先处理生产构建",
          "Build Machine": "构建机器",
          "performance": "性能",
          "Function CPU": "函数 CPU",
          "Cold Start Prevention": "冷启动预防",
          "Skew Protection": "偏差保护",
          "Active · All systems normal": "运行中 · 所有系统正常",
  
          // 部署人
          "Initial commit": "初始提交",
          "Instant": "即时",
      },
      regexp: [
          [/^To update your Production Deployment, push to the\s+(.+)\s+branch\.$/, "要更新生产环境部署，请推送到 $1 分支"],
          [/^by (.+)$/, "由 $1 提交"],
          [/^(\d+)d ago$/, "$1 天前"],
          [/^(\d+)h ago$/, "$1 小时前"],
          [/^(\d+)m ago$/, "$1 分钟前"],
          [/^(\d+)s ago$/, "$1 秒前"],
      ],
      selector: [],
  };
  
  // --- 项目部署记录 ---
  I18N["zh-CN"]["project-deployments"] = {
      static: {
          "No deployments": "暂无部署记录",
          "All Environments": "所有环境",
          "All Deployments": "所有部署",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 项目域名 ---
  I18N["zh-CN"]["project-domains"] = {
      static: {
          "Add Domain": "添加域名",
          "Domain": "域名",
          "No domains": "无域名",
          "Move Domains": "移动域名",
          "Delete Domains": "删除域名",
          "Move Domain": "移动域名",
          "custom aliases": "自定义别名",
          "Manage Domains": "管理域名",
          "Want to purchase a domain instead?": "想要购买一个域名吗？",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 项目设置 ---
  I18N["zh-CN"]["project-settings"] = {
      static: {
          // 通用
          "Project Settings": "项目设置",
          "General": "常规",
          "Build and Deployment": "构建与部署",
          "Environments": "环境",
          "Git": "Git",
          "Deployment Protection": "部署保护",
          "Functions": "函数",
          "Cron Jobs": "定时任务",
          "Microfrontends": "微前端",
          "Project Members": "项目成员",
          "Drains": "数据导出",
          "Security": "安全",
          "Networking": "网络",
          "Activity": "操作日志",
          "Advanced": "高级",
          "Billing": "计费",
          "Access Groups": "访问组",
  
          // General 子页
          "Project Name": "项目名称",
          "Project ID": "项目 ID",
          "Used to identify your Project on the Dashboard, Vercel CLI, and in the URL of your Deployments.": "用于在仪表盘、Vercel CLI 和部署 URL 中标识您的项目",
          "Used when interacting with the Vercel API.": "在与 Vercel API 交互时使用",
          "Vercel Toolbar": "Vercel 工具栏",
          "Enable the Vercel Toolbar on your Deployments.": "在您的部署上启用 Vercel 工具栏",
          "Pre-Production Deployments": "预生产部署",
          "Default (controlled at the": "默认（由",
          "team": "团队",
          "level)": "级别控制）",
          "On": "开启",
          "Off": "关闭",
          "Production Deployments": "生产部署",
          "To use the toolbar in production your team members need the": "在生产环境中使用工具栏，团队成员需要安装",
          "Chrome extension": "Chrome 扩展",
          "or to enable the toolbar for that domain in the toolbar menu. Learn more about using the": "或在工具栏菜单中为该域名启用工具栏。了解更多关于在",
          "toolbar in production": "生产环境中的工具栏",
          "Preview Deployment Suffix": "预览部署后缀",
          "By default, the URL of every new Preview Deployment ends with": "默认情况下，每次新预览部署的 URL 以",
          "team-level preview deployment suffix": "团队级预览部署后缀",
          "Data Preferences": "数据偏好",
          "Vercel may train on and share code and chat data with AI model providers for training purposes only. If you turn this off, we will not share data going forward for this project.": "Vercel 可能会将代码和聊天数据用于 AI 模型训练。关闭后，我们将不再为此项目共享数据。",
          "Improve models with this project's data": "使用此项目数据改进模型",
          "To change globally, open": "如需全局更改，请打开",
          "Team settings": "团队设置",
          "Transfer": "转移",
          "Transfer your project to another team without downtime or workflow interruptions.": "将项目转移到其他团队，无需停机或中断工作流",
          "Transferring Projects": "转移项目",
          "Delete Project": "删除项目",
          "Permanently delete this project and all deployments, domains, environment variables, serverless functions, and settings.": "永久删除此项目及其所有部署、域名、环境变量、Serverless 函数和设置",
          "Last updated": "最后更新",
  
          // Build and Deployment 子页
          "Root Directory": "根目录",
          "The directory within your project, where your code is located. Leave this field empty if your code is not located in a subdirectory.": "项目中代码所在的目录。如果代码不在子目录中，请留空",
          "On-Demand Concurrent Builds": "按需并发构建",
          "Skip the build queue and build deployments immediately. Usage costs apply per build minute.": "跳过构建队列，立即构建部署。按构建分钟计费",
          "Rolling Releases": "滚动发布",
          "Roll out changes gradually by defining a traffic percentage for each stage.": "通过为每个阶段定义流量百分比来逐步发布变更",
          "Disabled": "已禁用",
          "Enabled": "已启用",
          "You need additional permissions to manage rolling releases.": "您需要额外权限来管理滚动发布",
          "Prioritize Production Builds": "优先处理生产构建",
          "Run Production builds before Pre-Production builds.": "在预生产构建之前运行生产构建",
          "Build Machine": "构建机器",
          "The next deployment of this project will fallback to": "此项目的下一次部署将回退到",
          "Standard": "标准",
          "build machines, because your team has not selected a default build machine.": "构建机器，因为您的团队尚未选择默认构建机器",
          "Framework Settings": "框架设置",
          "When using a framework for a new project, it will be automatically detected. As a result, several project settings are automatically configured to achieve the best result. You can override them below.": "新项目使用框架时会被自动检测，相关设置会自动配置以获得最佳效果。您可以在下方覆盖这些设置",
          "Framework Preset": "框架预设",
          "Build Command": "构建命令",
          "Override": "覆盖",
          "Output Directory": "输出目录",
          "Install Command": "安装命令",
          "Development Command": "开发命令",
          "Ignored Build Step": "忽略构建步骤",
          "Vercel skips builds for commits with a previously deployed SHA. Override with a shell command that exits 1 (build) or 0 (skip).": "Vercel 会跳过已部署 SHA 的提交构建。可用退出码 1（构建）或 0（跳过）的 shell 命令覆盖",
          "Node.js Version": "Node.js 版本",
          "The Node.js version used during builds and for Serverless Functions. Redeploy to apply changes.": "构建和 Serverless 函数使用的 Node.js 版本。重新部署以应用更改",
          "Deployment Checks": "部署检查",
          "Define checks needed to promote a deployment to production.": "定义将部署提升到生产环境所需的检查",
          "A new Deployment is required for your changes to take effect.": "您的更改需要新的部署才能生效",
          "Agent may make mistakes. Verify all outputs.": "AI 助手可能会出错，请验证所有输出",
          "Configuration Settings in the current Production deployment differ from your current Project Settings.": "当前生产部署的配置设置与项目设置不同",
          "Production Overrides": "生产环境覆盖",
          "Build and Development Settings": "构建与开发设置",
          "Include files outside the root directory in the": "在构建步骤中包含根目录以外的文件",
          "Build Step": "构建步骤",
          "Skip deployments": "跳过部署",
          "when there are no changes to the root directory or its dependencies.": "当根目录或其依赖项没有变更时",
          "Behavior": "行为",
          "Automatic": "自动",
          "Only build production": "仅构建生产环境",
          "Only build pre-production": "仅构建预生产环境",
          "Only build if there are changes": "仅在有变更时构建",
          "Only build if there are changes in a folder": "仅在特定目录有变更时构建",
          "Don't build anything": "不构建任何内容",
          "Run my Bash script": "运行 Bash 脚本",
          "Run my Node script": "运行 Node 脚本",
          "Custom": "自定义",
          "Command": "命令",
          "Run all builds immediately": "立即运行所有构建",
          "Skip the queue for all builds": "跳过所有构建队列",
          "Run up to one build per branch": "每个分支最多运行一个构建",
          "New deployments within a branch are queued": "分支内的新部署将排队",
          "Disable on-demand concurrent builds": "禁用按需并发构建",
          "Builds are queued, maximum of one at a time": "构建排队，每次最多一个",
          "Set Team Default": "设置团队默认",
          "Your next deployment will build with a": "您的下一次部署将使用",
          "machine": "机器",
          "build machine types": "构建机器类型",
          "and": "和",
          "pricing": "定价",
          "No checks configured": "未配置检查",
          "Use events or statuses from your checks provider to determine when a deployment is promoted to Production.": "使用检查提供商的事件或状态来决定何时将部署提升到生产环境",
          "Add Checks": "添加检查",
  
          // Environments 子页
          "Environments help manage the deployment lifecycle on the Vercel platform.": "环境有助于管理 Vercel 平台上的部署生命周期",
          "Create Environment": "创建环境",
          "Branch Tracking": "分支跟踪",
  
          // Git 子页
          "Git Large File Storage (LFS)": "Git 大文件存储 (LFS)",
          "Git LFS replaces large files such as audio samples, videos, datasets, and graphics with text pointers inside Git, while storing the file contents on a remote server like GitHub.com or GitHub Enterprise.": "Git LFS 将大文件（音频、视频、数据集、图形等）替换为 Git 中的文本指针，同时将文件内容存储在远程服务器上",
          "Deploy Hooks": "部署钩子",
          "Deploy hooks are unique URLs that allow you to trigger a deployment of a given branch.": "部署钩子是唯一 URL，可触发指定分支的部署",
          "This project does not have any deploy hooks.": "此项目暂无部署钩子",
          "Create Hook": "创建钩子",
          "Connected Git Repository": "已连接的 Git 仓库",
          "Seamlessly create Deployments for any commits pushed to your Git repository.": "为推送到 Git 仓库的任何提交无缝创建部署",
          "Disconnect": "断开连接",
          "Toggle": "切换",
          "Pull Request Comments": "PR 评论",
          "Commit Comments": "提交评论",
  
          // Deployment Protection 子页
          "Trusted Sources": "受信来源",
          "Let trusted projects and services access this project's protected deployments using short-lived": "允许受信任的项目和服务使用短期",
          "OIDC tokens": "OIDC 令牌",
          "Protected Sourcemaps": "受保护的源映射",
          "Ensures sourcemaps are only accessible to authenticated team members.": "确保 Source Map 仅对已认证的团队成员可访问",
          "Protection Bypass for Automation": "自动化保护绕过",
          "Let automation services access this project's protected deployments. To bypass Deployment Protection, send the": "允许自动化服务访问受保护的部署。发送",
          "header or query parameter with any value below.": "请求头或查询参数（任意值）",
          "Shareable Links": "可共享链接",
          "Give collaborators outside your Vercel team access to protected deployments.": "让 Vercel 团队外的协作者访问受保护的部署",
          "Add trusted source": "添加受信来源",
          "Access": "访问",
          "(This project)": "（此项目）",
  
          // Functions 子页
          "Fluid Compute": "Fluid 计算",
          "Enable fluid compute for your Vercel Functions to automatically manage concurrency and optimize performance.": "为 Vercel 函数启用 Fluid 计算，自动管理并发并优化性能",
          "Enable fluid compute for your Vercel Functions to automatically manage concurrency and optimize performance. Vercel will handle the defaults to ensure the best experience for your workload.": "为 Vercel 函数启用 Fluid 计算，自动管理并发并优化性能。Vercel 将处理默认设置以确保工作负载的最佳体验",
          "View Fluid compute metrics": "查看 Fluid 计算指标",
          "Function Region": "函数区域",
          "Function Regions": "函数区域",
          "These are the regions on Vercel's network that your Vercel Functions will execute in.": "这些是您的 Vercel 函数将在 Vercel 网络上执行的区域",
          "You are limited to 1 region on your current Hobby plan.": "您当前的 Hobby 方案仅限 1 个区域",
          "Advanced Settings": "高级设置",
          "Configure detailed function settings manually.": "手动配置详细的函数设置",
          "Function CPU": "函数 CPU",
          "This controls the maximum amount of CPU utilization your Vercel Functions can use while executing.": "控制 Vercel 函数执行时可使用的最大 CPU 利用率",
          "This controls the maximum amount of CPU utilization your Vercel Functions can use while executing. Standard is optimal for most frontend workloads.": "控制 Vercel 函数执行时可使用的最大 CPU 利用率。标准模式对大多数前端工作负载最佳",
          "Performance": "性能",
          "Predictable performance for production workloads": "为生产工作负载提供稳定性能",
          "Increased performance for latency-sensitive applications and SSR workloads": "为延迟敏感型应用和 SSR 工作负载提供更高性能",
          
          // 地区名称
          "Europe": "欧洲",
          "North America": "北美",
          "South America": "南美",
          "Asia Pacific": "亚太地区",
          "Africa": "非洲",
          "Middle East": "中东",
          "Paris, France": "法国巴黎",
          "Stockholm, Sweden": "瑞典斯德哥尔摩",
          "Dublin, Ireland": "爱尔兰都柏林",
          "London, United Kingdom": "英国伦敦",
          "Frankfurt, Germany": "德国法兰克福",
          "Washington, D.C., USA": "美国华盛顿特区",
          "San Francisco, USA": "美国旧金山",
          "Portland, USA": "美国波特兰",
          "Cleveland, USA": "美国克利夫兰",
          "Montréal, Canada": "加拿大蒙特利尔",
          "São Paulo, Brazil": "巴西圣保罗",
          "Hong Kong": "中国香港",
          "Tokyo, Japan": "日本东京",
          "Seoul, South Korea": "韩国首尔",
          "Singapore": "新加坡",
          "Mumbai, India": "印度孟买",
          "Sydney, Australia": "澳大利亚悉尼",
          "Osaka, Japan": "日本大阪",
          "Cape Town, South Africa": "南非开普敦",
          "Dubai, United Arab Emirates": "阿联酋迪拜",
          "West": "西部",
          "East": "东部",
          "North": "北部",
          "South": "南部",
          "Northeast": "东北",
          "Southeast": "东南",
          "vCPU": "虚拟 CPU",
          "GB Memory": "GB 内存",
  
          // Cron Jobs 子页
          "Easily monitor and manage your cron jobs.": "轻松监控和管理定时任务",
          "Disabling this feature will prevent all cron jobs from being executed.": "禁用此功能将阻止所有定时任务执行",
          "Run": "运行",
  
          // Project Members 子页
          "Manage and assign roles on this project. Team members can be managed from": "在此项目上管理和分配角色。团队成员可在",
          "Team Settings": "团队设置",
          "Assign project role": "分配项目角色",
          "Team members with the": "具有",
          "Developer": "开发者",
          "Contributor": "贡献者",
          "role can have Project Roles assigned.": "角色的团队成员可被分配项目角色",
          "Team Member, Access Group or Email": "团队成员、访问组或邮箱",
          "Project Role": "项目角色",
          "Project Viewer": "项目查看者",
          "Add another": "继续添加",
          "Project Roles": "项目角色",
          "Name (A-Z)": "名称 (A-Z)",
          "Name (Z-A)": "名称 (Z-A)",
  
          // Drains 子页
          "Forward Vercel data to third-party providers or your own custom endpoints.": "将 Vercel 数据转发到第三方服务或自定义端点",
          "Add Drain": "添加导出",
          "No drains are associated with this project": "此项目暂无数据导出",
          "Click Add Drain to get started": "点击「添加导出」开始配置",
          "Scope": "范围",
  
          // Security 子页
          "Build Logs and Source Protection": "构建日志与源码保护",
          "Git Fork Protection": "Git Fork 保护",
          "Ensures that pull requests targeting your Git repository are authorized by a member of your team before deploying your project.": "确保在部署前，针对 Git 仓库的 PR 需经团队成员授权",
          "Secure Backend Access with OIDC Federation": "通过 OIDC 联合保护后端访问",
          "Authenticate with your cloud providers using OpenID Connect JSON Web Tokens.": "使用 OpenID Connect JWT 向云提供商进行身份验证",
          "Issuer Mode": "颁发者模式",
          "Recommended": "推荐",
          "Claim": "声明",
          "Kind": "类型",
          "Value": "值",
          "Issuer": "颁发者",
          "Audience": "受众",
          "Subject": "主题",
          "Issued At": "颁发时间",
          "Not Before": "生效时间",
          "Expiration": "过期时间",
          "Deployment Retention Policy": "部署保留策略",
          "Define a retention period for all Deployments for this Project.": "定义此项目所有部署的保留期",
          "Canceled Deployments": "已取消的部署",
          "Errored Deployments": "失败的部署",
          "Recently Deleted Deployments": "最近删除的部署",
          "Most deployments can be restored within 30 days of their initial deletion.": "大多数部署可在初次删除后 30 天内恢复",
  
          // Networking 子页
          "Connect your Vercel projects to backend services securely.": "安全地将 Vercel 项目连接到后端服务",
          "Static IPs": "静态 IP",
          "Static IP addresses for your deployments. Each region provides 2 shared IPs.": "部署的静态 IP 地址，每个区域提供 2 个共享 IP",
          "Manage regions": "管理区域",
          "Manage Active Regions": "管理活跃区域",
          "Secure Compute": "安全计算",
          "Enable Secure Compute with VPC Peering, VPN, and full network isolation.": "通过 VPC 对等、VPN 和完全网络隔离启用安全计算",
          "Active network": "活跃网络",
          "Passive network": "被动网络",
          "Builds": "构建",
          "Active network:": "活跃网络：",
          "Passive Network:": "被动网络：",
          "Edit Selected": "编辑所选",
          "Reset": "重置",
  
          // Activity 子页
          "A log of events and changes for this project.": "此项目的事件和变更日志",
  
          // Advanced 子页
          "Directory Listing": "目录列表",
          "If no index file is present within a directory, the directory contents will be displayed.": "如果目录中没有索引文件，将显示目录内容",
          "Skew Protection": "偏差保护",
          "Prevent application errors like asset 404s and other unexpected behavior when different versions of your application run on client and server.": "防止客户端和服务端运行不同版本时出现资源 404 等错误",
          "Bulk Redirects": "批量重定向",
          "Set the amount of redirects that can be added to your project.": "设置可添加到项目的重定向数量",
          "Included Redirects": "已包含重定向",
          "Additional Redirects": "额外重定向",
          "You must upgrade to a Pro plan to manage Bulk Redirects.": "您必须升级到 Pro 方案才能管理批量重定向",
  
          // 通用
          "Learn more about": "了解更多关于",
          "Save": "保存",
          "Loading...": "加载中...",
          "Default": "默认",
          "Name": "名称",
          "Type": "类型",
      },
      regexp: [
          [/^To confirm, type "(.+)"$/, "确认删除，请输入 \"$1\""],
          [/^(\d+)d ago$/, "$1 天前"],
          [/^(\d+)h ago$/, "$1 小时前"],
          [/^(\d+)m ago$/, "$1 分钟前"],
      ],
      selector: [],
  };
  
  // --- 项目分析 ---
  I18N["zh-CN"]["project-analytics"] = {
      static: {
          "Web Analytics": "Web 分析",
          "Speed Insights": "速度洞察",
          "Audience": "受众",
          "Acquisition": "获取",
          "Page Views": "页面浏览量",
          "Unique Visitors": "独立访客",
          "Visitors": "访客",
          "Sessions": "会话",
          "Bounce Rate": "跳出率",
          "Average Time": "平均时间",
          "Countries": "国家",
          "Cities": "城市",
          "Devices": "设备",
          "OS": "操作系统",
          "Browsers": "浏览器",
          "Pages": "页面",
          "Referrers": "引荐来源",
          "Top Pages": "热门页面",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 项目日志 ---
  I18N["zh-CN"]["project-logs"] = {
      static: {
          "Runtime Logs": "运行时日志",
          "Build Logs": "构建日志",
          "Live": "实时",
          "Filter by Event": "按事件筛选",
          "Filter by event": "按事件筛选",
          "Filter by...": "筛选...",
          "Search...": "搜索...",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 登录页 ---
  I18N["zh-CN"]["login"] = {
      static: {
          "Log in to Vercel": "登录 Vercel",
          "Continue with": "使用以下方式登录",
          "Continue with Email": "使用邮箱登录",
          "Continue with Email →": "使用邮箱登录 →",
          "Continue with GitHub": "使用 GitHub 登录",
          "Continue with Google": "使用 Google 登录",
          "Continue with Apple": "使用 Apple 登录",
          "Continue with SAML SSO": "使用 SAML SSO 登录",
          "Continue with Passkey": "使用 Passkey 继续",
          "Continue with GitLab": "使用 GitLab 登录",
          "Continue with Bitbucket": "使用 Bitbucket 登录",
          "Show other options": "显示其他选项",
          "Hide other options": "隐藏其他选项",
          "Don't have an account?": "还没有账户？",
          "Don't have an account? Sign Up": "没有账户？注册",
          "Email Address": "邮箱地址",
          "Forgot password?": "忘记密码？",
          "Remember me": "记住我",
          "Two-factor authentication": "双因素认证",
          "Two-Factor Authentication": "双因素认证",
          "Two-Factor": "双因素",
          "Authentication": "认证",
          "Enter the code from your authenticator app or continue with passkey.": "输入认证器应用中的验证码或使用 Passkey 继续",
          "Enter the code from your authenticator app or continue with passkey": "输入认证器应用中的验证码或使用 Passkey 继续",
          "Verify": "验证",
          "Use a Recovery Code Instead": "改为使用恢复码",
          "Lost access to your 2FA method? Start 2FA recovery": "无法访问 2FA 方式？开始 2FA 恢复",
          "Lost access to your 2FA method?": "无法访问 2FA 方式？",
          "Start 2FA recovery": "开始 2FA 恢复",
          "Couldn\u2019t verify your passkey. Try again.": "无法验证您的 Passkey，请重试",
          "Couldn't verify your passkey. Try again.": "无法验证您的 Passkey，请重试",
          "Couldn\u2019t verify your passkey": "无法验证您的 Passkey",
          "Try again.": "请重试",
          "Login with Passkey took too long or was cancelled. Please try again.": "Passkey 登录超时或已取消，请重试",
          "Login with Passkey took too long or was cancelled": "Passkey 登录超时或已取消",
          "Please try again.": "请重试",
          "Code must be 6 digits.": "验证码必须为 6 位数字",
          "Code must be 6 digits": "验证码必须为 6 位数字",
          "Enter a recovery code to sign in.": "输入恢复码以登录",
          "Enter a recovery code to sign in": "输入恢复码以登录",
          "Use an authenticator app or passkey instead": "改用认证器应用或 Passkey",
          "Enter recovery code": "输入恢复码",
          "Check your email": "查看您的邮箱",
          "Use a Different Email": "使用其他邮箱",
          "Vercel Logo": "Vercel",
          "Vercel logo": "Vercel",
          "Last Used": "上次使用",
          "Last used": "上次使用",
      },
      regexp: [
          [/^Continue with (.+) →$/, "使用 $1 登录"],
          [/^If you have a Vercel account, we sent a code to (.+?)\.$/, "如果您有 Vercel 账户，我们已发送验证码至 $1"],
      ],
      selector: [],
  };
  
  // --- 注册页 ---
  I18N["zh-CN"]["signup"] = {
      static: {
          "Create your account": "创建您的账户",
          "Already have an account? Log In": "已有账户？登录",
          "Sign up for free": "免费注册",
          "Start deploying": "开始部署",
          "Your first deploy is just a sign-up away.": "只需注册即可开始首次部署",
          "Continue with": "使用以下方式登录",
          "Continue with Email": "使用邮箱登录",
          "Continue with Email →": "使用邮箱登录 →",
          "Continue with GitHub": "使用 GitHub 登录",
          "Continue with Google": "使用 Google 登录",
          "Continue with Apple": "使用 Apple 登录",
          "Continue with GitLab": "使用 GitLab 登录",
          "Continue with Bitbucket": "使用 Bitbucket 登录",
          "Show other options": "显示其他选项",
          "Hide other options": "隐藏其他选项",
          "By joining, you agree to our": "注册即表示您同意我们的",
          "Terms of Service": "服务条款",
          "and": "和",
          "Work Email": "工作邮箱",
          "\u2190 Other Sign Up options": "\u2190 其他注册选项",
          "Log In": "登录",
          "Sign Up": "注册",
      },
      regexp: [
          [/^Continue with (.+) →$/, "使用 $1 登录"],
          [/^Continue with Email →.*$/, "使用邮箱登录"],
      ],
      selector: [],
  };
  
  // --- 定价页 ---
  I18N["zh-CN"]["pricing"] = {
      static: {
          "Vercel Pricing": "Vercel 定价",
          "Hobby": "Hobby",
          "Most popular": "最受欢迎",
          "Custom": "定制",
          "Select a plan": "选择方案",
          "All Hobby features, plus:": "所有 Hobby 功能，外加：",
          "All Pro features, plus:": "所有 Pro 功能，外加：",
          "Everything you need to build and scale your app.": "构建和扩展应用所需的全部功能",
          "Advanced metrics": "高级指标",
          "Advanced spend management": "高级支出管理",
          "Control your spending": "控制您的支出",
          "Extended retention": "延长数据保留",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 文档页 ---
  I18N["zh-CN"]["docs"] = {
      static: {
          "Vercel Documentation": "Vercel 文档",
          "Getting Started": "入门指南",
          "Getting started": "入门指南",
          "Fundamentals": "基础知识",
          "Glossary": "术语表",
          "Deploy & scale": "部署与扩展",
          "Deploy and scale": "部署与扩展",
          "Backend": "后端",
          "AI": "AI",
          "Delivery Network": "分发网络",
          "APIs & SDKs": "API 与 SDK",
          "Identity & Access": "身份与访问",
          "Learn": "学习",
          "Guides and tutorials": "指南与教程",
          "Agent Resources": "智能体资源",
          "Agent Stack": "智能体技术栈",
          "AI Integrations": "AI 集成",
          "Build with AI": "AI 构建",
          "Build your applications": "构建您的应用",
          "Container Registry": "容器注册表",
          "Collaborate with your team": "与您的团队协作",
          "Comments": "评论",
          "Connect third-party tools, CMSs, and services to your Vercel project.": "将第三方工具、CMS 和服务连接到您的 Vercel 项目",
          "Configuration": "配置",
          "Errors": "错误",
          "Events": "事件",
          "Checks": "检查",
          "Incremental Static Regeneration": "增量静态再生",
          "Image Optimization": "图像优化",
          "Claim Deployments": "声明部署",
          "Core Platform": "核心平台",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 企业版页面 ---
  I18N["zh-CN"]["enterprise"] = {
      static: {
          "Enterprise Performance": "企业版性能",
          "Enterprise Governance": "企业版治理",
          "Enterprise Support": "企业版支持",
          "Enterprise-grade compliance": "企业级合规",
          "Centralized spend, access controls": "集中化支出，访问控制",
          "Get a Demo": "预约演示",
          "Contact Sales": "联系销售",
          "Contact our sales team": "联系我们的销售团队",
          "Full Name": "姓名",
          "Company": "公司",
          "Company Size": "公司规模",
          "Company Website": "公司网站",
          "Country": "国家",
          "How can we help?": "我们能提供什么帮助？",
          "Explore the product": "探索产品",
          "99.99% uptime SLA": "99.99% 正常运行时间 SLA",
          "24/7/365 SLA response times": "全天候 SLA 响应时间",
          "Audit trails": "审计追踪",
          "Bring Your Own Cloud (BYOC)": "自带云 (BYOC)",
          "Every data and connection secured by default": "所有数据和连接默认安全",
          "Higher traffic and conversion rates.": "更高的流量和转化率",
          "Admin": "管理员",
          "Developer": "开发者",
          "Builders": "构建者",
      },
      regexp: [],
      selector: [],
  };
  
  // --- 通用页面 ---
  I18N["zh-CN"]["general"] = {
      static: {},
      regexp: [],
      selector: [],
  };

  // =========================================================
  // 翻译引擎
  // =========================================================
// --- config.js ---
  // =========================================================
  // config.js — 全局配置常量
  // =========================================================
  const CONFIG = {
      LANG: 'zh-CN',
      DEV: false,
  
      // 站点域名 -> 类型映射
      PAGE_MAP: {
          'vercel.com': 'vercel',
          'vercel.app': 'vercel',
      },
  
      // 描述元素选择器（用于远程翻译功能）
      DESC_SELECTORS: {},
  
      // MutationObserver 配置
      OBSERVER_CONFIG: {
          childList: true,
          subtree: true,
          characterData: true,
          attributeFilter: ['value', 'placeholder', 'aria-label', 'title', 'alt'],
      },
  
      // 需要翻译的属性名
      TRANSLATABLE_ATTRS: ['placeholder', 'title', 'aria-label', 'alt', 'value'],
  
      // 文本节点跳过规则（纯数字、纯空白等不翻译）
      SKIP_TEXT_REGEX: /^[\s\d.,:;!?()\[\]{}<>#$%^&*+=|\\~`@_-]*$/,
  };
  
  CONFIG;

  // --- state.js ---
  // =========================================================
  // state.js — 运行时状态管理器
  // =========================================================
  const State = {
      // 功能开关
      featureSet: {
          enable_RegExp: true,
          enable_transDesc: true,
          enable_missedTerms: false,
      },
  
      // 运行时状态
      pageConfig: null,
      currentURL: window.location.href,
      mutationObserver: null,
      initDone: false,
  };
  
  State;

  // --- utils.js ---
  // =========================================================
  // utils.js — 工具函数
  // =========================================================
  
  /**
   * 错误边界包装器 — 捕获异常避免阻断页面正常使用
   * @param {Function} fn - 要执行的函数
   * @param {string} label - 错误标签
   * @returns {Function} 包装后的函数
   */
  function safe(fn, label) {
      return function (...args) {
          try {
              return fn.apply(this, args);
          } catch (e) {
              console.error(`[Vercel 汉化] ${label} 出错:`, e);
          }
      };
  }
  
  /**
   * LRU 缓存实现
   */
  class LRUCache {
      constructor(maxSize = 1000) {
          this.maxSize = maxSize;
          this.cache = new Map();
      }
  
      get(key) {
          if (!this.cache.has(key)) return undefined;
          const value = this.cache.get(key);
          // 移到末尾（最近使用）
          this.cache.delete(key);
          this.cache.set(key, value);
          return value;
      }
  
      set(key, value) {
          if (this.cache.has(key)) {
              this.cache.delete(key);
          } else if (this.cache.size >= this.maxSize) {
              // 删除最久未使用的（第一个）
              const firstKey = this.cache.keys().next().value;
              this.cache.delete(firstKey);
          }
          this.cache.set(key, value);
      }
  
      has(key) {
          return this.cache.has(key);
      }
  }
  
  /**
   * 清理文本（合并空白、去除首尾空格）
   */
  function normalizeText(text) {
      if (!text) return '';
      return text.replace(/\s+/g, ' ').trim();
  }
  
  /**
   * 安全获取嵌套对象属性，支持路径如 'a.b[0].c'
   */
  function getNestedProperty(obj, path) {
      const cleanPath = path.replace(/\?\./g, '.');
      return cleanPath.split('.').reduce((acc, part) => {
          if (!acc) return undefined;
          const match = part.match(/^(\w+)(?:\[(\d+)\])?$/);
          if (!match) return undefined;
          const key = match[1];
          const index = match[2];
          return index !== undefined ? acc[key]?.[index] : acc[key];
      }, obj);
  }

  // --- missed-terms.js ---
  // =========================================================
  // missed-terms.js — 未命中词条管理器
  // =========================================================
  
  /**
   * 未命中词条管理器
   * 数据结构：{ [pathname]: { "原始文本": "" } }
   */
  const MissedTermsManager = {
      data: (() => {
          try {
              return JSON.parse(localStorage.getItem('vercelChinese_missedTerms') || '{}');
          } catch {
              return {};
          }
      })(),
  
      record(text, path) {
          if (!path || !text) return false;
          if (!this.data[path]) this.data[path] = {};
          if (!(text in this.data[path])) {
              this.data[path][text] = '';
              this._save();
              return true;
          }
          return false;
      },
  
      cleanup(text, path) {
          if (!path || !this.data[path]) return false;
          if (text in this.data[path]) {
              delete this.data[path][text];
              if (Object.keys(this.data[path]).length === 0) {
                  delete this.data[path];
              }
              this._save();
              return true;
          }
          return false;
      },
  
      getAll() { return this.data; },
  
      getStats() {
          const paths = Object.keys(this.data);
          const totalTerms = paths.reduce((sum, p) => sum + Object.keys(this.data[p]).length, 0);
          return { totalPaths: paths.length, totalTerms };
      },
  
      clearAll() {
          this.data = {};
          this._save();
      },
  
      exportData() {
          return {
              exportedAt: new Date().toISOString(),
              version: '1.0',
              stats: this.getStats(),
              data: this.data,
          };
      },
  
      _save() {
          try {
              localStorage.setItem('vercelChinese_missedTerms', JSON.stringify(this.data));
          } catch {
              console.warn('[Vercel 汉化] 存储空间不足，未能保存未命中词条');
          }
      },
  };
  
  MissedTermsManager;

  // --- translator.js ---
  // =========================================================
  // translator.js
  // =========================================================
  
  
  
  const translationCache = new LRUCache(1500);
  
  function fetchTransResult(text) {
      if (!State.pageConfig) return null;
      const cleaned = normalizeText(text);
      if (!cleaned || cleaned.length > 500) return null;
      if (translationCache.has(cleaned)) { const c = translationCache.get(cleaned); if (c !== null) return c; }
      let result = null;
      const sr = State.pageConfig.staticDict[cleaned];
      if (typeof sr === 'string') { result = sr; if (State.featureSet.enable_missedTerms) MissedTermsManager.cleanup(cleaned, State.pageConfig.currentPath); }
      if (result === null && State.featureSet.enable_RegExp) {
          for (const [p, rp] of State.pageConfig.regexpRules) { const m = cleaned.match(p); if (m && m.index === 0 && m[0] === cleaned) { const nn = cleaned.replace(p, rp); if (nn !== cleaned) { result = nn; if (State.featureSet.enable_missedTerms) MissedTermsManager.cleanup(cleaned, State.pageConfig.currentPath); break; } } }
      }
      if (result === null && State.featureSet.enable_missedTerms) MissedTermsManager.record(cleaned, State.pageConfig.currentPath);
      if (result !== null) translationCache.set(cleaned, result);
      return result;
  }
  
  function shouldSkipText(text) {
      if (!text || text.length > 500) return true;
      if (/^[\s\d.,:;!?()\[\]{}<>#$%^&*+=|\\~`@_-]*$/.test(text)) return true;
      if (/^[\u4e00-\u9fa5\s，。！？；：""''【】《》（）…—·]+$/.test(text)) return true;
      if (!/[a-zA-Z]/.test(text)) return true;
      return false;
  }
  
  function transText(text) {
      if (shouldSkipText(text)) return null;
      const t = text.trim();
      const r = fetchTransResult(t);
      return r && r !== t ? text.replace(t, r) : null;
  }
  
  function transTitle() {
      if (!State.pageConfig) return;
      const text = document.title;
      let result = State.pageConfig.titleStaticDict[text];
      if (!result) {
          for (const [p, rp] of State.pageConfig.titleRegexpRules) {
              const replaced = text.replace(p, rp);
              if (replaced !== text) { result = replaced; break; }
          }
      }
      if (result) document.title = result;
  }
  function transElementAttrs(element, attrs) {
      const list = Array.isArray(attrs) ? attrs : [attrs];
      list.forEach(a => { const v = element.getAttribute?.(a) || element[a]; if (!v || typeof v !== 'string') return; const r = transText(v); if (r) { if (element.getAttribute?.(a) !== undefined) element.setAttribute(a, r); else element[a] = r; } });
  }
  
  // 收集文本节点列表拼成字符串，标点前不加空格
  function collectTexts(nodes) {
      let raw = '';
      for (const n of nodes) {
          const v = n.nodeValue;
          const isPunct = /^[\s]*[.,;:!?)\]}>'"]+[\s]*$/.test(v);
          // React 用注释节点拆分单词，如 "project" + "s"，短小写字母片段是词尾，不加空格
          const isSuffix = /^[a-z]{1,3}$/.test(v.trim()) && raw.length > 0 && /\S$/.test(raw);
          if (!isPunct && !isSuffix && raw.length > 0 && !/\s$/.test(raw) && !/^\s/.test(v)) {
              raw += ' ';
          }
          raw += v;
      }
      return raw.replace(/\s+/g, ' ').replace(/ ([.,;:!?)\]}>])/g, '$1').trim();
  }
  
  function transTextNode(node) {
      const parent = node.parentElement;
      if (!parent || !State.pageConfig || parent.children.length > 30) { const r = transText(node.nodeValue); if (r) node.nodeValue = r; return; }
  
      // 特判：孤立的英文复数尾缀（如 "s"），且前一个兄弟元素已是中文 → 直接清空
      const val = node.nodeValue;
      if (/^[a-z]{1,2}$/.test(val.trim())) {
          const prevSibling = node.parentElement?.previousElementSibling;
          if (prevSibling) {
              const prevText = prevSibling.textContent || '';
              if (/[\u4e00-\u9fa5]/.test(prevText)) {
                  node.nodeValue = '';
                  return;
              }
          }
      }
  
      // 收集所有子文本节点（含标点）
      const all = [];
      const tw = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
      let tn;
      while ((tn = tw.nextNode())) { if (tn.nodeValue && tn.nodeValue.length > 0) all.push(tn); }
  
      if (all.length === 0) return;
  
      // 含 <a> 时的分段
      const hasLink = !!parent.querySelector('a');
      if (!hasLink) {
          const full = collectTexts(all);
          if (full.length > 5 && full.length <= 200) {
              const m = transText(full);
              if (m && m !== full) { all[0].nodeValue = m; for (let i = 1; i < all.length; i++) all[i].nodeValue = ''; return; }
          }
      } else {
          let left = [], right = [];
          for (const n of all) {
              if (n.parentElement?.closest('a')) break;
              left.push(n);
          }
          for (let i = all.length - 1; i >= 0; i--) {
              if (all[i].parentElement?.closest('a')) break;
              right.unshift(all[i]);
          }
          // 去重（中间部分可能重复）
          const linkStart = left.length, linkEnd = all.length - right.length;
          right = right.filter(n => !all.slice(0, linkStart).includes(n) && !all.slice(linkStart, linkEnd).includes(n));
  
          if (left.length > 0) { const lt = collectTexts(left); if (lt.length > 3 && lt.length <= 150) { const m = transText(lt); if (m && m !== lt) { left[0].nodeValue = m; for (let i = 1; i < left.length; i++) left[i].nodeValue = ''; } } }
          if (right.length > 0) { const rt = collectTexts(right); if (rt.length > 3 && rt.length <= 150) { const m = transText(rt); if (m && m !== rt) { right[0].nodeValue = m; for (let i = 1; i < right.length; i++) right[i].nodeValue = ''; } } }
      }
  
      const r = transText(node.nodeValue);
      if (r) node.nodeValue = r;
  
      // 最终清理：去除中文词后残留的英文复数尾缀（如 "项目s" → "项目"）
      const v = node.nodeValue;
      if (/[\u4e00-\u9fa5]/.test(v) && /[a-z]/.test(v)) {
          const fixed = v
              .replace(/([\u4e00-\u9fa5])\s*[a-z]{1,2}(?=\s|$)/g, '$1')
              .replace(/([\u4e00-\u9fa5])\s+([\u4e00-\u9fa5])/g, '$1$2');
          if (fixed !== v) node.nodeValue = fixed;
      }
  }
  
  function transElementText(element) {
      const tag = element.tagName, tid = element.getAttribute('data-testid') || '';
      if (element.children.length > 5) return false;
      if (element.querySelector('a, input, button, select, textarea, [contenteditable]')) return false;
  
      let raw = '';
      const w = document.createTreeWalker(element, NodeFilter.SHOW_ALL, {
          acceptNode(n) { if (n.nodeType === 1 && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.tagName)) return 2; return 1; }
      });
      let n;
      while ((n = w.nextNode())) {
          if (n.nodeType === 3) { const v = n.nodeValue; if (raw.length > 0 && !/\s$/.test(raw) && v.length > 0 && !/^\s/.test(v) && !/^[.,;:!?)]/.test(v)) raw += ' '; raw += v; }
          else if (n.nodeType === 8) { /* 注释节点不加空格，避免拆分单词 */ }
          else if (n.nodeType === 1 && /^(BR|HR)$/.test(n.tagName)) raw += ' ';
      }
      const text = raw.replace(/\s+/g, ' ').replace(/ ([.,;:!?)\]}>])/g, '$1').trim();
      if (!text || text.length > 150) return false;
      if (/^[\u4e00-\u9fa5]/.test(text) && !/[a-zA-Z]{3,}/.test(text)) return false;
      const result = transText(text);
      if (!result) return false;
      const tw2 = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const nodes = []; let tn; while ((tn = tw2.nextNode())) { if (tn.nodeValue.trim().length > 0) nodes.push(tn); }
      if (nodes.length === 0) return false;
      nodes[0].nodeValue = result; for (let i = 1; i < nodes.length; i++) nodes[i].nodeValue = '';
      return true;
  }

  // --- page-detector.js ---
  // =========================================================
  // page-detector.js — 页面类型检测
  // =========================================================
  
  /**
   * 检测当前页面类型
   * @returns {string|boolean} 页面类型，false 表示未识别
   */
  function detectPageType() {
      const url = new URL(window.location.href);
      const { hostname, pathname } = url;
  
      // 检查是否在 Vercel 域下
      if (!hostname.endsWith('vercel.com') && !hostname.endsWith('vercel.app')) {
          return false;
      }
  
      // 首页
      if (pathname === '/' || pathname === '/home') {
          const isLoggedIn = document.body.classList.contains('logged-in')
              || !!document.querySelector('[data-testid="dashboard"]');
          return isLoggedIn ? 'dashboard' : 'homepage';
      }
  
      // 登录/注册/2FA 页面
      if (pathname === '/login' || pathname.startsWith('/login/')) return 'login';
      if (pathname === '/signup') return 'signup';
  
      // 定价页面
      if (pathname === '/pricing') return 'pricing';
  
      // 文档页面
      if (pathname.startsWith('/docs')) return 'docs';
  
      // 企业页面
      if (pathname.startsWith('/enterprise')) return 'enterprise';
  
      // 仪表盘相关（/dashboard 或 /{teamname} 单级路径）
      if (pathname === '/dashboard') return 'dashboard';
  
      // 项目相关页面（/{teamname}/{projectname}/...）
      if (/^\/[^\/]+\/[^\/]+/.test(pathname)) {
          return detectProjectPage(pathname);
      }
  
      // /{teamname} 单级路径 = 团队仪表盘
      if (/^\/[^\/]+$/.test(pathname)) return 'dashboard';
  
      // 团队页面
      if (/^\/teams(\/|$)/.test(pathname)) return 'teams';
  
      // 设置页面
      if (pathname.startsWith('/account')) return 'settings';
  
      // 安全页面
      if (pathname.startsWith('/security')) return 'security';
  
      // 集成页面
      if (pathname.startsWith('/integrations')) return 'integrations';
  
      // 默认返回通用
      return 'general';
  }
  
  /**
   * 检测项目页面类型
   */
  function detectProjectPage(pathname) {
      if (pathname.includes('/settings/')) return 'project-settings';
      if (pathname.endsWith('/settings')) return 'project-settings';
      if (pathname.includes('/deployments')) return 'project-deployments';
      if (pathname.includes('/analytics')) return 'project-analytics';
      if (pathname.includes('/logs')) return 'project-logs';
      if (pathname.includes('/domains')) return 'project-domains';
      return 'project-overview';
  }
  
  /**
   * 构建页面配置对象 — 合并公共+页面专用词典和规则
   */
  function buildPageConfig(pageType) {
      const locale = I18N[CONFIG.LANG];
      const conf = I18N.conf || {};
  
      const pageData = locale[pageType] || {};
      const publicData = locale['public'] || {};
      const titleData = locale['title'] || {};
  
      return {
          currentPageType: pageType,
          currentPath: window.location.pathname,
  
          titleStaticDict: {
              ...(titleData.static || {}),
              ...(publicData.title?.static || {}),
              ...(pageData.title?.static || {}),
          },
          titleRegexpRules: [
              ...(titleData.regexp || []),
              ...(publicData.title?.regexp || []),
              ...(pageData.title?.regexp || []),
          ],
  
          staticDict: {
              ...(publicData.static || {}),
              ...(pageData.static || {}),
          },
          regexpRules: [
              ...(pageData.regexp || []),
              ...(publicData.regexp || []),
          ],
  
          ignoreMutationSelectors: [
              ...(conf.ignoreMutationSelectorPage?.['*'] || []),
              ...(conf.ignoreMutationSelectorPage?.[pageType] || []),
          ].join(', '),
  
          ignoreSelectors: [
              ...(conf.ignoreSelectorPage?.['*'] || []),
              ...(conf.ignoreSelectorPage?.[pageType] || []),
          ].join(', '),
  
          characterData: (conf.characterDataPage || []).includes(pageType),
  
          transSelectors: [
              ...(publicData.selector || []),
              ...(pageData.selector || []),
          ],
      };
  }

  // --- dom-walker.js ---
  // =========================================================
  // dom-walker.js — DOM 遍历与节点处理
  // =========================================================
  
  
  
  
  /**
   * 遍历节点树并执行翻译
   * @param {Node} rootNode - 根节点
   */
  function traverseNode(rootNode) {
      if (!State.pageConfig) return;
  
      const start = performance.now();
  
      // 文本节点直接处理
      if (rootNode.nodeType === Node.TEXT_NODE) {
          // 重定向到父元素做整体翻译，避免 React 拆分文本节点导致逐词翻译
          const parent = rootNode.parentElement;
          if (parent) {
              handleElementNode(parent, new WeakSet());
          } else {
              handleTextNode(rootNode);
          }
          return;
      }
  
      const treeWalker = document.createTreeWalker(
          rootNode,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
          {
              acceptNode(node) {
                  if (node.nodeType === Node.ELEMENT_NODE
                      && State.pageConfig.ignoreSelectors
                      && node.matches(State.pageConfig.ignoreSelectors)) {
                      return NodeFilter.FILTER_REJECT;
                  }
                  return NodeFilter.FILTER_ACCEPT;
              }
          }
      );
  
      // 记录被 transElementText 成功处理的父元素，避免子文本节点被部分翻译破坏整体翻译
      const translatedParents = new WeakSet();
  
      let currentNode;
      while ((currentNode = treeWalker.nextNode())) {
          if (currentNode.nodeType === Node.ELEMENT_NODE) {
              handleElementNode(currentNode, translatedParents);
          } else if (currentNode.nodeType === Node.TEXT_NODE) {
              if (translatedParents.has(currentNode.parentElement)) continue;
              handleTextNode(currentNode);
          }
      }
  
      const duration = performance.now() - start;
      if (duration > 10) {
          console.log(`[Vercel 汉化] 节点遍历耗时: ${duration.toFixed(2)}ms`);
      }
  }
  
  /**
   * 处理文本节点
   */
  function handleTextNode(node) {
      if (node.length > 500) return;
      transTextNode(node);
  }
  
  /**
   * 处理元素节点
   * @param {Element} node
   * @param {WeakSet} translatedParents - 已成功翻译的元素集合
   */
  function handleElementNode(node, translatedParents) {
      const tag = node.tagName;
      const testId = node.getAttribute('data-testid') || '';
  
      // 跳过特定标签
      const skipTags = new Set([
          'SCRIPT', 'STYLE', 'CODE', 'PRE', 'KBD',
          'SVG', 'PATH', 'IMG', 'CANVAS', 'VIDEO',
          'META', 'LINK', 'NOSCRIPT'
      ]);
      if (skipTags.has(tag)) return;
  
      // 跳过可编辑区域
      if (node.isContentEditable || node.closest('[contenteditable="true"]')) return;
  
      let elementTranslated = false;
  
      // 输入框和文本域
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
          if (['button', 'submit', 'reset'].includes(node.type)) {
              transElementAttrs(node, 'value');
          } else {
              transElementAttrs(node, 'placeholder');
          }
          return;
      }
  
      // 选项组
      if (tag === 'OPTGROUP') {
          transElementAttrs(node, 'label');
          return;
      }
  
      // 按钮元素
      if (tag === 'BUTTON') {
          transElementAttrs(node, ['title', 'aria-label', 'aria-describedby']);
          elementTranslated = transElementText(node);
          if (elementTranslated) translatedParents.add(node);
          return;
      }
  
      // 链接和 span
      if (tag === 'A' || tag === 'SPAN') {
          transElementAttrs(node, ['title', 'aria-label']);
          elementTranslated = transElementText(node);
      }
  
      // 标题和段落
      if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4'
          || tag === 'H5' || tag === 'H6' || tag === 'P' || tag === 'LI'
          || tag === 'TD' || tag === 'TH' || tag === 'DT' || tag === 'DD') {
          elementTranslated = elementTranslated || transElementText(node);
      }
  
      if (elementTranslated) {
          translatedParents.add(node);
      }
  
      // 通用属性翻译
      transElementAttrs(node, CONFIG.TRANSLATABLE_ATTRS);
  }

  // --- mutation-handler.js ---
  // =========================================================
  // mutation-handler.js — MutationObserver 处理
  // =========================================================
  
  
  
  
  
  /**
   * 检查节点是否应被 MutationObserver 忽略
   */
  function shouldIgnoreMutationNode(node) {
      const element = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement;
      if (!element) return true;
  
      const ignoredSelectors = State.pageConfig?.ignoreMutationSelectors;
      if (ignoredSelectors && element.closest?.(ignoredSelectors)) return true;
  
      return false;
  }
  
  /**
   * 处理 MutationObserver 检测到的 DOM 变化
   * 收集节点 → 过滤 → 祖先去重 → 翻译
   */
  function processMutations(mutations) {
      if (!State.pageConfig) return;
  
      const nodesToProcess = new Set();
  
      mutations.forEach(({ target, addedNodes, type }) => {
          if (type === 'childList' && addedNodes.length > 0) {
              addedNodes.forEach(node => {
                  if (!shouldIgnoreMutationNode(node)) {
                      nodesToProcess.add(node);
                  }
              });
          } else if (type === 'attributes') {
              if (!shouldIgnoreMutationNode(target)) {
                  nodesToProcess.add(target);
              }
          } else if (type === 'characterData' && State.pageConfig.characterData) {
              if (!shouldIgnoreMutationNode(target)) {
                  nodesToProcess.add(target);
              }
          }
      });
  
      // 祖先-后代去重
      const topNodes = new Set();
      nodesToProcess.forEach(node => {
          let ancestor = node.parentElement;
          let hasAncestor = false;
          while (ancestor) {
              if (nodesToProcess.has(ancestor)) {
                  hasAncestor = true;
                  break;
              }
              ancestor = ancestor.parentElement;
          }
          if (!hasAncestor) {
              topNodes.add(node);
          }
      });
  
      topNodes.forEach(node => {
          traverseNode(node);
      });
  }
  
  /**
   * 设置 MutationObserver
   */
  function setupMutationObserver() {
      let previousURL = window.location.href;
  
      if (State.mutationObserver) {
          State.mutationObserver.disconnect();
      }
  
      State.mutationObserver = new MutationObserver(
          safe((mutations) => {
              // URL 变化检测（回退方案）
              const currentURL = window.location.href;
              if (currentURL !== previousURL) {
                  previousURL = currentURL;
                  State.currentURL = currentURL;
                  updatePageConfig('URL 变化 (MutationObserver)');
              }
  
              processMutations(mutations);
          }, 'MutationObserver')
      );
  
      State.mutationObserver.observe(document.body, CONFIG.OBSERVER_CONFIG);
  }

  // --- react-compat.js ---
  // =========================================================
  // react-compat.js — React 组件翻译兼容层
  // =========================================================
  
  
  let timer = null;
  let lastMutationAt = Date.now();
  const REACT_IDLE_MS = 200;
  const REACT_RETRY_MS = 50;
  
  const UNSAFE_SELECTOR = [
      'textarea', '[contenteditable="true"]', 'code', 'pre',
      'kbd', 'svg', 'img', 'canvas', 'video', 'input[type="text"]',
      'input[type="search"]', 'input[type="email"]', 'input[type="password"]',
  ].join(', ');
  
  const TRANSLATABLE_ATTRS = ['title', 'aria-label', 'placeholder', 'alt'];
  
  function shouldSkipNode(node) {
      const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
      if (!element) return true;
      return !!element.closest?.(UNSAFE_SELECTOR);
  }
  
  function translateElementAttrs(element) {
      TRANSLATABLE_ATTRS.forEach(attr => {
          const value = element.getAttribute?.(attr);
          if (!value) return;
          const result = transText(value);
          if (result) element.setAttribute(attr, result);
      });
  }
  
  function translateTextNode(node) {
      const result = transText(node.data);
      if (result) node.data = node.data.replace(node.data.trim(), result.trim());
  }
  
  function translateSurface(surface) {
      if (!surface || shouldSkipNode(surface)) return;
  
      if (surface.nodeType === Node.ELEMENT_NODE) translateElementAttrs(surface);
  
      const walker = document.createTreeWalker(
          surface,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
          { acceptNode(node) { return shouldSkipNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } }
      );
  
      const translatedParents = new WeakSet();
  
      let node;
      while ((node = walker.nextNode())) {
          if (node.nodeType === Node.ELEMENT_NODE) {
              translateElementAttrs(node);
              if (transElementText(node)) translatedParents.add(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
              if (translatedParents.has(node.parentElement)) continue;
              translateTextNode(node);
          }
      }
  }
  
  /**
   * 修复 header button span 内的文本节点：
   * 逐个处理每个文本节点，去掉尾部空格，清空纯英文复数尾缀节点
   */
  function cleanHeaderButtonComments() {
      document.querySelectorAll('header button span').forEach(span => {
          if (span.children.length > 0) return;
          // 收集所有非空文本节点
          const textNodes = [];
          span.childNodes.forEach(n => {
              if (n.nodeType === Node.TEXT_NODE) textNodes.push(n);
          });
          if (textNodes.length <= 1) return;
          // 逐个处理
          textNodes.forEach(n => {
              // 纯英文复数尾缀（1-3个小写字母）→ 清空
              if (/^[a-z]{1,3}$/.test(n.nodeValue.trim())) {
                  n.nodeValue = '';
                  return;
              }
              // 去掉尾部空格
              n.nodeValue = n.nodeValue.trimEnd();
          });
      });
  }
  
  function translateMainContent() {
      const main = document.querySelector('main');
      if (main) translateSurface(main);
      document.querySelectorAll('nav, header, [role="navigation"]').forEach(el => {
          translateSurface(el);
      });
      // 翻译之后再清理 header button 的残留文本节点
      cleanHeaderButtonComments();
  }
  
  function scheduleTranslation(delay = 800) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
          if (Date.now() - lastMutationAt >= REACT_IDLE_MS) translateMainContent();
      }, delay);
  }
  
  function scheduleSeries() {
      [100, 250, 600].forEach(delay => window.setTimeout(translateMainContent, delay));
  }
  
  function recordMutation() {
      lastMutationAt = Date.now();
  }
  
  function setupReactCompat() {
      const observer = new MutationObserver(safe((mutations) => {
          recordMutation();
          scheduleTranslation(REACT_RETRY_MS);
      }, 'ReactCompat'));
  
      const targets = [
          document.querySelector('main'),
          document.querySelector('nav'),
          document.querySelector('header'),
      ].filter(Boolean);
  
      targets.forEach(target => {
          observer.observe(target, { childList: true, subtree: true, characterData: true });
      });
  
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', scheduleSeries, { once: true });
      } else {
          scheduleSeries();
      }
  
      ['click', 'focusin'].forEach(evt => {
          document.addEventListener(evt, () => scheduleTranslation(REACT_RETRY_MS), true);
      });
  
      window.addEventListener('popstate', scheduleSeries);
  }

  // --- engine.js ---
  // =========================================================
  // engine.js — 主引擎入口
  // =========================================================
  
  
  
  
  
  
  
  
  
  let langObserver = null;
  
  /**
   * 检查词库是否加载
   */
  function checkI18NLoaded() {
      if (typeof I18N === 'undefined') {
          console.error('[Vercel 汉化] 词库文件未加载，脚本无法运行！');
          throw new Error('[Vercel 汉化] 词库文件未加载');
      }
  }
  
  /**
   * 初始化语言环境
   */
  function initLangEnv() {
      document.documentElement.lang = CONFIG.LANG;
      langObserver = new MutationObserver(() => {
          if (document.documentElement.lang === 'en') {
              document.documentElement.lang = CONFIG.LANG;
          }
      });
      langObserver.observe(document.documentElement, { attributeFilter: ['lang'] });
  }
  
  /**
   * 更新页面配置
   */
  function updatePageConfig(trigger) {
      const newType = detectPageType();
      if (!newType) {
          State.pageConfig = null;
          console.log(`[Vercel 汉化] ${trigger} 触发，页面类型: 未识别`);
      } else if (newType !== State.pageConfig?.currentPageType) {
          State.pageConfig = buildPageConfig(newType);
          console.log(`[Vercel 汉化] ${trigger} 触发，页面类型: ${newType}`);
      }
  }
  
  /**
   * 初始化翻译
   */
  function setupInitTrans() {
      function doInitTrans() {
          updatePageConfig('首次载入');
          if (State.pageConfig) {
              safe(traverseNode, '首次遍历')(document.body);
              transTitle();
          }
          setupMutationObserver();
      }
  
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
          doInitTrans();
      } else {
          window.addEventListener('DOMContentLoaded', doInitTrans, { once: true });
      }
  }
  
  /**
   * 监听 URL 变化
   */
  function setupUrlChangeListener() {
      // Tampermonkey onurlchange 事件
      if (typeof window.onurlchange !== 'undefined' && window.onurlchange === null) {
          window.addEventListener('urlchange', () => {
              const currentURL = window.location.href;
              if (currentURL === State.currentURL) return;
              State.currentURL = currentURL;
              updatePageConfig('URL 变化');
  
              if (State.mutationObserver) {
                  State.mutationObserver.disconnect();
              }
  
              if (State.pageConfig) {
                  safe(traverseNode, 'URL 变化遍历')(document.body);
                  transTitle();
              }
  
              setupMutationObserver();
          });
      }
  }
  
  /**
   * 监听 Turbo/SPA 导航事件
   */
  function setupTurboEvents() {
      document.addEventListener('turbo:load', () => {
          if (!State.pageConfig) return;
          transTitle();
      });
  }
  
  /**
   * 在页面最早期拦截 header button 里的 "All projects" 结构
   * React 把它渲染成 "All <!-- -->project<!-- -->s"，需要在 DOM 出现时立刻替换
   */
  function setupEarlyFix() {
      const SCOPE_MAP = {
          'All projects': '全部项目',
          'All teams': '全部团队',
          'All accounts': '全部账户',
      };
  
      function fixBtn(btn) {
          const span = btn.querySelector('span:not(:has(*))') || btn.querySelector('span');
          if (!span) return;
          const text = span.textContent.trim();
          if (SCOPE_MAP[text]) {
              span.textContent = SCOPE_MAP[text];
          }
      }
  
      const obs = new MutationObserver(mutations => {
          mutations.forEach(({ addedNodes }) => {
              addedNodes.forEach(node => {
                  if (node.nodeType !== Node.ELEMENT_NODE) return;
                  const btns = node.matches('button') ? [node] : Array.from(node.querySelectorAll('button'));
                  btns.filter(b => b.closest('header')).forEach(fixBtn);
              });
          });
      });
  
      function attachEarlyFix() {
          // 处理已存在的按钮
          document.querySelectorAll('header button').forEach(fixBtn);
          // 监听新加入的按钮（此时 body 已存在）
          obs.observe(document.body, { childList: true, subtree: true });
      }
  
      if (document.body) {
          attachEarlyFix();
      } else {
          document.addEventListener('DOMContentLoaded', attachEarlyFix, { once: true });
      }
  }
  
  /**
   * 主初始化入口
   */
  function init() {
      checkI18NLoaded();
      initLangEnv();
      setupEarlyFix();
      setupInitTrans();
      setupUrlChangeListener();
      setupTurboEvents();
      setupReactCompat();
      State.initDone = true;
  
      // 暴露调试接口
      if (CONFIG.DEV) {
          window.__vercelChinese = {
              State,
              MissedTermsManager,
              getStats: () => MissedTermsManager.getStats(),
              exportMissed: () => MissedTermsManager.exportData(),
              clearMissed: () => MissedTermsManager.clearAll(),
          };
      }
  }
  
  // 启动
  init();

})();
