// =========================================================
// dom-walker.js — DOM 遍历与节点处理
// =========================================================
import CONFIG from './config.js';
import State from './state.js';
import { safe } from './utils.js';
import { transTextNode, transElementAttrs, transElementText, transTitle } from './translator.js';

/**
 * 遍历节点树并执行翻译
 * @param {Node} rootNode - 根节点
 */
export function traverseNode(rootNode) {
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
