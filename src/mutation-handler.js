// =========================================================
// mutation-handler.js — MutationObserver 处理
// =========================================================
import CONFIG from './config.js';
import State from './state.js';
import { safe } from './utils.js';
import { traverseNode } from './dom-walker.js';
import { updatePageConfig } from './engine.js';

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
export function processMutations(mutations) {
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
export function setupMutationObserver() {
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
