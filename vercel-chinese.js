// ==UserScript==
// @name        Vercel 汉化
// @namespace   https://github.com/liyixin21/vercel-chinese
// @description 汉化 Vercel 界面
// @version     0.2.0
// @author      liyixin21，Lirzh
// @license     GPL-3.0
// @match       *://*.vercel.app/*
// @match       *://vercel.com/*
// @match       *://*.vercel.com/*
// @icon        https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    // =========================================================
    // 1. 汉化字典
    // =========================================================
    const I18N = {
        // --- 特殊处理 (消除中间的 the 和空格) ---
        "the": "",  // 【关键修改】直接映射为空字符串
        "Try": "体验新版导航",
        "Experience": "体验新版导航",
        "new navigation": "",

        // --- 顶部导航与通用 ---
        "Skip to content": "跳转到内容",
        "Feedback": "反馈",
        "Help": "帮助",
        "Docs": "文档",
        "Support": "支持",
        "Dashboard": "仪表盘",
        "Overview": "概览",
        "Integrations": "集成",
        "Activity": "动态",
        "Domains": "域名",
        "Usage": "用量",
        "Settings": "设置",
        "Teams": "团队",
        "Notifications": "通知",
        "Project Settings": "项目设置",
        "Recents": "最近访问",
        "Alerts": "告警",
        "Favorites": "收藏",
        "Account Settings": "账号设置",
        "Log Out": "退出登录",
        "Back": "返回",
        "Next": "下一步",
        "Continue": "继续",

        // --- 侧边栏与功能区 ---
        "Deployments": "部署记录",
        "Analytics": "分析",
        "Speed Insights": "速度洞察",
        "Logs": "日志",
        "Storage": "存储",
        "Security": "安全",
        "Observability": "监控 (Observability)",
        "Monitoring": "监控",
        "Flags": "特性开关 (Flags)",
        "AI Gateway": "AI 网关",
        "Sandboxes": "沙盒",
        "Agent": "代理 (Agent)",
        "Firewall": "防火墙",
        "Redirects": "重定向",
        "Functions": "函数",
        "Cron Jobs": "定时任务",
        "Networking": "网络",
        "Git": "Git",
        "Environment Variables": "环境变量",

        // --- 集成市场 ---
        "Integrations Console": "集成控制台",
        "Browse Marketplace": "浏览市场",
        "All Installed Integrations": "已安装的集成",
        "Authentication": "身份验证",
        "Database": "数据库",
        "Latest Integrations": "最新集成",
        "Explore more integrations to expand your Vercel development experience.": "探索更多集成以扩展您的 Vercel 开发体验。",
        "Billed via Vercel": "通过 Vercel 计费",
        "Manage": "管理",
        "Third Party": "第三方",
        "Add Integration": "添加集成",
        "Install": "安装",
        "Uninstall": "卸载",
        "Configuration": "配置",

        // --- 详细用量 ---
        //"Hobby": "爱好者版 (Hobby)",
        //"Pro": "专业版 (Pro)",
        //"Enterprise": "企业版",
        "Upgrade": "升级",
        "Trial": "试用",
        "Manage Plan": "管理套餐",
        "Invoices": "发票",
        "Fast Data Transfer": "快速数据传输",
        "Fast Origin Transfer": "快速回源传输",
        "Edge Requests": "Edge 请求数",
        "Bandwidth": "带宽",
        "Total Size": "总大小",
        "Vercel Functions": "Vercel 函数",
        "Function Duration": "函数执行时长",
        "Function Invocations": "函数调用次数",
        "Invocations": "调用次数",
        "Throttles": "限流次数",
        "Edge Request CPU Duration": "Edge 请求 CPU 时长",
        "Edge Functions": "Edge 函数",
        "Execution Units": "执行单元",
        "CPU Time": "CPU 时间",
        "Fluid Provisioned Memory": "弹性预置内存",
        "Fluid Active CPU": "弹性活跃 CPU",
        "Microfrontends Routing": "微前端路由",
        "Incremental Static Regeneration": "增量静态再生 (ISR)",
        "Revalidations": "重新验证",
        "ISR Reads": "ISR 读取",
        "ISR Writes": "ISR 写入",
        "Data Cache": "数据缓存",
        "Remote Cache Artifacts": "远程缓存产物",
        "Time Saved": "节省时间",
        "Artifacts": "构建产物",
        "Builds": "构建",
        "Blob": "Blob 存储",
        "Blob Data Transfer": "Blob 数据传输",
        "Simple Operations": "简单操作",
        "Advanced Operations": "高级操作",
        "Edge Middleware": "Edge 中间件",
        "Edge Config": "Edge 配置",
        "Drains": "日志漏斗",
        "Drain Volume": "漏斗数据量",
        "Web Analytics Events": "Web 分析事件",
        "Web Analytics": "Web 分析",
        "Speed Insights Data Points": "速度洞察数据点",
        "Image Optimization": "图像优化",
        "Observability Events": "可观测性事件",
        "Source Images": "源图片",

        // --- 动作与交互 ---
        "New Project": "新建项目",
        "Add New...": "新增...",
        "Add New": "新增",
        "Import": "导入",
        "Deploy": "部署",
        "Visit": "访问",
        "Redeploy": "重新部署",
        "Promote": "发布到生产环境",
        "Rollback": "回滚",
        "Instant Rollback": "即时回滚",
        "Clone": "克隆",
        "View Build Logs": "查看构建日志",
        "Runtime Logs": "运行日志",
        "Go to Dashboard": "前往仪表盘",
        "Delete": "删除",
        "Save": "保存",
        "Cancel": "取消",
        "Edit": "编辑",
        "Copy": "复制",
        "Transfer In": "转入",
        "Add Existing": "添加现有",
        "Buy": "购买",
        "Configure": "配置",
        "Learn more": "了解更多",
        "Try it out": "试一试",
        "Load More": "加载更多",
        "Select Date Range": "选择日期范围",
        "Enable Push Notifications": "启用推送通知",
        "View Source Images": "查看源图片",
        "Select all": "全选",

        // --- 状态与环境 ---
        "Production": "生产环境",
        "Preview": "预览环境",
        "Development": "开发环境",
        "Ready": "就绪",
        "Building": "构建中",
        "Error": "错误",
        "Queued": "排队中",
        "Canceled": "已取消",
        "Initializing": "初始化中",
        "Analyzing": "分析中",
        "Uploading": "上传中",
        "Archived": "已归档",
        "Aliased": "已绑定别名",
        "Assigned": "已分配",
        "Loading status…": "加载状态...",
        "Current": "当前",

        // --- 页脚与杂项 ---
        "Home": "首页",
        "Knowledge Base": "知识库",
        "Academy": "学院",
        "SDKs": "SDKs",
        "Contact": "联系我们",
        "Legal": "法律",
        "Select a display theme:": "选择显示主题：",
        "system": "跟随系统",
        "light": "浅色",
        "dark": "深色",

        // --- 通用界面元素 ---
        "Search...": "搜索...",
        "Find…": "查找...",
        "Filter by...": "筛选...",
        "Filter by Event": "按事件筛选",
        "All Environments": "所有环境",
        "Sort by": "排序",
        "Last 30 days": "最近 30 天",
        "Last 24 hours": "最近 24 小时",
        "Source": "来源",
        "Branch": "分支",
        "Commit": "提交",
        "Author": "作者",
        "Duration": "耗时",
        "Created": "创建于",
        "Status": "状态",
        "Recommendation": "推荐",

        "Upgrade to Observability Plus": "升级至可观测性 Plus",
        "Preview deployments that you have recently visited or created will appear here.": "您最近访问或创建的预览部署将在此显示",
        "Recent Previews": "最近预览",
        "Projects": "项目",
        "Project": "项目",
        "Quick Navigation": "快速导航",
        "Press": "按",
        "to find anything in the dashboard.": "键在控制台中查找任何内容",
        "Dismiss": "关闭",
        "Try it": "试一试",
        "Add Favorite": "添加收藏",
        "Visit with Toolbar": "使用工具栏访问",
        "View Logs": "查看日志",
        "Manage Domains": "管理域名",
        "Transfer Project": "转移项目",
        "Repository": "代码仓库",
        "Import Directory": "导入目录",
        "View Git Repository": "查看 Git 仓库",
        "Filter by": "筛选条件",
        "Microfrontend": "微前端",
        "Name": "名称",
        "Domain": "域名",
        "Store": "存储",
        "Integration": "集成",
        "Team Member": "团队成员",
        "Search Projects...": "搜索项目...",

        "Select All": "全选",
        "Clear All": "清除全部",
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
        "Combobox Menu": "组合框菜单",
        "Filter by event": "按事件筛选",
        "Sort by": "排序",

        "Auto-renew": "自动续费",
        "Expiring": "即将过期",
        "Expired": "已过期",
        "No domains": "无域名",
        "No expired, non-renewing, renewing domains found.": "未找到已过期、不续费或正在续费的域名。",
        "Want to purchase a domain instead?": "想要购买一个域名吗？",
        "Move Domains": "移动域名",
        "custom aliases": "自定义别名",
        "Delete Domains": "删除域名",
        "The following domains will be permanently deleted along with related aliases.": "以下域名及其相关别名将被永久删除。",
        "If you would like to use a domain on another project, consider moving it instead.": "如果您想在另一个项目中使用该域名，请考虑将其移动。",
        "Related aliases will be deleted.": "个相关别名将被删除。",
        "Move teams": "移动团队",
        "Move Domain": "移动域名",

        "Upgrade to Pro": "升级至 Pro 版",
        "Manage Notifications": "管理通知",
        "Read and write directly to databases and stores from your projects.": "直接从您的项目读写数据库和存储。",
        "Create Database": "创建数据库",
        "Connect Project": "连接项目",
        "Experimentation": "实验",
        "Use feature flags and experiments from Marketplace providers.": "使用来自市场提供商的功能标记和实验。",
        "Create feature flags and experiments": "创建功能标记和实验",
        "Set up a provider to start creating feature flags and experiments.": "设置提供商以开始创建功能标记和实验。",
        "Marketplace Experimentation Providers": "市场实验提供商",
        "Seamlessly integrate AI models into your Vercel project.": "将 AI 模型无缝集成到您的 Vercel 项目中。",
        "Quick Start": "快速开始",
        "Model List": "模型列表",
        "API Keys": "API 密钥",
        "Bring Your Own Key": "自带密钥",
        "Templates": "模板",
        "Leaderboards": "排行榜",
        "Playground": "演练场",
        "Documentation": "文档",

       "Start using AI Gateway": "开始使用 AI 网关",
        "Verify your identity by adding a credit card and unlock $5 in free credits.": "通过添加信用卡验证您的身份并解锁 $5 免费额度。",
        "Add a Card": "添加银行卡",
        "Free Credit": "免费额度",
        "Buy Credits": "购买额度",

        "Ship faster and safer with Pro": "使用 Pro 版发布更快、更安全",
        "Get your pull requests automatically reviewed by Vercel Agent.": "让 Vercel Agent 自动审查您的拉取请求 (PR)。",
        "Support Center": "支持中心",
        "Create and view support cases for your projects.": "为您的项目创建和查看支持工单。",
        "No cases yet": "暂无工单",
        "Create a new case to get started": "创建新工单以开始",
        "Contact Support": "联系支持",
        "Closed": "已关闭",
        "Transferred": "已转移",
        "Open": "开启",
        "Last Updated": "最近更新",
        "Date Created": "创建日期",
        "Severity": "严重程度",

        "Create Query in Observability": "在可观测性中创建查询",
        "Run untrusted or AI-generated code safely in isolated environments.": "在隔离环境中安全运行不受信任或 AI 生成的代码。",
        "Get Started with Sandboxes": "开始使用沙盒",
        "Execute untrusted code without exposing your environment variables or databases": "执行不受信任的代码，而不暴露您的环境变量或数据库",
        "Spin up isolated Linux environments with Node.js or Python on-demand": "按需启动带有 Node.js 或 Python 的隔离 Linux 环境",
        "Pay only for active CPU time, not idle or waiting periods.": "仅为活跃 CPU 时间付费，无需为空闲或等待时间付费。",
        "CLI Reference": "CLI 参考",
        "Start with one command": "一键启动",
        "Creates a sandbox and opens an interactive shell": "创建一个沙盒并打开交互式 Shell",

        "General": "常规",
        "Billing": "计费",
        "Build and Deployment": "构建与部署",
        "Members": "成员",
        "Access Groups": "访问组",
        "Webhooks": "Webhooks",
        "Security & Privacy": "安全与隐私",
        "Deployment Protection": "部署保护",
        "Microfrontends": "微前端",
        "Connectivity": "连接性",
        "My Notifications": "我的通知",
        "Apps": "应用",
        "Team Name": "团队名称",
        "Please use 32 characters at maximum.": "请最多使用 32 个字符。",
        "Team URL": "团队 URL",
        "Please use 48 characters at maximum.": "请最多使用 48 个字符。",
        "Team Avatar": "团队头像",
        "This is your team's avatar.": "这是您的团队头像。",
        "Click on the avatar to upload a custom one from your files.": "点击头像从您的文件中上传自定义头像。",
        "An avatar is optional but strongly recommended.": "头像为可选项，但强烈建议上传。",
        "Deployment": "部署",
        "Use hundreds of AI models without managing rate limits and API keys through Vercel AI Gateway.": "通过 Vercel AI 网关使用数百种 AI 模型，无需管理速率限制和 API 密钥。",
        "Build Logs": "构建日志",
        "Deployment Settings": "部署设置","Recommendations": "推荐",
        "Faster functions at a lower cost": "以更低成本获得更快的函数性能",
        "Get builds up to 40% faster": "构建速度最高提升 40%",
        "Switch to a bigger build machine.": "切换到更强大的构建机器。",
        "Build Multiple Deployments Simultaneously": "同时构建多个部署",
        "Never wait for a queued build.": "无需等待排队构建。",
        "Prevent Frontend-Backend Mismatches": "防止前端-后端不匹配",
        "Automatically sync client and server versions to avoid deployment conflicts.": "自动同步客户端和服务器版本，以避免部署冲突。",
        "Build Settings": "构建设置",
        "On-Demand Concurrent Builds": "按需并发构建",
        "Disabled": "已禁用",
        "Build Machine": "构建机器",
        "performance": "性能",
        "Standard performance": "标准性能",
        "Prioritize Production Builds": "优先处理生产构建",
        "(Legacy) Standard Protection": "(旧版) 标准保护",
        "Function CPU": "函数 CPU",
        "Cold Start Prevention": "冷启动预防",
        "Skew Protection": "偏差保护",
        "Fluid Compute": "流动计算",
        "Runtime Settings": "运行时设置",
        "To update your Production Deployment, push to the master branch.": "要更新您的生产部署，请推送至 master 分支。",
        "Track visitors and page views": "追踪访客和页面浏览量",
        "Enable": "启用",
        "Active · All systems normal": "运行中 · 所有系统正常",
        "Active Branches": "活跃分支",
        "No Active Branches": "无活跃分支",
        "Commit using our Git connections.": "使用我们的 Git 连接进行提交。",
        "Automatically created": "自动创建",
        "for pushes to": "用于推送到",
        "Web Analytics": "Web 分析",
        "Limits & Pricing": "限制与定价",
        "Real-time insights into your traffic": "实时洞察您的流量",
        "Ensure smooth performance with real-time bandwidth analysis.": "通过实时带宽分析确保流畅的性能。",
        "Deeper insights with custom events": "通过自定义事件获得更深入的洞察",
        "Track whatever is relevant for your website.": "追踪与您网站相关的任何内容。",
        "Respects visitor privacy": "尊重访客隐私",
        "Web Analytics doesn't rely on cookies and doesn't store personal information.": "Web 分析不依赖 Cookie，也不存储个人信息。",
        "First-party, at the edge": "边缘第一方",
        "Data is collected through your own domain.": "数据通过您自己的域名收集。",
        "Easy integration": "轻松集成",
        "Start collecting data with one line of code. Supports all major frameworks.": "只需一行代码即可开始收集数据。支持所有主流框架。",
        "Your site stays fast": "您的网站保持快速",
        "The light-weight trackings script is less than 5kb.": "轻量级追踪脚本小于 5kb。",
        "Connect to a Database": "连接到数据库",
        "MARKETPLACE": "市场",
        "Statsig": "Statsig",
        "Hypertune": "Hypertune",
        "GrowthBook": "GrowthBook",
        "No flags": "无标记",
        "No flags have been created": "尚未创建任何标记",
        "Install Flag Provider": "安装标记提供商",
        "Environments": "环境",
        "Project Name": "项目名称",
        "Used to identify your Project on the Dashboard, Vercel CLI, and in the URL of your Deployments.": "用于在控制台、Vercel CLI 和部署 URL 中标识您的项目。",
        "Learn more about Project Name": "了解更多关于项目名称的信息",
        "Project ID": "项目 ID",
        "Used when interacting with the Vercel API.": "在与 Vercel API 交互时使用。",
        "Learn more about Project ID": "了解更多关于项目 ID 的信息",
        "Vercel Toolbar": "Vercel 工具栏",
        "Enable the Vercel Toolbar on your Deployments.": "在您的部署上启用 Vercel 工具栏。",
        "Pre-Production Deployments": "预生产部署",
        "Production Deployments": "生产部署",
        "Chrome extension": "Chrome 扩展",
        "toolbar in production": "生产环境中的工具栏",
        "Learn more about the Vercel Toolbar": "了解更多关于 Vercel 工具栏的信息",
        "This feature is available on the Pro plan\n for an additional $100 per month.": "此功能适用于 Pro 计划\n需额外支付每月 $100。",
        "Pro plan": "Pro 计划",
        "$100 per month": "每月 $100",
        "Transfer your project to another team without downtime or workflow interruptions.": "将您的项目转移到另一个团队，无需停机或中断工作流程。",
        "Transfer": "转移",
        "Learn more about Transferring Projects": "了解更多关于转移项目的信息",
        "Transferring Projects": "转移项目",
        "Delete Project": "删除项目",
        "To confirm, type “aipan-netdisk-search”": "确认删除，请输入 “aipan-netdisk-search”",
        "To confirm, type “aipan-netdisk-search”\n\nTo confirm, type “delete my project”": "确认删除，请输入 “aipan-netdisk-search”\n\n确认删除，请输入 “delete my project”",
        "To confirm, type “delete my project”": "确认删除，请输入 “delete my project”",
        "Deleting aipan-netdisk-search cannot be undone.": "删除 aipan-netdisk-search 操作无法撤销。",
        "Advanced": "高级",
        "Project Members": "项目成员",
        "Caches": "缓存",
        "No Active Branches\n\nCommit using our Git connections.": "无活跃分支\n\n使用我们的 Git 连接进行提交。",
        "Track visitors and page views\n\nEnable": "追踪访客和页面浏览量\n\n启用",
        "Error Rate": "错误率",
    };

    // =========================================================
    // 2. 正则替换规则
    // =========================================================
    const REGEX_RULES = [
        // 时间格式化
        { re: /^Created\s+(.+)\s+ago$/, to: "创建于 $1 前" },
        { re: /^Updated\s+(.+)\s+ago$/, to: "更新于 $1 前" },
        { re: /^Updated\s+just now$/, to: "刚刚更新" },
        { re: /^([0-9]+)m\s+([0-9]+)s$/, to: "$1分 $2秒" },
        { re: /^([0-9]+)s$/, to: "$1秒" },
        { re: /^([0-9]+)h$/, to: "$1小时" },

        // 上下文
        //{ re: /^by\s+([a-zA-Z0-9_-]+)$/, to: "作者 $1" },
        //{ re: /^from\s+([a-zA-Z0-9_\-\/]+)$/, to: "来自 $1" },
        { re: /^on\s+([a-zA-Z0-9_\-\/]+)$/, to: "在 $1 分支" },
        { re: /^All deployments from$/, to: "所有部署来自" },

        // 提示语
        { re: /^To update your Production Deployment, push to the\s+(.+)\s+branch.$/, to: "要更新生产环境部署，请推送到 $1 分支" },
        { re: /^Get alerted for anomalies$/, to: "获取异常告警" },
        { re: /^Automatically monitor your projects for anomalies and get notified.$/, to: "自动监控项目异常并获取通知" },
    ];

    // =========================================================
    // 3. 高性能核心引擎 (Time Slicing & Caching) - 已修复空字符Bug
    // =========================================================

    const IGNORE_TAGS = new Set(['STYLE', 'SCRIPT', 'TEXTAREA', 'CODE', 'PRE', 'INPUT', 'SVG', 'PATH', 'NOSCRIPT', 'META', 'LINK']);

    // 任务队列
    let nodeQueue = [];
    let isProcessing = false;

    // LRU 缓存
    const MAX_CACHE_SIZE = 1500;
    const translationCache = new Map();

    /**
     * 带缓存的翻译函数
     */
    function getTranslation(text) {
        if (!text || text.length > 300) return null;
        const key = text.trim();
        if (!key) return null;

        // 1. 查缓存
        if (translationCache.has(key)) {
            return translationCache.get(key);
        }

        // 2. 字典匹配
        let result = I18N[key];

        // 3. 正则匹配
        if (result === undefined && (key.includes(' ') || /\d/.test(key))) {
            for (const rule of REGEX_RULES) {
                if (rule.re.test(key)) {
                    result = key.replace(rule.re, rule.to);
                    break;
                }
            }
        }

        // 4. 写入缓存 (包括 null)
        if (translationCache.size >= MAX_CACHE_SIZE) {
            const firstKey = translationCache.keys().next().value;
            translationCache.delete(firstKey);
        }

        // 【核心修复】: 明确存储结果，即使是空字符串 ""
        translationCache.set(key, result !== undefined ? result : null);

        return result !== undefined ? result : null;
    }

    /**
     * 处理单个节点
     */
    function processNode(node) {
        if (node.nodeType === 1) {
            if (IGNORE_TAGS.has(node.tagName) || node.isContentEditable) return;
            ['placeholder', 'title', 'aria-label', 'alt'].forEach(attr => {
                if (node.hasAttribute(attr)) {
                    const val = node.getAttribute(attr);
                    const translated = getTranslation(val);
                    // 【核心修复】: 只要不是 null 就替换，允许空字符串
                    if (translated !== null) node.setAttribute(attr, translated);
                }
            });
        }
        else if (node.nodeType === 3) {
            const val = node.nodeValue;
            if (/^[\d\s.,\/]+$/.test(val)) return;

            const translated = getTranslation(val);
            // 【核心修复】: 允许空字符串替换 (translated !== null)
            if (translated !== null) {
                node.nodeValue = translated;
            }
        }
    }

    /**
     * 调度器
     */
    function scheduleProcessing() {
        if (isProcessing) return;
        if (nodeQueue.length === 0) return;

        isProcessing = true;
        const requestIdle = window.requestIdleCallback || (cb => setTimeout(() => cb({ timeRemaining: () => 1 }), 1));

        requestIdle((deadline) => {
            while (nodeQueue.length > 0 && deadline.timeRemaining() > 0.5) {
                const node = nodeQueue.shift();
                if (!node || (!node.isConnected && node !== document.body)) continue;

                processNode(node);

                if (node.nodeType === 1 && !IGNORE_TAGS.has(node.tagName)) {
                   let child = node.firstChild;
                   while (child) {
                       nodeQueue.push(child);
                       child = child.nextSibling;
                   }
                }
            }
            isProcessing = false;
            if (nodeQueue.length > 0) scheduleProcessing();
        }, { timeout: 2000 });
    }

    const observer = new MutationObserver((mutations) => {
        let hasChanges = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    nodeQueue.push(node);
                }
                hasChanges = true;
            } else if (mutation.type === 'attributes' || mutation.type === 'characterData') {
                nodeQueue.push(mutation.target);
                hasChanges = true;
            }
        }
        if (hasChanges) scheduleProcessing();
    });

    function main() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walker.nextNode()) {
            nodeQueue.push(node);
        }
        scheduleProcessing();

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
            attributeFilter: ['placeholder', 'title', 'aria-label']
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        setTimeout(main, 800);
    }

})();
