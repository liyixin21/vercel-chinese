// ==UserScript==
// @name        Vercel 汉化
// @namespace   https://github.com/liyixin21/vercel-chinese
// @description 汉化 Vercel 界面
// @version     0.1.0
// @author      liyixin21
// @license     GPL-3.0
// @match       *://*.vercel.app/*
// @match       *://vercel.com/*
// @match       *://*.vercel.com/*
// @icon        https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    const lang = 'zh-CN'; // 设置默认语言
    
    // 需要忽略的元素选择器
    const ignoredSelectors = [
        'code', 'pre', 'script', 'style', 'textarea', 'kbd',
        '.CodeMirror', '.monaco-editor', '.cm-editor', '.codemirror-textarea',
        'input[type="text"]', 'input[type="password"]', 'input[type="email"]',
        '[data-do-not-translate]', '[data-translation-ignore]'
    ];
    
    // 需要忽略的特定元素的类名或ID
    const ignoredClasses = [
        'CodeBlock', 'gitSha', 'deployment-url', 'geist-code', 'monospace',
        'build-log', 'runtime-log', 'function-log', 'terminal-output', 'edge-log'
    ];

    // Vercel界面中常见的英文词汇及其中文翻译
    const i18n = new Map([
        // 页面顶部导航
        ['Dashboard', '仪表盘'],
        ['Analytics', '分析'],
        ['Domains', '域名'],
        ['Usage', '用量'],
        ['Settings', '设置'],
        ['Feedback', '反馈'],
        ['Help', '帮助'],
        ['Log Out', '退出登录'],

        // 部署相关
        ['Production', '生产环境'],
        ['Preview', '预览环境'],
        ['Development', '开发环境'],
        ['Preview Deployment', '预览部署'],
        ['Development Deployment', '开发部署'],
        ['Deploy', '部署'],
        ['Deployments', '部署记录'],
        ['Redeploy', '重新部署'],
        ['Delete', '删除'],
        ['Visit', '访问'],
        ['Created', '创建于'],
        ['Deployed', '已部署'],
        ['Deploying', '部署中'],
        ['Building', '构建中'],
        ['Deployment', '部署'],
        ['Deployment Status', '部署状态'],
        ['Latest Deployments', '最新部署'],
        ['View Build Logs', '查看构建日志'],
        ['Deployment failed', '部署失败'],
        ['Deployment canceled', '部署已取消'],
        ['Deployment succeeded', '部署成功'],
        
        // Git集成
        ['Commit', '提交'],
        ['Branch', '分支'],
        ['Pull Request', '拉取请求'],
        ['Repository', '仓库'],
        ['Connect Git Repository', '连接Git仓库'],
        ['GitHub', 'GitHub'],
        ['GitLab', 'GitLab'],
        ['Bitbucket', 'Bitbucket'],
        ['Connected', '已连接'],
        ['Disconnect', '断开连接'],
        ['Clone', '克隆'],
        ['Main Branch', '主分支'],
        ['Deploy Hook', '部署钩子'],
        ['Create Hook', '创建钩子'],
        
        // 项目设置
        ['Project Settings', '项目设置'],
        ['General', '常规'],
        ['Domains', '域名'],
        ['Environment Variables', '环境变量'],
        ['Integration', '集成'],
        ['Integrations', '集成服务'],
        ['Project ID', '项目ID'],
        ['Framework', '框架'],
        ['Root Directory', '根目录'],
        ['Build Command', '构建命令'],
        ['Output Directory', '输出目录'],
        ['Install Command', '安装命令'],
        ['Development Command', '开发命令'],
        
        // 团队和成员
        ['Team', '团队'],
        ['Teams', '团队'],
        ['Members', '成员'],
        ['Invite Member', '邀请成员'],
        ['Roles', '角色'],
        ['Owner', '所有者'],
        ['Member', '成员'],
        ['Billing', '账单'],
        ['Pending Invitations', '待处理邀请'],
        ['Remove Member', '移除成员'],
        ['Transfer Ownership', '转让所有权'],
        ['Leave Team', '离开团队'],
        
        // 状态和通知
        ['Success', '成功'],
        ['Error', '错误'],
        ['Warning', '警告'],
        ['Ready', '就绪'],
        ['Canceled', '已取消'],
        ['Queued', '排队中'],
        ['Notification', '通知'],
        ['Notifications', '通知'],
        ['Email Notifications', '邮件通知'],
        ['Enable', '启用'],
        ['Disable', '禁用'],
        
        // 按钮和操作
        ['Save', '保存'],
        ['Cancel', '取消'],
        ['Confirm', '确认'],
        ['Add', '添加'],
        ['Remove', '移除'],
        ['Create', '创建'],
        ['Edit', '编辑'],
        ['Update', '更新'],
        ['Continue', '继续'],
        ['Back', '返回'],
        ['Next', '下一步'],
        ['Previous', '上一步'],
        ['Submit', '提交'],
        ['Apply', '应用'],
        ['Copy', '复制'],
        ['Copied!', '已复制!'],
        ['Download', '下载'],
        ['Upload', '上传'],
        
        // 项目创建和导入
        ['New Project', '新项目'],
        ['Import Git Repository', '导入 Git 仓库'],
        ['Import', '导入'],
        ['Clone', '克隆'],
        ['Repository', '仓库'],
        ['Template', '模板'],
        ['Framework', '框架'],
        ['Templates', '模板'],
        ['Project Name', '项目名称'],
        ['Create New Project', '创建新项目'],
        ['Import Project', '导入项目'],
        ['Deploy Template', '部署模板'],
        ['Select Template', '选择模板'],
        
        // 通用词汇
        ['Loading', '加载中'],
        ['Documentation', '文档'],
        ['Learn More', '了解更多'],
        ['Configure', '配置'],
        ['Status', '状态'],
        ['Overview', '概览'],
        ['More Info', '更多信息'],
        ['Details', '详情'],
        ['Close', '关闭'],
        ['Open', '打开'],
        ['Show', '显示'],
        ['Hide', '隐藏'],
        ['Search', '搜索'],
        ['Filter', '筛选'],
        ['Sort', '排序'],
        ['Refresh', '刷新'],
        ['View', '查看'],
        ['Edit', '编辑'],
        ['Delete', '删除'],
        ['Manage', '管理'],
    ]);

    // 初始页面文本替换，增加延迟时间确保DOM完全加载
    setTimeout(() => {
        forceApplyAllTranslations();
    }, 800); // 延迟800ms，确保页面已经加载完成
    
    // 监听DOM变化后的全面翻译方法
    function forceApplyAllTranslations() {
        // 先对所有文本节点进行翻译
        replaceText(document.body);
        
        // 然后针对特定元素进行专项翻译
        handleSpecialElements();
        
        // 查找并处理所有按钮元素
        document.querySelectorAll('button, a.button, [role="button"]').forEach(btn => {
            if (!shouldIgnoreNode(btn)) {
                Array.from(btn.childNodes).forEach(node => {
                    if (node.nodeType === 3) { // 文本节点
                        translateTextNode(node);
                    }
                });
            }
        });
        
        // 处理所有的页面导航和标题元素
        document.querySelectorAll('nav, header, h1, h2, h3, .title, .header, .navigation').forEach(el => {
            if (!shouldIgnoreNode(el)) {
                Array.from(el.childNodes).forEach(node => {
                    if (node.nodeType === 3) { // 文本节点
                        translateTextNode(node);
                    }
                });
            }
        });
        
        // 处理特定的问题元素
        const problemElements = [
            'Visit with Toolbar',
            'Scan this QR code',
            'Get easy access',
            'Install Extension',
            'Get detailed performance metrics',
            'Function CPU',
            'vCPU',
            'Memory',
            'Standard Protection',
            'Skew Protection',
            'Disabled',
            'Enable',
            'Active Branches',
            'No Preview Deployments',
            'using our Git connections'
        ];
        
        // 遍历所有文本节点查找特定问题词组
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.nodeValue && node.nodeValue.trim()) {
                        if (problemElements.some(text => node.nodeValue.includes(text))) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            },
            false
        );
        
        let node;
        while(node = walker.nextNode()) {
            let text = node.nodeValue;
            let modified = false;
            
            problemElements.forEach(phrase => {
                if (text.includes(phrase) && i18n.has(phrase)) {
                    text = text.replace(new RegExp(escapeRegExp(phrase), 'g'), i18n.get(phrase));
                    modified = true;
                }
            });
            
            if (modified) {
                node.nodeValue = text;
            }
        }
        
        // 处理常见的复数形式问题（英文加s的情况）
        document.querySelectorAll('*').forEach(el => {
            if (el.childNodes && el.childNodes.length && !shouldIgnoreNode(el)) {
                Array.from(el.childNodes).forEach(node => {
                    if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) {
                        let text = node.nodeValue;
                        
                        // 处理常见英文复数形式
                        const pluralWords = ['Domains', 'Deployments', 'Branches', 'Requests', 'Logs'];
                        pluralWords.forEach(word => {
                            const singular = word.substring(0, word.length - 1);
                            if (text.includes(word) && i18n.has(singular)) {
                                text = text.replace(new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g'), i18n.get(singular));
                            }
                        });
                        
                        // 处理结尾有s的中文翻译
                        if (text.match(/[\u4e00-\u9fa5]+s\b/)) {
                            text = text.replace(/(\p{Script=Han}+)s\b/gu, '$1');
                        }
                        
                        if (text !== node.nodeValue) {
                            node.nodeValue = text;
                        }
                    }
                });
            }
        });
    }
    
    // 修改原有的处理函数调用forceApplyAllTranslations
    function processMutations(mutations) {
        // 使用防抖动技术
        clearTimeout(window.fullTranslationTimer);
        window.fullTranslationTimer = setTimeout(() => {
            let shouldFullTranslate = false;
            
            mutations.forEach(mutation => {
                // 检查是否有重要元素变化
                if (mutation.addedNodes.length > 0) {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.nodeType === 1 && 
                            (node.tagName === 'DIV' || node.tagName === 'SECTION' || 
                             node.classList && (node.classList.contains('panel') || 
                                              node.classList.contains('card') || 
                                              node.classList.contains('modal')))) {
                            shouldFullTranslate = true;
                            break;
                        }
                    }
                }
                
                // 处理字符变更
                if (mutation.type === 'characterData') {
                    if (mutation.target && mutation.target.nodeValue && mutation.target.nodeValue.trim() && 
                        !shouldIgnoreNode(mutation.target.parentNode)) {
                        translateTextNode(mutation.target);
                    }
                }
            });
            
            // 如果有重要元素变化，执行完整翻译
            if (shouldFullTranslate) {
                forceApplyAllTranslations();
            } else {
                // 否则仅处理新增节点和变化
                mutations.forEach(mutation => {
                    // 处理新增节点
                    mutation.addedNodes.forEach(addedNode => {
                        if (addedNode.nodeType === 1) { // 元素节点
                            replaceText(addedNode);
                        } else if (addedNode.nodeType === 3) { // 文本节点
                            if (addedNode.nodeValue && addedNode.nodeValue.trim()) {
                                translateTextNode(addedNode);
                            }
                        }
                    });
                    
                    // 处理属性变化
                    if (mutation.type === 'attributes') {
                        const target = mutation.target;
                        if (target && !shouldIgnoreNode(target)) {
                            if (['title', 'placeholder', 'aria-label'].includes(mutation.attributeName)) {
                                translateAttribute(target, mutation.attributeName);
                            }
                        }
                    }
                });
            }
        }, 100);
    }

    // 监听 DOM 变更
    const bodyObserver = new MutationObserver(mutations => {
        // 使用防抖动技术，减少重复翻译次数
        clearTimeout(window.translationTimer);
        window.translationTimer = setTimeout(() => {
            processMutations(mutations);
        }, 100);
    });

    // 开始监听页面变化
    bodyObserver.observe(document.body, { 
        childList: true, 
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['title', 'placeholder', 'aria-label']
    });

    // 是否应该忽略节点
    function shouldIgnoreNode(node) {
        if (!node || node.nodeType !== 1) return false;
        
        // 检查是否为应该忽略的元素类型
        if (ignoredSelectors.some(selector => node.matches && node.matches(selector))) {
            return true;
        }
        
        // 检查是否包含应该忽略的类名
        if (node.className && typeof node.className === 'string') {
            if (ignoredClasses.some(cls => node.className.includes(cls))) {
                return true;
            }
        }
        
        // 检查父元素
        let parent = node.parentNode;
        while (parent && parent !== document.body) {
            if (parent.nodeType === 1) {
                if (ignoredSelectors.some(selector => parent.matches && parent.matches(selector))) {
                    return true;
                }
                if (parent.className && typeof parent.className === 'string') {
                    if (ignoredClasses.some(cls => parent.className.includes(cls))) {
                        return true;
                    }
                }
            }
            parent = parent.parentNode;
        }
        
        return false;
    }

    // 翻译单个文本节点
    function translateTextNode(node) {
        if (!node || !node.nodeValue || !node.nodeValue.trim()) return;
        
        // 检查是否应该忽略该节点的父元素
        if (node.parentNode && shouldIgnoreNode(node.parentNode)) {
            return;
        }
        
        let text = node.nodeValue;
        let translated = false;
        
        // 首先尝试完整匹配长句子
        i18n.forEach((value, key) => {
            if (text.includes(key) && key.includes(' ') && key.length > 10) {
                text = text.replace(new RegExp(escapeRegExp(key), 'g'), value);
                translated = true;
            }
        });
        
        // 然后匹配短词和单词
        i18n.forEach((value, key) => {
            // 使用更精确的匹配方式，避免部分单词被错误替换
            // 检查是否是以空格分隔的词组，如果是则使用单词边界匹配，否则使用简单字符串匹配
            if (key.includes(' ') || !/^[a-zA-Z0-9]+$/.test(key)) {
                // 对于多词组和非纯英文数字词，使用字符串包含匹配
                if (text.includes(key)) {
                    text = text.replace(new RegExp(escapeRegExp(key), 'g'), value);
                    translated = true;
                }
            } else {
                // 对于单个英文单词，使用单词边界匹配
                const regex = new RegExp(`\\b${escapeRegExp(key)}\\b`, 'g');
                if (regex.test(text)) {
                    text = text.replace(regex, value);
                    translated = true;
                }
            }
        });
        
        if (translated) {
            node.nodeValue = text;
        }
    }

    // 辅助函数：转义正则表达式特殊字符
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // 翻译元素属性
    function translateAttribute(element, attrName) {
        if (!element || !element.hasAttribute(attrName)) return;
        
        const attrValue = element.getAttribute(attrName);
        if (!attrValue || !attrValue.trim()) return;
        
        let newValue = attrValue;
        let translated = false;
        
        // 首先匹配长句
        i18n.forEach((value, key) => {
            if (newValue.includes(key) && key.includes(' ') && key.length > 10) {
                newValue = newValue.replace(new RegExp(escapeRegExp(key), 'g'), value);
                translated = true;
            }
        });
        
        // 然后匹配短词
        i18n.forEach((value, key) => {
            if (key.includes(' ') || !/^[a-zA-Z0-9]+$/.test(key)) {
                // 对于多词组和非纯英文数字词，使用字符串包含匹配
                if (newValue.includes(key)) {
                    newValue = newValue.replace(new RegExp(escapeRegExp(key), 'g'), value);
                    translated = true;
                }
            } else {
                // 对于单个英文单词，使用单词边界匹配
                const regex = new RegExp(`\\b${escapeRegExp(key)}\\b`, 'g');
                if (regex.test(newValue)) {
                    newValue = newValue.replace(regex, value);
                    translated = true;
                }
            }
        });
        
        if (translated) {
            element.setAttribute(attrName, newValue);
        }
    }

    // 替换文本函数
    function replaceText(rootNode) {
        if (!rootNode || shouldIgnoreNode(rootNode)) return;
        
        // 处理所有文本节点
        const textWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // 过滤掉空文本节点
                    if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    // 过滤掉应该被忽略的元素内的文本
                    if (node.parentNode && shouldIgnoreNode(node.parentNode)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        
        let textNode;
        while (textNode = textWalker.nextNode()) {
            translateTextNode(textNode);
        }
        
        // 处理元素属性
        const elementWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function(node) {
                    if (shouldIgnoreNode(node)) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        
        let element;
        while (element = elementWalker.nextNode()) {
            // 翻译title属性
            if (element.hasAttribute('title')) {
                translateAttribute(element, 'title');
            }
            
            // 翻译placeholder属性
            if (element.hasAttribute('placeholder')) {
                translateAttribute(element, 'placeholder');
            }
            
            // 翻译aria-label属性
            if (element.hasAttribute('aria-label')) {
                translateAttribute(element, 'aria-label');
            }
            
            // 翻译按钮和输入框的value
            if ((element.tagName === 'INPUT' || element.tagName === 'BUTTON') && 
                element.hasAttribute('value') && 
                !element.getAttribute('type') === 'password') {
                translateAttribute(element, 'value');
            }
        }
    }

    // 添加更多 Vercel 特定的词汇翻译
    addVocabulary();

    // 添加更多词汇的函数
    function addVocabulary() {
        // 项目和仪表盘
        i18n.set('Projects', '项目');
        i18n.set('Project', '项目');
        i18n.set('Activity', '活动');
        i18n.set('Recent Activity', '最近活动');
        i18n.set('All Projects', '所有项目');
        i18n.set('No projects found', '未找到项目');
        i18n.set('Search projects...', '搜索项目...');
        i18n.set('Create a New Project', '创建新项目');
        i18n.set('Your Projects', '您的项目');
        i18n.set('Last updated', '最后更新');
        i18n.set('Last deployed', '最后部署');
        
        // 部署详情
        i18n.set('Deployment Details', '部署详情');
        i18n.set('Source', '源码');
        i18n.set('Branch', '分支');
        i18n.set('Commit', '提交');
        i18n.set('Runtime', '运行时');
        i18n.set('Build Logs', '构建日志');
        i18n.set('Function Logs', '函数日志');
        i18n.set('Edge Function Logs', '边缘函数日志');
        i18n.set('View Function Logs', '查看函数日志');
        i18n.set('View Edge Function Logs', '查看边缘函数日志');
        i18n.set('Runtime Logs', '运行时日志');
        i18n.set('View Runtime Logs', '查看运行时日志');
        i18n.set('API Endpoints', 'API端点');
        i18n.set('Serverless Functions', '无服务器函数');
        i18n.set('Edge Functions', '边缘函数');
        i18n.set('Edge Middleware', '边缘中间件');
        i18n.set('Cache', '缓存');
        
        // 环境变量
        i18n.set('Add Environment Variable', '添加环境变量');
        i18n.set('Name', '名称');
        i18n.set('Value', '值');
        i18n.set('Environments', '环境');
        i18n.set('Production Only', '仅生产环境');
        i18n.set('All Environments', '所有环境');
        i18n.set('Preview Only', '仅预览环境');
        i18n.set('Development Only', '仅开发环境');
        i18n.set('Environment Variable', '环境变量');
        i18n.set('Plain Text', '纯文本');
        i18n.set('Secret', '密钥');
        i18n.set('System Environment Variables', '系统环境变量');
        i18n.set('User Environment Variables', '用户环境变量');
        
        // 域名设置
        i18n.set('Add Domain', '添加域名');
        i18n.set('Domain Name', '域名名称');
        i18n.set('Primary Domain', '主域名');
        i18n.set('Set as Primary Domain', '设为主域名');
        i18n.set('Verify Domain', '验证域名');
        i18n.set('DNS Settings', 'DNS设置');
        i18n.set('Invalid Domain', '无效域名');
        i18n.set('Pending Verification', '等待验证');
        i18n.set('SSL Certificate', 'SSL证书');
        i18n.set('Auto-renewed', '自动续期');
        i18n.set('Custom Domains', '自定义域名');
        i18n.set('Generated Domains', '生成的域名');
        i18n.set('Domain Configuration', '域名配置');
        i18n.set('Redirect', '重定向');
        i18n.set('Redirects', '重定向');
        i18n.set('Rewrites', '重写');
        i18n.set('Headers', '标头');
        i18n.set('Add Redirect', '添加重定向');
        i18n.set('Add Rewrite', '添加重写');
        i18n.set('Add Header', '添加标头');
        i18n.set('Source Path', '源路径');
        i18n.set('Destination Path', '目标路径');
        i18n.set('Status Code', '状态码');
        
        // 计划和付费
        i18n.set('Hobby', '业余');
        i18n.set('Pro', '专业版');
        i18n.set('Enterprise', '企业版');
        i18n.set('Free', '免费');
        i18n.set('Usage Metrics', '使用指标');
        i18n.set('Bandwidth', '带宽');
        i18n.set('Build Minutes', '构建分钟');
        i18n.set('Upgrade Plan', '升级计划');
        i18n.set('Billing Period', '账单周期');
        i18n.set('Payment Method', '支付方式');
        i18n.set('Billing Email', '账单邮箱');
        i18n.set('Invoice', '发票');
        i18n.set('Invoices', '发票');
        i18n.set('Current Plan', '当前计划');
        i18n.set('Teams', '团队');
        i18n.set('Team Member', '团队成员');
        i18n.set('Concurrency', '并发');
        i18n.set('Execution Timeout', '执行超时');
        i18n.set('Included', '已包含');
        i18n.set('Analytics Retention', '分析数据保留');
        i18n.set('SFTP Access', 'SFTP访问');
        
        // 账户和安全
        i18n.set('Account', '账户');
        i18n.set('Account Settings', '账户设置');
        i18n.set('Profile', '个人资料');
        i18n.set('Username', '用户名');
        i18n.set('Email', '电子邮件');
        i18n.set('Password', '密码');
        i18n.set('Change Password', '修改密码');
        i18n.set('Current Password', '当前密码');
        i18n.set('New Password', '新密码');
        i18n.set('Confirm Password', '确认密码');
        i18n.set('Two-Factor Authentication', '双因素认证');
        i18n.set('Security', '安全');
        i18n.set('API Tokens', 'API令牌');
        i18n.set('Personal Account', '个人账户');
        i18n.set('Team Account', '团队账户');
        i18n.set('Create Token', '创建令牌');
        i18n.set('Token Name', '令牌名称');
        i18n.set('Token Permissions', '令牌权限');
        i18n.set('Read-only', '只读');
        i18n.set('Full Access', '完全访问');
        
        // 框架和技术术语
        i18n.set('Next.js', 'Next.js');
        i18n.set('React', 'React');
        i18n.set('Vue', 'Vue');
        i18n.set('Angular', 'Angular');
        i18n.set('Nuxt', 'Nuxt');
        i18n.set('Static Site', '静态站点');
        i18n.set('Node.js', 'Node.js');
        i18n.set('Gatsby', 'Gatsby');
        i18n.set('Svelte', 'Svelte');
        i18n.set('Astro', 'Astro');
        i18n.set('WordPress', 'WordPress');
        i18n.set('Hugo', 'Hugo');
        i18n.set('Ruby on Rails', 'Ruby on Rails');
        i18n.set('Python', 'Python');
        i18n.set('Docker', 'Docker');
        i18n.set('Static Site Generator', '静态站点生成器');
        i18n.set('Server-Side Rendering', '服务器端渲染');
        i18n.set('Static Generation', '静态生成');
        i18n.set('Incremental Static Regeneration', '增量静态再生');
        i18n.set('API Routes', 'API路由');
        i18n.set('Serverless', '无服务器');
        i18n.set('Monorepo', '单体仓库');
        
        // 其他常用
        i18n.set('Dark Mode', '暗色模式');
        i18n.set('Light Mode', '亮色模式');
        i18n.set('System', '跟随系统');
        i18n.set('Create Team', '创建团队');
        i18n.set('Switch Team', '切换团队');
        i18n.set('Connected Services', '关联服务');
        i18n.set('Get Started', '开始使用');
        i18n.set('Documentation', '文档');
        i18n.set('Support', '支持');
        i18n.set('Changelog', '更新日志');
        
        // Vercel特有的功能和概念
        i18n.set('Speed Insights', '速度洞察');
        i18n.set('Web Vitals', 'Web指标');
        i18n.set('Core Web Vitals', '核心Web指标');
        i18n.set('First Contentful Paint', '首次内容绘制');
        i18n.set('Largest Contentful Paint', '最大内容绘制');
        i18n.set('First Input Delay', '首次输入延迟');
        i18n.set('Cumulative Layout Shift', '累积布局偏移');
        i18n.set('Time to First Byte', '首字节时间');
        i18n.set('Interaction to Next Paint', '交互到下一次绘制');
        i18n.set('Analytics', '分析');
        i18n.set('Real User Monitoring', '真实用户监控');
        i18n.set('Device', '设备');
        i18n.set('Mobile', '移动设备');
        i18n.set('Desktop', '桌面设备');
        i18n.set('Browser', '浏览器');
        i18n.set('Country', '国家');
        i18n.set('Region', '地区');
        i18n.set('Edge Network', '边缘网络');
        i18n.set('CDN', 'CDN');
        i18n.set('Caching', '缓存');
        i18n.set('Hosting', '托管');
        i18n.set('Logs', '日志');
        
        // 更多专业术语
        i18n.set('Continuous Integration', '持续集成');
        i18n.set('Continuous Deployment', '持续部署');
        i18n.set('CI/CD', 'CI/CD');
        i18n.set('Infrastructure', '基础设施');
        i18n.set('Configuration', '配置');
        i18n.set('Monitoring', '监控');
        i18n.set('Logging', '日志记录');
        i18n.set('Performance', '性能');
        i18n.set('Security', '安全');
        i18n.set('Scaling', '扩展');
        i18n.set('Autoscaling', '自动扩展');
        i18n.set('Load Balancing', '负载均衡');
        i18n.set('High Availability', '高可用性');
        i18n.set('Disaster Recovery', '灾难恢复');
        i18n.set('Backup', '备份');
        i18n.set('Restore', '恢复');
        i18n.set('Migration', '迁移');
        i18n.set('Rollback', '回滚');
        i18n.set('Versioning', '版本控制');
        i18n.set('Changelog', '更新日志');
        
        // 词条
        i18n.set('Deployment Configuration', '部署配置');
        i18n.set('Fluid Compute', '流畅计算');
        i18n.set('Deployment Protection', '部署保护');
        i18n.set('Slow Protection', '慢保护');
        i18n.set('To update your Production Deployment, push to the', '要更新您的生产部署，请推送到');
        i18n.set('branch.', '分支。');
        i18n.set('Track visitors and page views', '跟踪访问者和页面浏览量');
        i18n.set('Edge Requests', '边缘请求');
        i18n.set('Function Invocations', '函数调用');
        i18n.set('错误 Rate', '错误率');
        i18n.set('Error Rate', '错误率');
        i18n.set('requests','请求')
        i18n.set('denied', '被拒绝');
        i18n.set('challenged', '被质询');
        i18n.set('Firewall', '防火墙');
        i18n.set('Active Branches', '活跃分支');
        i18n.set('No Preview Deployments', '没有预览部署');
        i18n.set('No 预览部署', '没有预览部署');
        i18n.set('Commit using our Git connections.', '使用我们的Git连接提交。');
        i18n.set('All systems normal', '所有系统正常');
        i18n.set('Instant Rollback', '即时回滚');
        i18n.set('Observability', '可观测性');
        i18n.set('Storage', '存储');
        i18n.set('hours', '小时');
        i18n.set('minutes', '分钟');
        i18n.set('seconds', '秒');
        i18n.set('days', '天');
        i18n.set('weeks', '周');
        i18n.set('months', '月');
        i18n.set('years', '年');
        i18n.set('排序 由 activity', '按活动排序');
        i18n.set('排序 由 name', '按名称排序');
        i18n.set('搜索 Repositories and 项目...', '搜索存储库和项目...');
        i18n.set('Find Team...', '搜索团队...');
        i18n.set('Find Project...', '搜索项目...');
        i18n.set('Recent Previews', '近期预览');
        i18n.set('What do you need?', '您需要什么？');
        i18n.set('Upgrade to 专业版', '升级到专业版');
        i18n.set('Theme', '主题');
        i18n.set('Command Menu', '命令菜单');
        i18n.set('首页 Page', '主页');
        i18n.set('创建 new 团队', '创建新团队');
        i18n.set('Change Theme...', '更改主题...');
        i18n.set('复制 Current URL', '复制当前URL');
        i18n.set('Navigation', '导航');
        i18n.set('Go to', '前往');
        i18n.set('Quick 复制', '快速复制');
        i18n.set('Scope 设置...', '范围设置...');
        i18n.set('Switch Scope...', '切换范围...');
        i18n.set('搜索 文档...', '搜索文档...');
        i18n.set('联系我们 支持', '联系支持');
        i18n.set('Send 反馈...', '发送反馈...');
        i18n.set('Developer Tools', '开发者工具');
        i18n.set('搜索 开发者工具', '搜索开发者工具');


        // 精确匹配长句
        i18n.set('Firewall is active', '防火墙已激活');
        i18n.set('Track visitors and page views', '跟踪访问者和页面浏览量');
        i18n.set('应用', '应用');
        
        // 更多导航和项目设置
        i18n.set('Repository', '代码仓库');
        i18n.set('Usage', '使用量');
        i18n.set('Visit', '访问');
        i18n.set('Hobby', '业余版');
        i18n.set('deployment', '部署');
        
        // 补充一些特定于页面的术语
        i18n.set('ago', '前');
        i18n.set('by', '由');
        i18n.set('Ready', '就绪');
        i18n.set('Home', '首页');
        i18n.set('Contact', '联系我们');
        i18n.set('Legal', '法律条款');
        i18n.set('Guides', '指南');
        i18n.set('hidden files', '隐藏文件');

        // 补充截图中未翻译的内容
        i18n.set('Visit with Toolbar', '使用工具栏访问');
        i18n.set('Scan this QR code to open with the toolbar on a different device:', '扫描此二维码在其他设备上使用工具栏打开：');
        i18n.set('Get easy access to the toolbar on your production deployments:', '在您的生产部署中轻松访问工具栏：');
        i18n.set('Install Extension', '安装扩展');
        i18n.set('Get detailed performance metrics', '获取详细性能指标');
        i18n.set('enabling Speed Insights', '启用速度洞察');
        i18n.set('Function CPU', '函数CPU');
        i18n.set('Basic', '基础版');
        i18n.set('vCPU', '虚拟CPU');
        i18n.set('GB Memory', 'GB内存');
        i18n.set('Standard Protection', '标准保护');
        i18n.set('Skew Protection', '偏差保护');
        i18n.set('Disabled', '已禁用');
        i18n.set('Enable', '启用');
        i18n.set('Repository', '代码仓库');
        i18n.set('更新日志', '更新日志');
        i18n.set('帮助', '帮助');
        i18n.set('Docs', '文档');
        i18n.set('Store', '存储');
        i18n.set('Domain', '域名');

    }
    
    // 添加一个调试按钮，用于手动触发翻译（对调试很有用）
    function addDebugButton() {
        const debugBtn = document.createElement('button');
        debugBtn.textContent = '手动翻译';
        debugBtn.style.position = 'fixed';
        debugBtn.style.bottom = '20px';
        debugBtn.style.right = '20px';
        debugBtn.style.zIndex = '10000';
        debugBtn.style.padding = '5px 10px';
        debugBtn.style.background = '#000';
        debugBtn.style.color = '#fff';
        debugBtn.style.border = 'none';
        debugBtn.style.borderRadius = '4px';
        debugBtn.style.cursor = 'pointer';
        debugBtn.style.opacity = '0.7';
        debugBtn.style.transition = 'opacity 0.3s';
        
        debugBtn.addEventListener('mouseover', () => {
            debugBtn.style.opacity = '1';
        });
        
        debugBtn.addEventListener('mouseout', () => {
            debugBtn.style.opacity = '0.7';
        });
        
        debugBtn.addEventListener('click', () => {
            replaceText(document.body);
            alert('手动翻译已触发');
        });
        
        document.body.appendChild(debugBtn);
    }
    
    // 开发环境下可以启用调试按钮
    // if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    //     addDebugButton();
    // }

    // 处理特殊元素，如按钮、标题等
    function handleSpecialElements() {
        // 处理页面顶部导航按钮
        document.querySelectorAll('header button, header a, nav button, nav a').forEach(el => {
            if (el.textContent && el.textContent.trim() && !shouldIgnoreNode(el)) {
                translateTextNode(el.firstChild);
            }
        });
        
        // 处理页面上的按钮
        document.querySelectorAll('button, .geist-button').forEach(btn => {
            if (!shouldIgnoreNode(btn) && btn.textContent && btn.textContent.trim()) {
                // 如果按钮包含多个子元素，尝试分别翻译
                if (btn.childNodes.length > 1) {
                    btn.childNodes.forEach(node => {
                        if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) {
                            translateTextNode(node);
                        }
                    });
                } else if (btn.firstChild && btn.firstChild.nodeType === 3) {
                    translateTextNode(btn.firstChild);
                }
            }
        });
        
        // 处理标题和特定UI元素
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, .card-title, .panel-title, .section-title').forEach(el => {
            if (!shouldIgnoreNode(el) && el.textContent && el.textContent.trim()) {
                // 标题可能包含多个文本节点和子元素，分别处理
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) {
                        translateTextNode(node);
                    }
                });
            }
        });
        
        // 处理特定的数字单位，如"1K requests"等
        document.querySelectorAll('span, div, p').forEach(el => {
            if (!shouldIgnoreNode(el) && el.textContent && /\d+K\s+\w+/.test(el.textContent)) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3 && node.nodeValue && /\d+K\s+\w+/.test(node.nodeValue)) {
                        // 特殊处理带有数字单位的文本
                        let text = node.nodeValue;
                        text = text.replace(/(\d+)K\s+(requests\s+\w+)/gi, function(match, num, type) {
                            const translatedType = i18n.has(type) ? i18n.get(type) : type;
                            return num + '千' + translatedType;
                        });
                        node.nodeValue = text;
                    }
                });
            }
        });
    }
    
    // 设置特殊元素的观察器
    function setupSpecialObservers() {
        // 观察页面上的主要容器区域，某些区域可能使用了AJAX加载
        const mainContainers = document.querySelectorAll('main, [role="main"], .main-content, .dashboard, .project-view');
        
        mainContainers.forEach(container => {
            const containerObserver = new MutationObserver(mutations => {
                // 使用防抖动技术，减少重复翻译次数
                clearTimeout(window.specialTranslationTimer);
                window.specialTranslationTimer = setTimeout(() => {
                    handleSpecialElements();
                }, 200);
            });
            
            containerObserver.observe(container, { 
                childList: true, 
                subtree: true
            });
        });
        
        // 专门监听对话框和弹出窗口
        document.addEventListener('click', function(e) {
            // 点击后延迟处理，因为可能会触发对话框或弹出菜单
            setTimeout(() => {
                document.querySelectorAll('dialog, [role="dialog"], .modal, .dropdown-menu, .popover, .tooltip').forEach(dialog => {
                    if (dialog.style.display !== 'none' && dialog.textContent.trim()) {
                        replaceText(dialog);
                    }
                });
            }, 300);
        }, false);
    }
    
    // 在页面加载完成后执行一次全面翻译
    window.addEventListener('load', function() {
        setTimeout(() => {
            forceApplyAllTranslations();
        }, 1000);
    });

    // 对页面中的某些特定元素添加点击事件，进行额外翻译
    document.addEventListener('click', function(e) {
        setTimeout(() => {
            // 检查是否点击了可能触发内容变化的元素
            if (e.target && (
                e.target.tagName === 'BUTTON' || 
                e.target.tagName === 'A' || 
                e.target.closest('button') || 
                e.target.closest('a') ||
                e.target.getAttribute('role') === 'tab' ||
                e.target.getAttribute('role') === 'button')
            ) {
                setTimeout(forceApplyAllTranslations, 300);
            }
        }, 200);
    }, true);
})();
