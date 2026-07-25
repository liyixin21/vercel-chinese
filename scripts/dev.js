// =========================================================
// dev.js — 本地开发与测试服务
//   npm run dev
//   启动本地服务器 + 生成测试版脚本 + 打开安装指引
// =========================================================
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { buildEngineCode } from './engine-builder.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 3000;

// dev 模式下始终重新构建（确保词典和引擎都是最新的）
console.log('🔨 正在构建最新版本...\n');
execSync('node scripts/build.js', { cwd: ROOT, stdio: 'inherit' });

// 生成本地测试版 main.user.js（@require 指向 localhost + 注入引擎代码）
function buildLocalDevUserScript() {
    const template = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf-8');
    const engineCode = buildEngineCode(ROOT);
    const localVersion = template
        .replace(
            /\/\/ @require\s+https.*/,
            `// @require      http://localhost:${PORT}/locals.js`
        )
        .replace(
            '    // ---BUILD_PLACEHOLDER---',
            engineCode
        );

    const localPath = path.join(DIST, 'vercel-chinese.dev.user.js');
    fs.writeFileSync(localPath, localVersion, 'utf-8');
    return localPath;
}

// MIME 类型映射
const MIME = {
    '.js': 'application/javascript; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
};

// 启动 HTTP 服务器
http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = path.join(DIST, url.pathname === '/' ? 'index.html' : url.pathname.slice(1));

    // 首页 — 安装指引
    if (url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(getInstallGuide());
    }

    // 词典文件始终从源码根目录提供（修改后立即生效）
    if (url.pathname === '/locals.js') {
        const srcPath = path.join(ROOT, 'locals.js');
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        return res.end(fs.readFileSync(srcPath));
    }

    // 静态文件
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        return res.end(fs.readFileSync(filePath));
    }

    res.writeHead(404);
    res.end('404 Not Found');
}).listen(PORT, () => {
    const testPath = buildLocalDevUserScript();
    console.log('════════════════════════════════════════════════');
    console.log('  🔧 Vercel 汉化 — 本地开发服务器');
    console.log('════════════════════════════════════════════════');
    console.log(`  页面:        http://localhost:${PORT}`);
    console.log(`  词典:        http://localhost:${PORT}/locals.js`);
    console.log(`  合并版:      http://localhost:${PORT}/vercel-chinese.user.js`);
    console.log(`  本地测试版:  http://localhost:${PORT}/vercel-chinese.dev.user.js`);
    console.log('────────────────────────────────────────────────');
    console.log('  📦 使用方法:');
    console.log('');
    console.log('  方法一：Tampermonkey 安装（推荐）');
    console.log(`    1. 浏览器打开 http://localhost:${PORT}`);
    console.log('    2. 点击「安装本地测试版」');
    console.log('    3. 访问 vercel.com 查看效果');
    console.log('');
    console.log('  方法二：控制台注入');
    console.log(`    fetch('http://localhost:${PORT}/vercel-chinese.user.js')`);
    console.log('      .then(r => r.text())');
    console.log('      .then(c => eval(c))');
    console.log('');
    console.log('  按 Ctrl+C 停止');
    console.log('════════════════════════════════════════════════');
});

// 安装指引页面
function getInstallGuide() {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>Vercel 汉化 — 本地测试</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
         background: #0a0a0a; color: #e0e0e0; min-height: 100vh; display: flex;
         align-items: center; justify-content: center; }
  .card { background: #1a1a1a; border: 1px solid #333; border-radius: 12px;
          padding: 40px; max-width: 600px; width: 90%; }
  h1 { font-size: 24px; margin-bottom: 8px; color: #fff; }
  p.sub { color: #888; margin-bottom: 32px; font-size: 14px; }
  h2 { font-size: 16px; color: #fff; margin: 24px 0 12px; }
  a.btn { display: inline-block; background: #0070f3; color: #fff;
          text-decoration: none; padding: 12px 24px; border-radius: 8px;
          font-weight: 600; font-size: 14px; transition: background .2s; }
  a.btn:hover { background: #0060d0; }
  a.btn.secondary { background: #333; }
  a.btn.secondary:hover { background: #444; }
  .actions { display: flex; gap: 12px; flex-wrap: wrap; }
  pre { background: #111; border: 1px solid #333; border-radius: 8px;
        padding: 16px; margin: 8px 0 16px; font-size: 13px; overflow-x: auto; }
  code { color: #4af; font-family: "SF Mono", Menlo, monospace; }
</style>
</head>
<body>
<div class="card">
  <h1>🔧 Vercel 汉化 — 本地测试</h1>
  <p class="sub">本地开发服务器正在运行，按 Ctrl+C 停止</p>

  <h2>🧩 方法一：Tampermonkey 安装（推荐）</h2>
  <div class="actions">
    <a class="btn" href="/vercel-chinese.dev.user.js" target="_blank">
      安装本地测试版（@require 本地词典）
    </a>
    <a class="btn secondary" href="/vercel-chinese.user.js" target="_blank">
      安装合并版（词典内置，无需服务器）
    </a>
  </div>

  <h2>💉 方法二：控制台注入</h2>
  <p style="font-size:13px;color:#888">在 vercel.com 页面的控制台中粘贴：</p>
  <pre><code>fetch('http://localhost:${PORT}/vercel-chinese.user.js')
  .then(r => r.text())
  .then(c => eval(c))</code></pre>

  <h2>📁 本地文件列表</h2>
  <pre><code>GET /locals.js                  ← 独立词典
GET /main.user.js               ← 纯引擎（@require）
GET /vercel-chinese.user.js     ← 合并版
GET /vercel-chinese.dev.user.js ← 本地测试版</code></pre>
</div>
</body>
</html>`;
}
