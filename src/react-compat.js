// =========================================================
// react-compat.js — React 组件翻译兼容层
// =========================================================
import { safe } from './utils.js';
import { transText, transElementText } from './translator.js';

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

export function setupReactCompat() {
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
