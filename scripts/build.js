// =========================================================
// build.js — 构建脚本
//   npm run build       → 生成 dist/ 下所有文件
//   输出：
//     1. vercel-chinese.user.js  — 合并版本（GreasyFork 一键安装）
//     2. locals.js               — 独立词典文件（gh-pages 托管）
//     3. main.user.js            — 纯引擎脚本（@require 加载词典）
// =========================================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildEngineCode } from './engine-builder.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const VERSION = '1.0.0';

// UserScript 元数据
const MERGED_HEADER = `// ==UserScript==
// @name         Vercel 汉化
// @namespace    https://github.com/liyixin21/vercel-chinese
// @description  汉化 Vercel 网站界面，集成词典的单文件版本。
// @version      ${VERSION}
// @author       liyixin21
// @license      GPL-3.0
// @icon         https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png
// @match        *://vercel.com/*
// @match        *://*.vercel.com/*
// @match        *://*.vercel.app/*
// @run-at       document-start
// @grant        none
// ==/UserScript==`;

/**
 * 读取词典代码（带缩进）
 */
function buildLocaleCode() {
    const localePath = path.join(ROOT, 'locals.js');
    if (!fs.existsSync(localePath)) {
        console.warn('⚠️ 未找到 locals.js，跳过词典');
        return '';
    }
    const code = fs.readFileSync(localePath, 'utf-8').trim();
    return '  ' + code.split('\n').join('\n  ');
}

/**
 * 构建文件
 */
function build() {
    if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

    const engineCode = buildEngineCode(ROOT);
    const localeCode = buildLocaleCode();

    // ========== 1. 合并版本（GreasyFork） ==========
    const iifeBody = `  ${localeCode}\n\n  // =========================================================\n  // 翻译引擎\n  // =========================================================\n${engineCode}`;
    const mergedScript = `${MERGED_HEADER}\n\n(function() {\n    'use strict';\n\n${iifeBody}\n\n})();\n`;

    const mergedPath = path.join(DIST, 'vercel-chinese.user.js');
    fs.writeFileSync(mergedPath, mergedScript, 'utf-8');
    const mergedSize = fs.statSync(mergedPath).size;
    console.log(`✅ 合并版本: dist/vercel-chinese.user.js  (${(mergedSize / 1024).toFixed(1)} KB)`);

    // ========== 2. 独立词典（gh-pages） ==========
    const localsPath = path.join(DIST, 'locals.js');
    fs.copyFileSync(path.join(ROOT, 'locals.js'), localsPath);
    const localsSize = fs.statSync(localsPath).size;
    console.log(`✅ 独立词典: dist/locals.js  (${(localsSize / 1024).toFixed(1)} KB)`);

    // ========== 3. 引擎版本（@require） ==========
    const mainTemplate = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf-8');
    const mainScript = mainTemplate.replace(
        '    // ---BUILD_PLACEHOLDER---',
        engineCode
    );

    const mainPath = path.join(DIST, 'main.user.js');
    fs.writeFileSync(mainPath, mainScript, 'utf-8');
    const mainSize = fs.statSync(mainPath).size;
    console.log(`✅ 引擎版本: dist/main.user.js  (${(mainSize / 1024).toFixed(1)} KB)`);

    // 汇总
    console.log(`\n📦 构建完成！`);
    console.log(`   GreasyFork 用: dist/vercel-chinese.user.js`);
    console.log(`   gh-pages 词典: dist/locals.js`);
    console.log(`   gh-pages 引擎: dist/main.user.js`);
    console.log(`   引擎模块数: 10`);
    console.log(`   版本: ${VERSION}`);
}

build();
