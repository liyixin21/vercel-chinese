// =========================================================
// state.js — 运行时状态管理器
// =========================================================
const State = {
    // 功能开关
    featureSet: {
        enable_RegExp: true,
        enable_transDesc: true,
        enable_missedTerms: false,
    },

    // 运行时状态
    pageConfig: null,
    currentURL: window.location.href,
    mutationObserver: null,
    initDone: false,
};

export default State;
