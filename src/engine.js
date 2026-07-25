// =========================================================
// engine.js — 主引擎入口
// =========================================================
import CONFIG from './config.js';
import State from './state.js';
import { safe } from './utils.js';
import { detectPageType, buildPageConfig } from './page-detector.js';
import { traverseNode } from './dom-walker.js';
import { setupMutationObserver } from './mutation-handler.js';
import { setupReactCompat } from './react-compat.js';
import { transTitle } from './translator.js';
import MissedTermsManager from './missed-terms.js';

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
export function updatePageConfig(trigger) {
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
export function setupUrlChangeListener() {
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
