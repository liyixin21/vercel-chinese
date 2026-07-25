// ==UserScript==
// @name         Vercel 汉化
// @namespace    https://github.com/liyixin21/vercel-chinese
// @description  汉化 Vercel 网站界面。词典与引擎分离，自动更新翻译数据。
// @version      1.0.0
// @author       liyixin21
// @license      MIT
// @icon         https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png
// @match        *://vercel.com/*
// @match        *://*.vercel.com/*
// @match        *://*.vercel.app/*
// @require      https://gh.liyixin.vip/https://raw.githubusercontent.com/liyixin21/vercel-chinese/main/locals.js?v1.0.0
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // =========================================================
    // 引擎代码（由构建脚本合并 src/ 模块生成）
    // =========================================================
// --- config.js ---
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
  
  CONFIG;

  // --- state.js ---
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
  
  State;

  // --- utils.js ---
  // =========================================================
  // utils.js — 工具函数
  // =========================================================
  
  /**
   * 错误边界包装器 — 捕获异常避免阻断页面正常使用
   * @param {Function} fn - 要执行的函数
   * @param {string} label - 错误标签
   * @returns {Function} 包装后的函数
   */
  function safe(fn, label) {
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
  class LRUCache {
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
  function normalizeText(text) {
      if (!text) return '';
      return text.replace(/\s+/g, ' ').trim();
  }
  
  /**
   * 安全获取嵌套对象属性，支持路径如 'a.b[0].c'
   */
  function getNestedProperty(obj, path) {
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

  // --- missed-terms.js ---
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
  
  MissedTermsManager;

  // --- translator.js ---
  // =========================================================
  // translator.js
  // =========================================================
  
  
  
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
  
  function transText(text) {
      if (shouldSkipText(text)) return null;
      const t = text.trim();
      const r = fetchTransResult(t);
      return r && r !== t ? text.replace(t, r) : null;
  }
  
  function transTitle() {
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
  function transElementAttrs(element, attrs) {
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
  
  function transTextNode(node) {
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
  
  function transElementText(element) {
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

  // --- page-detector.js ---
  // =========================================================
  // page-detector.js — 页面类型检测
  // =========================================================
  
  /**
   * 检测当前页面类型
   * @returns {string|boolean} 页面类型，false 表示未识别
   */
  function detectPageType() {
      const url = new URL(window.location.href);
      const { hostname, pathname } = url;
  
      // 检查是否在 Vercel 域下
      if (!hostname.endsWith('vercel.com') && !hostname.endsWith('vercel.app')) {
          return false;
      }
  
      // 首页
      if (pathname === '/' || pathname === '/home') {
          const isLoggedIn = document.body.classList.contains('logged-in')
              || !!document.querySelector('[data-testid="dashboard"]');
          return isLoggedIn ? 'dashboard' : 'homepage';
      }
  
      // 登录/注册/2FA 页面
      if (pathname === '/login' || pathname.startsWith('/login/')) return 'login';
      if (pathname === '/signup') return 'signup';
  
      // 定价页面
      if (pathname === '/pricing') return 'pricing';
  
      // 文档页面
      if (pathname.startsWith('/docs')) return 'docs';
  
      // 企业页面
      if (pathname.startsWith('/enterprise')) return 'enterprise';
  
      // 仪表盘相关（/dashboard 或 /{teamname} 单级路径）
      if (pathname === '/dashboard') return 'dashboard';
  
      // 项目相关页面（/{teamname}/{projectname}/...）
      if (/^\/[^\/]+\/[^\/]+/.test(pathname)) {
          return detectProjectPage(pathname);
      }
  
      // /{teamname} 单级路径 = 团队仪表盘
      if (/^\/[^\/]+$/.test(pathname)) return 'dashboard';
  
      // 团队页面
      if (/^\/teams(\/|$)/.test(pathname)) return 'teams';
  
      // 设置页面
      if (pathname.startsWith('/account')) return 'settings';
  
      // 安全页面
      if (pathname.startsWith('/security')) return 'security';
  
      // 集成页面
      if (pathname.startsWith('/integrations')) return 'integrations';
  
      // 默认返回通用
      return 'general';
  }
  
  /**
   * 检测项目页面类型
   */
  function detectProjectPage(pathname) {
      if (pathname.includes('/settings/')) return 'project-settings';
      if (pathname.endsWith('/settings')) return 'project-settings';
      if (pathname.includes('/deployments')) return 'project-deployments';
      if (pathname.includes('/analytics')) return 'project-analytics';
      if (pathname.includes('/logs')) return 'project-logs';
      if (pathname.includes('/domains')) return 'project-domains';
      return 'project-overview';
  }
  
  /**
   * 构建页面配置对象 — 合并公共+页面专用词典和规则
   */
  function buildPageConfig(pageType) {
      const locale = I18N[CONFIG.LANG];
      const conf = I18N.conf || {};
  
      const pageData = locale[pageType] || {};
      const publicData = locale['public'] || {};
      const titleData = locale['title'] || {};
  
      return {
          currentPageType: pageType,
          currentPath: window.location.pathname,
  
          titleStaticDict: {
              ...(titleData.static || {}),
              ...(publicData.title?.static || {}),
              ...(pageData.title?.static || {}),
          },
          titleRegexpRules: [
              ...(titleData.regexp || []),
              ...(publicData.title?.regexp || []),
              ...(pageData.title?.regexp || []),
          ],
  
          staticDict: {
              ...(publicData.static || {}),
              ...(pageData.static || {}),
          },
          regexpRules: [
              ...(pageData.regexp || []),
              ...(publicData.regexp || []),
          ],
  
          ignoreMutationSelectors: [
              ...(conf.ignoreMutationSelectorPage?.['*'] || []),
              ...(conf.ignoreMutationSelectorPage?.[pageType] || []),
          ].join(', '),
  
          ignoreSelectors: [
              ...(conf.ignoreSelectorPage?.['*'] || []),
              ...(conf.ignoreSelectorPage?.[pageType] || []),
          ].join(', '),
  
          characterData: (conf.characterDataPage || []).includes(pageType),
  
          transSelectors: [
              ...(publicData.selector || []),
              ...(pageData.selector || []),
          ],
      };
  }

  // --- dom-walker.js ---
  // =========================================================
  // dom-walker.js — DOM 遍历与节点处理
  // =========================================================
  
  
  
  
  /**
   * 遍历节点树并执行翻译
   * @param {Node} rootNode - 根节点
   */
  function traverseNode(rootNode) {
      if (!State.pageConfig) return;
  
      const start = performance.now();
  
      // 文本节点直接处理
      if (rootNode.nodeType === Node.TEXT_NODE) {
          // 重定向到父元素做整体翻译，避免 React 拆分文本节点导致逐词翻译
          const parent = rootNode.parentElement;
          if (parent) {
              handleElementNode(parent, new WeakSet());
          } else {
              handleTextNode(rootNode);
          }
          return;
      }
  
      const treeWalker = document.createTreeWalker(
          rootNode,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
          {
              acceptNode(node) {
                  if (node.nodeType === Node.ELEMENT_NODE
                      && State.pageConfig.ignoreSelectors
                      && node.matches(State.pageConfig.ignoreSelectors)) {
                      return NodeFilter.FILTER_REJECT;
                  }
                  return NodeFilter.FILTER_ACCEPT;
              }
          }
      );
  
      // 记录被 transElementText 成功处理的父元素，避免子文本节点被部分翻译破坏整体翻译
      const translatedParents = new WeakSet();
  
      let currentNode;
      while ((currentNode = treeWalker.nextNode())) {
          if (currentNode.nodeType === Node.ELEMENT_NODE) {
              handleElementNode(currentNode, translatedParents);
          } else if (currentNode.nodeType === Node.TEXT_NODE) {
              if (translatedParents.has(currentNode.parentElement)) continue;
              handleTextNode(currentNode);
          }
      }
  
      const duration = performance.now() - start;
      if (duration > 10) {
          console.log(`[Vercel 汉化] 节点遍历耗时: ${duration.toFixed(2)}ms`);
      }
  }
  
  /**
   * 处理文本节点
   */
  function handleTextNode(node) {
      if (node.length > 500) return;
      transTextNode(node);
  }
  
  /**
   * 处理元素节点
   * @param {Element} node
   * @param {WeakSet} translatedParents - 已成功翻译的元素集合
   */
  function handleElementNode(node, translatedParents) {
      const tag = node.tagName;
      const testId = node.getAttribute('data-testid') || '';
  
      // 跳过特定标签
      const skipTags = new Set([
          'SCRIPT', 'STYLE', 'CODE', 'PRE', 'KBD',
          'SVG', 'PATH', 'IMG', 'CANVAS', 'VIDEO',
          'META', 'LINK', 'NOSCRIPT'
      ]);
      if (skipTags.has(tag)) return;
  
      // 跳过可编辑区域
      if (node.isContentEditable || node.closest('[contenteditable="true"]')) return;
  
      let elementTranslated = false;
  
      // 输入框和文本域
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
          if (['button', 'submit', 'reset'].includes(node.type)) {
              transElementAttrs(node, 'value');
          } else {
              transElementAttrs(node, 'placeholder');
          }
          return;
      }
  
      // 选项组
      if (tag === 'OPTGROUP') {
          transElementAttrs(node, 'label');
          return;
      }
  
      // 按钮元素
      if (tag === 'BUTTON') {
          transElementAttrs(node, ['title', 'aria-label', 'aria-describedby']);
          elementTranslated = transElementText(node);
          if (elementTranslated) translatedParents.add(node);
          return;
      }
  
      // 链接和 span
      if (tag === 'A' || tag === 'SPAN') {
          transElementAttrs(node, ['title', 'aria-label']);
          elementTranslated = transElementText(node);
      }
  
      // 标题和段落
      if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4'
          || tag === 'H5' || tag === 'H6' || tag === 'P' || tag === 'LI'
          || tag === 'TD' || tag === 'TH' || tag === 'DT' || tag === 'DD') {
          elementTranslated = elementTranslated || transElementText(node);
      }
  
      if (elementTranslated) {
          translatedParents.add(node);
      }
  
      // 通用属性翻译
      transElementAttrs(node, CONFIG.TRANSLATABLE_ATTRS);
  }

  // --- mutation-handler.js ---
  // =========================================================
  // mutation-handler.js — MutationObserver 处理
  // =========================================================
  
  
  
  
  
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
  function processMutations(mutations) {
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
  function setupMutationObserver() {
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

  // --- react-compat.js ---
  // =========================================================
  // react-compat.js — React 组件翻译兼容层
  // =========================================================
  
  
  let timer = null;
  let lastMutationAt = Date.now();
  const REACT_IDLE_MS = 200;
  const REACT_RETRY_MS = 50;
  
  const UNSAFE_SELECTOR = [
      'textarea', '[contenteditable="true"]', 'code', 'pre',
      'kbd', 'svg', 'img', 'canvas', 'video', 'input[type="text"]',
      'input[type="search"]', 'input[type="email"]', 'input[type="password"]',
  ].join(', ');
  
  const TRANSLATABLE_ATTRS = ['title', 'aria-label', 'placeholder', 'alt'];
  
  function shouldSkipNode(node) {
      const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
      if (!element) return true;
      return !!element.closest?.(UNSAFE_SELECTOR);
  }
  
  function translateElementAttrs(element) {
      TRANSLATABLE_ATTRS.forEach(attr => {
          const value = element.getAttribute?.(attr);
          if (!value) return;
          const result = transText(value);
          if (result) element.setAttribute(attr, result);
      });
  }
  
  function translateTextNode(node) {
      const result = transText(node.data);
      if (result) node.data = node.data.replace(node.data.trim(), result.trim());
  }
  
  function translateSurface(surface) {
      if (!surface || shouldSkipNode(surface)) return;
  
      if (surface.nodeType === Node.ELEMENT_NODE) translateElementAttrs(surface);
  
      const walker = document.createTreeWalker(
          surface,
          NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
          { acceptNode(node) { return shouldSkipNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } }
      );
  
      const translatedParents = new WeakSet();
  
      let node;
      while ((node = walker.nextNode())) {
          if (node.nodeType === Node.ELEMENT_NODE) {
              translateElementAttrs(node);
              if (transElementText(node)) translatedParents.add(node);
          } else if (node.nodeType === Node.TEXT_NODE) {
              if (translatedParents.has(node.parentElement)) continue;
              translateTextNode(node);
          }
      }
  }
  
  /**
   * 修复 header button span 内的文本节点：
   * 逐个处理每个文本节点，去掉尾部空格，清空纯英文复数尾缀节点
   */
  function cleanHeaderButtonComments() {
      document.querySelectorAll('header button span').forEach(span => {
          if (span.children.length > 0) return;
          // 收集所有非空文本节点
          const textNodes = [];
          span.childNodes.forEach(n => {
              if (n.nodeType === Node.TEXT_NODE) textNodes.push(n);
          });
          if (textNodes.length <= 1) return;
          // 逐个处理
          textNodes.forEach(n => {
              // 纯英文复数尾缀（1-3个小写字母）→ 清空
              if (/^[a-z]{1,3}$/.test(n.nodeValue.trim())) {
                  n.nodeValue = '';
                  return;
              }
              // 去掉尾部空格
              n.nodeValue = n.nodeValue.trimEnd();
          });
      });
  }
  
  function translateMainContent() {
      const main = document.querySelector('main');
      if (main) translateSurface(main);
      document.querySelectorAll('nav, header, [role="navigation"]').forEach(el => {
          translateSurface(el);
      });
      // 翻译之后再清理 header button 的残留文本节点
      cleanHeaderButtonComments();
  }
  
  function scheduleTranslation(delay = 800) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
          if (Date.now() - lastMutationAt >= REACT_IDLE_MS) translateMainContent();
      }, delay);
  }
  
  function scheduleSeries() {
      [100, 250, 600].forEach(delay => window.setTimeout(translateMainContent, delay));
  }
  
  function recordMutation() {
      lastMutationAt = Date.now();
  }
  
  function setupReactCompat() {
      const observer = new MutationObserver(safe((mutations) => {
          recordMutation();
          scheduleTranslation(REACT_RETRY_MS);
      }, 'ReactCompat'));
  
      const targets = [
          document.querySelector('main'),
          document.querySelector('nav'),
          document.querySelector('header'),
      ].filter(Boolean);
  
      targets.forEach(target => {
          observer.observe(target, { childList: true, subtree: true, characterData: true });
      });
  
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', scheduleSeries, { once: true });
      } else {
          scheduleSeries();
      }
  
      ['click', 'focusin'].forEach(evt => {
          document.addEventListener(evt, () => scheduleTranslation(REACT_RETRY_MS), true);
      });
  
      window.addEventListener('popstate', scheduleSeries);
  }

  // --- engine.js ---
  // =========================================================
  // engine.js — 主引擎入口
  // =========================================================
  
  
  
  
  
  
  
  
  
  let langObserver = null;
  
  /**
   * 检查词库是否加载
   */
  function checkI18NLoaded() {
      if (typeof I18N === 'undefined') {
          console.error('[Vercel 汉化] 词库文件未加载，脚本无法运行！');
          throw new Error('[Vercel 汉化] 词库文件未加载');
      }
  }
  
  /**
   * 初始化语言环境
   */
  function initLangEnv() {
      document.documentElement.lang = CONFIG.LANG;
      langObserver = new MutationObserver(() => {
          if (document.documentElement.lang === 'en') {
              document.documentElement.lang = CONFIG.LANG;
          }
      });
      langObserver.observe(document.documentElement, { attributeFilter: ['lang'] });
  }
  
  /**
   * 更新页面配置
   */
  function updatePageConfig(trigger) {
      const newType = detectPageType();
      if (!newType) {
          State.pageConfig = null;
          console.log(`[Vercel 汉化] ${trigger} 触发，页面类型: 未识别`);
      } else if (newType !== State.pageConfig?.currentPageType) {
          State.pageConfig = buildPageConfig(newType);
          console.log(`[Vercel 汉化] ${trigger} 触发，页面类型: ${newType}`);
      }
  }
  
  /**
   * 初始化翻译
   */
  function setupInitTrans() {
      function doInitTrans() {
          updatePageConfig('首次载入');
          if (State.pageConfig) {
              safe(traverseNode, '首次遍历')(document.body);
              transTitle();
          }
          setupMutationObserver();
      }
  
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
          doInitTrans();
      } else {
          window.addEventListener('DOMContentLoaded', doInitTrans, { once: true });
      }
  }
  
  /**
   * 监听 URL 变化
   */
  function setupUrlChangeListener() {
      // Tampermonkey onurlchange 事件
      if (typeof window.onurlchange !== 'undefined' && window.onurlchange === null) {
          window.addEventListener('urlchange', () => {
              const currentURL = window.location.href;
              if (currentURL === State.currentURL) return;
              State.currentURL = currentURL;
              updatePageConfig('URL 变化');
  
              if (State.mutationObserver) {
                  State.mutationObserver.disconnect();
              }
  
              if (State.pageConfig) {
                  safe(traverseNode, 'URL 变化遍历')(document.body);
                  transTitle();
              }
  
              setupMutationObserver();
          });
      }
  }
  
  /**
   * 监听 Turbo/SPA 导航事件
   */
  function setupTurboEvents() {
      document.addEventListener('turbo:load', () => {
          if (!State.pageConfig) return;
          transTitle();
      });
  }
  
  /**
   * 在页面最早期拦截 header button 里的 "All projects" 结构
   * React 把它渲染成 "All <!-- -->project<!-- -->s"，需要在 DOM 出现时立刻替换
   */
  function setupEarlyFix() {
      const SCOPE_MAP = {
          'All projects': '全部项目',
          'All teams': '全部团队',
          'All accounts': '全部账户',
      };
  
      function fixBtn(btn) {
          const span = btn.querySelector('span:not(:has(*))') || btn.querySelector('span');
          if (!span) return;
          const text = span.textContent.trim();
          if (SCOPE_MAP[text]) {
              span.textContent = SCOPE_MAP[text];
          }
      }
  
      const obs = new MutationObserver(mutations => {
          mutations.forEach(({ addedNodes }) => {
              addedNodes.forEach(node => {
                  if (node.nodeType !== Node.ELEMENT_NODE) return;
                  const btns = node.matches('button') ? [node] : Array.from(node.querySelectorAll('button'));
                  btns.filter(b => b.closest('header')).forEach(fixBtn);
              });
          });
      });
  
      function attachEarlyFix() {
          // 处理已存在的按钮
          document.querySelectorAll('header button').forEach(fixBtn);
          // 监听新加入的按钮（此时 body 已存在）
          obs.observe(document.body, { childList: true, subtree: true });
      }
  
      if (document.body) {
          attachEarlyFix();
      } else {
          document.addEventListener('DOMContentLoaded', attachEarlyFix, { once: true });
      }
  }
  
  /**
   * 主初始化入口
   */
  function init() {
      checkI18NLoaded();
      initLangEnv();
      setupEarlyFix();
      setupInitTrans();
      setupUrlChangeListener();
      setupTurboEvents();
      setupReactCompat();
      State.initDone = true;
  
      // 暴露调试接口
      if (CONFIG.DEV) {
          window.__vercelChinese = {
              State,
              MissedTermsManager,
              getStats: () => MissedTermsManager.getStats(),
              exportMissed: () => MissedTermsManager.exportData(),
              clearMissed: () => MissedTermsManager.clearAll(),
          };
      }
  }
  
  // 启动
  init();
})();
