/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vendoprint.in',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/about': 0.8,
      '/how-it-works': 0.9,
      '/partner': 0.9,
      '/blog': 0.7,
      '/contact': 0.6,
      '/privacy': 0.3,
      '/terms': 0.3,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
