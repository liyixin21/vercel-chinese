// =========================================================
// config.js — 全局配置常量
// =========================================================
const CONFIG = {
    LANG: 'zh-CN',
    DEV: false,

    // 站点域名 -> 类型映射
    PAGE_MAP: {
        'vercel.com': 'vercel',
        'vercel.app': 'vercel',
    },

    // 描述元素选择器（用于远程翻译功能）
    DESC_SELECTORS: {},

    // MutationObserver 配置
    OBSERVER_CONFIG: {
        childList: true,
        subtree: true,
        characterData: true,
        attributeFilter: ['value', 'placeholder', 'aria-label', 'title', 'alt'],
    },

    // 需要翻译的属性名
    TRANSLATABLE_ATTRS: ['placeholder', 'title', 'aria-label', 'alt', 'value'],

    // 文本节点跳过规则（纯数字、纯空白等不翻译）
    SKIP_TEXT_REGEX: /^[\s\d.,:;!?()\[\]{}<>#$%^&*+=|\\~`@_-]*$/,
};

export default CONFIG;
