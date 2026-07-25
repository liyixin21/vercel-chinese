// =========================================================
// utils.js — 工具函数
// =========================================================

/**
 * 错误边界包装器 — 捕获异常避免阻断页面正常使用
 * @param {Function} fn - 要执行的函数
 * @param {string} label - 错误标签
 * @returns {Function} 包装后的函数
 */
export function safe(fn, label) {
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
export class LRUCache {
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
export function normalizeText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

/**
 * 安全获取嵌套对象属性，支持路径如 'a.b[0].c'
 */
export function getNestedProperty(obj, path) {
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
