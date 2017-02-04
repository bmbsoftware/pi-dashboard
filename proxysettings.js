module.exports = [
  {
    context: '/api/bbc/**',
    target: 'http://feeds.bbci.co.uk/news/',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/bbc': ''
    }
  },
  {
    context: '/api/google/news/**',
    target: 'https://news.google.com/',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/google/news': ''
    }
  },
  {
    context: '/api/merkur/**',
    target: 'https://www.merkur.de/welt/',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/merkur': ''
    }
  },
  {
    context: '/api/TechCrunch/**',
    target: 'http://feeds.feedburner.com/TechCrunch',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/TechCrunch/': ''
    }
  },
  {
    context: '/api/nytimes',
    target: 'http://rss.nytimes.com/services/xml/rss/nyt',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/nytimes/': ''
    }
  },
  {
    context: '/api/mshbl',
    target: 'http://feeds.feedburner.com/Mashable',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/mshbl/': ''
    }
  },
  {
    context: '/api/lfhack',
    target: 'http://feeds.lifehack.org/Lifehack',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api/lfhack/': ''
    }
  }
];
