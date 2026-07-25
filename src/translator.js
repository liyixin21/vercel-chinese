// =========================================================
// translator.js
// =========================================================
import { normalizeText, LRUCache } from './utils.js';
import State from './state.js';
import MissedTermsManager from './missed-terms.js';

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

export function transText(text) {
    if (shouldSkipText(text)) return null;
    const t = text.trim();
    const r = fetchTransResult(t);
    return r && r !== t ? text.replace(t, r) : null;
}

export function transTitle() {
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
export function transElementAttrs(element, attrs) {
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

export function transTextNode(node) {
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

export function transElementText(element) {
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
