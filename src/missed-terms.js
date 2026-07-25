// =========================================================
// missed-terms.js — 未命中词条管理器
// =========================================================

/**
 * 未命中词条管理器
 * 数据结构：{ [pathname]: { "原始文本": "" } }
 */
const MissedTermsManager = {
    data: (() => {
        try {
            return JSON.parse(localStorage.getItem('vercelChinese_missedTerms') || '{}');
        } catch {
            return {};
        }
    })(),

    record(text, path) {
        if (!path || !text) return false;
        if (!this.data[path]) this.data[path] = {};
        if (!(text in this.data[path])) {
            this.data[path][text] = '';
            this._save();
            return true;
        }
        return false;
    },

    cleanup(text, path) {
        if (!path || !this.data[path]) return false;
        if (text in this.data[path]) {
            delete this.data[path][text];
            if (Object.keys(this.data[path]).length === 0) {
                delete this.data[path];
            }
            this._save();
            return true;
        }
        return false;
    },

    getAll() { return this.data; },

    getStats() {
        const paths = Object.keys(this.data);
        const totalTerms = paths.reduce((sum, p) => sum + Object.keys(this.data[p]).length, 0);
        return { totalPaths: paths.length, totalTerms };
    },

    clearAll() {
        this.data = {};
        this._save();
    },

    exportData() {
        return {
            exportedAt: new Date().toISOString(),
            version: '1.0',
            stats: this.getStats(),
            data: this.data,
        };
    },

    _save() {
        try {
            localStorage.setItem('vercelChinese_missedTerms', JSON.stringify(this.data));
        } catch {
            console.warn('[Vercel 汉化] 存储空间不足，未能保存未命中词条');
        }
    },
};

export default MissedTermsManager;
