const users = [
    {
        caption: 'Fiora',
        // You will need to prepend the image path with your baseUrl
        // if it is not '/', like: '/test-site/img/image.jpg'.
        image: '/img/undraw_open_source.svg',
        infoLink: 'https://fiora.suisuijiang.com',
        pinned: true,
    },
];

const repoUrl = 'https://github.com/yinxin630/fiora';

const siteConfig = {
    title: 'Fiora',
    tagline: 'fiora is an interesting chat application.',
    url: 'https://fiora.suisuijiang.com',
    baseUrl: '/', // Base URL for your project */
    projectName: 'fiora-doc',
    organizationName: 'fiora',
    editUrl: repoUrl + '/edit/master/docs/',
    headerLinks: [
        { doc: 'install', label: 'Docs' },
        { doc: 'api-doc', label: 'API' },
        { page: 'help', label: 'Help' },
        // { blog: true, label: 'Blog' },
        { languages: true },
        { search: true },
        { href: repoUrl, label: 'GitHub' },
    ],
    customDocsPath: 'docs',

    // If you have users set above, you add it here:
    users,

    headerIcon: 'img/favicon.ico',
    footerIcon: 'img/favicon.ico',
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
    /* Custom fonts for website */
    /*
    fonts: {
        myFont: ['Times New Roman', 'Serif'],
        myOtherFont: ['-apple-system', 'system-ui'],
    },
    */

    // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
    copyright: `Copyright © ${new Date().getFullYear()} Your Name or Your Company Name`,

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
