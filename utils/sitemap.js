const SitemapGenerator = require('sitemap-generator');


function generateSitemap() {
    return new Promise((resolve, reject) => {
      const generator = SitemapGenerator('http://iluvnet.com', {
        maxDepth: 0,
        filepath: '../public/sitemap.xml',
        maxEntriesPerFile: 50000,
        stripQuerystring: true,
        changeFreq: 'weekly', 
        lastMod: true,
        priorityMap: [1.0, 0.8]
      });
  
      generator.on('done', () => {
        resolve();
      });
  
      generator.on('error', (error) => {
        reject(error);
      });
  
      generator.start();
    });
  }

  module.exports = {generateSitemap}