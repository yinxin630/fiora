const repoUrl = 'https://github.com/yinxin630/fiora';

const siteConfig = {
    title: 'fiora',
    tagline: 'An interesting open source chat application',
    url: 'https://fiora.suisuijiang.com',
    baseUrl: '/',
    projectName: 'fiora-doc',
    organizationName: 'fiora',
    editUrl: repoUrl + '/edit/master/docs/',
    headerLinks: [
        { href: repoUrl, label: 'GitHub' },
        { languages: true },
        { search: true },
    ],
    customDocsPath: 'docs',

    headerIcon: 'img/favicon.ico',
    favicon: 'img/favicon.ico',

    algolia: {
        apiKey: process.env.ALGOLIA_FIORA_API_KEY,
        indexName: 'fiora',
        algoliaOptions: {
            facetFilters: ['language:LANGUAGE', 'version:VERSION'],
        },
    },

    /* Colors for website */
    colors: {
        primaryColor: '#059F95',
        secondaryColor: '#059F95',
    },
    repoUrl,
    siteConfigUrl: repoUrl + '/edit/master/website/siteConfig.js',

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © 2015-${new Date().getFullYear()} 碎碎酱`,

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks.
        theme: 'default',
    },

    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
        '/js/code-block-buttons.js',
    ],

    // On page navigation for the current documentation page.
    onPageNav: 'separate',
    // No .html extensions for paths.
    cleanUrl: true,

    // Open Graph and Twitter card images.
    ogImage: 'img/undraw_online.svg',
    twitterImage: 'img/undraw_tweetstorm.svg',

    // For sites with a sizable amount of content, set collapsible to true.
    // Expand/collapse the links and subcategories under categories.
    // docsSideNavCollapsible: true,
    enableUpdateTime: true,
};

module.exports = siteConfig;
