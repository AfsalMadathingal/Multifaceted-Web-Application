const SitemapGenerator = require('sitemap-generator');



function generateSitemap() {

const path = require('path');
const currentDirectory = process.cwd();
const absoluteFilePath = path.join(currentDirectory, '/public/sitemap.xml');

console.log('Current Working Directory:', currentDirectory);
console.log('Absolute File Path:', absoluteFilePath);

    return new Promise((resolve, reject) => {
      const generator = SitemapGenerator('http://localhost:3323/', {
        maxDepth: 0,
        filepath: absoluteFilePath,
        maxEntriesPerFile: 5000,
        stripQuerystring: true,
        changeFreq: 'weekly', 
        lastMod: true,
        priorityMap: [1.0, 0.8]
      });
  
      generator.on('done', (a) => {
        resolve();
      });
  
      generator.on('error', (error) => {
        reject(error);
      });
  
      generator.start();
    });
  }

  module.exports = {generateSitemap}