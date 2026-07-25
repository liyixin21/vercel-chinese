// =========================================================
// translator.test.js — 翻译引擎核心逻辑测试
// =========================================================
import assert from 'node:assert/strict';
import test from 'node:test';

// 设置全局 I18N（模拟词库加载）
global.I18N = {
    conf: {
        characterDataPage: [],
        ignoreMutationSelectorPage: { '*': ['code', 'pre', 'svg'] },
        ignoreSelectorPage: { '*': ['SCRIPT', 'STYLE'] },
    },
    'zh-CN': {
        title: {
            static: { 'Login – Vercel': '登录 – Vercel' },
            regexp: [],
        },
        public: {
            static: {
                'Dashboard': '仪表盘',
                'Settings': '设置',
                'Deploy': '部署',
                'Skip to content': '跳转到内容',
                'Get started': '开始使用',
                'Projects': '项目',
                'Domains': '域名',
            },
            regexp: [
                [/^Created\s+(.+)\s+ago$/, '创建于 $1 前'],
                [/^([\d.]+)\s*per month$/, '$1 / 月'],
            ],
            selector: [],
        },
        general: {
            static: {},
            regexp: [],
            selector: [],
        },
    },
};

// 模拟浏览器环境
global.window = {
    location: {
        href: 'https://vercel.com/dashboard',
        hostname: 'vercel.com',
        pathname: '/dashboard',
    },
};
global.document = {
    body: { classList: { contains: () => false } },
    head: { querySelector: () => null },
    querySelector: () => null,
    addEventListener: () => {},
    removeEventListener: () => {},
};

// 加载模块并初始化 State
const { buildPageConfig } = await import('../src/page-detector.js');

test('翻译模块：静态词典匹配', async () => {
    const { transText } = await import('../src/translator.js');
    const State = (await import('../src/state.js')).default;

    // 初始化 State.pageConfig
    State.pageConfig = buildPageConfig('general');

    assert.equal(transText('Dashboard'), '仪表盘');
    assert.equal(transText('Settings'), '设置');
    assert.equal(transText('Deploy'), '部署');
    assert.equal(transText('Get started'), '开始使用');
});

test('翻译模块：未命中返回 null', async () => {
    const { transText } = await import('../src/translator.js');
    const State = (await import('../src/state.js')).default;
    State.pageConfig = buildPageConfig('general');

    assert.equal(transText('NonExistentTermXYZ'), null);
});

test('翻译模块：正则匹配 - 时间格式', async () => {
    const { transText } = await import('../src/translator.js');
    const State = (await import('../src/state.js')).default;
    State.pageConfig = buildPageConfig('general');

    assert.equal(transText('Created 2 days ago'), '创建于 2 days 前');
});

test('翻译模块：正则匹配 - 价格格式', async () => {
    const { transText } = await import('../src/translator.js');
    const State = (await import('../src/state.js')).default;
    State.pageConfig = buildPageConfig('general');

    assert.equal(transText('20 per month'), '20 / 月');
});

test('翻译模块：应跳过纯中文文本', async () => {
    const { transText } = await import('../src/translator.js');
    const State = (await import('../src/state.js')).default;
    State.pageConfig = buildPageConfig('general');

    assert.equal(transText('仪表盘'), null);
});

test('翻译模块：应跳过纯数字文本', async () => {
    const { transText } = await import('../src/translator.js');
    const State = (await import('../src/state.js')).default;
    State.pageConfig = buildPageConfig('general');

    assert.equal(transText('12345'), null);
});

test('翻译模块：应跳过不含英文字母的文本', async () => {
    const { transText } = await import('../src/translator.js');
    const State = (await import('../src/state.js')).default;
    State.pageConfig = buildPageConfig('general');

    assert.equal(transText('!@#$%'), null);
});

test('词库：公共词典中所有词条的键值都应不同', () => {
    const publicStatic = I18N['zh-CN'].public.static;
    const issues = [];

    for (const [key, value] of Object.entries(publicStatic)) {
        if (typeof value === 'string' && key === value && key.length > 5) {
            issues.push({ key, value });
        }
    }

    assert.equal(issues.length, 0,
        `发现 ${issues.length} 个翻译前后相同的条目: ${JSON.stringify(issues.slice(0, 5))}`);
});

test('词库：公共词典包含所有关键通用词条', () => {
    const publicStatic = I18N['zh-CN'].public.static;
    const keys = Object.keys(publicStatic);

    const requiredTerms = [
        'Dashboard', 'Settings', 'Projects', 'Domains',
        'Deploy', 'Get started',
    ];
    for (const term of requiredTerms) {
        assert.ok(keys.includes(term), `公共词典缺少: ${term}`);
    }
});

test('词库：正则规则数组格式正确', () => {
    const regexpRules = I18N['zh-CN'].public.regexp;
    assert.ok(Array.isArray(regexpRules), 'regexp 应为数组');
    for (const rule of regexpRules) {
        assert.ok(Array.isArray(rule) && rule.length === 2,
            `每个正则规则应为 [pattern, replacement] 数组: ${JSON.stringify(rule)}`);
        assert.ok(rule[0] instanceof RegExp || typeof rule[0] === 'object',
            `规则第一项应为正则表达式: ${typeof rule[0]}`);
        assert.equal(typeof rule[1], 'string',
            `规则第二项应为字符串: ${typeof rule[1]}`);
    }
});

test('buildPageConfig 合并公共和页面专有词典', () => {
    const config = buildPageConfig('general');
    // 应包含公共词典的所有键
    assert.ok(config.staticDict['Dashboard'] === '仪表盘');
    assert.ok(config.staticDict['Skip to content'] === '跳转到内容');
    // 应包含正则规则
    assert.ok(config.regexpRules.length > 0);
});

test('buildPageConfig 设置正确的 currentPath', () => {
    const config = buildPageConfig('general');
    assert.equal(config.currentPath, '/dashboard');
    assert.equal(config.currentPageType, 'general');
});
