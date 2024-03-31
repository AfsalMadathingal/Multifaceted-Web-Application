const SitemapGenerator = require('sitemap-generator');



function generateSitemap() {
  const path = require('path');

// Get the current working directory
const currentDirectory = process.cwd();

// Get the absolute path of a file relative to the current working directory
const absoluteFilePath = path.join(currentDirectory, '/public/sitemap.xml');

console.log('Current Working Directory:', currentDirectory);
console.log('Absolute File Path:', absoluteFilePath);

    return new Promise((resolve, reject) => {
      const generator = SitemapGenerator('http://iluvnet.com', {
        maxDepth: 0,
        filepath: absoluteFilePath,
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