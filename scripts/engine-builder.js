// =========================================================
// engine-builder.js — 引擎构建工具（build.js 和 dev.js 共用）
// =========================================================
import fs from 'fs';
import path from 'path';

/**
 * 读取源文件并移除 import/export 语句
 */
export function readModule(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let result = content
        .replace(/^import\s+.*?;\s*$/gm, '')
        .replace(/^export\s+(const|function|class)\s+/gm, '$1 ');
    // 移除 export default 后面跟空格或换行的情况
    result = result.replace(/^export\s+default\s+(?=[\w\[{])/gm, '');
    return result.trim();
}

/**
 * 读取合并后的引擎代码
 * @param {string} rootDir - 项目根目录
 * @returns {string} 合并后的纯引擎代码（无缩进，无 IIFE 包裹）
 */
export function buildEngineCode(rootDir) {
    const srcDir = path.join(rootDir, 'src');
    const modules = [
        'config.js',
        'state.js',
        'utils.js',
        'missed-terms.js',
        'translator.js',
        'page-detector.js',
        'dom-walker.js',
        'mutation-handler.js',
        'react-compat.js',
        'engine.js',
    ];

    let engine = '';
    for (const mod of modules) {
        const filePath = path.join(srcDir, mod);
        if (fs.existsSync(filePath)) {
            engine += '\n  // --- ' + mod + ' ---\n';
            engine += readModule(filePath).split('\n').map(l => '  ' + l).join('\n') + '\n';
        }
    }
    return engine.trim();
}
