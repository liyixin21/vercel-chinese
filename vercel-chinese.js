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