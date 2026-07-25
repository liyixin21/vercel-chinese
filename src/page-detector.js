// =========================================================
// page-detector.js — 页面类型检测
// =========================================================
import CONFIG from './config.js';

/**
 * 检测当前页面类型
 * @returns {string|boolean} 页面类型，false 表示未识别
 */
export function detectPageType() {
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
export function buildPageConfig(pageType) {
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
