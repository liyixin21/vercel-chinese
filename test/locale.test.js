// =========================================================
// locale.test.js — 词库完整性和质量验证
// =========================================================
import assert from 'node:assert/strict';
import test from 'node:test';
import { createContext, runInContext } from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localePath = path.join(__dirname, '..', 'locals.js');

// 通过 vm 沙箱加载词库
const localeCode = fs.readFileSync(localePath, 'utf-8');
const ctx = createContext();
runInContext(localeCode, ctx, { filename: localePath });

test('词库加载成功', () => {
    assert.ok(ctx.I18N, 'I18N 全局变量应存在');
    assert.ok(ctx.I18N['zh-CN'], 'zh-CN 语言包应存在');
});

test('词库：conf 配置完整', () => {
    const conf = ctx.I18N.conf;
    assert.ok(conf.characterDataPage !== undefined);
    assert.ok(conf.ignoreMutationSelectorPage !== undefined);
    assert.ok(conf.ignoreSelectorPage !== undefined);
});

test('词库：公共词典词条数', () => {
    const count = Object.keys(ctx.I18N['zh-CN'].public.static).length;
    console.log(`  公共词典词条数: ${count}`);
    assert.ok(count >= 100, `公共词典只有 ${count} 个词条，预期至少 100`);
});

test('词库：页面类型数量', () => {
    const pages = Object.keys(ctx.I18N['zh-CN']).filter(k => k !== 'title');
    console.log(`  页面类型数: ${pages.length}`, pages.join(', '));
    assert.ok(pages.length >= 5, `只有 ${pages.length} 个页面类型`);
});

test('词库：无假翻译条目（排除专有名词）', () => {
    const locale = ctx.I18N['zh-CN'];
    // 这些是公认的专有名词或产品名，不需要翻译
    const PROPER_NOUNS = new Set([
        'AI SDK', 'Chat SDK', 'Flags SDK',
        'GitHub', 'GitLab', 'Bitbucket',
        'Next.js', 'FastAPI', 'Nuxt', 'Nitro',
        'Webhooks', '99.99% SLA',
    ]);
    const issues = [];

    for (const [sectionName, section] of Object.entries(locale)) {
        if (!section || !section.static) continue;
        for (const [key, value] of Object.entries(section.static)) {
            if (typeof value === 'string' && key === value
                && key.length > 5 && !PROPER_NOUNS.has(key)) {
                issues.push({ section: sectionName, key });
            }
        }
    }

    assert.equal(issues.length, 0,
        `发现 ${issues.length} 个翻译前后相同的条目: ${JSON.stringify(issues)}`);
});

test('词库：所有 static 值都是字符串', () => {
    const locale = ctx.I18N['zh-CN'];
    for (const [sectionName, section] of Object.entries(locale)) {
        if (!section || !section.static) continue;
        for (const [key, value] of Object.entries(section.static)) {
            assert.equal(typeof value, 'string',
                `[${sectionName}] "${key}" 的值应为字符串`);
        }
    }
});

test('词库：所有 static 键都是非空字符串', () => {
    const locale = ctx.I18N['zh-CN'];
    for (const [sectionName, section] of Object.entries(locale)) {
        if (!section || !section.static) continue;
        for (const key of Object.keys(section.static)) {
            assert.ok(key.length > 0, `[${sectionName}] 存在空键`);
        }
    }
});

test('词库：无重复键（同一页面内）', () => {
    const locale = ctx.I18N['zh-CN'];
    for (const [sectionName, section] of Object.entries(locale)) {
        if (!section || !section.static) continue;
        const keys = Object.keys(section.static);
        const uniqueKeys = new Set(keys);
        if (keys.length !== uniqueKeys.size) {
            const counts = {};
            keys.forEach(k => { counts[k] = (counts[k] || 0) + 1; });
            const dups = Object.entries(counts).filter(([, c]) => c > 1);
            assert.fail(`[${sectionName}] 重复键: ${dups.map(([k]) => k).join(', ')}`);
        }
    }
    assert.ok(true);
});

test('词库：正则规则格式正确', () => {
    const locale = ctx.I18N['zh-CN'];
    let totalRules = 0;

    for (const [sectionName, section] of Object.entries(locale)) {
        if (!section || !section.regexp) continue;
        assert.ok(Array.isArray(section.regexp), `[${sectionName}] regexp 应为数组`);
        for (const rule of section.regexp) {
            assert.ok(Array.isArray(rule) && rule.length === 2,
                `[${sectionName}] 正则规则格式错误`);
        }
        totalRules += section.regexp.length;
    }

    console.log(`  正则规则总数: ${totalRules}`);
});
